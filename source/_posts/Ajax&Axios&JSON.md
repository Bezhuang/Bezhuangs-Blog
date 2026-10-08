---
title: AJAX、Axios 和 JSON 快速入门
date: 2022-04-29
tags: []
categories: Java
references: 
  - title: Java web从入门到企业实战
    url: https://www.bilibili.com/video/BV1Qf4y1T7Hx
---

> Java Web 核心第六章。`AJAX`（Asynchronous JavaScript And XML）是异步的 JavaScript 和 XML，`JavaScript` 表明该技术和前端相关，`XML` 是指以此进行数据交换。Axios 则是对原生的 AJAX 进行封装，简化书写。JSON（`JavaScript Object Notation`）是 JavaScript 对象表示法，和 js 对象 很像，只不过 js 对象中的属性名可以使用引号（可以是单引号，也可以是双引号），而 `json` 格式中的键要求必须使用双引号括起来。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、AJAX 的作用

AJAX 的作用有以下两方面：

1. 与服务器进行数据交换：通过 AJAX 可以给服务器发送请求，服务器将数据直接响应回给浏览器。使用了 AJAX 和服务器进行通信，就可以使用 HTML + AJAX 来替换 JSP 页面了。

   如下图，浏览器发送请求 servlet，servlet 调用完业务逻辑层后将数据直接响应回给浏览器页面，页面使用 HTML 来进行数据展示：

<img src="https://hexo.bezhuang.cn/img/AJAX01.png" alt="AJAX01" style="zoom:70%;" />

2. 异步交互：可以在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页的技术，如：搜索联想、用户名是否可用校验，等等…

### 二、同步和异步

同步发送请求过程：浏览器页面在发送请求给服务器，在服务器处理请求的过程中，浏览器页面不能做其他的操作。只能等到服务器响应结束后才能，浏览器页面才能继续做其他的操作。

<img src="https://hexo.bezhuang.cn/img/AJAX03.png" alt="AJAX03" style="zoom:80%;" />

异步发送请求过程：浏览器页面发送请求给服务器，在服务器处理请求的过程中，浏览器页面还可以做其他的操作。

<img src="https://hexo.bezhuang.cn/img/AJAX04.png" alt="AJAX04" style="zoom:80%;" />

### 三、AJAX 快速入门

#### 服务端实现

在项目的创建 `com.itheima.web.servlet` ，并在该包下创建名为  `AjaxServlet` 的 servlet：

```java
@WebServlet("/ajaxServlet")
public class AjaxServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1. 响应数据
        response.getWriter().write("hello ajax~");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

#### 客户端实现

在 `webapp` 下创建名为 `01-ajax-demo1.html` 的页面，在该页面书写 `ajax` 代码。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<script>
    //1. 创建核心对象，，不同的浏览器创建的对象是不同的
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //2. 发送请求
    xhttp.open("GET", "http://localhost:8080/ajax-demo/ajaxServlet");
    xhttp.send();

    //3. 获取响应
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    };
</script>
</body>
</html>
```

### 四、Axios 的基本使用

Axios官网是：`https://www.axios-http.cn`。

Axios 使用是比较简单的，分为以下两步：

1. 引入 axios 的 js 文件

```html
<script src="js/axios-0.18.0.js"></script>
```

2. 使用axios 发送请求，并获取响应结果

* 发送 get 请求

  ```js
  axios({
      method:"get",
      url:"http://localhost:8080/ajax-demo1/aJAXDemo1?username=zhangsan"
  }).then(function (resp){
      alert(resp.data);
  })
  ```

* 发送 post 请求

  ```js
  axios({
      method:"post",
      url:"http://localhost:8080/ajax-demo1/aJAXDemo1",
      data:"username=zhangsan"
  }).then(function (resp){
      alert(resp.data);
  });
  ```

`axios()` 是用来发送异步请求的，小括号中使用 js 对象传递请求相关的参数：

* `method` 属性：用来设置请求方式的。取值为 `get` 或者 `post`。
* `url` 属性：用来书写请求的资源路径。如果是 `get` 请求，需要将请求参数拼接到路径的后面，格式为： `url?参数名=参数值&参数名2=参数值2`。
* `data` 属性：作为请求体被发送的数据。也就是说如果是 `post` 请求的话，数据需要作为 `data` 属性的值。

