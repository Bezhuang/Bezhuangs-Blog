---
title: 初识 Spring
date: 2022-08-22
tags: []
categories: Java
references:
  - title: 黑马程序员2022新版SSM框架教程
    url: https://www.bilibili.com/video/BV1Fi4y1S7ix
  - title: 玩转 Spring 全家桶
    url: https://time.geekbang.org/course/intro/156
---

> 大部分 Java 后端程序员在日常工作中都会接触到 Spring ，Spring 早已成为 Java 后端开发事实上的行业标准，因此，如何用好 Spring ，也就成为 Java 程序员的必修课之一。我在去年[阿里云开发者社区的 Java 训练营](/Java高级训练营/)中就接触过 Spring，但是仍然需要系统学习搞懂 Spring 相关的核心功能和实现原理。本文是 Spring 学习第一章——初识 Spring 的笔记。

<!--more-->

### 一、Spring，始于框架，不止于框架

Spring 并不是单一的一个技术，而是一个大家族，可以从官网的 [Projects](https://spring.io/projects) 中查看其包含的所有技术。

Spring Framework 诞生于 2002 年，成型于 2003 年，最早的作者为 Rod Johnson：《Expert One-on-One J2EE Design and Development》、《Expert One-on-One J2EE Development without EJB》。

Spring Framework 用于构建企业级应用的轻量级一站式解决方案，设计理念：力争让选择无处不在，体现海纳百川的精神，保持向后兼容性，专注 API 设计，追求严苛的代码质量。

![](https://hexo.bezhuang.cn/img/spring01.png)

Spring Boot 是快速构建基于 Spring 的应用程序，旨在简化 Spring 应用的初始搭建和开发过程。进可开箱即用，退可按需改动，提供各种非功能特性，不用生成代码，没有 XML 配置。

Spring Boot 遵循“约定优于配置”的原则，只需要很少的配置或使用默认的配置。能够使用内嵌的 Tomcat、Jetty 服务器，不需要部署 war 文件。提供定制化的启动器 Starters，简化 Maven 配置，开箱即用。纯 Java 配置，提供了生产级的服务监控方案，如安全监控、应用监控、健康检测等。

Spring Cloud 用于简化分布式系统的开发，提供配置管理、服务注册与发现、熔断、服务追踪等功能。

### 二、第一个 Spring 程序

﻿﻿通过 [`Spring Initializr`](https://start.spring.io/) 生成骨架，依赖勾选 Spring Web 和 Spring Boot Actuator，编写第一段代码，运行程序。

```java
package bezhuang.spring.hello.hellospring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class HelloSpringApplication {

    public static void main(String[] args) {
      	SpringApplication.run(HelloSpringApplication.class, args);
    }

    @RequestMapping("/hello")
    public String hello() {
      	return "Hello, Spring";
    }

}
```

访问 http://localhost:8080/hello：

```
curl http://localhost:8080/hello
```

也可以访问其他功能：

```
curl http://localhost:8080/actuator/health
```

访问 Maven 的 POM 文件，分析项目结构：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.7.6</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>bezhuang.spring.hello</groupId>
	<artifactId>hello-spring</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>hello-spring</name>
	<description>Demo project for Spring Boot</description>
	<properties>
		<java.version>1.8</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-actuator</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```

