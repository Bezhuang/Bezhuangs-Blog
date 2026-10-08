---
title: JavaScript 基础知识总结
date: 2020-10-05
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
  - title: learn x in y minutes
    url: https://learnxinyminutes.com/docs/zh-cn/javascript-cn/
categories: 前端开发
tags: [JavaScript, 基础语法]
---

> JavaScript 是一门跨平台、面向对象的脚本语言，它能使网页可交互，可以让你在网页上添加更多功能，另外还有高级的服务端 JavaScript 版本，在 web 浏览器中，JavaScript 能够通过其所连接的环境提供的编程接口进行控制。在之前我已经简单总结了[HTML5/CSS3的必会知识点](/HTML和CSS基础)，为 Javascript 学习打下基础。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、JavaScript 简介

JavaScript 是一门跨平台、面向对象的脚本语言，不需要编译成字节码，由浏览器直接解析并执行。JavaScript 是用来控制网页行为的，它能使网页可交互，如改变页面内容、修改指定元素的属性值、对表单进行校验等。

JavaScript（简称：JS） 在 1995 年由 Brendan Eich 发明，并于 1997 年成为一部 ECMA 标准。ECMA 规定了一套标准 就叫 `ECMAScript` ，所有的客户端校验语言必须遵守这个标准，当然 JavaScript 也遵守了这个标准。ECMAScript 6 (简称ES6) 是最新的 JavaScript 版本（发布于 2015 年)。

### 二、JavaScript 引入方式

JavaScript 引入方式就是 HTML 和 JavaScript 的结合方式。JavaScript引入方式有两种：内部脚本（将 JS 代码定义在 HTML 页面中）和外部脚本（将 JS 代码定义在外部 JS 文件中，然后引入到 HTML 页面中）。


#### 内部脚本

在 HTML 中，JavaScript 代码必须位于 `<script>` 与 `</script>` 标签之间，在 HTML 文档中可以在任意地方，放置任意数量的 `<script>` 标签。

`alert(数据)` 是 JavaScript 的一个方法，作用是将参数数据以浏览器弹框的形式输出出来。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<script>
    alert("hello js1");
</script>
</body>
</html>
```

一般把脚本置于 `<body>` 元素的底部，可改善显示速度，因为浏览器在加载页面的时候会从上往下进行加载并解析。 我们应该让用户看到页面内容，然后再展示动态的效果。

#### 外部脚本

定义外部 js 文件（demo.js），外部脚本不能包含 `<script>` 标签，在 js 文件中直接写 js 代码即可，不要在 js文件 中写 `script` 标签。


```js
alert("hello js");
```

在 HTML 页面使用 `script` 标签中使用 `src` 属性指定 js 文件的 URL 路径，引入外部的 js 文件。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script src="../js/demo.js"></script>
</body>
</html>
```

`<script>` 标签不能自闭合：在页面中引入外部 js 文件时，不能写成 `<script src="../js/demo.js" />`。

### 三、JavaScript 基础语法

#### 书写语法

区分大小写：变量名、函数名以及其他一切东西都是区分大小写的。

每行结尾的分号可有可无，如果一行上写多个语句时，必须加分号用来区分多个语句。

注释

1.  单行注释：`// 注释内容`
2.  多行注释：`/* 注释内容 */`
3.  JavaScript 没有文档注释

大括号表示代码块

```js
if (count == 3) { 
   alert(count); 
} 
```

#### 输出语句

js 可以通过以下方式进行内容的输出，只不过不同的语句输出到的位置不同。

1.   使用 `window.alert()` 写入警告框。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    
<script>
    window.alert("hello js");//写入警告框
</script>
</body>
</html>
```

2.   使用 `document.write()` 写入 HTML 输出。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    
<script>
    document.write("hello js 2~");//写入html页面
</script>
</body>
</html>
```

3.   使用 `console.log()` 写入浏览器控制台。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<script>
    console.log("hello js 3");//写入浏览器的控制台
