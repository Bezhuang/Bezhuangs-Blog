---
title: Maven 项目管理知识总结
date: 2022-03-14
tags: []
categories: Java
references: 
  - title: Java web从入门到企业实战
    url: https://www.bilibili.com/video/BV1Qf4y1T7Hx
---

> Maven 是 Apache 下的一个纯 Java 开发的开源项目。基于项目对象模型（缩写：POM）概念，Maven 利用一个中央信息片断能管理一个项目的构建、报告和文档等步骤。Maven 是一个项目管理工具，可以对 Java 项目进行自动化的构建和依赖管理，也可被用于构建和管理其他语言编写的各种项目，例如 C#，Ruby，Scala。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、Maven 概述

![maven01](https://hexo.bezhuang.cn/img/maven01.png)

Maven 是专门用于管理和构建 Java 项目的工具，n，可以对 Java 项目进行自动化的构建和依赖管理。它提供了一套标准化的项目结构，提供了一套标准化的构建流程（编译，测试，打包，发布……），提供了一套依赖管理机制。

标准化的项目结构：每一个开发工具（IDE）都有自己不同的项目结构，它们互相之间不通用。在 Eclipse 中创建的目录，无法在 IDEA 中进行使用，这就造成了很大的不方便，而 Maven 提供了一套标准化的项目结构，所有的 IDE 使用 Maven 构建的项目完全一样，所以 IDE 创建的 Maven 项目可以通用。

![maven02](https://hexo.bezhuang.cn/img/maven02.png)

标准化的构建流程：开发了一套系统，代码需要进行编译、测试、打包、发布，这些操作如果需要反复进行就显得特别麻烦，而 Maven 提供了一套简单的命令来完成项目构建。

依赖管理：管理你项目所依赖的第三方资源（jar包、插件），而 Maven 使用标准的坐标配置来管理各种依赖，只需要简单的配置就可以完成依赖管理。

Maven 模型：

1.   项目对象模型（Project Object Model）：将我们自己抽象成一个对象模型，有自己专属的坐标。

```xml
<groupId>com.itheima</groupId>
<artifactId>maven</artifactId>
<version>1.0-SNAPSHOT</version>
```

2.   依赖管理模型（Dependency）：使用坐标来描述当前项目依赖哪儿些第三方jar包。

```xml
<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>5.1.32</version>
</dependency>
```

Maven 仓库

* 本地仓库：自己计算机上的一个目录。在 maven 安装包中 `conf/settings.xml` 中修改 `<localRepository>`。
* 中央仓库：由 Maven 团队维护的全球唯一的仓库： https://repo1.maven.org/maven2/。
* 远程仓库(私服)：一般由公司团队搭建的私有仓库。
* 当项目中使用坐标引入对应依赖 jar 包后，首先会查找本地仓库中是否有对应的 jar 包，如果有，则在项目直接引用；如果没有，则去中央仓库中下载对应的jar包到本地仓库。
* 如果还可以搭建远程仓库，将来jar包的查找顺序则变为：本地仓库 --> 远程仓库--> 中央仓库。

Maven 安装配置

- IDEA 自带 Maven 且 Mac 无需配置环境变量。
- 安装 Maven Helper 插件。

### 二、Maven 基本使用

#### Maven 常用命令

`mvn compile` ：编译，在项目下会生成一个 `target` 目录。

`mvn clean`：清理，删除项目下的 `target` 目录。

`mvn test`：测试，执行所有的测试代码。

`mvn package`：打包，将当前项目打成的 jar 包。

`mvn install`：安装，将当前项目打成jar包，并安装到本地仓库。

#### Maven 生命周期

Maven 构建项目生命周期描述的是一次构建过程经历经历了多少个事件。

Maven 对项目构建的生命周期划分为3套：

* clean ：清理工作。

* default ：核心工作，例如编译，测试，打包，安装等。

* site ： 产生报告，发布站点等。这套声明周期一般不会使用。

同一套生命周期内，执行后边的命令，前面的所有命令会自动执行。当我们执行 `install`（安装）命令时，它会先执行 `compile`命令，再执行 `test ` 命令，再执行 `package` 命令，最后执行 `install` 命令；当我们执行 `package` （打包）命令时，它会先执行 `compile` 命令，再执行 `test` 命令，最后执行 `package` 命令。

#### Maven 坐标详解

Maven 中的坐标是资源的唯一标识，资源可以是插件、依赖、当前项目。

使用坐标来定义项目或引入项目中需要的依赖。

Maven 坐标主要组成：

* groupId：定义当前Maven项目隶属组织名称（通常是域名反写，例如：com.itheima）。

* artifactId：定义当前Maven项目名称（通常是模块名称，例如 order-service、goods-service）。

* version：定义当前项目版本号。

我们的项目如果被其他的项目依赖时，也是需要坐标来引入的。

### 三、Maven 依赖管理

#### 使用坐标引入 jar 包

在项目的 pom.xml 中编写` <dependencies>` 标签。

在 `<dependencies> `标签中 使用 `<dependency>` 引入坐标。

定义坐标的 ` groupId`，`artifactId`，`version`。

```xml
<dependencies>
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>5.1.32</version>
	</dependency>
</dependencies>
```

#### 依赖范围

通过设置坐标的依赖范围（scope），可以设置对应 jar 包的作用范围：编译环境、测试环境、运行环境。

通过 `scope` 标签指定依赖的作用范围。 那么这个依赖就只能作用在测试环境，其他环境下不能使用。

```xml
<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>5.1.32</version>
    <scope>test</scope>
</dependency>
```

`scope` 的取值：

| **依赖范围** | 编译classpath | 测试classpath | 运行classpath | 例子              |
| ------------ | ------------- | ------------- | ------------- | ----------------- |
| **compile**  | Y             | Y             | Y             | logback           |
| **test**     | -             | Y             | -             | Junit             |
| **provided** | Y             | Y             | -             | servlet-api       |
| **runtime**  | -             | Y             | Y             | jdbc驱动          |
| **system**   | Y             | Y             | -             | 存储在本地的jar包 |

compile：作用于编译环境、测试环境、运行环境。

test：作用于测试环境。典型的就是 Junit 坐标，以后使用 Junit 时，都会将 scope 指定为该值。

provided：作用于编译环境、测试环境。我们后面会学习 `servlet-api` ，在使用它时，必须将 `scope` 设置为该值，不然运行时就会报错。

runtime： 作用于测试环境、运行环境。jdbc驱动一般将 `scope` 设置为该值，当然不设置也没有任何问题 。

如果引入坐标不指定 `scope` 标签时，默认就是 compile  值，大部分 jar 包都是使用默认值。
