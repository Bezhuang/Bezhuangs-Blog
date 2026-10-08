---
title: ChatUI-React 设置页面
date: 2022-11-08
references: 
  - title: React 即时通信 UI 实战
    url: https://study.163.com/course/courseMain.htm?courseId=1210022809&share=1&shareId=1030428673
categories: 前端开发
tags: [ChatUI, React, 组件开发]
---

> React 即时通信 UI 实战第八章。React 即时通信 UI 实战为[峰华前端工程师](https://www.bilibili.com/video/BV1PK4y1b7bY?p=2&spm_id_from=pageDriver&vd_source=0965c74096f788f105780e5d5d0e9ebf)推出的 React 实战课程，以聊天（即时通信）为原型，构建了一整套的 UI 组件库，课程重点在于 UI 组件的分析和实现，力求打造自用组件库。本章包括设置页面中的 InputText、Select（表单）、Radio、Switch 开关等组件。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、文本输入框组件开发

使用 Hygen 创建一个 `InputText` 组件，并移动到 `src/components/Input` 组件目录下，作为 `Input` 的子组件导出：

```bash
hygen component new InputText
```

再使用 Hygen 创建一个 `LabelContainer` 组件，对 Label 和控件进行布局：

```bash
hygen component new LabelContainer
```

编辑 `src/components/LabelContainer/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledLabelContainer from "./style";
import Text from "components/Text";

function LabelContainer({ children, label, ...rest }) {
  return (
    <StyledLabelContainer {...rest}>
      {label && <Text style={{ marginBottom: "8px" }}>{label}: </Text>}
      {children}
    </StyledLabelContainer>
  );
}

LabelContainer.propTypes = {
  children: PropTypes.any,
};

export default LabelContainer;
```

编辑 `src/components/LabelContainer/style.js`  文件：

```js
import styled from "styled-components";

const StyledLabelContainer = styled.label`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.normal};
`;

export default StyledLabelContainer;
```

编辑 `src/components/Input/InputText/style.js`  文件：

```js
import styled from "styled-components";

const InputUnderline = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.gray4};
  font-size: ${({ theme }) => theme.normal};
  width: 100%;
  background: none;

  &::placeholder {
    color: ${({ theme }) => theme.gray5};
  }

  :focus,
  :hover {
    border-bottom-color: ${({ theme }) => theme.primaryColor};
  }
`;

const StyledInputText = styled.div``;

export default StyledInputText;
export { InputUnderline };
```

编辑 `src/components/Input/InputText/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledInputText, { InputUnderline } from "./style";
import LabelContainer from "components/LabelContainer";

function InputText({ label, placeholder = "请输入内容", ...rest }) {
  const input = <InputUnderline type="text" placeholder={placeholder} />;

  return (
    <StyledInputText>
      {label ? <LabelContainer label={label}>{input}</LabelContainer> : input}
    </StyledInputText>
  );
}

InputText.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputText;
```

编辑 `src/components/Input/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledInput, { InputContainer, Prefix, Suffix } from "./style";
import Icon from "components/Icon";

import { ReactComponent as SearchIcon } from "assets/icon/search.svg";
import { useTheme } from "styled-components";
import InputText from "./InputText";

function Input({ placeholder = "请输入内容...", prefix, suffix, ...rest }) {
  return (
    <InputContainer {...rest}>
      {prefix && <Prefix>{prefix}</Prefix>}
      <StyledInput placeholder={placeholder} />
      {suffix && <Suffix>{suffix}</Suffix>}
    </InputContainer>
  );
}

function Search({ placeholder = "请输入搜索内容...", ...rest }) {
  const theme = useTheme();
  return (
    <Input
      placeholder={placeholder}
      prefix={
        <Icon icon={SearchIcon} color={theme.gray3} width={18} height={18} />
      }
      {...rest}
    />
  );
}

Input.Search = Search;
Input.Text = InputText;

Input.propTypes = {
  placeholder: PropTypes.string,
  prefix: PropTypes.any,
  suffix: PropTypes.any,
};

export default Input;
```

在 `src/components/Input/input.stories.js`  文件中添加两行 stories：

```js
export const InputTextWithLabel = () => <Input.Text label="昵称" />;
export const InputTextWithoutLabel = () => <Input.Text />;
```

使用 `yarn` 命令启动 storybook：

```
yarn run storybook
```

### 二、重构 Select 组件

编辑 `src/components/Select/index.js`  文件：：

```bash
import React from "react";
import PropTypes from "prop-types";
import StyledSelect from "./style";
import LabelContainer from "components/LabelContainer";

