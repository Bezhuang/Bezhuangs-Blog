---
title: 2021 阿里云 Java 训练营第二期
date: 2021-03-21
references:
  - title: Spring Boot 2.5.x开发实战
    url: https://developer.aliyun.com/learning/course/71
categories: 后端开发
tags: [Java, 阿里云训练营]
---

> 本期训练营是继[Java新手训练营](/Java初级训练营)后的第2期，课程由阿里云开发者社区提供，同样采用5天不间断直播授课的形式，主要内容为Spring Boot 2.5自动化配置原理、实战开发REST API、MySQL数据库、Redis高并发缓存、MQ消息队列Kafka、安全机制、Docker容器等，本篇日志主要记录实战Spring Boot2.5开发中的一些常用知识点，附[实战代码](https://github.com/Bezhuang/LearnCS/tree/main/Java中级训练营)。

<!--more-->

![](https://hexo.bezhuang.cn//img/Java第二期训练营.png)

### Java Spring 企业级开发平台

- 最初来自2002年Rod Jahnson所著书《Expert One-on-One J2EE Design and Development》,最早名字为：Interface21
- 2003年6月诞生轻量级Java企业级开发工具类库[Spring](http://www.springsource.org)，现在已经发展成为包括开发工具、MVC框架、类库、微服务架构的完整平台（体系）
- 一个轻量级控制反转（IoC）和面向切面（AOP）的容器框架，一个分层的JavaSE/EE full-stack（一站式）轻量级开源框架
- Spring提供IOC、AOP、日志、安全、加密等工具类库，用于解决企业应用开发的复杂性
- Spring Framework：Spring工具类框架，其他Spring项目如Spring Boot也依赖于此框架
- Spring MVC：Java MVC网站开发框架
- Spring Boot：简化Spring应用开发。简化配置文件，使用嵌入式web服务器，含有诸多开箱即用微服务功能，可以和Spring Cloud联合部署
- Spring Cloud：微服务框架，为开发者提供分布式系统的配置管理、服务发现、路器、智能路由、微代理、控制总线等开发工具包
- Spring Data：数据访问框架，封装了很多种数据及数据库的访问相关技术，包括JDBC、Redis、MongoDB、Neo4J等
- Spring REST Shell：可以调用Rest服务的命令行工具，命令行操作Rest服务

### Spring Boot发展历史

- 联合创始人：Rod Jahnson、Juergen Hoeller、Yann Caroff
- Thomas Risberg&Spring JDBC、Keith Donald&Spring MVC、Adrain Coyler&Spring AOP
- 2014年4月开始发布Spring Boot2.0的1.0.0版本
- 配合模板和框架来简化Spring项目开发，轻松创建具有最小或零配置的独立应用程序的方式，它提供默认的代码和注释配置，只需要非常少的配置就能进行Java Spring应用开发
- Spring Boot = Auto-Dependency Resolution + Auto-Configuration ＋Management Endpoints + Embedded HTTP Servers (Tomcat, Jetty)
- Spring Boot 2.5.0加入startup endpoint支持GET请求、info endpoint安全改进、支持Java16等新特性

### 实战Spring Boot 2.4

- [在线创建Spring项目](start.spring.io)

- 开发环境：Open JDK，Eclipse需要添加Spring Tools 4插件，IDEA自带

  - `start.spring.io` 连接失败可使用 `start.alibaba.com` 源替代
  - Spring Web（Tomcat）：http://localhost:8080/hello

- REST API

  ```java
  @RestController
  @SpringBootApplication
  public class JavaSpringBoot01HelloWorldDemoApplication {
      public static void main(String[] args){SpringApplication.run(JavaSpringBoot01HelloWorldDemoApplication.class, args);}    
      @RequestMapping("/hello")  //公开http接口，默认端口8080，可在application.properties中修改
      public String hello() {    
      	String s = "Hello Spring Boot";
      	return s;}
  }
  ```

- 修改端口和context path（`appilcation.properties`文件）

  ```properties
  spring.application.name='JavaSpringBoot212'
  server.servlet.contextPath=/SpringBoot
  server.host='localhost'
  server.port='8080'
  ```

### 自动化配置Autoconfig底层原理

- Spring Boot auto configuration根据`classpath`的jar依赖自动配置Spring应用
- @SpringBootApplication注解
  - 等于三大注解：`@EnableAutoConfiguration` + `@ComponentScan` + `@Configuration`之和
  - `@Configuration`将该注解类标记为应用程序上下文的bean来源
  - `@EnableAutoConfiguration`告诉Spring Boot自动配置添加bean
  - 通常手动为Spring MVC应用程序添加`@EnableWebMvc`，但Spring Boot会在类路径上看到spring-webmvc时自动添加该注解，为Web应用添加并启用关键特性，例如设置DispatcherServlet
  - `@ComponentScan`告诉Spring扫描组件，配置和服务，控制器
- Auto-configuration is non-invasive 非侵入式
- 自动配置也可以被禁用
- 自动化配置机制核心：`spring-boot-autoconfigure.jar` + `spring.factories`
- Springboot启动（依赖、配置）-> 自动化依赖（解析、加载）-> 自动化配置（工厂模式创建Bean、依赖注入）-> 自动化服务器（内置Web Server、监听）
- `AutoConfigurationPackages.Registrar` 注册存储客户端配置包列表的bean，可通过`AutoConfigurationPackages.get`（BeanFactory）静态方法访问
- ImportSelector导入选择器负责引导自动配置机制：`@Import(EnableAutoConfigurationImportSelector.class)`
- `spring.autoconfigure.exclude` 属性控制要排除的自动配置类列表
- 监控自动注入的Bean

  ```java
  @Bean
  	public CommandLineRunner commandLineRunner(ApplicationContext ctx){
          return args -> {
              System.out.println("监控Spring Boot 2.0自动注入的Bean:");
              String[] beanNames =ctx.getBeanDefinitionNames();
              Arrays.sort(beanNames);
              for (String beanName : beanNames){
                  System.out.println("Spring自动注入Bean:"+beanName);}
          };}
  ```

### 使用Spring Data连接MySQL数据库

- Spring Data快速数据访问框架、强大的repository仓储和自定义对象映射ORM抽象，提供统一的编程模型
- 通过JavaConfig和自定义XML命名空间轻松实现Spring集成与Spring MVC控制器的高级集成，实验支持跨库持久性

- Spring Boot实战MySQL
  - Spring JDBC and JdbcTemplate
  - Spring Data简化连接不同的数据库
  - Spring Data JPA连接MySQL，默认底层使用Hibernate framework，支持Repository仓储模式
  - 引入最重要的两个包：`spring-boot-starter-data-jpa`和`mysql-connector-jave`
- Spring Data JPA框架
  - Spring Data JPA简化数据访问层的开发工作，基于Spring和JPA构建存储库的完美支持
  - 支持Querydsl谓词，从而支持类型安全的JPA查询，在引导时验证`@Query`带注释的查询
  - 支持Domain类的透明审核，分页支持，动态查询执行，集成自定义数据访问代码的能力
  - 支持基于XML的实体映射，引入`@EnableJpaRepositories`，基于`JavaConfig`的存储库配置

### MongoDB 4.0数据库

- [阿里巴巴MongoDB高级实战](https://edu.aliyun.com/workshop/3/course/1044)

- NoSQL排名第一的分布式数据库，由C++语言编写，特点是高性能、高并发、易部署、易使用、存储数据非常方便（灵活的数据模型），旨在为Web应用提供可扩展的高性能数据存储解决方案

- MongoDB开源、跨平台，支持Windows、Linux、OS X和Solaris系统，集成内存缓存，自动分片储存，支持分布式查询和跨文档事务，便于横向扩展

- Repository仓储层代码

  ```java
  public interface BlogRepository extends MongoRepository<Blog, ObjectId>{
      public Blog findById(ObjextId id);
      public void delete(ObjectId id);
      public List<Blog> findAll();}
  ```

- 启动命令：`.\mongod.exe --port 27017 --dbpath="../data" --logpath="../log/mongo.log"`

- 命令行控制

  ```bash
  show dbs
  use database
  db.users.insert({"key1":"value1","key2":"value2"})
  db.users.find()
  ```

- 可视化管理工具：Compass、Robo 3T（Robomongo）

### Redis分布式缓存6.0

- 三层架构+高并发缓存：前端（UI界面）-> 后台（API接口+Services业务逻辑+DAO数据访问）-> 数据（MongoDB+MySQL/Oracle/SQLServer+Redis）
- Redis API：`org.springframework.data.redis.connection`包，`RedisConnection`，`RedisConnectionFactory Interface`
- RedisConnection解析为Redis通信提供核心组件，处理与Redis服务器后端的通信
- 配置参数：RedisConnectionFactory工厂模式，RedisTemplate：RedisConnection对象，Repository：Connection Pool
- RedisTemplate Interface：GeoOperations，HashOperations，HyperLogLogOperations，ListOperations，SetOperations，ValueOperations，ZSetOperations
- Redis默认接口：6379（最好安装在Linux系统）
- Redis6.0配置文件`redis.conf`里默认的IP配置，要改掉才能远程链接（改成 bind 0.0.0.0）

### 安全机制

- 自定义实现安全验证
- Spring Security开源框架
  - 专注于身份验证和授权，保护Spring应用系统的安全标准
  - 提供安全认证服务的框架
  - Authetication验证和Authorization收起
- Apache Shiro开源框架
  - 简单易用的开源Java安全框架，可应用于Web和非Web环境
- Basic、Form、OAuth、LDAP、Kerberos、X509、Token验证
- WebSecurityConfig：配置安全规则，默认启用basic验证
- 全站安全验证配置

### REST API帮助文档Swagger

- Spring REST Docs（离线，不好用）
- Swagger自动化文档工具
  - 一个完整的API生态，工具，规范，代码规范

- Swagger依赖：springfox-swagger2，

### 应用程序性能监控（Admin&Actuator）

- 环境、bean、版本、内存、日志、指标、配置、JVM、GC
- 性能监控和管理组件Actuator
  - 使用HTTP Endpoint或JMX，运行状态指标数据收集
  - 默认监控EndPoint：http://localhost:8080/Actuator
  - `management.endpoints.web.exposure.include=*`
- Micrometer：多维度指标收集器，语言中立的API（可采集数据图形）
- Spring Boot Admin Server：开发监控服务端
  - `management.endpoints.health.show-details`

### Docker容器

- Spring Boot Docker Hub
- 阿里云Docker镜像仓库（国内第一）提供Docker Images镜像加速
- DockerFIle：Docker镜像配置文件
- Build Docker Image with Maven：`mvn clean package dockerfile:build` 

### 课程代码

- 课程代码已上传 [Github 仓库](https://github.com/Bezhuang/LearnCS/tree/main/%E9%98%BF%E9%87%8C%E4%BA%91%E5%BC%80%E5%8F%91%E8%80%85%E5%AD%A6%E9%99%A2/Java%E4%B8%AD%E7%BA%A7%E8%AE%AD%E7%BB%83%E8%90%A5)
