---
title: HTML 和 CSS 基础知识总结
date: 2020-09-10
references: 
  - title: 前端学习路线图
    url: https://github.com/kamranahmedse/developer-roadmap
  - title: W3school
    url: https://www.w3school.com.cn/h.asp
categories: 前端开发
tags: [HTML, CSS]
---

> 对于前端开发来说，最基本的知识肯定是`HTML`, `CSS`, `JavaScript`三剑客了。前端技术更新快，因此对于文档的阅读和[实际操练](https://learn.freecodecamp.one/)十分重要，基础阶段一定要打好，才能向更高峰攀登。本篇笔记是对一些我认为的 HTML5 和 CSS3 相关常用知识的总结。至于想看最全和最权威文档的朋友还是移步 [MDN web docs](https://developer.mozilla.org/zh-CN/) 吧。

<!--more-->

### 一、HTML

HTML(HyperText Markup Language)：超文本标记语言。

-   超文本：超越了文本的限制，比普通文本更强大。除了文字信息，还可以定义图片、音频、视频等内容。
-   标记语言：由标签构成的语言。

XML就是标记语言，由一个一个的标签组成，HTML 也是由标签组成。HTML中的标签都是预定义好的，运行在浏览器上并由浏览器解析，然后展示出对应的效果。例如我们想在浏览器上展示出图片就需要使用预定义的 `img` 标签；想展示可以点击的链接的效果就可以使用预定义的 `a` 标签等。

W3C标准：W3C是万维网联盟，这个组成是用来定义标准的。他们规定了一个网页是由三部分组成，分别是：

1.  结构：对应的是 HTML 语言

2.  表现：对应的是 CSS 语言

3.  行为：对应的是 JavaScript 语言

HTML定义页面的整体结构；CSS是用来美化页面，让页面看起来更加美观；JavaScript可以使网页动起来，比如轮播图也就是多张图片自动的进行切换等效果。

#### HTML 快速入门

新建文本文件，后缀名改为 `.html`，编写 HTML 结构标签。

HTML 是由一个一个的标签组成的，但是它也用于表示结构的标签：

```html
<html>
	<head>
    	<title> </title>
    </head>
    <body>
        
    </body>
</html>
```

html 标签是根标签，下面有 `head` 标签和 `body` 标签这两个子标签。而 `head` 标签的 `title` 子标签是用来定义页面标题名。

`body` 标签的内容会被展示在内容区中：

```html
<html>
	<head>
    	<title>html 快速入门</title>
    </head>
    <body>
        乾坤未定，你我皆是黑马~
    </body>
</html>
```

可以使用 `font`  标签更改字体颜色：该标签有一个 `color` 属性可以设置字体颜色，如：` <font color='red'></font> ` 就是将文字设置成了红颜色。那么我们只需要将需要变成红色的文字放在标签体部分就可以了。
```html
<html>
	<head>
    	<title>html 快速入门</title>
    </head>
    <body>
        <font color='red'>乾坤未定，你我皆是黑马~</font>
    </body>
</html>
```

HTML 语法松散：不区分大小写，HTML 标签属性值单双引皆可。


#### 基础标签

标题标签：创建页面文件，在 `body` 标签中书写标签。

书写标题标签：标题标签中 h1最大，h6最小。

```html
<h1>我是标题 h1</h1>
<h2>我是标题 h2</h2>
<h3>我是标题 h3</h3>
<h4>我是标题 h4</h4>
<h5>我是标题 h5</h5>
<h6>我是标题 h6</h6>
```

hr标签：`hr` 标签在浏览器中呈现出 横线 的效果。

```html
<hr>
```

font：字体标签（已不建议使用了，可以用 CSS 进行设置）。

* face 属性：用来设置字体。如 "楷体"、"宋体"等。


  * color 属性：设置文字颜色。颜色有三种表示方式：

    1.  英文单词：red,pink,blue...

    2.  `rgb(值1,值2,值3)`：值的取值范围：0~255  

    3.  `#值1值2值3`：值的范围：00~FF


* size 属性：设置文字大小。

```html
<font face="楷体" size="5" color="#ff0000">传智教育</font>
```

换行标签：`<br>` 标签。

段落标签：

```html
<p>
刚察草原绿草如茵，沙柳河水流淌入湖。藏族牧民索南才让家中，茶几上摆着馓子、麻花和水果，炉子上刚煮开的奶茶香气四溢……
</p>
<p>
6月8日下午，习近平总书记来到青海省海北藏族自治州刚察县沙柳河镇果洛藏贡麻村，走进牧民索南才让家中，看望慰问藏族群众。
</p>
```

加粗、斜体、下划线标签：

* b：加粗标签。

* i：斜体标签。

* u：下划线标签，在文字的下方有一条横线。


```html
<b>沙柳河水流淌</b><br>
<i>沙柳河水流淌</i><br>
<u>沙柳河水流淌</u><br>
```

居中标签 `<center>` ：文本居中。

```html
<hr>
<center>
    <b>沙柳河水流淌</b>
</center>
```

#### 图片、音频、视频标签

`<img>`：定义图片

* src：规定显示图像的 URL（统一资源定位符）。

* height：定义图像的高度。

* width：定义图像的宽度。

* audio：定义音频。支持的音频格式：MP3、WAV、OGG 。

  * src：规定音频的 URL。

  * controls：显示播放控件。


* `<video>`：定义视频。支持的音频格式：MP4, WebM、OGG。
  * src：规定视频的 URL。
  * controls：显示播放控件。

- 尺寸单位：height 属性和 width 属性有两种设置方式。

  * 像素：单位是px。

  * 百分比。占父标签的百分比。例如宽度设置为 50%，意思就是占它的父标签宽度的一般（50%）。

- 资源路径：图片，音频，视频标签都有 src 属性，而 src 是用来指定对应的图片，音频，视频文件的路径。

  * 绝对路径：协议://ip地址:端口号/资源名称。

  * 相对路径：相对位置关系。


```html
<img src="../img/a.jpg" width="300" height="400">
<audio src="b.mp3" controls></audio>
<video src="c.mp4" controls width="500" height="300"></video>
```

#### 超链接标签

在网页中可以看到很多超链接标签，超链接使用的是 `a` 标签。

-   href：指定访问资源的URL 。

-   target：指定打开资源的方式。
    * _self：默认值，在当前页面打开。

    * _blank：在空白页面打开。


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
	<a href="https://www.itcast.cn" target="_self">点我有惊喜</a>
</body>
</html>
```

#### 列表标签

有序列表：`<ol>`。有序列表中的 `type` 属性用来指定标记的标号的类型（数字、字母、罗马数字等）。

无序列表：`<ul>。`无序列表中的 `type` 属性用来指定标记的形状。

列表项：`<li>。`


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <ol type="A">
        <li>咖啡</li>
        <li>茶</li>
        <li>牛奶</li>
    </ol>
    
    <ul type="circle">
        <li>咖啡</li>
        <li>茶</li>
        <li>牛奶</li>
    </ul>
</body>
</html>
```

#### 表格标签

table ：定义表格。

* border：规定表格边框的宽度。

* width ：规定表格的宽度。

* cellspacing：规定单元格之间的空白。

tr ：定义行。

* align：定义表格行的内容对齐方式。

td ：定义单元格。

* rowspan：规定单元格可横跨的行数。

* colspan：规定单元格可横跨的列数。

th：定义表头单元格。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<table border="1" cellspacing="0" width="500">
    <tr>
        <th cospan="2">品牌logo</th>  <!--合并单元格-->
        <th>品牌名称</th>
        <th>企业名称</th>
    </tr>
    <tr align="center">
        <td>010</td>
        <td><img src="../img/三只松鼠.png" width="60" height="50"></td>
        <td>三只松鼠</td>
        <td>三只松鼠</td>
    </tr>

    <tr align="center">
        <td>009</td>
        <td><img src="../img/优衣库.png" width="60" height="50"></td>
        <td>优衣库</td>
        <td>优衣库</td>
    </tr>
    <tr align="center">
        <td>008</td>
        <td><img src="../img/小米.png" width="60" height="50"></td>
        <td>小米</td>
        <td>小米科技有限公司</td>
    </tr>
</table>
</body>
</html>
```

#### 布局标签

`<div>`：定义 HTML 文档中的一个区域部分，经常与 CSS 一起使用，用来布局网页。

`<span>`：用于组合行内元素。

`div`标签 在浏览器上会有换行的效果，而 `span` 标签在浏览器上没有换行效果。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div>我是div</div>
    <div>我是div</div>
    <span>我是span</span>
    <span>我是span</span>
</body>
</html>
```

#### 表单标签

表单就是用来采集用户输入的数据，然后将数据发送到服务端，服务端会对数据库进行操作，比如注册就是将数据保存到数据库中，而登陆就是根据用户名和密码进行数据库的查询操作。

表单：在网页中主要负责数据采集功能，使用 `<form>` 标签定义表单。`form` 是表单标签，它在页面上没有任何展示的效果。需要借助于表单项标签来展示不同的效果。

表单项（元素）：不同类型的 `input` 元素、下拉列表、文本域等。
- `<form>`：定义表单
- `<input>`：定义表单项，通过 type属性控制输入形式
- `<label>`：为表单项定义标注
- `<select>`：定义下拉列表
- `<option>`：定义下拉列表的列表项
- `<textarea>`：定义文本域

#### form 标签属性

action：规定当提交表单时向何处发送表单数据，该属性值就是 URL。action 会将数据提交到服务端，该属性需要书写服务端的 URL。可以书写 `#` ，表示提交到当前页面。

method ：规定用于发送表单数据的方式

* get：默认值。如果不设置 method 属性则默认就是该值。请求参数会拼接在 URL 后边。url的长度有限制 4KB。
* post：浏览器会将数据放到 http 请求消息体中。请求参数无限制的。

要想提交数据，`input` 输入框必须设置 `name` 属性。


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="#" method="post">
        <input type="text" name="username">
        <input type="submit">
    </form>
</body>
</html>
```

#### 表单项标签

`<input>`：表单项，通过type属性控制输入形式。

* `input` 标签有个 `type` 属性。 `type` 属性的取值不同，展示的效果也不一样
* text：默认值。定义单行的输入字段
* password：定义密码字段
* radio：定义单选按钮
* checkbox：定义复选框
* file：定义文件上传按钮
* hidden：定义隐藏的输入字段
* submit：定义提交按钮，提交按钮会把表单数据发送到服务器
* reset：定义重置按钮，重置按钮会清除表单中的所有数据
* button：定义可点击按钮

`<select>`：定义下拉列表，`<option>` 定义列表项。

`<textarea>`：文本域，它可以输入多行文本，而 `input` 数据框只能输入一行文本。

以上标签项的内容要想提交，必须得定义 `name` 属性。

每一个标签都有 id 属性，id 属性值是唯一的标识。

单选框、复选框、下拉列表需要使用 `value` 属性指定提交的值。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form action="#" method="post">
        <input type="hidden" name="id" value="123">

        <label for="username">用户名：</label>
        <input type="text" name="username" id="username"><br>

        <label for="password">密码：</label>
        <input type="password" name="password" id="password"><br>

        性别：
        <input type="radio" name="gender" value="1" id="male"> <label for="male">男</label>
        <input type="radio" name="gender" value="2" id="female"> <label for="female">女</label>
        <br>

        爱好：
        <input type="checkbox" name="hobby" value="1"> 旅游
        <input type="checkbox" name="hobby" value="2"> 电影
        <input type="checkbox" name="hobby" value="3"> 游戏
        <br>

        头像：
        <input type="file"><br>

        城市:
        <select name="city">
            <option>北京</option>
            <option value="shanghai">上海</option>
            <option>广州</option>
        </select>
        <br>

        个人描述：
        <textarea cols="20" rows="5" name="desc"></textarea>
        <br>
        <br>
        <input type="submit" value="免费注册">
        <input type="reset" value="重置">
        <input type="button" value="一个按钮">
    </form>
</body>
</html>
```

### 二、CSS

CSS 是一门语言，用于控制网页表现。CSS也有一个专业的名字：Cascading Style Sheet（层叠样式表）。

`style` 标签中定义的就是css代码。以下代码描述了将 `div` 标签的内容的字体颜色设置为 红色。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div{
            color: red;
        }
    </style>
</head>
<body>
    <div>Hello CSS~</div>
</body>
</html>
```

#### css 导入方式

css 导入方式其实就是 css 代码和 html 代码的结合方式。CSS 导入 HTML有三种方式：

1.   内联样式：在标签内部使用style属性，属性值是css属性键值对。

```html
<div style="color: red">Hello CSS~</div>
```

2.   内部样式：定义 `<style>` 标签，在标签内部定义css样式。

```html
<style type="text/css">
	div{
		color: red;
    }
</style>
```

3.   外部样式：定义link标签，引入外部的css文件（编写一个css文件。名为：demo.css）。

```css
div{
	color: red;
}
```

-   在html中引入 css 文件：`<link rel="stylesheet"  href="demo.css">`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        span{
            color: red;
        }
    </style>
    <link href="../css/demo.css" rel="stylesheet">
</head>
<body>
    <div style="color: red">hello css</div>

    <span>hello css </span>

    <p>hello css</p>
</body>
</html>
```

#### css 选择器

css 选择器就是选取需设置样式的元素（标签）。

```css
div {
	color:red;
}
```

元素选择器：`元素名称{color: red;}`

```css
div {color:red}  /*该代码表示将页面中所有的div标签的内容的颜色设置为红色*/
```

id 选择器：`#id属性值{color: red;}`

```html
<div id="name">hello css2</div>
```

```css
#name{color: red;}  /*该代码表示将页面中所有的id属性值是 name 的标签的内容的颜色设置为红色*/
```

类选择器：`.class属性值{color: red;}`

```html
<div class="cls">hello css3</div>
```

```css
.cls{color: red;} /*该代码表示将页面中所有的class属性值是 cls 的标签的内容的颜色设置为红色*/
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        div{
            color: red;
        }

        #name{
            color: blue;
        }

        .cls{
            color: pink;
        }
    </style>

</head>
<body>
    <div>div1</div>
    <div id="name">div2</div>
    <div class="cls">div3</div>
    <span class="cls">span</span>
</body>
</html>
```

#### CSS 基本样式属性

| 属性                  | 描述                                                                  |
| :-------------------- | :-------------------------------------------------------------------- |
| background            | 简写属性，作用是将背景属性设置在一个声明中。                          |
| background-attachment | 背景图像是否固定或者随着页面的其余部分滚动。                          |
| background-color      | 设置元素的背景颜色。                                                  |
| background-image      | 把图像设置为背景。                                                    |
| background-position   | 设置背景图像的起始位置。                                              |
| background-repeat     | 设置背景图像是否及如何重复。                                          |
| color                 | 设置文本颜色                                                          |
| direction             | 设置文本方向。                                                        |
| line-height           | 设置行高。                                                            |
| letter-spacing        | 设置字符间距。                                                        |
| text-align            | 对齐元素中的文本。                                                    |
| text-decoration       | 向文本添加修饰。                                                      |
| text-indent           | 缩进元素中文本的首行。                                                |
| text-shadow           | 设置文本阴影。CSS2 包含该属性，但是 CSS2.1 没有保留该属性。           |
| text-transform        | 控制元素中的字母。                                                    |
| unicode-bidi          | 设置文本方向。                                                        |
| white-space           | 设置元素中空白的处理方式。                                            |
| word-spacing          | 设置字间距。                                                          |
| font                  | 简写属性。作用是把所有针对字体的属性设置在一个声明中。                |
| font-family           | 设置字体系列。                                                        |
| font-size             | 设置字体的尺寸。                                                      |
| font-size-adjust      | 当首选字体不可用时，对替换字体进行智能缩放。（CSS2.1 已删除该属性。） |
| font-style            | 设置字体风格。                                                        |
| font-variant          | 以小型大写字体或者正常字体显示文本。                                  |
| font-weight           | 设置字体的粗细。                                                      |
| list-style            | 简写属性。用于把所有用于列表的属性设置于一个声明中。                  |
| list-style-image      | 将图象设置为列表项标志。                                              |
| list-style-position   | 设置列表中列表项标志的位置。                                          |
| list-style-type       | 设置列表项标志的类型。                                                |
| marker-offset         |                                                                       |
| border-collapse       | 设置是否把表格边框合并为单一的边框。                                  |
| border-spacing        | 设置分隔单元格边框的距离。                                            |
| caption-side          | 设置表格标题的位置。                                                  |
| empty-cells           | 设置是否显示表格中的空单元格。                                        |
| table-layout          | 设置显示单元、行和列的算法。                                          |
| outline               | 在一个声明中设置所有的轮廓属性。                                      |
| outline-color         | 设置轮廓的颜色。                                                      |
| outline-style         | 设置轮廓的样式。                                                      |
| outline-width         | 设置轮廓的宽度。                                                      |

CSS链接的四种状态：

- `a:link {}`- 普通的、未被访问的链接。
- `a:visited {}`- 用户已访问的链接。
- `a:hover {}`- 鼠标指针位于链接的上方。
- `a:active {}`- 链接被点击的时刻。

CSS框模型：element : 元素，padding : 内边距，border : 边框，margin : 外边距。

CSS定位（position属性）：

- static：元素框正常生成。
- relative：元素框偏移某个距离。
- absolute：元素框从文档流完全删除，并相对于其包含块定位。
- fixed：元素框的表现类似于将 position 设置为 absolute，不过其包含块是视窗本身。