</script>
</body>
</html>
```

#### 变量

JavaScript 中用 `var` 关键字（variable 的缩写）来声明变量。格式： `var 变量名 = 数据值;`

JavaScript 提供八种不同的数据类型，它们是 `undefined`（未定义）、`null`（空）、`boolean`（布尔型）、`string`（字符串）、`symbol`、`number`（数字）、`bigint`（可以表示任意大的整数）和 `object`（对象）。

JavaScript 是一门弱类型语言，变量可以存放不同类型的值，如在定义变量时赋值为数字数据，还可以将变量的值改为字符串类型的数。

```js
var test = 20;
test = "张三";
```

js 中的变量名命名规则和 Java 语言基本都相同：组成字符可以是任何字母、数字、下划线（_）或美元符号（$），数字不能开头，使用驼峰命名。

JavaScript 中 `var` 关键字有点特殊，有以下地方和其他语言不一样：

1.   作用域：全局变量。


  ```js
{
    var age = 20;
}
alert(age);  // 在代码块中定义的age 变量，在代码块外边还可以使用
  ```

2.   变量可以重复定义。


  ```js
{
    var age = 20;
    var age = 30;//JavaScript 会用 30 将之前 age 变量的 20 替换掉
}
alert(age); //打印的结果是 30
  ```

ECMAScript 6 新增了 `let `关键字来定义变量。它的用法类似于 `var`，但是所声明的变量，只在 `let` 关键字所在的代码块内有效，且不允许重复声明。


```js
{
    let age = 20;
}
alert(age); 
```

ECMAScript 6 新增了 `const` 关键字，用来声明一个只读的常量。一旦声明，常量的值就不能改变。

#### 全局作用域和函数

在 JavaScript 中，作用域涉及到变量的作用范围。 在函数外定义的变量具有 全局 作用域。 这意味着，具有全局作用域的变量可以在代码的任何地方被调用。

未使用 `let` 或 `const` 关键字声明的变量会在 `global` 范围内自动创建。 当在代码其他地方无意间定义了一个变量，刚好变量名与全局变量相同，这时会产生意想不到的后果。 你应该总是用 `let` 或 `const` 声明你的变量。

重载：一个程序中有可能具有相同名称的局部变量 和全局变量。 在这种情况下，局部变量将会优先于全局变量。

```javascript
// myGlobal、oopsGlobal 变量均为全局变量
let myGlobal = 10;
function fun1() {
    oopsGlobal = 5;
}
```

#### 数据类型

JavaScript 中提供了两类数据类型：原始类型 和 引用类型。使用 `typeof` 运算符可以获取数据类型。

原始数据类型：

1.   number：数字（整数、小数、NaN），NaN 是一个特殊的 number 类型的值（Not a number）。

```js
var age = 20;
var price = 99.8;

alert(typeof age); // 结果是 ： number
alert(typeof price);// 结果是 ： number
```

2.   string：字符、字符串，单双引皆可。在 js 中 双引号和单引号都表示字符串类型的数据。

```js
var ch = 'a';
var name = '张三'; 
var addr = "北京";
alert(typeof ch); //结果是  string
alert(typeof name); //结果是  string
alert(typeof addr); //结果是  string
```

3.   boolean：布尔。true，false。


  ```js
var flag = true;
var flag2 = false;

alert(typeof flag); //结果是 boolean
alert(typeof flag2); //结果是 boolean
  ```

4.   null：对象为空。


  ```js
var obj = null;

alert(typeof obj);//结果是 object
  ```

5.   undefined：当声明的变量未初始化时，该变量的默认值是 undefined。

  ```js
var a ;
alert(typeof a); //结果是 undefined
  ```

#### 运算符

JavaScript 提供了如下的运算符。大部分和 Java语言 都是一样的，不同的是 JS 关系运算符中的 `==` 和 `===`。

* 一元运算符：`++`，`--`


  * 算术运算符：`+`，`-`，`*`，`/`，`%`


  * 赋值运算符：`=`，`+=`，`-=`…


  * 关系运算符：`>`，`<`，`>=`，`<=`，`!=`，`==`，`===`…


  * 逻辑运算符：&&，||，!


  * 三元运算符：条件表达式 `? true_value : false_value` 

`==` 和 `===` 区别：

* `==`：判断类型是否一样，如果不一样，则进行类型转换，再去比较其值。
  
* `===`：js 中的全等于，判断类型是否一样，如果不一样，直接返回 false，再去比较其值。


```js
var age1 = 20;
var age2 = "20";

alert(age1 == age2);// true
alert(age1 === age2);// false
```

#### 类型转换

string 转换为 number 类型：按照字符串的字面值，转为数字。如果字面值不是数字，则转为 NaN。

1.   使用 `+` 正号运算符：

```js
var str = +"20";
alert(str + 1) //21
```

2.   使用 `parseInt()` 函数(方法)：

```js
var str = "20";
alert(parseInt(str) + 1); //建议使用 `parseInt()` 函数进行转换
```

boolean 转换为 number 类型：true 转为1，false 转为0。

```js
var flag = +false;
alert(flag); // 0
```

number 类型转换为 boolean 类型：0 和 NaN 转为false，其他的数字转为true。

string 类型转换为 boolean 类型：空字符串转为false，其他的字符串转为true。

null类型转换为 boolean 类型是 false。

undefined 转换为 boolean 类型是 false。

```js
// var flag = 3;
// var flag = "";
var flag = undefined;

