---
layout:       post
title:        "ROS ROSDEP"
subtitle:     "rosdep usage"
date:         2018-07-18 00:00:00
author:       "G.J.先生"
header-img:   "img/in-post/2018.07/18/tools.jpg"
catalog:      true
tags:
    - ROS
    - rosdep
---
*****
>Abstract: "该教程主要是对ros下的安装系统依赖的命令行工具rosdep的介绍。"<br>                                                                                                                                                              <br /> 

----------
*************************
### rosdep的基本用法
##### rosdep的配置
1.概念

rosdep是一个用于安装系统依赖项的命令行工具。

2.安装rosdep
```bash
sudo apt-get install python-rosdep
#安装后要初始化rosdep
sudo rosdep init
rosdep update
```
3.使用源安装的rosdep（可选）
```bash
#下载源代码
git clone https://github.com/ros-infrastructure/rosdep
cd rosdep
source setup.sh
```

*************************
##### 使用rosdep
1.安装特定包的依赖关系
```bash
rosdep install AMAZING_PACKAGE
```
2.安装工作空间中所有包的依赖关系
```bash
#转到catkin工作区的顶级目录，然后运行：
cd ~/catkin_workspace 
rosdep install --from-paths src --ignore-src -r -y
```
此命令可以安装catkin工作区中的软件包所依赖但在您的计算机上缺少的所有软件包。

*************************
### 添加系统依赖项
将rosdep依赖项添加到软件包中
```html
<!--将系统依赖项添加到catkin/package.xml文件中的格式如下所示-->
<build_depend>wxpython</build_depend>
<build_depend>log4cxx</build_depend>
<run_depend>wxpython</run_depend>
<run_depend>log4cxx</run_depend>
```
必须将这些元素添加到包的package.xml中,唯一要改变的是系统依赖项的名称。此名称将在以YAML文件中定义的rosdep定义中查找，其主要集合托管在[GitHub上](https：//github.com/ros/rosdistro/tree/master/rosdep)。
>PS:引入新rosdep依赖应小心，因为它意味着你的代码的用户将下载一个安装这些第三方的依赖关系来完成。你也必须小心考察一下其他ROS堆栈,并确保您将引入的依赖不会产生不兼容。

*************************
### 在新操作系统添加rosdep.yaml条目
将rosdep依赖项添加到软件包中
```yaml
log4cxx:
  ubuntu:
    9.10: liblog4cxx10-dev
    9.04: liblog4cxx10-dev
    8.10: |
      if [ ! -f /opt/ros/lib/liblog4cxx.so.10 ] ; then
        mkdir -p ~/ros/ros-deps
        cd ~/ros/ros-deps
        wget --tries=10 http://pr.willowgarage.com/downloads/apache-log4cxx-0.10.0-wg_patched.tar.gz
        tar xzf apache-log4cxx-0.10.0-wg_patched.tar.gz
        cd apache-log4cxx-0.10.0
        ./configure --prefix=/opt/ros
        make
        sudo make install
      fi
    8.04: |
      if [ ! -f /opt/ros/lib/liblog4cxx.so.10 ] ; then
        mkdir -p ~/ros/ros-deps
        cd ~/ros/ros-deps
        wget --tries=10 http://pr.willowgarage.com/downloads/apache-log4cxx-0.10.0-wg_patched.tar.gz
        tar xzf apache-log4cxx-0.10.0-wg_patched.tar.gz
        cd apache-log4cxx-0.10.0
        ./configure --prefix=/opt/ros
        make
        sudo make install
      fi
  debian:
    sid: liblog4cxx10-dev
    lenny: |
      if [ ! -f /opt/ros/lib/liblog4cxx.so.10 ] ; then
        mkdir -p ~/ros/ros-deps
        cd ~/ros/ros-deps
        wget --tries=10 http://pr.willowgarage.com/downloads/apache-log4cxx-0.10.0-wg_patched.tar.gz
        tar xzf apache-log4cxx-0.10.0-wg_patched.tar.gz
        cd apache-log4cxx-0.10.0
        ./configure --prefix=/opt/ros
        make
        sudo make install
      fi
  fedora: log4cxx-devel
  arch: |
    if ! pacman -Q log4cxx; then yaourt -S log4cxx; fi
  macports: log4cxx
  gentoo: ">=dev-libs/log4cxx-0.10"
```

*************************
### 添加对新系统依赖项的支持
假设log4cxx不在您的一个堆栈依赖项中的rosdep.yaml文件中，并且您需要在堆栈中的包中。在这种情况下，您可以添加（或附加）rosdep.yaml，如下所示：
```yaml
log4cxx:
  ubuntu:
    9.04: liblog4cxx10-dev
    8.10: |
      if [ ! -f /opt/ros/lib/liblog4cxx.so.10 ] ; then
        mkdir -p ~/ros/ros-deps
        cd ~/ros/ros-deps
        wget --tries=10 http://pr.willowgarage.com/downloads/apache-log4cxx-0.10.0-wg_patched.tar.gz
        tar xzf apache-log4cxx-0.10.0-wg_patched.tar.gz
        cd apache-log4cxx-0.10.0
        ./configure --prefix=/opt/ros
        make
        sudo make install
      fi
    8.04: |
      if [ ! -f /opt/ros/lib/liblog4cxx.so.10 ] ; then
        mkdir -p ~/ros/ros-deps
        cd ~/ros/ros-deps
        wget --tries=10 http://pr.willowgarage.com/downloads/apache-log4cxx-0.10.0-wg_patched.tar.gz
        tar xzf apache-log4cxx-0.10.0-wg_patched.tar.gz
        cd apache-log4cxx-0.10.0
        ./configure --prefix=/opt/ros
        make
        sudo make install
      fi
  debian:
    sid: liblog4cxx10-dev
    lenny: |
      if [ ! -f /opt/ros/lib/liblog4cxx.so.10 ] ; then
        mkdir -p ~/ros/ros-deps
        cd ~/ros/ros-deps
        wget --tries=10 http://pr.willowgarage.com/downloads/apache-log4cxx-0.10.0-wg_patched.tar.gz
        tar xzf apache-log4cxx-0.10.0-wg_patched.tar.gz
        cd apache-log4cxx-0.10.0
        ./configure --prefix=/opt/ros
        make
        sudo make install
      fi
  fedora: log4cxx-devel
  arch: |
    if ! pacman -Q log4cxx; then yaourt -S log4cxx; fi
  macports: log4cxx
  gentoo: ">=dev-libs/log4cxx-0.10"
```
>PS:如果包名称包含特殊字符（>，*），请引用以下行：gentoo: ">=dev-libs/log4cxx-0.10 app-shells/bash"

*************************
>参考链接
>
>1.[rosdep](http://wiki.ros.org/rosdep)
>
>2.[How to add a system dependency](http://wiki.ros.org/rosdep/Tutorials/How%20to%20add%20a%20system%20dependency)
>
>3.[Add new OS to rosdep.yaml](http://wiki.ros.org/rosdep/Tutorials/Add%20new%20OS%20to%20rosdep.yaml)
>
>4.[Add support for a new system dependency](http://wiki.ros.org/rosdep/Tutorials/Add%20support%20for%20a%20new%20system%20dependency)
>

*************************
