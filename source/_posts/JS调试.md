---
title: JavaScript 调试
date: 2022-06-27
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
categories: 前端开发
tags: [JavaScript, 调试]
---

> freeCodeCamp JavaScript 算法和数据结构第四章。调试是检查代码、发现并修复问题的过程。代码中的问题通常有三种形式：1）语法错误导致程序停止运行， 2）代码无法执行或具有意外行为导致运行时错误，3）代码有语义（逻辑）错误，没有实现原来的意图。在 JavaScript 调试的课程中，学习如何使用 JavaScript 控制台来调试程序，防止出现常见问题。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、检查变量

Chrome 和 Safari 都有出色的 JavaScript 控制台（也称为 DevTools），可以用来调试 JavaScript 代码。

`console.log()` 方法可能是最有用的调试工具，它可以将括号中的内容输出到控制台。 将它放在代码中的关键点可以显示变量在当时的值：

```javascript
let a = 5;
let b = 1;
a++;
console.log(a);
let sumAB = a + b;
console.log(sumAB);
```

有许多方法可以与 `console` 一起使用来输出消息，`log`、`warn` 和 `clear` 就是几个例子。 使用 `console.log` 记录变量，使用 `console.clear()` 来清除浏览器控制台：

```javascript
let output = "Get this to show once in the freeCodeCamp console and not at all in the browser console";
console.log(output);
console.clear();
```

可以使用 `typeof` 检查变量的数据结构或类型。 在处理多种数据类型时，这会对调试很有帮助。

 类型错误可能隐藏在计算或函数调用中。 如果想计算两数之和，但实际传入了一个字符串参数，则结果可能是错误的。当你以 JavaScript 对象（JSON）的形式访问和使用外部数据时尤其要小心。

```javascript
console.log(typeof "");  //string
console.log(typeof 0);  //number
console.log(typeof []);  //object
console.log(typeof {});  //object
```

JavaScript 有七种原始（不可变）数据类型： `Boolean`，`Null`，`Undefined`，`Number`，`String`，`Symbol` （new with ES6），`BigInt` （new with ES2020）和一种可变数据类型：`Object`。 注意：在 JavaScript 中，数组在本质上是一种对象。

### 二、捕获错误

JavaScript 变量和函数名称区分大小写。变量或函数名的错写、漏写或大小写弄混都会让浏览器尝试查找并不存在的东西，并报出“引用错误”。

要注意的另一个语法错误是所有的小括号、方括号、花括号和引号都必须配对。 当你编辑代码并插入新代码其中带有括号时，很容易忘记括号闭合。 此外，在将代码块嵌套到其他代码块时要小心，例如将回调函数作为参数添加到方法中。避免这种错误的一种方法是，一次性输入完这些符号，然后将光标移回它们之间继续编写。 好在现在大部分编辑器都会帮你自动补全。

JavaScript 允许使用单引号（`'`）和双引号（`"`）声明字符串。 但如果字符串中有缩写或存在一段带引号的文本，可以使用反斜杠（`\`）来转义字符串内的引号：

```js
const allSameQuotes = 'I\'ve had a perfectly wonderful evening, but this wasn\'t it.';
```

JavaScript 中的赋值运算符 (`=`) 是用来为变量名赋值的。 并且 `==` 和 `===` 运算符检查相等性（三等号 `===` 是用来测试是否严格相等的，严格相等的意思是值和类型都必须相同）。

JavaScript 会把大部分的值都视为 `true`，除了所谓的 falsy 值，即：`false`、`0`、`""`（空字符串）、`NaN`、`undefined` 和 `null`：

```js
let x = 1;
let y = 2;
if (x = y) {
} else {
}  //在这个示例中，除非 y 值是假值，否则当 y 为任何值时，if 语句中的代码块都会运行。 
```

当函数或方法不接受任何参数时，你可能忘记在调用它时加上空的左括号和右括号。 通常，函数调用的结果会保存在变量中，供其他代码使用。 可以通过将变量值（或其类型）打印到控制台，查看输出究竟是一个函数引用还是函数调用的返回值来检测这类错误。

```js
function myFunction() {
  return "You rock!";
}
let varOne = myFunction;  //myFunction
let varTwo = myFunction();  //You rock!
```

需要注意的下一个 bug 是函数的参数传递顺序错误。 如果参数分别是不同的类型，例如接受数组和整数两个参数的函数，参数顺序传错就可能会引发运行时错误。 对于接受相同类型参数的函数，传错参数也会导致逻辑错误或运行结果错误。 确保以正确的顺序提供所有必需的参数以避免这些问题。

当试图访问字符串或数组的特定索引（分割或访问一个片段）或循环索引时，有时会出现 Off by one errors 错误（有时称为 OBOE）。 

JavaScript 索引从 0 开始，而不是 1，这意味着最后一个索引总会比字符串或数组的长度少 1。 如果尝试访问等于长度的索引，程序可能会抛出“索引超出范围”引用错误或打印出 `undefined`。当使用将索引范围作为参数的字符串或数组方法时，阅读相关的文档并了解参数中的索引的包含性（即是否考虑进返回值中）很重要。 

```js
let alphabet = "abcdefghijklmnopqrstuvwxyz";
let len = alphabet.length;
for (let i = 0; i <= len; i++) {
  console.log(alphabet[i]);
}  //多了一次循环
for (let j = 1; j < len; j++) {
  console.log(alphabet[j]);
}  //少了一次循环（漏掉了索引 0 处的字符）
for (let k = 0; k < len; k++) {
  console.log(alphabet[k]);
}  //正确
```

### 三、循环错误

有时需要在循环中保存信息以增加计数器或重置变量。 一个潜在的问题是变量什么时候该重新初始化，什么时候不该重新初始化，反之亦然。 如果你不小心重置了用于终止条件的变量，导致无限循环，这将特别危险。

使用`console.log()`在每个循环中打印变量值可以发现与重置相关的错误或者重置变量失败。

```js
function zeroArray(m, n) {
  let newArray = [];
  for (let i = 0; i < m; i++) {
      let row = []; /* <-----  row has been declared inside the outer loop. 
         Now a new row will be initialised during each iteration of the outer loop allowing 
         for the desired matrix. */
      for (let j = 0; j < n; j++) {
        	row.push(0);
        }
        newArray.push(row);
    }
    return newArray;
}
let matrix = zeroArray(3, 2);
console.log(matrix);
```

当需要程序运行代码块一定次数或满足条件时，循环是很好的工具，但是它们需要终止条件来结束循环。 无限循环可能会使浏览器冻结或崩溃，并导致程序执行混乱，没有人想要这样的结果。

```js
function loopy() {
    while(true) {
      	console.log("Hello, world!");
    }
}  //没有终止条件来摆脱loopy()内的while循环。 不要调用这个函数！
```

程序员的工作是确保最终达到终止条件，该条件告诉程序何时跳出循环。 

有一种错误是从终端条件向错误方向递增或递减计数器变量。 另一种是在循环代码中意外重置计数器或索引变量，而不是递增或递减它。
