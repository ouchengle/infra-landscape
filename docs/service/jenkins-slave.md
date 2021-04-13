---
title: Jenkins Slave节点容器化改造指南
date: 2021-04-06
author: tommylikehu
categories:
 - jenkins
tags:
 - jenkins
 - kubernetes
---
# 概述
Jenkins集群是我们基础设施开发门禁的首选CICD工具，为方便执行环境的升级和扩容，我们推荐在条件允许的情况下对执行环境进行容器化改造(没有特殊的硬件和虚拟化要求)，大致的步骤如下:

## 执行机的容器化改造,准备Dockerfile
准备好的容器Slave环境需要包含以下组件:
1. 门禁任务相关的依赖，检查二进制文件，脚本等，确保jenkins任务能正常调度调度脚本完成规范检查，编译构建，测试用例执行等任务， 以下面的Dockerfile片段举例:
```Dockerfile
# Set apt source
RUN cp -a /etc/apt/sources.list /etc/apt/sources.list.bak \
    && sed -i "s@http://.*archive.ubuntu.com@http://mirrors.huaweicloud.com@g" /etc/apt/sources.list \
    && sed -i "s@http://.*security.ubuntu.com@http://mirrors.huaweicloud.com@g" /etc/apt/sources.list \
    && apt update

# Install base tools
RUN DEBIAN_FRONTEND=noninteractive apt install -y vim \
    wget \
    xz-utils \
    net-tools \
    openssh-client \
    git \
    curl \
    subversion \
    ntpdate \
    unzip \
    tzdata \
    tcl \
    sudo \
    bzip2 \
    default-jre

# Install compile tools
RUN DEBIAN_FRONTEND=noninteractive apt install -y gcc \
    g++ \
    gfortran \
    make
    
# Install dependency lib of python
RUN DEBIAN_FRONTEND=noninteractive apt install -y libffi-dev \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libncurses5-dev \
    libgdbm-dev \
    liblzma-dev \
    libreadline-dev
# Install cppcheck
RUN cd /tmp \
    && wget https://github.com/danmar/cppcheck/archive/1.90.tar.gz \
    && tar -zxf 1.90.tar.gz \
    && cd cppcheck-1.90 \
    && make MATCHCOMPILER=yes FILESDIR=/usr/share/cppcheck HAVE_RULES=yes CXXFLAGS="-O2 -DNDEBUG -Wall -Wno-sign-compare -Wno-unused-function" -j8 \
    && make install FILESDIR=/usr/share/cppcheck -j8 \
    && rm -rf /tmp/cppcheck-1.90 \
    && rm -f /tmp/1.90.tar.gz
```
上面是MindSpore社区代码检查门禁的Dockerfile片段，他这里除了切换软件包的源之外，任务中依赖的gcc，make，cppcheck等工具都安装好了，方便后续jenkins任务使用。
2. Jnlp准备， Jenkins slave是通过jnlp连接到master节点的，所以需要我们在环境中保证jnlp组件ok，其中就包括:  
    a. 安装`java jre`和`tini`启动组件  
    b. 下载和准备jnlp相关组件  
    c. 使用`tini`启动jenkins-agent组件， jenkins-agent是一个命令行的jar包，他启动的时候可以支持输入jenkins信息，包括url，token等
       用于反向连接到jenkins master节点。
还是以实际的dockerfile为例，下面的代码中，分别执行了jenkins-agent的下载，jenkins用户的创建，以及启动的用户和工作目录准备，以及最终启动命令行的设置。
```dockerfile
# Install jnlp
RUN cd /tmp \
    && git clone https://github.com/jenkinsci/docker-inbound-agent.git -b 3.35-5 \
    && cp -a /tmp/docker-inbound-agent/jenkins-agent /usr/local/bin/jenkins-agent \
    && chmod 755 /usr/local/bin/jenkins-agent \
    && ln -s /usr/local/bin/jenkins-agent /usr/local/bin/jenkins-slave \
    && rm -rf /tmp/docker-inbound-agent

# Create user of jenkins
RUN groupadd -g ${gid} ${group} \
    && useradd -c "Jenkins user" -d /home/${user} -u ${uid} -g ${gid} -m ${user} \
    && echo "jenkins ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

#################
# User: jenkins #
#################
# Set env
USER ${user}
ENV AGENT_WORKDIR=${AGENT_WORKDIR}
RUN echo "export TZ='Asia/Shanghai'" >> ~/.bashrc \
    && mkdir -p /home/${user}/.jenkins \
    && mkdir -p ${AGENT_WORKDIR}

VOLUME /home/${user}/.jenkins
VOLUME ${AGENT_WORKDIR}
WORKDIR /home/${user}
ENTRYPOINT ["tini -- jenkins-agent"]
```
上面为了方便，这一段dockerfile代码可以直接贴到dockerfile的最后。 创建完成后你可以直接将进行上传到dockerhub中，
正式环境上可以直接pull dockerhub上面的公开镜像。

