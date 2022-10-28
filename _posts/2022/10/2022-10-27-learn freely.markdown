---
layout:       post
title:        "LEARN FREELY"
subtitle:     "A method of scientific Internet access"
date:         2022-10-27 01:12:00
author:       "GrantLi"
header-img:   "http://aigrantli.com/ssr.jpeg"
catalog:      true
tags:
    - ssr
    - Ubuntu
---
*****
>Abstract: "Provide a scientific Internet access method and terminal scientific agent tutorial based on ubuntu system. "                               

*****

##### 系统要求
Ubuntu版本：18.04及以上 

*****

##### 安装ssr软件
1.下载、安装ssr软件
<pre><code class="language-shell line-numbers">
# 下载软件
wget https://mirrors.sdu.edu.cn/spark-store-repository//store/network/shadowsocks-electron/shadowsocks-electron_1.1.8_amd64.deb

# 安装软件
sudo dpkg -i shadowsocks-electron_1.1.8_amd64.deb
</code></pre>


##### 配置ssr软件
1. 导入ssr账号,[免费账号链接](https://github.com/Alvin9999/new-pac/wiki/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7)。

2. 选择全局代理。在<code>设置</code>打开http代理。


##### 配置终端代理
1.打开<code>.bashrc</code>
<pre><code class="language-shell line-numbers">
gedit ~/.bashrc
</code></pre>
2.在<code>.bashrc</code>后面增加下面代理指令：

<pre><code class="language-shell line-numbers">
# 12333是默认的代理端口
export http_proxy='http://localhost:1095'   
export https_proxy='http://localhost:1095'
</code></pre>

3.更新环境:
<pre><code class="language-shell line-numbers">
source ~/.bashrc
</code></pre>

4.测试：
<pre><code class="language-shell line-numbers">
wget www.google.com
</code></pre>
如果能把google首页下载到主目录下，说明配置成功。


*****
>参考链接: 

>1. [Ubuntu终端上网的方法](https://colainlibrary.com/archives/42db6ec5.html)                             


>2. [web商店](https://www.spark-app.store/store/sort/network)

*****

