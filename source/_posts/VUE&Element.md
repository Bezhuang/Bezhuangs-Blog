---
title: Vue 和 Element UI 快速入门
date: 2022-04-30
tags: []
categories: Java
references: 
  - title: Java web从入门到企业实战
    url: https://www.bilibili.com/video/BV1Qf4y1T7Hx
---

> Java Web 核心第七章。Vue 是一套前端框架，免除原生 JavaScript 中的 DOM 操作，简化书写。我们之前也学习过后端的框架 `Mybatis` ，`Mybatis` 是用来简化 `jdbc` 代码编写的；而 `VUE` 是前端的框架，是用来简化 `JavaScript` 代码编写的。Element 是饿了么公司前端开发团队提供的一套基于 Vue 的网站组件库，用于快速构建网页。Element 提供了很多组件（组成网页的部件）供我们使用，例如超链接、按钮、图片、表格等。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、VUE 概述

Vue 基于 MVVM（Model-View-ViewModel）思想，实现数据的双向绑定，将编程的关注点放在数据上。

要了解 `MVVM` 思想，必须先聊聊 `MVC` 思想，如下就是 `MVC` 思想图解：

<img src="https://hexo.bezhuang.cn/img/vue01.png" alt="vue01" style="zoom:70%;" />

C 就是 JavaScript 代码，M 就是数据，而 V 是页面上展示的内容，`MVC` 思想是没法进行双向绑定的。双向绑定是指当数据模型数据发生变化时，页面展示的会随之发生变化，而如果表单数据发生变化，绑定的模型数据也随之发生变化。

接下来我们聊聊 `MVVM` 思想，如下是三个组件图解：

<img src="https://hexo.bezhuang.cn/img/vue02.png" alt="vue02" style="zoom:80%;" />

图中的 `Model` 就是我们的数据，`View` 是视图，也就是页面标签，用户可以通过浏览器看到的内容；`Model` 和 `View` 是通过 `ViewModel` 对象进行双向绑定的，而 `ViewModel` 对象是 `Vue` 提供的。

#### 快速入门

Vue 使用起来是比较简单的，总共分为如下三步：

1. 新建 HTML 页面，引入 Vue.js 文件：

   ```html
   <script src="js/vue.js"></script>
   ```

2. 在 JS 代码区域，创建 Vue 核心对象，进行数据绑定：

   ```js
   new Vue({
       el: "#app",
       data() {
           return {
               username: ""
           }
       }
   });
   ```

   创建 Vue 对象时，需要传递一个 js 对象，而该对象中需要如下属性：

   * `el` ： 用来指定哪儿些标签受 Vue 管理。 该属性取值 `#app` 中的 `app` 需要是受管理的标签的 id 属性值。
   * `data` ：用来定义数据模型。
   * `methods` ：用来定义函数。这个我们在后面就会用到。

3. 编写视图：

   ```html
   <div id="app">
       <input name="username" v-model="username" >
       {{username}}
   </div>
   ```

   `{{}}` 是 Vue 中定义的 `插值表达式` ，在里面写数据模型，到时候会将该模型的数据值展示在这个位置。

整体代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <input v-model="username">
    <!--插值表达式-->
    {{username}}
</div>
<script src="js/vue.js"></script>
<script>
    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){  // data() 是 ECMAScript 6 版本的新的写法
            return {
                username:""
            }
        }

        /*data: function () {
            return {
                username:""
            }
        }*/
    });