if(flag){
    alert("转为true");
}else {
    alert("转为false");
}
```

在 Java 中使用字符串前，一般都会先判断字符串不是null，并且不是空字符才会做其他的一些操作，JavaScript也有类型的操作。

```js
var str = "abc";
//健壮性判断
if(str != null && str.length > 0){
    alert("转为true");
}else {
    alert("转为false");
}
```

但是由于 JavaScript 会自动进行类型转换，所以上述的判断可以进行简化。


```js
var str = "abc";
//健壮性判断
if(str){
    alert("转为true");
}else {
    alert("转为false");
}
```

#### 流程控制语句

if 语句

```js
var count = 3;
if (count == 3) {
    alert(count);
}
```

switch 语句

```js
var num = 3;
switch (num) {
    case 1:
        alert("星期一");
        break;
    case 2:
        alert("星期二");
        break;
    case 3:
        alert("星期三");
        break;
    case 4:
        alert("星期四");
        break;
    case 5:
        alert("星期五");
        break;
    case 6:
        alert("星期六");
        break;
    case 7:
        alert("星期日");
        break;
    default:
        alert("输入的星期有误");
        break;
}
```

for 循环语句

```js
var sum = 0;
for (let i = 1; i <= 100; i++) { //建议for循环小括号中定义的变量使用let
    sum += i;
}
alert(sum);
```

while 循环语句

```js
var sum = 0;
var i = 1;
while (i <= 100) {
    sum += i;
    i++;
}
alert(sum);
```

dowhile 循环语句

```js
var sum = 0;
var i = 1;
do {
    sum += i;
    i++;
}
while (i <= 100);
alert(sum);
```

#### 函数

函数（就是Java中的方法）是被设计为执行特定任务的代码块；JavaScript 函数通过 function 关键词进行定义。

定义格式


  ```js
function 函数名(参数1,参数2..){
    要执行的代码
}

var 函数名 = function (参数列表){
    要执行的代码
}
  ```

形式参数不需要类型，因为JavaScript是弱类型语言。

```js
function add(a, b){
    return a + b;
}
```

上述函数的参数 a 和 b 不需要定义数据类型，因为在每个参数前加上 var 也没有任何意义。返回值也不需要定义类型，可以在函数内部直接使用 return 返回即可。

函数调用：`函数名称(实际参数列表);`

```js
let result = add(10,20);
```

JS 中，函数调用可以传递任意个数参数，例如  `let result = add(1,2,3);` ，它是将数据 1 传递给了变量 a，将数据 2 传递给了变量 b，而数据 3 没有变量接收。

### 三、JavaScript 常用对象

JavaScript 提供了很多对象供使用者来使用。这些对象总共分类三类：

1.  基本对象
2.  BOM 对象
3.  DOM对象

#### Array 对象

JavaScript Array对象用于定义数组。

```js
var 变量名 = new Array(元素列表); 
var arr = new Array(1,2,3); //1,2,3 是存储在数组中的数据（元素）

var 变量名 = [元素列表];
var arr = [1,2,3]; //1,2,3 是存储在数组中的数据（元素）
```

Java 中的数组静态初始化使用的是 `{}` 定义，而 JavaScript 中使用的是 `[]` 定义。

元素访问：`arr[索引] = 值;`

```js
 // 方式一
var arr = new Array(1,2,3);
// alert(arr);

// 方式二
var arr2 = [1,2,3];
//alert(arr2);

//方式三
var arr3 = [["Str1", 1], ["Str2", 2], ["Str3", 3]];

// 访问
arr2[0] = 10;
arr3[2][1] = "3";
alert(arr2)
```

JavaScript 中的数组相当于 Java 中集合。数组的长度是可以变化的，而 JavaScript 是弱类型，所以可以存储任意的类型的数据。

```js
// 变长
var arr3 = [1,2,3];
arr3[10] = 10;
alert(arr3[10]); // 10
alert(arr3[9]);  //undefined
```

在 JavaScript 中没有赋值的话，默认就是 `undefined`。如果给 `arr3` 数组添加字符串的数据，也是可以添加成功的。

```js
arr3[5] = "hello";
alert(arr3[5]); // hello
```

属性：Array 对象提供了很多属性。例如`length` 属性：该数组可以动态的获取数组的长度。而有这个属性，我们就可以遍历数组了。

```js
var arr = [1,2,3];
for (let i = 0; i < arr.length; i++) {
    alert(arr[i]);
}
```

方法：Array 对象同样也提供了很多方法。

push 函数：给数组添加元素，也就是在数组的末尾添加元素，参数表示要添加的元素。

```js
// push:添加方法
var arr5 = [1,2,3];
arr5.push(10);
alert(arr5);  //数组的元素是 {1,2,3,10}
```

splice 函数：删除元素。

1.  参数1：索引。表示从哪个索引位置删除。
2.  参数2：个数。表示删除几个元素。

```js
// splice:删除元素
var arr5 = [1,2,3];
arr5.splice(0,1); //从 0 索引位置开始删除，删除一个元素 
alert(arr5); // {2,3}
```

`pop()` 函数：用来移出数组中最后一个元素。 `.shift()` 函数用来移出数组中第一个元素：

```javascript
const ourArray = ["Stimpson", "J", ["cat"]];
const removedFromOurArray = ourArray.shift();   //ourArray.pop()
```

`.unshift()` 函数：类似 `.push()` 函数，但不是在数组的末尾添加元素，`unshift()` 在数组的头部添加元素：

```javascript
const ourArray = ["Stimpson", "J", "cat"];
ourArray.shift();   // ["J", "cat"]
ourArray.unshift("Happy");   // ["Happy", "J", "cat"]
```

#### String 对象

String对象的创建方式有两种：

```js
var 变量名 = new String(s); 

