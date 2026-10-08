# Bezhuang's Blog · 博客源码

庄之皓（[@Bezhuang](https://github.com/Bezhuang)）的个人博客源码，基于 [Hexo](https://hexo.io/) + [Volantis](https://volantis.js.org/) 主题，由 GitHub Actions 构建并发布到 GitHub Pages。

**线上站点：<https://hexo.bezhuang.cn>**

*FROM 2020 TO 2023*

## 内容概览

收录 2020-02 至 2023-07 的学习笔记，共 **143 篇**（另有 6 篇草稿未发布）。

分类按**主题**划分，每篇只归一类；**标签**记录具体技术栈和材料来源（课程、平台、题库）。标签共 167 个，每篇 2–4 个。

| 分类 | 篇数 |
| --- | ---: |
| 前端开发 | 37 |
| 数据结构与算法 | 23 |
| 后端开发 | 21 |
| 数据分析 | 17 |
| 编程语言 | 11 |
| 计算机基础 | 8 |
| 工具与运维 | 8 |
| 人工智能 | 7 |
| 通识与随笔 | 4 |
| 数学基础 | 4 |
| 数据库 | 3 |
| **合计** | **143** |

常用标签：`Java`(22) · `freeCodeCamp`(17) · `CSS`(15) · `LeetCode`(13) · `代码随想录`(13) · `React`(11) · `ChatUI`(10)

站点功能：分类 / 标签 / 归档、站内搜索、文章目录（TOC）、暗黑模式、Pjax 无刷新跳转、Atom 订阅、Valine 评论、MathJax 公式、代码高亮、图片灯箱、404 页面。

## 技术栈

- **Hexo** 5.4.2
- **主题**：Volantis 4.3.1。主题是 npm 依赖，装在 `node_modules/` 里，所以 `themes/` 目录是空的（只有一个 `.gitkeep`）——不是主题丢了，`npm ci` 之后 Hexo 会自动从 `node_modules/hexo-theme-volantis` 找到它
- **渲染器**：`hexo-renderer-kramed`、`hexo-renderer-stylus`、`hexo-renderer-ejs`
- **插件**：`hexo-generator-feed` / `-search` / `-json-content` / `-archive` / `-category` / `-tag` / `-index`、`hexo-asset-image`、`hexo-blog-encrypt`、`hexo-wordcount`、`hexo-helper-qrcode`、`hexo-pdf`

## 目录结构

```
.
├── .github/workflows/pages.yml   # 构建 + 部署到 GitHub Pages
├── scripts/custom.js             # 站点级样式/脚本注入，见「排版与样式」
├── source/                       # 站点内容
│   ├── _posts/                   # 文章（143 篇）
│   ├── _drafts/                  # 草稿，不会发布
│   ├── about/  projects/  ...    # 独立页面
│   ├── img/  pdf/                # 配图与附件
│   └── CNAME                     # 自定义域名，会输出到站点根目录
├── _config.yml                   # Hexo 主配置
├── _config.volantis.yml          # Volantis 主题配置
├── package.json / package-lock.json
└── scaffolds/                    # 新建文章的模板
```

## 排版与样式

- **字体**：中文优先的字体栈，首选华为鸿蒙字体 `HarmonyOS Sans SC`，逐级回退到 `PingFang SC` → `Hiragino Sans GB` → `Microsoft YaHei` → `Noto Sans CJK SC`；代码字体栈同样带中文回退。
  刻意不挂 Web 字体：完整中文字体动辄 5–10MB，会明显拖慢移动端加载。因此**华为设备上直接就是鸿蒙字体，其他设备回退到系统自带中文黑体**。如果要让所有设备统一成鸿蒙字体，需要先按站点实际用到的字符做子集化再引入。
- **字号**：在 `_config.volantis.yml` 的 `custom_css.fontsize`，目前 root 16px、h1 1.75rem、h2 1.5rem、h3 1.25rem、h4 1.125rem、代码 .875rem。注意主题默认值比这更小，往大改很容易让标题喧宾夺主（导航栏 logo 用的就是 h3 的字号）。
- **移动端**：markdown 表格会被渲染成 `<div class="table-container">`，而主题的滚动规则写的是 `.md .table`，两边对不上——宽表格没有滚动容器，会被文章的 `overflow-x: hidden` 裁掉且无法滑动。`scripts/custom.js` 补上了滚动容器，并处理了图片宽度、长串换行和窄屏下的字号；它同时改掉了主题写死的 `maximum-scale=1`，恢复安卓端的双指缩放。
- **改样式只能改 `scripts/custom.js`**。主题是 npm 依赖，`npm ci` 每次构建都会重装，直接改 `node_modules/hexo-theme-volantis` 里的文件会在下次部署时丢失。
- `/css/style.css` 不带版本号且缓存 4 小时，改完样式后老访客可能需要强刷一次（或 Purge Cloudflare 缓存）才能看到新样式。

## 本地预览

```bash
npm ci                                  # 按 package-lock.json 安装依赖
npx hexo server                         # 本地预览 http://localhost:4000
npx hexo clean && npx hexo generate     # 只生成静态文件到 public/
```

## 构建与部署

推送到 `master` 即自动构建并部署，见 [`.github/workflows/pages.yml`](.github/workflows/pages.yml)：

```
npm ci  →  hexo clean && hexo generate  →  上传 public/  →  发布到 GitHub Pages
```

`public/`、`node_modules/`、`db.json` 都是构建产物或本地缓存（`db.json` 是 Hexo 的缓存数据库），已写入 `.gitignore`，**不要提交**。

> ⚠️ 仓库 Settings → Pages 的 Source 必须保持 **GitHub Actions**。如果改成 "Deploy from a branch"，分支里就必须存在构建好的站点，而本仓库并不提交构建产物。

## 关于自定义域名

`_config.yml` 的 `url` 和 `source/CNAME` 都必须是 `https://hexo.bezhuang.cn`，两者要保持一致——站点里的样式表和链接用的是根路径（`/css/style.css`），`url` 写错会导致样式和链接全部失效。

DNS 侧 `hexo` 记录指向 `bezhuang.github.io`，建议用 **DNS only**；如果开 Cloudflare 代理（橙云），GitHub 无法验证域名也就签不出证书，站点只能靠 Cloudflare 回源明文 HTTP 访问。

## 版权

文章内容版权归作者所有，除特别说明外请勿转载。
