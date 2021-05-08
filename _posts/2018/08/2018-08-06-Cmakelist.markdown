---
layout:       post
title:        "ROS CMakeLists"
subtitle:     "CMakeLists.txt"
date:         2018-08-06 01:30:00
author:       "GJXS"
header-img:   "img/in-post/2018.08/06/code.jpg"
catalog:      true
tags:
    - ROS
    - CMakeLists
---
*****
>Abstract: "基于ROS文件夹系统的CMakeLists.txt介绍"<br>                                                                                                                                                                                   <br /> 

----------
*************************

### Overview
CMakeLists.txt文件是用于构建软件包的CMake构建系统的输入（The file CMakeLists.txt is the input to the CMake build system for building software packages.）。任何符合CMake的包都包含一个或多个CMakeLists.txt文件，该文件描述了如何构建代码以及将代码安装到何处。用于catkin项目的CMakeLists.txt文件是标准的vanilla CMakeLists.txt文件，其中包含一些其他约束。

*************************

### Overall Structure and Ordering

| Name | Usage |
| -  | :-: |
| CMake的版本 | cmake_minimum_required() | 
| 功能包名称 | project() | 
| 查找构建所需的其他CMake/Catkin功能包 | find_package() | 
| 启用Python模块支持 | catkin_python_setup() | 
| 消息/服务/动作生成器 | add_message_files(), add_service_files(), add_action_files() | 
| 调用消息/服务/动作生成 | generate_messages() | 
| 指定功能包构建信息导出 | catkin_package() | 
| 要构建的库/可执行文件 | add_library()/add_executable()/target_link_libraries()  | 
| 测试构建 | catkin_add_gtest() | 
| 安装规则 | install() | 

*************************

### 面面俱到
##### CMake版本
每个catkin CMakeLists.txt文件必须以所需的CMake版本开头。Catkin需要2.8.3或更高版本。
```cmake
cmake_minimum_required(VERSION 2.8.3)
```

##### 功能包名称
用法如下：
```cmake
project(robot_brain)
```

##### 寻找相关的CMake包
使用CMake find_package函数指定需要找到哪些其他CMake包来构建我们的项目。catkin总是至少有一个依赖：
```cmake
find_package(catkin REQUIRED) 
```
如果将它们指定为组件，例如使用包nodelet：
```cmake
find_package(catkin REQUIRED COMPONENTS nodelet)
```

##### find_package()的作用
如果CMake通过find_package找到包，则会导致创建多个CMake环境变量，这些变量提供有关找到的包的信息。稍后可以在CMake脚本中使用这些环境变量。环境变量描述了功能包导出头文件的位置，源文件所在的位置，功能包所依赖的库以及这些库的路径，格式始终为<PACKAGE NAME>_<PROPERTY>:

| Name | Usage |
| -  | :-: |
| <NAME\>_FOUND | 如果找到库，则设置为true，否则设置为false | 
| <NAME\>_INCLUDE_DIRS or <NAME\>_INCLUDES | 导出功能包的路径 | 
| <NAME\>_LIBRARIES or <NAME\>_LIBS | 导出功能包的库 | 
| <NAME\>_DEFINITIONS |  ?  | 

>如果使用C ++和Boost，则需要在Boost上调用find_package()并指定您正在使用的Boost的哪些方面作为组件。例如，使用Boost线程:
>```cmake
find_package(Boost REQUIRED COMPONENTS thread)
```

##### catkin_package()
catkin_package()是一个catkin提供的CMake宏。这是为构建系统指定catkin特定信息所必需的，而后者又用于生成pkg-config和CMake文件。

在使用add_library()或者add_executable()声明任何目标之前，必须调用此函数。该函数有5个可选参数：

| Name | Usage |
| -  | :-: |
| INCLUDE_DIRS | 导出包含功能包的路径(即cflags) | 
| LIBRARIES | 项目中导出的库 | 
| CATKIN_DEPENDS | 该项目所依赖的其他catkin项目 | 
| DEPENDS | 此项目依赖的非catkin CMake项目 | 
| CFG_EXTRAS  | 其他配置选项 | 

例子：
```cmake
catkin_package(
   INCLUDE_DIRS include
   LIBRARIES ${PROJECT_NAME}
   CATKIN_DEPENDS roscpp nodelet
   DEPENDS eigen opencv)
```
这表示功能包文件夹中的“include”文件夹是导出头文件所在的位置。CMake环境变量 ${PROJECT_NAME}是传递给project()函数的任何内容，在这种情况下它将是“robot_brain”。“roscpp”+“nodelet”是构建/运行此功能包需要存在的功能包，“eigen”+“opencv”是构建/运行此功能包时需要存在的系统依赖性。

