---
title: 通过构建摩天轮学习 CSS 动画
date: 2022-06-19
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [CSS, 动画, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第十五章。你可以使用 CSS 动画将注意力吸引到网页的特定部分并使其更具吸引力。在通过构建摩天轮学习 CSS 动画的课程中，建造一个摩天轮，学习如何使用 CSS 为元素设置动画、转换它们并调整它们的速度。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点 CSS 代码

Draw a wheel：

```CSS
.wheel {
  border: 2px solid black;
  border-radius: 50%;
  margin-left: 50px;
  position: absolute;
  height: 55vw;
  width: 55vw;
  max-width: 500px;
  max-height: 500px;
}
```

The `transform-origin` property is used to set the point around which a CSS transformation is applied：

```css
.line {
  background-color: black;
  width: 50%;
  height: 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0% 0%;
}
```

 The `transform` property allows you to manipulate the shape of an element：

```css
.line:nth-of-type(2) {
  transform: rotate(60deg);
}
.line:nth-of-type(3) {
  transform: rotate(120deg);
}
.line:nth-of-type(4) {
  transform: rotate(180deg);
}
.line:nth-of-type(5) {
  transform: rotate(240deg);
}
.line:nth-of-type(6) {
  transform: rotate(300deg);
}
```

Set the origin point to be offset `50%` from the left and `0%` from the top, placing it in the middle of the top edge of the element：

```CSS
.cabin {
  background-color: red;
  width: 20%;
  height: 20%;
  position: absolute;
  border: 2px solid;
  transform-origin: 50% 0%;
}
```

The `@keyframes` at-rule is used to define the flow of a CSS animation. Within the `@keyframes` rule, you can create selectors for specific points in the animation sequence, such as `0%` or `25%`, or use `from` and `to` to define the start and end of the sequence；

`@keyframes` rules require a name to be assigned to them, which you use in other rules to reference. For example, the `@keyframes freeCodeCamp { }` rule would be named `freeCodeCamp`：

```CSS
@keyframes wheel {
   0% {
     transform: rotate(0deg);
   }
   100% {
     transform: rotate(360deg);
   }
}
```

The `animation-name` property is used to link a `@keyframes` rule to a CSS selector；

The `animation-duration` property is used to set how long the animation should sequence to complete；

The `animation-iteration-count` property sets how many times your animation should repeat；

The `animation-timing-function` property sets how the animation should progress over time：

```CSS
.wheel {
  border: 2px solid black;
  border-radius: 50%;
  margin-left: 50px;
  position: absolute;
  height: 55vw;
  width: 55vw;
  max-width: 500px;
  max-height: 500px;
  animation-name: wheel;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
```

Use the `animation` property to set these all at once：

```css
.cabin {
  background-color: red;
  width: 20%;
  height: 20%;
  position: absolute;
  border: 2px solid;
  transform-origin: 50% 0%;
  animation: cabins 10s ease-in-out infinite;
}
```

`@keyframes` cabins：

```css
@keyframes cabins {
  0% {
    transform: rotate(0deg);
  }
  25% {
    background-color: yellow;
  }
  50% {
    background-color: purple;
  }
  75% {
    background-color: yellow;
  }
  100% {
    transform: rotate(-360deg);
  }
}
```

### 二、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过构建摩天轮学习CSS动画/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
