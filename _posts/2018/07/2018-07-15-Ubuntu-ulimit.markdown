---
layout:       post
title:        "Ubuntu limits"
subtitle:     "ulimit setting"
date:         2018-07-15 1:48:00
author:       "GJXS"
header-img:   "img/in-post/2018.07/15/limits.png"
catalog:      true
tags:
    - Ubuntu
---
*****
>Abstract: "该教程主要是对Ubuntu系统最大文件打开数量ulimit和主要的内核参数的修改，从而修复有时候用catkin_make编译时出现的段错误（internal compiler error）问题。"<br>                                                                                <br /> 

----------
*************************

##### 查看ulimit里的最大文件打开数量的默认值
```bash
cat /proc/sys/fs/file-max
ulimit -n
```

*************************

##### 设置ubuntu内核参数
```bash
#编辑内核参数文件sysctl.conf
sudo gedit /etc/sysctl.conf
#添加下面内容
fs.file-max = 131072
#file-max：该参数表示文件句柄的最大数量。表示在系统中可以打开的文件数量。
#保存并退出，在终端运行下面命令使新的配置生效
sudo sysctl -p
```

*************************

##### 用户限制设置
1.设置limits.conf文件
```bash
#编辑limits.conf文件
sudo gedit /etc/security/limits.conf
#添加下面内容
* soft     nproc          131072    
* hard     nproc          131072   
* soft     nofile         131072   
* hard     nofile         131072
root soft     nproc          131072    
root hard     nproc          131072   
root soft     nofile         131072   
root hard     nofile         131072
```
2.把生成的链接加到common-session中
```bash
#编辑common-session
sudo gedit /etc/pam.d/common-session
#添加下面内容
session required pam_limits.so
```

*************************

##### 查看是否设置成功
```bash
ulimit -n 131072
```
*************************

>参考链接：[Ubuntu 16 永久修改ulimit中的max file open限制](https://www.waitig.com/ubuntu-16-%E6%B0%B8%E4%B9%85%E4%BF%AE%E6%94%B9ulimit%E4%B8%AD%E7%9A%84max-file-open%E9%99%90%E5%88%B6.html)

*************************
