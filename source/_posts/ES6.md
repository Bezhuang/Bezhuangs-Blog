---
title: ECMAScript 6 标准
date: 2022-06-22
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
categories: 前端开发
tags: [JavaScript, ES6]
---

> freeCodeCamp JavaScript 算法和数据结构第二章。ECMAScript（ES）是 JavaScript 的标准。因为所有主流浏览器都遵循此规范，所以 ECMAScript 和 JavaScript 是可以互换的。JavaScript 在不断迭代，每年都会发布新功能。2015 年发布的 ES6（ECMAScript6）为该语言添加了许多强大的新功能，在 ES6 点课程中，学习这些新特性，包括箭头函数、解构、类、promise 和模块。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、var、let 和 const 关键字

使用 `var` 关键字声明变量时，它是全局声明的，如果在函数内部声明则是局部声明的。

```javascript
var numArray = [];
var i;
for (i = 0; i < 3; i++) {
  numArray.push(i);
}
console.log(numArray);  // [0, 1, 2]
console.log(i);  // 3
```

`let` 关键字的行为类似，但有一些额外的功能。 在代码块、语句或表达式中使用 `let` 关键字声明变量时，其作用域仅限于该代码块、语句或表达式。

```javascript
let printNumTwo;
for (let i = 0; i < 3; i++) {
  if (i === 2) {
    printNumTwo = function() {
      return i;
    };
  }
}
console.log(printNumTwo());  // 2
console.log(i);  // error: i is not defined
```

默认情况下，一些开发人员更喜欢使用 `const` 分配所有变量，除非他们知道需要重新分配值，他们才使用 `let`。

但是，重要的是要了解使用 `const` 分配给变量的对象（包括数组和函数）仍然是可变的。 使用 `const` 声明只能防止变量标识符的重新分配：

```javascript
const s = [5, 6, 7];
s = [1, 2, 3];  //error: 不能分配
s[2] = 45;  // [5, 6, 45]
console.log(s); // [5, 6, 45]
```

`const` 声明并不会真的保护数据不被改变。 为了确保数据不被改变，JavaScript 提供了一个函数 `Object.freeze`：

```javascript
let obj = {
  name:"FreeCodeCamp",
  review:"Awesome"
};
Object.freeze(obj);
obj.review = "bad";  //赋值错误
obj.newProp = "Test";  //赋值错误
console.log(obj); 
```

### 二、函数和操作符

在 JavaScript 里，我们会经常遇到不需要给函数命名的情况，尤其是在需要将一个函数作为参数传给另外一个函数的时候。 这时，我们会创建匿名函数：

```javascript
const myFunc = function() {
  const myVar = "value";
  return myVar;
}
```

ES6 提供了其他写匿名函数的方式的语法糖。 你可以使用**箭头函数**：

```javascript
const myFunc = () => {
  const myVar = "value";
  return myVar;
}
// 当不需要函数体，只返回一个值的时候，箭头函数允许你省略 return 关键字和外面的大括号
const myFunc = () => "value";
// 这段代码默认会返回字符串 value
```

和一般的函数一样，你也可以给箭头函数传递参数：

```javascript
const doubler = (item) => item * 2;
doubler(4);  //8
```

如果箭头函数只有一个参数，则可以省略参数外面的括号：

```javascript
const doubler = item => item * 2;
```

可以给箭头函数传递多个参数：

```javascript
const multiplier = (item, multi) => item * multi;
multiplier(4, 2);  //8
```

ES6 里允许给函数传入默认参数，来构建更加灵活的函数：

```javascript
const greeting = (name = "Anonymous") => "Hello " + name;
console.log(greeting("John"));  // Hello John
console.log(greeting()); // Hello Anonymous
```

ES6 推出了用于函数参数的 rest 操作符帮助我们创建更加灵活的函数。 rest 操作符可以用于创建有一个变量来接受多个参数的函数。 这些参数被储存在一个可以在函数内部读取的数组中：

```javascript
function howMany(...args) {
  return "You have passed " + args.length + " arguments.";
}
console.log(howMany(0, 1, 2)); //You have passed 3 arguments.
console.log(howMany("string", null, [1, 2, 3], { })); //You have passed 4 arguments.
// 使用 rest 参数，就不需要查看 args 数组，并且允许我们在参数数组上使用 map()、filter() 和 reduce()
```

ES6 引入了展开操作符，可以展开数组以及需要多个参数或元素的表达式：

```javascript
const arr = [6, 89, 3, 45];
const maximus = Math.max(...arr);  //89
```

`...arr` 返回一个解压的数组。 也就是说，它展开数组。 然而，展开操作符只能够在函数的参数中或者数组中使用。

