---
title: ChatUI-React 侧导航
date: 2022-09-29
references: 
  - title: React 即时通信 UI 实战
    url: https://study.163.com/course/courseMain.htm?courseId=1210022809&share=1&shareId=1030428673
categories: 前端开发
tags: [ChatUI, React, 组件开发]
---

> React 即时通信 UI 实战第四章。React 即时通信 UI 实战为[峰华前端工程师](https://www.bilibili.com/video/BV1PK4y1b7bY?p=2&spm_id_from=pageDriver&vd_source=0965c74096f788f105780e5d5d0e9ebf)推出的 React 实战课程，以聊天（即时通信）为原型，构建了一整套的 UI 组件库，课程重点在于 UI 组件的分析和实现，力求打造自用组件库。本章包括侧导航中的头像、菜单项等组件。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、头像组件开发

在 `src` 目录下新建 `components/Avatar` 两级文件夹，用于存放组件的定义。文件夹中一般有 `index.js`（组件主体代码）、`style.js`（Styled-components 样式组件代码）、`组件名.stories.js`（组件 stories）、`hook.js`（自定义的 hooks）文件。

在 `index.js` 文件中快捷输入 `rfcp + tab`（reactFunctionalComponentWithPropTypes）导入依赖、创建一个函数式组件、引入propTypes：

```js
import React from 'react'
import PropTypes from 'prop-types'
import face1 from "../../assets/images/face-male-1.jpg";
import StyledAvatar, { StatusIcon, AvatarClip, AvatarImage } from "./style";

function Avatar({ src, size = "48px", status, statusIconSize = "8px", ...rest }) {
    return (
        <StyledAvatar {...rest}>
            {status && <StatusIcon status={status} size={statusIconSize}></StatusIcon>}
            <AvatarClip size={size}>
                <AvatarImage src={src} alt="" />
            </AvatarClip>
        </StyledAvatar>
    )
}

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.string,
    status: PropTypes.oneOf(["online", "offline"]),
    statusIconSize: PropTypes.string,
}

export default Avatar;
```

在 `Avatar` 目录下新建 `avatar.stories.js` 文件：

```js
import React from "react";
import Avatar from ".";
import face1 from "../../assets/images/face-male-1.jpg";
import face2 from "../../assets/images/face-male-2.jpg";
import face3 from "../../assets/images/face-male-3.jpg";
import face4 from "../../assets/images/face-male-4.jpg";

import "../../story.css"

export default {
    title: "UI 组件/Avatar",
    component: Avatar,
}

export const Default = () => {
    return <Avatar src={face1} />
}

export const Sizes = () => {
    return (
        <div className="row-elements">
            <Avatar src={face1} size="48px" />
            <Avatar src={face2} size="56px" />
            <Avatar src={face3} size="64px" />
            <Avatar src={face4} size="72px" />
        </div>
    );
};

export const WithStatus = () => {
    return (
        <div className="row-elements">
            <Avatar src={face1} status="online" />
            <Avatar src={face2} status="offline" />
            <Avatar src={face4} status="offline" size="72px" statusIconSize="12px" />
        </div>
    );
};
```

在 `Avatar` 目录下新建 `style.js` 文件：

```js
import styled, { css } from 'styled-components';

const circleMixinFunc = (color, size = "8px") => css`
    content: "";
        display: block;
        position: absolute;
        width: ${size};
        height: ${size};
        border-radius: 50%;
        background-color: ${color};
`;

const StyledAvatar = styled.div`
    position: relative;
`;

const StatusIcon = styled.div`
    position: absolute;
    left: 2px;
    top: 4px;

    &::before {
        ${({ size }) => circleMixinFunc("white", size)}
        transform: scale(2);
    }

    &::after {
        ${({ theme, status, size }) => {
        if (status === "online") {
            return circleMixinFunc(theme.green, size);
        } else if (status === "offline") {
            return circleMixinFunc(theme.gray, size);
        }
    }}
    }
`;

const AvatarClip = styled.div`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: 50%;
    overflow: hidden;
`;

const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`;

export default StyledAvatar;
export { StatusIcon, AvatarClip, AvatarImage };
```

### 二、jsconfig.json 文件

在 ChatUI 项目根目录下创建 `jsconfig.json` 项目配置文件：

```json
{
    "compilerOptions": {
      "baseUrl": "src"
    },
    "include": ["src"],
    "exclude": ["node_modules", "**/node_modules/*"]
}
```

此时，在 `avatar.stories.js` 文件中导入可用相对路径导入：

```js
import face1 from "assets/images/face-male-1.jpg";
import face2 from "assets/images/face-male-2.jpg";
import face3 from "assets/images/face-male-3.jpg";
import face4 from "assets/images/face-male-4.jpg";
import "story.css"
```

### 三、Hygen 模版生成器配置

安装和初始化 Hygen：

```bash
npm i -g hygen
hygen init self   #在项目目录下初始化
```

生成新 component 模版：

```bash
hygen generator new component
```

配置模版文件，将 `_templates/component/new` 文件夹下的 `hello.ejs.t` 文件重命名为 `index.ejs.t`，并修改模版内容：

```js
---
to: src/components/<%= name %>/index.js
---

import React from "react";
import PropTypes from "prop-types";
import Styled<%= name %> from "./style";

function <%= name %>({children,...rest}) {
  return (
    <Styled<%= name %> {...rest}>
      {children}
    </Styled<%= name %>>
  );
}

<%= name %>.propTypes = {
  children: PropTypes.any
};

export default <%= name %>;
```

同目录下新建 style.ejs.t 文件：

```js
---
to: src/components/<%= name %>/style.js
---

import styled from "styled-components";

const Styled<%= name %> = styled.div``;

export default Styled<%= name %>;
```

和 stories.ejs.t 文件：

```js
---
to: src/components/<%= name %>/<%= h.changeCase.lcFirst(name) %>.stories.js
---

import React from "react";
import <%= name %> from ".";

export default {
  title: "<%= name %>",
  component: <%= name %>
};

export const Default = () => <<%= name %>>默认</<%= name %>>;
```

为下一部分组件生成模版：

```bash
hygen component new Icon
# Loaded templates: _templates
#       added: src/components/Icon/index.js
#       added: src/components/Icon/icon.stories.js
#       added: src/components/Icon/style.js
```

### 四、Icon 组件开发

在 `index.js` 文件中编写组件的结构代码：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledIcon from "./style";

function Icon({ icon: IconComponent, width = 24, height = 24, color, opacity, ...rest }) {
  return (
    <StyledIcon color={color} opacity={opacity} {...rest}>
      {IconComponent && <IconComponent width={width} height={height} />}
    </StyledIcon>
  );
}

Icon.propTypes = {
  icon: PropTypes.element,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  opacity: PropTypes.number,
};

export default Icon;
```

修改 `icon.stories.js` 文件：

```js
import React from "react";
import Icon from ".";
import { ReactComponent as SmileIcon } from "assets/icon/smile.svg";

export default {
  title: "UI 组件/Icon",
  component: Icon
};

export const Default = () => <Icon icon={SmileIcon} />;

export const CustomColor = () => {
  return <Icon icon={SmileIcon} color="#cccccc" />;
};

export const CustomSize = () => {
  return <Icon icon={SmileIcon} width={48} height={48} color="#cccccc" />;
};
```

以及同目录下 `style.js` 文件：

```js
import styled from "styled-components";

const StyledIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg,
  svg * {
    ${({ color }) => (color ? `fill: ${color}` : "")};
    ${({ opacity }) => (opacity ? `opacity: ${opacity}` : "")}
  }
`;

export default StyledIcon;
```

安装 FontAwesome 图标库：

```bash
yarn add @fortawesome/react-fontawesome
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-brands-svg-icons
yarn add @fortawesome/free-regular-svg-icons
yarn add @fortawesome/free-solid-svg-icons
```

在 `icon.stories.js` 文件中添加 `FontAwesome` 测试范例：

```js
import {
  faCommentDots,
  faFolder,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FontAwesome = () => {
  return <FontAwesomeIcon icon={faCommentDots} />;
};

export const FontAwesomeColor = () => {
  return <FontAwesomeIcon icon={faCommentDots} style={{ color: "#cccccc" }} />;
};

export const FontAwesomeSizes = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faFolder} style={{ fontSize: "24px" }} />
      <FontAwesomeIcon icon={faStickyNote} style={{ fontSize: "36px" }} />
      <FontAwesomeIcon icon={faCommentDots} style={{ fontSize: "48px" }} />
    </div>
  );
};
```

### 五、徽章组件

徽章（Badge）组件，即 Icon 组件上的小红点，用来实现提示用户有未读消息的功能，一种组件的不同形态称为变体（Variant），照例使用 Hygen 生成一个名为 Badge 的 component 组件：

```bash
hygen component new Badge
```

在 `index.js` 中修改组件结构：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledBadge, { Count } from "./style";

function Badge({ children, show = false, count = 0, showZero = false, ...rest }) {
  return (
    <StyledBadge variant={children ? "dot" : "default"} show={show} count={count} showZero={showZero} {...rest}>
      {children || <Count>{count}</Count>}
    </StyledBadge>
  );
}

Badge.propTypes = {
  show: PropTypes.bool,
  count: PropTypes.number,
  showZero: PropTypes.bool,
  children: PropTypes.any
};

export default Badge;
```

