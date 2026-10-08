---
title: 搭建 LAMP 环境安装部署 Wordpress
date: 2021-05-01
references:
  - title: 基于ECS搭建云上博客
    url: https://developer.aliyun.com/adc/scenario/fdecd528be6145dcbe747f0206e361f3
categories: 工具与运维
tags: [WordPress, LAMP, 阿里云]
---

> 最近购买了阿里云学生机（轻量应用服务器，单核2G内存），预装载 CentOS 7.6。官方推荐 Putty 连接，我使用的 SSH 软件为 Xshell，用 Xftp 传输文件。第一次接触云服务器，在云主机上搭建 LAMP 环境并部署 Wordpress 博客应用，以下为我总结的一些操作步骤和流程，仅供测试参考。

<!--more-->

### 连接服务器

- 打开Xshell，填写主机IP、用户名（root）、密码
- 命令行出现：`Welcome to Alibaba Cloud Elastic Compute Service !`

### 安装Apache HTTP服务

- Apache是世界使用排名第一的Web服务器端软件，它可以运行在几乎所有广泛使用的计算机平台上，Apache由于其跨平台和安全性被广泛使用

- 安装Apache服务及其扩展包

  ```shell
  yum -y install httpd httpd-manual mod_ssl mod_perl mod_auth_mysql
  ```

- 启动Apache服务

  ```shell
  systemctl start httpd.service
  ```

- 访问IP地址，出现Apache测试页面

- Apache默认监听80端口

### 安装 MySQL 数据库

- 使用wordpress搭建云上博客，需要使用MySQL数据库存储数据

- 下载并安装MySQL官方的`Yum Repository`

  ```shell
  wget http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
  //三行分开输入
  yum -y install mysql57-community-release-el7-10.noarch.rpm
  
  yum -y install mysql-community-server
  ```

- 启动 MySQL 数据库

  ```shell
  systemctl start mysqld.service
  ```

- 查看MySQL运行状态（显示`Active: active`）

  ```sh
  systemctl status mysqld.service
  ```

- 查看MySQL初始密码

  ```shell
  grep "password" /var/log/mysqld.log
  ```

- 登陆MySQL数据库

  ```shell
  mysql -u root -p
  ```

- 修改MySQL密码

  ```mysql
  ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
  ```

- 创建wordpress数据库

  ```mysql
  create database wordpress; 
  show databases;    #查看数据库是否已创建
  ```

- 输入`exit`退出数据库

### 安装PHP语言环境

- WordPress是使用PHP语言开发的博客平台，PHP是全世界最好的语言(→_→)

- 安装PHP环境

  ```shell
  yum -y install php php-mysql gd php-gd gd-devel php-xml php-common php-mbstring php-ldap php-pear php-xmlrpc php-imap
  ```

- 创建PHP测试页面

  ```shell
  echo "<?php phpinfo(); ?>" > /var/www/html/phpinfo.php
  ```

- 重启Apache服务

  ```shell
  systemctl restart httpd
  ```

- 访问`IP地址/phpinfo.php`，显示PHP测试页面

### 安装配置Wordpress

- 安装Wordpress

  ```shell
  yum -y install wordpress
  ```

- 进入/usr/share/wordpress目录

  ```sh
  cd /usr/share/wordpress
  ```

- 修改`wp-config.php`指向路径为绝对路径

  ```sh
  ln -snf /etc/wordpress/wp-config.php wp-config.php
  ```

- 使用`ll`查看修改后的目录结构

- 在Apache的根目录`/var/www/html`下，创建一个`wp-blog`文件夹
  ```shell
  mkdir /var/www/html/wp-blog
  ```

- 移动wordpress到Apache根目录

  ```shell
  mv * /var/www/html/wp-blog/
  ```

- 修改`wp-config.php`配置文件

  ```shell
  sed -i 's/database_name_here/wordpress/' /var/www/html/wp-blog/wp-config.php
  sed -i 's/username_here/root/' /var/www/html/wp-blog/wp-config.php
  sed -i 's/password_here/数据库密码/' /var/www/html/wp-blog/wp-config.php
  ```

- 查看文件配置是否修改成功

  ```shell
  cat -n /var/www/html/wp-blog/wp-config.php
  ```

- 重启Apache服务

  ```shell
  systemctl restart httpd
  ```

### 测试Wordpress

- 访问`IP地址/wp-blog/wp-admin/install.php`

- 访问`IP地址/wp-blog/`即为WordPress页面
