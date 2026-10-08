---
title: ChatUI-React 滑动抽屉
date: 2022-10-22
references: 
  - title: React 即时通信 UI 实战
    url: https://study.163.com/course/courseMain.htm?courseId=1210022809&share=1&shareId=1030428673
categories: 前端开发
tags: [ChatUI, React, 组件开发]
---

> React 即时通信 UI 实战第七章。React 即时通信 UI 实战为[峰华前端工程师](https://www.bilibili.com/video/BV1PK4y1b7bY?p=2&spm_id_from=pageDriver&vd_source=0965c74096f788f105780e5d5d0e9ebf)推出的 React 实战课程，以聊天（即时通信）为原型，构建了一整套的 UI 组件库，课程重点在于 UI 组件的分析和实现，力求打造自用组件库。本章包括滑动抽屉中的个人资料、个人信息、社交信息、分割线等组件。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、社交信息组件开发

社交信息不需要 `stories` 和 `styles` 编辑文件，手动在 `src/components/Icon` 目录下新建 `SocialIcon` 文件夹，并在其中新建 `index.js` 文件：

```js
import React from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SocialIcon({ icon, bgColor, href, ...rest }) {
    return (
        <Button
            size="30px"
            bgColor={bgColor}
            onClick={() => href && window.open(href, "_blank")}
            {...rest}
        >
            <FontAwesomeIcon icon={icon} style={{ fontSize: "16px" }} />
        </Button>
    );
}

SocialIcon.propTypes = {
    icon: PropTypes.elementType,
    bgColor: PropTypes.string,
    href: PropTypes.string,
};

export default SocialIcon;
```

在 `src/components/Icon/index.js` 中添加：

```js
import SocialIcon from "./SocialIcon";

Icon.Social = SocialIcon;
```

### 二、分割线组件开发

使用 Hygen 创建一个分割线组件：

```bash
hygen component new Seperator
```

再在 `style.js` 中修改样式：

```JS
import styled from "styled-components";

const StyledSeperator = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${({ theme }) => theme.gray4};
`;

export default StyledSeperator;
```

最后编辑 `seperator.stories.js` 文件：

```JS
import React from "react";
import Seperator from ".";

export default {
  title: "UI 组件/Seperator",
  component: Seperator,
};

export const Default = () => (
  <div style={{ padding: "24px" }}>
    <Seperator />
  </div>
);
```

### 三、组装滑动抽屉页面组件

使用 Hygen 创建一个 Profile 组件：

```bash
hygen component new Profile
```

在 `index.js` 文件中编辑标题栏组件：

```JS
import React from "react";
import PropTypes from "prop-types";
import StyledProfile, {
  SocialLinks,
  ContactSection,
  Album,
  Photo,
  AlbumSection,
  AlbumTitle,
  CloseIcon,
} from "./style";
import "styled-components/macro";
import face from "assets/images/face-male-3.jpg";
import Avatar from "components/Avatar";
import Paragraph from "components/Paragraph";
import Emoji from "components/Emoji";
import Icon from "components/Icon";

import {
  faWeibo,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Seperator from "components/Seperator";
import Text from "components/Text";

import photo1 from "assets/images/photo1.jpg";
import photo2 from "assets/images/photo2.jpg";
import photo3 from "assets/images/photo3.jpg";

import { ReactComponent as Cross } from "assets/icon/cross.svg";
import Button from "components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function Profile({
  showEditBtn,
  showCloseIcon = true,
  onCloseClick,
  onEdit,
  status,
  children,
  ...rest
}) {
  return (
    <StyledProfile {...rest}>
      {showCloseIcon && <CloseIcon icon={Cross} onClick={onCloseClick} />}
      <Avatar
        css={`
          margin: 26px 0;
          grid-area: 1 / 1 / 3 / 2;
        `}
        src={face}
        size="160px"
        status={status}
        statusIconSize="25px"
      />
      {showEditBtn && (
        <Button
          size="52px"
          onClick={onEdit}
          css={`
            grid-area: 1 / 1 / 3 / 2;
            align-self: end;
            margin-left: 100px;
            z-index: 10;
          `}
        >
          <FontAwesomeIcon
            css={`
              font-size: 24px;
            `}
            icon={faPen}
          />
        </Button>
      )}
      <Paragraph
        size="xlarge"
        css={`
          margin-bottom: 12px;
        `}
      >
        慕容天宇
      </Paragraph>
      <Paragraph
        size="medium"
        type="secondary"
        css={`
          margin-bottom: 18px;
        `}
      >
        北京市 朝阳区
      </Paragraph>
      <Paragraph
        css={`
          margin-bottom: 26px;
        `}
      >
        帮助客户构建网站，并协助在社交网站上进行推广{" "}
        <Emoji label="fire">🔥</Emoji>
      </Paragraph>
      <SocialLinks>
        <Icon.Social
          icon={faWeibo}
          bgColor="#F06767"
          href="http://www.weibo.com"
        />
        <Icon.Social icon={faGithub} bgColor="black" />
        <Icon.Social icon={faLinkedin} bgColor="#2483C0" />
      </SocialLinks>
      <Seperator
        css={`
          margin: 30px 0;
        `}
      />
      <ContactSection>
        <Description label="联系电话">+86 18688888888</Description>
        <Description label="电子邮件">admin@fh.com</Description>
        <Description label="个人网站">https://zxuqian.cn</Description>
      </ContactSection>
      <Seperator
        css={`
          margin: 30px 0;
        `}
      />
      <AlbumSection>
        <AlbumTitle>
          <Text type="secondary">相册（31）</Text>
          <a>查看全部</a>
        </AlbumTitle>
        <Album>
          <Photo src={photo1} alt="" />
          <Photo src={photo2} alt="" />
          <Photo src={photo3} alt="" />
        </Album>
      </AlbumSection>
    </StyledProfile>
  );
}

