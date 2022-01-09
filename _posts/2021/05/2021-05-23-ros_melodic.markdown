---
layout:       post
title:        "ROS Melodic Morenia"
subtitle:     "ROS Melodic Installation"
date:         2021-05-23 18:18:00
author:       "GrantLi"
header-img:   "http://aigrantli.com/melodic.jpg"
catalog:      true
tags:
    - ROS
    - Ubuntu
---
*****
>Abstract: "ROS Melodic Morenia is primarily targeted at the Ubuntu 18.04 (Bionic) release, though other Linux systems as well as Mac OS X, Android, and Windows are supported to varying degrees. "                               

*****

##### 系统要求
Ubuntu版本：18.04 

*****

##### 安装过程
1.设置你的sources.list
<pre><code class="language-shell line-numbers">
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
</code></pre>

2.下载安装秘钥
<pre><code class="language-shell line-numbers">
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
</code></pre>

3.确保您的Debian软件包索引是最新的:
<pre><code class="language-shell line-numbers">
sudo apt-get update
</code></pre>

4.安装melodic桌面完整安装:(推荐）：
<pre><code class="language-shell line-numbers">
sudo apt install ros-melodic-desktop-full
</code></pre>

5.安装软件包的依赖关系
<pre><code class="language-shell line-numbers">
sudo apt-get install python-rosinstall python-rosinstall-generator python-wstool build-essential
sudo apt install python-rosdep
</code></pre>

6.Initialize rosdep
(1)环境设置
<pre><code class="language-shell line-numbers">
echo "source /opt/ros/kinetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
</code></pre>

(2)初始化rosdep
<pre><code class="language-shell line-numbers">
sudo rosdep init
rosdep update
</code></pre>

7.检查是否安装成功
<pre><code class="language-shell line-numbers">
roscore
</code></pre>
<img src="/img/in-post/2018.06/25/roscore.png" alt="ROS-Kinetic">

(2)另外打开一个终端,输入:
<pre><code class="language-shell line-numbers">
rosrun rviz rviz
</code></pre>
<img src="/img/in-post/2018.06/25/rviz.png" alt="ROS-Kinetic">
可以打开rviz就说明已经成功了

*****
