---
layout:       post
title:        "ROS Tutorials 1"
subtitle:     "Navigating the ROS Filesystem"
date:         2018-07-01 11:18:00
author:       "GJXS"
header-img:   "img/in-post/2018.07/01/blog-07-01-1.jpg"
catalog:      true
tags:
    - ROS
    - Tutorials
    - Filesystem Tools
---
*****
>Abstract: "本教程主要介绍ROS文件系统的概念，并介绍了使用roscd，rosls和rospack命令行工具进行一些简单的演示，加深对文件级系统的理解。"<br>                                                                                                               <br />                                           

*****
##### Prerequisites
安装ros-tutorials
```bash
sudo apt-get install ros-<distro>-ros-tutorials
```
其中<distro\>为你用ROS版本

*****
### 文件系统概念
----------
文件系统包括Packages（功能包是ROS代码的软件组织单元。每个功能包可以包含库，可执行文件，脚本或其他工件)和package.xml(功能包清单是对功能包的描述。它用于定义包之间的依赖关系，并描述有关包的版本，维护者，许可证等元信息)

*****
### 命令行工具
----------
##### rospack
rospack命令可以查看关于功能包的一些属性，比如用rospack find找功能包的路径，用法如下：
```bash
rospack find [package_name]
```
假如要找roscpp的路径，输入下面的命令行：
```
rospack find roscpp
```
如果是ROS-Kinetic的话应该会看到下面的结果：
```
/opt/ros/kinetic/share/roscpp
```

##### roscd 
说明：roscd是rosbash的一部分，可以用roscd来进入到功能包的文件夹目录下，用法如下：
```bash
roscd [locationname[/subdir]]
```
例如，现在要进入roscpp目录下，可以输入下面的命令行：
```bash
roscd roscpp
```
进入了roscpp的文件目录下，查看现在的路径：
```bash
pwd
```
>说明：pwd命令可以打印工作目录（shell内置的命令），用法：pwd [-lp] 
(-p：打印的路径名不包含符号链接;-l：打印的路径名可以包含符号链接)

可以看到结果跟上面用rospack find找到的一样
>roscd与其他ROS工具一样，只会在ROS_PACKAGE_PATH中列出的目录中找到ROS包。要查看ROS_PACKAGE_PATH中的内容，递归搜索ROS_PACKAGE_PATH中的每个条目，将找到命名路径下的所有ROS软件包用下面的命令行：
```bash
echo $ROS_PACKAGE_PATH
```

##### roscd log
用roscd log可以进入ROS的日志文件夹目录

##### rosls
rosls是rosbash一个子命令，可以用rosls显示现在目录下的所有文件名(带后缀)这个效果跟ls一样；如果后面加功能包的话，可以显示功能包目录下的文件名ls没有这个功能，用法：
```bash
rosls [locationname[/subdir]]
```
例如，现在要查看roscpp_tutorials目录有哪些文件，输入下面的命令行：
```bash
rosls roscpp_tutorials
```
结果如下：
```
cmake  launch  package.xml  srv
```

##### Tab补全命令
支持使用Tab补全命令

*****
>参考链接：[Navigating the ROS Filesystem](http://wiki.ros.org/ROS/Tutorials/NavigatingTheFilesystem)

*****