var 变量名 = "数组"; 
```

属性：String 对象提供了很多属性，属性 `length` ，是用于动态的获取字符串的长度。

函数：String 对象提供了很多函数（方法）。

函数 `trim()` ，该方法是用来去掉字符串两端的空格。

```js
var str4 = '  abc   ';
alert(1 + str4 + 1);
alert(1 + str4.trim() + 1);
```

`trim()` 函数在开发中还是比较常用的，例如在登陆界面 ，用户在输入用户名和密码时，可能会习惯的输入一些空格，这样在我们后端程序中判断用户名和密码是否正确，结果肯定是失败。所以我们一般都会对用户输入的字符串数据进行去除前后空格的操作。

#### 自定义对象

在 JavaScript 中自定义对象特别简单：

```js
var 对象名称 = {
    属性名称1:属性值1,
    属性名称2:属性值2,
    ...,
    函数名称:function (形参列表){},
	...
};
```

调用属性的格式：`对象名.属性名`；调用函数的格式：`对象名.函数名()`：

```js
var person = {
        name : "zhangsan",
        age : 23,
        eat: function functionName(){
            alert("干饭~");
        }
    };

alert(person.name);  //zhangsan
person.eat();  //干饭~

delete person.name;  //删除对象元素
person.familyName = "zhang" //添加对象元素
```

有时检查一个对象属性是否存在是非常有用的。 我们可以用对象的 `.hasOwnProperty(propname)` 方法来检查对象是否有指定的属性：

```javascript
function checkObj(obj, checkProp) {
  if (obj.hasOwnProperty(checkProp)) {
    return obj[checkProp];
  } else {
    return "Not Found";
  }
}
```

#### 其他方法对象

在 JavaScript 中，可以用 `Math.random()` 生成一个在`0`（包括 0）到 `1`（不包括 1）之间的随机小数。用 `Math.floor()` 向下取整，获得它最近的整数：

```javascript
// 生成并返回 0 和 9 之间的随机整数
return Math.floor(Math.random() * 10);
```

`parseInt()` 函数解析一个字符串返回一个整数，它还可以传入第二个参数，指定了字符串中数字的基数。：

```javascript
const a = parseInt("007");  //7
const a = parseInt("11", 2);  //指示 11 在二进制系统中，输出：3
```

### 四、BOM

BOM：Browser Object Model 浏览器对象模型。也就是 JavaScript 将浏览器的各个组成部分封装为对象。

我们要操作浏览器的各个组成部分就可以通过操作 BOM 中的对象来实现。比如：我现在想将浏览器地址栏的地址改为 `https://www.itheima.com` 就可以通过使用 BOM 中定义的 `Location` 对象的 `href` 属性，代码： `location.href = "https://itheima.com";` 。

BOM 中包含了如下对象

1.  Window：浏览器窗口对象

2.  Navigator：浏览器对象

3.  Screen：屏幕对象

4.  History：历史记录对象

5.  Location：地址栏对象

#### Window 对象

window 对象是 JavaScript 对浏览器的窗口进行封装的对象。

该对象不需要创建直接使用 `window`，其中 `window. ` 可以省略。比如我们之前使用的 `alert()` 函数，其实就是 `window` 对象的函数，在调用是可以写成如下两种：

```js
//显式使用 window 对象调用
window.alert("abc"); 
//隐式调用
alert("abc")
```

`window` 对象提供了用于获取其他 BOM 组成对象的属性。也就是说，我们想使用 `Location` 对象的话，就可以使用 `window` 对象获取；写成 `window.location`，而 `window.` 可以省略，简化写成 `location` 来获取 `Location` 对象。

window 对象函数：`window` 对象提供了很多函数供我们使用，而很多都不常用。
- `setTimeout(function,毫秒值)` : 在一定的时间间隔后执行一个function，只执行一次。
- `setInterval(function,毫秒值)` :在一定的时间间隔后执行一个function，循环执行。

```js
// confirm()，点击确定按钮，返回true，点击取消按钮，返回false
var flag = confirm("确认删除？");

alert(flag);
```

```js
// 定时器，打开浏览器，3秒后才会弹框输出 hehe，并且只会弹出一次
setTimeout(function (){
    alert("hehe");
},3000);
```

```js
// 定时器，打开浏览器，每隔2秒都会弹框输出 hehe
setInterval(function (){
    alert("hehe");
},2000);
```

#### History 对象

History 对象是 JavaScript 对历史记录进行封装的对象。