function Select({ label, type, children, ...rest }) {
  const selectWithoutLabel = (
    <StyledSelect type={type} {...rest}>
      {children}
    </StyledSelect>
  );
  return label ? (
    <LabelContainer label={label}>selectWithoutLabel</LabelContainer>
  ) : (
    selectWithoutLabel
  );
}

Select.propTypes = {
  type: PropTypes.oneOf(["form"]),
  children: PropTypes.any,
};

export default Select;
```

再在 `style.js` 中修改样式：

```JS
import styled, { css } from "styled-components";
import CaretDown from "assets/icon/caret_down.svg";
import CaretDown2 from "assets/icon/caretDown2.svg";

const typeVariants = {
  form: css`
    background-image: url(${CaretDown2});
  `,
};
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

  ${({ type }) => type && typeVariants[type]}

  ::-ms-expand {
    display: none;
  }
`;

export default StyledSelect;
```

最后在 `select.stories.js` 文件中添加一个 story：

```JS
export const FormSelect = () => {
  return (
    <Select type="form">
      <Option>北京市</Option>
      <Option>河北省</Option>
    </Select>
  );
};
```

### 三、Radio 单选按钮组件开发

使用 Hygen 创建一个 `Radio` 组件：

```bash
hygen component new Radio
```

编辑 `src/components/Radio/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledRadio, { RadioButton, Circle, StyledRadioGroup } from "./style";
import LabelContainer from "components/LabelContainer";

function Radio({ name, children, ...rest }) {
  return (
    <StyledRadio {...rest}>
      {children}
      <RadioButton name={name} />
      <Circle />
    </StyledRadio>
  );
}

function RadioGroup({ label, children, ...rest }) {
  return (
    <LabelContainer label={label}>
      <StyledRadioGroup {...rest}>{children}</StyledRadioGroup>
    </LabelContainer>
  );
}

Radio.Group = RadioGroup;

Radio.propTypes = {
  name: PropTypes.string,
  children: PropTypes.any,
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
};

export default Radio;
```

编辑 `src/components/Radio/style.js`  文件：

```js
import styled from "styled-components";

const Circle = styled.span`
  line-height: 16px;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.primaryColor};
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;

  ::after {
    content: "";
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 50%;
    position: absolute;
    left: 2px;
    top: 2px;

    opacity: 0;
    transform: scale(0);
    transition: 0.2s ease;
  }
`;

const RadioButton = styled.input.attrs({ type: "radio" })`
  width: 0;
  height: 0;
  opacity: 0;

  :checked + ${Circle}::after {
    opacity: 1;
    transform: scale(1);
  }

  :not(:checked) + ${Circle}::after {
    opacity: 0;
    transform: scale(0);
  }
`;

const StyledRadioGroup = styled.div`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 24px;
  }
`;

const StyledRadio = styled.label`
  position: relative;
  padding-left: 22px;
  cursor: pointer;
  display: inline-block;
  line-height: 16px;
  font-size: ${({ theme }) => theme.normal};
`;

export default StyledRadio;
export { RadioButton, Circle, StyledRadioGroup };
```

在 `src/components/Radio/radio.stories.js`  文件中添加 stories：

```js
import React from "react";
import Radio from ".";

export default {
  title: "UI 组件/Input/Radio",
  component: Radio,
};

export const Default = () => <Radio>选项</Radio>;

export const RadioGroup = () => (
  <Radio.Group label="请选择">
    <Radio name="option">选项1</Radio>
    <Radio name="option">选项2</Radio>
    <Radio name="option">选项3</Radio>
  </Radio.Group>
);
```

### 四、Switch 开关组件开发

使用 Hygen 创建一个 `Switch` 组件：

```bash
hygen component new Switch
```

编辑 `src/components/LabelContainer/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledSwitch, { Checkbox, Slider } from "./style";

function Switch({ children, ...rest }) {
  return (
    <StyledSwitch {...rest}>
      <Checkbox />
      <Slider />
    </StyledSwitch>
  );
}

Switch.propTypes = {
  children: PropTypes.any,
};

export default Switch;
```

编辑 `src/components/LabelContainer/style.js`  文件：

```js
import styled from "styled-components";

const Slider = styled.span`
  background-color: ${({ theme }) => theme.gray4};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 16px;
  transition: 0.4s;

  &::before {
    display: block;
    content: "";
    position: absolute;
    width: 28px;
    height: 28px;
    top: 1px;
    left: 1px;
    background-color: white;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.05), 0px 2px 2px rgba(0, 0, 0, 0.1),
      0px 3px 1px rgba(0, 0, 0, 0.0510643);
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 0;
  height: 0;
  opacity: 0;
  :checked + ${Slider} {
    background-color: ${({ theme }) => theme.primaryColor};

    ::before {
      transform: translateX(20px);
    }
  }
