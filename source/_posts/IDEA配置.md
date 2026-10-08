---
title: IntelliJ IDEA 的配置与使用总结
date: 2021-05-20
categories: 工具与运维
tags: [IDEA, 开发工具, Java]
---

> IntelliJ IDEA 被公认为是最好的 Java 开发工具之一，尤其在智能代码助手、代码自动提示、重构、J2EE 支持、Ant、JUnit、CVS 整合、代码审查、创新的GUI 设计等方面的功能可以说是超常的。相较于 Eclipse 而言，IDEA 增加了强大的整合能力、好用的快捷键和代码模板以及精准搜索，一些新的特性非常有必要学习熟悉。我目前使用的是 IDEA Ultimate 2021.2 版本，本篇笔记也是对最新版 IDEA 项目的创建、模板的使用、断点调试、数据库的关联、插件的下载、Maven及版本控制工具的配置等内容的一些总结。

<!--more-->

### 安装目录

- `bin`：容器，执行文件和启动参数等
  - `idea.exe.vmoptions`：VM 配置文件
  - `idea.properties`：IDEA 属性配置文件
- `help`：快捷键文档和其他帮助文档
- `jre64`：64 位 java 运行环境 
- `lib`：IDEA 依赖的类库 
- `license`：各个插件许可 
- `plugin`：插件

### 设置目录

#### config 目录 

- IDE 主要配置功能、自定义的代码模板、自定义的文件模板、自定义的快捷键、Project 的 tasks 记录等个性化配置

#### system 目录

- 缓存、索引、容器文件输出等

### Project

- IntelliJ IDEA 没有类似 Eclipse 的工作空间的概念（ Workspaces），最大单元就是 Project
- Eclipse 中 Workspace 相当于 IDEA 中的 Project
- Project 下的 `src` 类似于 Eclipse 下的 `src` 目录，用于存放代码
- Project 下的 `.idea` 和 `projectname.iml` 文件都是 IDEA 工程特有的，类似于 Eclipse 工程下的 `.settings`、`.classpath`、`.project` 等

### Module

- Eclipse 中 Project 相当于 IDEA 中的 Module
- 在 IntelliJ IDEA 中 Project 是最顶级的级别，次级别是 Module
- 一个 Project 可以有多个 Module。目前主流的大型项目都是分布式部署的， 结构都是类似这种多 Module 结构

### 常用配置

- Editor -> General

  - Change font size with `Ctrl` + Mouse Wheel

- Editor -> General -> Auto Import

  - Add unambiguous imports on the fly

  - Optimize imports on the fly

- Editor -> General -> Appearance

  - Show line numbers
  - Show method separators

- Editor -> General -> Code Completion

  - 取消 Match Case

- Editor -> General -> Editor Tabs

  - 取消 Show tabs in one row 

- Editor -> File and Code Templates -> Includes

  ```java
  /** 
  @author Bezhuang
  @create ${YEAR}-${MONTH}-${DAY} ${TIME} 
  */ 
  ```

- Editor -> File Encodings

  - Global / Project / Default encoding: `UTF-8`
  - Transparent native-to-ascii conversion

- Build, Execution, Deployment -> Compiler

  - Build project automatically（如果电脑带不动取消）
  - Compile independent modules in parallel

### Keymap

| 快捷键                  | 实现效果                                            |
| --------------------------- | --------------------------------------------------- |
| Ctrl + X                    | 删除当前行                                          |
| Ctrl +D                     | 复制当前行                                          |
| Alt+Insert（右键Generate） | get、set方法，构造函数等                |
| Ctrl+Alt+T                  | `try catch`（Alt+enter选择）            |
| CTRL+ALT+T                  | 把选中的代码放在 `TRY{}` `IF{}` `ELSE{}` 里         |
| Ctr+shift+U                 | 大小写之间转化                                |
| ALT+回车                    | 导入包，自动修正                                     |
| CTRL+ALT+L                  | 格式化代码                                          |
| CTRL+ALT+I                  | 自动缩进                                            |
| CTRL+E                      | 最近更改的代码                                      |
| Alt + 左右键            | 多窗口                          |
| Ctrl + 鼠标点击             | 快速找到成员变量的出处                              |
| Shift+F6                    | 重构/重命名 (包、类、方法、变量、甚至注释等)        |
| CTRL+Q                      | 查看当前方法的声明                                  |
| Ctrl+Alt+V                  | `new 对象();`（自动创建变量） |
| Ctrl+O                      | 重写方法                                            |
| Ctrl+I                      | 实现方法                                            |
| ALT+/                       | 代码提示                                            |
| Ctrl+Shift+R                | 在当前项目中替换指定内容                            |
| Ctrl+E                      | 最近编辑的文件列表                                  |
| Ctrl+P                      | 显示方法参数信息                                    |
| Ctrl+Shift+Insert           | 查看历史复制记录 |