可以把圆形样式设为通用的样式 Mixin 复用，在 `src` 下新建 `utils` 文件夹，再在二级目录下新建 `mixins.js` 文件：

```js
import { css } from "styled-components";

export const circle = (color, size = "8px") => css`
    width: ${size};
    height: ${size};
    border-radius: 50%;
    background-color: ${color};
`;
```

修改 `src/components/Avatar/style.js` 文件中的 `circleMixinFunc` 函数：

```js
import { circle } from 'utils/mixins';

const circleMixinFunc = (color, size = "8px") => css`
    content: "";
    display: block;
    position: absolute;
    ${circle(color, size)}
`;
```

再在 `Badge/style.js` 中编写徽章组件样式：

```js
import styled, { css } from "styled-components";
import { circle } from "utils/mixins";

const variants = {
  dot: css`
    position: relative;
    padding: 5px;
    &::after {
      display: ${({ show }) => (show ? "block" : "none")};
      content: "";
      ${({ theme }) => circle(theme.red, "6px")}
      position: absolute;
      right: 0;
      top: 0;
    }
  `,
  default: css`
    ${({ theme }) => circle(theme.red, "26px")}
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 18px 40px 0px rgba(0, 0, 0, 0.04),
      0px 6px 12px 0px rgba(0, 0, 0, 0.08);
    ${({ showZero, count }) => !showZero && count === 0 && `visibility: hidden`}
  `,
};

const Count = styled.div`
  font-size: ${({ theme }) => theme.normal};
  color: white;