function Description({ label, children }) {
  return (
    <Paragraph>
      <Text type="secondary">{label}：</Text>
      <Text>{children}</Text>
    </Paragraph>
  );
}

Profile.propTypes = {
  children: PropTypes.any,
};

export default Profile;
```

再在 `style.js` 中修改样式：

```JS
import styled from "styled-components";
import arrowRight from "assets/icon/arrowRight.svg";
import Icon from "components/Icon";

const SocialLinks = styled.div`
  & > * {
    margin: 0 9px;
  }
`;

const ContactSection = styled.section`
  display: grid;
  row-gap: 18px;
`;

const AlbumSection = styled.section``;

const AlbumTitle = styled.div`
  justify-self: stretch;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > a {
    text-decoration: none;
    font-size: ${({ theme }) => theme.normal};
    color: ${({ theme }) => theme.primaryColor};
    &::after {
      display: inline-block;
      content: url(${arrowRight});
      margin-left: 2px;
    }
  }
`;

const Album = styled.div`
  margin-top: 14px;
  justify-self: start;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Photo = styled.img`
  width: 76px;
  height: 76px;
  object-fit: cover;
`;

const CloseIcon = styled(Icon).attrs({ opacity: 0.3 })`
  position: absolute;
  right: 30px;
  top: 30px;
  cursor: pointer;
`;

const StyledProfile = styled.div`
  display: grid;
  align-content: start;
  justify-content: center;
  justify-items: center;
  position: relative;
  padding: 30px;
  height: 100vh;
  margin-top: 2vh;
  overflow-y: auto;
`;

export default StyledProfile;
export {
    SocialLinks,
    ContactSection,
    Album,
    AlbumSection,
    AlbumTitle,
    Photo,
    CloseIcon,
};
```

最后编辑 `profile.stories.js` 文件：

```JS
import React from "react";
import Profile from ".";

export default {
  title: "页面组件/Profile",
  component: Profile,
};

export const Default = () => <Profile status="online" />;
```
