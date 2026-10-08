---
title: HTTP 协议和 Servlet
date: 2022-04-05
references: 
  - title: Java web从入门到企业实战
    url: https://www.bilibili.com/video/BV1Qf4y1T7Hx
categories: 后端开发
tags: [Java, Servlet, HTTP]
---

> Java Web 核心第一章。Java Web 是用 Java 技术来解决相关 web 互联网领域的技术栈，国内很多大型网站公司也是首选 Java 语言来解决 web 互联网相关的问题。要了解 Java Web 开发的技术栈，首先需要理解 HTTP 协议和 HTTP 请求与响应数据的格式，理解 Servlet 的执行流程和生命周期，掌握 Servlet 的使用和相关配置。在 JavaEE 的诸多组件中，做 Web 开发一定躲不开的是 Servlet。Servlet 是一套用于处理 HTTP 请求的 API 标准。我们可以基于 Servlet 实现 HTTP 请求的处理。但是 JavaEE 当中只提供了 Servlet 的标准，要真正运行 Servlet，需要使用 Servlet Container，如 Tomcat。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、HTTP 协议

HyperText Transfer Protocol（超文本传输协议）规定了浏览器和服务器之间数据传输的规则。数据传输的规则指的是请求数据和响应数据需要按照指定的格式进行传输。

HTTP 协议是基于 TCP 的协议，TCP 是一种面向连接的（建立连接前是需经过三次握手）、可靠的、基于字节流的传输层通信协议，在数据传输方面更安全。

HTTP 同样也是基于请求—响应模型的，一次请求对应一次响应，请求和响应是一一对应关系。

HTTP 协议是无状态协议，对于事物处理没有记忆能力，每次请求—响应都是独立的。无状态指的是客户端发送 HTTP 请求给服务端之后，服务端根据请求响应数据，响应完后，不会记录任何信息。这种特性有优点也有缺点，缺点是多次请求间不能共享数据，但速度快。

请求之间无法共享数据会引发的问题，如电商网站加入购物车和去购物车结算是两次请求，加入购物车请求响应结束后，并未记录加入购物车是何商品，发起去购物车结算的请求后，因为无法获取哪些商品加入了购物车，会导致此次请求无法正确展示数据，在 Java Web 中要使用会话技术（Cookie、Session）来解决这个问题。

#### 请求数据格式

HTTP 请求数据总共分为三部分内容，分别是请求行、请求头、请求体，请求方式有七种，最常用的是 GET 和 POST 方法。

请求行是 HTTP 请求中的第一行数据，请求行包含三块内容，分别是 `[请求方式] /[请求URL路径] / [HTTP协议及版本]`。

```http
GET / HTTP/1.1
```

请求头从第二行开始，格式均为 `key: value` 形式，请求头中会包含若干个属性。

```HTTP
Host: 请求的主机名
User-Agent: 浏览器版本, Mozilla/5.0 Chrome/79
Accept：表示浏览器能接收的资源类型，如text/*，image/*或者*/*表示所有
Accept-Language：表示浏览器偏好的语言，服务器可以据此返回不同语言的网页
Accept-Encoding：表示浏览器可以支持的压缩类型，例如gzip, deflate等
```

服务端可以根据请求头中的内容来获取客户端的相关信息，有了这些信息服务端就可以处理不同的业务需求，比如浏览器兼容问题。

请求体是 POST 请求的最后一部分，存储请求参数，请求体和请求头之间是有一个空行隔开。

```http
username=bezhuang@password=1234
```

GET 和 POST 两个请求的区别：GET 请求请求参数在请求行中，没有请求体，POST 请求请求参数在请求体中，GET 请求请求参数大小有限制，POST 没有。

#### 响应数据格式

响应数据总共分为三部分内容，分别是响应行、响应头、响应体。

响应行是响应数据的第一行，响应行包含三块内容，分别是 `[HTTP协议及版本] [响应状态码] [状态码的描述]`。

```http
HTTP/1.1 200 OK
```

响应状态码

* 200  ok 客户端请求成功
* 404  Not Found 请求资源不存在
* 500 Internal Server Error 服务端发生不可预期的错误

响应头从第二行开始，格式也为 `key：value` 形式，响应头中会包含若干个属性。

