---
title: ChatUI-React 其他列表组件
date: 2022-11-25
references: 
  - title: React 即时通信 UI 实战
    url: https://study.163.com/course/courseMain.htm?courseId=1210022809&share=1&shareId=1030428673
categories: 前端开发
tags: [ChatUI, React, 组件开发]
---

> React 即时通信 UI 实战第九章。React 即时通信 UI 实战为[峰华前端工程师](https://www.bilibili.com/video/BV1PK4y1b7bY?p=2&spm_id_from=pageDriver&vd_source=0965c74096f788f105780e5d5d0e9ebf)推出的 React 实战课程，以聊天（即时通信）为原型，构建了一整套的 UI 组件库，课程重点在于 UI 组件的分析和实现，力求打造自用组件库。本章包括其他列表组件，包括联系人列表、笔记列表和文件列表组件。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、抽离过滤列表组件

使用 Hygen 创建一个 `FilterList` 组件：

```bash
hygen component new FilterList
```

编辑 `src/components/FilterList/index.js`  文件：

```js
import React from "react";
import PropTypes from "prop-types";
import StyledFilterList from "./style";
import Input from "components/Input";
import Filter from "components/Filter";
import Select from "components/Select";
import Option from "components/Option";
import Button from "components/Button";
import Icon from "components/Icon";

import { ReactComponent as Plus } from "assets/icon/plus.svg";

function FilterList({
  children,
  options,
  filterLabel = "列表排序",
  actionLabel,
  ...rest
}) {
  return (
    <StyledFilterList {...rest}>
      <Input.Search />
      <Filter style={{ padding: "20px 0" }}>
        {options && (
          <Filter.Filters label={filterLabel}>
            <Select>
              {options.map((option, index) => (
                <Option key={index}>{option}</Option>
              ))}
            </Select>
          </Filter.Filters>
        )}

        {actionLabel && (
          <Filter.Action label={actionLabel}>
            <Button>
              <Icon icon={Plus} width={12} height={12} />
            </Button>
          </Filter.Action>
        )}
      </Filter>
      {children}
    </StyledFilterList>
  );
}

FilterList.propTypes = {
  children: PropTypes.any,
  options: PropTypes.array,
  filterLabel: PropTypes.string,
  actionLabel: PropTypes.string,
};

export default FilterList;
```

编辑 `src/components/FilterList/style.js`  文件：

```js
import styled from "styled-components";

const StyledFilterList = styled.div`
  padding: 30px;
  height: 100vh;
  overflow-y: auto;
`;

export default StyledFilterList;
```

编辑 `src/components/FilterList/filterList.stories.js`  文件：

```js
import React from "react";
import FilterList from ".";

export default {
  title: "页面组件/FilterList",
  component: FilterList,
};

export const Default = () => <FilterList>此处添加 children list</FilterList>;
```

再让 `MessageList` 使用新抽离出的 `FilterList` 组件，编辑 `src/components/MessageList/index.js`  文件：：

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

function MessageList({ children, ...rest }) {
  return (
    <StyledMessageList {...rest}>
      <FilterList options={["最新消息优先", "在线好友优先"]} actionLabel="创建会话">
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
      </FilterList>
    </StyledMessageList>
  );
}

MessageList.propTypes = {
  children: PropTypes.any,
};

export default MessageList;
```

### 二、联系人列表组件开发

使用 Hygen 创建一个 `ContactCard` 组件，用于展示联系人卡片：

```bash
hygen component new ContactCard
```

编辑 `src/components/ContactCard/index.js`  文件：：

```bash
import React from "react";
import PropTypes from "prop-types";
import StyledContactCard, { Intro, Name } from "./style";
import face from "assets/images/face-male-1.jpg";
import Avatar from "components/Avatar";

function ContactCard({ children, ...rest }) {
  return (
    <StyledContactCard {...rest}>
      <Avatar src={face} status="online" />
      <Name>李浩</Name>
      <Intro>我是前端工程师</Intro>
    </StyledContactCard>
  );
}

ContactCard.propTypes = {
  children: PropTypes.any,
};

export default ContactCard;
```

再在 `style.js` 中修改样式：

```JS
import styled from "styled-components";
import Paragraph from "components/Paragraph";
import { card } from "utils/mixins";
import StyledAvatar from "components/Avatar/style";

const Name = styled(Paragraph).attrs({ size: "large" })`
  grid-area: name;
`;

const Intro = styled(Paragraph).attrs({ type: "secondary" })`
  grid-area: intro;
`;

const StyledContactCard = styled.div`
  ${card()}
  display: grid;
  grid-template-areas:
    "avatar name"
    "avatar intro";
  grid-template-columns: 62px auto;

  ${StyledAvatar} {
    grid-area: avatar;
  }
`;

export default StyledContactCard;
export { Name, Intro };
```

最后修改 `contactCard.stories.js` 文件：

```JS
import React from "react";
import ContactCard from ".";

export default {
  title: "UI 组件/ContactCard",
  component: ContactCard,
};

export const Default = () => <ContactCard />;
```

使用 Hygen 创建一个 `ContactList` 组件：

```bash
hygen component new ContactList
```

编辑 `src/components/ContactList/index.js`  文件：：

```bash
import React from "react";
import PropTypes from "prop-types";
import StyledContactList, { Contacts } from "./style";
import FilterList from "components/FilterList";
import ContactCard from "components/ContactCard";

function ContactList({ children, ...rest }) {
  return (
    <StyledContactList {...rest}>
      <FilterList options={["新添加优先", "按姓名排序"]} actionLabel="添加好友">
        <Contacts>
          {new Array(10).fill(0).map((_, i) => (
            <ContactCard key={i} />
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

再在 `style.js` 中修改样式：

```JS
import styled from "styled-components";

const Contacts = styled.div`
  margin-top: -8px;
  & > * {
    margin: 8px 0;
  }
`;

const StyledContactList = styled.div``;

export default StyledContactList;
export { Contacts };
```

最后修改 `contactList.stories.js` 文件：

```js
import React from "react";
import ContactList from ".";

export default {
  title: "页面组件/ContactList",
  component: ContactList,
};

export const Default = () => <ContactList />;
```

### 三、文件列表组件开发

使用 Hygen 创建一个 `FileCard` 组件，用于展示联系人卡片：

```bash
hygen component new FileCard
```

编辑 `src/components/FileCard/index.js`  文件：：

```bash
import React from "react";
import PropTypes from "prop-types";
import StyledFileCard, {
  FileName,
  FileSize,
  Options,
  Time,
  FileIcon,
} from "./style";

import { ReactComponent as FileZip } from "assets/icon/fileZip.svg";
import { ReactComponent as FileExcel } from "assets/icon/fileExcel.svg";
import { ReactComponent as FileWord } from "assets/icon/fileWord.svg";
import { ReactComponent as FilePpt } from "assets/icon/filePpt.svg";
import { ReactComponent as FileImage } from "assets/icon/fileImage.svg";
import { ReactComponent as FilePdf } from "assets/icon/filePdf.svg";
import { ReactComponent as OptionsIcon } from "assets/icon/options.svg";
import Icon from "components/Icon";

const fileIcons = {
  zip: FileZip,
  image: FileImage,
  pdf: FilePdf,
  word: FileWord,
  excel: FileExcel,
  ppt: FilePpt,
};

function FileCard({ children, ...rest }) {
  return (
    <StyledFileCard {...rest}>
      <FileIcon icon={fileIcons.zip} />
      <FileName>Source Code.zip</FileName>
      <FileSize>1.5M</FileSize>
      <Options>
        <Icon icon={OptionsIcon} opacity={0.3} />
      </Options>
      <Time>2019年02月03日</Time>
    </StyledFileCard>
  );
}

FileCard.propTypes = {
  children: PropTypes.any,
};

export default FileCard;
```

再在 `style.js` 中修改样式：

```JS
import styled from "styled-components";
import Icon from "components/Icon";
import Heading from "components/Heading";
import Paragraph from "components/Paragraph";
import Popover from "components/Popover";
import { card } from "utils/mixins";

const FileIcon = styled(Icon).attrs({
  width: 60,
  height: 60,
})`
  grid-area: icon;
  justify-self: start;
`;

const FileName = styled(Heading).attrs({ level: 2 })`
  grid-area: name;
  align-self: center;
`;

const FileSize = styled(Paragraph).attrs({ type: "secondary" })`
  grid-area: size;
`;

const Options = styled(Popover)`
  grid-area: options;
  justify-self: end;
  align-self: center;
`;
const Time = styled(Paragraph).attrs({ type: "secondary" })`
  grid-area: time;
  justify-self: end;
`;

const StyledFileCard = styled.div`
  ${card()}
  display: grid;
  grid-template-areas:
    "icon name options"
    "icon size time";
  grid-template-columns: 74px 1fr 1fr;
`;

export default StyledFileCard;
export { FileIcon, FileName, FileSize, Options, Time };
```

最后修改 `fileCard.stories.js` 文件：

```JS
import React from "react";
import FileCard from ".";

export default {
  title: "UI 组件/FileCard",
  component: FileCard,
};

export const Default = () => <FileCard />;
```

使用 Hygen 创建一个 `FileList` 组件：

```bash
hygen component new FileList
```

编辑 `src/components/FileList/index.js`  文件：：

```bash
import React from "react";
import PropTypes from "prop-types";
import StyledFileList, { Files } from "./style";
import FilterList from "components/FilterList";
import FileCard from "components/FileCard";

function FileList({ children, ...rest }) {
  return (
    <StyledFileList {...rest}>
      <FilterList options={["最新文件优先", "按文件名排序"]}>
        <Files>
          {new Array(10).fill(0).map((_, i) => (
            <FileCard key={i} />
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

再在 `style.js` 中修改样式：

```JS
import styled from "styled-components";

const Files = styled.div`
  margin-top: -8px;
  & > * {
    margin: 8px 0;
  }
`;

const StyledFileList = styled.div``;

export default StyledFileList;
export { Files };
```

最后修改 `fileList.stories.js` 文件：

```js
import React from "react";
import FileList from ".";

export default {
  title: "页面组件/FileList",
  component: FileList,
};

export const Default = () => <FileList />;
```

### 四、笔记列表组件开发

使用 Hygen 创建一个 `NoteCard` 组件，用于展示联系人卡片：

```bash
hygen component new NoteCard
```

编辑 `src/components/NoteCard/index.js`  文件：：

```bash
import note1 from "assets/images/note-1.jpg";
import PropTypes from "prop-types";
import React from "react";
import StyledNoteCard, {
  NoteImage,
  NoteTitle,
  NoteExcerpt,
  NotePublishTime,
} from "./style";

function NoteCard({ children, ...rest }) {
  return (
    <StyledNoteCard {...rest}>
      <NoteImage src={note1} />
      <NoteTitle>这是笔记标题</NoteTitle>
      <NoteExcerpt>这是笔记内容摘要</NoteExcerpt>
      <NotePublishTime>2020-02-08</NotePublishTime>
    </StyledNoteCard>
  );
}

NoteCard.propTypes = {
  children: PropTypes.any,
};

export default NoteCard;
```

再在 `style.js` 中修改样式：

```JS
import styled from "styled-components";
import Heading from "components/Heading";
import Paragraph from "components/Paragraph";
import { card } from "utils/mixins";

const NoteImage = styled.img`
  grid-area: image;
  width: 60px;
  height: 60px;
  object-fit: cover;
`;

const NoteTitle = styled(Heading).attrs({ level: 2 })`
  grid-area: title;
  align-self: center;
`;

const NoteExcerpt = styled(Paragraph).attrs({ size: "small" })`
  grid-area: excerpt;
  align-self: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const NotePublishTime = styled(Paragraph).attrs({ type: "secondary" })`
  grid-area: time;
  justify-self: end;
`;

const StyledNoteCard = styled.div`
  ${card()}
  display: grid;
  grid-template-areas:
    "image title time"
    "image excerpt excerpt";
  grid-template-columns: 72px 2fr 1fr;
`;

export default StyledNoteCard;
export { NoteImage, NoteTitle, NoteExcerpt, NotePublishTime };
```

最后修改 `noteCard.stories.js` 文件：

```JS
import React from "react";
import NoteCard from ".";

export default {
  title: "UI 组件/NoteCard",
  component: NoteCard,
};

export const Default = () => <NoteCard />;
```

使用 Hygen 创建一个 `NoteList` 组件：

```bash
hygen component new NoteList
```

编辑 `src/components/NoteList/index.js`  文件：：

```bash
import React from "react";
import PropTypes from "prop-types";
import StyledNoteList, { Notes } from "./style";
import FilterList from "components/FilterList";
import NoteCard from "components/NoteCard";

function NoteList({ children, ...rest }) {
  return (
    <StyledNoteList {...rest}>
      <FilterList
        options={["最新笔记优先", "有改动的优先"]}
        actionLabel="添加笔记"
      >
        <Notes>
          {new Array(10).fill(0).map((_, i) => (
            <NoteCard key={i} />
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

再在 `style.js` 中修改样式：

```JS
import styled from "styled-components";

const Notes = styled.div`
  & > * {
    margin: 8px 0;
  }
  margin-top: -8px;
`;

const StyledNoteList = styled.div``;

export default StyledNoteList;
export { Notes };
```

最后修改 `noteList.stories.js` 文件：

```js
import React from "react";
import NoteList from ".";

export default {
  title: "页面组件/NoteList",
  component: NoteList,
};

export const Default = () => <NoteList />;
```
