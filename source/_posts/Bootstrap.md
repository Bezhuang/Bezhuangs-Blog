---
title: 前端开发库 Bootstrap
date: 2022-08-04
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/front-end-development-libraries/
categories: 前端开发
tags: [Bootstrap, CSS]
---

> freeCodeCamp 前端开发库第一章。Bootstrap 一个是用于设计响应性网页和应用程序的前端框架。它对网页开发采用移动优先的方法，具有预定义的 CSS 样式和 class，以及一些 JavaScript 功能。在 Bootstrap 课程中，学习如何使用 Bootstrap 来构建响应式网页，并使用它的 class 来设置按钮、图像、表格、导航和其他常见元素的样式。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、使用 Bootstrap Fluid 容器实现响应式设计

任何 Web 应用，都可以通过添加如下代码到 HTML 顶部来引入 Bootstrap：

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>
```

将所有 HTML（ `link` 标签和 `style` 元素除外）嵌套在带有 `container-fluid` class 的 `div` 元素里面。

通过 Bootstrap，我们仅仅只需要为 image 标签上设置 class 属性为 `img-responsive` ， 就可以让它完美地适应你的页面的宽度了。

```html
<div class="container-fluid">
   <img class="img-responsive center-block" src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/running-cats.jpg" /> 
</div>
```

可以使用 Bootstrap 将顶部的元素居中来美化页面。 只需要将 `h2` 元素的 class 属性设置为 `text-center` 就可以实现：

```html
<h2 class="red-text text-center">your text</h2>
```

### 二、Bootstrap 按钮

Bootstrap 的 `button` 元素有着独有的、比默认 HTML 按钮更好的样式风格：

```html
<button class="btn btn-block btn-default">Like</button>
<button class="btn btn-block btn-primary">Like</button> 
<!--btn-primary class 的颜色是应用的主要颜色。 这样 “突出显示” 是引导用户按部就班进行操作的有效办法。-->
```

Bootstrap 有着丰富的预定义按钮颜色。 浅蓝色的 `btn-info` class 通常用在备选操作上，红色 `btn-danger` class 用来提醒用户此行为具有破坏性：

```html
<button class="btn btn-block btn-info">Info</button> 
<button class="btn btn-block btn-danger">Delete</button> 
```

### 三、使用 Bootstrap Grid 并排放置元素

Bootstrap 具有一套 12 列的响应式栅格系统，可以轻松的将多个元素放入一行并指定它们的相对宽度。 Bootstrap 的大部分 class 属性都可以应用在 `div` 元素上。

拿 Bootstrap 的 `col-md-*` class 来说。 在这里， `md` 表示 medium （中等的）， 而 `*` 是一个数字，说明了这个元素占有多少个列宽度。 这个例子就是指定了中等大小屏幕（例如笔记本电脑）下元素所占的列宽度。

```html
<div class="row">
    <div class="col-xs-4">
      	<button class="btn btn-block btn-primary">Like</button>
    </div>
    <div class="col-xs-4">
      	<button class="btn btn-block btn-info">Info</button>
    </div>
    <div class="col-xs-4">
    		<button class="btn btn-block btn-danger">Delete</button>
    </div>
</div>
<!--使用 col-xs-* ， 其中 xs 是 extra small 的缩写 (比如窄屏手机屏幕)， * 是填写的数字，代表一行中的元素该占多少列宽。-->
```

### 四、使用 Bootstrap 替代自定义样式

可以使用 span 标签来创建行内元素：

```html
<p>Top 3 things cats <span class="text-danger">hate:</span></p>
```

由于 Bootstrap 使用了响应式栅格系统，可以很方便的把元素放到一行以及指定元素的相对宽度。 大部分的 Bootstrap 的 class 都能用在 `div` 元素上：

```html
<div class="row">
    <div class="col-xs-8"><h2 class="text-primary text-center">CatPhotoApp</h2></div>
		<div class="col-xs-4"><a href="#"><img class="img-responsive thick-green-border" src="https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg" alt="A cute orange cat lying on its back."></a>
</div>
```

Font Awesome 是一个非常便利的图标库。 我们可以通过 webfont 或矢量图的方式来使用这些图标：

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
<button class="btn btn-block btn-primary"><i class="fas fa-thumbs-up"></i>Like</button>
```

Bootstrap 的 `col-xs-*` class 也可以用在 `form` 元素上，这样就可以在不关心屏幕大小的情况下，将的单选按钮均匀的平铺在页面上：

```html
<form action="https://freecatphotoapp.com/submit-cat-photo">
    <div class="row">
          <div class="col-xs-6"><label><input type="radio" name="indoor-outdoor"> Indoor</label></div>
          <div class="col-xs-6"><label><input type="radio" name="indoor-outdoor"> Outdoor</label></div>
    </div>
</form>
```

所有文本输入类的元素如 `<input>`，`<textarea>` 和 `<select>` 只要设置 `.form-control` class 就会占满100%的宽度：

```html
<input type="text" placeholder="cat photo URL" class="form-control" required>
<button type="submit" class="btn btn-primary"><i class="fa fa-paper-plane"></i>Submit</button>
```

Bootstrap 有一个叫作 `well` 的 class，作用是使界面更具层次感：

```html
<div class="col-xs-6">
      <div class="well"></div>
</div>
```

并不是所有 class 属性都需要有对应的 CSS 样式。 有时候我们设置 `target` class 只是为了更方便地在 jQuery 中选中这些元素，使用 jQuery 时，修改 HTML 元素时并不需要直接修改 HTML 代码。：

```html
<button class="btn btn-default target"></button>
```

除了可以给元素添加 class 属性，我们还可以给元素设置 `id` 属性：

```html
<div class="well" id="center-well">
```

### 五、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/前端开发库/Bootstrap猫咪相册/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