```http
Content-Type：表示该响应内容的类型，例如text/html，image/jpeg；
Content-Length：表示该响应内容的长度（字节数）；
Content-Encoding：表示该响应压缩算法，例如gzip；
Cache-Control：指示客户端应如何缓存，例如max-age=300表示可以最多缓存300秒
```

响应体是最后一部分，存放响应数据，`<html>数据内容</html>`。

#### 自定义服务器

可以使用 Java 编写服务器，用来接受页面发送的请求和响应数据给前端浏览器，主要使用到的是 `ServerSocket` 和 `Socket`。

```java
package com.itheima;
import sun.misc.IOUtils;
import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

public class Server {
    public static void main(String[] args) throws IOException {
        ServerSocket ss = new ServerSocket(8080); // 监听指定端口
        System.out.println("server is running...");
        while (true){
            Socket sock = ss.accept();
            System.out.println("connected from " + sock.getRemoteSocketAddress());
            Thread t = new Handler(sock);
            t.start();
        }
    }
}
class Handler extends Thread {
    Socket sock;

    public Handler(Socket sock) {
        this.sock = sock;
    }
    public void run() {
        try (InputStream input = this.sock.getInputStream()) {
            try (OutputStream output = this.sock.getOutputStream()) {
                handle(input, output);
            }
        } catch (Exception e) {
            try {
                this.sock.close();
            } catch (IOException ioe) {
            }
            System.out.println("client disconnected.");
        }
    }
    private void handle(InputStream input, OutputStream output) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(input, StandardCharsets.UTF_8));
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(output, StandardCharsets.UTF_8));
        // 读取HTTP请求:
        boolean requestOk = false;
        String first = reader.readLine();
        if (first.startsWith("GET / HTTP/1.")) {
            requestOk = true;
        }
        for (;;) {
            String header = reader.readLine();
            if (header.isEmpty()) { // 读取到空行时, HTTP Header读取完毕
                break;
            }
            System.out.println(header);
        }
        System.out.println(requestOk ? "Response OK" : "Response Error");
        if (!requestOk) {
            // 发送错误响应:
            writer.write("HTTP/1.0 404 Not Found\r\n");
            writer.write("Content-Length: 0\r\n");
            writer.write("\r\n");
            writer.flush();
        } else {
            // 发送成功响应:
            //读取html文件，转换为字符串
            BufferedReader br = new BufferedReader(new FileReader("http/html/a.html"));
            StringBuilder data = new StringBuilder();
            String line = null;
            while ((line = br.readLine()) != null){
                data.append(line);
            }
            br.close();
            int length = data.toString().getBytes(StandardCharsets.UTF_8).length;
            writer.write("HTTP/1.1 200 OK\r\n");
            writer.write("Connection: keep-alive\r\n");
            writer.write("Content-Type: text/html\r\n");
            writer.write("Content-Length: " + length + "\r\n");
            writer.write("\r\n"); // 空行标识Header和Body的分隔
            writer.write(data.toString());
            writer.flush();
        }
    }
}
```

### 二、Tomcat 服务器

Web 服务器是一个安装在服务器端的对 HTTP 协议的操作进行封装的应用程序，使得程序员不必直接对协议进行操作，让 Web 开发更加便捷，当Web服务器软件启动后，部署在Web服务器软件中的页面就可以直接通过浏览器来访问了。

Tomcat 是 Apache 软件基金会一个核心项目，是一个开源免费的轻量级 Web 服务器，支持 Servlet/JSP 少量 JavaEE 规范。JavaEE 规范是指 Java 企业级开发的技术规范总和。因为 Tomcat 支持 Servlet/JSP 规范，所以 Tomcat 也被称为Web容器、Servlet容器。Servlet需要依赖 Tomcat 才能运行。

使用 Maven 工具能更加简单快捷的把 Web 项目给创建出来，创建方式有两种：使用骨架和不使用骨架。使用骨架，默认没有 java 和 resources 目录，需要手动完成创建补齐，不使用骨架要在 pom.xml 设置打包方式为 war、补齐 Maven Web 项目缺失 webapp 的目录结构和 WEB-INF/web.xml 的目录结构。