</script>
</body>
</html>
```

### 二、Vue 指令

指令：HTML 标签上带有 `v-` 前缀的特殊属性，不同指令具有不同含义。例如：`v-if`，`v-for`…

常用的指令有：

| **指令**    | **作用**                                            |
| ----------- | --------------------------------------------------- |
| `v-bind`    | 为HTML标签绑定属性值，如设置  href , css样式等      |
| `v-model`   | 在表单元素上创建双向数据绑定                        |
| `v-on`      | 为HTML标签绑定事件                                  |
| `v-if`      | 条件性的渲染某元素，判定为true时渲染,否则不渲染     |
| `v-else`    |                                                     |
| `v-else-if` |                                                     |
| `v-show`    | 根据条件展示某元素，区别在于切换的是display属性的值 |
| `v-for`     | 列表渲染，遍历容器的元素或者对象的属性              |

#### v-bind & v-model 指令

* v-bind：该指令可以给标签原有属性绑定模型数据。这样模型数据发生变化，标签属性值也随之发生变化，例如：

  ```html
  <a v-bind:href="url">百度一下</a>
  ```

  上面的 `v-bind:"`  可以简化写成 `:`  ，如下：
  
  ```html
  <!--
  	v-bind 可以省略
  -->
  <a :href="url">百度一下</a>
  ```
  
* v-model：该指令可以给表单项标签绑定模型数据。这样就能实现双向绑定效果。例如：

  ```html
  <input name="username" v-model="username">
  ```

代码演示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <a v-bind:href="url">点击一下</a>
    <a :href="url">点击一下</a>
    <input v-model="url">
</div>

<script src="js/vue.js"></script>
<script>
    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){
            return {
                username:"",
                url:"https://www.baidu.com"
            }
        }
    });
</script>
</body>
</html>
```

通过浏览器打开上面页面，并且使用检查查看超链接的路径，该路径会根据输入框输入的路径变化而变化，这是因为超链接和输入框绑定的是同一个模型数据。

#### 1.3.2  v-on 指令

我们在页面定义一个按钮，并给该按钮使用 `v-on` 指令绑定单击事件，html 代码如下：

```html
<input type="button" value="一个按钮" v-on:click="show()">
```

而使用 `v-on` 时还可以使用简化的写法，将 `v-on:` 替换成 `@`，html代码如下：

```html
<input type="button" value="一个按钮" @click="show()">
```

上面代码绑定的 `show()` 需要在 Vue 对象中的 `methods` 属性中定义出来：

```js
new Vue({
    el: "#app",
    methods: {
        show(){
            alert("我被点了");
        }
    }
});
```

注意：`v-on:` 后面的事件名称是之前原生事件属性名去掉 on。

例如：单击事件 ： 事件属性名是 onclick，而在 vue 中使用是 `v-on:click`；失去焦点事件：事件属性名是 onblur，而在 vue 中使用时 `v-on:blur`。

整体页面代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <input type="button" value="一个按钮" v-on:click="show()"><br>
    <input type="button" value="一个按钮" @click="show()">
</div>
<script src="js/vue.js"></script>
<script>
    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){
            return {
                username:"",
            }
        },
        methods:{
            show(){
                alert("我被点了...");
            }
        }
    });
</script>
</body>
</html>
```

#### 条件判断指令

在 Vue中定义一个 `count` 的数据模型，如下：

```js
//1. 创建Vue核心对象
new Vue({
    el:"#app",
    data(){
        return {
            count:3
        }
    }
});
```

现在要实现，当 `count` 模型的数据是3时，在页面上展示 `div1` 内容；当 `count` 模型的数据是4时，在页面上展示 `div2` 内容；`count` 模型数据是其他值时，在页面上展示 `div3`。这里为了动态改变模型数据 `count` 的值，再定义一个输入框绑定 `count` 模型数据。html 代码如下：

```html
<div id="app">
    <div v-if="count == 3">div1</div>
    <div v-else-if="count == 4">div2</div>
    <div v-else>div3</div>
    <hr>
    <input v-model="count">
</div>
```

整体页面代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <div v-if="count == 3">div1</div>
    <div v-else-if="count == 4">div2</div>
    <div v-else>div3</div>
    <hr>
    <input v-model="count">
</div>

<script src="js/vue.js"></script>
<script>
    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){
            return {
                count:3
            }
        }
    });
</script>
</body>
</html>
```

 `v-show` 指令的效果：如果模型数据 `count ` 的值是3时，展示 `div v-show` 内容，否则不展示，html页面代码如下：

```html
<div v-show="count == 3">div v-show</div>
<br>
<input v-model="count">
```

 `v-show` 不展示的原理是给对应的标签添加 `display` css属性，并将该属性值设置为 `none` ，这样就达到了隐藏的效果。而 `v-if` 指令是条件不满足时根本就不会渲染。

#### v-for 指令

这个指令看到名字就知道是用来遍历的，该指令使用的格式如下：

```html
<标签 v-for="变量名 in 集合模型数据">
    {{变量名}}