History 对象的获取：使用 `window.history` 获取，其中 `window.` 可以省略。

History 对象的函数：当我们点击向左的箭头，就跳转到前一个访问的页面，这就是 `back()` 函数的作用；当我们点击向右的箭头，就跳转到下一个访问的页面，这就是 `forward()` 函数的作用。

#### Location对象

Location 对象是 JavaScript 对地址栏封装的对象。可以通过操作该对象，跳转到任意页面。

获取 Location 对象：使用 `window.location` 获取，其中 `window.` 可以省略。

```js
window.location.方法();
location.方法();
```

Location 对象属性：Location 对象提供了很对属性。常用的只有一个属性 `href`。

```js
document.write("3秒跳转到首页..."); 
setTimeout(function (){
    location.href = "https://www.baidu.com"
},3000);
```

### 五、DOM

DOM：Document Object Model 文档对象模型。也就是 JavaScript 将 HTML 文档的各个组成部分封装为对象。JavaScript 通过 DOM， 就能够对 HTML进行操作了，例如改变 HTML 元素的内容，改变 HTML 元素的样式（CSS），对 HTML DOM 事件作出反应，添加和删除 HTML 元素。

DOM 是 W3C（万维网联盟）定义了访问 HTML 和 XML 文档的标准。该标准被分为 3 个不同的部分：

1. 核心 DOM：针对任何结构化文档的标准模型。 XML 和 HTML 通用的标准。

   * Document：整个文档对象。
   * Element：元素对象。
   * Attribute：属性对象。
   * Text：文本对象。
   * Comment：注释对象。
2. XML DOM： 针对 XML 文档的标准模型。
3. HTML DOM： 针对 HTML 文档的标准模型。该标准是在核心 DOM 基础上，对 HTML 中的每个标签都封装成了不同的对象。
   - 例如：`<img>` 标签在浏览器加载到内存中时会被封装成 `Image` 对象，同时该对象也是 `Element` 对象。
   - 例如：`<input type='button'>` 标签在浏览器加载到内存中时会被封装成 `Button` 对象，同时该对象也是 `Element` 对象。

#### 获取 Element 对象

HTML 中的 Element 对象可以通过 `Document` 对象获取，而 `Document` 对象是通过 `window` 对象获取。

`Document` 对象中提供了以下获取 `Element` 元素对象的函数：

* `getElementById()`：根据 id 属性值获取，返回单个 Element 对象。

* `getElementsByTagName()`：根据标签名称获取，返回 Element 对象数组。

* `getElementsByName()`：根据 name 属性值获取，返回 Element 对象数组。

* `getElementsByClassName()`：根据 class 属性值获取，返回 Element 对象数组。

#### HTML Element 对象使用

HTML 中的 `Element` 元素对象有很多，不可能全部记住，以后是根据具体的需求查阅文档使用。

```js
//getElementById：根据 id 属性值获取上面的 img 元素对象，返回单个对象
var img = document.getElementById("light");
alert(img); 
//getElementsByTagName：根据标签名称获取所有的 `div` 元素对象
var divs = document.getElementsByTagName("div");// 返回一个数组，数组中存储的是 div 元素对象
// alert(divs.length);  //输出 数组的长度
//遍历数组
for (let i = 0; i < divs.length; i++) {
    alert(divs[i]);
} 
//getElementsByName：根据name属性值获取，返回Element对象数组
var hobbys = document.getElementsByName("hobby");
for (let i = 0; i < hobbys.length; i++) {
    alert(hobbys[i]);
}
//getElementsByClassName：根据class属性值获取，返回Element对象数组
var clss = document.getElementsByClassName("cls");
for (let i = 0; i < clss.length; i++) {
    alert(clss[i]);
}
```

### 六、事件监听

HTML 事件是发生在 HTML 元素上的“事情”。比如：页面上的 `按钮被点击`、`鼠标移动到元素之上`、`按下键盘按键` 等都是事件.事件监听是JavaScript 可以在事件被侦测到时执行一段逻辑代码.

#### 事件绑定

JavaScript 提供了两种事件绑定方式：

1.   通过 HTML标签中的事件属性进行绑定，如下面代码，有一个按钮元素，我们是在该标签上定义 `事件属性`，在事件属性中绑定函数。`onclick` 就是 `单击事件` 的事件属性。`onclick='on（）'` 表示该点击事件绑定了一个名为 `on()` 的函数。

```html
<input type="button" onclick='on()’>
<script></
```

-   下面是点击事件绑定的 `on()` 函数。

```js
function on(){
	alert("我被点了");
}
```

2.   通过 DOM 元素属性绑定，如下面代码是按钮标签，在该标签上我们并没有使用 `事件属性`，绑定事件的操作需要在 js 代码中实现。

```html
<input type="button" id="btn">
```

- 下面 js 代码是获取了 `id='btn'` 的元素对象，然后将 `onclick` 作为该对象的属性，并且绑定匿名函数。该函数是在事件触发后自动执行。

