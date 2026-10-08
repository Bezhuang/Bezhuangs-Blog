---
title: ChatUI-React 侧边栏
date: 2022-10-05
references: 
  - title: React 即时通信 UI 实战
    url: https://study.163.com/course/courseMain.htm?courseId=1210022809&share=1&shareId=1030428673
categories: 前端开发
tags: [ChatUI, React, 组件开发]
---

> React 即时通信 UI 实战第五章。React 即时通信 UI 实战为[峰华前端工程师](https://www.bilibili.com/video/BV1PK4y1b7bY?p=2&spm_id_from=pageDriver&vd_source=0965c74096f788f105780e5d5d0e9ebf)推出的 React 实战课程，以聊天（即时通信）为原型，构建了一整套的 UI 组件库，课程重点在于 UI 组件的分析和实现，力求打造自用组件库。本章包括侧边栏中的搜索框、排版、下拉选项、消息卡片等组件。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、搜索框开发

搜索框是一种特殊的 Input 组件，所以先使用 Hygen 创建一个基础 Input 组件：

```bash
hygen component new Input
```

在 `index.js` 文件中编辑基础 Input 组件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledInput, { InputContainer, Prefix, Suffix } from "./style";

function Input({ placeholder = "请输入内容", prefix, suffix, ...rest }) {
  return (
    <InputContainer>
      {prefix && <Prefix>{prefix}</Prefix>}
      <StyledInput placeholder={placeholder} />
      {suffix && <Suffix>{suffix}</Suffix>}
    </InputContainer>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  prefix: PropTypes.any,
  suffix: PropTypes.any,
};

export default Input;
```

再在 `style.js` 中修改样式：

```js
import styled from "styled-components";

const StyledInput = styled.input`
    width: 100%;
    height: 48px;
    border: none;
    background: none;
    color: ${({ theme }) => theme.grayDark};
    font-size: ${({ theme }) => theme.medium};
    display: block;
    &::placeholder {
        color: ${({ theme }) => theme.gray3};
    }
`;

const Prefix = styled.div`
    margin-right: 16px;
`;

const Suffix = styled.div`
    margin-left: 16px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.gray2};
    border-radius: 24px;
    padding: 0 30px;
`;

export default StyledInput;
export { Prefix, Suffix, InputContainer };
```

再在 `index.js` 中继续添加搜索框组件：

```js
import { ReactComponent as SearchIcon } from "assets/icon/search.svg";
import { useTheme } from "styled-components";

function Search({ placeholder = "请输入搜索内容...", ...rest }) {
  const theme = useTheme();
  return (
    <Input placeholder={placeholder} prefix={ <Icon icon={SearchIcon} color={theme.gray3} width={18} height={18} /> } {...rest} />
  );
}

Input.Search = Search;
```

最后编辑 `input.stories.js` 文件：

```js
import Icon from "components/Icon";
import React from "react";
import Input from ".";
import { ReactComponent as ClipIcon } from "assets/icon/clip.svg";
import { ReactComponent as SmileIcon } from "assets/icon/smile.svg";

export default {
  title: "UI 组件/Input",
  component: Input
};

export const Default = () => <Input />;

export const Search = () => <Input.Search />;

export const WithAffix = () => (
  <Input
    prefix={<Icon icon={ClipIcon} color="#cccccc" />}
    suffix={<Icon icon={SmileIcon} color="#cccccc" />}
  />
);
```

点击搜索框会有浏览器自带的 border 边框，在全局 index.css 中添加样式去除：

```css
input, button, select {
    outline: none;
}
```

### 二、排版组件

排版组件用于表示行内文本、段落、标题，首先编写行内文本组件：

```bash
hygen component new Text
```

编辑 `index.js` 文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledText from "./style";

function Text({ children, type = "primary", size = "normal", bold, ...rest }) {
  return (
    <StyledText type={type} size={size} bold={bold} {...rest}>
      {children}
    </StyledText>
  );
}

Text.propTypes = {
  children: PropTypes.any,
  type: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf([ "xxsmall", "xsmall", "small", "normal", "medium", "large", "xlarge", "xxlarge", ]),
  bold: PropTypes.bool,
};

export default Text;
```

在 `style.js` 中编写样式：

```js
import styled, { css } from "styled-components";

const typeVariants = {
  primary: css`
    color: ${({ theme }) => theme.grayDark};
  `,
  secondary: css`
    color: ${({ theme }) => theme.grayDark};
    opacity: 0.3;
  `,
  danger: css`
    color: ${({ theme }) => theme.red};
  `,
};

const sizeVariants = {
  normal: css`
    ${({ theme }) => theme.normal}
  `,
  medium: css`
    ${({ theme }) => theme.medium}
  `,
  large: css`
    ${({ theme }) => theme.large}
  `,
  xlarge: css`
    ${({ theme }) => theme.xlarge}
  `,
  xxlarge: css`
    ${({ theme }) => theme.xxlarge}
  `,
  small: css`
    ${({ theme }) => theme.small}
  `,
  xsmall: css`
    ${({ theme }) => theme.xsmall}
  `,
  xxsmall: css`
    ${({ theme }) => theme.xxsmall}
  `,
};

const StyledText = styled.span`
  font-size: ${({ size }) => sizeVariants[size] || sizeVariants.normal};
  ${({ type }) => typeVariants[type]};
  ${({ bold }) => bold && `font-weight: 500`};
`;

export default StyledText;
```

最后编辑 story.js 文件：

```js
import React from "react";
import Text from ".";

export default {
  title: "排版/Text",
  component: Text,
};

export const Default = () => <Text>默认</Text>;

export const Secondary = () => <Text type="secondary">次要文本</Text>;

export const Medium = () => <Text size="medium">medium 大小文本</Text>;

export const LargeAndBold = () => (
  <Text size="large" bold>
    large 大小文本，加粗
  </Text>
);
```

紧接着编写 Paragraph 段落组件：

```bash
hygen component new Paragraph
```

编辑段落 index.js 组件格式：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledParagraph from "./style";

function Paragraph({ children, ellipsis, ...rest }) {
  return (
    <StyledParagraph as="p" ellipsis={ellipsis} {...rest}>
      {children}
    </StyledParagraph>
  );
}

Paragraph.propTypes = {
  children: PropTypes.any,
  ellipsis: PropTypes.bool,
  type: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf([ "xxsmall", "xsmall", "small", "normal", "medium", "large", "xlarge", "xxlarge", ]),
};

export default Paragraph;
```

在 `style.js` 文件中编写样式：

```js
import StyledText from "components/Text/style";
import styled, { css } from "styled-components";

const StyledParagraph = styled(StyledText)`
    ${({ ellipsis }) => ellipsis &&
        css`
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `}
`;

export default StyledParagraph;
```

接下来在 `paragraph.stories.js` 中编写 Paragraph 的 stories：

```js
import React from "react";
import Paragraph from ".";

export default {
  title: "排版/Paragraph",
  component: Paragraph,
};

export const Default = () => (
  <>
    <Paragraph>这是一个段落</Paragraph>
    <Paragraph>这是一个段落</Paragraph>
  </>
);

export const Ellipsis = () => (
  <Paragraph ellipsis>
    这是一个很长的段落这是一个很长的段落这是一个很长的段落这是一个很长的段落这是一个很长的段落这是一个很长的段落这是一个很长的段落这是一个很长的段落这是一个很长的段落这是一个很长的段落这是一个很长的段落
  </Paragraph>
);
```

段落之间存在空行，在全局 index.css 中添加全局样式：

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

最后再创建一个 Headings 组件：

```bash
hygen component new Heading
```

在此目录下的 `index.js` 中让 Headings 接收一个 `level` 属性，表示 h1 ~ h6 标签：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledHeading from "./style";

function Heading({ children, level, ...rest }) {
  return (
    <StyledHeading as={`h${level}`} {...rest}>
      {children}
    </StyledHeading>
  );
}

Heading.propTypes = {
  children: PropTypes.any,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
};

export default Heading;
```

文本标签使用默认样式即可，直接编写 `heading.stories.js` 文件：

```js
import React from "react";
import Heading from ".";

export default {
  title: "排版/Heading",
  component: Heading,
};

export const H1 = () => <Heading level={1}>这是标题</Heading>;
export const H2 = () => <Heading level={2}>这是标题</Heading>;
export const H3 = () => <Heading level={3}>这是标题</Heading>;
export const H4 = () => <Heading level={4}>这是标题</Heading>;
export const H5 = () => <Heading level={5}>这是标题</Heading>;
export const H6 = () => <Heading level={6}>这是标题</Heading>;
```

### 三、过滤下拉菜单组件

侧边栏中的过滤选项以下拉列表组件形式存在，创建下拉列表组件：

```bash
hygen component new Select
hygen component new Option
```

由于 Option 组件只是对 HTML 标签 option 简单封装，所以删除 `option.stories.js` 文件，将 `components/Option/style.js` 文件编辑为：

```js
import styled from "styled-components";

const StyledOption = styled.option``;

export default StyledOption;
```

在 `components/Select/style.js` 中编写组件样式：

```js
import styled from "styled-components";
import CaretDown from "assets/icon/caret_down.svg";

const StyledSelect = styled.select`
  appearance: none;
  background-image: url(${CaretDown});
  background-repeat: no-repeat;
  background-position: right center;
  background-color: transparent;
  border: none;
  padding-right: 14px;
  font-size: ${({ theme }) => theme.normal};
  color: ${({ theme }) => theme.grayDark};

  ::-ms-expand {
    display: none;
  }
`;

export default StyledSelect;
```

在 `components/Select/select.stories.js` 中编写组件 stories：

```js
import React from "react";
import Select from ".";
import Option from "components/Option";

export default {
  title: "UI 组件/Input/Select",
  component: Select,
};

export const Default = () => (
  <Select>
    <Option>最新消息优先</Option>
    <Option>在线好友优先</Option>
  </Select>
);
```

### 四、动作按钮组件

在 Material Design 设计规范中，谷歌提出了悬浮响应按钮（Floating action button）控件的基本准则规范，分为圆形和矩形按钮两种。先删除全局中的 `Button.js` 以及 `App.js` 中的示例，使用 Hygen 创建一个新的 Button 组件：

```bash
hygen component new Button
```

在 `index.js` 中编写组件结构：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledButton from "./style";

function Button({ children, type = "primary", shape = "circle", size = "30px", bgColor, ...rest }) {
  return (
    <StyledButton type={type} shape={shape} size={size} bgColor={bgColor} {...rest}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.oneOf(["primary"]),
  shape: PropTypes.oneOf(["circle", "rect"]),
  size: PropTypes.string,
};

export default Button;
```

在 style.js 文件中编写样式，注意按钮一般为行内元素：

```js
import styled, { css } from "styled-components";

const shapeVariants = {
  circle: css`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `,
  rect: css`
    padding: 12px 18px;
    border-radius: 6px;
  `,
};

const typeVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.primaryColor};
    color: white;
  `,
};

const StyledButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  ${({ shape }) => shapeVariants[shape]}
  ${({ type }) => typeVariants[type]}
  ${({ bgColor }) => `background-color: ${bgColor}`};

  transform: scale(1);
  transition: 0.4s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

export default StyledButton;
```

在 `button.stories.js` 中编写 story，分别为圆角矩形和圆形按钮：

```js
import React from "react";
import Button from ".";

import { ReactComponent as Plus } from "assets/icon/plus.svg";
import Icon from "components/Icon";

export default {
  title: "UI 组件/Button",
  component: Button,
};

export const RectButton = () => <Button shape="rect">默认按钮</Button>;

export const CircleButton = () => (
  <Button>
    <Icon icon={Plus} width={12} height={12} />
  </Button>
);
```

### 五、过滤选项组件

过滤选项组件分为下拉菜单组件和动作按钮组件，即前两部分叠加。创建一个 Filter 组件：

```bash
hygen component new Filter
```

在 `index.js` 中将 Filters 和 Action 作为 Filter 组件的子组件导出：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledFilter, { Filters, Action } from "./style";
import Text from "components/Text";

function Filter({ children, ...rest }) {
  return <StyledFilter {...rest}>{children}</StyledFilter>;
}

Filter.Filters = ({ children, label, ...rest }) => (
  <Filters {...rest}>
    <Text type="secondary">{label}：</Text>
    {children}
  </Filters>
);
Filter.Action = ({ children, label, ...rest }) => (
  <Action {...rest}>
    <Text type="secondary">{label}</Text>
    {children}
  </Action>
);

Filter.propTypes = {
  children: PropTypes.any,
};

export default Filter;
```

在 `style.js` 中编写样式，使用 Grid 布局：

```js
import styled from "styled-components";
import StyledText from "components/Text/style";

const Filters = styled.div``;

const Action = styled.div`
  justify-self: end;
  ${StyledText} {
    padding-right: 1rem;
  }
`;

const StyledFilter = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
`;

export default StyledFilter;
export { Filters, Action };
```

最后编写 stories 示例：

```js
import React from "react";
import Filter from ".";
import Select from "components/Select";
import Option from "components/Option";
import Button from "components/Button";
import Icon from "components/Icon";

import { ReactComponent as Plus } from "assets/icon/plus.svg";

export default {
  title: "UI 组件/Filter",
  component: Filter,
};

export const Default = () => (
  <Filter>
    <Filter.Filters label="列表排序">
      <Select>
        <Option>最新消息优先</Option>
        <Option>在线好友优先</Option>
      </Select>
    </Filter.Filters>

    <Filter.Action label="创建会话">
      <Button>
        <Icon icon={Plus} width={12} height={12} />
      </Button>
    </Filter.Action>
  </Filter>
);
```

### 六、消息卡片组件

创建消息卡片组件：

```bash
hygen component new MessageCard
```

打开全局 `utils/mixins.js` 添加编写通用卡片样式：

```js
export const card = (radius = "6px", padding = "20px 30px") => css`
  padding: ${padding};
  background: ${({ theme }) => theme.background};
  box-shadow: 0px 18px 40px 0px rgba(0, 0, 0, 0.04);
  border-radius: ${radius};
`;
```

编写 `MessageCard/index.js` 文件，其中包含激活状态和已回复状态：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledMessageCard, {
  Name,
  Status,
  Time,
  Message,
  MessageText,
  UnreadBadge,
} from "./style";
import Avatar from "components/Avatar";
import { useTheme } from "styled-components";

import { ReactComponent as Replied } from "assets/icon/replied.svg";
import Icon from "components/Icon";

function MessageCard({
  avatarSrc,
  avatarStatus,
  statusText,
  name,
  time,
  message,
  unreadCount,
  active,
  replied,
  children,
  ...rest
}) {
  const theme = useTheme();

  return (
    <StyledMessageCard active={active} {...rest}>
      <Avatar status={avatarStatus} src={avatarSrc} />
      <Name>{name}</Name>
      <Status>{statusText}</Status>
      <Time>{time}</Time>
      <Message replied={replied}>
        {replied && (
          <Icon
            width={16}
            height={14}
            icon={Replied}
            color={active ? theme.inactiveColorDark : theme.inactiveColor}
            opacity={active ? 0.4 : 1}
            style={{
              justifyContent: "start",
            }}
          />
        )}
        <MessageText>{message}</MessageText>
        <UnreadBadge count={unreadCount} />
      </Message>
    </StyledMessageCard>
  );
}

MessageCard.propTypes = {
  avatarSrc: PropTypes.string.isRequired,
  avatarStatus: PropTypes.any,
  statusText: PropTypes.any,
  name: PropTypes.any,
  time: PropTypes.any,
  message: PropTypes.any,
  unreadCount: PropTypes.number,
  active: PropTypes.bool,
  replied: PropTypes.bool,
  children: PropTypes.any,
};

export default MessageCard;
```

编写样式 `style.js` 文件：

```js
import styled, { css } from "styled-components";
import Text from "components/Text";
import Paragraph from "components/Paragraph";
import Badge from "components/Badge";
import { card, activeBar } from "utils/mixins";
import StyledAvatar from "components/Avatar/style";

const Name = styled(Text).attrs({ size: "large" })`
  grid-area: name;
`;

const Time = styled(Text).attrs({ size: "medium", type: "secondary" })`
  grid-area: time;
  justify-self: end;
`;

const Status = styled(Text).attrs({ type: "secondary" })`
  grid-area: status;
`;

const Message = styled.div`
  grid-area: message;
  display: grid;
  grid-template-columns: 1fr 30px;
  align-items: center;
  ${({ replied }) =>
        replied &&
        css`
      grid-template-columns: 24px 1fr 30px;
    `}
`;

const MessageText = styled(Paragraph).attrs({ ellipsis: true })``;

const UnreadBadge = styled(Badge)`
  justify-self: end;
`;

const StyledMessageCard = styled.div`
  ${card()};
  display: grid;
  grid-template-areas:
    "avatar name time"
    "avatar status status"
    "message message message";
  grid-template-columns: 64px 1fr 1fr;
  row-gap: 16px;
  background: ${({ theme }) => theme.background};
  transition: 0.4s;
  &:hover {
    box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.1);
  }

  ${StyledAvatar} {
    grid-area: avatar;
  }

  ${({ active }) =>
        active &&
        css`
      background: ${({ theme }) => theme.darkPurple};
      ${Name}, ${Status}, ${Time}, ${MessageText} {
        color: white;
      }
      ${Status}, ${Time} {
        opacity: 0.4;
      }
      ${activeBar({ barWidth: "4px", shadowWidth: "14px" })}

      /* 隐藏指示条露在外边的部分 */
      overflow: hidden;`}
`;

export default StyledMessageCard;
export { Name, Time, Status, Message, MessageText, UnreadBadge };
```

最后在 `messageCard.stories.js` 中将四种状态的卡片分别编辑 stories：

```js
import React from "react";
import MessageCard from ".";

import face1 from "assets/images/face-male-1.jpg";

export default {
  title: "UI 组件/MessageCard",
  component: MessageCard,
};

export const Default = () => (
  <MessageCard
    avatarSrc={face1}
    name="李铭浩"
    avatarStatus="online"
    statusText="在线"
    time="3 小时之前"
    message="即使爬到最高的山上，一次也只能脚踏实地地"
    unreadCount={2}
  />
);

export const Active = () => (
  <MessageCard
    avatarSrc={face1}
    name="李铭浩"
    avatarStatus="online"
    statusText="在线"
    time="3 小时之前"
    message="即使爬到最高的山上，一次也只能脚踏实地地"
    unreadCount={2}
    active
  />
);

export const Replied = () => (
  <MessageCard
    avatarSrc={face1}
    name="李铭浩"
    avatarStatus="online"
    statusText="在线"
    time="3 小时之前"
    message="即使爬到最高的山上，一次也只能脚踏实地地"
    unreadCount={2}
    active
    replied
  />
);

export const RepliedInactive = () => (
  <MessageCard
    avatarSrc={face1}
    name="李铭浩"
    avatarStatus="online"
    statusText="在线"
    time="3 小时之前"
    message="即使爬到最高的山上，一次也只能脚踏实地地"
    unreadCount={2}
    replied
  />
);
```

### 七、消息列表组件

将以上所有组件组装起来就是消息列表（侧边栏）组件：

```bash
hygen component new MessageList
```

在 index.js 中编辑组件结构：

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

function MessageList({ children, ...rest }) {
  return (
    <StyledMessageList {...rest}>
      <Input.Search />
      <ChatFilter />
      <ChatList>
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <MessageCard
            key={index}
            active={index === 3}
            replied={index % 3 === 0}
            avatarSrc={face1}
            name="李铭浩"
            avatarStatus="online"
            statusText="在线"
            time="3 小时之前"
            message="即使爬到最高的山上，一次也只能脚踏实地地"
            unreadCount={2}
          />
        ))}
      </ChatList>
    </StyledMessageList>
  );
}

function ChatFilter() {
  return (
    <Filter style={{ padding: "20px 0" }}>
      <Filter.Filters label="列表排序" >
        <Select>
          <Option>最新消息优先</Option>
          <Option>在线好友优先</Option>
        </Select>
      </Filter.Filters >

      <Filter.Action label="创建会话">
        <Button>
          <Icon icon={Plus} width={12} height={12} />
        </Button>
      </Filter.Action>
    </Filter>
  );
}

MessageList.propTypes = {
  children: PropTypes.any,
};

export default MessageList;
```

并在 `style.js` 中编写样式：

```js
import styled from "styled-components";
import StyledMessageCard from "components/MessageCard/style";

const ChatList = styled.div`
  ${StyledMessageCard} {
    margin-bottom: 20px;
  }
`;

const StyledMessageList = styled.div``;

export default StyledMessageList;
export { ChatList };
```

最后在 `messageList.stories.js` 中导出：

```js
import React from "react";
import MessageList from ".";

export default {
  title: "页面组件/MessageList",
  component: MessageList,
};

export const Default = () => <MessageList />;
```