`;

const StyledSwitch = styled.label`
  width: 51px;
  height: 31px;
  position: relative;
  display: inline-block;
`;

export default StyledSwitch;
export { Checkbox, Slider };
```

在 `src/components/Input/input.stories.js`  文件中添加 stories：

```js
import React from "react";
import Switch from ".";

export default {
  title: "UI 组件/Input/Switch",
  component: Switch,
};

export const Default = () => (
  <div style={{ padding: "1vw" }}>
    <Switch />
  </div>
);
```

### 五、组装设置页编辑个人资料页面

使用 Hygen 创建一个 EditProfile 组件：

```bash
hygen component new EditProfile
```

在 `index.js` 文件中编辑组件：

```JS
import React, { useState } from "react";
import PropTypes from "prop-types";
import StyledEditProfile, {
  GroupTitle,
  GenderAndRegion,
  SelectGroup,
  StyledIconInput,
} from "./style";
import Profile from "components/Profile";
import face from "assets/images/face-male-1.jpg";
import Avatar from "components/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button";

import "styled-components/macro";
import InputText from "components/Input/InputText";
import Radio from "components/Radio";
import LabelContainer from "components/LabelContainer";
import Select from "components/Select";
import Option from "components/Option";
import Icon from "components/Icon";
import {
  faWeibo,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function EditProfile({ children, ...rest }) {
  const [showEdit, setShowEdit] = useState(false);
  if (!showEdit) {
    return (
      <Profile
        onEdit={() => setShowEdit(true)}
        showEditBtn
        showCloseIcon={false}
      />
    );
  }
  return (
    <StyledEditProfile {...rest}>
      <Avatar
        src={face}
        size="160px"
        css={`
          grid-area: 1 / 1 / 2 / 2;
          justify-self: center;
          margin-bottom: 12px;
        `}
      />
      <Button
        size="52px"
        css={`
          grid-area: 1 / 1 / 3 / 2;
          z-index: 10;
          align-self: end;
          justify-self: end;
        `}
      >
        <FontAwesomeIcon icon={faCheck} onClick={() => setShowEdit(false)} />
      </Button>
      <GroupTitle>基本信息</GroupTitle>
      <InputText label="昵称" />
      <GenderAndRegion>
        <Radio.Group label="性别">
          <Radio name="gender">男</Radio>
          <Radio name="gender">女</Radio>
        </Radio.Group>
        <LabelContainer label="地区">
          <SelectGroup>
            <Select type="form">
              <Option>省份</Option>
            </Select>
            <Select type="form">
              <Option>城市</Option>
            </Select>
            <Select type="form">
              <Option>区县</Option>
            </Select>
          </SelectGroup>
        </LabelContainer>
      </GenderAndRegion>
      <InputText label="个性签名" />

      <GroupTitle>联系信息</GroupTitle>
      <InputText label="联系电话" />
      <InputText label="电子邮箱" />
      <InputText label="个人网站" />

      <GroupTitle>社交信息</GroupTitle>
      <IconInput icon={faWeibo} bgColor="#F06767" />
      <IconInput icon={faGithub} bgColor="black" />
      <IconInput icon={faLinkedin} bgColor="#2483C0" />
    </StyledEditProfile>
  );
}

function IconInput({ icon, bgColor, ...rest }) {
  return (
    <StyledIconInput>
      <Icon.Social icon={icon} bgColor={bgColor} />
      <InputText {...rest} />
    </StyledIconInput>
  );
}

EditProfile.propTypes = {
  children: PropTypes.any,
};

export default EditProfile;
```

再在 `style.js` 中修改样式：

```JS
import styled from "styled-components";
import Text from "components/Text";

const GroupTitle = styled(Text).attrs({ size: "large" })`
  align-self: end;
`;

const GenderAndRegion = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: space-between;
`;

const SelectGroup = styled.div`
  > * {
    margin: 0 4px;
  }
  margin: 0 -4px;
`;

const StyledIconInput = styled.div`
  display: grid;
  grid-template-columns: 38px 1fr;
  align-items: end;
`;

const StyledEditProfile = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  padding: 30px;
  max-height: 100vh;
  overflow-y: auto;
`;

export default StyledEditProfile;
export { GroupTitle, GenderAndRegion, SelectGroup, StyledIconInput };
```

