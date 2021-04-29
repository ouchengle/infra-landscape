**Mailweb List FAQ**
### Q1：为什么订阅了邮件列表还是收不到邮件？
A：因为没有订阅成功，请检查并回复邮件列表发送的confirm邮件（如下图）；如果无法正常收到相应sig组邮件列表发送的confirm邮件，可更换其他邮箱尝试订阅（qq邮箱、163邮箱等），目前已知的aliyun邮箱和kylinos邮箱存在无法收到的情况；如果确认已订阅成功（见**Q3**），请检查是否在垃圾箱或者邮箱空间是否已满；如果确认订阅成功且以上情况都已检查问题依然存在，请联系gaohechao@huawei.com。
![enter image description here](https://gitee.com/suisuisuisuixin/test/raw/master/confirm.png)

### Q2：为什么回复了确认订阅的邮件后只收到乱码邮件而不是welcome邮件？

A：因为回复的邮件编码格式邮件列表服务器无法正确识别，需要做以下设置：文件->选项->高级->国际选项 勾选所有选项，并设置待发邮件和传出电子名片的首选编码为UTF-8（下图为Outlook设置，其他邮箱可参考设置编码）。
![enter image description here](https://gitee.com/suisuisuisuixin/test/raw/master/ooutlok.png)


### Q3：我如何确认是否订阅成功了某个邮件列表？

A：a.在官网邮件列表重新订阅一次，根据提示可判断是否成功订阅（如下图1：）；b.可根据是否收到一封welcome邮件判断（如下图2：）。
图1：
![enter image description here](https://gitee.com/suisuisuisuixin/test/raw/master/success.png)
图2：
![enter image description here](https://gitee.com/suisuisuisuixin/test/raw/master/welcome.png)


### Q4：我不想订阅邮件列表了，如何退订？

A：发送任何邮件内容到**listname-leave@openeuler.org**后回复一封收到的邮件即可（例：如要退订**test@openeuler.org** 需发送任何邮件内容到**test-leave@openeuler.org**，收到确认退订的**confirm**邮件后回复一封邮件）。下图依次为退订过程示例：
图1：发送退订邮件
![enter image description here](https://gitee.com/suisuisuisuixin/test/raw/master/leave.png)
图2：收到退订的confirm邮件
![enter image description here](https://gitee.com/suisuisuisuixin/test/raw/master/leave-confirm.png)
图3：收到退订成功邮件
![enter image description here](https://gitee.com/suisuisuisuixin/test/raw/master/unsub.png)


### Q5: 在某个邮件列表中的设置中修改了Archive policy，为什么在hyperkitty/api/lists/查看邮件列表信息仍未变化？

A: 当前hyperkitty存在未知错误，无法自动同步数据库，因此在postorius中修改了设置不能立即更新，需管理员进入mailweb后台手动执行`python3 manage.py mailman-sync`进行数据库同步。