```js
document.getElementById("btn").onclick = function (){
    alert("我被点了");
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <!--方式1：在下面input标签上添加 onclick 属性，并绑定 on() 函数-->
    <input type="button" value="点我" onclick="on()"> <br>
    <input type="button" value="再点我" id="btn">

    <script>
        function on(){
            alert("我被点了");
        }
      	//方式2：获取 id="btn" 元素对象，通过调用 onclick 属性 绑定点击事件
        document.getElementById("btn").onclick = function (){
            alert("我被点了");
        }
    </script>
</body>
</html>
```

#### 常见事件

| 事件属性名  | 说明                     |
| ----------- | ------------------------ |
| onclick     | 鼠标单击事件             |
| onblur      | 元素失去焦点             |
| onfocus     | 元素获得焦点             |
| onload      | 某个页面或图像被完成加载 |
| onsubmit    | 当表单提交时触发该事件   |
| onmouseover | 鼠标被移到某元素之上     |
| onmouseout  | 鼠标从某元素移开         |

如下是带有表单的页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <form id="register" action="#" >
        <input type="text" name="username" />
        <input type="submit" value="提交">
    </form>
    <script>
        
    </script>
</body>
</html>
```

如上代码的表单，当我们点击 `提交` 按钮后，表单就会提交，此处默认使用的是 `GET` 提交方式，会将提交的数据拼接到 URL 后。现需要通过 js 代码实现阻止表单提交的功能，js 代码实现如下：

1. 获取 `form` 表单元素对象。
2. 给 `form` 表单元素对象绑定 `onsubmit` 事件，并绑定匿名函数。
3. 该匿名函数如果返回的是true，提交表单；如果返回的是false，阻止表单提交。

```js
document.getElementById("register").onsubmit = function (){
    //onsubmit 返回true，则表单会被提交，返回false，则表单不提交
    return true;
}
```

### 七、表单验证案例

#### 需求

有如下注册页面，对表单进行校验，如果输入的用户名、密码、手机号符合规则，则允许提交；如果不符合规则，则不允许提交。

完成以下需求：

1. 当输入框失去焦点时，验证输入内容是否符合要求。

1. 当点击注册按钮时，判断所有输入框的内容是否都符合要求，如果不合符则阻止表单提交。

#### 环境准备

- 下面是初始页面：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>欢迎注册</title>
    <link href="../css/register.css" rel="stylesheet">
</head>
<body>
    <div class="form-div">
        <div class="reg-content">
            <h1>欢迎注册</h1>
            <span>已有帐号？</span> <a href="#">登录</a>
        </div>
        <form id="reg-form" action="#" method="get">
            <table>
                <tr>
                    <td>用户名</td>
                    <td class="inputs">
                        <input name="username" type="text" id="username">
                        <br>
                        <span id="username_err" class="err_msg" style="display: none">用户名不太受欢迎</span>
                    </td>
                </tr>

                <tr>
                    <td>密码</td>
                    <td class="inputs">
                        <input name="password" type="password" id="password">
                        <br>
                        <span id="password_err" class="err_msg" style="display: none">密码格式有误</span>
                    </td>
                </tr>

                <tr>
                    <td>手机号</td>
                    <td class="inputs"><input name="tel" type="text" id="tel">
                        <br>
                        <span id="tel_err" class="err_msg" style="display: none">手机号格式有误</span>
                    </td>
                </tr>
            </table>
            <div class="buttons">
                <input value="注 册" type="submit" id="reg_btn">
            </div>
            <br class="clear">
        </form>

    </div>


    <script>

    </script>
</body>
</html>
```

#### 验证输入框

校验用户名。当用户名输入框失去焦点时，判断输入的内容是否符合 `长度是 6-12 位` 规则，不符合使 `id='username_err'` 的span标签显示出来，给出用户提示。

校验密码。当密码输入框失去焦点时，判断输入的内容是否符合 `长度是 6-12 位` 规则，不符合使 `id='password_err'` 的span标签显示出来，给出用户提示。

校验手机号。当手机号输入框失去焦点时，判断输入的内容是否符合 `长度是 11 位` 规则，不符合使 `id='tel_err'` 的span标签显示出来，给出用户提示。