最后编辑 `editProfile.stories.js` 文件：

```JS
import React from "react";
import EditProfile from ".";

export default {
  title: "页面组件/EditProfile",
  component: EditProfile,
};

export const Default = () => <EditProfile />;
```

### 六、设置项组件开发

使用 Hygen 创建一个 `Settings` 组件：

```bash
hygen component new Settings
```

编辑 `src/components/Settings/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledSettings, {
  StyledSettingsItem,
  SettingsItemControl,
} from "./style";
import { ReactComponent as ArrowMenuRight } from "assets/icon/arrowMenuRight.svg";
import Paragraph from "components/Paragraph";
import Switch from "components/Switch";
import Icon from "components/Icon";
import Seperator from "components/Seperator";

function Settings({ children, ...rest }) {
  return <StyledSettings {...rest}>{children}</StyledSettings>;
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

编辑 `src/components/Settings/style.js`  文件：

```js
import styled from "styled-components";

const StyledSettingsItem = styled.div``;

const SettingsItemControl = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSettings = styled.div``;

export default StyledSettings;
export { StyledSettingsItem, SettingsItemControl };
```

在 `src/components/Settings/settings.stories.js`  文件中添加两行 stories：

```js
import React from "react";
import Settings, { SettingsItem } from ".";

export default {
  title: "页面组件/Settings",
  component: Settings,
};

export const Default = () => <Settings>默认</Settings>;

export const WithoutDescription = () => (
  <SettingsItem label="这是一个没有描述的设置项" />
);

export const WithDescription = () => (
  <SettingsItem label="这是一个有描述的设置项" description="这是设置项描述" />
);

export const WithMenu = () => (
  <SettingsItem label="有子菜单的设置项" type="menu" />
);
```

### 七、组装设置页面

编辑 `src/components/Settings/style.js`  文件：

```js
import styled from "styled-components";

const StyledSettingsItem = styled.div``;

const SettingsItemControl = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSettingsGroup = styled.div``;

const StyledSettings = styled.div`
  padding: 72px;
`;

export default StyledSettings;
export { StyledSettingsItem, SettingsItemControl, StyledSettingsGroup };
```

编辑 `src/components/Settings/index.js`  文件：

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
        <SettingsItem label="查看已静音的好友列表" type="menu" />
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

在 `src/components/Settings/settings.stories.js`  文件中更改 Default Story：

```js
export const Default = () => <Settings />;
```

### 八、屏蔽列表组件开发

使用 Hygen 创建一个 `BlockedList` 组件：

```bash
hygen component new BlockedList
```

编辑 `src/components/BlockedList/index.js`  文件：

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

function BlockedList({ children, ...rest }) {
  return (
    <StyledBlockedList {...rest}>
      <SettingsMenu>
        <Icon
          icon={ArrowMenuLeft}
          css={`
            cursor: pointer;
          `}
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

编辑 `src/components/BlockedList/style.js`  文件：

```js
import styled from "styled-components";
import StyledText from "components/Text/style";
import Avatar from "components/Avatar";
import Text from "components/Text";
import Icon from "components/Icon";

const BlockedAvatar = styled(Avatar)`
  grid-area: avatar;
`;

const BlockedName = styled(Text).attrs({ size: "xlarge" })`
  grid-area: name;
  margin-top: 20px;
`;

const CloseIcon = styled(Icon)`
  grid-area: 2 / 3 / 5 / 4;
  z-index: 10;
  margin-top: 10px;
`;

const ClosableAvatar = styled.div`
  display: grid;
  grid-template-areas:
    "avatar avatar avatar"
    "avatar avatar avatar"
    "avatar avatar avatar"
    "name name name";

  justify-items: center;
`;

const SettingsMenu = styled.div`
  height: 148px;
  display: grid;
  grid-template-columns: 10px 1fr;
  align-items: center;

  ${StyledText} {
    grid-column: span 1/-1;
    justify-self: center;
  }
`;

const FriendList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 24px;
  justify-items: center;
`;

const StyledBlockedList = styled.div`
  padding: 2vh 4vw;
`;

export default StyledBlockedList;
export {
  SettingsMenu,
  ClosableAvatar,
  BlockedAvatar,
  BlockedName,
  CloseIcon,
  FriendList,
};
```

修改 `src/components/BlockedList/blockedList.stories.js`  文件：

```js
import React from "react";
import BlockedList from ".";

export default {
  title: "页面组件/BlockedList",
  component: BlockedList,
};

export const Default = () => <BlockedList />;
```