##### 指定构建目标
构建目标可以采用多种形式，但通常它们代表两种可能性之一：

| Name | Usage |
| -  | :-: |
| Executable Target | 可以运行的程序 | 
| Library Target  | 构建和/或运行时可由可执行目标使用的库 | 

###### 目标命名（Target Naming）
catkin中的构建目标的名称必须是唯一的，无论它们是构建/安装到哪个文件夹。可以使用set_target_properties（）函数将目标重命名为其他目标，例：
```cmake
set_target_properties(rviz_image_view
                      PROPERTIES OUTPUT_NAME image_view
                      PREFIX "")
```
这将在构建和安装输出中将目标rviz_image_view的名称更改为image_view。

###### 自定义输出目录（Custom output directory）
可执行文件和库的默认输出目录通常设置为合理的值，但在某些情况下必须自定义。即，包含Python绑定的库必须放在不同的文件夹中，以便可以在Python中导入：
```cmake
set_target_properties(python_module_library
  PROPERTIES LIBRARY_OUTPUT_DIRECTORY ${CATKIN_DEVEL_PREFIX}/${CATKIN_PACKAGE_PYTHON_DESTINATION})
```

###### Include Paths and Library Paths
在指定目标之前，您需要指定可以为所述目标找到资源的位置，特别是头文件和库：

| Name | Usage |
| -  | :-: |
| Include Paths | 在哪里可以找到正在构建的代码（在C/C++中最常见）的头文件 | 
| Library Paths | 可执行目标构建的库位于何处 | 
| include_directories(<dir1\>, <dir2\>, ..., <dirN\>) |  | 
| link_directories(<dir1\>, <dir2\>, ..., <dirN\>) |  | 

nclude_directories的参数应该是find_package调用生成的* _INCLUDE_DIRS变量以及需要包含的任何其他目录。如果您使用catkin和Boost，则include_directories（）调用应如下所示：
```cmake
include_directories(include ${Boost_INCLUDE_DIRS} ${catkin_INCLUDE_DIRS})
```

>第一个参数“include”表示包中的include/目录也是路径的一部分。

所有catkin和CMake软件包在find_packaged时自动添加其链接信息。只需链接到target_link_libraries()中的库,例：
```cmake
link_directories(~/my_libs)
```

###### Executable Targets）
要指定必须构建的可执行目标，我们必须使用add_executable() CMake函数。这将构建一个名为myProgram的目标可执行文件，它由3个源文件构成：src/main.cpp, src/some_file.cpp 和 src/another_file.cpp。
```cmake
add_executable(myProgram src/main.cpp src/some_file.cpp src/another_file.cpp)
```

###### Library Targets
该add_library() CMake的功能是用来指定库来构建。默认情况下，catkin构建共享库。
```cmake
add_library(${PROJECT_NAME} ${${PROJECT_NAME}_SRCS})
```

###### target_link_libraries
使用target_link_libraries()函数指定可执行目标链接的库。这通常在add_executable()调用之后完成,句法：
```cmake
target_link_libraries(<executableTargetName>, <lib1>, <lib2>, ... <libN>)
```
Example:
```cmake
add_executable(foo src/foo.cpp)
add_library(moo src/moo.cpp)
target_link_libraries(foo moo)  -- This links foo against libmoo.so
```
>请注意，在大多数用例中不需要使用link_directories()，因为该信息是通过find_package()自动引入的。

##### Messages, Services, and Action Targets
ROS中的消息（.msg），服务（.srv）和操作（.action）文件在构建和使用ROS包之前需要特殊的预处理器构建步骤。这些宏的关键是生成特定于编程语言的文件，以便可以使用所选编程语言中的消息，服务和操作。构建系统将使用所有可用的生成器（例如gencpp，genpy，genlisp等）生成绑定。提供了三个宏来分别处理消息，服务和操作：

| Name | 
| -  |
| add_message_files |  
| add_service_files |
| add_action_files |

然后，必须在调用生成的宏之后调用这些宏：
```cmake
generate_messages()
```

