---
layout:       post
title:        "ROS Tutorials 2"
subtitle:     "ROS Package.xml"
date:         2018-07-01 12:25:00
author:       "G.J.先生"
header-img:   "img/in-post/2018.07/01/blog-07-01-2.jpg"
catalog:      true
tags:
    - ROS
    - ROS_Tutorials
    - Package.xml
---
*****
>Abstract: "catkin package必须包含的部分CMakeLists.txt和package.xml，本教程主要介绍package.xml的构成和文件描述。"<br>                                                                                                                          <br /> 


*****
### 查看功能包的依赖关系
----------
##### First-Order Dependencies(一级依赖)
一级依赖的查看命令：
```bash
rospack depends1 beginner_tutorials 
roscd beginner_tutorials
cat package.xml
```
>说明：cat命令的作用是打开package.xml文件

##### Indirect Dependencies(间接依赖)
依赖关系也会有自己的依赖关系，可以通过下面的命令行查看：
```bash
rospack depends1 rospy
```

##### 多个间接依赖
一个功能包可以有很多间接的依赖关系，可以用rospack命令查看：
```bash
rospack depends beginner_tutorials
```

*****
### Package.xml的构成
----------
##### 基本结构(Basic Structure)
以<package\>标签作为根标签文件:
```xml
<package format="2">

</package>
```

##### 必需标签(Required Tags)
有一小部分标签需要嵌套在<package\>标签中，以使包清单完整

Name | Illustration |
|:-|:-|
<name\> | 功能包的名称|
<version\> | 功能包的版本号（必须是3个点分隔的整数）| 
<description\> | 功能包内容的描述 |
<maintainer\> | 维护功能包的人员的名称 |
<license\> | 发布代码的软件许可证（例如GPL，BSD，ASL） |

不指定对其他包的任何依赖关系，有六种类型形式如下：
Name | Illustration|
|:-|:-|
<build_depend\> | 构建依赖关系(Build Dependencies）|
<build_export_depend\> | 构建导出依赖关系(Build Export Dependencies) |
<exec_depend\> | 执行依赖关系(Execution Dependencies) |
<test_depend\> | 测试依赖性(Test Dependencies) |
<buildtool_depend\> | 构建工具依赖关系(Build Tool Dependencies）|
<doc_depend\> | 文档工具相关性(Documentation Tool Dependencies)|

*****
### Package.xml的文件描述
----------
##### 描述标签（description tag）
第一句应该是简短的，同时包含功能包的信息。
```xml
  <description>The beginner_tutorials package</description>
```

##### 维护者标签（maintainer tags）
```xml
  <!-- One maintainer tag required, multiple allowed, one person per tag --> 
  <!-- Example:  -->
  <!-- <maintainer email="jane.doe@example.com">Jane Doe</maintainer> -->
  <maintainer email="user@todo.todo">user</maintainer>
```
这是package.xml必需且重要的标签，至少需要一个维护人员，格式如下：
```xml
  <maintainer email="you@yourdomain.tld">Your Name</maintainer>
```

##### 许可证标签（license tags）
```xml
  <!-- One license tag required, multiple allowed, one license per tag -->
  <!-- Commonly used license strings: -->
  <!--   BSD, MIT, Boost Software License, GPLv2, GPLv3, LGPLv2.1, LGPLv3 -->
  <license>TODO</license>
```
推荐使用BSD许可证，因为很多核心ROS组件已经使用它，格式如下：
```xml
  <license>BSD</license>
```

##### 依赖关系标签（dependencies tags）
主要要描述的依赖是build_depend, buildtool_depend, exec_depend, test_depend

这里描述的依赖是std_msgs, roscpp, and rospy，描述文件如下：
```xml
  <!-- The *_depend tags are used to specify dependencies -->
  <!-- Dependencies can be catkin packages or system dependencies -->
  <!-- Examples: -->
  <!-- Use build_depend for packages you need at compile time: -->
  <!--   <build_depend>genmsg</build_depend> -->
  <!-- Use buildtool_depend for build tool packages: -->
  <!--   <buildtool_depend>catkin</buildtool_depend> -->
  <!-- Use exec_depend for packages you need at runtime: -->
  <!--   <exec_depend>python-yaml</exec_depend> -->
  <!-- Use test_depend for packages you need only for testing: -->
  <!--   <test_depend>gtest</test_depend> -->
  <buildtool_depend>catkin</buildtool_depend>
  <build_depend>roscpp</build_depend>
  <build_depend>rospy</build_depend>
  <build_depend>std_msgs</build_depend>
```

下面添加exec_depend标签：
```xml
  <exec_depend>roscpp</exec_depend>
  <exec_depend>rospy</exec_depend>
  <exec_depend>std_msgs</exec_depend>
```

##### Package.xml文件实例
```xml
<?xml version="1.0"?>
<package format="2">
  <name>beginner_tutorials</name>
  <version>0.1.0</version>
  <description>The beginner_tutorials package</description>

  <maintainer email="you@yourdomain.tld">Your Name</maintainer>
  <license>BSD</license>
  <url type="website">http://wiki.ros.org/beginner_tutorials</url>
  <author email="you@yourdomain.tld">Jane Doe</author>

  <buildtool_depend>catkin</buildtool_depend>

  <build_depend>roscpp</build_depend>
  <build_depend>rospy</build_depend>
  <build_depend>std_msgs</build_depend>

  <exec_depend>roscpp</exec_depend>
  <exec_depend>rospy</exec_depend>
  <exec_depend>std_msgs</exec_depend>

</package>
```

*****
>参考链接：[Package.xml](http://wiki.ros.org/catkin/package.xml#Build.2C_Run.2C_and_Test_Dependencies)

*****
