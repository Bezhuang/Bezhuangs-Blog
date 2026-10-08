---
title: 创建 ChatUI-React 工程
date: 2022-09-21
references: 
  - title: React 即时通信 UI 实战
    url: https://study.163.com/course/courseMain.htm?courseId=1210022809&share=1&shareId=1030428673
categories: 前端开发
tags: [ChatUI, React, 工程搭建]
---

> React 即时通信 UI 实战第二章。React 即时通信 UI 实战为[峰华前端工程师](https://www.bilibili.com/video/BV1PK4y1b7bY?p=2&spm_id_from=pageDriver&vd_source=0965c74096f788f105780e5d5d0e9ebf)推出的 React 实战课程，以聊天（即时通信）为原型，构建了一整套的 UI 组件库，课程重点在于 UI 组件的分析和实现，力求打造自用组件库。本章包括创建 React 工程，快速回顾 React 开发要点以及环境配置。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、创建 React 工程

安装 Yarn：

```sh
curl -o- -L https://yarnpkg.com/install.sh | bash
# yarn -v
```

使用 [Create React App](https://create-react-app.dev/) 工具，让你仅通过一行命令，即可构建现代化的 Web 应用。例如我们需要创建名为 chat-ui 的项目，运行如下命令：

```sh
yarn create react-app chat-ui
# 或者使用 npx create-react-app chat-ui
```

`src` 目录下存放所有 React 源代码。`src/index.js` 是程序的入口文件。

### 二、React 快速回顾

[React](https://reactjs.org/) 是一个声明式，高效且灵活的用于构建用户界面 UI 的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”，而组件是通过状态来更新的。

#### 创建一个组件

创建一个 `Button.js` 文件：

```js
import React from "react";

function Button() {
    return <button type="submit">按钮</button>
}

export default Button;
```

在 `App.js` 中导入、返回：

```js
import './App.css';
import Button from './Button.js';

function App() {
  return <Button />;
}

export default App;
```

#### JSX 与 HTML

JSX 中所有属性变为驼峰命名法，例如 `onClick`、`className`、`style={{backgroundColor: "red"}}`。

在 JSX 语法中，你可以在大括号内放置任何有效的 [JavaScript 表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)。例如，`2 + 2`，`user.firstName` 或 `formatName(user)` 都是有效的 JavaScript 表达式，例如调用 JavaScript 函数 `formatName(user)` 的结果，并将结果嵌入到 `<h1>` 元素中：

```js
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

注意：在 React 18 中，`render` 函数已被 `createRoot` 函数所取代。具体请参阅 [createRoot](https://zh-hans.reactjs.org/docs/react-dom-client.html#createroot) 以了解更多。

#### 属性 Props

React 组件可以通过属性来实现复用。每个组件函数都接收一个 Props 对象：

```js
function Button(props) {
    return <button>{props.label}</button>   
}
```

也可以通过 ES6 将 label 解构出来：

```js
function Button({ label, children }) {
    return (
        <div>
            <button>{label}</button>
            {children}
        </div>
    )
}
```

在 `App.js` 中导入、返回：

```js
function App() {
  return (
    <div>
      <Button label="按钮">
        <span>&gt;</span>
      </Button>
      <Button label="点我" />
    </div>
  );
}
```

#### 事件处理

给组件注册事件监听：

```js
function Button({ onClick, label, children }) {
    return (
        <div onClick={onClick}>
            <button>{label}</button>
            {children}
        </div>
    )
}
```

在父级菜单设置传入事件：

```js
function App() {
  const handleButton1Click = () => {
    alert("点击按钮1事件");
  }
  const handleButton2Click = () => {
    alert("点击按钮2事件");
  }
  return (
    <div>
      <Button label="按钮" onClick={handleButton1Click}>
        <span>&gt;</span>
      </Button>
      <Button label="点我" onClick={handleButton2Click} />
    </div>
  );
}
```

#### 状态 State

props 是静态的，在组件渲染后修改 props 的值并不会引起组件的更新。如果想点击后改变字体颜色，需要定义 State 属性：

```js
import { useState } from 'react';
import './App.css';
import Button from './Button.js';

function App() {
  const [color, setColor] = useState("#ff0000");    // 解构赋值
  const handleButton1Click = () => {
    setColor("#00ff00");
    alert("点击按钮1事件");
  }
  const handleButton2Click = () => {
    alert("点击按钮2事件");
  }
  return (
    <div>
      <Button label="按钮" onClick={handleButton1Click}>
        <span>&gt;</span>
      </Button>
      <p style={{ color }}>这是一段文字</p>
      <Button label="点我" onClick={handleButton2Click} />
    </div>
  );
}
```

#### 自定义 Hooks

Hooks 是 React 的一项新功能提案，可让您在不编写类的情况下使用 state 状态 和其他 React 功能。

React 推荐 Hooks 均以 use 开头，新建一个 useColorSwitch.js 文件：

```js
import { useState } from "react";

function useColorSwtich(color1 = "#ff0000", color2 = "#00ff00") {
    const [color, setColor] = useState(color1);
    const handleButtonClick = () => {
        setColor(color2);
    };
    return [color, handleButtonClick];
}

export default useColorSwtich;
```

修改 App.js 文件：

```js
import './App.css';
import Button from './Button.js';
import useColorSwtich from './useColorSwitch';

function App() {
  const [color, handleButton1Click] = useColorSwtich();
  const [color2, handleButton2Click] = useColorSwtich("#0000ff", "#ff00ff");
  return (
    <div>
      <Button onClick={handleButton1Click} label="按钮">
        <span>&gt;</span>
      </Button>
      <p style={{ color }}>这是第一段文本</p>
      <Button onClick={handleButton2Click} label="点我" />
      <p style={{ color: color2 }}>这是第二段文本</p>
    </div>
  );
}
```

### 三、Styled-components 简介与配置

[Styled-components](https://styled-components.com/) 是目前 React 样式方案中最受关注的一种，它既具备了 css-in-js 的模块化与参数化优点，又完全使用 CSS 的书写习惯，不会引起额外的学习成本。

```sh
yarn add styled-components  # 安装
```

#### 配置主题

`src` 下新建 `theme.js` 文件：

```js
export default {
    primaryColor: '#4F9DDE',
}
```

在 index.js 文件中修改：

```js
import { ThemeProvider } from 'styled-components';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

在 Button.js 文件中使用 `tagged template literals` 给模板字符串传递参数：

```js
import styled from "styled-components";

const StyledButton = styled.div`
    width: ${({ width }) => width || "80px"};
    background-color: ${({ theme }) => theme.primaryColor};
`;

function Button({ width, onClick, label, children }) {
    return (
        <StyledButton width={width} onClick={onClick}>
            <button>{label}</button>
            {children}
        </StyledButton>
    )
}
```

给 Button1 传入 width 属性：

```js
function App() {
  const [color, handleButton1Click] = useColorSwtich();
  const [color2, handleButton2Click] = useColorSwtich("#0000ff", "#ff00ff");
  return (
    <div>
      <Button width="120px" onClick={handleButton1Click} label="按钮">
        <span>&gt;</span>
      </Button>
      <p style={{ color }}>这是一段文本</p>
      <Button onClick={handleButton2Click} label="点我" />
      <p style={{ color: color2 }}>这是第二段文本</p>
    </div>
  );
}
```

### 四、Storybook 简介与配置

Storybook 是一个 UI 组件开发管理的工具，以文档形式组织和展示组件，我们可以通过 story 独立创建组件，并且每个组件都有一个独立开发调试环境。Storybook 是运行在主应用程序之外，不依赖于项目，因此我们不必担心开发环境、依赖等问题导致不能开发组件。

在项目根目录下运行命令进行安装：

```bash
npx -p @storybook/cli sb init  # Add Storybook
```

使用 `yarn` 命令启动：

```
yarn run storybook
```

修改 `.storybook` 目录下的 Preview.js 文件：

```js
import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import theme from "../src/theme";

import "story.css";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  options: {
    showRoots: true,
  },
};
```