用 ES6 的语法在对象中定义函数的时候，可以删除 `function` 关键词和冒号，用 ES6 编写简洁的函数声明：

```javascript
const person = {
  name: "Taylor",
  sayHello() {
    return `Hello! My name is ${this.name}.`;
  }
};
```

### 三、解构赋值

解构赋值是 ES6 引入的新语法，用来从数组和对象中提取值，并优雅地对变量进行赋值。

```javascript
// ES5 代码
const user = { name: 'John Doe', age: 34 };
const name = user.name;
const age = user.age;

// ES6 代码
const { name, age } = user;
//在这里，自动创建 name 和 age 变量，并将 user 对象相应属性的值赋值给它们。 这个方法简洁多了。
```

可以给解构的值赋予一个新的变量名， 通过在赋值的时候将新的变量名放在冒号后面来实现：

```javascript
const { name: userName, age: userAge } = user;
// 获取 user.name 的值，将它赋给一个新的变量 userName，等等。
```

将对象的属性值赋值给具有不同名字的变量：

```javascript
const user = {
  johnDoe: { 
    age: 34,
    email: 'johnDoe@freeCodeCamp.com'
  }
};
const { johnDoe: { age: userAge, email: userEmail }} = user;
```

在 ES6 里面，解构数组可以如同解构对象一样简单。与数组解构不同，数组的扩展运算会将数组里的所有内容分解成一个由逗号分隔的列表。 所以，你不能选择哪个元素来给变量赋值，而对数组进行解构却可以让我们做到这一点：

```javascript
const [a, b,,, c] = [1, 2, 3, 4, 5, 6];
console.log(a, b, c);  // a = 1, b = 2, c = 5
```

使用解构赋值交换两数的值：

```javascript
let a = 8, b = 6;
[a, b] = [b, a];
```

在解构数组的某些情况下，我们可能希望将剩下的元素放进另一个数组里面。以下代码的结果与使用 `Array.prototype.slice()` 类似：

```javascript
const [a, b, ...arr] = [1, 2, 3, 4, 5, 7];
console.log(a, b);  // 1, 2
console.log(arr);  // [3,4,5,7]
```

在某些情况下，你可以在函数的参数里直接解构对象：

```javascript
const profileUpdate = (profileData) => {
  const { name, age, nationality, location } = profileData;
}
// 上面的操作解构了传给函数的对象。 这样的操作也可以直接在参数里完成：
const profileUpdate = ({ name, age, nationality, location }) => {
} // 当 profileData 被传递到上面的函数时，从函数参数中解构出值以在函数内使用
```

### 三、模板字符串

模板字符串是 ES6 的另外一项新的功能。 这是一种可以轻松构建复杂字符串的方法，模板字符串可以使用多行字符串和字符串插值功能。

```javascript
onst person = {
  name: "Zodiac Hasbro",
  age: 56
};
const greeting = `Hello, my name is ${person.name}!
I am ${person.age} years old.`;

console.log(greeting);
```

这里发生了许多事情。 首先，使用反引号，而不是引号（`'` 或者 `"`）将字符串括起来。

其次，注意代码和输出中的字符串都是多行的。 不需要在字符串中插入 `\n`。

上面使用的 `${variable}` 语法是一个占位符。 这样一来，你将不再需要使用 `+` 运算符来连接字符串。 当需要在字符串里增加变量的时候，你只需要在变量的外面括上 `${` 和 `}`，并将其放在模板字符串里就可以了。 同样，你可以在字符串中包含其他表达式，例如 `${a + b}`。 这个新的方式使你可以更灵活地创建复杂的字符串。

### 四、构造函数

ES6 提供了一个新的创建对象的语法，使用关键字 class。值得注意的是，`class` 只是一个语法糖，它并不像 Java、Python 或者 Ruby 这一类的语言一样，严格履行了面向对象的开发规范。

在 ES5 里面，我们通常会定义一个构造函数 `constructor`，然后使用 `new` 关键字来实例化一个对象：

```js
var SpaceShuttle = function(targetPlanet){
  this.targetPlanet = targetPlanet;
}
var zeus = new SpaceShuttle('Jupiter');
```

`class` 语法只是简单地替换了构造函数 `constructor` 的写法：

```js
class SpaceShuttle {
  constructor(targetPlanet) {
    this.targetPlanet = targetPlanet;
  }
}
const zeus = new SpaceShuttle('Jupiter');
```

应该注意 `class` 关键字声明了一个新的函数，里面添加了一个构造函数。 当用 `new` 创建一个新的对象时，构造函数会被调用。

你可以从对象中获得一个值，也可以给对象的属性赋值。这些操作通常被称为 getters 以及 setters。