## 上线jenkins执行机到正式环境
假定你要给MindSpore社区上线新的执行机，具体操作如下
### 准备部署Yaml
jenkins执行机通过Statefulset组织，在启动pod之前会有init pod完成jenkins集群的注册和绑定，你只需要基于下面的部署yaml，将关键信息进行替换和改造即可。
```yaml
# Resource for centos specification slave pods
---
kind: StatefulSet
apiVersion: apps/v1beta1
metadata:
  name: {{`slave name`}}
  namespace: jenkins
  labels:
    slave: {{`slave name`}}
spec:
  replicas: {{`replica number`}}
  selector:
    matchLabels:
      slave: {{`slave name`}}
  template:
    metadata:
      labels:
        slave: {{`slave name`}}
    spec:
      initContainers:
        - name: slave-init
          image: swr.cn-north-4.myhuaweicloud.com/mindspore/jenkins-slave-tools:0.0.1
          volumeMounts:
            - mountPath: /home/jenkins/share-config
              name: jenkins-share-config
          env:
            - name: JENKINS_NODE_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: JENKINS_USER_NAME
              value: admin
            - name: JENKINS_USER_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: jenkins-secret
                  key: password
            - name: JENKINS_AGENT_WORKDIR
              value: /home/jenkins/agent-working-dir
            - name: JENKINS_URL
              value: http://build.mindspore.cn
            - name: JENKINS_SHARE_FOLDER
              value: /home/jenkins/share-config
            - name: EXECUTOR_NUMBERS
              value: "1"
            - name: NODE_LABELS
              value: x86 x86-build-centos
          args: ["$(JENKINS_URL)", "$(JENKINS_USER_NAME)", "$(JENKINS_USER_PASSWORD)", "$(JENKINS_NODE_NAME)", "$(EXECUTOR_NUMBERS)", "$(JENKINS_AGENT_WORKDIR)", "$(NODE_LABELS)", "$(JENKINS_SHARE_FOLDER)"]
      containers:
        - name: jenkins-slave
          image: swr.cn-north-4.myhuaweicloud.com/mindspore/mindspore_centos_x86:centos8.2.2004-20210116
          imagePullPolicy: "IfNotPresent"
          volumeMounts:
            - mountPath: /home/jenkins/share-config
              name: jenkins-share-config           
          command:
            - /bin/sh
            - -c
            - |
              export JENKINS_SECRET=`cat /home/jenkins/share-config/node_secret.id`;
              exec /tini -- jenkins-agent
          resources:
            requests:
              cpu: 1000m
              memory: 1000Mi
            limits:
              cpu: 2000m
              memory: 400Mi
          env:
            - name: JENKINS_TUNNEL
              value: build.mindspore.cn:50000
            - name: JENKINS_AGENT_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: JENKINS_NAME
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: JENKINS_AGENT_WORKDIR
              value: /home/jenkins/agent-working-dir
            - name: JENKINS_URL
              value: http://build.mindspore.cn
      volumes:
        - name: jenkins-share-config
          emptyDir: {}
```
其中需要关注的信息如下:
1. `JENKINS_URL`和`JENKINS_TUNNEL`: 需要替换为实际的jenkins地址，端口默认不变
2. `JENKINS_AGENT_WORKDIR`: 即jenkins slave的工作目录，可以基于实际情况挂载磁盘到目录，保证空间足够
3. `jenkins-slave`的镜像需要基于实际情况替换。
4. `EXECUTOR_NUMBERS`: 是执行机的执行器数量，即executor的数量。
5. `NODE_LABELS`: 节点拉起后的标签，标签可以用作后续的任务调度选择(基于节点标签)。
6. `JENKINS_USER_NAME`和`JENKINS_USER_PASSWORD` 这个信息在集群中已经存在，直接使用即可。
7. `{{`slave name`}}`: slave的名称，用于标识，比如`x86-python-check`等
8. `{{`replica number`}}`: 机器的副本数，指定容器拉起的个数
yaml准备完成后，直接提交到对应的仓库地址即可，比如MindSpore，地址在[这里](https://github.com/opensourceways/infra-mindspore/tree/master/applications/jenkins-x86-slave)
,具体的指导，可以[参考](https://osinfra.cn/service/app.html)。
### 持续部署
为方便后续持续部署和升级，我们也支持在基础设施的jenkins环境中，针对jenkins slave的执行环境做持续发布，具体的流程如下:
1. 下载dockerfile
2. 基于dockerfile构建容器镜像
3. 上传容器镜像  
4. 修改部署仓库中slave container的镜像版本  
5. 手动触发环境升级
