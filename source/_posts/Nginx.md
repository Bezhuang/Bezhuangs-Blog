---
title: Nginx 反向代理
date: 2023-05-14
references:
  - title: nginx一小时入门精讲课程
    url: https://www.bilibili.com/video/BV1rG4y1e7BQ
categories: 工具与运维
tags: [Nginx, 反向代理, 服务器]
---

> Nginx 是一款轻量级的 Web 服务器、反向代理服务器，由于它的内存占用少，启动极快，高并发能力强，在互联网项目中广泛应用。为了方便学习和测试，我使用的是 Ubuntu + [MySQL](https://blog.csdn.net/hwx865/article/details/90287715) + [OpenJDK](https://blog.csdn.net/qq_40492048/article/details/114389875) 华为云环境，以下为我总结的一些操作步骤和流程，仅供测试参考。

<!--more-->

### 一、Nginx 安装与启动

关闭防火墙：

```
sudo systemctl stop firewalld
sudo systemctl disable firewalld
```

安装命令和常用命令：

```
#安装
sudo apt-get install nginx

#启动，能访问80端口
nginx 
curl 127.0.0.1:80

#立即停止
nginx -s stop

#执行完当前请求再停止
nginx -s quit

#重新加载配置文件，相当于restart
nginx -s reload

#将日志写入一个新的文件
nginx -s reopen

#测试配置文件
nginx -t

#查看日志中的错误
cd /var/log/nginx
tail -f error.log
```

使用 `systemctl `启动、停止、重新加载：

```
systemctl start nginx

systemctl status nginx

#产看日志
journalctl -xe

systemctl stop nginx

systemctl reload nginx

#配置开机启动
systemctl enable nginx
```

### 二、配置文件

配置文件位于 `/etc/nginx/nginx.conf `，下列命令会引用` /etc/nginx/conf.d `目录下所有的 `.conf `文件，这样可以保持主配置文件的简洁，同时配个多个` .conf `文件方便区分，增加可读性。

```nginx
include /etc/nginx/conf.d/*.conf;
```

默认配置文件： `/etc/nginx/conf.d/default.conf`

```nginx
server {
    listen       80; #监听端口
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html; #根目录
        index  index.html index.htm; #首页
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

配置文件结构：

```nginx
http {
  server{#虚拟主机 
    location {
      listen 80；
      server_name localhost;
    }
    location {    
    }
  }
  server{
  }
}
```

添加静态网站： `/etc/nginx/conf.d/8000.conf`

```nginx
server{
  
    listen 8000;
    server_name localhost;
    
    location / {
        root /home/AdminLTE-3.2.0;
        index index.html index2.html index3.html;
    }
  
}
```

虚拟主机 `server` 通过 `listen` 和 `server_name` 进行区分，如果有多个` server` 配置，`listen + server_name` 不能重复。

#### listen

监听可以配置成 `IP` 或`端口`或 `IP+端口` 

```
listen 127.0.0.1:8000; 
listen 127.0.0.1;（ 端口不写,默认80 ） 
listen 8000; 
listen *:8000; 
listen localhost:8000;
```

#### server_name

`server_name` 主要用于区分，可以随便起。也可以使用变量 ` $hostname ` 配置成主机名。或者配置成域名：` example.org ` ` www.example.org ` ` *.example.org `

如果多个 server 的端口重复，那么根据`域名`或者`主机名`去匹配 `server_name` 进行选择。

### 三、HTTP 反向代理

在客户端代理转发请求称为正向代理，例如 VPN。在服务器端代理转发请求称为反向代理，例如 nginx。

<img src="https://cdn.nlark.com/yuque/0/2022/png/28915315/1659084328663-32955bb1-82f0-40f3-b94a-f233b4a5793f.png" style="zoom: 50%;" />

启动 Springboot 后台服务，端口为 8088；

```bash
java -jar ruoyi-admin.jar
```

添加 Nginx 配置文件 `8001.conf`：

```nginx
server {
  
  listen 8001;
  
  server_name ruoyi.localhost;
  
  location / {
    proxy_pass http://localhost:8088;
  }

}
```

#### `proxy_pass` 配置说明

```nginx
location /some/path/ {
    proxy_pass http://localhost:8080;
}
```

-   如果 `proxy-pass` 的地址只配置到端口，不包含 `/` 或其他路径，那么 location 将被追加到转发地址中。如上所示，访问 `http://localhost/some/path/page.html` 将被代理到 `http://localhost:8080/some/path/page.html` 

```nginx
location /some/path/ {
    proxy_pass http://localhost:8080/zh-cn/;
}
```

-   如果`proxy-pass`的地址包括`/`或其他路径，那么/some/path将会被替换，如上所示，访问 `http://localhost/some/path/page.html` 将被代理到 `http://localhost:8080/zh-cn/page.html`。‎

#### 设置代理请求 headers

‎用户可以重新定义或追加header信息传递给后端[‎](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass_request_headers)‎服务器。可以包含文本、变量及其组合。默认情况下，仅重定义两个字段：‎

```nginx
proxy_set_header Host       $proxy_host;
proxy_set_header Connection close;
```

由于使用反向代理之后，后端服务无法获取用户的真实IP，所以，一般反向代理都会设置以下header信息。

```nginx
location /some/path/ {
    #nginx的主机地址
    proxy_set_header Host $http_host;
    #用户端真实的IP，即客户端IP
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_pass http://localhost:8088;
}
```

常用变量的值：

-   `$host`：nginx主机IP，例如192.168.56.105
-   `$http_host`：nginx主机IP和端口，192.168.56.105:8001
-   `$proxy_host`：localhost:8088，proxy_pass里配置的主机名和端口
-   `$remote_addr`:用户的真实IP，即客户端IP。

#### 非 HTTP 代理

如果要将请求传递到非 HTTP 代理服务器，可以使用下列指令：

-   [fastcgi_pass](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html#fastcgi_pass) 将请求转发到FastCGI服务器（多用于PHP）
-   [scgi_pass](https://nginx.org/en/docs/http/ngx_http_scgi_module.html#scgi_pass) 将请求转发到SCGI server服务器（多用于PHP）
-   [uwsgi_pass](https://nginx.org/en/docs/http/ngx_http_uwsgi_module.html#uwsgi_pass) 将请求转发到uwsgi服务器（多用于python）
-   [memcached_pass](https://nginx.org/en/docs/http/ngx_http_memcached_module.html#memcached_pass) 将请求转发到memcached服务器

### 四、动静分离和负载均衡

其他内容，可以继续学习：[nginx 一小时入门教程文字版](https://www.yuque.com/wukong-zorrm/cql6cz/rvmsl7) 或 [nginx 一小时入门教程视频版](https://www.bilibili.com/video/BV1rG4y1e7BQ)