`;

const StyledBadge = styled.div`
  display: inline-block;
  ${({ variant }) => variants[variant]}
`;

export default StyledBadge;
export { Count };
```

在全局目录下的 style.css 文件中添加：

```css
html {
    font-size: 62.5%;    /* 使得 1rem = 10px */
}
```

并在全局目录下的 `style.css` 文件中导入：

```css
@import url("./index.css");
```

最后更改 `badge.stories.js` 文件：

```js
import React from "react";
import Badge from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "UI 组件/Badge",
  component: Badge,
};

export const Default = () => <Badge count={5} />;

export const DotVariant = () => {
  return (
    <Badge show variant="dot">
      <FontAwesomeIcon icon={faCommentDots} style={{ fontSize: "24px" }} />
    </Badge>
  );
};
```

### 六、菜单项组件

新建侧导航组件：

```bash
hygen component new NavBar
```

在 `index.js` 文件中编写组件结构：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledNavBar, { StyledMenuItem, MenuIcon } from "./style";
import Badge from "components/Badge";

function NavBar({ children, ...rest }) {
  return (
    <StyledNavBar {...rest}>
      {children}
    </StyledNavBar>
  );
}

function MenuItem({ icon, active, showBadge, ...rest }) {
  return (
    <StyledMenuItem active={active} {...rest}>
      <a href="#">
        <Badge show={showBadge}>
          <MenuIcon active={active} icon={icon} />
        </Badge>
      </a>
    </StyledMenuItem>
  );
}

NavBar.propTypes = {
  children: PropTypes.any,
};

export default NavBar;

export { MenuItem };
```

以及 `navBar.stories.js` 文件：

```js
import React from "react";
import NavBar, { MenuItem } from ".";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "页面组件/NavBar",
  component: NavBar,
};

export const Default = () => <NavBar>默认</NavBar>;

