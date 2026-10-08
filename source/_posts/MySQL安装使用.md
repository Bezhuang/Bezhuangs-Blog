---
title: MySQL 的安装和使用
date: 2020-09-01
categories: 数据库
tags: [MySQL, 数据库]
---

> MySQL 是目前应用最广泛的开源关系数据库，在学习完 [SQL 语言基础](/SQL基础)后，需要使用 MySQL 进行学习、开发、测试，部署，本篇笔记是我对 MySQL 的安装和使用的记录，可供参考。

### 下载

- https://downloads.mysql.com/archives/community/

### 添加环境变量

- 在`系统变量`中新建 `MYSQL_HOME`
- 在`系统变量`中找到并双击 `Path`
- `新建` `%MYSQL_HOME%\bin`
- 选择`命令提示符(管理员)`，敲入`mysql`，回车,如果提示 `Can't connect to MySQL server on 'localhost'` 则证明添加成功

### 新建配置文件

- 新建一个文本文件，内容如下：

    ```properties
    [mysql]
    default-character-set=utf8
    
    [mysqld]
    character-set-server=utf8
    default-storage-engine=INNODB
    sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
    ```

- 把上面的文本文件另存为 `my.ini`，存放的路径为 MySQL 的`根目录`
- 上面代码意思就是配置数据库的默认编码集为utf-8和默认存储引擎为INNODB。

### 初始化

```
mysqld --initialize-insecure
```

- 如果出现没有出现报错信息，则证明 data 目录初始化没有问题，此时再查看MySQL目录下已经有data目录生成。


### 注册 MySQL 服务

```
mysqld -install
```

- 现在你的计算机上已经安装好了MySQL服务了

### 启动 MySQL 服务

```java
net start mysql  // 启动mysql服务
    
net stop mysql  // 停止mysql服务
```

### 默认账户密码

```
mysqladmin -u root password 1234
```

- 这里的 `1234` 就是指默认管理员（root 账户）的密码


### 登录 MySQL

```
mysql -uroot -p1234
```

- 下角为`mysql>`，则登录成功


### 退出 MySQL

```
exit
quit
```

### 登陆参数

```
mysql -u用户名 -p密码 -h要连接的mysql服务器的ip地址(默认127.0.0.1) -P端口号(默认3306)
```

### 卸载 MySQL

```
net stop mysql

mysqld -remove mysql
```

- 删除MySQL目录及相关的环境变量。