example:
如果你的软件包在名为“msg”的名为“ MyMessage1.msg ”和“ MyMessage2.msg ” 的目录中有两条消息，并且这些消息依赖于std_msgs和sensor_msgs，那么名为“srv”的目录中的服务名为“ MyService.srv ”，定义使用这些消息和服务的可执行message_program，以及可执行文件do_not_use_local_messages_program，它使用ROS的某些部分，但不包含此程序包中定义的消息/服务，那么您需要在CMakeLists.txt中使用以下内容：
```cmake
 # Get the information about this package's buildtime dependencies
  find_package(catkin REQUIRED
    COMPONENTS message_generation std_msgs sensor_msgs)

  # Declare the message files to be built
  add_message_files(FILES
    MyMessage1.msg
    MyMessage2.msg
  )

  # Declare the service files to be built
  add_service_files(FILES
    MyService.srv
  )

  # Actually generate the language-specific message and service files
  generate_messages(DEPENDENCIES std_msgs sensor_msgs)

  # Declare that this catkin package's runtime dependencies
  catkin_package(
   CATKIN_DEPENDS message_runtime std_msgs sensor_msgs
  )

  # 使用MyMessage1等定义可执行文件
  add_executable(message_program src/main.cpp)
  add_dependencies(message_program ${${PROJECT_NAME}_EXPORTED_TARGETS} ${catkin_EXPORTED_TARGETS})

  # define executable不使用此包提供的任何消息/服务
  add_executable(does_not_use_local_messages_program src/main.cpp)
  add_dependencies(does_not_use_local_messages_program ${catkin_EXPORTED_TARGETS})
```
>这些宏必须在catkin_package（）宏之前，以便生成正常工作。catkin_package（）宏必须对message_runtime具有CATKIN_DEPENDS依赖关系。

另外，如果要构建actionlib操作，并在“action”目录中有一个名为“ MyAction.action ” 的操作规范文件，则必须将actionlib_msgs添加到使用catkin find_packaged的组件列表中，并在之前添加以下调用对generate_messages（...）的调用：
```cmake
add_action_files(FILES
  MyAction.action
)
```
此外，功能包必须具有对actionlib_msgs的构建依赖性。

##### Enabling Python module support
如果你的ROS包提供了一些Python模块，你应该创建一个[setup.py](http://docs.ros.org/api/catkin/html/user_guide/setup_dot_py.html)文件并调用:
```cmake
catkin_python_setup()
```
>在调用generate_messages()和catkin_package()之前。

##### Unit Tests
有一个特定于catkin的宏用于处理名为catkin_add_gtest()的基于gtest的单元测试。
```cmake
if(CATKIN_ENABLE_TESTING)
  catkin_add_gtest(myUnitTest test/utest.cpp)
endif()
```

##### Optional Step: Specifying Installable Targets
指定目标应该结束的位置以便对代码进行“make install”，这是使用CMake install（）函数完成的，该函数作为参数：

| Name | Usage |
| -  | :-: |
| TARGETS  | 目标安装 | 
| ARCHIVE DESTINATION | 静态库和DLL（Windows）.lib存根 | 
| LIBRARY DESTINATION | 非DLL共享库和模块 | 
| RUNTIME DESTINATION | 可执行目标和DLL（Windows）样式共享库 | 

example:
```cmake
install(TARGETS ${PROJECT_NAME}
  ARCHIVE DESTINATION ${CATKIN_PACKAGE_LIB_DESTINATION}
  LIBRARY DESTINATION ${CATKIN_PACKAGE_LIB_DESTINATION}
  RUNTIME DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)
```
除了这些标准目标，一些文件必须安装到特殊文件夹。即，必须将包含Python绑定的库安装到可在Python中导入的其他文件夹中：
```cmake
install(TARGETS python_module_library
  ARCHIVE DESTINATION ${CATKIN_PACKAGE_PYTHON_DESTINATION}
  LIBRARY DESTINATION ${CATKIN_PACKAGE_PYTHON_DESTINATION}
)
```

##### Installing Python Executable Scripts
对于Python代码，安装规则看起来不同，因为没有使用add_library（）和add_executable（）函数:
```cmake
catkin_install_python(PROGRAMS scripts/myscript
  DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION})
```
>如果您只安装Python脚本并且不提供任何模块，则既不需要创建上面提到的setup.py文件，也不需要调用catkin_python_setup（）。

##### Installing header files
头文件也必须安装到“include”文件夹，这通常是通过安装整个文件夹的文件（可选择按文件名模式过滤并排除SVN子文件夹）来完成的。这可以通过如下安装规则来完成：
```cmake
install(DIRECTORY include/${PROJECT_NAME}/
  DESTINATION ${CATKIN_PACKAGE_INCLUDE_DESTINATION}
  PATTERN ".svn" EXCLUDE
)
```
或者如果include下的子文件夹与包名称不匹配：
```cmake
install(DIRECTORY include/
  DESTINATION ${CATKIN_GLOBAL_INCLUDE_DESTINATION}
  PATTERN ".svn" EXCLUDE
)
```

##### Installing roslaunch Files or Other Resources
其他资源如launchfiles可以安装到 ${CATKIN_PACKAGE_SHARE_DESTINATION}:
```cmake
install(DIRECTORY launch/
  DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}/launch
  PATTERN ".svn" EXCLUDE)
```

*************************

>参考链接：
>
>1.[catkinCMakeLists.txt](http://wiki.ros.org/catkin/CMakeLists.txt)

*************************















