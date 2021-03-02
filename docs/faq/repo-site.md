# 基于VM搭建repo镜像源

## 硬件规格要求
centos7.6
4U8G
绑定公网IP并做域名解析

## **搭建步骤：**

## 1.安装nginx+fancyindexmodule（目录索引模块）和rsync
```
yum install -y nginx
systemctl enable nginx
yum install -y rsync
stat /etc/rsyncd.secrets
echo "${密码}" > /etc/rsyncd.secrets
chmod 600 /etc/rsyncd.secrets
mdkir -pv /repo/openeuler
chmod 777 -R /repo/openeuler/
#启动rsync daemon模式，可向外提供服务
rsync --daemon --config=/etc/rsyncd.conf
#查看并下载相应版本nginx，此处以yum安装的nginx版本为1.16.1为例
yum install -y git redhat-rpm-config  gperftools perl-ExtUtils-Embed readline-devel zlib-devel pam-devel libxml2-devel libxslt-devel openldap-devel python-devel  openssl-devel cmakepcre-develnanowget  gcc gcc-c++ ncurses-devel perl make cmake bison autoconf wget lrzsz  libtool libtool-ltdl-devel freetype-devel libjpeg.x86_64 libjpeg-devel libpng-devel gd-devel  python-develpatchsudo openssl* openssl  bzip* bzip2 unzip  libevent* libxml* libcurl* curl-devel
nginx -v
cd /usr/local&&wget http://nginx.org/download/nginx-1.16.1.tar.gz
tar xf nginx-1.16.1.tar.gz
cd nginx-1.16.1
mv /usr/sbin/nginx /usr/sbin/nginx.bak &&cp -rf /etc/nginx /etc/nginx.back
./configure --prefix=/usr/share/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --http-client-body-temp-path=/var/lib/nginx/tmp/client_body --http-proxy-temp-path=/var/lib/nginx/tmp/proxy --http-fastcgi-temp-path=/var/lib/nginx/tmp/fastcgi --http-uwsgi-temp-path=/var/lib/nginx/tmp/uwsgi --http-scgi-temp-path=/var/lib/nginx/tmp/scgi --pid-path=/run/nginx.pid --lock-path=/run/lock/subsys/nginx --user=nginx --group=nginx --with-file-aio --with-ipv6 --with-http_ssl_module --with-http_v2_module --with-http_realip_module --with-stream_ssl_preread_module --with-http_addition_module --with-http_xslt_module=dynamic --with-http_image_filter_module=dynamic --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_random_index_module --with-http_secure_link_module --with-http_degradation_module --with-http_slice_module --with-http_stub_status_module --with-http_perl_module=dynamic --with-http_auth_request_module --with-mail=dynamic --with-mail_ssl_module --with-pcre --with-pcre-jit --with-stream=dynamic --with-stream_ssl_module --with-google_perftools_module --with-debug --with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -specs=/usr/lib/rpm/redhat/redhat-hardened-cc1 -m64 -mtune=generic' --with-ld-opt='-Wl,-z,relro -specs=/usr/lib/rpm/redhat/redhat-hardened-ld -Wl,-E' --add-module=/usr/local/ngx-fancyindex

make
cp -r objs/* /usr/lib64/nginx/modules/
./objs/nginx -t
cp ./objs/nginx /usr/sbin/
vim /etc/nginx/nginx.conf
#http模块加入以下配置
    autoindex           on;
    autoindex_exact_size off; #文件大小从KB开始显示
    autoindex_localtime on; #显示文件修改时间为服务器本地时间
    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;
#配置ssl证书，在相关server下增加以下配置，上传证书文件到相应目录
        ssl_certificate "/etc/nginx/ssl/server.crt";
        ssl_certificate_key "/etc/nginx/ssl/server.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;

#在两个server下的location / 下{}中加入以下配置
fancyindex on;
fancyindex_exact_size off;
fancyindex_header /baidu.html;#百度统计页面
root /repo/openeuler;
autoindex on;
#两个server下新增以下localtion，增加百度统计功能
location /baidu.html {
            root /etc/nginx/conf/static;
        }
location = /favicon.ico {
          log_not_found off;
          access_log off;
        }
#创建baidu.html文件和目录
mkdir -pv /etc/nginx/conf/static/
vim /etc/nginx/conf/static/baidu.html
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width">
        <style type="text/css">
        body,html {
        background:#fff;
        font-family:"Bitstream Vera Sans","Lucida Grande",
        "Lucida Sans Unicode",Lucidux,Verdana,Lucida,sans-serif;
        }
        tr:nth-child(even) {
        background:#f4f4f4;
        }
        th,td {
        padding:0.1em 0.5em;
        }
        th {
        text-align:left;
        font-weight:bold;
        background:#eee;
        border-bottom:1px solid #aaa;
        }
        #list {
        border:1px solid #aaa;
        width:100%;
        }
        a {
        color:#a33;
        }
        a:hover {
        color:#e33;
        }
        </style>
        <script type="text/javascript">
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?f1316d4c46483e9f62085015686b9b5e";//根据实际情况修改
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
        </script>
        <title>Files....
        </title>
      </head>
      <body>
        <h1>Index of
#检查配置并重新加载配置文件
nginx -t
nginx -s reload
````
## 2.开始初次同步
```
rsync -av --partial --progress "--delete" --password-file=/etc/rsyncd.secrets  "rsync://root@${HOST}/${PATH}"  "/repo/openeuler"
```
## 3.执行命令写入文件 rsync.sh
```
#!/bin/bash
echo "begintime $(date)"
rsync -av --partial --progress "--delete" --password-file=/etc/rsyncd.secrets "rsync://root@${HOST}/${PATH}" "/repo/openeuler"
echo "endtime $(date)"
```

## 4.加入定时任务（每天增量同步）
```
0 1 * * * /root/rsync.sh >>/var/log/rsync.log
```
