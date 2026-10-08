---
title: 创建一副毕加索绘画来学习中级 CSS
date: 2022-06-11
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [CSS, 定位, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第十章。在创建一副毕加索绘画来学习中级 CSS 的课程中，通过代码创建一幅自己的毕加索绘画网页来掌握中级 CSS 技术。课程涉及 SVG 图标、CSS 定位和对已学 CSS 知识的回顾。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点 HTML 代码

FontAwesome is a library of SVG-powered icons, many of which are freely available to use：

```html
<head>
    <meta charset="utf-8">
    <title>Picasso Painting</title>
    <link rel="stylesheet" type="text/css" href="./styles.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"> <!--FontAwesome-->
</head>
```

The `i` element is used for idiomatic text, or text that is separate from the "normal" text content. This could be for *italic* text, such as scientific terms, or for icons like those provided by FontAwesome：

```html
<div id="guitar">
    <div class="guitar" id="guitar-left">
      	<i class="fas fa-bars"></i>
    </div>
    <div class="guitar" id="guitar-right">
      	<i class="fas fa-bars"></i>
    </div>
    <div id="guitar-neck"></div>
</div>
```

### 二、重点 CSS 代码

An `absolute` position takes the element out of that top-down document flow and allows you to adjust it relative to its container. When an element is manually positioned, you can shift its layout with `top`, `left`, `right`, and `bottom`：

```CSS
#offwhite-character {
    width: 300px;
    height: 550px;
    background-color: GhostWhite;
    position: absolute;
    top: 20%;
    left: 17.5%;
}
```

The `z-index` property is used to create "layers" for your HTML elements. Elements with a higher `z-index` value will appear to be layered on top of elements with a lower `z-index` value：

```css
#back-wall {
    background-color: #8B4513;
    width: 100%;
    height: 60%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
```

border-style、border-width 属性：

```CSS
#white-hat {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 120px 140px 180px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: GhostWhite;
    border-left-color: transparent;
    position: absolute;
    top: -140px;
    left: 0;
}
```

display: block 属性：

```CSS
.black-dot {
    width: 10px;
    height: 10px;
    background-color: rgb(45, 31, 19);
    border-radius: 50%;
    display: block;
    margin: auto;
    margin-top: 65%;
}
```

display: inline-block 属性：

```CSS
.fa-music {
    display: inline-block;
    margin-top: 8%;
    margin-left: 13%;
}
```

border-radius 属性：

```CSS
#black-round-hat {
    width: 180px;
    height: 150px;
    background-color: rgb(45, 31, 19);
    border-radius: 50%;
    position: absolute;
    top: -100px;
    left: 5px;
    z-index: -1;
}
```

更改 FontAwesome 大小：

```CSS
.fas {
    font-size: 30px;
}
```

### 三、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/创建一副毕加索绘画来学习中级CSS/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