```js
//1. 验证用户名是否符合规则
//1.1 获取用户名的输入框
var usernameInput = document.getElementById("username");

//1.2 绑定onblur事件 失去焦点
usernameInput.onblur = function () {
    //1.3 获取用户输入的用户名
    var username = usernameInput.value.trim();

    //1.4 判断用户名是否符合规则：长度 6~12
    if (username.length >= 6 && username.length <= 12) {
        //符合规则
        document.getElementById("username_err").style.display = 'none';
    } else {
        //不合符规则
        document.getElementById("username_err").style.display = '';
    }
}

//1. 验证密码是否符合规则
//1.1 获取密码的输入框
var passwordInput = document.getElementById("password");

//1.2 绑定onblur事件 失去焦点
passwordInput.onblur = function() {
    //1.3 获取用户输入的密码
    var password = passwordInput.value.trim();

    //1.4 判断密码是否符合规则：长度 6~12
    if (password.length >= 6 && password.length <= 12) {
        //符合规则
        document.getElementById("password_err").style.display = 'none';
    } else {
        //不合符规则
        document.getElementById("password_err").style.display = '';
    }
}

//1. 验证手机号是否符合规则
//1.1 获取手机号的输入框
var telInput = document.getElementById("tel");

//1.2 绑定onblur事件 失去焦点
telInput.onblur = function() {
    //1.3 获取用户输入的手机号
    var tel = telInput.value.trim();

    //1.4 判断手机号是否符合规则：长度 11
    if (tel.length == 11) {
        //符合规则
        document.getElementById("tel_err").style.display = 'none';
    } else {
        //不合符规则
        document.getElementById("tel_err").style.display = '';
    }
}
```

#### 验证表单

当用户点击 `注册` 按钮时，需要同时对输入的 `用户名`、`密码`、`手机号` ，如果都符合规则，则提交表单；如果有一个不符合规则，则不允许提交表单。实现该功能需要获取表单元素对象，并绑定 `onsubmit` 事件。

```js
//1. 获取表单对象
var regForm = document.getElementById("reg-form");

//2. 绑定onsubmit 事件
regForm.onsubmit = function () {
    
}
```

`onsubmit` 事件绑定的函数需要对输入的 `用户名`、`密码`、`手机号` 进行校验，这些校验我们之前都已经实现过了，这里我们还需要再校验一次吗？不需要，只需要对之前校验的代码进行改造，把每个校验的代码专门抽象到有名字的函数中，方便调用；并且每个函数都要返回结果来去决定是提交表单还是阻止表单提交。

```js
//1. 验证用户名是否符合规则
//1.1 获取用户名的输入框
var usernameInput = document.getElementById("username");

//1.2 绑定onblur事件 失去焦点
usernameInput.onblur = checkUsername;

function checkUsername() {
    //1.3 获取用户输入的用户名
    var username = usernameInput.value.trim();

    //1.4 判断用户名是否符合规则：长度 6~12
    var flag = username.length >= 6 && username.length <= 12;
    if (flag) {
        //符合规则
        document.getElementById("username_err").style.display = 'none';
    } else {
        //不合符规则
        document.getElementById("username_err").style.display = '';
    }
    return flag;
}

//1. 验证密码是否符合规则
//1.1 获取密码的输入框
var passwordInput = document.getElementById("password");

//1.2 绑定onblur事件 失去焦点
passwordInput.onblur = checkPassword;

function checkPassword() {
    //1.3 获取用户输入的密码
    var password = passwordInput.value.trim();

    //1.4 判断密码是否符合规则：长度 6~12
    var flag = password.length >= 6 && password.length <= 12;
    if (flag) {
        //符合规则
        document.getElementById("password_err").style.display = 'none';
    } else {
        //不合符规则
        document.getElementById("password_err").style.display = '';
    }
    return flag;
}

//1. 验证手机号是否符合规则
//1.1 获取手机号的输入框
var telInput = document.getElementById("tel");

//1.2 绑定onblur事件 失去焦点
telInput.onblur = checkTel;

function checkTel() {
    //1.3 获取用户输入的手机号
    var tel = telInput.value.trim();

    //1.4 判断手机号是否符合规则：长度 11
    var flag = tel.length == 11;
    if (flag) {
        //符合规则
        document.getElementById("tel_err").style.display = 'none';
    } else {
        //不合符规则
        document.getElementById("tel_err").style.display = '';
    }
    return flag;
}
```

而 `onsubmit` 绑定的函数需要调用 `checkUsername()` 函数、`checkPassword()` 函数、`checkTel()` 函数。

```js
//1. 获取表单对象
var regForm = document.getElementById("reg-form");

//2. 绑定onsubmit 事件
regForm.onsubmit = function () {
    //挨个判断每一个表单项是否都符合要求，如果有一个不合符，则返回false

    var flag = checkUsername() && checkPassword() && checkTel();

    return flag;
}
```

### 八、RegExp对象

RegExp 是正则对象。正则对象是判断指定字符串是否符合规则。在 js 中对正则表达式封装的对象就是正则对象。

#### 正则对象使用

1.   直接量方式：注意不要加引号

```js
var reg = /正则表达式/;
```

2.   创建 RegExp 对象

```js
var reg = new RegExp("正则表达式");
```

函数：`test(str)` ：判断指定字符串是否符合规则，返回 true 或 false。

#### 正则表达式

正则表达式定义了字符串组成的规则。也就是判断指定的字符串是否符合指定的规则，如果符合返回 true，如果不符合返回 false。

