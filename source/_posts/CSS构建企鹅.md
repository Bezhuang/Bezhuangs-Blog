---
title: 通过构建企鹅来学习 CSS 变换
date: 2022-06-18
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [CSS, 变换, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第十四章。你可以转换 HTML 元素以创建吸引读者眼球的吸引人的设计，使用变换来旋转元素、缩放它们等等。在通过构建企鹅来学习 CSS 变换的课程中，构建一只企鹅，使用 CSS 变换来定位企鹅的各个部分并调整其大小、创建背景并为你的作品设置动画。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点 CSS 代码

Normalize the page, add background：

```CSS
body {
  background: linear-gradient(45deg, rgb(118, 201, 255), rgb(247, 255, 222));
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: clip;
}
.ground {
  width: 100vw;
  height: calc(100vh - 300px);
  background: linear-gradient(90deg, rgb(88, 175, 236), rgb(182, 255, 255));
  z-index: 3;
  position: absolute;
  margin-top: -58px;
}
```

Use the `transform` property to skew the mountain by `0deg` in the x-axis and `44deg` in the y-axis：

```css
.left-mountain {
  width: 300px;
  height: 300px;
  background: linear-gradient(rgb(203, 241, 228), rgb(80, 183, 255));
  position: absolute;
  transform: skew(0deg, 44deg);
  z-index: 2;
  margin-top: 100px;
}
.back-mountain {
  width: 300px;
  height: 300px;
  background: linear-gradient(rgb(203, 241, 228), rgb(47, 170, 255));
  position: absolute;
  z-index: 1;
  transform: rotate(45deg);
  left: 110px;
  top: 225px;
}
```

 Draw the sun：

```css
.sun {
  width: 200px;
  height: 200px;
  background-color: yellow;
  position: absolute;
  border-radius: 50%;
  top: -75px;
  right: -75px;
}
```

 Draw the penguin：

```CSS
.penguin {
  width: 300px;
  height: 300px;
  margin: auto;
  margin-top: 75px;
  z-index: 4;
  position: relative;
}
.penguin * {
  position: absolute;
}
.penguin-head {
  width: 50%;
	height: 45%;
  background: linear-gradient(
    45deg,
		var(--penguin-skin),
		rgb(239, 240, 228)
	);
	border-radius: 70% 70% 65% 65%;
  top: 10%;
  left: 25%;
  z-index: 1;
}
.face {
  width: 60%;
  height: 70%;
  background-color: var(--penguin-face);
  border-radius: 70% 70% 60% 60%;
  top: 15%;
}
.face.left {
  left: 5%;
}
.face.right {
  right: 5%;
}
.chin {
  width: 90%;
  height: 70%;
  background-color: var(--penguin-face);
  top: 25%;
  left: 5%;
  border-radius: 70% 70% 100% 100%;
}
.eye {
  width: 15%;
  height: 17%;
  background-color: black;
  top: 45%;
  border-radius: 50%;
}
.eye.left {
  left: 25%;
}
.eye.right {
  right: 25%;
}
.eye-lid {
  width: 150%;
  height: 100%;
  background-color: var(--penguin-face);
  top: 25%;
  left: -23%;
  border-radius: 50%;
}
.blush {
  width: 15%;
  height: 10%;
  background-color: pink;
  top: 65%;
  border-radius: 50%;
}
.blush.left {
  left: 15%;
}
.blush.right {
  right: 15%;
}
.beak {
  height: 10%;
  background-color: var(--penguin-picorna);
  border-radius: 50%;
}
.beak.top {
  width: 20%;
	top: 60%;
	left: 40%;
}
.beak.bottom {
  width: 16%;
  top: 65%;
  left: 42%;
}
.shirt {
  font: bold 25px Helvetica, sans-serif;
  top: 165px;
  left: 127.5px;
  z-index: 1;
  color: #6a6969;
}
.shirt div {
  font-weight:  initial;
  top: 22.5px;
  left: 12px;
}
.penguin-body {
  width: 53%;
  height: 45%;
  background: linear-gradient(
    45deg,
		rgb(134, 133, 133) 0%,
		rgb(234, 231, 231) 25%,
		white 67%
	);
  border-radius: 80% 80% 100% 100%;
  top: 40%;
  left: 23.5%;
}
.penguin-body::before {
  content: "";
  position: absolute;
  width: 50%;
  height: 45%;
  background-color: var(--penguin-skin);
  top: 10%;
  left: 25%;
  border-radius: 0% 0% 100% 100%;
  opacity: 70%;
}
.arm {
  width: 30%;
  height: 60%;
  background: linear-gradient(
    90deg,
    var(--penguin-skin),
    rgb(209, 210, 199)
  );
  border-radius: 30% 30% 30% 120%;
  z-index: -1;
}
.arm.left {
  top: 35%;
  left: 5%;
  transform-origin: top left; 
  transform: rotate(130deg) scaleX(-1);
}
.arm.right {
  top: 0%;
  right: -5%;
  transform: rotate(-45deg);
}
.foot {
  width:  15%;
  height: 30%;
  background-color: var(--penguin-picorna);
  top: 85%;
  border-radius: 50%;
  z-index: -1;
}
.foot.left {
  left: 25%;
  transform: rotate(80deg);
}
.foot.right {
  right: 25%;
  transform: rotate(-80deg);
}
```

CSS animations make the penguin wave：

```CSS
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过编写猫咪相册应用学习HTML/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
```

Apply animations：

```CSS
.arm.left {
  top: 35%;
  left: 5%;
  transform-origin: top left; 
  transform: rotate(130deg) scaleX(-1);
  animation-name: wave;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
```

Target the `.penguin` element when it is active, and increase its size by `50%` in both dimensions：

```css
.penguin:active {
  transform: scale(1.5);
  cursor: not-allowed;
}
.penguin {
  width: 300px;
  height: 300px;
  margin: auto;
  margin-top: 75px;
  z-index: 4;
  position: relative;
  transition-duration: 1s;
  transition-timing-function: ease-in-out;
  transition-delay: 0ms;
}
```

### 二、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过构建企鹅来学习CSS变换/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
