---
title: ChatUI-React 视频通话等其他组件
date: 2022-12-26
references: 
  - title: React 即时通信 UI 实战
    url: https://study.163.com/course/courseMain.htm?courseId=1210022809&share=1&shareId=1030428673
categories: 前端开发
tags: [ChatUI, React, 组件开发]
---

> React 即时通信 UI 实战第十章。React 即时通信 UI 实战为[峰华前端工程师](https://www.bilibili.com/video/BV1PK4y1b7bY?p=2&spm_id_from=pageDriver&vd_source=0965c74096f788f105780e5d5d0e9ebf)推出的 React 实战课程，以聊天（即时通信）为原型，构建了一整套的 UI 组件库，课程重点在于 UI 组件的分析和实现，力求打造自用组件库。本章包括视频通话等其他组件，并将所有页面和 UI 组件组装成聊天首页。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、视频通话组件开发

使用 Hygen 创建一个 `VideoCall` 组件，并移动到 `src/components/Input` 组件目录下，作为 `Input` 的子组件导出：

```bash
hygen component new VideoCall
```

编辑 `src/components/VideoCall/index.js`  文件：

```js
import React, { useState } from "react";
import PropTypes from "prop-types";
import StyledVideoCall, {
  Minimize,
  Actions,
  Action,
  Self,
  VideoCallAlert,
} from "./style";
import videoCaller from "assets/images/video-caller.jpg";
import face from "assets/images/face-male-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompressAlt,
  faMicrophone,
  faPhoneSlash,
  faVolumeMute,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "components/Avatar";
import Paragraph from "components/Paragraph";

import "styled-components/macro";

function VideoCall({ children, onHangOffClicked, ...rest }) {
  const [fullScreen, setFullScreen] = useState(true);

  if (!fullScreen) {
    return (
      <VideoCallAlert>
        <Avatar
          src={face}
          css={`
            grid-area: avatar;
          `}
        />
        <Paragraph
          size="medium"
          css={`
            grid-area: info;
          `}
        >
          正在跟 李铭浩 进行视频通话
        </Paragraph>
        <Paragraph
          type="secondary"
          css={`
            grid-area: action;
            cursor: pointer;
          `}
          onClick={() => setFullScreen(true)}
        >
          点击切换全屏
        </Paragraph>
        <FontAwesomeIcon
          icon={faVideo}
          css={`
            grid-area: icon;
            font-size: 20px;
            justify-self: end;
            opacity: 0.3;
          `}
        />
      </VideoCallAlert>
    );
  }

  return (
    <StyledVideoCall src={videoCaller} {...rest}>
      <Minimize shape="rect" onClick={() => setFullScreen(false)}>
        <FontAwesomeIcon icon={faCompressAlt} />
      </Minimize>
      <Actions>
        <Action>
          <FontAwesomeIcon icon={faMicrophone} />
        </Action>
        <Action type="hangoff">
          <FontAwesomeIcon icon={faPhoneSlash} onClick={onHangOffClicked} />
        </Action>
        <Action>
          <FontAwesomeIcon icon={faVolumeMute} />
        </Action>
      </Actions>
      <Self src={face} size="140px" />
    </StyledVideoCall>
  );
}

VideoCall.propTypes = {
  children: PropTypes.any,
};

export default VideoCall;
```

编辑 `src/components/VideoCall/style.js`  文件：

```js
import styled from "styled-components";
import Button from "components/Button";
import Avatar from "components/Avatar";
import { card } from "utils/mixins";

const Actions = styled.div`
  grid-area: actions / title;
  align-self: end;
  justify-self: center;

  display: grid;
  grid-template-columns: 90px 90px 90px;
`;

const Action = styled(Button).attrs({ size: "64px" })`
  font-size: 32px;
  color: white;

  box-shadow: none;
  background: ${({ theme, type }) =>
    type === "hangoff" ? theme.red2 : theme.grayDark2};
`;

const Self = styled(Avatar)`
  grid-area: self;
  align-self: end;
  justify-self: end;
`;

const Minimize = styled(Button)`
  justify-self: end;
  grid-area: title;
  background-color: ${({ theme }) => theme.gray3};
  padding: 0;
  width: 62px;
  height: 62px;
  font-size: 46px;
`;

const VideoCallAlert = styled.div`
  display: grid;
  grid-template-areas:
    "avatar info info"
    "avatar action icon";
  row-gap: 5px;
  column-gap: 10px;
  align-items: center;
  width: max-content;
  position: absolute;
  right: 0;
  top: 10vh;
  border: 1px solid ${({ theme }) => theme.gray4};
  z-index: 200;
  ${card}
`;

const StyledVideoCall = styled.div`
  height: 100%;
  padding: 20px;
  padding-bottom: 40px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;

  display: grid;
  grid-template-areas:
    "title title"
    "actions self";
`;

export default StyledVideoCall;
export { Actions, Action, Self, Minimize, StyledVideoCall, VideoCallAlert };
```

在 `src/components/VideoCall/videoCall.stories.js`  文件中修改 stories：

```js
import React from "react";
import VideoCall from ".";

export default {
  title: "页面组件/VideoCall",
  component: VideoCall,
};

export const Default = () => (
  <div style={{ height: "100vh" }}>
    <VideoCall />
  </div>
);
```

使用 `yarn` 命令启动 storybook：

```
yarn run storybook
```

### 二、Dropdown 下拉组件开发

使用 Hygen 创建一个 `Dropdown` 组件：

```bash
hygen component new Dropdown
```

编辑 `src/components/Dropdown/index.js`  文件：

```js
import React, { useState } from "react";
import PropTypes from "prop-types";
import StyledDropdown, { DropdownContainer } from "./style";

function Dropdown({ children, content, align = "right", ...rest }) {
  const [visible, setVisible] = useState(false);

  return (
    <StyledDropdown onClick={() => setVisible(!visible)} {...rest}>
      {children}
      {content && (
        <DropdownContainer align={align} visible={visible}>
          {content}
        </DropdownContainer>
      )}
    </StyledDropdown>
  );
}

Dropdown.propTypes = {
  children: PropTypes.any,
  content: PropTypes.any,
  align: PropTypes.oneOf(["top", "left", "bottom", "right"]),
};

export default Dropdown;
```

编辑 `src/components/Dropdown/style.js`  文件：

```js
import styled from "styled-components";
import StyledSeperator from "components/Seperator/style";

const DropdownItem = styled.div`
  margin: 12px 0;
`;

const DropdownContainer = styled.div`
  position: absolute;
  white-space: nowrap;
  padding: 4px 26px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.08);

  display: ${({ visible }) => (visible ? "block" : "none")};

  ${({ align }) => align}: 0;

  ${StyledSeperator} {
    margin: -3px -26px;
    width: calc(100% + 52px);
  }
