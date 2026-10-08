---
title: 前端开发库 jQuery
date: 2022-08-06
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/front-end-development-libraries/
categories: 前端开发
tags: [jQuery, JavaScript]
---

> freeCodeCamp 前端开发库第二章。jQuery 曾是开发者们最常用的 JavaScript 库之一。在 jQuery 于 2006 年发布时，各种常用浏览器处理 JavaScript 的方式都略有不同。jQuery 简化了编写客户端 JavaScript 的过程，并确保代码在所有浏览器中以同样的方式运行。在 jQuery 课程中，学习如何使用 jQuery 选择、移除、克隆和修改页面上的不同元素。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、jQuery 选择器

在使用 jQuery 之前，需要在 HTML 页面后台引入 jQuery 库和 Animate.css 库，而且 `script` 标签中添加代码 `$(document).ready(function() {`。 然后在后面（仍在该 `script` 标签内）用 `});` 闭合它：

```html
<link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css" rel="stylesheet" />
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>    
<script>
  	$(document).ready(function(){});
</script>
```

所有的 jQuery 函数都以 `$` 开头，这个符号通常被称为美元符号（dollar sign operator）或 bling。jQuery 通常选取并操作带有选择器（selector）的 HTML 标签，jQuery 的 `.addClass()` 方法用来给标签添加类：

```javascript
$(document).ready(function() {
    $("button").addClass("animated bounce");  //给 button 元素添加跳跃效果
  	$(".text-primary").addClass("animated shake");  //使所有类为 text-primary 的标签抖动
  	$("#target6").addClass("animated fadeOut");  //使 id 为 target6 的 button 标签淡出
});
```

和用 jQuery 的 `addClass()` 方法给标签添加类一样，也可以利用 jQuery 的 `removeClass()` 方法移除它们：

```js
$("#target2").removeClass("btn-default");
```

### 二、jQuery 更改元素

jQuery 有一个 `.css()` 方法，能改变标签的 CSS：

```js
$("#target1").css("color", "blue");  //把颜色变蓝
```

还能用 jQuery 改变 HTML 标签的非 CSS 属性， 例如：禁用按钮。当禁用按钮时，它将变成灰色并无法点击。jQuery 有一个 `.prop()` 方法，可以用其调整标签的属性：

```js
$("button").prop("disabled", true);  //禁用所有的按钮
```

可以通过 jQuery 改变元素开始和结束标签之间的文本。 甚至改变 HTML 标签。jQuery 有一个 `.html()` 函数，能用其在标签里添加 HTML 标签和文本， 函数提供的内容将完全替换之前标签的内容：

```js
$("h3").html("<em>jQuery Playground</em>");  //重写并强调标题文本
```

jQuery 还有一个类似的函数 `.text()`，可以在不添加标签的前提下改变标签内的文本。 换句话说，这个函数不会评估传递给它的任何 HTML 标记，而是将其视为要替换现有内容的文本：

```js
$("#target4").text("<em>#target4</em>")   //将文本换为<em>#target4</em>
```

jQuery 有一个 `.remove()` 方法，能完全移除 HTML 标签：

```js
$("#target4").remove();  //从页面移除 #target4 元素
```

jQuery 有一个 `appendTo()` 方法，可以选取 HTML 标签并将其添加到另一个标签里面：

```js
$("#target4").appendTo("#left-well");  //把 target4 从 right well 移到 left well
```

jQuery 有一个 `clone()` 方法，可以复制标签：

```js
$("#target2").clone().appendTo("#right-well");  //把 target2 从 left-well 复制到 right-well
```

是否注意到这两个 jQuery 函数连在一起了？ 这被称为链式调用（function chaining），是一种用 jQuery 实现效果的简便方法。

每个 HTML 标签都默认 `inherits`（继承）其 `parent`（父标签）的 CSS 属性。jQuery 有一个 `parent()` 方法，可以访问被选取标签的父标签：

```js
$("#left-well").parent().css("background-color", "blue");  //使用 parent() 方法把 left-well 标签的父标签背景色设置成蓝色（blue）
```

把 HTML 标签放到另一个级别的标签里，这些 HTML 标签被称为该标签的子标签（children element）。jQuery 有一个 `children()` 方法，可以访问被选取标签的子标签：

```js
$("#left-well").children().css("color", "blue");  //用 children() 方法把 left-well 标签的子标签的颜色设置成 blue（蓝色）  
```

jQuery 可以用 CSS 选择器（CSS Selectors）选取标签。 `target:nth-child(n)` CSS 选择器可以选取指定 class 或者元素类型的的第 n 个标签：

```js
$(".target:nth-child(3)").addClass("animated bounce");  //给每个区域（well）的第 3 个标签设置弹跳（bounce）动画效果
```

也可以用基于位置的奇 `:odd` 和偶 `:even` 选择器选取标签。注意，jQuery 是零索引（zero-indexed）的，这意味着第 1 个标签的位置编号是 0。 这有点混乱和反常——`:odd` 表示选择第 2 个标签（位置编号 1），第 4 个标签（位置编号 3）……等等，以此类推：

```js
$(".target:odd").addClass("animated shake");  //选取所有 target class 元素的奇数元素并设置 shake 效果
```

jQuery 也能选取 `body` 标签：

```js
$("body").addClass("animated fadeOut");  //这是使整个 body 淡出的代码
```

### 三、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/前端开发库/jQuery游乐场/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
