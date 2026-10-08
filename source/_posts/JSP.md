---
title: Java Server Pages 和 MVC 模式
date: 2022-04-20
references: 
  - title: Java web从入门到企业实战
    url: https://www.bilibili.com/video/BV1Qf4y1T7Hx
categories: 后端开发
tags: [Java, JSP, MVC]
---

> Java Web 核心第三章。JSP（Java Server Pages）是由 Sun Microsystems 公司主导创建的一种动态网页技术标准。JSP 部署于网络服务器上，可以响应客户端发送的请求，并根据请求内容动态地生成 HTML、XML 或其他格式文档的 Web 网页，然后返回给请求者。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、JSP 概述

JSP（全称：Java Server Pages）：Java 服务端页面。是一种动态的网页技术，其中既可以定义 HTML、JS、CSS等静态内容，还可以定义 Java 代码的动态内容，也就是 `JSP = HTML + Java`：

```jsp
<html>
    <head>
        <title>Title</title>
    </head>
    <body>
        <h1>JSP,Hello World</h1>
        <%
        	System.out.println("hello,jsp~");
        %>
    </body>
</html>
```

上面代码 `h1` 标签内容是展示在页面上，而 Java 的输出语句是输出在 idea 的控制台

JSP 作用：简化开发，避免了在 Servlet 中直接输出 HTML 标签。

#### JSP 快速入门

1.   创建一个 maven 的 web 项目，项目结构如下：

