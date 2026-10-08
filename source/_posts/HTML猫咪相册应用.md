---
title: 通过编写猫咪相册应用学习 HTML
date: 2022-05-15
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [HTML, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第一章。HTML 标签赋予了网页结构。你可以使用 HTML 标签添加照片、按钮和其它元素到你的网页。在通过编写猫咪相册应用学习 HTML 的课程中，通过编写一个猫咪相册应用，学习最常见的 HTML 标签。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点代码

页面格式：

```HTML
<!DOCTYPE html>
<html lang="en">
  <header><title>CatPhotoApp</title></header>
	<body>
  	<main>
    	<section></section>  <!--多个分块-->
  	</main>
  	<footer><p>Copyright</p></footer>
	</body>
</html>
```

figure 标签，用于规定独立的流内容（图像、图表、照片、代码等）：

```html
<figure>
	<img src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/lasagna.jpg" alt="A slice of lasagna on a plate.">   <!--img 标签自闭和-->
	<figcaption>Cats <em>love</em> lasagna.</figcaption>
</figure>
```

form 表单提交：

```html
<form action="https://freecatphotoapp.com/submit-cat-photo">
  <input type="text" name="catphotourl" placeholder="cat photo URL" required>
  <button type="submit">Submit</button>
</form>
```

用 fieldset 标签对表单进行分组，一个表单可以有多个 fieldset：

```html
<fieldset>
	<legend>Is your cat an indoor or outdoor cat?</legend>
	<label><input id="indoor" type="radio" name="indoor-outdoor" value="indoor" checked> Indoor</label>
	<label><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label>
</fieldset>
<fieldset>
	<legend>What's your cat's personality?</legend>
	<input id="loving" type="checkbox" name="personality" value="loving" checked> <label for="loving">Loving</label>
	<input id="lazy" type="checkbox" name="personality" value="lazy"> <label for="lazy">Lazy</label>
	<input id="energetic" type="checkbox" name="personality" value="energetic"> <label for="energetic">Energetic</label>
</fieldset>
```

### 二、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过编写猫咪相册应用学习HTML/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