</标签>
```

注意：需要循环那个标签，`v-for` 指令就写在那个标签上。

如果在页面需要使用到集合模型数据的索引，就需要使用如下格式：

```html
<标签 v-for="(变量名,索引变量) in 集合模型数据">
    <!--索引变量是从0开始，所以要表示序号的话，需要手动的加1-->
   {{索引变量 + 1}} {{变量名}}
</标签>
```

代码演示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">
    <div v-for="addr in addrs">
        {{addr}} <br>
    </div>

    <hr>
    <div v-for="(addr,i) in addrs">
        {{i+1}}--{{addr}} <br>
    </div>
</div>

<script src="js/vue.js"></script>
<script>

    //1. 创建Vue核心对象
    new Vue({
        el:"#app",
        data(){
            return {
                addrs:["北京","上海","西安"]
            }
        }
    });
</script>
</body>
</html>
```

### 三、Vue 生命周期 

生命周期的八个阶段：每触发一个生命周期事件，会自动执行一个生命周期方法，这些生命周期方法也被称为钩子方法：

| 状态          | 阶段周期 |
| ------------- | -------- |
| beforeCreate  | 创建前   |
| created       | 创建后   |
| beforeMount   | 载入前   |
| mounted       | 挂载完成 |
| beforeUpdate  | 更新前   |
| updated       | 更新后   |
| beforeDestroy | 销毁前   |
| destroyed     | 销毁后   |

下图是 Vue 官网提供的从创建 Vue 到效果 Vue 对象的整个过程及各个阶段对应的钩子函数：

<img src="https://hexo.bezhuang.cn/img/vue03.png" alt="vue03" style="zoom:80%;" />

钩子方法我们只关注 `mounted` 就行了。

`mounted`：挂载完成，Vue 初始化成功，HTML 页面渲染成功。而以后我们会在该方法中发送异步请求，加载数据。

### 四、Element 快速入门

学习 Element 其实就是学习怎么从官网拷贝组件到我们自己的页面并进行修改，官网网址是：`https://element.eleme.cn/#/zh-CN`。

1. 将  `element-ui` 文件夹直接拷贝到项目的 `webapp` 下。

2. 创建页面，并在页面引入 Element 的 css、js 文件 和 Vue.js：

   ```html
   <script src="vue.js"></script>
   <script src="element-ui/lib/index.js"></script>
   <link rel="stylesheet" href="element-ui/lib/theme-chalk/index.css">
   ```

3. 创建 Vue 核心对象，Element 是基于 Vue 的，所以使用 Element 时必须要创建 Vue 对象：

   ```html
   <script>
       new Vue({
           el:"#app"
       })
   </script>
   ```
   
4. 官网复制 Element 组件代码。


整体页面代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app">


    <el-row>
     	<el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">删除</el-button>
    </el-row>
    <el-row>
        <el-button plain>朴素按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
    </el-row>

    <el-row>
        <el-button round>圆角按钮</el-button>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" round>成功按钮</el-button>
        <el-button type="info" round>信息按钮</el-button>
        <el-button type="warning" round>警告按钮</el-button>
        <el-button type="danger" round>危险按钮</el-button>
    </el-row>

    <el-row>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row>
</div>

<script src="js/vue.js"></script>
<script src="element-ui/lib/index.js"></script>
<link rel="stylesheet" href="element-ui/lib/theme-chalk/index.css">

<script>
    new Vue({
        el:"#app"
    })
</script>

</body>
</html>
```

### 五、Element 布局

Element 提供了两种布局方式，分别是：Layout 布局和 Container 布局容器。

#### Layout 局部

通过基础的 24 分栏，迅速简便地创建布局。也就是默认将一行分为 24 栏，根据页面要求给每一列设置所占的栏数。

#### Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构。