`then()` 需要传递一个匿名函数。我们将 `then()` 中传递的匿名函数称为回调函数，意思是该匿名函数在发送请求时不会被调用，而是在成功响应后调用的函数。而该回调函数中的 `resp` 参数是对响应的数据进行封装的对象，通过 `resp.data` 可以获取到响应的数据。

### 五、Axios 快速入门

#### 后端实现

定义一个用于接收请求的 servlet，代码如下：

```java
@WebServlet("/axiosServlet")
public class AxiosServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("get...");
        //1. 接收请求参数
        String username = request.getParameter("username");
        System.out.println(username);
        //2. 响应数据
        response.getWriter().write("hello Axios~");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("post...");
        this.doGet(request, response);
    }
}
```

#### 前端实现

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<script src="js/axios-0.18.0.js"></script>
<script>
    //1. get
   /* axios({
        method:"get",
        url:"http://localhost:8080/ajax-demo/axiosServlet?username=zhangsan"
    }).then(function (resp) {
        alert(resp.data);
    })*/

    //2. post  在js中{} 表示一个js对象，而这个js对象中有三个属性
    axios({
        method:"post",
        url:"http://localhost:8080/ajax-demo/axiosServlet",
        data:"username=zhangsan"
    }).then(function (resp) {
        alert(resp.data);
    })
