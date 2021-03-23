# 应用上线介绍💻
当前基础设施维护了openEuler，openGauss，openLooKeng，MindSpore, Ascend等5个社区的基础设施服务，同时也支持社区开发者上线自己的服务，提供给社区。  
社区的基础设施是基于华为云Kubernetes服务的，因为如果您想上线社区服务，第一步便是将现有的服务容器化,包括:
## 服务的容器化改造
针对现有服务的容器化改造，网上面有很多类似的指导文章，在这里我们仅列出一些常见的建议:
1. 参照单进程模型，对现有服务进行拆分，比如将数据库和应用拆分到独立的容器内。
2. 应用程序日志输出调整到标准输出，现有集群中已经包含ELK组件，标准输出的日志将会采集到ES后端，方便后续定位和统计。
3. 采用多阶段Dockerfile构建，保证构建环境的独立和干净，同时减少最终部署的镜像大小，提升部署时容器升级的速度。
4. 提供/healthz等接口，用于服务健康监测。
5. 敏感信息如数据库登录信息等，支持从环境变量中读取，方便生产环境部署时，集群通过秘钥直接注入。
6. 推荐使用[tini](https://github.com/krallin/tini)等组件作为容器1号进程，用于解决僵尸进程和信号响应的问题，更多可以移步[Tini advantage](https://github.com/krallin/tini/issues/8)
7. 不要使用root作为启动用户
8. 其他安全问题
::: warning
社区基础设施中已经包含RDS, Redis, MongoDB，ES等数据服务，真正部署时，推荐直接使用现有服务而不是基于对应镜像自行构建维护服务。
:::
## 服务部署Yaml
### 部署注意事项
1. 部署到集群中的服务默认具备外部网络访问的能力，能不能正常访问国外网络，取决于我们部署到的集群所在位置，比如openEuler-hk默认可以翻墙😀 , 你可以访问[集群介绍](#), 查看当前支持的集群以及所属社区。
2. 当前集群的网络入口统一为每个集群的Ingress实例，如果您需要暴露Web UI或者API，需要通过创建Ingress来使用，比如我们CLA服务的入口(涵API)资源定义如下:
```yaml
# ingress definition for cla web UI
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/limit-connections: "400"
    nginx.ingress.kubernetes.io/limit-rps: "400"
    nginx.ingress.kubernetes.io/configuration-snippet: |
      add_header X-XSS-Protection "1; mode=block";
      add_header Strict-Transport-Security "max-age=31536000";
      add_header X-Frame-Options "SAMEORIGIN";
      add_header Content-Security-Policy "script-src 'self' *.baidu.com *.googleapis.com ers.baidu.com 'unsafe-eval' 'unsafe-inline';object-src 'none';frame-ancestors 'self'";
  name: cla-ingress
spec:
  tls:
    - hosts:
        - clasign.osinfra.cn
      secretName: tls-secrets
  rules:
    - host: clasign.osinfra.cn
      http:
        paths:
          - backend:
              serviceName: claservice
              servicePort: 80
            path: /
---
# Ingress definition for cla backend server
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/rewrite-target: /$2
    nginx.ingress.kubernetes.io/proxy-body-size: 8m
  name: cla-ingress-backend
spec:
  tls:
    - hosts:
        - clasign.osinfra.cn
      secretName: tls-secrets
  rules:
    - host: clasign.osinfra.cn
      http:
        paths:
          - backend:
              serviceName: cla-backend-service
              servicePort: 80
            path: /api(/|$)(.*)
```
你需要在ingress中至少包含下面2个annotation:  
a. `kubernetes.io/ingress.class: nginx`: 表明ingress的后台处理controller指向nginx。  
b. `cert-manager.io/cluster-issuer: letsencrypt-issuer`: 自动申请域名对应证书。

3. 如果需要使用持久卷，需要查看每个集群中支持的Storage Class[列表](#)，基于SC名创建对应的PVC。
4. 由于我们部署的Yaml都放在公开库，所以密码等敏感信息会有问题，我们推荐使用secret definition的方式解决，具体你需要:  
    a. 联系管理员将秘钥配置到秘钥管理后端: https://secrets.osinfra.cn  
    b. 使用SecretDefinition文件，将秘钥同步到集群，并使用, 具体参考下面的样例:  
```yaml
apiVersion: secrets-manager.tuenti.io/v1alpha1
kind: SecretDefinition
metadata:
  name: purge-secrets
spec:
  name: purge-secrets
  keysMap:
    password:
      path: secrets/data/infra-common/nginx-purger
      key: password
    username:
      path: secrets/data/infra-common/nginx-purger
      key: username
```
上面的资源会将后端`secrets/data/infra-common/nginx-purger`路径下的username和password字段同步到当前集群中，并创建对应的secret: `purge-secrets`
### 选择部署的路径
当前社区的基础设施部署代码是按照社区区分的，
1. [openEuler社区](https://github.com/opensourceways/infra-openeuler)
2. [openGauss社区](https://github.com/opensourceways/infra-opengauss)
3. [MindSpore社区](https://github.com/opensourceways/infra-mindspore)
4. [openLookeng社区](https://github.com/opensourceways/infra-openlookeng)
5. [通用基础设施服务](https://github.com/opensourceways/infra-common)    
如果只是提供给某个社区使用，推荐直接部署到对应社区部署仓库，否则统一放在infra-common的代码仓库，每个代码仓库的结构如下:
```shell
infra-openeuler git:(master) tree -L 2
.
|-- applications
|   |-- api-ingress
|   |-- ssh-tunnel
|   |-- ssh-tunnel-cn-north4
|   |-- ssh-tunnel-cn-north4-2
|   `-- sync-bot
|-- LICENSE
`-- README.md
```
比如，当需要往openEuler社区部署新的服务，在applications下创建对应的服务目录，并归档yaml即可，我们以微信小程序的后台服务为例:
```shell
➜  meeting-server git:(master) tree -L 2
.
|-- cronjob.yaml
|-- deployment.yaml
|-- kustomization.yaml
|-- namespace.yaml
|-- pvc.yaml
|-- secrets.yaml
`-- service.yaml
```
这里面,我们建议使用kustomize工具对所有的资源文件进行整合和管理, 比如:
```yaml
resources:
- namespace.yaml
- deployment.yaml
- service.yaml
- secrets.yaml
- cronjob.yaml
- pvc.yaml
commonLabels:
  app: meetingserver
  community: openeuler
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: meetingserver
images:
- name: swr.ap-southeast-1.myhuaweicloud.com/opensourceway/app-meeting-server
  newTag: ab625e52fe3b93d4fcf951e7eef8d4f08f556298
```
其中我们定义的`commonLabels`方便后续我们再Kibanan上面基于Label对Pod进行快速过滤和查询。
### 提交应用部署文件
当上面的应用部署代码提交到对应的社区仓库后，您就可以上线你的服务了，我们上线服务的流程也是基于代码仓库的，这里你需要提交一个Kubernetes的自定义资源`Argocd Application`到我们指定的仓库[infra-community](https://github.com/opensourceways/infra-common)
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: openeuler-hk-meetingserver
  namespace: argocd
  labels:
    community: openeuler-hk
spec:
  destination:
    namespace: meetingserver
    name: openeuler-external
  project: openeuler
  source:
    path: applications/meeting-server
    repoURL: https://github.com/opensourceways/infra-openeuler.git
    targetRevision: HEAD
  syncPolicy:
    automated:
      prune: false
```
其中比较关键的字段定义如下:
1. metadata.name: 应用名，需要保证全局唯一，所以可以使用{{community}}-{{region}}-{{application}}的方式命名
2. labels.community: 引用所属的社区，方便后续统计和分类。
3. spec.destination.namespace: 应用部署到的集群对应的namespace
4. spec.destination.name: 应用部署到的集群名，完整的集群列表可以[参考])(#)
5. project: 项目名，跟社区名保持一致。
6. source.{{path&repoURL&targetRevision}}: 服务要同步的Yaml路径，即上一步提交的仓库地址+文件夹路径
7. syncPolicy: 同步策略，你可以选择自动同步或者手动触发，自动同步在监测到source文件更新后，会自动触发集群应用更新。
## 上线后自助服务
### 手动同步应用
### 搭建发布流水线
### 查看容器日志
### 登录集群Console