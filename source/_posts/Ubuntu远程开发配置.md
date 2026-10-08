---
title: macOS + Ubuntu 实现远程开发配置
date: 2022-03-06
references:
  - title: 《LNMP环境镜像使用手册》
    url: https://oneinstack.com/docs/lnmpstack-image-guide/
categories: 工具与运维
tags: [Ubuntu, 阿里云, 远程开发]
---

> 刚刚续费了一年的阿里云轻量应用服务器，打算把大多数的开发环境放到服务器上，实现远程开发。我使用的是 macOS Monterey 和基于 Ubuntu 18.04 的 LNMP 镜像系统，IDE 选取 Visual Studio Code 和 IntelliJ IDEA 进行开发学习。以下为我总结的一些操作步骤和流程，可供参考。

<!--more-->

### 一、服务器镜像信息

我使用的是阿里云轻量应用服务器提供的 LNMP 7.4 镜像，该镜像为LNMP（Ubuntu18.04 64位+Nginx+MySQL5.7+PHP5.3～8.0切换）架构，jemalloc优化内存管理，脚本菜单式添加Nginx虚拟主机绑定，并支持内网OSS备份功能，是常见的搭建Web应用所需的环境，支持高并发性能。

应用程序安装信息：

- Nginx 1.18：`/usr/local/nginx`

- PHP 7.4：`/usr/local/php`
- MySQL 5.7：`/usr/local/mysql`
- 数据库地址：127.0.0.1:3306 
- 网站根目录：`/data/wwwroot`

查询数据库和 FTP 密码

```bash
sudo cat /root/ReadMe
```

### 二、Ubuntu 系统配置

依赖源设置：

```bash
mv /etc/apt/sources.list{,bak} #备份sources.list
cat > /etc/apt/sources.list << EOF
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse

deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
EOF
apt update
```

在防火墙添加规则放行 21、20000/30000 端口，允许通过 FTP 连接。

### 三、搭建开发环境

C/C++ 开发环境：

```bash
sudo apt-get install build-essential
```

Python3 开发环境：

```bash
python3 --version  
sudo apt-get install python3-pip
```

Java 开发环境：

```bash
sudo apt install openjdk-11-jdk
```

Go 开发环境：

```bash
sudo wget -c https://dl.google.com/go/go1.15.6.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
vim /etc/profile
```

添加以下内容：

```bash
export GOROOT=/usr/local/go
export GOPATH=/tufei/code/go
export GOBIN=$GOPATH/bin
export PATH=$GOPATH:$GOBIN:$GOROOT/bin:$PATH
```

保存：

```bash
source  /etc/profile
go version
```

Git 安装配置：

```bash
sudo apt-get install git
git config --global user.name "Zhuang Zhihao"
git config --global user.email "bezhuang@outlook.com"
ssh-keygen -t rsa -C "bezhuang@outlook.com"
cat /root/.ssh/id_rsa.pub
```

提交公钥到 Github 或其他 Git 仓库。

### 四、管理服务

Nginx：

```bash
service nginx {start|stop|status|restart|reload|configtest}
```

MySQL：

```bash
service mysqld {start|stop|restart|reload|status}
```

PHP：

```bash
service php-fpm {start|stop|restart|reload|status}
```

Pure-Ftpd：

```bash
service pureftpd {start|stop|restart|status}
```

Redis：

```bash
service redis-server {start|stop|status|restart}
```

Memcached：

```bash
service memcached {start|stop|status|restart|reload}
```

### 五、虚拟主机管理

添加虚拟主机：

```bash
cd /root/oneinstack
./vhost.sh
```

删除虚拟主机：

```bash
./vhost.sh --del
```

### 六、本地开发环境

使用 Visual Studio Code 中的 Remote -SSH 插件连接，

使用 Termius 进行 SSH 和 SFTP 连接，

博客现仍使用 Hexo，Typora 软件用于编写博客文章，uPic 软件用于上传图床。
