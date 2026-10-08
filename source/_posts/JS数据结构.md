---
title: JavaScript 基础数据结构
date: 2022-07-07
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/javascript-algorithms-and-data-structures/
categories: 前端开发
tags: [JavaScript, 数据结构, freeCodeCamp]
---

> freeCodeCamp JavaScript 算法和数据结构第五章。我们可以通过多种方式存储和访问数据，例如数组和对象，都是常见的 JavaScript 数据结构。在基础数据结构课程中，更深入地了解数组和对象之间的差异，以及在不同情况下应该使用哪个，学习一些好用的 JS 方法，例如 `splice()`，以及使用 `Object.keys()` 来访问和操作数据。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、数组

一维数组（one-dimensional array）只有一层，只包含布尔值（booleans）、字符串（strings）、数字（numbers）以及 JavaScript 中的其他数据类型，所有数组都有一个表示长度的属性，我们可以通过 `Array.length` 来访问它。：

```js
let simpleArray = ['one', 2, 'three', true, false, undefined, null];
console.log(simpleArray.length);  // 7
```

多维数组 （multi-dimensional Array）或嵌套（nested）数组是一个包含了其他数组的数组，在它的内部还包含了 JavaScript 中的对象（objects）结构：

```js
let complexArray = [
    [
        {
            one: 1,
            two: 2
        },
        {
            three: 3,
            four: 4
        }
    ],
    [
        {
            a: "a",
            b: "b"
        },
        {
            c: "c",
            d: "d"
        }
    ]
];
```

在数组中，内部的每个元素都有一个与之对应的索引（index）。 索引既是该元素在数组中的位置，也是我们访问该元素的引用。 

JavaScript 数组的索引是从 0 开始的（这种从 0 开始的规则叫做 zero-indexed），即数组的第一个元素是在数组中的第 0 个位置，而不是第 1 个位置。

 要从数组中获取一个元素，我们可以在数组字面量后面加一个用方括号括起来的索引。不过习惯上，我们会通过表示数组的变量名来访问，而不是直接通过字面量。 这种从数组中读取元素的方式叫做方括号表示法（bracket notation）。 如果我们要从数组 `ourArray` 中取出数据 `a` 并将其赋值给另一个变量，可以这样写：

```js
let ourVariable = ourArray[0];
```

通过索引，我们不仅可以获取某个元素值，还可以用类似的写法来*设置*一个索引位置的元素值：

```js
ourArray[1] = "not b anymore";
```

### 二、添加、删除元素

数组的长度与数组能包含的数据类型一样，都是不固定的。 数组可以包含任意数量的元素，可以不限次数地往数组中添加元素或者从中移除元素。 总之，数组是可变的（mutable）。

`push()` 方法会将元素插入到数组的末尾，而 `unshift()` 方法会将元素插入到数组的开头：

```js
let twentyThree = 'XXIII';
let romanNumerals = ['XXI', 'XXII'];
romanNumerals.unshift('XIX', 'XX');
romanNumerals.push(twentyThree);
```

`push()` 和 `unshift()` 都有一个与它们作用相反的函数：`pop()` 和 `shift()`。 与插入元素相反，`pop()` 会从数组的末尾移除一个元素，而 `shift()` 会从数组的开头移除一个元素。

 `pop()` 和 `shift()` 与 `push()` 和 `unshift()` 的关键区别在于，用于删除元素的方法不接收参数，而且每次只能删除数组中的一个元素。

```js
let greetings = ['whats up?', 'hello', 'see ya!'];
let popped = greetings.pop();  // greetings 值为 ['whats up?', 'hello']，popped 值为 see ya!
greetings.shift();  //greetings 值为 ['hello']
```

`splice()` 可以让我们从数组中的任意位置连续删除任意数量的元素。`splice()` 最多可以接受 3 个参数。

 `splice()` 的前两个参数是整数，表示数组中调用 `splice()` 的项的索引或位置，第一个参数代表从数组中的哪个索引开始移除元素，而第二个参数表示要从数组中的这个位置开始删除多少个元素。

`splice()` 不仅会修改调用该方法的数组，还会返回一个包含被移除元素的数组：

```js
let array = ['I', 'am', 'feeling', 'really', 'happy'];
let newArray = array.splice(3, 2);   // ['really', 'happy']
```

`splice()` 方法的第三个参数可以是一个或多个元素，这些元素会被添加到数组中。 这样，我们能够便捷地将数组中的一个或多个连续元素换成其他的元素。

```js
const numbers = [10, 11, 12, 12, 15];
const startIndex = 3;
const amountToDelete = 1;
numbers.splice(startIndex, amountToDelete, 13, 14);
console.log(numbers);  // [ 10, 11, 12, 13, 14, 15 ]
```

`slice()` 不会修改数组，而是会复制，或者说提取（extract）给定数量的元素到一个新数组。 `slice()` 只接收 2 个输入参数：第一个是开始提取元素的位置（索引），第二个是提取元素的结束位置（索引）。 提取的元素中不包括第二个参数所对应的元素：

```js
let weatherConditions = ['rain', 'snow', 'sleet', 'hail', 'clear'];
let todaysWeather = weatherConditions.slice(1, 3);  // ['snow', 'sleet']
```

### 三、展开运算符

`slice()` 可以让我们从一个数组中选择一些元素来复制到新数组中，而 ES6 中又引入了一个简洁且可读性强的语法：展开运算符（spread operator），它能让我们方便地复制数组中的所有元素。 

展开语法写出来是这样：`...`。