正则表达式是和语言无关的。很多语言都支持正则表达式，Java 语言也支持，只不过正则表达式在不同的语言中的使用方式不同，js 中需要使用正则对象来使用正则表达式。

正则表达式常用的规则如下：

* `^`：表示开始

* `$`：表示结束

* `[ ]`：代表某个范围内的单个字符，比如： [`0-9`] 单个数字字符

* `.`：代表任意单个字符，除了换行和行结束符

* `\w`：代表单词字符：字母、数字、下划线(`_`)，相当于 [`A-Za-z0-9_`]

* `\d`：代表数字字符： 相当于 [`0-9`]

量词：

* `+`：至少一个

* `*`：零个或多个

* `？`：零个或一个

* `{x}`：x个

* `{m,}`：至少m个

* `{m,n}`：至少m个，最多n个

```js
// 规则：单词字符，6~12
//1,创建正则对象，对正则表达式进行封装
var reg = /^\w{6,12}$/;

var str = "abcccc";
//2,判断 str 字符串是否符合 reg 封装的正则表达式的规则
var flag = reg.test(str);
alert(flag);
```

#### 改进表单校验案例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>欢迎注册</title>
    <link href="../css/register.css" rel="stylesheet">
</head>
<body>

<div class="form-div">
    <div class="reg-content">
        <h1>欢迎注册</h1>
        <span>已有帐号？</span> <a href="#">登录</a>
    </div>
    <form id="reg-form" action="#" method="get">

        <table>

            <tr>
                <td>用户名</td>
                <td class="inputs">
                    <input name="username" type="text" id="username">
                    <br>
                    <span id="username_err" class="err_msg" style="display: none">用户名不太受欢迎</span>
                </td>

            </tr>

            <tr>
                <td>密码</td>
                <td class="inputs">
                    <input name="password" type="password" id="password">
                    <br>
                    <span id="password_err" class="err_msg" style="display: none">密码格式有误</span>
                </td>
            </tr>


            <tr>
                <td>手机号</td>
                <td class="inputs"><input name="tel" type="text" id="tel">
                    <br>
                    <span id="tel_err" class="err_msg" style="display: none">手机号格式有误</span>
                </td>
            </tr>

        </table>

        <div class="buttons">
            <input value="注 册" type="submit" id="reg_btn">
        </div>
        <br class="clear">
    </form>

</div>


<script>

    //1. 验证用户名是否符合规则
    //1.1 获取用户名的输入框
    var usernameInput = document.getElementById("username");

    //1.2 绑定onblur事件 失去焦点
    usernameInput.onblur = checkUsername;

    function checkUsername() {
        //1.3 获取用户输入的用户名
        var username = usernameInput.value.trim();

        //1.4 判断用户名是否符合规则：长度 6~12,单词字符组成
        var reg = /^\w{6,12}$/;
        var flag = reg.test(username);

        //var flag = username.length >= 6 && username.length <= 12;
        if (flag) {
            //符合规则
            document.getElementById("username_err").style.display = 'none';
        } else {
            //不合符规则
            document.getElementById("username_err").style.display = '';
        }
        return flag;
    }

    //1. 验证密码是否符合规则
    //1.1 获取密码的输入框
    var passwordInput = document.getElementById("password");

    //1.2 绑定onblur事件 失去焦点
    passwordInput.onblur = checkPassword;

    function checkPassword() {
        //1.3 获取用户输入的密码
        var password = passwordInput.value.trim();

        //1.4 判断密码是否符合规则：长度 6~12
        var reg = /^\w{6,12}$/;
        var flag = reg.test(password);

        //var flag = password.length >= 6 && password.length <= 12;
        if (flag) {
            //符合规则
            document.getElementById("password_err").style.display = 'none';
        } else {
            //不合符规则
            document.getElementById("password_err").style.display = '';
        }
        return flag;
    }

    //1. 验证手机号是否符合规则
    //1.1 获取手机号的输入框
    var telInput = document.getElementById("tel");

    //1.2 绑定onblur事件 失去焦点
    telInput.onblur = checkTel;

    function checkTel() {
        //1.3 获取用户输入的手机号
        var tel = telInput.value.trim();

        //1.4 判断手机号是否符合规则：长度 11，数字组成，第一位是1
        //var flag = tel.length == 11;
        var reg = /^[1]\d{10}$/;
        var flag = reg.test(tel);
        if (flag) {
            //符合规则
            document.getElementById("tel_err").style.display = 'none';
        } else {
            //不合符规则
            document.getElementById("tel_err").style.display = '';
        
        return flag;
    }

    //1. 获取表单对象
    var regForm = document.getElementById("reg-form");

    //2. 绑定onsubmit 事件
    regForm.onsubmit = function () {
        //挨个判断每一个表单项是否都符合要求，如果有一个不合符，则返回false

        var flag = checkUsername() && checkPassword() && checkTel();

        return flag;
    }
</script>
</body>
</html>
```
