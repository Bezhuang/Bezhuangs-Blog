---
title: 通过创作罗斯科绘画学习 CSS 盒子模型
date: 2022-05-23
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [CSS, 盒子模型, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第五章。每个 HTML 元素都是一个盒子，它拥有着自己的间距和边框，这叫作盒子模型。在通过创作罗斯科绘画学习 CSS 盒子模型的课程中，使用 CSS 和盒子模型，创作属于自己的罗斯科风格的矩形艺术作品。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、CSS box model

![](https://hexo.bezhuang.cn/img/diagram-3.png)

### 二、重点 CSS 代码

Use padding to adjust the spacing within an element：

```CSS
.frame {
    border: 50px solid black;
    width: 500px;
    padding: 50px;
    margin: 20px auto;
}
```

Use margins to adjust the spacing outside of an element：

```css
.one {
    width: 425px;
    height: 150px;
    background-color: #efb762;
    margin: 20px auto;
    box-shadow: 0 0 3px 3px #efb762;
    border-radius: 9px;
    transform: rotate(-0.6deg);
}
```

overflow:hidden 溢出隐藏、清除浮动、解决外边距塌陷：

```CSS
.canvas {
    width: 500px;
    height: 600px;
    background-color: #4d0f00;
    overflow: hidden;
    filter: blur(2px);
}
```

filter 属性；box-shadow 属性；border-radius 属性；transform 属性：

```CSS
.two {
    width: 475px;
    height: 200px;
    background-color: #8f0401;
    margin: 0 auto 20px;
    box-shadow: 0 0 3px 3px #8f0401;
    border-radius: 8px 10px;
    transform: rotate(0.4deg);
}
.one,
.two {
    filter: blur(1px);
}
.three {
    width: 91%;
    height: 28%;
    background-color: #b20403;
    margin: auto;
    filter: blur(2px);
    box-shadow: 0 0 5px 5px #b20403;
    border-radius: 30px 25px 60px 12px;
    transform: rotate(-0.2deg);
}
```

### 三、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过创作罗斯科绘画学习CSS盒子模型/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