export const Menu = () => {
  return <MenuItem showBadge active icon={faCommentDots} />;
};
```

高亮显示条需要定义为 `Mixin`，打开 `utils/mixins.js` 文件添加 `activeBar` 样式：

```js
export const activeBar = ({ barWidth = "8px", shadowWidth = "20px" } = {}) =>
  css`
    position: relative;
    &::before, &::after {
      display: block;
      content: "";
      position: absolute;
      height: 100%;
      left: 0;
      transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    &::before {
      width: ${barWidth};
      background: linear-gradient(
        180deg,
        rgba(142, 197, 242, 1) 0%,
        rgba(79, 157, 222, 1) 100%
      );
    }

    &::after {
      width: ${shadowWidth};
      background: linear-gradient(
        270deg,
        rgba(41, 47, 76, 1) 0%,
        rgba(142, 197, 242, 1) 100%
      );
      opacity: 0.6;
    }
  `;
```

修改组件样式 `style.js` 文件：

```js
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { activeBar } from "utils/mixins";

const StyledMenuItem = styled.div`
    & > a {
        width: 100%;
        height: 74px;

        display: flex;
        align-items: center;
        justify-content: center;

        ${activeBar()};
        ${({ active }) => (active ? "" : `&::before, &::after {height: 0}`)};
    }
`;

const MenuIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 24px;
    opacity: ${({ active }) => (active ? 1 : 0.3)};
`;

const StyledNavBar = styled.nav``;

export default StyledNavBar;

export { MenuIcon, StyledMenuItem };
```

使用 `Styled-component macros`，在 `.storybook` 目录下新建 `.babelrc` 文件：

```
{
    "plugins": ["macros"]
}
```

并修改 `navBar.stories.js` 文件为：

```js
import React from "react";
import NavBar, { MenuItem } from ".";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import "styled-components/macro";

export default {
  title: "页面组件/NavBar",
  component: NavBar,
};

export const Default = () => <NavBar />;

export const Menu = () => {
  return (
    <div
      css={`
        background-color: ${({ theme }) => theme.darkPurple};
        width: 100px;
      `}
    >
      <MenuItem showBadge active icon={faCommentDots} />
    </div>
  );
};
```

### 七、侧导航组件

侧导航组件包括头像和菜单项，使用 CSS Grid 布局，修改 `components/NavBar` 下的 `index.js` 文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledNavBar, { StyledMenuItem, MenuIcon, MenuItems } from "./style";
import Badge from "components/Badge";
import Avatar from "components/Avatar";
import profileImage from "assets/images/face-male-1.jpg";
import { faCommentDots, faUsers, faFolder, faStickyNote, faEllipsisH, faCog, } from "@fortawesome/free-solid-svg-icons";

function NavBar({ ...rest }) {
  return (
    <StyledNavBar {...rest}>
      <Avatar src={profileImage} status="online" />
      <MenuItems>
        <MenuItem showBadge active icon={faCommentDots} />
        <MenuItem icon={faUsers} />
        <MenuItem icon={faFolder} />
        <MenuItem icon={faStickyNote} />
        <MenuItem icon={faEllipsisH} />
        <MenuItem icon={faCog} />
      </MenuItems>
    </StyledNavBar>
  );
}

function MenuItem({ icon, active, showBadge, ...rest }) {
  return (
    <StyledMenuItem active={active} {...rest}>
      <a href="#">
        <Badge show={showBadge}>
          <MenuIcon active={active} icon={icon} />
        </Badge>
      </a>
    </StyledMenuItem>
  );
}

NavBar.propTypes = {
};

export default NavBar;
export { MenuItem };
```

再在同目录下 `style.js` 中编写样式：

```js
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { activeBar } from "utils/mixins";

const StyledMenuItem = styled.div`
    & > a {
        width: 100%;
        height: 74px;

        display: flex;
        align-items: center;
        justify-content: center;

        ${activeBar()};
        ${({ active }) => (active ? "" : `&::before, &::after {height: 0}`)};
    }
`;

const MenuIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 24px;
    opacity: ${({ active }) => (active ? 1 : 0.3)};
`;

const StyledNavBar = styled.nav`
    display: grid;
    grid-template-rows: 1fr 4fr;
    width: 100px;
    height: 100vh;
    background-color: ${({ theme }) => theme.darkPurple};
    padding: 30px 0;
`;

const MenuItems = styled.div`
  display: grid;
  grid-template-rows: repeat(5, minmax(auto, 88px)) 1fr;
`;

export default StyledNavBar;

export { MenuIcon, StyledMenuItem, MenuItems };
```
