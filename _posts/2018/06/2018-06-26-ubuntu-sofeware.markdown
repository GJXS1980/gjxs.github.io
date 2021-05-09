---
layout:       post
title:        "Ubuntu Sofeware"
subtitle:     "Sofeware Installation"
date:         2018-06-26 13:14:00
author:       "GJXS"
header-img:   "img/in-post/2018.06/26/sofeware.jpg"
catalog:      true
tags:
    - Sofeware
    - Ubuntu
---
*****
>Abstract: "基于ubuntu系统下的个人常用软件安装教程，为了以后自己重装软件时可以节省找相关教程的时间。"<br>                                                                                                                                                   <br />                                                                                             

*****

##### 系统要求
Ubuntu

*****

### 1.输入法
----------

##### 搜狗输入法
（1）下载安装fcitx
<pre><code class="language-shell line-numbers">
#安装fcitx输入法框架
sudo apt-get install fcitx
</code></pre>
（2）到[官网](https://pinyin.sogou.com/linux/?r=pinyin)下载64位的安装包
<pre><code class="language-shell line-numbers">
#下载64位的sogoupinyin安装包
mkdir -p ~/sogoupinyin && cd ~/sogoupinyin
wget 'http://cdn2.ime.sogou.com/dl/index/1524572264/sogoupinyin_2.2.0.0108_amd64.deb?st=kheylSEtb-kN-Vhn3QU4Fw&e=1531824789&fn=sogoupinyin_2.2.0.0108_amd64.deb' -O sogoupinyin_amd64.deb
</code></pre>
（3）安装下载的软件包
<pre><code class="language-shell line-numbers">
cd ~/sogoupinyin && sudo dpkg -i sogoupinyin_amd64.deb 
#发现依赖少了，修复依赖继续安装
sudo apt-get install -f && sudo dpkg -i sogoupinyin_amd64.deb 
#最后删除安装包
rm -rf cd ~/sogoupinyin
</code></pre>
重启完成配置

*****

### 2.浏览器
----------

##### chrome
(1)下载安装包
<pre><code class="language-shell line-numbers">
mkdir -p ~/google && cd ~/google
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
</code></pre>
(2)安装
<pre><code class="language-shell line-numbers">
cd ~/google
sudo dpkg -i google-chrome-stable_current_amd64.deb
</code></pre>

*****

### 3.社交软件
----------

##### QQ和TIM的安装
****************************
1.下载安装包
<pre><code class="language-shell line-numbers">
mkdir -p ~/QQ
cd ~/QQ
#Wine-QQ.TIM软件包的下载
wget http://yun.tzmm.com.cn/index.php/s/XRbfi6aOIjv5gwj/download -O QQ.AppImage && wget http://yun.tzmm.com.cn/index.php/s/5hJNzt2VR9aIEF2/download -O TIM.AppImage && svn co https://github.com/GJXS1980/QQ_wechat/trunk/QQ/icon
</code></pre>

>源码网站[Wine-QQ-TIM](https://github.com/askme765cs/Wine-QQ-TIM)

2.给每个安装包权限
<pre><code class="language-shell line-numbers">
cd ~/QQ
chmod a+x QQ.AppImage
chmod a+x TIM.AppImage
</code></pre>
3.创建快捷键

(1)QQ桌面快捷方式
<pre><code class="language-shell line-numbers">
gksudo gedit /usr/share/applications/QQ.desktop
#如果提示没安装gksu，则通过下面命令安装
sudo apt-get install gksu
</code></pre>
在新建的QQ.desktop中添加下面内容,其中xxxx为你电脑终端的名字
<pre><code class="language-shell line-numbers">
[Desktop Entry]
Name=QQ
Encoding=UTF-8
Type=Application
Exec=/home/xxxx/QQ/QQ.AppImage
Terminal=false
Icon=/home/xxxx/QQ/icon/QQ.png
Comment=Integrated Development Environment
StartupNotify=true
Categories=Development;IDE;
Name[en]=QQ
</code></pre>
(2)TIM桌面快捷方式
<pre><code class="language-shell line-numbers">
gksudo gedit /usr/share/applications/TIM.desktop
#如果提示没安装gksu，则通过下面命令安装
sudo apt-get install gksu
</code></pre>
在新建的TIM.desktop中添加下面内容,其中xxxx为你电脑终端的名字
<pre><code class="language-shell line-numbers">
[Desktop Entry]
Name=TIM
Encoding=UTF-8
Type=Application
Exec=/home/xxxx/QQ/TIM.AppImage
Terminal=false
Icon=/home/xxxx/QQ/icon/TIM.ico
Comment=Integrated Development Environment
StartupNotify=true
Categories=Development;IDE;
Name[en]=TIM
</code></pre>
(3)锁定到启动器
按win键搜索QQ或者TIM，然后打开，右键锁定在启动器

******************************

##### 微信的安装
1.下载安装包
<pre><code class="language-shell line-numbers">
wget https://github.com/geeeeeeeeek/electronic-wechat/releases/download/V2.0/linux-x64.tar.gz
mkdir -p ~/wechat && tar -xzvf linux-x64.tar.gz -C ~/wechat --strip-components 1
rm -rf linux-x64.tar.gz
</code></pre>
2.配置微信环境
<pre><code class="language-shell line-numbers">
cd ~/wechat
svn co https://github.com/GJXS1980/QQ_wechat/trunk/wechat/icon
</code></pre>
创建桌面快捷方式:
<pre><code class="language-shell line-numbers">
gksudo gedit /usr/share/applications/wechat.desktop
#如果提示没安装gksu，输入下面的命令行安装：
sudo apt-get install gksu
</code></pre>
将下面内容复制到打开的wechat.desktop文件中(其中xxxx为你电脑终端的名字)：
<pre><code class="language-shell line-numbers">
[Desktop Entry]
Name=wechat
Encoding=UTF-8
Type=Application
Exec=/home/xxxx/wechat/electronic-wechat
Terminal=false
Icon=/home/xxxx/wechat/icon/wechat.png
Comment=Integrated Development Environment
StartupNotify=true
Categories=Development;IDE;
Name[en]=wechat
</code></pre>
3.锁定到启动器

按win键搜索wechat，然后打开，右键锁定在启动器

***********************************

##### TeamViewer
（1）到[官网](https://www.teamviewer.com/en/download/linux/)下载Ubuntu, Debian（x86 64bit）安装包：
<pre><code class="language-shell line-numbers">
mkdir -p ~/teamviewer && cd ~/teamviewer
wget https://download.teamviewer.com/download/linux/teamviewer_amd64.deb
</code></pre>
(2)安装：
<pre><code class="language-shell line-numbers">
cd ~/teamviewer && sudo dpkg -i teamviewer_amd64.deb
#如果报错，就执行：
sudo apt-get -f install && sudo dpkg -i teamviewer_amd64.deb
#最后删除下载的软件包
rm -rf ~/teamviewer
</code></pre>
（3）输入下面的命令启动TeamViewer：
<pre><code class="language-shell line-numbers">
teamviewer
</code></pre>

*****

### 4.音乐播放器
----------

##### 网易云音乐
（1）下载软件包

> 链接: https://pan.baidu.com/s/1fx-u-QgKJQxW72QnIxrhbw 密码: GJXS

缺少依赖时,可以运行下面命令安装
<pre><code class="language-shell line-numbers">
sudo apt-get -f install
</code></pre>
（2）在终端里面，进入下载软件包的文件夹，输入下面命令安装下载的软件包
<pre><code class="language-shell line-numbers">
sudo apt-get dpkg -i <package-name.deb>
</code></pre>

*****

### 5.IDE编辑器
----------
##### sublime text
（1）安装GPG密钥：
<pre><code class="language-shell line-numbers">
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
</code></pre>

（2）确保apt已设置为使用https资源：
<pre><code class="language-shell line-numbers">
sudo apt-get install apt-transport-https
</code></pre>

（3）安装稳定版或者开发版
稳定版
<pre><code class="language-shell line-numbers">
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
</code></pre>
开发版
<pre><code class="language-shell line-numbers">
echo "deb https://download.sublimetext.com/ apt/dev/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
</code></pre>

（4）更新apt源并安装Sublime Text
<pre><code class="language-shell line-numbers">
sudo apt-get update
sudo apt-get install sublime-text
</code></pre>

（5）解决不能输入中文问题

更新并升级到最新版本
<pre><code class="language-shell line-numbers">
sudo apt-get update && sudo apt-get upgrade
</code></pre>
本地目录下载sublime-text-imfix
<pre><code class="language-shell line-numbers">
git clone https://github.com/lyfeyaj/sublime-text-imfix.git
</code></pre>
进入目录下sublime-text-imfix
<pre><code class="language-shell line-numbers">
cd sublime-text-imfix
</code></pre>
运行下面的脚本
<pre><code class="language-shell line-numbers">
./sublime-imfix
</code></pre>
重启软件生效

##### visual studio code IDE
(1)到[官网](https://go.microsoft.com/fwlink/?LinkID=760868)下载安装包
<pre><code class="language-shell line-numbers">
mkdir -p ~/code && cd ~/code
wget https://go.microsoft.com/fwlink/?LinkID=760868 -O code_amd64.deb
</code></pre>
(2)进入下载的目录,安装软件:
<pre><code class="language-shell line-numbers">
cd ~/code && sudo dpkg -i code_amd64.deb
rm -rf ~/code
</code></pre>
(3)在终端打开软件:
<pre><code class="language-shell line-numbers">
code
</code></pre>
为了方便使用,可以锁定到启动器.

##### Atom
<pre><code class="language-shell line-numbers">
sudo add-apt-repository ppa:webupd8team/atom  
sudo apt-get update  
sudo apt-get install atom
</code></pre>

*****

### 6.图像处理
---------

##### Xmind8
(1)去[官网](https://www.xmind.net/xmind/downloads/xmind-8-update7-linux.zip)下载安装包
<pre><code class="language-shell line-numbers">
mkdir -p ~/xmind && cd ~/xmind && wget -U ~/xmind https://www.xmind.net/xmind/downloads/xmind-8-update7-linux.zip 
unzip xmind-8-update7-linux.zip && rm -rf xmind-8-update7-linux.zip
cd ~/xmind/XMind_amd64 && ./XMind
</code></pre>
(2)在搜索那里输入XMind并打开，将XMind锁定在启动器

*****

### 7.科学上网
----------

##### ss-qt5
输入下面的命令行安装ss-qt5:
<pre><code class="language-shell line-numbers">
sudo add-apt-repository ppa:hzwhuang/ss-qt5
sudo apt-get update
sudo apt-get install shadowsocks-qt5
</code></pre>

*****
>参考链接
>
>1.[Sublime Text 3 Input Method(Fcitx) Fix [Ubuntu(Debian)]
](https://github.com/lyfeyaj/sublime-text-imfix)
>
>2.[Wine-QQ-TIM](https://github.com/askme765cs/Wine-QQ-TIM)

*****
