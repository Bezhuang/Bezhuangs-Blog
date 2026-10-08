---
title: ChatUI-React 路由管理
date: 2023-01-08
references: 
  - title: React 即时通信 UI 实战
    url: https://study.163.com/course/courseMain.htm?courseId=1210022809&share=1&shareId=1030428673
categories: 前端开发
tags: [ChatUI, React, 路由]
---

> React 即时通信 UI 实战第十一章。React 即时通信 UI 实战为[峰华前端工程师](https://www.bilibili.com/video/BV1PK4y1b7bY?p=2&spm_id_from=pageDriver&vd_source=0965c74096f788f105780e5d5d0e9ebf)推出的 React 实战课程，以聊天（即时通信）为原型，构建了一整套的 UI 组件库，课程重点在于 UI 组件的分析和实现，力求打造自用组件库。本章包括视频通话等其他组件，并将所有页面和 UI 组件组装成聊天首页。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、React Router 简介

[React Router](https://reactrouter.com/en/main) 是为 React 提供路由功能的第三方库，通过一些 React 组件实现动态的跳转，并根据不同的路由加载不同的组件，是完整的 React 动态路由解决方案。

因为 `React-router-dom@6` 对之前的版本有一些变动，先不研究，使用 `React-router-dom@5`。

```
npm uninstall react-router-dom
npm install react-router-dom@5
```

打开 `App.js`，从 `react-router-dom` 中导入 `BrowserRouter`，`BrowserRouter` 实现了 HTML5 中的 `History API`。路由定义在 `Router` 组件的内部。

```js
import React from "react";
import ChatApp from "components/ChatApp";
import { ThemeProvider } from "styled-components";
import theme from "theme";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ChatApp />
      </ThemeProvider>
    </Router>
  );
}

export default App;
```

其他高级用法参见[中文文档](https://react-guide.github.io/react-router-cn/index.html)。

### 二、配置导航路由

编辑 `src/components/ChatApp/index.js` 文件，使用 `path` 匹配路径：

```bash
import React from "react";
import PropTypes from "prop-types";
import StyledChatApp, { Nav, Sidebar, Drawer, Content } from "./style";
import NavBar from "components/NavBar";
import MessageList from "components/MessageList";
import Conversation from "components/Conversation";
import Profile from "components/Profile";
import { Route, Switch } from "react-router-dom";
import ContactList from "components/ContactList";
import FileList from "components/FileList";
import NoteList from "components/NoteList";
import EditProfile from "components/EditProfile";

function ChatApp({ children, ...rest }) {
  return (
    <StyledChatApp {...rest}>
      <Nav>
        <NavBar />
      </Nav>
      <Sidebar>
        <Switch>
          <Route exact path="/">
            <MessageList />
          </Route>
          <Route exact path="/contacts">
            <ContactList />
          </Route>
          <Route exact path="/files">
            <FileList />
          </Route>
          <Route exact path="/notes">
            <NoteList />
          </Route>
          <Route path="/settings">
            <EditProfile />
          </Route>
        </Switch>
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

编辑 `src/components/NavBar/index.js `给 `MenuItem` 添加 `to` 属性，用于接收路径。

```js
import React from "react";
import PropTypes from "prop-types";
import StyledNavBar, { StyledMenuItem, MenuIcon, MenuItems } from "./style";
import Badge from "components/Badge";
import Avatar from "components/Avatar";

import profileImage from "assets/images/face-male-1.jpg";
import {
  faCommentDots,
  faUsers,
  faFolder,
  faStickyNote,
  faEllipsisH,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import "styled-components/macro";
import { Link, useLocation, matchPath } from "react-router-dom";

function NavBar({ ...rest }) {
  return (
    <StyledNavBar {...rest}>
      <Avatar src={profileImage} status="online" />
      <MenuItems>
        <MenuItem to="/" showBadge icon={faCommentDots} />
        <MenuItem to="/contacts" icon={faUsers} />
        <MenuItem to="/files" icon={faFolder} />
        <MenuItem to="/notes" icon={faStickyNote} />
        <MenuItem icon={faEllipsisH} />
        <MenuItem
          to="/settings"
          icon={faCog}
          css={`
            align-self: end;
          `}
        />
      </MenuItems>
    </StyledNavBar>
  );
}

function MenuItem({ to, icon, showBadge, ...rest }) {
  const loc = useLocation();
  const active = !!matchPath(loc.pathname, {
    path: to,
    exact: to === "/",
  });
  return (
    <StyledMenuItem active={active} {...rest}>
      <Link to={to}>
        <Badge show={showBadge}>
          <MenuIcon active={active} icon={icon} />
        </Badge>
      </Link>
    </StyledMenuItem>
  );
}

NavBar.propTypes = {};

export default NavBar;

export { MenuItem };
```

编辑 `src/components/NavBar/style.js `：

```js
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { activeBar } from "utils/mixins";
import StyledAvatar, { StatusIcon } from "components/Avatar/style";

const StyledMenuItem = styled.div`
  & > a {
    width: 100%;
    height: 74px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${activeBar()};
    ${({ active }) => (active ? "" : `&::before, &::after {height: 0}`)};

    &:hover {
      /* 指示条动画 */
      ::before,
      ::after {
        height: 100%;
      }

      /* 图标动画 */
      svg {
        transform: scale(1.2);
        opacity: 1;
      }
    }
  }
`;

const MenuIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 24px;
  opacity: ${({ active }) => (active ? 1 : 0.3)};

  transform: scale(1);
  transition: 0.4s;
`;

const StyledNavBar = styled.nav`
  display: grid;
  grid-template-rows: 1fr 4fr;
  width: 100px;
  height: 100vh;
  background-color: ${({ theme }) => theme.darkPurple};
  padding: 30px 0;

  ${StyledAvatar} {
    justify-self: center;
    ${StatusIcon} {
      &::before {
        background-color: ${({ theme }) => theme.darkPurple};
      }
    }
  }
`;

const MenuItems = styled.div`
  display: grid;
  grid-template-rows: repeat(5, minmax(auto, 88px)) 1fr;
`;

export default StyledNavBar;

export { MenuIcon, StyledMenuItem, MenuItems };
```

### 三、配置内容区域路由

编辑 `src/components/ChatApp/index.js` 文件：

```bash
import React, { useState } from "react";
import PropTypes from "prop-types";
import StyledChatApp, { Nav, Sidebar, Drawer, Content } from "./style";
import NavBar from "components/NavBar";
import MessageList from "components/MessageList";
import Conversation from "components/Conversation";
import Profile from "components/Profile";
import { Route, Switch } from "react-router-dom";
import ContactList from "components/ContactList";
import FileList from "components/FileList";
import NoteList from "components/NoteList";
import EditProfile from "components/EditProfile";
import Settings from "components/Settings";
import BlockedList from "components/BlockedList";
import VideoCall from "components/VideoCall";

function ChatApp({ children, ...rest }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [videoCalling, setVideoCalling] = useState(false);
  return (
    <StyledChatApp {...rest}>
      <Nav>
        <NavBar />
      </Nav>
      <Sidebar>
        <Switch>
          <Route exact path="/">
            <MessageList />
          </Route>
          <Route exact path="/contacts">
            <ContactList />
          </Route>
          <Route exact path="/files">
            <FileList />
          </Route>
          <Route exact path="/notes">
            <NoteList />
          </Route>
          <Route path="/settings">
            <EditProfile />
          </Route>
        </Switch>
      </Sidebar>
      <Content>
        {videoCalling && (
          <VideoCall onHangOffClicked={() => setVideoCalling(false)} />
        )}
        <Switch>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/settings/blocked">
            <BlockedList />
          </Route>
          <Route path="/">
            <Conversation
              onAvatarClick={() => setShowDrawer(true)}
              onVideoClicked={() => setVideoCalling(true)}
            />
          </Route>
        </Switch>
      </Content>
      <Drawer show={showDrawer}>
        <Profile onCloseClick={() => setShowDrawer(false)} />
      </Drawer>
    </StyledChatApp>
  );
}

ChatApp.propTypes = {
  children: PropTypes.any,
};

export default ChatApp;
```

编辑 `src/components/ChatApp/Settings/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledSettings, {
  StyledSettingsItem,
  SettingsItemControl,
  StyledSettingsGroup,
} from "./style";
import { ReactComponent as ArrowMenuRight } from "assets/icon/arrowMenuRight.svg";
import Paragraph from "components/Paragraph";
import Switch from "components/Switch";
import Icon from "components/Icon";
import Seperator from "components/Seperator";
import { Link } from "react-router-dom";
import "styled-components/macro";

function Settings({ children, ...rest }) {
  return (
    <StyledSettings {...rest}>
      <SettingsGroup groupName="隐私设置">
        <SettingsItem label="添加好友时需要验证" />
        <SettingsItem
          label="推荐通讯录好友"
          description="上传的通讯录只用来匹配好友列表，本应用不会记录和发送任何信息给其它机构或"
        />
        <SettingsItem label="只能通过手机号找到我" />
      </SettingsGroup>
      <SettingsGroup groupName="通知设置">
        <SettingsItem label="新消息通知" />
        <SettingsItem label="语音和视频通话提醒" />
        <SettingsItem label="显示通知详情" />
        <SettingsItem label="声音" />
        <Link
          to={`/settings/blocked`}
          css={`
            text-decoration: none;
            color: inherit;
          `}
        >
          <SettingsItem label="查看已静音的好友列表" type="menu" />
        </Link>
      </SettingsGroup>
    </StyledSettings>
  );
}

function SettingsGroup({ groupName, children, ...rest }) {
  return (
    <StyledSettingsGroup>
      <Paragraph size="xxlarge" style={{ paddingBottom: "24px" }}>
        {groupName}
      </Paragraph>
      {children}
    </StyledSettingsGroup>
  );
}

export function SettingsItem({
  type = "switch",
  label,
  description,
  children,
  ...rest
}) {
  return (
    <StyledSettingsItem {...rest}>
      <SettingsItemControl>
        <Paragraph size="large">{label}</Paragraph>
        {type === "switch" && <Switch />}
        {type === "menu" && <Icon icon={ArrowMenuRight} />}
      </SettingsItemControl>

      {description && (
        <Paragraph type="secondary" style={{ margin: "4px 0" }}>
          {description}
        </Paragraph>
      )}

      <Seperator style={{ marginTop: "8px", marginBottom: "20px" }} />
    </StyledSettingsItem>
  );
}

Settings.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.any,
};

export default Settings;
```

编辑 `src/components/ChatApp/BlockedList/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledBlockedList, {
  SettingsMenu,
  ClosableAvatar,
  BlockedAvatar,
  CloseIcon,
  BlockedName,
  FriendList,
} from "./style";
import { ReactComponent as ArrowMenuLeft } from "assets/icon/arrowMenuLeft.svg";
import { ReactComponent as closeCircle } from "assets/icon/closeCircle.svg";
import face from "assets/images/face-male-1.jpg";
import "styled-components/macro";
import Icon from "components/Icon";
import Text from "components/Text";
import { useHistory } from "react-router-dom";

function BlockedList({ children, ...rest }) {
  const history = useHistory();
  return (
    <StyledBlockedList {...rest}>
      <SettingsMenu>
        <Icon
          icon={ArrowMenuLeft}
          css={`
            cursor: pointer;
          `}
          onClick={() => history.goBack()}
        />
        <Text size="xxlarge">已屏蔽的好友</Text>
      </SettingsMenu>
      <FriendList>
        {new Array(8).fill(0).map((_, i) => {
          return (
            <ClosableAvatar key={i}>
              <BlockedAvatar size="105px" src={face} />
              <CloseIcon width={46} height={51} icon={closeCircle} />
              <BlockedName>李浩</BlockedName>
            </ClosableAvatar>
          );
        })}
      </FriendList>
    </StyledBlockedList>
  );
}

BlockedList.propTypes = {
  children: PropTypes.any,
};

export default BlockedList;
```

修改 `src/components/ChatApp/style.js `：：

```js
import styled, { css } from "styled-components";

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
  width: 0;
  ${({ show }) =>
    show &&
    css`
      width: 310px;
    `}
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

在 `src/components/Conversation/index.js` 添加 `onAvatarClick` 和 `onVideoClicked` 属性：

```js
function Conversation({ onAvatarClick, onVideoClicked, children, ...rest }) {
  return (
    <StyledConversation {...rest}>
      <TitleBar onAvatarClick={onAvatarClick} onVideoClicked={onVideoClicked}/>
```

在 `src/components/TitleBar/index.js` 添加 `onAvatarClick` 属性：

```js
function TitleBar({ onAvatarClick, onVideoClicked, children, ...rest }) {
  return (
    <StyledTitleBar {...rest}>
      <Avatar onClick={onAvatarClick} status="offline" src={face} />
      <Title>
     。。。   
<Actions>
		<Icon opacity={0.3} icon={Call} onVideoClicked={onVideoClicked} />
```