Maven Web 项目创建成功后，通过 Maven 的 package 命令可以将项目打包成 war 包，将 war 文件拷贝到 Tomcat 的 webapps 目录下，启动 Tomcat 就可以将项目部署成功，然后通过浏览器进行访问即可。

在 IDEA 中可以直接使用 Maven 中的 Tomcat 插件来部署项目，即在 pom.xml 中添加 Tomcat 插件，再使用 Maven Helper 插件快速启动项目。

```xml
<build>
    <plugins>
    	<!--Tomcat插件 -->
        <plugin>
            <groupId>org.apache.tomcat.maven</groupId>
            <artifactId>tomcat7-maven-plugin</artifactId>
            <version>2.2</version>
            <configuration>
            	<port>80</port><!--访问端口号 -->
                <!--项目访问路径
					未配置访问路径: http://localhost:80/tomcat-demo2/a.html
					配置/后访问路径: http://localhost:80/a.html
					如果配置成 /hello,访问路径会变成什么?
						答案: http://localhost:80/hello/a.html
				-->
                <path>/</path>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### 三、Servlet

Servlet 是 Java Web 最为核心的内容，它是 Java 提供的一门动态 web 资源开发技术。使用 Servlet 就可以实现根据不同的登录用户在页面上动态显示不同内容。Servlet 是 JavaEE 规范之一，其实就是一个接口，将来我们需要定义 Servlet 类实现 Servlet 接口，并由 web 服务器运行 Servlet。

#### 快速入门

编写一个 Servlet 类，并使用 IDEA 中 Tomcat 插件进行部署，最终通过浏览器访问所编写的 Servlet 程序。具体的实现步骤如下：

1. 创建 Web 项目 `web-demo`，导入 Servlet 依赖坐标。

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <!--
      此处为什么需要添加该标签?
      provided指的是在编译和测试过程中有效,最后生成的war包时不会加入
       因为Tomcat的lib目录中已经有servlet-api这个jar包，如果在生成war包的时候生效就会和Tomcat中的jar包冲突，导致报错
    -->
    <scope>provided</scope>
</dependency>
```

2. 创建：定义一个类，实现 Servlet 接口，并重写接口中所有方法，并在 service 方法中输入一句话。

```java
package com.itheima.web;
import javax.servlet.*;
import java.io.IOException;
public class ServletDemo1 implements Servlet {
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("servlet hello world~");
    }
    public void init(ServletConfig servletConfig) throws ServletException {
    }
    public ServletConfig getServletConfig() {
        return null;
    }
    public String getServletInfo() {
        return null;
    }
    public void destroy() {
    }
}
```

3. 配置：在类上使用 `@WebServlet` 注解，配置该 Servlet 的访问路径。

```java
@WebServlet("/demo1")
```

4. 访问：启动 Tomcat，浏览器中输入 URL 地址访问该 Servlet。

```http
http://localhost:8080/web-demo/demo1
```

5. 通过浏览器访问后，在控制台会打印 `servlet hello world~` ，说明 servlet 程序已经成功运行。

#### 执行流程

Servlet 的执行流程：浏览器发出 `http://localhost:8080/web-demo/demo1` 请求，从请求中可以解析出三部分内容，分别是 `localhost:8080`、`web-demo`、`demo1`，根据 `localhost:8080` 可以找到要访问的 Tomcat Web 服务器，根据 `web-demo` 可以找到部署在 Tomcat 服务器上的 web-demo 项目，根据 `demo1` 可以找到要访问的是项目中的哪个 Servlet 类，根据 `@WebServlet` 后面的值进行匹配。

找到 ServletDemo1 这个类后，Tomcat Web 服务器就会为 ServletDemo1 这个类创建一个对象，然后调用对象中的 service 方法。

ServletDemo1 实现了 Servlet 接口，所以类中必然会重写 service 方法供 Tomcat Web 服务器进行调用，service 方法中 ServletRequest 和 ServletResponse 两个参数，ServletRequest 封装的是请求数据，ServletResponse 封装的是响应数据，后期我们可以通过这两个参数实现前后端的数据交互。

Servlet 由 web 服务器创建，Servlet 方法由 web 服务器调用。