```js
let thisArray = [true, true, undefined, false, null];
let thatArray = [...thisArray];  // thisArray 保持不变， thatArray 包含与 thisArray 相同的元素。
```

展开语法（spread）的另一个重要用途是合并数组，或者将某个数组的所有元素插入到另一个数组的任意位置。 我们也可以使用 ES5 的语法连接两个数组，但只能让它们首尾相接。 而展开语法可以让这样的操作变得极其简单：

```js
let thisArray = ['sage', 'rosemary', 'parsley', 'thyme'];
let thatArray = ['basil', 'cilantro', ...thisArray, 'coriander'];   // ['basil', 'cilantro', 'sage', 'rosemary', 'parsley', 'thyme', 'coriander']
```

使用展开语法，我们就可以很方便的实现一个用传统方法会写得很复杂且冗长的操作。

### 四、查询、遍历元素

由于数组随时都可以修改或发生 mutated，我们很难保证某个数据始终处于数组中的特定位置，甚至不能保证该元素是否还存在于该数组中。 好消息是，JavaScript 为我们提供了内置方法 `indexOf()`。 这个方法让我们可以方便地检查某个元素是否存在于数组中。

 `indexOf()` 方法接受一个元素作为输入参数，并返回该元素在数组中的位置（索引）；若该元素不存在于数组中则返回 `-1`。

```js
et fruits = ['apples', 'pears', 'oranges', 'peaches', 'pears'];
fruits.indexOf('dates');  // -1
fruits.indexOf('oranges');  // 2
fruits.indexOf('pears');  // 1 (每个元素存在的第一个索引)
```

使用数组时，我们经常需要遍历数组的所有元素来找出我们需要的一个或多个元素，抑或是对数组执行一些特定的操作。 JavaScript 为我们提供了几个内置的方法，它们以不同的方式遍历数组，以便我们可以用于不同的场景（如 `every()`、`forEach()`、`map()` 等等）。 

然而，最简单的 `for` 循环不仅能实现上述这些方法的功能，而且相比之下也会更加灵活：

```js
function greaterThanTen(arr) {
  	let newArr = [];
  			for (let i = 0; i < arr.length; i++) {
    		if (arr[i] > 10) {
      			newArr.push(arr[i]);
    		}
  	}
  	return newArr;
}
greaterThanTen([2, 12, 8, 14, 80, 0, 1]);
```

### 五、对象

对象（object）本质上是键值对（key-value pair）的集合。 或者说，一系列被映射到唯一标识符的数据就是对象；习惯上，唯一标识符叫做属性（property）或者键（key）；数据叫做值（value）：

```js
const tekkenCharacter = {
    player: 'Hwoarang',
    fightingStyle: 'Tae Kwon Doe',
    human: true
};
```

 如果我们想为它再添加一个叫做 `origin` 的属性，可以这样写：

```js
tekkenCharacter.origin = 'South Korea';
```

也可以通过方括号表示法来为它添加这个属性，像这样：

```js
tekkenCharacter['hair color'] = 'dyed orange';
```

把属性（hair color）放到引号里，以此来表示整个字符串都是需要设置的属性。 如果不加上引号，那么中括号里的内容会被当作一个变量来解析，这个变量对应的值就会作为要设置的属性：

```js
const eyes = 'eye color';
tekkenCharacter[eyes] = 'brown';
```

修改嵌套在对象中的对象：

```js
let nestedObject = {
    id: 28802695164,
    date: 'December 31, 2016',
    data: {
        totalUsers: 99,
        online: 80,
        onlineStatus: {
            active: 67,
            away: 13,
            busy: 8  // 10
        }
    }
};
nestedObject.data.onlineStatus.busy = 10;
```

使用方括号访问属性名称：

```js
let selectedFood = getCurrentFood(scannedItem);
let inventory = foods[selectedFood];
// 上述代码会先读取 selectedFood 变量的值，并返回 foods 对象中以该值命名的属性所对应的属性值。 若没有以该值命名的属性，则会返回 undefined。 
```

对象是以键值对的形式，灵活、直观地存储结构化数据的一种方式，而且，通过对象的属性查找属性值是速度很快的操作。

从一个对象中移除一个键值对，可以像这样使用 `delete` 关键字：

```js
delete foods.apples;
```

如果我们想知道一个对象中是否包含某个属性呢，JavaScript 为我们提供了两种不同的方式来实现这个功能： 一个是通过 `hasOwnProperty()` 方法，另一个是使用 `in` 关键字。 

```js
users.hasOwnProperty('Alan');   // true
'Alan' in users;  // true
```

如果我们想要遍历对象中的所有属性， 只需要使用 JavaScript 中的 `for...in` 语句即可：

```js
for (let user in users) {
  	console.log(user);
} // 在上面的代码中，我们定义了一个 user 变量。 可以观察到，这个变量在遍历对象的语句执行过程中会一直被重置并赋予新值，结果就是不同的用户名打印到了 console 中。
```

对象中的键是无序的，这与数组不同。 因此，一个对象中某个属性的位置，或者说它出现的相对顺序，在引用或访问该属性时是不确定的。

可以给 `Object.keys()` 方法传入一个对象作为参数，来生成包含对象所有键的数组。 这会返回一个由对象中所有属性（字符串）组成的数组。 需要注意的是，数组中元素的顺序是不确定的。

```js
function getArrayOfUsers(obj) {
  	return Object.keys(obj);	
}    // 返回一个由输入对象中的所有属性所组成的数组。
```
