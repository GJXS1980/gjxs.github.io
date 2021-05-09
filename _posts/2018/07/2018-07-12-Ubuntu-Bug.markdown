---
layout:       post
title:        "Ubuntu BUG"
subtitle:     "Ubuntu Filling the pit"
date:         2018-07-12 12:25:00
author:       "GJXS"
header-img:   "img/in-post/2018.07/12/2018.7.12.jpg"
catalog:      true
tags:
    - Ubuntu
---
*****
>Abstract: "该教程主要是对Ubuntu系统使用时遇到的一些问题及解决方法的总结。"<br>                                                                                                                                                           <br /> 

----------

##### BUG1:不能进入登录界面的解决方法

###### 问题描述  

>问题一：N卡独显电脑安装ubuntu14.04/16.04,一直会卡在ubuntu图标那里进不去安装界面
问题二：N卡独显电脑安装ubuntu14.04/16.04之后,开机的时候一直卡在ubuntu图标进不去登录界面

###### 解决方法
两个问题的解决方法相同，操作如下：
(1)重启Ubuntu,在下面这个界面的时候,按e进入编辑grub启动项参数
(2)找到*quiet splash* 这个词,在后面添加*nouveau.modeset=0*,然后按*F10*启动,不出意外,应该可以进入Ubuntu桌面
(3)进入Ubuntu系统之后，安装N卡驱动
<pre><code class="language-shell line-numbers">
sudo apt-get install nvidia-384
</code></pre>
重启，问题解决
*****

##### BUG2:无法获得锁/var/lib/dpkg/lock - open (11: 资源暂时不可用)

###### 问题描述 
使用Ubuntu打开终端时,输入带有sudo apt-get 命令行是回报下面错误:

>E: 无法获得锁 /var/lib/dpkg/lock - open (11: 资源暂时不可用)
E: 无法锁定管理目录(/var/lib/dpkg/)，是否有其他进程正占用它？

###### 原因分析
在ubuntu系统用带有apt-get 命令行的时候，如果在未完成任务的情况下将终端中断，此时 apt-get进程可能没有结束。当重新开机再次运行带有apt-get命令行的时候，可能会发生上面的错误。

###### 解决方法
在终端输入下面命令强制解锁
<pre><code class="language-shell line-numbers">
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpkg/lock
</code></pre>

*****

##### BUG3:系统死机后重启停在initramfs界面的解决方法

###### 问题描述 
由于系统错，导致系统发生错误，强制关机，造成重新开机停在initramfs界面<!--，如下图：
<div align="center">
<img src="http://pbqlliizk.bkt.clouddn.com/1.jpg" height="660" width="400" >
 </div-->

###### 解决方法
输入下面的命令（把n改为你装ubuntu系统的盘号）
<pre><code class="language-shell line-numbers">
fsck -y /dev/sdbn 
</code></pre>
我这里是
<pre><code class="language-shell line-numbers">
fsck -y /dev/sdb11 
</code></pre>
<!--结果如下：
<div align="center">
<img src="http://pbqlliizk.bkt.clouddn.com/2.jpg" height="660" width="400" >
 </div-->
然后重启
<pre><code class="language-shell line-numbers">
reboot
</code></pre>

*****

##### BUG4:系统死机后重启停在welcome to emergency mode界面的解决方法

###### 问题描述 
开机的时候，发现进不了系统，显示下面的错误信息：

>welcome to emergency mode！：after logging in ，type “journalctl -xb” to view system logs，“systemctl reboot” to reboot ，“systemctl default” to try again to boot into default mode。 give root password for maintenance （？？ Control-D？？？）’

<!--div align="center">
<img src="http://pbqlliizk.bkt.clouddn.com/3.jpg" height="660" width="400" >
 </div-->

###### 解决方法
使用下面命令行检查磁盘挂载信息
<pre><code class="language-shell line-numbers">
vim /etc/fstab 
</code></pre>
<!--div align="center">
<img src="http://pbqlliizk.bkt.clouddn.com/4.jpg" height="660" width="400" >
 </div-->
把挂载home的盘的2改为0
<!--div align="center">
<img src="http://pbqlliizk.bkt.clouddn.com/5.jpg" height="660" width="400" >
 </div-->

重启，问题修复
*****

##### BUG5:g++: internal compiler error: Killed (program cc1plus)

###### 问题描述 
g++: internal compiler error: Killed (program cc1plus)<br>
Please submit a full bug report,

###### 解决方法
主要原因大体上是因为内存不足,有点坑 临时使用交换分区来解决吧
<pre><code class="language-shell line-numbers">
sudo dd if=/dev/zero of=/swapfile bs=64M count=16
sudo mkswap /swapfile
sudo swapon /swapfile

sudo swapoff /swapfile
sudo rm /swapfile
</code></pre>

>参考链接：[无法获得锁/var/lib/dpkg/lock - open (11: 资源暂时不可用)的解决方案](https://blog.csdn.net/zkp0601/article/details/41349253)

[解决: g++: internal compiler error: Killed (program cc1plus)](http://vb2005xu.iteye.com/blog/2171295)

*****
