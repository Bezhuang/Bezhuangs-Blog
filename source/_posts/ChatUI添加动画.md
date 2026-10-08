---
title: ChatUI-React 添加动画
date: 2023-01-20
references: 
  - title: React 即时通信 UI 实战
    url: https://study.163.com/course/courseMain.htm?courseId=1210022809&share=1&shareId=1030428673
categories: 前端开发
tags: [ChatUI, React, 动画]
---

> React 即时通信 UI 实战第十二章。React 即时通信 UI 实战为[峰华前端工程师](https://www.bilibili.com/video/BV1PK4y1b7bY?p=2&spm_id_from=pageDriver&vd_source=0965c74096f788f105780e5d5d0e9ebf)推出的 React 实战课程，以聊天（即时通信）为原型，构建了一整套的 UI 组件库，课程重点在于 UI 组件的分析和实现，力求打造自用组件库。本章是使用 React-Spring 动画库为项目添加动画。

<!--more-->

### 一、React Spring 简介

[React Spring](https://www.react-spring.dev/) 是 React 官方推荐的动画组件，它支持对单个组件设置一个或多个动画效果，也可以设计多个组件间切换的效果。

-   `useSpring`：创建一个单独的简单动画 `Spring`，从 a→b 移动数据的单个弹簧。
-   `useSprings`：创建一组同时执行的 `Spring`，多个不同弹簧，用于列表，每个弹簧从 a→b 移动数据。
-   `useTrail`：创建一组依次执行的 `Spring`，多个相同弹簧，一个弹簧在另一个弹簧之后/跟随。
-   `useTransition`：添加组件 `mounted/unmounted` 等生命周期变化时的动画
-   `useChain`：用于自定义 `Spring` 执行顺序，将多个动画排队或连接在一起

```
yarn add react-spring
```

### 二、Staggered Animation 配置

每个列表中的项目都是按照一定的时间间隔，顺序执行动画，打到一种堆叠的效果。

抽离动画为自定义的 `hooks`，新建 `src/hooks/useStaggeredList.js` 文件：

```js
import { useTrail } from "react-spring";

export default function useStaggeredList(number) {
  const trailAnimes = useTrail(number, {
    transform: "translate3d(0px, 0px, 0px)",
    from: { transform: "translate3d(-50px, 0px, 0px)" },
    config: {
      mass: 0.8,
      tension: 280,
      friction: 20,
    },
    // delay: 200,
  });

  return trailAnimes;
}
```

编辑 `src/components/MessageList/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledMessageList, { ChatList } from "./style";

import { ReactComponent as Plus } from "assets/icon/plus.svg";
import Filter from "components/Filter";
import Select from "components/Select";
import Option from "components/Option";
import Button from "components/Button";
import Icon from "components/Icon";
import Input from "components/Input";
import MessageCard from "components/MessageCard";

import face1 from "assets/images/face-male-1.jpg";
import FilterList from "components/FilterList";
import { useTrail, animated } from "react-spring";
import useStaggeredList from "hooks/useStaggeredList";
import messageData from "data/messages";

function MessageList({ children, ...rest }) {
  const trailAnimes = useStaggeredList(6);

  return (
    <StyledMessageList {...rest}>
      <FilterList
        options={["最新消息优先", "在线好友优先"]}
        actionLabel="创建会话"
      >
        <ChatList>
          {messageData.map((message, index) => (
            <animated.div key={message.id} style={trailAnimes[index]}>
              <MessageCard
                key={message.id}
                active={index === 3}
                replied={message.replied}
                avatarSrc={message.avatarSrc}
                name={message.name}
                avatarStatus={message.status}
                statusText={message.statusText}
                time={message.time}
                message={message.message}
                unreadCount={message.unreadCount}
              />
            </animated.div>
          ))}
        </ChatList>
      </FilterList>
    </StyledMessageList>
  );
}

MessageList.propTypes = {
  children: PropTypes.any,
};

export default MessageList;
```

编辑 `src/components/ContactList/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledContactList, { Contacts } from "./style";
import FilterList from "components/FilterList";
import ContactCard from "components/ContactCard";
import useStaggeredList from "hooks/useStaggeredList";
import { animated } from "react-spring";

import contactsData from "data/contacts";

function ContactList({ children, ...rest }) {
  const trailAnimes = useStaggeredList(10);
  return (
    <StyledContactList {...rest}>
      <FilterList options={["新添加优先", "按姓名排序"]} actionLabel="添加好友">
        <Contacts>
          {contactsData.map((contact, i) => (
            <animated.div key={contact.id} style={trailAnimes[i]}>
              <ContactCard key={contact.id} contact={contact} />
            </animated.div>
          ))}
        </Contacts>
      </FilterList>
    </StyledContactList>
  );
}

ContactList.propTypes = {
  children: PropTypes.any,
};

export default ContactList;
```

编辑 `src/components/FileList/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledFileList, { Files } from "./style";
import FilterList from "components/FilterList";
import FileCard from "components/FileCard";
import useStaggeredList from "hooks/useStaggeredList";
import { animated } from "react-spring";
import fileData from "data/files";

function FileList({ children, ...rest }) {
  const trailAnimes = useStaggeredList(10);
  return (
    <StyledFileList {...rest}>
      <FilterList options={["最新文件优先", "按文件名排序"]}>
        <Files>
          {fileData.map((file, i) => (
            <animated.div key={file.id} style={trailAnimes[i]}>
              <FileCard key={file.id} file={file} />
            </animated.div>
          ))}
        </Files>
      </FilterList>
    </StyledFileList>
  );
}

FileList.propTypes = {
  children: PropTypes.any,
};

export default FileList;
```

编辑 `src/components/NoteList/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledNoteList, { Notes } from "./style";
import FilterList from "components/FilterList";
import NoteCard from "components/NoteCard";
import useStaggeredList from "hooks/useStaggeredList";
import { animated } from "react-spring";
import noteData from "data/notes";

function NoteList({ children, ...rest }) {
  const trailAnimes = useStaggeredList(10);
  return (
    <StyledNoteList {...rest}>
      <FilterList
        options={["最新笔记优先", "有改动的优先"]}
        actionLabel="添加笔记"
      >
        <Notes>
          {noteData.map((note, i) => (
            <animated.div key={note.id} style={trailAnimes[i]}>
              <NoteCard key={note.id} note={note} />
            </animated.div>
          ))}
        </Notes>
      </FilterList>
    </StyledNoteList>
  );
}

NoteList.propTypes = {
  children: PropTypes.any,
};

export default NoteList;
```

### 三、导航切换过渡动画

编辑 `src/components/ChatApp/index.js`  文件：

```bash
import React, { useState } from "react";
import PropTypes from "prop-types";
import StyledChatApp, { Nav, Sidebar, Drawer, Content } from "./style";
import NavBar from "components/NavBar";
import MessageList from "components/MessageList";
import Conversation from "components/Conversation";
import Profile from "components/Profile";
import { Route, Routes, useLocation } from "react-router-dom";
import ContactList from "components/ContactList";
import FileList from "components/FileList";
import NoteList from "components/NoteList";
import EditProfile from "components/EditProfile";
import Settings from "components/Settings";
import BlockedList from "components/BlockedList";
import VideoCall from "components/VideoCall";
import { useTransition, animated } from "react-spring";

function ChatApp({ children, ...rest }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [videoCalling, setVideoCalling] = useState(false);

  const location = useLocation();

  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translate3d(-100px, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-100px, 0, 1)" },
  });

  return (
    <StyledChatApp {...rest}>
      <Nav>
        <NavBar />
      </Nav>
      <Sidebar>
        {transitions(({ item, props }) => (
          <animated.div style={props}>
            <Routes location={item}>
              <Route path="/" element={<MessageList />} />
              <Route path="/contacts" element={<ContactList />} />
              <Route path="/files" element={<FileList />} />
              <Route path="/notes" element={<NoteList />} />
              <Route path="/settings/*" element={<EditProfile />} />
            </Routes>
          </animated.div>
        ))}
      </Sidebar>
      <Content>
        {videoCalling && (
          <VideoCall onHangOffClicked={() => setVideoCalling(false)} />
        )}
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/blocked" element={<BlockedList />} />
          <Route
            path="/"
            element={
              <Conversation
                onAvatarClick={() => setShowDrawer(true)}
                onVideoClicked={() => setVideoCalling(true)}
              />
            }
          />
        </Routes>
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

编辑 `src/components/ChatApp/style.js`  文件：

```js
import styled, { css } from "styled-components";

const Nav = styled.nav`
  flex-shrink: 0;

  position: relative;
  z-index: 100;
`;

const Sidebar = styled.aside`
  max-width: 448px;
  min-width: 344px;
  height: 100vh;
  flex: 1;
  background: ${({ theme }) => theme.grediantGray};

  position: relative;
  z-index: 50;
  > div {
    will-change: transform, opacity;
    position: absolute;
    width: 100%;
  }
`;

const Content = styled.main`
  flex: 2;
  position: relative;
`;

const Drawer = styled.div`
  max-width: 310px;
  width: 0;
  transform: translateX(200px);
  transition: transform 0.4s;
  will-change: width, transform;
  ${({ show }) =>
    show &&
    css`
      width: initial;
      transform: translateX(0px);
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

### 四、会话窗口动画

编辑 `src/components/Conversation/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledConversation, { Conversations, MyChatBubble } from "./style";
import TitleBar from "components/TitleBar";
import ChatBubble from "components/ChatBubble";
import VoiceMessage from "components/VoiceMessage";
import Emoji from "components/Emoji";
import Footer from "components/Footer";
import { useSpring } from "react-spring";

function Conversation({ onAvatarClick, onVideoClicked, children, ...rest }) {
  const tBarAnimeProps = useSpring({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    from: { opacity: 0, transform: "translate3d(0px, -50px, 0px)" },
    delay: 500,
  });

  const convsAnimeProps = useSpring({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    from: { opacity: 0, transform: "translate3d(50px, 0px, 0px)" },
    delay: 600,
  });

  const ftAnimeProps = useSpring({
    opacity: 1,
    transform: "translate3d(0px, 0px, 0px)",
    from: { opacity: 0, transform: "translate3d(0px, 50px, 0px)" },
    delay: 750,
  });

  return (
    <StyledConversation {...rest}>
      <TitleBar
        onVideoClicked={onVideoClicked}
        onAvatarClick={onAvatarClick}
        animeProps={tBarAnimeProps}
      />
      <Conversations style={convsAnimeProps}>
        <ChatBubble time="昨天 下午14：26">Hi 小宇，忙什么呢？</ChatBubble>
        <MyChatBubble time="昨天 下午16：30">
          Hello 啊！最近就是一直在加班改 bug，然后 怼产品，怼 UI，各种怼！
        </MyChatBubble>
        <ChatBubble time="昨天 下午18：30">
          <VoiceMessage time="01:24" />
        </ChatBubble>
        <MyChatBubble time="昨天 下午16：30">
          明天约一把王者荣耀，不连赢5把不罢休 🤘
          <Emoji label="smile">🤘</Emoji>
        </MyChatBubble>
      </Conversations>
      <Footer animeProps={ftAnimeProps} />
    </StyledConversation>
  );
}

Conversation.propTypes = {
  children: PropTypes.any,
};

export default Conversation;
```

编辑 `src/components/Conversation/style.js`  文件：

```js
import styled from "styled-components";
import ChatBubble from "components/ChatBubble";
import { animated } from "react-spring";

const Conversations = styled(animated.div)`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow-y: auto;
  flex: 1;

  & > * {
    margin: 10px 0;
  }
`;

const MyChatBubble = styled(ChatBubble).attrs({ type: "mine" })`
  align-self: flex-end;
`;

const StyledConversation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid ${({ theme }) => theme.gray4};

  & > *:last-child {
    align-self: end;
  }
`;

export default StyledConversation;
export { Conversations, MyChatBubble };
```

编辑 `src/components/Titlebar/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledTitleBar, { Actions, Title } from "./style";

import face from "assets/images/face-male-3.jpg";

import { ReactComponent as Call } from "assets/icons/call.svg";
import { ReactComponent as Camera } from "assets/icons/camera.svg";
import { ReactComponent as Options } from "assets/icons/options.svg";
import Avatar from "components/Avatar";
import Paragraph from "components/Paragraph";
import Text from "components/Text";
import Icon from "components/Icon";
import { DropdownItem } from "components/Dropdown/style";
import Dropdown from "components/Dropdown";
import Seperator from "components/Seperator";

function TitleBar({
  animeProps,
  style,
  onAvatarClick,
  onVideoClicked,
  children,
  ...rest
}) {
  return (
    <StyledTitleBar style={{ ...style, ...animeProps }} {...rest}>
      <Avatar onClick={onAvatarClick} status="offline" src={face} />
      <Title>
        <Paragraph size="large">慕容天宇</Paragraph>
        <Paragraph type="secondary">
          <Text>离线</Text>
          <Text>· 最后阅读：3小时前</Text>
        </Paragraph>
      </Title>
      <Actions>
        <Icon opacity={0.3} icon={Call} onClick={onVideoClicked} />
        <Icon opacity={0.3} icon={Camera} />
        <Dropdown
          content={
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
          }
        >
          <Icon opacity={0.3} icon={Options} />
        </Dropdown>
      </Actions>
    </StyledTitleBar>
  );
}

TitleBar.propTypes = {
  children: PropTypes.any,
};

export default TitleBar;
```

编辑 `src/components/Titlebar/style.js`  文件：

```js
import styled from "styled-components";
import StyledIcon from "components/Icon/style";
import { animated } from "react-spring";

const Title = styled.div`
  display: grid;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${StyledIcon} {
    cursor: pointer;
  }
`;

const StyledTitleBar = styled(animated.div)`
  display: grid;
  grid-template-columns: 62px 1fr 112px;
  padding: 30px;
  max-height: 110px;
  border-bottom: 1px solid ${({ theme }) => theme.gray4};
`;

export default StyledTitleBar;
export { Actions, Title };
```

编辑 `src/components/Footer/index.js`  文件：

```js
import React, { useState } from "react";
import PropTypes from "prop-types";
import StyledFooter, { IconContainer, StyledPopoverContent } from "./style";

import { ReactComponent as ClipIcon } from "assets/icons/clip.svg";
import { ReactComponent as SmileIcon } from "assets/icons/smile.svg";
import { ReactComponent as MicrophoneIcon } from "assets/icons/microphone.svg";
import { ReactComponent as PlaneIcon } from "assets/icons/plane.svg";
import { ReactComponent as OptionsIcon } from "assets/icons/options.svg";
import Input from "components/Input";
import Icon from "components/Icon";
import Button from "components/Button";
import Emoji from "components/Emoji";
import Popover from "components/Popover";
import { useTheme } from "styled-components";

function Footer({ animeProps, style, children, ...rest }) {
  const [emojiIconActive, setEmojiIconActive] = useState(false);
  const theme = useTheme();
  return (
    <StyledFooter style={{ ...style, ...animeProps }} {...rest}>
      <Input
        placeholder="输入想和对方说的话"
        prefix={<Icon icon={ClipIcon} />}
        suffix={
          <IconContainer>
            <Popover
              content={<PopoverContent />}
              offset={{ x: "-25%" }}
              onVisible={() => setEmojiIconActive(true)}
              onHide={() => setEmojiIconActive(false)}
            >
              <Icon
                icon={SmileIcon}
                color={emojiIconActive ? undefined : theme.gray3}
              />
            </Popover>
            <Icon icon={MicrophoneIcon} />
            <Button size="52px">
              <Icon
                icon={PlaneIcon}
                color="white"
                style={{ transform: "translateX(-2px)" }}
              />
            </Button>
          </IconContainer>
        }
      />
    </StyledFooter>
  );
}

/* eslint-disable jsx-a11y/accessible-emoji */
function PopoverContent(props) {
  return (
    <StyledPopoverContent>
      <Emoji label="smile">😊</Emoji>
      <Emoji label="grinning">😆</Emoji>
      <Emoji label="thumbup">👍</Emoji>
      <Emoji label="indexfingerup">☝️</Emoji>
      <Emoji label="ok">👌</Emoji>
      <Emoji label="handsputtogether">🙏</Emoji>
      <Emoji label="smilewithsunglasses">😎</Emoji>
      <Emoji label="flexedbicep">💪</Emoji>
      <Icon icon={OptionsIcon} style={{ marginLeft: "24px" }} />
    </StyledPopoverContent>
  );
}

Footer.propTypes = {
  children: PropTypes.any,
};

export default Footer;
```
