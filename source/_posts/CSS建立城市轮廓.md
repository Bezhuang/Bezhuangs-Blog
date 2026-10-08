---
title: 通过建立城市轮廓学习 CSS 变量
date: 2022-06-16
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [CSS, CSS 变量, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第十二章。CSS 变量负责帮助组织你的样式和重复使用它们。在通过建立城市轮廓学习 CSS 变量的课程中，建立一座城市的轮廓，学习如何配置 CSS 变量，以便可以随时重复使用它们。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点 CSS 代码

In CSS, you can target everything with an asterisk：

```CSS
* {
  border: 1px solid black;
  box-sizing: border-box;
}
```

Center the parts of the building using "flex" or "flexbox";

```css
.bb1 {
  width: 10%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Variable declarations begin with two dashes (`-`) and are given a name and a value like this: `--variable-name: value;`, variables are often declared in the `:root` selector：

```css
:root {
  --building-color1: #aa80ff;
  --building-color2: #66cc99;
  --building-color3: #cc6699;
}
```

To use a variable, put the variable name in parentheses with `var` in front of them like this: `var(--variable-name)`：

```CSS
.bb1a {
  width: 70%;
  height: 10%;
  background-color: var(--building-color1, purple); /* purple is the fallback value */
}
```

Use flexbox again to evenly space the buildings across the bottom of the element：

```CSS
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过创建照片集来学习CSS弹性盒子/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
```

Gradients in CSS are a way to transition between colors across the distance of an element, they are applied to the `background` property：

```CSS
.bb1d {
  width: 100%;
  height: 70%;
  background: linear-gradient(
      orange,
      var(--building-color1) 80%,
      var(--window-color1)
    );
}
```

Make the four colors of your gradient repeat until it gets to the bottom of the element; giving you some stripes：

```CSS
.bb2b {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
      var(--building-color2),
      var(--building-color2) 6%,
      var(--window-color2) 6%,
      var(--window-color2) 9%
    );
}
```

You can add multiple gradients to an element by separating them with a comma (`,`)：

```CSS
.fb6 {
  width: 9%;
  height: 38%;
  background: repeating-linear-gradient(
      90deg,
      var(--building-color3),
      var(--building-color3) 10%,
      transparent 10%,
      transparent 30%
    ),
    repeating-linear-gradient(
      var(--building-color3),
      var(--building-color3) 10%,
      var(--window-color3) 10%,
      var(--window-color3) 30%
    );
}
```

Sky background：

```CSS
.sky {
  background: radial-gradient(
    circle closest-corner at 15% 15%,
      #ffcf33,
      #ffcf33 20%,
      #ffff66 21%,
      #bbeeff 100%
    );
}
```

 A media query can be used to change styles based on certain conditions：

```CSS
@media (max-width: 1000px) {
  :root {
    --building-color1: #000;
    --building-color2: #000;
    --building-color3: #000;
    --building-color4: #000;
    --window-color1: #777;
    --window-color2: #777;
    --window-color3: #777;
    --window-color4: #777;
}
  .sky {
    background: radial-gradient(
        closest-corner circle at 15% 15%,
        #ccc,
        #ccc 20%,
        #445 21%,
        #223 100%
      );
  }
}
```

### 二、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过建立城市轮廓学习CSS变量/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
