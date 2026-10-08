---
title: 云上搭建基于 Anaconda 的 Jupyter 数据科学环境
date: 2021-05-09
references:
  - title: 如何在云服务器上设置可远端访问的jupyter notebook
    url: https://www.jianshu.com/p/fff4a61dee7a
categories: 数据分析
tags: [Jupyter, Anaconda, 云服务器]
---

> Jupyter Notebook 是基于浏览器网页的用于交互计算的应用程序，支持 Python、R、Julia 和 Scala 等多种语言，在数据科学相关领域有着非常大的用途。JupyterLab 是基于 web 的集成开发环境，包含了 Jupyter Notebook 所有功能的同时还支持操作终端、编辑 markdown 文本、打开交互模式、查看 csv 文件及图片等功能，最近在学习的 IBM 数据科学专项课程也都是基于 Jupyter Lab 的，在阿里云主机上部署 Jupyter 环境也能使研究和学习更加方便。以下为我总结的一些操作步骤和流程，可供参考。

<!--more-->

### 一、安装Anaconda

通过清华源安装最新版本 Anaconda：

```bash
wget http://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2020.11-Linux-x86_64.sh
bash Anaconda3-2020.11-Linux-x86_64.sh
# 狂按Enter>>yes>>继续狂按Enter安装
```

Anaconda 默认安装在 `/root/anaconda3` 目录下。

配置环境变量：

```bash
vim ~/.bashrc
# 添加下面两行内容
#added by Anaconda3 4.4.0 installer
export PATH="/root/anaconda3/bin:$PATH"
```

激活 Anaconda 环境并测试：

```bash
source ~/.bashrc
conda --version
```

添加清华镜像源，并搜索时显示通道地址：

```bash
conda config --add channels 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/'
conda config --set show_channel_urls yes
```

创建 jupyter notebook 运行环境：

```bash
conda create -n jupyter_notebook python=3
# source activate jupyter_notebook 激活环境
# source deactivate 退出环境
```

### 二、安装配置Jupyter

通过 Anaconda 安装 Jupyter Notebook：

```bash
conda install jupyter notebook
# 输入jupyter notebook --ip=127.0.0.1 --allow-root 可运行则为安装成功
```

生成 Jupyter Notebook 配置文件：

```bash
jupyter notebook --generate-config
```

设置 Jupyter Notebook 密码：

```bash
ipython
In [1]: from notebook.auth import passwd
In [2]: passwd()
Enter password: 
Verify password: 
Out[2]: '加密字符串'
```

修改配置文件：

```bash
vim /root/.jupyter/jupyter_notebook_config.py
#修改如下行
c.NotebookApp.ip = '*'
c.NotebookApp.password = '加密字符串'
c.NotebookApp.open_browser = False
c.NotebookApp.allow_root = True
```

启动 Jupyter Notebook：

```bash
jupyter notebook
```

启动 Jupyter Lab：

```bash
jupyter lab
```

远程访问方式：`公网ip地址:8888`

通过 SSH 端口映射到本地：

```bash
ssh -L8888:localhost:8888 root@106.15.200.147
```

访问方式：`localhost:8888`

### 三、注意事项

Jupyter Notebook 只适用于单用户登录，如果想搭建多用户的 Jupyter 的话，要使用 JupyterHub 进行搭建。

阿里云默认不打卡 8888 端口，需要在服务器管理控制台中设置开放端口。

### 添加 JAVA 环境支持

安装 JDK（过程略），[下载](https://github.com/SpencerPark/IJava/releases) Java 内核压缩包 `ijava`，上传到服务器，使用 `unzip` 命令解压。

安装 Java 内核：

```bash
python install.py --sys-prefix
```

查看 Jupyter 内核支持：

```python
jupyter kernelspec list
'''
Available kernels:
  java       /root/anaconda3/share/jupyter/kernels/java
  python3    /root/anaconda3/share/jupyter/kernels/python3
'''
```

