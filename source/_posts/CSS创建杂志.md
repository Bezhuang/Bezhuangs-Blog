---
title: 通过创建杂志学习 CSS 网格布局
date: 2022-06-17
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [CSS, Grid 布局, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第十三章。在网页设计时，CSS 网格布局使你能够控制网页的行、列。在通过创建杂志学习 CSS 网格布局的课程中，编写一篇杂志文章。你将学习如何使用 CSS Grid，其中包括了像网格行和网格列这样的概念。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点 HTML 代码

Image lazyload：

```html
<img
     src="https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png"
     alt="freecodecamp logo"
     loading="lazy"
     class="hero-img"
     width="400"
     />
```

The `Referer` HTTP header contains information about the address or URL of a page that a user might be visiting from. This information can be used in analytics to track how many users from your page visit freecodecamp.org;

For example. Setting the `rel` attribute to `noreferrer` omits this information from the HTTP request：

```html
<a href="https://freecodecamp.org" target="_blank" rel="noreferrer"
    >freeCodeCamp</a>
```

### 二、重点 CSS 代码

Text decoration：

```CSS
html {
  font-size: 62.5%;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: linen;
}
```

CSS Grid offers a two-dimensional grid-based layout, allowing you to center items horizontally and vertically while still retaining control to do things like overlap elements；

Use the `minmax` function to make your columns responsive on any device：

```css
main {
  display: grid;
  grid-template-columns: minmax(2rem, 1fr) minmax(min-content, 94rem) minmax(2rem, 1fr); /* fr = fraction*/
  row-gap: 3rem;
}
```

 Use the `grid-column` property to tell the `.heading` element to start at grid line 2 and end at grid line 3；

The CSS `repeat()` function is used to repeat a value, setting the `grid-template-columns` property to `repeat(20, 200px)` would create 20 columns each `200px` wide：

```css
.heading {
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1.5rem;
}
```

Use `-1` for the end column.：

```CSS
.hero {
  grid-column: 1 / -1;
  position: relative;
}
```

The `object-fit` property tells the browser how to position the element within its container. In this case, `cover` will set the image to fill the container, cropping as needed to avoid changing the aspect ratio：

```CSS
img {
  width: 100%;
  object-fit: cover;
}
```

```CSS
.social-icons {
  display: grid;
  font-size: 3rem;
  grid-template-columns: repeat(5, 1fr);
}
```

`grid-auto-flow` property takes either `row` or `column` as the first value, with an optional second value of `dense`；The `dense` value allows the algorithm to backtrack and fill holes in the grid with smaller items, which can result in items appearing out of order；

`align-items` will align child elements along the column axis, and `justify-items` will align child elements along the row axis：

```CSS
.social-icons {
  display: grid;
  font-size: 3rem;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  align-items: center;
}
```

Create columns within an element without using Grid by using the `column-width` property：

```CSS
.text {
  grid-column: 2 / 3;
  font-size: 1.8rem;
  letter-spacing: 0.6px;
  column-width: 25rem;
  text-align: justify;
}
```

The `::first-letter` pseudo-selector allows you to target the first letter in the text content of an element：

```CSS
.first-paragraph::first-letter {
  float: left;
  margin-right: 1rem;
  font-size: 6rem;
  color: orangered;
}
```

 Use `list-style-type` to get rid of the bullet points on the list items：

```CSS
.lists {
  list-style-type: none;
  margin-top: 2rem;
}
```

 The `gap` property is a shorthand way to set the value of  `row-gap` and`column-gap` at the same time；

The `place-items` property can be used to set the `align-items` and `justify-items` values at the same time：

```CSS
.image-wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(3, min-content);
  gap: 2rem;
}
```

### 三、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过创建杂志学习CSS网格布局/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
