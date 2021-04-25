---
title: 基础设施邮件列表禁止注册
date: 2021-04-22
author: liuqi
categories:
- mailman
tags:
- mailman
---
# 概述
禁止openEuler, openGauss, openLooKeng, MindSpore四个社区的邮件列表注册功能以及第三方登录
## 禁止新用户注册账号
邮件列表的注册功能由allauth提供，首先考虑是否开启/关闭注册功能的配置能够直接禁止注册。很遗憾，目前allauth暂无这样的开关。在allauth的[高级用法](https://django-allauth.readthedocs.io/en/latest/advanced.html)中，可以看到`allauth.account.adapter.DefaulteAccountAdapter`类中有一个`is_open_for_signup`的方法，默认返回True，如果要禁用帐户注册，可以通过返回False来覆盖此方法。

本文档将介绍通过如下步骤来实现禁止注册与屏蔽第三方登录：

- 注释python第三方库中`postorius/templates/postorius/base.html`和`hyperkitty/templates/hyperkitty/base.html`两个模板的注册标签，并将重写的base.html分别记为base.html、 base2.html,写入`mailman-web-configmap`中，并在mail的deploy.yaml中deployment的containers下的command中添加覆盖命令。
```
...
    spec:
      containers:
      - command:
        - /bin/sh
        - -c
        - |
          cp /opt/mailman-web-config/base.html /usr/lib/python3.6/site-packages/postorius/templates/postorius;
          cp /opt/mailman-web-config/base2.html /usr/lib/python3.6/site-packages/hyperkitty/templates/hyperkitty/base.html;
...
```
- 在`mailman-nginx-configmap`中`default.conf`的`server`内添加一个`location`，重定向注册路由跳转回邮件列表首页。
```
	server {
		listen 80 default_server;
		
		root /opt/mailman-web-data;
		index index.html;
		
		location /static {
			alias /opt/mailman-web-data/static;
		}

		location / {
			uwsgi_pass 0.0.0.0:8080;
			include uwsgi_params;
			uwsgi_read_timeout 300;
		}

		location /accounts/signup {
			return ^/account/signup(.*)$ /postorius/lists/;
		}
	}
```
## 禁用第三方登录
在`mailman-web-configmap`的`settings_local.py`中，重写`settings.py`中的INSTALLED_APPS，去掉最后5项`allauth.socialaccount`相关的application，如下
```
  INSTALLED_APPS = [
	'hyperkitty',
	'postorius',
	'django_mailman3',
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.sites',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'rest_framework',
	'django_gravatar',
	'compressor',
	'haystack',
	'django_extensions',
	'django_q',
	'allauth',
	'allauth.account',
	'allauth.socialaccount',
  ]
```
配置完成后重启pod，配置生效，实现禁止新账号注册功能与禁用第三方登录。
# 后记
如果您有任何问题和改进建议，欢迎您随时联系[github issue](https://github.com/opensourceways/infra-landscape/issues)