Getter 函数的作用是可以让对象返回一个私有变量，而不需要直接去访问私有变量。Setter 函数的作用是可以基于传进的参数来修改对象中私有变量。 这些修改可以是计算，或者是直接替换之前的值：

```javascript
class Book {
  constructor(author) {
    this._author = author;
  }
  // getter
  get writer() {
    return this._author;
  }
  // setter
  set writer(updatedAuthor) {
    this._author = updatedAuthor;
  }
}
const novel = new Book('anonymous');
console.log(novel.writer);
novel.writer = 'newAuthor';
console.log(novel.writer);
// 通常会在私有变量前添加下划线（_）。 然而，这种做法本身并不是将变量变成私有的。
```

### 五、模块脚本

起初，JavaScript 几乎只在 HTML web 扮演一个很小的角色。 今天，一切不同了，很多网站几乎全是用 JavaScript 所写。

 为了让 JavaScript 更模块化、更整洁以及更易于维护，ES6 引入了在多个 JavaScript 文件之间共享代码的机制。 它可以导出文件的一部分供其它文件使用，然后在需要它的地方按需导入。

如需要在 HTML 文档里创建一个 `type` 为 `module` 的脚本：

```javascript
<script type="module" src="filename.js"></script>
```

假设有一个文件 `math_functions.js`，该文件包含了数学运算相关的一些函数。 其中一个存储在变量 `add` 里，该函数接受两个数字作为参数返回它们的和。 你想在几个不同的 JavaScript 文件中使用这个函数。 要实现这个目的，就需要 `export` 它：

```javascript
export const add = (x, y) => {
  return x + y;
}
```

导出变量和函数后，就可以在其它文件里导入使用从而避免了代码冗余。 当然还可以这样导出：

```javascript
const add = (x, y) => {
  return x + y;
}
export { add };
```

导出语句中添加更多值也可以导出多项：

```javascript
export { add, subtract };
```

`import` 可以导入文件或模块的一部分：

```javascript
// 从 math_functions.js 文件里导入多个项目
import { add, subtract } from './math_functions.js';
```

假设你有一个文件，你希望将其所有内容导入到当前文件中，可以用 `import * as` 语法来实现：

```javascript
import * as myMathModule from "./math_functions.js";
// 然后可以像访问对象的属性那样访问里面的函数。
myMathModule.add(2,3);
myMathModule.subtract(5,3);
```

 在文件中只有一个值需要导出的时候，通常会使用默认导出的 `export` 的语法。 它也常常用于给文件或者模块创建返回值：

```javascript
// 命名函数
export default function add(x, y) {
  return x + y;
}
// 匿名函数
export default function(x, y) {
  return x + y;
}
```

`export default` 用于为模块或文件声明一个返回值，在每个文件或者模块中应当只默认导出一个值。 此外，你不能将 `export default` 与 `var`、`let` 或 `const` 同时使用。

`export default` 需要一种 `import` 的语法来导入默认的导出：

```
import add from "./math_functions.js";
```

### 六、JavaScript Promise

Promise 是异步编程的一种解决方案 - 它在未来的某时会生成一个值。 任务完成，分执行成功和执行失败两种情况。 

`Promise` 是构造器函数，需要通过 `new` 关键字来创建。 

构造器参数是一个函数，该函数有两个参数 - `resolve` 和 `reject`。 通过它们来判断 promise 的执行结果：

```javascript
const myPromise = new Promise((resolve, reject) => {
});
```

Promise 有三个状态：`pending`、`fulfilled` 和 `rejected`。 

没有调用 promise 的完成方法，promise 会一直阻塞在 `pending` 状态里，Promise 提供的 `resolve` 和 `reject` 参数就是用来结束 promise 的。 Promise 成功时调用 `resolve`，promise 执行失败时调用 `reject`， 如下文所述，这些方法需要有一个参数：

```javascript
const myPromise = new Promise((resolve, reject) => {
  if(condition here) {
    resolve("Promise was fulfilled");
  } else {
    reject("Promise was rejected");
  }
});
// 上面的示例使用字符串作为这些函数的参数，但参数实际上可以是任何格式。 通常，它可能是一个包含数据的对象，你可以将它放在网站或其他地方。
```

当程序需要花费未知的时间才能完成时（比如一些异步操作），一般是服务器请求，promise 很有用。 

服务器请求会花费一些时间，当结束时，需要根据服务器的响应执行一些操作。 这可以用 `then` 方法来实现， 当 promise 完成 `resolve` 时会触发 `then` 方法：

```javascript
myPromise.then(result => {
  console.log(result);
});
// result 即传入 resolve 方法的参数
```

当 promise 失败时会调用 `catch` 方法。 当 promise 的 `reject` 方法执行时会直接调用：

```javascript
myPromise.catch(error => {
	console.log(error);
});
```
