---
title: 通过构建一组彩色标记来学习 CSS 颜色
date: 2022-05-19
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [CSS, 颜色, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第三章。为你的网页选择正确的颜色可以大大提高对读者的审美吸引力。在通过构建一组彩色标记来学习 CSS 颜色的课程中，构建一组彩色标记，学习设置颜色值的不同方法以及如何将颜色相互配对。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点 HTML 代码

head 标签：

```html
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Colored Markers</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
```

含多个 CSS class 的 div 标签：

```html
<body>
    <h1>CSS Color Markers</h1>
    <div class="container">
        <div class="marker red">
            <div class="cap"></div>
            <div class="sleeve"></div>
        </div>
        <div class="marker green">
            <div class="cap"></div>
            <div class="sleeve"></div>
        </div>
        <div class="marker blue">
            <div class="cap"></div>
            <div class="sleeve"></div>
        </div>
    </div>
</body>
```

### 二、重点 CSS 代码

padding 属性：

```CSS
.container {
    background-color: rgb(255, 255, 255);
    padding: 10px 0;
}
.marker {
    width: 200px;
    height: 25px;
    margin: 10px auto;
}
```

 opacity 属性：

```CSS
.sleeve {
  opacity: 0.5;
  width: 110px;
  height: 25px;
  background-color: white;
}
```

border-left 属性：

```CSS
.cap {
    width: 60px;
    height: 25px;
}
.sleeve {
    width: 110px;
    height: 25px;
    background-color: rgba(255, 255, 255, 0.5);
    border-left: 10px double rgba(0, 0, 0, 0.75);
}
```

多层 CSS class selector：

```CSS
.cap,
.sleeve {
    display: inline-block;
}
```

linear-gradient 属性：

```CSS
.red {
    background: linear-gradient(rgb(122, 74, 14), rgb(245, 62, 113), rgb(162, 27, 27));
    box-shadow: 0 0 20px 0 rgba(83, 14, 14, 0.8);
}
```

```css
.green {
    background: linear-gradient(#55680D, #71F53E, #116C31);
    box-shadow: 0 0 20px 0 #3B7E20CC;
}
```

HSL color model：

```CSS
.blue {
    background: linear-gradient(hsl(186, 76%, 16%), hsl(223, 90%, 60%), hsl(240, 56%, 42%));
    box-shadow: 0 0 20px 0 hsla(223, 59%, 31%, 0.8);
}
```

### 三、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过构建一组彩色标记学习CSS颜色/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
