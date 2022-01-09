---
layout:       post
title:        "Kinectv2 Drive"
subtitle:     "install libfreenect2 and IAI Kinect2 "
date:         2018-07-18 12:27:00
author:       "GJXS"
header-img:   "http://aigrantli.com/limits.png"
catalog:      true
tags:
    - Kinect v2
    - libfreenect2
    - IAI Kinect2
---
*****
>Abstract: "该教程主要是用于Kinect One（Kinect v2）的ROS接口的工具和库的集合IAI Kinect2和libfreenect2的安装。"<br>                                                                                                                            <br /> 

----------

## libfreenect2
*************************

##### 依赖

Dependence | Version |
- | :-: |
OpenGL | 3.1 | 
OpenCL | 1.1 | 
CUDA  | 8.0 | 
OpenNI2  | 2.2.0.33 | 

1.安装依赖
<pre><code class="language-shell line-numbers">
#安装cmake
sudo apt-get install build-essential cmake pkg-config
#安装TurboJPEG
sudo apt-get install libturbojpeg libjpeg-turbo8-dev
#安装OpenNI2
sudo apt-get install libopenni2-dev && sudo apt-get install openni2-utils 
</code></pre>

2.安装OpenCL/CUDA
进入[官网](https://developer.nvidia.com/cuda-80-ga2-download-archive)
选择linux, x86_64, Ubuntu, 16.04, deb(local)
<pre><code class="language-shell line-numbers">
wget https://developer.nvidia.com/compute/cuda/8.0/Prod2/local_installers/cuda-repo-ubuntu1604-8-0-local-ga2_8.0.61-1_amd64-deb -O cuda-repo-ubuntu1604-8-0-local-ga2_8.0.61-1_amd64.deb
wget https://developer.nvidia.com/compute/cuda/8.0/Prod2/patches/2/cuda-repo-ubuntu1604-8-0-local-cublas-performance-update_8.0.61-1_amd64-deb -O cuda-repo-ubuntu1604-8-0-local-cublas-performance-update_8.0.61-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu1604-8-0-local-ga2_8.0.61-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu1604-8-0-local-cublas-performance-update_8.0.61-1_amd64.deb
sudo apt-get update
sudo apt-get install cuda
</code></pre>

<pre><code class="language-shell line-numbers">
#安装nvidia-modprobe and opencl-headers
sudo apt-get install nvidia-modprobe opencl-headers
</code></pre>
添加CUDA 路径到系统环境（~/.bashrc）
<pre><code class="language-shell line-numbers">
echo "export LD_LIBRARY_PATH="/usr/local/cuda/lib64:${LD_LIBRARY_PATH}"" >> ~/.bashrc
echo "export PATH="/usr/local/cuda/bin:${PATH}"" >> ~/.bashrc
source ~/.bashrc
</code></pre>

3.安装opencl
<pre><code class="language-shell line-numbers">
sudo apt-get install nvidia-opencl-dev nvidia-modprobe nvidia-libopencl1-384 nvidia-opencl-icd-384

sudo apt-get install nvidia-cuda-toolkit
</code></pre>

##### 下载源代码
<pre><code class="language-shell line-numbers">
git clone https://github.com/OpenKinect/libfreenect2.git
#下载升级文件
cd ~/libfreenect2/depends; ./download_debs_trusty.sh
#安装libusb
sudo dpkg -i debs/libusb*deb
#安装OpenGL
sudo dpkg -i debs/libglfw3*deb;
sudo apt-get install -f; 
sudo apt-get install libgl1-mesa-dri-lts-vivid
</code></pre>

##### 编译，链接
<pre><code class="language-shell line-numbers">
cd ~/libfreenect2 && mkdir build && cd build
cmake .. -DCMAKE_INSTALL_PREFIX=$HOME/freenect2
make
make install

#赋予权限
cd ~/libfreenect2
sudo cp platform/linux/udev/90-kinect2.rules /etc/udev/rules.d/
</code></pre>

##### 测试运行
重新插入kinect
<pre><code class="language-shell line-numbers">
#测试是否安装成功
cd ~/libfreenect2/build/bin && ./Protonect
#测试是否支持OpenGL
cd ~/libfreenect2/build/bin && ./Protonect gl
#测试是否支持OpenCL
cd ~/libfreenect2/build/bin && ./Protonect cl
#测试是否支持CPU
cd ~/libfreenect2/build/bin && ./Protonect cpu
</code></pre>

***********************************

### IAI Kinect2

##### 依赖

Dependence | Version |
- | :-: |
OpenCV | 2.4.x | 
OpenCL | x | 
Eigen  | x | 
PCL  | 1.7.x | 

1.安装Eigen 
<pre><code class="language-shell line-numbers">
sudo apt-get install libeigen3-dev
sudo cp -r  /usr/include/eigen3/Eigen  /usr/local/include/
</code></pre>

2.安装OpenCV
<pre><code class="language-shell line-numbers">
git clone https://github.com/opencv/opencv.git
cd opencv 
mkdir release
cd release
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D WITH_TBB=ON -D BUILD_TIFF=ON -D BUILD_NEW_PYTHON_SUPPORT=ON -D WITH_V4L=ON -D INSTALL_C_EXAMPLES=ON -D INSTALL_PYTHON_EXAMPLES=ON -D BUILD_EXAMPLES=ON -D WITH_QT=ON -D WITH_GTK=ON -D WITH_OPENGL=ON ..
make
sudo make install
</code></pre>
配置opencv相关文件
<pre><code class="language-shell line-numbers">
sudo gedit /etc/ld.so.conf.d/opencv.conf
#在这个空文件中加入如下代码并保存 
/usr/local/lib 
#执行下面命令使环境生效
sudo ldconfig 
#打开另外一个文件
sudo gedit /etc/bash.bashrc
#在末尾加如下两行：
export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig:$PKG_CONFIG_PATH
</code></pre>
测试是否安装成功

3.安装PCL1.8

安装依赖
<pre><code class="language-shell line-numbers">
sudo apt-get update
sudo apt-get install git build-essential linux-libc-dev
sudo apt-get install cmake cmake-gui 
sudo apt-get install libusb-1.0-0-dev libusb-dev libudev-dev
sudo apt-get install mpi-default-dev openmpi-bin openmpi-common  
sudo apt-get install libflann1.8 libflann-dev
sudo apt-get install libeigen3-dev
sudo apt-get install libboost-all-dev
sudo apt-get install libvtk5.10-qt4 libvtk5.10 libvtk5-dev
sudo apt-get install libqhull* libgtest-dev
sudo apt-get install freeglut3-dev pkg-config
sudo apt-get install libxmu-dev libxi-dev 
sudo apt-get install mono-complete
sudo apt-get install qt-sdk openjdk-8-jdk openjdk-8-jre
</code></pre>
下载并编译源代码
<pre><code class="language-shell line-numbers">
#下载源代码
git clone https://github.com/PointCloudLibrary/pcl.git
#编译
cd pcl && mkdir release && cd release
cmake -DCMAKE_BUILD_TYPE=None -DCMAKE_INSTALL_PREFIX=/usr \
           -DBUILD_GPU=ON -DBUILD_apps=ON -DBUILD_examples=ON \
           -DCMAKE_INSTALL_PREFIX=/usr ..
make && sudo make install
</code></pre>

##### 安装IAI Kinect2
<pre><code class="language-shell line-numbers">
#下载iai_kinect2包
mkdir -p ~/kinect_ws/src
cd ~/kinect_ws/src
git clone https://github.com/code-iai/iai_kinect2.git
#安装iai_kinect2依赖
cd ~/kinect_ws/src/iai_kinect2
rosdep install -r --from-paths .

#编译
cd ~/kinect_ws
catkin_make -DCMAKE_BUILD_TYPE="Release"
rospack profile

#环境设置
echo "source ~/kinect_ws/devel/setup.bash" >> ~/.bashrc 
#使环境生效
source ~/.bashrc
</code></pre>

<strong>测试运行 </strong><br>
<pre><code class="language-shell line-numbers">
roslaunch kinect2_bridge kinect2_bridge.launch
rosrun kinect2_viewer kinect2_viewer
</code></pre>

最后，由于前面安装PCL依赖的时候卸载了部分的功能包，现在重新安装一下ROS:[ROS Kinetic](https://www.gjxslisa.club/2018/06/25/ros/)

##### kinect V2的标定
<pre><code class="language-shell line-numbers">
#创建校准数据文件
mkdir ~/kinect_cal_data && cd ~/kinect_cal_data

#[ INFO] [Kinect2Bridge::initDevice] device serial:034011551247   
#在我的/home/robot/catkin_ws/src/iai_kinect2/kinect2_bridge/data的文件夹里建立一个文件夹，取名叫 034011551247 
rosrun kinect2_bridge kinect2_bridge _fps_limit:=2

###标定彩色摄像头：
#记录彩色摄像机的图像
rosrun kinect2_calibration kinect2_calibration chess5x7x0.03 record color
#校准内在函数
rosrun kinect2_calibration kinect2_calibration chess5x7x0.03 calibrate color

####标定红外：
#记录红外摄像机的图像
rosrun kinect2_calibration kinect2_calibration chess5x7x0.03 record ir
#校准红外摄像机的内在因素
rosrun kinect2_calibration kinect2_calibration chess5x7x0.03 calibrate ir

###帧同步标定：
rosrun kinect2_calibration kinect2_calibration chess5x7x0.02 record sync
#按几次空格键记录
rosrun kinect2_calibration kinect2_calibration chess5x7x0.02 calibrate sync

###深度标定：
####采集100张图
rosrun kinect2_calibration kinect2_calibration chess5x7x0.02 record depth
rosrun kinect2_calibration kinect2_calibration chess5x7x0.02 calibrate depth
</code></pre>
然后再把calib_color.yaml calib_ir.yaml calib_pose.yaml calib_depth.yaml拷贝到/home/robot/kinect_ws/src/iai_kinect2/kinect2_bridge/data/034011551247文件夹中


>出现下面问题时：
>问题1:ERROR: the following packages/stacks could not have their rosdep keys resolved to system dependencies:
>解决方法:将命令改写为这个：
<pre><code class="language-shell line-numbers">
rosdep install --from-paths ~/kinect_ws/src/iai_kinect2 --ignore-src -r
</code></pre>

>问题2:In file included from /opt/ros/kinetic/include/opencv-3.2.0-dev/opencv2/flann/flann_base.hpp:41:0,
                 from /opt/ros/kinetic/include/opencv-3.2.0-dev/opencv2/flann.hpp:48,
                 from /opt/ros/kinetic/include/opencv-3.2.0-dev/opencv2/opencv.hpp:62,
                 from /home/grey/inmoov_ros/src/iai_kinect2/kinect2_registration/include/kinect2_registration/kinect2_registration.h:24,
                 from /home/grey/inmoov_ros/src/iai_kinect2/kinect2_registration/src/kinect2_registration.cpp:18:
/opt/ros/kinetic/include/opencv-3.2.0-dev/opencv2/flann/saving.h: In function ‘cvflann::IndexHeader cvflann::load_header(FILE*)’:
/opt/ros/kinetic/include/opencv-3.2.0-dev/opencv2/flann/saving.h:113:63: error: exception handling disabled, use -fexceptions to enable
         throw FLANNException("Invalid index file, cannot read");


在kinect2_registration中的cmakelists.txt插入“add_definitions（-fexceptions）”并允许catkin_make完成：
<pre><code class="language-cmake line-numbers">
if(OpenCL_FOUND)
  message(STATUS "OpenCL based depth registration enabled")
  set(EXPORTED_DEPENDENCIES OpenCL)
  add_definitions( -fexceptions )
</code></pre>

>问题3：CUDA安装出错
安装CUDA8.0要降低gcc和g++版本到5.0以下（可用4.9或者4.8版本的gcc和g++）

<pre><code class="language-shell line-numbers">
#查看当前gcc版本
gcc -v

#安装gcc4.9
sudo apt-get install gcc-4.9 gcc-4.9-multilib g++-4.9 g++-4.9-multilib

#安装好后输入以下指令
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.9 40 
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-5 50

#接着输入：
sudo update-alternatives --config gcc
#会看到如下的选项，有 3 个候选项可用于替换 gcc (提供 /usr/bin/gcc)。 
#要维持当前值[*]请按回车键，或者键入选择的编号： 

#同样也要设置一下g++的 
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-5 50 
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.9 40

#再用下面命令来看一下版本是否改变了
gcc -v 
</code></pre>

*******************************
>参考链接
>
>1.[ubuntu16.04搭建opencv2.4.13开发环境](https://blog.csdn.net/a1491973970/article/details/52847677)
>
>2.[PCL](http://www.pointclouds.org/documentation/tutorials/compiling_pcl_posix.php)
>
>3.[CUDA Toolkit 8.0 - Feb 2017](https://developer.nvidia.com/cuda-80-ga2-download-archive)
>
>4.[Ubuntu下gcc多版本共存和版本切换](https://www.cnblogs.com/zengkefu/p/7103359.html)
>
>5.[ubuntu 16.04 下安装PCL](https://blog.csdn.net/yaningli/article/details/72898201)
>
>6.[Unable to compile anymore #377](https://github.com/code-iai/iai_kinect2/issues/377)
>

********************************
