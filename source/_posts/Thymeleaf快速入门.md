---
title: Thymeleaf 快速入门
date: 2023-03-01
references:
  - title: 模板引擎Thymeleaf快速入门
    url: https://www.bilibili.com/video/BV1qy4y117qi
categories: 后端开发
tags: [Java, Thymeleaf, 模板引擎]
---

> 在之前我们学习的都是 SpringBoot + Vue 或者 React 的前后端分离的项目，但是一些公司还是会使用一些混合模板开发的项目，甚至还要维护一些 Jsp 的老项目，其中就有 SpringBoot 官方推荐的模板引擎 Thymeleaf，通过在静态 HTML 嵌入标签属性，浏览器可以直接打开模板文件。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、Thymeleaf 基础使用

Thymeleaf 代码模版：

```html
<!doctype html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

</body>
</html>  
```

在 `resources/templates/index.html` 中写前端页面：

```html
<head>
    <meta charset="UTF-8" />
    <title th:text="'Bezhuang'+${title}">默认的title</title>
    <meta th:content="${description}" name="description" content="默认的description">
    <meta th:content="${keywords}" name="keywords" content="默认的keywords">
</head>
```

在 `thymeleafdemo.controller/IndexController` 中向前端页面传递参数：

```java
@Controller
public class IndexController {
    @GetMapping("/index")
    public String index(Model model){
        model.addAttribute("title", "传递的Index");
        model.addAttribute("description", "传递的description");
        model.addAttribute("keywords", "传递的keywords");
        return "index";
    }
}
```

### 二、Thymeleaf 常用方法

在 `resources/templates/basic.html` 中写前端页面：

```html
<body>
<!--    <h2 th:text="${user.getUsername()}"></h2>    -->
    <h2 th:text="${user.username}"></h2>
    <p th:text="${user.age}"></p>
  
<!--    变量表达式不仅可以写成${...}，而且还可以写成*{...}。
但是，有一个重要的区别：星号语法对选定对象而不是整个上下文评估表达式。也就是说，只要没有选定的对象，美元(${…})和星号(*{...})的语法就完全一样。    -->
    <div th:object="${user}">
        <h2 th:text="*{username}"></h2>
        <p th:text="*{age}"></p>
    </div>

<!--    th:if    -->
    <p th:if="${user.isVip}">会员</p>
    <p th:if="${!user.isVip}">会员</p>

<!--    th:each    -->
    <ul>
        <li th:each="tag:${user.tags}" th:text="${tag}"></li>
    </ul>

<!--    th:switch    -->
    <div th:switch="${user.sex}">
        <p th:case="1">男</p>
        <p th:case="2">女</p>
        <p th:case="*">默认</p>
    </div>
</body>
```

在 `thymeleafdemo.controller/IndexController` 中添加控制器：

```java
@GetMapping("/basic")
public String basic(Model model){
    UserVO userVO = new UserVO();
    userVO.setUsername("Bezhuang");
    userVO.setAge(24);
    userVO.setIsVip(true);
    userVO.setCreateTime(new Date());
    userVO.setSex(1);
    userVO.setTags(Arrays.asList("Java", "JavaScript", "Python"));
    model.addAttribute("user", userVO);
    return "basic";
}
```

方法总结：

-   `th:text`：文本的显示，其值会替换 HTML 中指定标签的值。
-   `th:utext`：支持 HTML 的文本显示。
-   `th:value`：给属性赋值。
-   `th:object`：用于设置选定对条。
-   `th:if`：条件判断，可以和 `th:unless` 配合使用。
-   `th:switch`：选择判断，需要配合 `th:case` 使用。
-   `th:each`：循环迭代。
-   `th:href`： 设置链接地址。
-   `th:src`：设置资源。

### 三、Thymeleaf 中 CSS、JS 的使用

引入 CSS 文件 `app.css`：

```html
<head>
    <link rel="stylesheet" th:href="@{app.css}">
</head>
<body>
<div class="nav"></div>
```

引入 JavaScript：

```html
 <script type="text/javascript" th:src="@{index.js}"></script>
```

动态引入 JavaScript，传入 `user` 参数：

```html
<script th:inline="javascript">
    const printuser = /*[[${user}]]*/{};
    console.log(printuser);
</script>
```

追加 CSS 样式：

```html
<head>
		<style>
				.nonactive {
            color: green;
        }
        .active {
            color: red;
        }
    </style>
</head>

<div>
  	<ol>
        <li th:each="tag,stat:${user.tags}"
            th:text="${tag}"
            th:classappend="${stat.last}?'active':nonactive"
        ></li>
    </ol>
</div>
```

### 四、Thymeleaf 组件的使用

创建 fragment 碎片（组件）：

```html
<footer th:fragment="com1">
    com1
</footer>

<div id="com2">
    com2
</div>
```

在 basic 页面中插入碎片：

```html
<!--    th:replace    -->
<div th:replace="~{component::com1}"></div>

<!--    th:insert 保留外层的div    -->
<div th:insert="~{component::com1}"></div>

<!--    th:insert id   -->
<div th:insert="~{component::#com2}"></div>
```

组件中使用外部对象：

```html
<footer th:fragment="com1">
    <!--/*@thymesVar id="user" type="com.example.loop.thymeleafdemo.vo.UserVO"*/-->
    <h2 th:text="${user}"></h2>
</footer>
```

组件间传递参数：

```html
<!--    th:insert    -->
<div th:insert="~{component::com3('传递的参数')}"></div>

<!--组件-->
<div th:fragment="com3(message)">
  	<p th:text="${message}"></p>
</div>
```

组件间传递模块：

