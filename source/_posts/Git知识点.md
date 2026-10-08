---
title: Git 操作指令总结
date: 2020-04-13
tags: []
categories: 待分类
references:
  - title: Git 教程
    url: https://www.liaoxuefeng.com/wiki/896043488029600/
---

> Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件，是目前世界上最先进的分布式版本控制系统。Git 与常用的版本控制工具 CVS, Subversion 等不同，它采用了分布式版本库的方式，不必服务器端软件支持。Git 指令操作简单易上手。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、Git 基本概念 

#### Git 操作指令

![](https://hexo.bezhuang.cn/img/Git.png)


#### 集中式（SVN） VS 分布式（Git）

1. SVN 和 Git 主要的区别在于历史版本维护的位置;
2. Git 本地仓库包含代码库还有历史库，在本地的环境开发就可以记录历史而 SVN 的历史库存在于中央仓库，每次对比与提交代码都必须连接到中央仓库才能进行;
3. 这样的好处在于：自己可以在脱机环境查看开发的版本历史。并且多人开发时如果充当中央仓库的 Git 仓库挂了，可以随时创建一个新的中央仓库然后同步就立刻恢复了中央库。

#### 创建版本库

`git init`初始化一个 Git 仓库。

`git add ‘<name>’`or `git add .` 暂存文件。

`git commit -m ‘<name>’` 提交到Git仓库。

#### 文件状态

`git status` 随时掌握工作区的状态。

`git diff` 比较工作区与缓存区，查看修改内容。

`git diff -- cached` 比较缓存区与本地库最近一次commit内容。

`git diff HEAD`比较工作区与本地最近一次commit内容。

#### 配置命令

`git config --list` 列出当前配置。

`git config --local --list` 列出Repository配置。

`git config --global --list` 列出全局配置。

`git config --system --list`  列出系统配置。

`git config --global user.name "your name"` 配置用户名。

`git config --global user.email "youremail@github.com"`  配置用户邮箱。

配置 Git 的时候，加上`--global` 是针对当前用户起作用的；如果不加，那只针对当前的仓库起作用。

每个仓库的 Git 配置文件都放在`.git/config` 文件中。

#### 版本回退

`HEAD`指向的版本就是当前版本。

`git log` 可以查看提交历史，以便确定要回退到哪个版本。

`git reflog` 查看命令历史，以便确定要回到未来的哪个版本。

`git reset --hard commit_id` 在版本的历史之间穿梭。

工作区和暂存区（Working Directory and Repository）。

#### 管理修改

`git add` 实际上是把文件添加到暂存区。

`git commit` 实际上是把暂存区的所有内容提交到当前分支。

每次修改，如果不用`git add`到暂存区，那就不会加入到`commit`中。

#### 撤销修改

当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file` 。

当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，用命令`git reset HEAD '<name>'` 回到上一步。

已经提交了不合适的修改到版本库时，想要撤销本次提交，参考''版本回退''，不过前提是没有推送到远程库。

`git rm` 删除一个文件。

### 二、远程仓库
#### 添加远程库

`git remote add origin git@server-name:path/repo-name.git` 关联一个远程库。

`git push -u origin main` 第一次推送 main 分支的所有内容。

`git push origin main` 推送最新修改。

#### 从远程库克隆

`git clone` 命令克隆克隆一个仓库。

Git 支持多种协议，包括 https，但 ssh 协议速度最快。

#### 远程库操作

`git push origin -d <branch-name>` 删除远程分支。

`git branch -m <oldbranch-name> <newbranch-name>` 重命名分支。

`git checkout -b 本地分支名x origin/远程分支名x` 拉取远程分支并创建本地分支。

`git fetch origin <branch-name>:<local-branch-name>` 将远程仓库内容更新到本地。

### 三、分支管理
#### 创建与合并分支
`git branch` 查看分支。

`git branch <name>` 创建分支。

`git checkout <name>` 或者`git switch <name>` 切换分支。

`git branch -r` 查看远程分支或者 `git branch -a` 查看本地和远程分支。

`git checkout -b <name>` 或者`git switch -c <name>` 创建+切换分支。

`git merge <name>` 合并某分支到当前分支。

`git branch --merged` 查看哪些分支已经合并到当前分支。

`git branch --no-merged` 查看哪些分支没有合并到当前分支。

`git branch -v` 查看各个分支最后一个提交对象的信息。

`git branch -d <name>` 删除分支。

#### 解决冲突

当 Git 无法自动合并分支时，就必须首先解决冲突，解决冲突后，再提交，合并完成。

解决冲突就是把 Git 合并失败的文件手动编辑为我们希望的内容，再提交。

`git log --graph` 查看分支合并图。

合并分支时，加上 `--no-ff` 参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，`fast forward` 合并就看不出来曾经做过合并。

修复 bug 时，我们会通过创建新的 bug 分支进行修复，然后合并，最后删除。

当手头工作没有完成时，先把工作现场`git stash` 一下（文件暂存），然后去修复 bug。

`git stash save -a “message”` 添加改动到stash。

`git stash drop <stash@{ID}>` 删除暂存，`git stash clear` 删除全部缓存。

`git stash list` 查看stash列表。

修复后，再`git stash pop`，回到工作现场。

在 main 分支上修复的 bug，想要合并到当前 dev 分支，可以用`git cherry-pick <commit>` 命令，把 bug 提交的修改“复制”到当前分支，避免重复劳动。

开发一个新 feature，最好新建一个分支。

如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。

#### 多人协作

`git remote -v` 查看远程库信息。

本地新建的分支如果不推送到远程，对其他人就是不可见的。

`git pull` 抓取远程的分支，如果有冲突，要先处理冲突。

`git push origin branch-name` 从本地推送分支。

`git checkout -b branch-name origin/branch-name` 在本地创建和远程分支对应的分支。

`git branch --set-upstream branch-name origin/branch-name` 建立本地分支和远程分支的关联。 

#### Rebase
rebase 操作可以把本地未 push 的分叉提交历史整理成直线。

rebase 的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

### 四、标签管理

#### 创建标签

`git tag <tagname>` 用于新建一个标签，默认为 HEAD，也可以指定一个 commit id 。

`git tag -a <tagname> -m "  "`可以指定标签信息。

`git tag` 查看所有标签。

#### 操作标签

`git push origin <tagname>` 可以推送一个本地标签。

`git push origin --tags` 可以推送全部未推送过的本地标签。

`git tag -d <tagname>` 可以删除一个本地标签。

`git push origin :refs/tags/<tagname>` 可以删除一个远程标签。

### 五、自定义 Git

#### [gitgonore](https://github.com/github/gitignore) 忽略特殊文件

忽略某些文件时，需要编写`.gitignore`。

`.gitignore` 文件本身要放到版本库里，并且可以对`.gitignore` 做版本管理。

#### 搭建 [Git](http://git-scm.com/) 服务器

要方便管理公钥，用 [Gitosis](https://github.com/sitaramc/gitolite)。

要像 SVN 那样变态地控制权限，用 [Gitolite](https://github.com/sitaramc/gitolite)。



