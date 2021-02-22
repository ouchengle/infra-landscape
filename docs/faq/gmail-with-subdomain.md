如何申请子域名对应的gmail邮箱

## 1、申请[google workspace](https://workspace.google.com/)账号

注：账号名称为你新的gmail邮箱名称，后缀域名为你自己已购买域名（或者子域名-cla.opengauss.org）


## 2、点击“管理网域”，进入管理控制台设置页面

## 3、切换到域名解析设置添加界面
添加子域名解析记录

| 主机记录 | 记录类型| 记录值                  | TTL |
| ------- | ------- | -------                | --- |
|   cla	  |	MX      |aspmx.l.google.com      | 1 |	
|   cla	  |	MX      |alt1.aspmx.l.google.com | 5 |
|   cla	  |	MX      |alt2.aspmx.l.google.com | 5 |
|   cla	  |	MX      |alt3.aspmx.l.google.com | 10|
|   cla	  |	MX      |alt4.aspmx.l.google.com | 10|	
|   cla	  |	MX      |xxxxxxxxxxxxxxxxxxxxxxxxxxx.mx-verification.google.com | 15|	


## 4、切换到[google workspace](https://workspace.google.com/)页面点击激活gmail邮箱即可