因为我们自定义的 Servlet 必须实现 Servlet 接口并复写其方法，而 Servlet 接口中有 service 方法，因此服务器知道 Servlet 中一定有 service 方法。

#### 生命周期

对象的生命周期指一个对象从被创建到被销毁的整个过程。

Servlet 运行在 Servlet 容器（web 服务器）中，其生命周期由容器来管理，分为 4 个阶段：

1. 加载和实例化：默认情况下，当 Servlet 第一次被访问时，由容器创建 Servlet 对象，，但是如果创建 Servlet 比较耗时的话，那么第一个访问的人等待的时间就比较长，用户的体验就比较差，那么我们可以把 Servlet 的创建放到服务器启动的时候来创建。

```java
@WebServlet(urlPatterns = "/demo1",loadOnStartup = 1)
/*
loadOnstartup的取值有两类情况
	（1）负整数:第一次访问时创建Servlet对象
	（2）0或正整数:服务器启动时创建Servlet对象，数字越小优先级越高
*/
```

2. 初始化：在 Servlet 实例化之后，容器将调用 Servlet 的 `init()` 方法初始化这个对象，完成一些如加载配置文件、创建连接等初始化的工作。该方法只调用一次。
3. 请求处理：每次请求 Servlet 时，Servlet 容器都会调用 Servlet 的 `service()` 方法对请求进行处理
4. 服务终止：当需要释放内存或者容器关闭时，容器就会调用 Servlet 实例的 `destroy()` 方法完成资源的释放。在 `destroy()` 方法调用之后，容器会释放这个 Servlet 实例，该实例随后会被 Java 的垃圾收集器所回收。

通过案例演示 Servlet 生命周期方法

```java
package com.itheima.web;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;
/**
* Servlet生命周期方法
*/
@WebServlet(urlPatterns = "/demo2",loadOnStartup = 1)
public class ServletDemo2 implements Servlet {
    /**
     *  初始化方法
     *  1.调用时机：默认情况下，Servlet被第一次访问时，调用
     *      * loadOnStartup: 默认为-1，修改为0或者正整数，则会在服务器启动的时候，调用
     *  2.调用次数: 1次
     * @param config
     * @throws ServletException
     */
    public void init(ServletConfig config) throws ServletException {
        System.out.println("init...");
    }
    /**
     * 提供服务
     * 1.调用时机:每一次Servlet被访问时，调用
     * 2.调用次数: 多次
     * @param req
     * @param res
     * @throws ServletException
     * @throws IOException
     */
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        System.out.println("servlet hello world~");
    }
    /**
     * 销毁方法
     * 1.调用时机：内存释放或者服务器关闭的时候，Servlet对象会被销毁，调用
     * 2.调用次数: 1次
     */
    public void destroy() {
        System.out.println("destroy...");
    }
    public ServletConfig getServletConfig() {
        return null;
    }
    public String getServletInfo() {
        return null;
    }
}
```

Servlet 对象默认是第一次访问的时候被创建，可以使用 `@WebServlet(urlPatterns = "/demo2",loadOnStartup = 1)` 的 loadOnStartup 修改成在服务器启动的时候创建。

Servlet 生命周期中涉及到三个方法，分别是 `init()`、`service()`、`destroy()`，`init` 方法在 Servlet 对象被创建的时候执行，只执行 1 次，service 方法在 Servlet 被访问的时候调用，每访问 1 次就调用 1 次，destroy 方法在 Servlet 对象被销毁的时候调用，只执行 1 次。

#### 方法介绍

Servlet 中总共有5个方法，我们已经介绍过其中的三个，剩下的两个方法为 `getServletInfo()` 和 `getServletConfig() `。

1. 初始化方法，在 Servlet 被创建时执行，只执行一次。

```java
void init(ServletConfig config) 
```

2. 提供服务方法， 每次 Servlet 被访问，都会调用该方法。

```java
void service(ServletRequest req, ServletResponse res)
```

3. 销毁方法，当 Servlet 被销毁时，调用该方法。在内存释放或服务器关闭时销毁 Servlet。

```java
void destroy() 
```

4. 获取 Servlet 信息方法