![](https://hexo.bezhuang.cn/img/jsp01.jpg)

`pom.xml` 文件内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>jsp-demo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
      <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
            </plugin>
        </plugins>
    </build>
</project>
```

2.   在 `dependencies` 标签中导入 JSP 依赖：

```xml
<dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>jsp-api</artifactId>
    <version>2.2</version>
    <scope>provided</scope>
</dependency>
```

该依赖的 `scope` 必须设置为 `provided`，因为 tomcat 中有这个 jar 包了，所以在打包时我们是不希望将该依赖打进到我们工程的 war 包中。

3.   在项目的 `webapp` 下创建 JSP 页面，在 `hello.jsp` 页面中书写 `HTML` 标签和 `Java` 代码：

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h1>hello jsp</h1>

    <%
        System.out.println("hello,jsp~");
    %>
</body>
</html>
```

5.   测试，在浏览器地址栏输入 `http://localhost:8080/jsp-demo/hello.jsp`。

### 二、JSP 原理

JSP 本质上就是一个 Servlet。浏览器第一次访问 `hello.jsp` 页面时，`tomcat` 会将 `hello.jsp` 转换为名为 `hello_jsp.java` 的一个 `Servlet`，`tomcat` 再将转换的 `servlet` 编译成字节码文件 `hello_jsp.class`，`tomcat` 会执行该字节码文件，向外提供服务。

```java
// 继承关系
public final class hello_jsp extends org.apache.jasper.runtime.HttpJspBase implements org,apache.jasper.runtime.JspSourceDependent {}
public abstract class HttpJspBase extends HttpServlet implements HttpJspPage {}
```

### 三、JSP 脚本

JSP 脚本用于在 JSP页面内定义 Java 代码。

JSP 脚本有如下三个分类：

1.  `<%...%>`：内容会直接放到 `_jspService()` 方法之中。
2.  `<%=…%>`：内容会放到 `out.print()` 中，作为 `out.print()` 的参数。
3.  `<%!…%>`：内容会放到 `_jspService()` 方法之外，被类直接包含。

#### JSP 脚本案例

使用JSP脚本展示品牌数据

将 `Brand.java` 文件放置到项目的 `com.itheima.pojo` 包下，在项目的 `webapp` 中创建 `brand.jsp` ，并将 `brand.html`页面中的内容拷贝过来。`brand.jsp` 内容如下：

```jsp
<%@ page import="com.itheima.pojo.Brand" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%
    // 查询数据库
    List<Brand> brands = new ArrayList<Brand>();
    brands.add(new Brand(1,"三只松鼠","三只松鼠",100,"三只松鼠，好吃不上火",1));
    brands.add(new Brand(2,"优衣库","优衣库",200,"优衣库，服适人生",0));
    brands.add(new Brand(3,"小米","小米科技有限公司",1000,"为发烧而生",1));

%>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<input type="button" value="新增"><br>
<hr>
<table border="1" cellspacing="0" width="800">
    <tr>
        <th>序号</th>
        <th>品牌名称</th>
        <th>企业名称</th>
        <th>排序</th>
        <th>品牌介绍</th>
        <th>状态</th>
        <th>操作</th>
    </tr>
    <%
        for (int i = 0; i < brands.size(); i++) {
            Brand brand = brands.get(i);
    %>

    <tr align="center">
        <td><%=brand.getId()%></td>
        <td><%=brand.getBrandName()%></td>
        <td><%=brand.getCompanyName()%></td>
        <td><%=brand.getOrdered()%></td>
        <td><%=brand.getDescription()%></td>
		<td><%=brand.getStatus() == 1 ? "启用":"禁用"%></td>
        <td><a href="#">修改</a> <a href="#">删除</a></td>
    </tr>

    <%
        }
    %>
</table>
</body>
</html>
```

### 四、JSP 缺点

由于 JSP页面内，既可以定义 HTML 标签，又可以定义 Java代码，造成了以下问题：

* 书写麻烦：特别是复杂的页面，既要写 HTML 标签，还要写 Java 代码。

* 阅读麻烦：上面案例的代码，相信你后期再看这段代码时还需要花费很长的时间去梳理。

* 复杂度高：运行需要依赖于各种环境，JRE，JSP容器，JavaEE…

* 占内存和磁盘：JSP 会自动生成 `.java` 和 `.class` 文件占磁盘，运行的是 `.class` 文件占内存。

* 调试困难：出错后，需要找到自动生成的 `.java` 文件进行调试。

* 不利于团队协作：前端人员不会 Java，后端人员不精 HTML。如果页面布局发生变化，前端工程师对静态页面进行修改，然后再交给后端工程师，由后端工程师再将该页面改为 JSP 页面。


由于上述的问题， JSP 已逐渐退出历史舞台，以后开发更多的是使用 HTML +  Ajax 来替代。

技术的发展：

1. 第一阶段：使用 `servlet` 即实现逻辑代码编写，也对页面进行拼接。

2. 第二阶段：随着技术的发展，出现了 `JSP` ，人们发现 `JSP` 使用起来比 `Servlet` 方便很多，但是还是要在 `JSP` 中嵌套 `Java` 代码，也不利于后期的维护。

3. 第三阶段：使用 `Servlet` 进行逻辑代码开发，而使用 `JSP` 进行数据展示。

4. 第四阶段：使用 `servlet` 进行后端逻辑代码开发，而使用 `HTML` 进行数据展示。而这里面就存在问题，`HTML` 是静态页面，怎么进行动态数据展示呢？这就是 `ajax` 的作用了。

### 五、EL 表达式

EL（全称Expression Language ）表达式语言，用于简化 JSP 页面内的 Java 代码。EL 表达式的主要作用是获取数据，其实就是从域对象中获取数据，然后将数据展示在页面上。

而 EL 表达式的语法：`${expression}` 。例如：`${brands}` 就是获取域中存储的 key 为 brands 的数据。

定义 servlet，在 servlet 中封装一些数据并存储到 request 域对象中并转发到 `el-demo.jsp` 页面。此处需要用转发，因为转发才可以使用 request 对象作为域对象进行数据共享。

```java
@WebServlet("/demo1")
public class ServletDemo1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1. 准备数据
        List<Brand> brands = new ArrayList<Brand>();
        brands.add(new Brand(1,"三只松鼠","三只松鼠",100,"三只松鼠，好吃不上火",1));
        brands.add(new Brand(2,"优衣库","优衣库",200,"优衣库，服适人生",0));
        brands.add(new Brand(3,"小米","小米科技有限公司",1000,"为发烧而生",1));

        //2. 存储到request域中
        request.setAttribute("brands",brands);

        //3. 转发到 el-demo.jsp
        request.getRequestDispatcher("/el-demo.jsp").forward(request,response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

在 `el-demo.jsp` 中通过 EL表达式 获取数据

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    ${brands}
</body>
</html>
```

域对象：Java Web 中有四大域对象：

* page：当前页面有效。
* request：当前请求有效。
* session：当前会话有效。
* application：当前应用有效。

el 表达式获取数据，会依次从这4个域中寻找，直到找到为止。而这四个域对象的作用范围由小到大，例如：`${brands}`，el 表达式获取数据，会先从 page 域对象中获取数据，如果没有再到 requet 域对象中获取数据，如果再没有再到 session 域对象中获取，如果还没有才会到 application 中获取数据。

### 六、JSTL 标签

JSP 标准标签库（Jsp Standarded Tag Library），使用标签取代 JSP 页面上的 Java 代码，比 JSP 中嵌套 Java 代码看起来舒服多了：

```jsp
<c:if test="${flag == 1}">
    男
</c:if>
<c:if test="${flag == 2}">
    女
</c:if>
```

JSTL 提供了很多标签，最常用的标签是 `<c:forEach>` 标签和 `<c:if>` 标签。

JSTL 使用也是比较简单的，分为如下步骤：

1.   导入坐标

```xml
<dependency>
    <groupId>jstl</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
</dependency>
<dependency>
    <groupId>taglibs</groupId>
    <artifactId>standard</artifactId>
    <version>1.1.2</version>
</dependency>
```

2.   在JSP页面上引入JSTL标签库

```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
```

3.   使用标签

#### if 标签

`<c:if>`：相当于 if 判断。属性：test，用于定义条件表达式。

```jsp
<c:if test="${flag == 1}">
    男
</c:if>
<c:if test="${flag == 2}">
    女
</c:if>
```

定义一个 `servlet` ，在该 `servlet` 中向 request 域对象中添加 键是 `status` ，值为 `1` 的数据。

```java
@WebServlet("/demo2")
public class ServletDemo2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1. 存储数据到request域中
        request.setAttribute("status",1);

        //2. 转发到 jstl-if.jsp
        数据request.getRequestDispatcher("/jstl-if.jsp").forward(request,response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

定义 `jstl-if.jsp` 页面，在该页面使用 `<c:if>` 标签。

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  // 引入 JSTL核心标签库
<html>
<head>
    <title>Title</title>
</head>
<body>
    <%--
        c:if：来完成逻辑判断，替换java  if else
    --%>
    <c:if test="${status ==1}">
        启用
    </c:if>

    <c:if test="${status ==0}">
        禁用
    </c:if>
</body>
</html>
```

#### forEach 标签

`<c:forEach>`：相当于 for 循环。Java 中有增强 for 循环和普通 for 循环，JSTL 中的 `<c:forEach>` 也有两种用法：

1.   增强 for 循环。涉及到的 `<c:forEach>` 中的属性：

* items：被遍历的容器

* var：遍历产生的临时变量

* varStatus：遍历状态对象

例，从域对象中获取名为 brands 数据，该数据是一个集合；遍历遍历，并给该集合中的每一个元素起名为 `brand`，是 Brand 对象。在循环里面使用 EL表达式获取每一个 Brand 对象的属性值。

```jsp
<c:forEach items="${brands}" var="brand">
    <tr align="center">
        <td>${brand.id}</td>
        <td>${brand.brandName}</td>
        <td>${brand.companyName}</td>
        <td>${brand.description}</td>
    </tr>
</c:forEach>
```

2.   从0循环到10，变量名是 `i` ，每次自增1

```jsp
<c:forEach begin="0" end="10" step="1" var="i">
    ${i}
</c:forEach>
```

### 七、MVC 模式和三层架构

#### MVC 模式

MVC 是一种分层开发的模式，其中：

* M：Model，业务模型，处理业务

* V：View，视图，界面展示

* C：Controller，控制器，处理请求，调用模型和视图

<img src="https://hexo.bezhuang.cn/img/jsp02.jpg" alt="jsp02.jpg" style="zoom:70%;" />

控制器（serlvlet）用来接收浏览器发送过来的请求，控制器调用模型（JavaBean）来获取数据，比如从数据库查询数据；控制器获取到数据后再交由视图（JSP）进行数据展示。

MVC 的优点：

* 职责单一，互不影响。每个角色做它自己的事，各司其职。

* 有利于分工协作。

* 有利于组件重用。

#### 三层架构

三层架构是将我们的项目分成了三个层面，分别是 `表现层`、`业务逻辑层`、`数据访问层`。

<img src="https://hexo.bezhuang.cn/img/jsp03.png" alt="jsp03.png" style="zoom:60%;" />

* 数据访问层：对数据库的 CRUD 基本操作。
* 业务逻辑层：对业务逻辑进行封装，组合数据访问层层中基本功能，形成复杂的业务逻辑功能。例如 `注册业务功能` ，我们会先调用 `数据访问层` 的 `selectByName()` 方法判断该用户名是否存在，如果不存在再调用 `数据访问层` 的 `insert()` 方法进行数据的添加操作。
* 表现层：接收请求，封装数据，调用业务逻辑层，响应数据。

而整个流程是，浏览器发送请求，表现层的 Servlet 接收请求并调用业务逻辑层的方法进行业务逻辑处理，而业务逻辑层方法调用数据访问层方法进行数据的操作，依次返回到 serlvet，然后 servlet 将数据交由 JSP 进行展示。

三层架构的每一层都有特有的包名称：

* 表现层： `com.itheima.controller` 或者 `com.itheima.web`。
* 业务逻辑层：`com.itheima.service`。
* 数据访问层：`com.itheima.dao` 或者 `com.itheima.mapper`。

#### MVC 和 三层架构

<img src="https://hexo.bezhuang.cn/img/jsp04.png" alt="jsp04.png" style="zoom:60%;" />

 `MVC 模式` 中的 C（控制器）和 V（视图）就是 `三层架构` 中的表现层，而 `MVC 模式` 中的 M（模型）就是 `三层架构` 中的 业务逻辑层 和 数据访问层。

可以将 `MVC 模式` 理解成是一个大的概念，而 `三层架构` 是对 `MVC 模式` 实现架构的思想。 那么我们以后按照要求将不同层的代码写在不同的包下，每一层里功能职责做到单一，将来如果将表现层的技术换掉，而业务逻辑层和数据访问层的代码不需要发生变化。
