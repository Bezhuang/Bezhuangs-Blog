---
title: 通过编写注册表单学习 HTML 表单
date: 2022-05-20
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/2022/responsive-web-design
categories: 前端开发
tags: [HTML, 表单, freeCodeCamp]
---

> freeCodeCamp 响应式网页设计的认证课程第四章。你可以使用 HTML 表单收集访问网页的用户的信息。在通过编写注册表单学习 HTML 表单的课程中，通过编写一个注册页学习 HTML 表单，学习如何控制人们在表单中可以输入的数据类型，以及使用一些新的 CSS 工具装饰你的页面。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、重点 HTML 代码

表格页面格式：

```HTML
<body>
  <h1>Registration Form</h1>
  <p>Please fill out this form with the required information</p>
  <form action='https://register-demo.freecodecamp.org'>
    <!--表格内容-->
  </form>
  <input type="submit" value="Submit" />
</body>
```

输入框：

```html
<fieldset>
	<label>Enter Your First Name: <input type="text" name="first-name" required /></label>
	<label>Enter Your Last Name: <input type="text" name="last-name" required /></label>
	<label>Enter Your Email: <input type="email" name="email" required /></label>
	<label>Create a New Password: <input type="password" name="password" minlen="8" pattern="[a-z0-5]{8,}" required /></label>
</fieldset>
```

单选&复选框：

```html
<fieldset>
  <label><input type="radio" name="account-type" class="inline" /> Personal Account</label>
  <label><input type="radio" name="account-type" class="inline" /> Business Account</label>
  <label>
    <input type="checkbox" name="terms" class="inline" required /> I accept the <a href="https://www.freecodecamp.org/news/terms-of-service/">terms and conditions</a>
  </label>
</fieldset>
```

文件、数字、下拉栏、文本框输入：

```html
<fieldset>
	<label>Upload a profile picture: <input type="file" name="file" /></label>
	<label>Input your age (years): <input type="number" name="age" min="13" max="120" /></label>
	<label>How did you hear about us?
		<select name="referrer">
    	<option value="">(select one)</option>
    	<option value="1">freeCodeCamp News</option>
     	<option value="2">freeCodeCamp YouTube Channel</option>
      <option value="3">freeCodeCamp Forum</option>
      <option value="4">Other</option>
   	</select>
  </label>
  <label>Provide a bio:
  	<textarea name="bio" rows="3" cols="30" placeholder="I like coding on the beach..."></textarea>
	</label>
</fieldset>
```

### 二、重点 CSS 代码

pseudo-class（`:not(:last-of-type)`）：

```CSS
fieldset {
  border: none;
	padding: 2rem 0;
}
fieldset:not(:last-of-type) {
  border-bottom: 3px solid #3b3b4f;
}
```

unset 属性：

```css
.inline {
  width: unset;
  margin: 0 0.5em 0 0;
  vertical-align: middle;
}
```

CSS attribute selector：

```CSS
input[type="submit"] {
  display: block;
  width: 60%;
  margin: 1em auto;
  height: 2em;
  font-size: 1.1rem;
  background-color: #3b3b4f;
  border-color: white;
  min-width: 300px;
}
input[type="file"] {
  padding: 1px 2px;
}
```

其他表单设置：

```css
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  background-color: #1b1b32;
	color: #f5f6f7;
  font-family: Tahoma;
	font-size: 16px;
}
h1, p {
  margin: 1em auto;
  text-align: center;
}
form {
  width: 60vw;
	max-width: 500px;
	min-width: 300px;
	margin: 0 auto;
  padding-bottom: 2em;
}
label {
  display: block;
	margin: 0.5rem 0;
}
input,
textarea,
select {
  margin: 10px 0 0 0;
	width: 100%;
  min-height: 2em;
}
input, textarea {
  background-color: #0a0a23;
  border: 1px solid #0a0a23;
  color: #ffffff;
}
a{
  color: #dfdfe2;
}
```

### 三、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/响应式网页设计/通过编写注册表单学习HTML表单/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
