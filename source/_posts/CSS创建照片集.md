---
title: 通过创建照片集来学习 CSS 弹性盒子
date: 2022-05-24
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [CSS, Flexbox, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第六章。通过弹性盒子你可以设计适应不同屏幕大小的网页。在通过创建照片集来学习 CSS 弹性盒子的课程中，使用弹性盒子创建一个响应式的照片集网页。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点 CSS 代码

`*` selector：

```CSS
* {
    box-sizing: border-box;
}
body {
    margin: 0;
    font-family: Arial;
    background: #EBE7E7;
}
.header {
    text-align: center;
    padding: 32px;
    background: #E0DDDD;
}
```

id selector：

```css
#gallery img {
    width: 25%;
    height: 300px;
    object-fit: cover;
    margin-top: 8px;
    padding: 0 4px;
    border-radius: 10px;
}
```

CSS Flexbox：

```CSS
#gallery {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0 4px;
}
```

media query：

```CSS
@media (max-width: 800px) {
    #gallery img {
        width: 50%;
    }
}
@media (max-width: 600px) {
    #gallery img {
        width: 100%;
    }
}
```

### 二、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过创建照片集来学习CSS弹性盒子/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
