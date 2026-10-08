---
title: 通过编写咖啡店菜单学习基础 CSS
date: 2022-05-17
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [CSS, 基础语法, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第二章。CSS 负责告诉浏览器如何展示你的网页。你可以使用 CSS 设置 HTML 元素的颜色、字体、大小等属性。在通过编写咖啡店菜单学习基础 CSS 课程中，通过为一个咖啡店网站设计菜单页来学习 CSS。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点 HTML 代码

meta 标签（自闭和）：

```HTML
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
```

head 中 link CSS 文件 `styles.css`：

```html
<link href="styles.css" rel="stylesheet" type="text/css" />
```

header 标签：

```html
<body>
  <header>
		<h1>CAMPER CAFE</h1>
		<p class="established">Est. 2020</p>
	</header>
  <hr>
</body>
```

div 标签：

```html
<div class="menu">
  <!--header + main + footer-->
</div>
```

article 标签：

```html
<section>
	<h2>Coffee</h2>
	<img src="https://cdn.freecodecamp.org/curriculum/css-cafe/coffee.jpg" alt="coffee icon"/>
	<article class="item">
	<p class="flavor">French Vanilla</p><p class="price">3.00</p>
	</article>
<section>
```

footer 标签：

```html
<hr class="bottom-line">
<footer>
	<p>
	<a href="https://www.freecodecamp.org" target="_blank">Visit our website</a>
	</p>
	<p class="address">123 Free Code Camp Drive</p>
</footer>
```

CSS type selector：

```html
<head>
  <style>
		h1, h2, p {
			text-align: center;
		}
	</style>
</head>
```

### 二、重点 CSS 代码

CSS 注释：

```CSS
/* FOOTER */
```

background-image 属性：

```CSS
body {
    background-image: url(https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg);
    font-family: sans-serif;
    padding: 20px;
}
```

CSS class selector：

```CSS
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/创建一副毕加索绘画来学习中级CSS/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
```

多层 CSS style selector：

```CSS
h1, h2, p {
    text-align: center;
}
h1, h2 {
    font-family: Impact, serif;
}
```

多层 CSS class selector：

```CSS
.flavor, .dessert {
    text-align: left;
    width: 75%;
}
```

display 属性：

```css
.item p {
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 18px;
}
```

CSS pseudo-selector：

```CSS
a {
    color: black;
}
a:visited {
    color: black;
}
a:hover {
    color: brown;
}
a:active {
    color: brown;
}
```

给 img 和 hr 设置属性：

```CSS
img {
    margin: -25px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
hr {
    height: 2px;
    background-color: brown;
    border-color: brown;
}
```

font-size 属性：

```CSS
footer {
    font-size: 14px;
}
```

### 三、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过编写咖啡店菜单学习基础CSS/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
