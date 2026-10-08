---
title: 前端开发库 React
date: 2022-08-15
references: 
  - title: freeCodeCamp
    url: https://chinese.freecodecamp.org/learn/front-end-development-libraries/
categories: 前端开发
tags: [React, JavaScript]
---

> freeCodeCamp 前端开发库第四章。React 是一个由 Facebook 创建和维护的开源 JavaScript 视图库，用于为网页或应用程序构建可重用的组件驱动的用户界面。React 将 HTML 与 JavaScript 结合在了一起，以此创建出一个新的标记语言 JSX。React 还使得管理整个应用程序的数据流变得更容易。在 React 课程中，学习如何创建不同的 React 组件，以 state props 管理数据，以及使用不同的生命周期方法（例如 `componentDidMount`）等。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、JSX 语法

React 使用名为 JSX 的 JavaScript 语法扩展，可以直接在 JavaScript 中编写 HTML。因为 JSX 是 JavaScript 的语法扩展，所以实际上可以直接在 JSX 中编写 JavaScript。 要做到这一点，只需在花括号中包含希望被视为 JavaScript 的代码：`{ 'this is treated as JavaScript code' }`

```js
const JSX = <h1>Hello JSX!</h1>;
```

嵌套的 JSX 必须返回单个元素，所以通常使用 `div` 标签把所有子元素包裹在里面，并在外面套上 `()`。要将注释放在 JSX 中，可以使用 `{/* */}` 语法来包裹注释文本。

```js
const JSX = (
  <div>
    {/* 这是注释 */}
    <h1>This is a block of JSX</h1>
    <p>Here's a subtitle</p>
  </div>
);
```

在 React 中，可以使用它的的渲染 API（ReactDOM）将 JSX 直接渲染到 HTML DOM。ReactDOM 提供 `ReactDOM.render(componentToRender, targetNode)` 方法来将 React 元素呈现给 DOM，其中第一个参数是要渲染的 React 元素或组件，第二个参数是组件将要渲染到的 DOM 节点。

```js
const JSX = (
  <div>
    <p>Lets render this to the DOM</p>
  </div>
);
ReactDOM.render(JSX, document.getElementById("challenge-node"));
```

JSX 和 HTML 的一个关键区别是 JSX 使用 `className` 来做为 HTML 的 `class` 名， 因为 `class` 是 JavaScript 中的关键字。并且 JSX 中所有 HTML 属性和事件引用的命名约定都变成了驼峰式。 例如，JSX 中的单击事件是 `onClick`，而不是 `onclick`。 同样，`onchange` 变成了`onChange`。

```js
const JSX = (
  <div className="myDiv">
    <h1>Add a class to this div</h1>
  </div>
);
```

在 JSX 中，任何 JSX 元素都可以使用自闭合标签编写，例如 `<div />`，并且每个元素都必须关闭。

### 二、React 组件

组件是 React 的核心。 React 中的所有内容都是一个组件。有两种方法可以创建 React 组件。 第一种方法是使用 JavaScript 函数。 以这种方式定义组件会创建无状态功能组件，即能接收数据并对其进行渲染，但不管理或跟踪该数据的更改的组件。

要用函数创建组件，只需编写一个返回 JSX 或 `null` 的 JavaScript 函数。 需要注意的一点是，React 要求你的函数名以大写字母开头。 下面是一个无状态功能组件的示例，该组件在 JSX 中分配一个 HTML 的 class：

```jsx
const DemoComponent = function() {
  return (
    <div className='customClass' />
  );
};
```

React 提供的组件架构允许用许多独立的组件组合成 UI。 这使得构建和维护复杂的用户界面变得更加容易。

定义 React 组件的另一种方法是使用 ES6 的类定义。 在以下示例中，`Kitten` 扩展了`React.Component`，因此，`Kitten` 类现在可以访问许多有用的 React 功能，例如本地状态和生命周期钩子：

```jsx
class Kitten extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Hi</h1>
    );
  }
}
```

要在` <App> `父组件中渲染多个子组件 `Navbar`、`Dashboard` 和 `Footer`，可以在 `render` 方法中这样编写：

```jsx
render() {
  return (
 		<App>
  		<Navbar /> <Dashboard /> <Footer />
 		</App>  
  )
}
```

也可以在其它组件中渲染 JSX 元素、无状态功能组件和 ES6 类组件。

传递到 `ReactDOM.render()` 的React 组件与 JSX 元素略有不同。 对于 JSX 元素，传入的是要渲染的元素的名称。 但是，对于 React 组件，需要使用与渲染嵌套组件相同的语法，例如`ReactDOM.render(<ComponentToRender />, targetNode)`。 此语法用于 ES6 class 组件和函数组件都可以。

```js
ReactDOM.render(<TypesOfFood />, document.getElementById('challenge-node'))
```

一个完整的 React 组件示例：

```js
class MyComponent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
          <div id="challenge-node">
                 <h1>My First React Component!</h1>
          </div>
    );
  }
};
ReactDOM.render(<MyComponent/>, document.getElementById("challenge-node"));
```

### 三、Props

在 React 中，可以将属性传递给子组件。可以通过以下方式给 `Welcome` 传递一个 `user` 属性：

```jsx
<App>
  <Welcome user='Mark' />
</App>
```

可以把创建的 React 支持的自定义 HTML 属性传递给组件， 在上面的例子里，将创建的属性 `user` 传递给组件 `Welcome`。 由于 `Welcome` 是一个无状态函数组件，它可以将 `props` 视为返回 JSX 的函数的参数。：

```jsx
const Welcome = (props) => <h1>Hello, {props.user}!</h1>
```

例如，从 `Calendar` 组件渲染 `CurrentDate` 时，从 JavaScript 的 `Date`对象分配当前日期，并将其作为 `date` 属性传入。 然后访问 `CurrentDate` 组件的 `prop`，并在 `p` 标签中显示其值。 请注意，要将 `prop` 的值视为 JavaScript，必须将它们括在花括号中：

```js
const CurrentDate = (props) => {
  return (
    <div>
      <p>The current date is: {props.date}</p>
    </div>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>What date is it?</h3>
        <CurrentDate date={Date()} />
      </div>
    );
  }
};
```

传递一个数组作为 Props，这样子组件就可以访问数组属性，访问属性时可以使用 `join()` 等数组方法。

```js
const List = (props) => {
  return <p>{props.tasks.join(', ')}</p>
};

class ToDo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>To Do Lists</h1>
        <h2>Today</h2>
        <List  tasks={["Walk", "Cook", "Bake"]} />
        <h2>Tomorrow</h2>
        <List tasks={["Study", "Code", "Eat"]}/>
      </div>
    );
  }
};
```

React 还有一个设置默认 props 的选项。 可以将默认 props 作为组件本身的属性分配给组件，React 会在必要时分配默认 prop。 







### N、页面展示

<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="https://free-code-camp-demo.vercel.app/前端开发库/jQuery游乐场/index.html" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>