```html
<div th:insert="~{component::com4(~{::#message})}">
    <p id="message">传递的模块</p>
</div>

<!--组件-->
<div th:fragment="com4(message)">
    <div th:replace="${message}"></div>
</div>
```

### 五、Thymeleaf 内置对象和工具类

#### 内置对象

| 对象                                                         |                             描述                             |
| :----------------------------------------------------------- | :----------------------------------------------------------: |
| [#ctx](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/context/IContext.java) |                          上下文对象                          |
| [#vars](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/context/IContext.java) |                   同 #ctx，表示上下文变量                    |
| #locale                                                      | 上下文本地化（特定的地理区域）变量，可参考 java.util.Locale  |
| #request                                                     | HttpServletRequest 对象，可参考 javax.servlet.http.HttpServletRequest |
| #response                                                    | HttpServletResponse 对象，可参考 javax.servlet.http.HttpServletResponse |
| #session                                                     |   HttpSession 对象，可参考 javax.servlet.http.HttpSession    |
| #servletContext                                              |   ServletContext 对象，可参考 javax.servlet.ServletContext   |

`#ctx`示例：

```html
<!-- zh_CN -->
<p th:text="${#ctx.getLocale()}"></p>
<!-- Welcome to BeiJing! -->
<p th:text="${#ctx.getVariable('message')}"></p>
<!-- true -->
<p th:text="${#ctx.containsVariable('message')}"></p>
```

`#vars`示例：

```html
<!-- zh_CN -->
<p th:text="${#vars.getLocale()}"></p>
<!-- Welcome to BeiJing! -->
<p th:text="${#vars.getVariable('message')}"></p>
<!-- true -->
<p th:text="${#vars.containsVariable('message')}"></p>
```

`#locale`示例：

```html
<!-- zh_CN -->
<p th:text="${#locale}"></p>
<!-- CN -->
<p th:text="${#locale.country}"></p>
<!-- 中国 -->
<p th:text="${#locale.displayCountry}"></p>
<!-- zh -->
<p th:text="${#locale.language}"></p>
<!-- 中文 -->
<p th:text="${#locale.displayLanguage}"></p>
<!-- 中文 (中国) -->
<p th:text="${#locale.displayName}"></p>
```

`#request`示例：

```html
<!-- HTTP/1.1 -->
<p th:text="${#request.protocol}"></p>
<!-- http -->
<p th:text="${#request.scheme}"></p>
<!-- localhost -->
<p th:text="${#request.serverName}"></p>
<!-- 8080 -->
<p th:text="${#request.serverPort}"></p>
<!-- GET -->
<p th:text="${#request.method}"></p>
<!-- /standard-expression-syntax/variables -->
<p th:text="${#request.requestURI}"></p>
<!-- http://localhost:8080/standard-expression-syntax/variables -->
<p th:text="${#request.requestURL}"></p>
<!-- /standard-expression-syntax/variables -->
<p th:text="${#request.servletPath}"></p>
<!-- java.util.Collections$3@203646fe -->
<p th:text="${#request.parameterNames}"></p>
<!-- {q=[Ljava.lang.String;@3308c69f} -->
<p th:text="${#request.parameterMap}"></p>
<!-- q=expression -->
<p th:text="${#request.queryString}"></p>
```

注意，请求地址的 URL 参数直接通过`#request.x`是取不出来的，需要使用`param.x`语法来取出。如，URL：`/standard-expression-syntax/variables?q=expression`，取出 q 参数的正确姿势：`<p th:text="${param.q}"></p>`。

`#response`示例：

```html
<!-- 200 -->
<p th:text="${#response.status}"></p>
<!-- 8192 -->
<p th:text="${#response.bufferSize}"></p>
<!-- UTF-8 -->
<p th:text="${#response.characterEncoding}"></p>
<!-- text/html;charset=UTF-8 -->
<p th:text="${#response.contentType}"></p>
```

`#session`示例：

```html
<!-- 2BCB2A0EACFF2D9D249D9799431B5127 -->
<p th:text="${#session.id}"></p>
<!-- 1499786693244 -->
<p th:text="${#session.lastAccessedTime}"></p>
<!-- fanlychie -->
<p th:text="${#session.getAttribute('user').name}"></p>
```

注意，放到会话里面的对象直接通过`#session.x`是取不出来的，需要使用`session.x`语法来取出。如，取出会话里面的 user 对象的正确姿势：`<p th:text="${session.user.name}"></p>`。

#### 工具类

| 对象                                                         |             描述              |
| :----------------------------------------------------------- | :---------------------------: |
| [#messages](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Messages.java) | 消息工具类，与 ＃{…} 作用相同 |
| [#uris](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Uris.java) |       地址相关的工具类        |
| [#conversions](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Conversions.java) |        对象转换工具类         |
| [#dates](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Dates.java) |        日期时间工具类         |
| [#calendars](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Calendars.java) |          日历工具类           |
| [#numbers](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Numbers.java) |          数字工具类           |
| [#strings](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Strings.java) |         字符串工具类          |
| [#objects](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Objects.java) |          对象工具类           |
| [#bools](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Bools.java) |          布尔工具类           |
| [#arrays](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Arrays.java) |          数组工具类           |
| [#lists](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Lists.java) |          List 工具类          |
| [#sets](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Sets.java) |          Set 工具类           |
| [#maps](https://github.com/thymeleaf/thymeleaf/blob/thymeleaf-3.0.5.RELEASE/src/main/java/org/thymeleaf/expression/Maps.java) |          Map 工具类           |

```html
<!-- false -->
<p th:text="${#strings.isEmpty(message)}"></p>

<!-- 2017-07-12 00:37:25 -->
<p th:text="${#dates.format(now, 'yyyy-MM-dd HH:mm:ss')}"></p>
```
