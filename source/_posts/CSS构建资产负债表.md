---
title: 通过构建资产负债表了解有关 CSS 伪选择器的更多信息
date: 2022-05-31
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [CSS, 伪选择器, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第九章。可以使用 CSS 伪选择器来更改特定的 HTML 元素。在通过构建资产负债表了解有关 CSS 伪选择器的更多信息的课程中，使用伪选择器构建资产负债表，学习如何在将鼠标悬停在元素上时更改其样式，并触发网页上的其他事件。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点 HTML 代码

flex class：

```html
<h1>
  <span class="flex">
    <span>AcmeWidgetCorp</span>
    <span>Balance Sheet</span>
  </span>
</h1>
```

aria-hidden 属性：

```html
<div id="years" aria-hidden="true">
  <span class="year">2019</span>
  <span class="year">2020</span>
  <span class="year">2021</span>
</div>
```

HTML table 标签:

```html
<div class="table-wrap">
  <table>
    <caption>Assets</caption>
    <thead>
      <tr>
        <td></td>
        <th><span class="sr-only year">2019</span></th>
        <th><span class="sr-only year">2020</span></th>
        <th class="current"><span class="sr-only year">2021</span></th>
      </tr>
    </thead>
    <tbody>
      <tr class="data">
        <th>Cash <span class="description">This is the cash we currently have on hand.</span></th>
        <td>$25</td>
        <td>$30</td>
        <td class="current">$28</td>
      </tr>
      <tr class="data">
        <th>Checking <span class="description">Our primary transactional account.</span></th>
        <td>$54</td>
        <td>$56</td>
        <td class="current">$53</td>
      </tr>
      <tr class="data">
        <th>Savings <span class="description">Funds set aside for emergencies.</span></th>
        <td>$500</td>
        <td>$650</td>
        <td class="current">$728</td>
      </tr>
      <tr class="total">
        <th>Total <span class="sr-only">Assets</span></th>
        <td>$579</td>
        <td>$736</td>
        <td class="current">$809</td>
      </tr>
    </tbody>
  </table>
  <!--同理多个<table></table>-->
</div>
```

### 二、重点 CSS 代码

box-sizing 属性：

```CSS
html {
  box-sizing: border-box;
}
body {
  font-family: sans-serif;
  color: #0a0a23;
}
```

The `span[class~="sr-only"]` selector will select any `span` element whose `class` *includes* `sr-only`：

```css
span[class~="sr-only"] {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  clip-path: inset(50%) !important;
  -webkit-clip-path: inset(50%) !important;
  height: 1px !important ;
  width: 1px !important;
  position: absolute !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  padding: 0 !important;
  margin: -1px !important;
}
/*
The CSS clip property is used to define the visible portions of an element.
The clip-path property determines the shape the clip property should take.
use the !important keyword to ensure these properties are always applied, regardless of order or specificity.
*/
```

flex-direction 属性：

```CSS
h1 {
  max-width: 37.25rem;
  margin: 0 auto;
  padding: 1.5rem 1.25rem;
}
h1 .flex {
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
}
```

The `:first-of-type` pseudo-selector is used to target the first element that matches the selector：

```CSS
h1 .flex span:first-of-type {
  font-size: 0.7em;
}
/* The :last-of-type pseudo-selector does the exact opposite - it targets the last element that matches the selector. */
h1 .flex span:last-of-type {
  font-size: 1.2em;
}
```

section、.table-wrap selector：

```CSS
section {
  max-width: 40rem;
  margin: 0 auto;
  border: 2px solid #d0d0d5;
}
.table-wrap {
  padding: 0 0.75rem 1.5rem 0.75rem;
}
```

The `calc()` function is a CSS function that allows you to calculate a value based on other values：

```CSS
#years {
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  background: #0a0a23;
  color: #fff;
  z-index: 999;
  margin: 0 -2px;
  padding: 0.5rem calc(1.25rem + 2px) 0.5rem 0;
}
```

The `span[class]` syntax will target any `span`element that has a `class` attribute set, regardless of the attribute's value：

```CSS
#years span[class] {
  font-weight: bold;
  width: 4.5rem;
  text-align: right;
}
```

```CSS
span:not(.sr-only) {
  font-weight: normal;
}
```

table selector：

```CSS
table {
  border-collapse: collapse; /* allow cell borders to collapse into a single border */
  border: 0;
  width: 100%;
  position: relative;
  margin-top: 3rem;
}
```

caption selector：

```CSS
table caption {
  color: #356eaf;
  font-size: 1.3em;
  font-weight: normal;
  position: absolute;
  top: -2.25rem;
  left: 0.5rem;
}
```

tbody selector：

```CSS
tbody td {
  width: 100vw; /* fill the viewport */
  min-width: 4rem;
  max-width: 4rem;
}
tbody th {
  width: calc(100% - 12rem);
}
```

The `[attribute="value"]` selector targets any element that has an attribute with a specific value：

```CSS
tr[class="total"] th {
  text-align: left;
  padding: 0.5rem 0 0.25rem 0.5rem;
}
```

The key difference between `tr[class="total"]` and `tr.total` is that the first will select `tr` elements where the *only* class is `total`. The second will select `tr` elements where the class *includes* total：

```CSS
tr.total td {
  text-align: right;
  padding: 0 0.25rem;
}
```

The `:nth-of-type()` pseudo-selector is used to target specific elements based on their order among siblings of the same type：

```CSS
tr.total td:nth-of-type(3) {
  padding-right: 0.5rem;
}
```

其他 table 行/列属性：

```CSS
tr.total:hover {
  background-color: #99c9ff;
}
td.current {
  font-style: italic;
}
tr.data {
  background-image: linear-gradient(to bottom, #dfdfe2 1.845rem, white 1.845rem);
}
tr.data th {
  text-align: left;
  padding-top: 0.3rem;
  padding-left: 0.5rem;
}
```

`tr.data th .description` selector target the elements with the `class` set to `description` that are within your `th` elements in your `.data` table rows：

```CSS
tr.total:hover {
  background-color: #99c9ff;
}
```

block display：

```CSS
tr.data th .description {
  display: block;
  font-weight: normal;
  font-style: italic;
  padding: 1rem 0 0.75rem;
  margin-right: -13.5rem;
}
```

Vertically align the text to the top, horizontally align the text to the right：

```CSS
tr.data td {
  vertical-align: top;
  padding: 0.3rem 0.25rem 0;
  text-align: right;
}
tr.data td:last-of-type {
  padding-right: 0.5rem;
}
```

### 三、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过构建资产负债表了解有关CSS伪选择器的更多信息/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