```java
String getServletInfo() 
//该方法用来返回Servlet的相关信息，没有什么太大的用处，一般我们返回一个空字符串即可
public String getServletInfo() {
    return "";
}
```

5. 获取 ServletConfig 对象方法

```java
ServletConfig getServletConfig()
```

ServletConfig 对象在 init 方法的参数中有，而 Tomcat Web 服务器在创建 Servlet 对象的时候会调用 init 方法，必定会传入一个  ServletConfig 对象，我们只需要将服务器传过来的 ServletConfig 进行返回即可。

```java
package com.itheima.web;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;
/**
 * Servlet方法介绍
 */
@WebServlet(urlPatterns = "/demo3",loadOnStartup = 1)
public class ServletDemo3 implements Servlet {
    private ServletConfig servletConfig;
    /**
     *  初始化方法
     *  1.调用时机：默认情况下，Servlet被第一次访问时，调用
     *      * loadOnStartup: 默认为-1，修改为0或者正整数，则会在服务器启动的时候，调用
     *  2.调用次数: 1次
     * @param config
     * @throws ServletException
     */
    public void init(ServletConfig config) throws ServletException {
        this.servletConfig = config;
        System.out.println("init...");
    }
    public ServletConfig getServletConfig() {
        return servletConfig;
    }
    /**
     * 提供服务
     * 1.调用时机:每一次Servlet被访问时，调用
     * 2.调用次数: 多次
     * @param req
     * @param res
     * @throws ServletException
     * @throws IOException
     */
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        System.out.println("servlet hello world~");
    }
    /**
     * 销毁方法
     * 1.调用时机：内存释放或者服务器关闭的时候，Servlet对象会被销毁，调用
     * 2.调用次数: 1次
     */
    public void destroy() {
        System.out.println("destroy...");
    }    
    public String getServletInfo() {
        return "";
    }
}
```

#### 体系结构

B/S 架构的 web 项目都是针对 HTTP 协议，所以我们自定义 Servlet，会通过继承 HttpServlet，具体的编写格式如下:

```java
@WebServlet("/demo4")
public class ServletDemo4 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //TODO GET 请求方式处理逻辑
        System.out.println("get...");
    }
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //TODO Post 请求方式处理逻辑
        System.out.println("post...");
    }
}
```

要想发送一个 GET 请求，请求该 Servlet，只需要通过浏览器发送 `http://localhost:8080/web-demo/demo4`，就能看到 doGet 方法被执行了。

要想发送一个 POST 请求，请求该 Servlet，单单通过浏览器是无法实现的，这个时候就需要编写一个 form 表单来发送请求，在 webapp 下创建一个 `a.html` 页面，启动测试，即可看到 doPost 方法被执行了。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="/web-demo/demo4" method="post">
        <input name="username"/><input type="submit"/>
    </form>