`;

const StyledDropdown = styled.div`
  position: relative;
  cursor: pointer;
`;

export default StyledDropdown;
export { DropdownContainer, DropdownItem };
```

在 `src/components/Dropdown/dropdown.stories.js`  文件中添加 stories：

```js
import React from "react";
import Dropdown from ".";
import { DropdownItem } from "./style";
import Paragraph from "components/Paragraph";
import Seperator from "components/Seperator";

import { ReactComponent as Options } from "assets/icon/options.svg";
import Icon from "components/Icon";

export default {
  title: "UI 组件/Dropdown",
  component: Dropdown,
};

const dropdownContent = (
  <>
    <DropdownItem>
      <Paragraph>个人资料</Paragraph>
    </DropdownItem>
    <DropdownItem>
      <Paragraph>关闭会话</Paragraph>
    </DropdownItem>
    <Seperator />
    <DropdownItem>
      <Paragraph type="danger">屏蔽此人</Paragraph>
    </DropdownItem>
  </>
);

export const Default = () => (
  <div
    style={{ display: "flex", justifyContent: "space-between", width: "50%" }}
  >
    <Paragraph>点击右侧按钮</Paragraph>
    <Dropdown content={dropdownContent}>
      <Icon opacity={0.3} icon={Options} />
    </Dropdown>
  </div>
);

export const Left = () => (
  <div>
    <Paragraph>点击下方按钮</Paragraph>
    <Dropdown align="left" content={dropdownContent}>
      <Icon opacity={0.3} icon={Options} />
    </Dropdown>
  </div>
);
```

接下来把 Dropdown 组件添加到标题栏中的更多选项图标中，编辑 `src/components/TitleBar/index.js`  文件，在 Options 外层套一个 Dropdown 组件：

```js
<Actions>
  <Icon opacity={0.3} icon={Call} />
    <Icon opacity={0.3} icon={Camera} />
      <Dropdown content={
        <>
        <DropdownItem>
        <Paragraph>个人资料</Paragraph>
        </DropdownItem>
        <DropdownItem>
        <Paragraph>关闭会话</Paragraph>
        </DropdownItem>
        <Seperator />
        <DropdownItem>
        <Paragraph type="danger">屏蔽此人</Paragraph>
        </DropdownItem>
        </>
      } >
        <Icon opacity={0.3} icon={Options} />
          </Dropdown>
</Actions>
```

### 三、组装聊天首页

聊天应用程序首页采用三段式布局，从左到右依次是导航、侧边栏和内容区，另外有滑动抽屉

使用 Hygen 创建一个 `ChatApp` 组件：

```bash
hygen component new ChatApp
```

编辑 `src/components/ChatApp/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledChatApp, { Nav, Sidebar, Drawer, Content } from "./style";
import NavBar from "components/NavBar";
import MessageList from "components/MessageList";
import Conversation from "components/Conversation";
import Profile from "components/Profile";

function ChatApp({ children, ...rest }) {
  return (
    <StyledChatApp {...rest}>
      <Nav>
        <NavBar />
      </Nav>
      <Sidebar>
        <MessageList />
      </Sidebar>
      <Content>
        <Conversation />
      </Content>
      <Drawer>
        <Profile />
      </Drawer>
    </StyledChatApp>
  );
}

ChatApp.propTypes = {
  children: PropTypes.any,
};

export default ChatApp;
```

编辑 `src/components/ChatApp/style.js`  文件：

```js
import styled from "styled-components";

const Nav = styled.nav`
  flex-shrink: 0;
`;

const Sidebar = styled.aside`
  max-width: 448px;
  min-width: 344px;
  height: 100vh;
  flex: 1;
  background: ${({ theme }) => theme.grediantGray};
`;

const Content = styled.main`
  flex: 2;
  position: relative;
`;

const Drawer = styled.div`
  max-width: 310px;
`;

const StyledChatApp = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
`;

export default StyledChatApp;
export { Nav, Sidebar, Content, Drawer };
```

修改项目 `src` 目录下的 `index.js`，删除不相关代码：

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

修改项目 `src` 目录下的 `App.js`，返回 `ChatApp` 组件：

```js
import React from "react";
import ChatApp from "components/ChatApp";
import { ThemeProvider } from "styled-components";
import theme from "theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChatApp />
    </ThemeProvider>
  );
}

export default App;
```

#### `yarn start` 运行 React 项目！