</script>
</body>
</html>
```

#### 请求方法别名

为了方便起见， Axios 已经为所有支持的请求方法提供了别名。如下：

* `get` 请求 ： `axios.get(url[,config])`

* `delete` 请求 ： `axios.delete(url[,config])`

* `head` 请求 ： `axios.head(url[,config])`

* `options` 请求 ： `axios.option(url[,config])`

* `post` 请求：`axios.post(url[,data[,config])`

* `put` 请求：`axios.put(url[,data[,config])`

* `patch` 请求：`axios.patch(url[,data[,config])`

而我们只关注 `get` 请求和 `post` 请求。

入门案例中的 `get` 请求代码可以改为如下：

```js
axios.get("http://localhost:8080/ajax-demo/axiosServlet?username=zhangsan").then(function (resp) {
    alert(resp.data);
});
```

入门案例中的 `post` 请求代码可以改为如下：

```js
axios.post("http://localhost:8080/ajax-demo/axiosServlet","username=zhangsan").then(function (resp) {
    alert(resp.data);
})
```

### 六、JSON 基础语法

如下是 `JavaScript` 对象的定义格式：

```js
{
	name:"zhangsan",
	age:23,
	city:"北京"
}
```

接下来我们再看看 `JSON` 的格式：

```json
{
	"name":"zhangsan",
	"age":23,
	"city":"北京"
}
```

`json` 格式的数据：由于其语法格式简单，层次结构鲜明，以及所占的字节数少等优点，现多用于作为数据载体，在网络中进行数据传输。

`JSON` 本质就是一个字符串，但是该字符串内容是有一定的格式要求的。 定义格式如下：

```js
var 变量名 = '{"key":value,"key":value,...}';
```

`JSON` 串的键要求必须使用双引号括起来，而值根据要表示的类型确定。value 的数据类型分为如下：

* 数字（整数或浮点数）；
* 字符串（使用双引号括起来）；
* 逻辑值（true 或者 false）；
* 数组（在方括号中）；
* 对象（在花括号中）；
* null。

```js
var jsonStr = '{"name":"zhangsan","age":23,"addr":["北京","上海","西安"]}'   // 示例
```

#### JSON 代码演示

创建一个页面，在该页面的 `<script>` 标签中定义 json 字符串：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
    //1. 定义JSON字符串
    var jsonStr = '{"name":"zhangsan","age":23,"addr":["北京","上海","西安"]}'
    alert(jsonStr);

</script>
</body>
</html>
```

现在我们需要获取到该 `JSON` 串中的 `name` 属性值，如果它是一个 js 对象，我们就可以通过 `js对象.属性名` 的方式来获取数据。

JS 提供了一个对象 `JSON` ，该对象有如下两个方法：

* `parse(str)` ：将 JSON串转换为 js 对象。使用方式是： `var jsObject = JSON.parse(jsonStr);`。
* `stringify(obj)` ：将 js 对象转换为 JSON 串。使用方式是：`var jsonStr = JSON.stringify(jsObject)`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
    //1. 定义JSON字符串
    var jsonStr = '{"name":"zhangsan","age":23,"addr":["北京","上海","西安"]}'
    alert(jsonStr);

    //2. 将 JSON 字符串转为 JS 对象
    let jsObject = JSON.parse(jsonStr);
    alert(jsObject)
    alert(jsObject.name)
    //3. 将 JS 对象转换为 JSON 字符串
    let jsonStr2 = JSON.stringify(jsObject);
    alert(jsonStr2)
</script>
</body>
</html>
```

#### 发送异步请求携带参数

后面我们使用 `axios` 发送请求时，如果要携带复杂的数据时都会以 `JSON` 格式进行传递：

```js
axios({
    method:"post",
    url:"http://localhost:8080/ajax-demo/axiosServlet",
    data:"username=zhangsan"
}).then(function (resp) {
    alert(resp.data);
})
```

请求参数不可能由我们自己拼接字符串，可以提前定义一个 js 对象，用来封装需要提交的参数，然后使用 `JSON.stringify(js对象)` 转换为 `JSON` 串，再将该 `JSON` 串作为 `axios` 的 `data` 属性值进行请求参数的提交：

```js
var jsObject = {name:"张三"};

axios({
    method:"post",
    url:"http://localhost:8080/ajax-demo/axiosServlet",
    data: JSON.stringify(jsObject)
}).then(function (resp) {
    alert(resp.data);
})
```

而 `axios` 是一个很强大的工具。我们只需要将需要提交的参数封装成 js 对象，并将该 js 对象作为 `axios` 的 `data` 属性值进行，它会自动将 js 对象转换为 `JSON` 串进行提交：

```js
var jsObject = {name:"张三"};

axios({
    method:"post",
    url:"http://localhost:8080/ajax-demo/axiosServlet",
    data:jsObject  //这里 axios 会将该js对象转换为 json 串的
}).then(function (resp) {
    alert(resp.data);
})
```

js 提供的 `JSON` 对象我们只需要了解一下即可。因为 `axios` 会自动对 js 对象和 `JSON` 串进行想换转换。

发送异步请求时，如果请求参数是 `JSON` 格式，那请求方式必须是 `POST`。因为 `JSON` 串需要放在请求体中。

### 七、JSON 串和 Java 对象的相互转换

以 json 格式的数据进行前后端交互，前端发送请求时，如果是复杂的数据就会以 json 提交给后端，而后端如果需要响应一些复杂的数据时，也需要以 json 格式将数据响应回给浏览器。

<img src="https://hexo.bezhuang.cn/img/AJAX02.png" alt="AJAX02" style="zoom:70%;" />

在后端我们就需要重点学习以下两部分操作：

* 请求数据：JSON 字符串转为 Java 对象。
* 响应数据：Java 对象转为 JSON 字符串。

有一套 API，可以实现上面两部分操作。这套 API 就是 `Fastjson`。

#### Fastjson 概述

`Fastjson` 是阿里巴巴提供的一个Java语言编写的高性能功能完善的 `JSON` 库，是目前Java语言中最快的 `JSON` 库，可以实现 `Java` 对象和 `JSON` 字符串的相互转换。

#### Fastjson 使用

`Fastjson` 使用也是比较简单的，分为以下三步完成：

1. 导入坐标：

   ```xml
   <dependency>
       <groupId>com.alibaba</groupId>
       <artifactId>fastjson</artifactId>
       <version>1.2.62</version>
   </dependency>
   ```

2. Java 对象转 JSON：将 Java 对象转换为 JSON 串，只需要使用 `Fastjson` 提供的 `JSON` 类中的 `toJSONString()` 静态方法即可。

   ```java
   String jsonStr = JSON.toJSONString(obj);
   ```

3. JSON 字符串转 Java 对象：将 json 转换为 Java 对象，只需要使用 `Fastjson` 提供的 `JSON` 类中的 `parseObject()` 静态方法即可。

   ```java
   User user = JSON.parseObject(jsonStr, User.class);
   ```


#### 代码演示

引入坐标，创建一个类，专门用来测试 Java 对象和 JSON 串的相互转换：

```java
public class FastJsonDemo {

    public static void main(String[] args) {
        //1. 将Java对象转为JSON字符串
        User user = new User();
        user.setId(1);
        user.setUsername("zhangsan");
        user.setPassword("123");

        String jsonString = JSON.toJSONString(user);
        System.out.println(jsonString);//{"id":1,"password":"123","username":"zhangsan"}


        //2. 将JSON字符串转为Java对象
        User u = JSON.parseObject("{\"id\":1,\"password\":\"123\",\"username\":\"zhangsan\"}", User.class);
        System.out.println(u);
    }
}
```