</body>
</html>
```

因为前端发送 GET 和 POST 请求的时候，参数的位置不一致，GET 请求参数在请求行中，POST 请求参数在请求体中，为了能处理不同的请求方式，我们得在 service 方法中进行判断，然后写不同的业务处理。

```java
package com.itheima.web;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@WebServlet("/demo5")
public class ServletDemo5 implements Servlet {
    public void init(ServletConfig config) throws ServletException {
    }
    public ServletConfig getServletConfig() {
        return null;
    }
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        //如何调用?
        //获取请求方式，根据不同的请求方式进行不同的业务处理
        HttpServletRequest request = (HttpServletRequest)req;
       //1. 获取请求方式
        String method = request.getMethod();
        //2. 判断
        if("GET".equals(method)){
            // get方式的处理逻辑
        }else if("POST".equals(method)){
            // post方式的处理逻辑
        }
    }
    public String getServletInfo() {
        return null;
    }
    public void destroy() {
    }
}
```

这样能实现，但是每个 Servlet 类中都将有相似的代码，针对这个问题，我们可以对 Servlet 接口进行继承封装，来简化代码开发。

```java
package com.itheima.web;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
public class MyHttpServlet implements Servlet {
    public void init(ServletConfig config) throws ServletException {
    }
    public ServletConfig getServletConfig() {
        return null;
    }
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        HttpServletRequest request = (HttpServletRequest)req;
        //1. 获取请求方式
        String method = request.getMethod();
        //2. 判断
        if("GET".equals(method)){
            // get方式的处理逻辑
            doGet(req,res);
        }else if("POST".equals(method)){
            // post方式的处理逻辑
            doPost(req,res);
        }
    }
    protected void doPost(ServletRequest req, ServletResponse res) {
    }
    protected void doGet(ServletRequest req, ServletResponse res) {
    }
    public String getServletInfo() {
        return null;
    }
    public void destroy() {
    }
}
```

有了 MyHttpServlet 这个类，以后我们再编写 Servlet 类的时候，只需要继承 MyHttpServlet，重写父类中的 doGet 和 doPost 方法，就可以用来处理 GET 和 POST 请求的业务逻辑。

```java
@WebServlet("/demo5")
public class ServletDemo5 extends MyHttpServlet {
    @Override
    protected void doGet(ServletRequest req, ServletResponse res) {
        System.out.println("get...");
    }
    @Override
    protected void doPost(ServletRequest req, ServletResponse res) {
        System.out.println("post...");
    }
}
```

将来页面发送的是 GET 请求，则会进入到 doGet 方法中进行执行，如果是 POST 请求，则进入到 doPost 方法。这样代码在编写的时候就相对来说更加简单快捷。

类似 MyHttpServlet 这样的类 Servlet 中已经为我们提供好了，就是 HttpServlet。

```java
protected void service(HttpServletRequest req, HttpServletResponse resp)
        throws ServletException, IOException
    {
        String method = req.getMethod();
        if (method.equals(METHOD_GET)) {
            long lastModified = getLastModified(req);
            if (lastModified == -1) {
                // servlet doesn't support if-modified-since, no reason
                // to go through further expensive logic
                doGet(req, resp);
            } else {
                long ifModifiedSince = req.getDateHeader(HEADER_IFMODSINCE);
                if (ifModifiedSince < lastModified) {
                    // If the servlet mod time is later, call doGet()
                    // Round down to the nearest second for a proper compare
                    // A ifModifiedSince of -1 will always be less
                    maybeSetLastModified(resp, lastModified);
                    doGet(req, resp);
                } else {
                    resp.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
                }
            }
        } else if (method.equals(METHOD_HEAD)) {
            long lastModified = getLastModified(req);
            maybeSetLastModified(resp, lastModified);
            doHead(req, resp);
        } else if (method.equals(METHOD_POST)) {
            doPost(req, resp);
        } else if (method.equals(METHOD_PUT)) {
            doPut(req, resp);
        } else if (method.equals(METHOD_DELETE)) {
            doDelete(req, resp);
        } else if (method.equals(METHOD_OPTIONS)) {
            doOptions(req,resp);
        } else if (method.equals(METHOD_TRACE)) {
            doTrace(req,resp);       
        } else {
            //
            // Note that this means NO servlet supports whatever
            // method was requested, anywhere on this server.
            //
            String errMsg = lStrings.getString("http.method_not_implemented");
            Object[] errArgs = new Object[1];
            errArgs[0] = method;
            errMsg = MessageFormat.format(errMsg, errArgs);
            resp.sendError(HttpServletResponse.SC_NOT_IMPLEMENTED, errMsg);
        }
    }