### Templates

- Live Templates 可以自定义，而 Postfix Completion 不可以

- psvm -> `public static void main(String[] args)`

- sout -> `System.out.println()` 

  - soutp -> `System.out.println("方法形参名 = " + 形参名);`
  - soutv -> `System.out.println("变量名 = " + 变量);`
  - soutm -> `System.out.println("当前类名.当前方法");`
  - “abc”.sout -> `System.out.println("abc");`

- fori -> for 循环

  - iter -> 增强 for 循环
  - itar -> 普通 for 循环

- list -> `List<String> list = new ArrayList<String>();`

  - list.for -> `for(String s:list){}`


  - list.fori -> 正序遍历
  - list.forr -> 倒序遍历

- ifn -> `if(xxx = null)`

  - inn -> `if(xxx != null)`
  - xxx.nn
  - xxx.null

- prsf -> `private static final`

  - psf -> `public static final`
  - psfi -> `public static final int`
  - psfs -> `public static final String`

### 创建 Java Web

- Module 右键 -> add Framework Support
- 配置本地 Tomcat 环境变量
  - 系统环境变量中新建 `CATALINA_HOME` 环境变量
  - 修改 `Path` ： `%CATALINA_HOME%\lib`、`%CATALINA_HOME%\bin`、`%CATALINA_HOME%\lib\servlet-api.jar`
  - Tomcat 文件夹下打开 Terminal：`catalina run` 启动 Tomcat

### 关联数据库

- IDEA 的 Database 对于常使用的 ORM 框架，如 Hibernate、 Mybatis有很好的支持，比如配置好了 Database 之后，IDEA 会自动识别 domain 对象与数据表的关系，也可以通过 Database 的数据表直接生成 domain 对象等

### 版本控制

- IntelliJ IDEA 对版本控制的支持是以插件化的方式来实现的
- IntelliJ IDEA 自带了 Github 插件，方便 Checkout 和管理 Github 项目
- File -> Setting -> VCS (version control system)
- VCS -> Get from Version Control

### 断点调试

#### Debug 的设置

- File -> Settings -> Build, Execution, Deployment -> Debugger
  - Java -> Transport: Shared memory

#### 断点调试快捷键

- step over：进入下一步，如果当前行断点是一个方法，则不进入当前方法体内
- step into：进入下一步，如果当前行断点是一个方法，则进入当前方法体内
- force step into：进入下一步，如果当前行断点是一个方法，则进入当前方法体内
- step out：跳出
- resume program：恢复程序运行，但如果该断点下面代码还有断点则停在下一个断点上
- stop：停止
- mute breakpoints：点中，使得所有的断点失效
- view breakpoints：查看所有断点

#### 条件断点

- 调试的时候，在循环里增加条件判断，可以极大的提高效率
- 在断点处右击调出条件断点，可以在满足某个条件下，实施断点
- 选择行后 CTRL + u，可以在查看框中输入编写代码时的其他方法

### 配置 Maven

- 自动化构建工具：Make -> Ant -> Maven -> Gradle 
- Maven 使用了一个标准的目录结构和一个默认的构建生命周期，用于自动化构建和依赖管理
- 构建环节
  - 清理：表示在编译代码前将之前生成的内容删除
  - 编译：将源代码编译为字节码
  - 测试：运行单元测试用例程序
  - 报告：测试程序的结果
  - 打包：将 java 项目打成 jar 包，或将 Web 项目打成 war 包
  - 安装：将 jar 或 war 生成到 Maven 仓库中
  - 部署：将 jar 或 war 从 Maven 仓库中部署到 Web 服务器上运行
- File -> Settings -> Maven：选择自己Maven 的目录和 settings 文件，然后配置自己的本地仓库 repository
- Maven 目录下有对应的生命周期，其中常用的是：clean、compile、package、install

### 其他设置

- 生成 javadoc
  - Tools -> Generate JavaDoc
  - Locale（输入语言类型）：zh_CN 
  - Other command line arguments: `-encoding UTF-8 -charset UTF-8`
- 缓存和索引的清理
  - IntelliJ IDEA 首次加载项目的时候，都会创建索引，而创建索引的时间跟项目的文件多少成正比
  - IntelliJ IDEA 的缓存和索引主要是用来加快文件查询，从而加快各种查找、代码提示等操作的速度
  - 某些特殊条件下，IntelliJ IDEA 的缓存和索引文件也是会损坏的，可以清理缓存和索引
  - File -> Invalidate Caches / Restart
- 插件
  - File -> Settings -> Plugins
  - https://plugins.jetbrains.com/ 
