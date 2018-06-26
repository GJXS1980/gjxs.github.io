---
layout:       post
title:        "Ubuntu Sofeware"
subtitle:     "Sofeware Installation"
date:         2018-06-26 13:14:00
author:       "G.J.先生"
header-img:   "img/in-post/2018.06/26/sofeware.jpg"
catalog:      true
tags:
    - Sofeware
    - Ubuntu
---
*****
>Abstract: "基于ubuntu系统下个人常用的软件安装教程，方便以后自己重装软件时可以节省找相关教程的时间。"                               

*****
##### 系统要求
Ubuntu

*****
### 1.输入法
----------
##### 搜狗输入法


（1）先到软件管理中心下载安装fcitx

（2）到下面的网站下载64位的安装包
> https://pinyin.sogou.com/linux/?r=pinyin

（3）在终端里面，进入下载软件包的文件夹，输入下面命令安装下载的软件包
```bash
sudo apt-get dpkg -i <package-name.deb>
```
重启完成配置

*****
### 2.浏览器
----------
##### chrome
1.到官网（下面的网站）下载安装包
> https://www.google.cn/chrome/browser/desktop/index.html

2.双击下载的安装包即可完成安装
如果显示缺少依赖，输入下面的命令行安装依赖：
```bash
$ sudo apt-get install libnss3
```

*****
### 3.社交软件
----------
##### (1)微信
（1）先去下面的网站下载electronic-wechat-linux64位
> https://github.com/geeeeeeeeek/electronic-wechat/releases

（2）找到下载的目录，解压文件，双击下面的文件就可以打开微信

![这里写图片描述](http://img.blog.csdn.net/20171215171411887?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvR0pYUzIwMTc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

(3)创建桌面快捷方式：
执行命令：
```bash
$ gksudo gedit /usr/share/applications/eclipse.desktop
```

如果提示没安装gksu，输入下面的命令行安装：
```bash
$ sudo apt-get install gksu
```

将下面内容复制到打开的eclipse.desktop文件中：
```elipse
[Desktop Entry]
Name=Eclipse /**软件名字*/
Encoding=UTF-8
Type=Application
Exec=/usr/local/eclipse/eclipse /**软件路径*/
Terminal=false
Icon=/usr/local/eclipse/icon.xpm   /**软件的照片，需要下载*/
Comment=Integrated Development Environment
StartupNotify=true
Categories=Development;IDE;
Name[en]=Eclipse     /**软件的名字*/
```
修改软件路径和照片，然后把注释删除，不要留空格
最后在/usr/share/applications/目录下找到软件图标，把它复制粘贴到桌面就行了

##### (2)TeamViewer
（1）到官网下载Ubuntu, Debian（x86 64bit）安装包：
> https://www.teamviewer.com/en/download/linux/

（2）打开一个终端窗口，将目录切换到下载目录：

![这里写图片描述](https://img-blog.csdn.net/20180506114018877?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0dKWFMyMDE3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

(3)安装：
```bash
$ sudo dpkg -i teamviewer_13.1.3026_amd64.deb
```

如果报错，就执行：
```bash
$ sudo apt-get -f install
```
然后重新执行一次上面的命令;
```bash
$ sudo dpkg -i teamviewer_13.1.3026_amd64.deb
```

（4）输入下面的命令启动TeamViewer：
```bash
$ teamviewer
```

*****
### 4.音乐播放器
----------
##### 网易云音乐
（1）下载软件包
> 链接: https://pan.baidu.com/s/1i7b4QZN 密码: ktfk

缺少依赖时,可以运行下面命令安装
```bash
$ sudo apt-get -f install
```
（2）在终端里面，进入下载软件包的文件夹，输入下面命令安装下载的软件包
```bash
sudo apt-get dpkg -i <package-name.deb>
```

*****
### 5.IDE编辑器
----------
##### (1)sublime text
（1）安装GPG密钥：
```bash
$ wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
```

（2）确保apt已设置为使用https资源：
```bash
$ sudo apt-get install apt-transport-https
```

（3）安装稳定版或者开发版
稳定版
```bash
$ echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
```
开发版
```bash
$ echo "deb https://download.sublimetext.com/ apt/dev/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
```

（4）更新apt源并安装Sublime Text
```bash
$ sudo apt-get update
$ sudo apt-get install sublime-text
```

##### (2)visual studio code IDE
(1)下载安装包:
> https://go.microsoft.com/fwlink/?LinkID=760868

(2)进入下载的目录,安装软件:
```bash
$ sudo dpkg -i code_1.23.0-1525361119_amd64.deb
```

> 说明:这里是sudo dpkg -i 软件包的全名(带后缀)

(3)在终端打开软件:
```bash
$ code
```
为了方便使用,可以锁定到启动器.

##### (3)Atom
```bash
$ sudo add-apt-repository ppa:webupd8team/atom  
$ sudo apt-get update  
$ sudo apt-get install atom
```

*****
### 6.图像处理
---------
##### Xmind8
(1)去官网下载
> https://www.xmind.net/xmind/downloads/xmind-8-update7-linux.zip

(2)对下载的包解压,然后进入xmind-8/XMind_amd64/目录下点击打开XMind进可以了

*****