```

HttpServlet 的使用步骤是先继承 HttpServlet，再重写 doGet、doPost 或其他方法。HttpServlet 的原理就是获取请求方式，并根据不同的请求方式，调用不同的 doXxx 方法。

#### urlPattern 配置

Servlet 类编写好后，要想被访问到，就需要配置其访问路径（urlPattern），一个 Servlet，可以配置多个 urlPattern。

```java
package com.itheima.web;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
/**
* urlPattern: 一个 Servlet 可以配置多个访问路径
*/
@WebServlet(urlPatterns = {"/demo7","/demo8"})
public class ServletDemo7 extends MyHttpServlet {
    @Override
    protected void doGet(ServletRequest req, ServletResponse res) {
        System.out.println("demo7 get...");
    }
    @Override
    protected void doPost(ServletRequest req, ServletResponse res) {
    }
}
// 在浏览器上输入 http://localhost:8080/web-demo/demo7, http://localhost:8080/web-demo/demo8 这两个地址都能访问到 ServletDemo7 的 doGet 方法
```

urlPattern 总共有四种配置方式，分别是精确匹配、目录匹配、扩展名匹配、任意匹配，配置的优先级为 精确匹配 > 目录匹配 > 扩展名匹配 > `/*` > `/` 。

1. 精确匹配

```java
@WebServlet(urlPatterns = "/user/select")
public class ServletDemo8 extends MyHttpServlet {
    @Override
    protected void doGet(ServletRequest req, ServletResponse res) {
        System.out.println("demo8 get...");
    }
    @Override
    protected void doPost(ServletRequest req, ServletResponse res) {
    }
} //访问路径：http://localhost:8080/web-demo/user/select
```

2. 目录匹配：`/*`

```java
package com.itheima.web;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
@WebServlet(urlPatterns = "/user/*")
public class ServletDemo9 extends MyHttpServlet {
    @Override
    protected void doGet(ServletRequest req, ServletResponse res) {
        System.out.println("demo9 get...");
    }
    @Override
    protected void doPost(ServletRequest req, ServletResponse res) {
    }
} //访问路径：http://localhost:8080/web-demo/user/任意
```

3. 扩展名匹配：`*.do`

```java
package com.itheima.web;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
@WebServlet(urlPatterns = "*.do")
public class ServletDemo10 extends MyHttpServlet {
    @Override
    protected void doGet(ServletRequest req, ServletResponse res) {
        System.out.println("demo10 get...");
    }
    @Override
    protected void doPost(ServletRequest req, ServletResponse res) {
    }
}  //访问路径：http://localhost:8080/web-demo/任意.do
```

4. 任意匹配：`/` 或 `/*`

```java
package com.itheima.web;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
@WebServlet(urlPatterns = "/")
public class ServletDemo11 extends MyHttpServlet {
    @Override
    protected void doGet(ServletRequest req, ServletResponse res) {
        System.out.println("demo11 get...");
    }
    @Override
    protected void doPost(ServletRequest req, ServletResponse res) {
    }
} //访问路径：http://localhost:8080/demo-web/任意
```

```java
package com.itheima.web;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
@WebServlet(urlPatterns = "/*")
public class ServletDemo12 extends MyHttpServlet {
    @Override
    protected void doGet(ServletRequest req, ServletResponse res) {
        System.out.println("demo12 get...");
    }
    @Override
    protected void doPost(ServletRequest req, ServletResponse res) {
    }
} // 访问路径：http://localhost:8080/demo-web/任意
```

当我们的项目中的 Servlet 配置了 `/`，会覆盖掉 tomcat 中的 DefaultServlet，当其他的 url-pattern 都匹配不上时都会走这个 Servlet。当我们的项目中配置了 `/*`，意味着匹配任意访问路径。

DefaultServlet 是用来处理静态资源，如果配置了 `/` 会把默认的覆盖掉，就会引发请求静态资源的时候没有走默认的而是走了自定义的 Servlet 类，最终导致静态资源不能被访问。

#### XML 配置

一般情况下 Servlet 使用的是注解配置 `@WebServlet`，但 3.0 版本前只支持 XML 配置文件的配置方法。对于 XML 的配置步骤有两步：

1. 编写Servlet类。

```java
package com.itheima.web;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
public class ServletDemo13 extends MyHttpServlet {
    @Override
    protected void doGet(ServletRequest req, ServletResponse res) {
        System.out.println("demo13 get...");
    }
    @Override
    protected void doPost(ServletRequest req, ServletResponse res) {
    }
}
```

2. 在 web.xml 中配置该 Servlet。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!-- 
        Servlet 全类名
    -->
    <servlet>
        <!-- servlet的名称，名字任意-->
        <servlet-name>demo13</servlet-name>
        <!--servlet的类全名-->
        <servlet-class>com.itheima.web.ServletDemo13</servlet-class>
    </servlet>
    <!-- 
        Servlet 访问路径
    -->
    <servlet-mapping>
        <!-- servlet的名称，要和上面的名称一致-->
        <servlet-name>demo13</servlet-name>
        <!-- servlet的访问路径-->
        <url-pattern>/demo13</url-pattern>
    </servlet-mapping>
</web-app>
```

