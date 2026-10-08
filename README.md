# Bezhuang's Blog · 博客源码

庄之皓（[@Bezhuang](https://github.com/Bezhuang)）的个人博客源码，基于 [Hexo](https://hexo.io/) + [Volantis](https://volantis.js.org/) 主题，由 GitHub Actions 构建并发布到 GitHub Pages。

**线上站点：<https://hexo.bezhuang.cn>**

*FROM 2020 TO 2023*

## 内容概览

收录 2020-02 至 2023-07 的学习笔记，共 **144 篇**（另有 6 篇草稿未发布）。

| 分类 | 篇数 |
| --- | ---: |
| Front-End Development | 35 |
| 待分类 | 27 |
| Java | 23 |
| 算法与数据结构 | 17 |
| Data Science and Analytics | 15 |
| C/C++ | 13 |
| Artificial Intelligence | 7 |
| Computer Science | 7 |
| **合计** | **144** |

标签：`LeetCode` · `IBM Data Science` · `ChatUI` · `D2L` · `2023-ML`

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
├── source/                       # 站点内容
│   ├── _posts/                   # 文章（144 篇）
│   ├── _drafts/                  # 草稿，不会发布
│   ├── about/  projects/  ...    # 独立页面
│   ├── img/  pdf/                # 配图与附件
│   └── CNAME                     # 自定义域名，会输出到站点根目录
├── _config.yml                   # Hexo 主配置
├── _config.volantis.yml          # Volantis 主题配置
├── package.json / package-lock.json
└── scaffolds/                    # 新建文章的模板
```

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
