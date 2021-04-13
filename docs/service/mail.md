---
title: 基础设施邮件列表介绍与新增域名支持说明
date: 2021-04-06
author: tommylikehu
categories:
- mailman
tags:
- mailman
---
# 邮件列表服务介绍✉️
基础设施团队给社区提供了邮件列表服务，服务本身是基于开源的Mailman+Exim4的解决方案，其中大致用到的组件如下:
1. **mailman-website**  
mailman-website系统的UI，其本身也是mailman社区的一部分，用户可以在界面上完成邮件订阅，取消订阅，配置管理等操作，管理员可以在界面上完成列表管理，模板设置等操作。
2. **mailman-core**  
邮件列表的核心服务，涉及到邮件接收，转发，归档，命令响应的功能。
3. **exim4**  
邮件系统的MTA组件，负责跟mailman-core组件交互，比如将收到的邮件转给mailman-core服务，以及接收来自mailman core的所有邮件转发请求, 默认通过25端口完成邮件收发处理。
4. **mailman-utils**  
邮件系统的辅助组件，用来根据用户的配置，修改对应的邮件列表的回复模板(welcome,confirm)。
5. **database**  
mailman core和mailman website的后端数据库，支持mysql和postgrious。

# 部署部署版本和修改介绍
TODO
# 新增域名支持
当前部署的邮件列表服务支持快速上线新的域名，你只需要按照下面的步骤提供相应的信息给基础设施团队即可。

::: tip
假定你上线的域名是`example.com`, 需要部署邮件列表到`lists.example.com`下面
:::

### DNS和证书
1. `mailweb.example.com`新增A记录指向我们的Ingress服务: `159.138.8.107`, 用于后续访问页面进行邮件列表管理。
2. `lists.example.com.` 新增A记录指向我们的Exim4服务: `94.74.106.235`, 用于DNS域名解析
3. `lists.example.com.` 新增MX记录指向我们的Exim4服务：`94.74.106.235`, 邮件专用MX记录
4. `default._domainkey.lists.osinfra.cn` 新增TXT记录，这条记录是用于DKIM验证的，简单的来说，DKIM是一对公私钥，用于发送和接收方的信息摘要验证，保证信息没有被篡改过，
   这里你需要添加我们统一公钥，内容为: `v=DKIM1;k=rsa;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgq5i9Hrj3+HLr1hXTwqTn6JAroPIKdWr66kpMcSyn1HnTcUV3fc/QfNFUvsogD8BFLtZyzC9O7AomvuS3TsasOTqwD35TgsBpTurvc4YiXb889SFQjJWSYaHflOdU+Z8MjSxg5T+LHVq00Z1idMsDyglNQgPVrqL94NzsZY8LWQIDAQAB`
   一般来说每个域名都有独立的DKIM公私钥，不过为了方便，我们后台默认配置了公共的DKIM私钥，你可以访问[在线网站](https://www.dmarcanalyzer.com/dkim/dkim-check/)测试你的配置的dkim设置是否正确
5. `lists.example.com.` 新增TXT记录，内容为: `v=spf1 ip4:119.8.38.37 -all`，即Sender Policy Framework，收件方可以根据这个信息确保
   邮件是从指定的服务器发送的，从而避免邮件域名伪造，这里配置的IP即我们服务的出口IP, 你可以访问[在线网站](https://www.dmarcanalyzer.com/spf/checker/)测试你的配置的spf策略是否正确
6. `_dmarc.lists.example.com` (可选)新增TXT记录，[DMARC](https://en.wikipedia.org/wiki/DMARC)主要用于设置收件邮箱服务在验证
   失败(SPF和DKIM)的时候，采取的策略以及发送报告的地址，比如我们自己配置的策略`v=DMARC1;p=none;sp=none;adkim=r;aspf=r;fo=1;rf=afrf;pct=100;ruf=mailto:tommylikehu@gmail.com;ri=86400`
   你可以访问[在线网站](https://www.dmarcanalyzer.com/dmarc/dmarc-record-check/)确认配置信息正确
### 证书信息
1. 为了保证页面访问开启HTTPS和邮件传输支持TLS，您需要同时提供2个证书信息给我们
    1. `mailweb.example.com`的证书和私钥文件
    2. `lists.example.com`的证书和秘钥文件

# 后记
如果您有任何问题和改进建议，欢迎您随时联系[github issue](https://github.com/opensourceways/infra-landscape/issues)
