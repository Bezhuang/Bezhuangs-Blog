---
title: Spring IOC 核心概念
date: 2022-08-24
tags: []
categories: Java
references:
  - title: 黑马程序员2022新版SSM框架教程
    url: https://www.bilibili.com/video/BV1Fi4y1S7ix
---

> 大部分 Java 后端程序员在日常工作中都会接触到 Spring ，Spring 早已成为 Java 后端开发事实上的行业标准，因此，如何用好 Spring ，也就成为 Java 程序员的必修课之一。我在去年[阿里云开发者社区的 Java 训练营](/Java高级训练营/)中就接触过 Spring，但是仍然需要系统学习搞懂 Spring 相关的核心功能和实现原理。本文是 Spring 学习第二章——Spring IOC 核心概念的笔记。

<!--more-->

### 一、IOC（Inversion of Control）和 IOC 容器

传统 Java 项目中，业务层需要调用数据层的方法，就需要在业务层 new 数据层的对象，如果数据层的实现类发生变化，那么业务层的代码也需要跟着改变，发生变更后，都需要进行编译打包和重部署，耦合度偏高。

![](https://hexo.bezhuang.cn/img/spring02.png)

针对这个问题，Spring 就提出了一个解决方案：使用对象时，在程序中不要主动使用 new 产生对象，转换为由外部提供对象。

IOC 控制反转：使用对象时，由主动 new 产生对象转换为由外部提供对象，此过程中对象创建控制权由程序转移到外部，此思想称为控制反转。

Spring 技术对 IOC 思想进行了实现，Spring 提供了一个容器，称为 IOC 容器，用来充当 IOC 思想中的"外部"。IOC 思想中的“别人”（外部）指的就是 Spring 的 IOC 容器。

IOC 容器负责对象的创建、初始化等一系列工作，其中包含了数据层和业务层的类对象。被创建或被管理的对象在 IOC 容器中统称为 Bean，IOC 容器中放的就是一个个的 Bean 对象。

Spring 是使用容器来管理 bean 对象的，主要管理项目中所使用到的类对象，比如 Service 和 Dao，并且使用配置文件将被管理的对象告知 IOC 容器。被管理的对象交给 IOC 容器，Spring 框架提供相应的接口获取到 IOC 容器，IOC 容器得到后，调用 Spring 框架提供对应接口中的方法从容器中获取 bean。使用 Spring 导入哪些坐标就需要在 `pom.xml` 添加对应的依赖。

#### IOC 入门案例

需求分析：将 `BookServiceImpl` 和 `BookDaoImpl` 交给 Spring 管理，并从容器中获取对应的 bean 对象进行方法调用。

1.   创建 Maven 的 Java 项目

2.   pom.xml 添加 Spring 的依赖 jar 包：

     ```xml
     <dependencies>
         <dependency>
             <groupId>org.springframework</groupId>
             <artifactId>spring-context</artifactId>
             <version>5.2.10.RELEASE</version>
         </dependency>
         <dependency>
             <groupId>junit</groupId>
             <artifactId>junit</artifactId>
             <version>4.12</version>
             <scope>test</scope>
         </dependency>
     </dependencies>
     ```

3.   在不同位置创建 `/service/BookService.java`，`/service/impl/BookServiceImpl.java`，`/dao/BookDao.java` 和 `/dao/impl/BookDaoImpl.java` 四个类：

     ```java
     public interface BookDao {
         public void save();
     }
     
     public class BookDaoImpl implements BookDao {
         public void save() {
             System.out.println("book dao save ...");
         }
     }
     
     public interface BookService {
         public void save();
     }
     
     public class BookServiceImpl implements BookService {
         private BookDao bookDao = new BookDaoImpl();
         public void save() {
             System.out.println("book service save ...");
             bookDao.save();
         }
     }
     ```

4.   resources 目录下新建 Spring 配置文件 `applicationContext.xml`，并完成 bean 的配置：

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
     
     <!-- bean标签表示配置bean：id属性表示给bean起名字，class属性表示给bean定义类型 -->
         
       	<bean id="bookDao" class="bezhuang.spring.dao.impl.BookDaoImpl"/>
         <bean id="bookService" class="bezhuang.spring.service.impl.BookServiceImpl"/>
       
     <!-- bean定义时id属性在同一个上下文中(配置文件)不能重复 -->
     </beans>
     ```

5.   使用 Spring 提供的接口完成 IOC 容器的创建，创建 App 类，编写 main 方法：

     ```java
     public class App {
         public static void main(String[] args) {
         		//加载配置文件，获取IOC容器
     				ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml"); 
         		//从容器中获取对象进行方法调用    
             //BookDao bookDao = (BookDao) ctx.getBean("bookDao");
             //bookDao.save();
             BookService bookService = (BookService) ctx.getBean("bookService");
             bookService.save();
         }
     }
     ```

Spring 的 IOC 入门案例已经完成，但是在 `BookServiceImpl` 的类中依然存在 `BookDaoImpl` 对象的 new 操作，它们之间的耦合度还是比较高。这块该如何解决，就需要用到下面的 DI（依赖注入）。

### 二、DI（Dependency Injection）

当 IOC 容器中创建好 service 和 dao 对象后，IOC 容器中虽然有 service 和 dao 对象，但是 service 对象和 dao 对象没有任何关系，需要把 dao 对象交给 service，因为 service 运行需要依赖 dao 对象，也就是说要绑定 service 和 dao 对象之间的关系。

像这种在容器中建立对象与对象之间的绑定关系就要用到 DI（依赖注入）：在容器中建立 bean 与 bean 之间的依赖关系的整个过程，称为依赖注入，业务层要用数据层的类对象，以前是自己 `new `的，现在自己不 new 了，靠 IOC 容器来给注入进来。

IOC/DI 思想的最终目标就是充分解耦，具体实现靠：使用 IOC 容器管理 bean（IOC），在 IOC 容器内将有依赖关系的 bean 进行关系绑定（DI），最终结果为：使用对象时不仅可以直接从 IOC 容器中获取，并且获取到的 bean 已经绑定了所有的依赖关系。

要想实现依赖注入，必须要基于 IOC 管理 Bean，Service 中使用 new 形式创建的 Dao 对象需要删除掉，最终要使用 IOC 容器中的 bean 对象。在 Service 中提供方法，让 Spring 的 IOC 容器可以通过该方法传入 bean 对象。

#### DI 入门案例

需求：基于 IOC 入门案例，在 `BookServiceImpl` 类中删除 new 对象的方式，使用 Spring 的 DI 完成 Dao 层的注入。

1.   在 `BookServiceImpl` 类中，删除业务层中使用 new 的方式创建的 dao 对象：

     ```java
     public class BookServiceImpl implements BookService {
         //删除业务层中使用new的方式创建的dao对象
         private BookDao bookDao;
     
         public void save() {
             System.out.println("book service save ...");
             bookDao.save();
         }
     }
     ```

2.   在 `BookServiceImpl` 类中，为 `BookDao` 属性提供 `setter` 方法：

     ```java
     public class BookServiceImpl implements BookService {
         //删除业务层中使用new的方式创建的dao对象
         private BookDao bookDao;
     
         public void save() {
             System.out.println("book service save ...");
             bookDao.save();
         }
         //提供对应的set方法
         public void setBookDao(BookDao bookDao) {
             this.bookDao = bookDao;
         }
     }
     ```

3.   在配置文件中添加依赖注入的配置：

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <beans xmlns="http://www.springframework.org/schema/beans"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
         <!--bean标签标示配置bean
         	id属性标示给bean起名字
         	class属性表示给bean定义类型
     	-->
         <bean id="bookDao" class="bezhuang.spring.dao.impl.BookDaoImpl"/>
     
         <bean id="bookService" class="bezhuang.spring.service.impl.BookServiceImpl">
             <!--配置server与dao的关系-->
             <!--property标签表示配置当前bean的属性-->
           	<!--name属性表示配置哪一个具体的属性，ref属性表示参照哪一个bean-->
             <property name="bookDao" ref="bookDao"/>
         </bean>
     
     </beans>
     ```

property 配置中的两个 bookDao 的含义是不一样的：

* `name="bookDao"` 中 `bookDao` 的作用是让 Spring 的 IOC 容器在获取到名称后，将首字母大写，前面加 set 找对应的 `setBookDao()` 方法进行对象注入。
* `ref="bookDao"` 中 `bookDao` 的作用是让 Spring 能在 IOC 容器中找到 id 为 `bookDao` 的 Bean 对象给 `bookService` 进行注入。

### 三、IOC 相关内容

#### bean 基础配置

bean 用来定义 Spring 核心容器管理的对象，bean 基础配置（id 和 class）：

```xml
<bean id="" class=""/>
<!--
id： bean的id，使用容器可以通过id值获取对应的bean，在一个容器中id值唯一
class: bean的类型，即配置的bean的全路径类名
-->
<bean id="bookDao" class="bezhuang.spring.dao.imp1.BookDaoImpI"/> 
<bean id="bookService" class="bezhuang.spring.service.imp1.BookServiceImp1"></bean>
```

bean 的别名配置，打开 Spring 的配置文件 `applicationContext.xml`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--name:为bean指定别名，别名可以有多个，使用逗号，分号，空格进行分隔-->
    <!--Ebi全称Enterprise Business Interface，翻译为企业业务接口-->
    <bean id="bookService" name="service service4 bookEbi" class="bezhuang.spring.service.impl.BookServiceImpl">
        <property name="bookDao" ref="bookDao"/>
    </bean>
  
    <bean id="bookDao" name="dao" class="bezhuang.spring.dao.impl.BookDaoImpl"/>
</beans>
```

根据名称容器中获取 bean 对象：

```java
public class App {
    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        //此处根据bean标签的id属性和name属性的任意一个值来获取bean对象
        BookService bookService = (BookService) ctx.getBean("service4");
        bookService.save();
    }
}
```

bean 依赖注入的 ref 属性指定 bean，必须在容器中存在，ref 的属性值，也可也是另一个 bean 的 name 属性值，不过此处还是建议使用其 id 来进行注入。

bean 作用范围 scope 配置：定义 bean 的作用范围，可选 singleton 单例（默认）或 prototype 非单例。

在 Spring 配置文件中，配置 scope 属性来实现 bean 的非单例创建（创建不同对象）：

```xml
<bean id="bookDao" class="bezhuang.spring.dao.imp1.BookDaoImpl" scope="prototype" />
```

bean 默认为单例，即在 Spring 的 IOC 容器中只会有该类的一个对象。 bean 对象只有一个就避免了对象的频繁创建与销毁，达到了 bean 对象的复用，性能高。

bean 在容器中是单例的，如果对象是有状态对象，即该对象有成员变量可以用来存储数据的，因为所有请求线程共用一个 bean 对象，所以会存在线程安全问题。如果对象是无状态对象，即该对象没有成员变量没有进行数据存储的，因方法中的局部变量在方法调用完成后会被销毁，所以不会存在线程安全问题。

哪些 bean 对象适合交给容器进行管理：表现层对象、业务层对象、数据层对象、工具对象。

哪些 bean 对象不适合交给容器进行管理：封装实例的域对象，因为会引发线程安全问题，所以不适合。

#### bean 实例化

bean 本质上就是对象，对象在 new 的时候会使用构造方法完成，那创建 bean 也是使用构造方法完成的。

实例化 bean 有三种方式：构造方法，静态工厂和实例工厂。

Spring 的第一种 bean 的创建方式：构造方法实例化。Spring 底层使用的是类的无参构造方法。

-   提供可访问的构造方法：

    ```java
    public class BookDaoImpl implements BookDao {
      public BookDaoImpl() {
        System.out.println{"book constructor is running..."};
      }
      public void save() {
        System.out.println{"book dao save... "};
      }
    }
    ```

-   配置：

    ```java
    <bean 
      id="bookDao"
      class="bezhuang.spring.dao.impl.BookDaoImpl"
        />
    ```

-   无参构造方法如果不存在，将抛出异常。 

Spring 的第二种 bean 的创建方式：静态工厂实例化。这种方式一般是用来兼容早期的一些老系统，所以了解为主。

-   静态工厂

    ```java
    public class OrderDaoFactory {
    	public static OrderDao getOrderDao(){
        return new OrderDaoImp1();
      }
    }
    ```

-   配置：

    ```xml
    <bean id="orderDao" class="bezhuang.spring.factory.OrderDaoFactory" factory-method="getOrderDao"/>
    ```

-   `class`：工厂类的类全名，`factory-mehod`：具体工厂类中创建对象的方法名。

Spring 的第三种 bean 的创建方式：实例工厂实例化。

-   创建一个工厂类并提供一个普通方法，注意此处和静态工厂的工厂类不一样的地方是方法不是静态方法。

    ```java
    public class UserDaoFactory {
        public UserDao getUserDao(){
            return new UserDaoImpl();
        }
    }
    ```


-   在 Spring 的配置文件中添加以下内容。

    ```xml
    <bean id="userFactory" class="bezhuang.spring.factory.UserDaoFactory"/>
    <bean id="userDao" factory-method="getUserDao" factory-bean="userFactory"/>
    ```


-   factory-bean：工厂的实例对象，factory-method：工厂对象中的具体创建对象的方法名。

实例工厂实例化的方式配置的过程还是比较复杂，所以 Spring 为了简化这种配置方式就提供了一种叫 `FactoryBean` 的方式来简化开发。

1.   创建一个 UserDaoFactoryBean 的类，实现 FactoryBean 接口，重写接口的方法：

     ```java
     public class UserDaoFactoryBean implements FactoryBean<UserDao> {
         //代替原始实例工厂中创建对象的方法
         public UserDao getObject() throws Exception {
             return new UserDaoImpl();
         }
         //返回所创建类的Class对象
         public Class<?> getObjectType() {
             return UserDao.class;
         }
     }
     ```

2.   在 Spring 的配置文件中进行配置：

     ```xml
     <bean id="userDao" class="bezhuang.spring.factory.UserDaoFactoryBean"/>
     ```


#### bean 生命周期

bean 生命周期是 bean 对象从创建到销毁的整体过程。bean 生命周期控制的是在 bean 创建后到销毁前做一些事情。

![](https://hexo.bezhuang.cn/img/spring03.png)

Spring 中对 bean 生命周期控制提供了两种方式：

* 在配置文件中的 bean 标签中添加 `init-method` 和 `destroy-method` 属性。
* 类实现 `InitializingBean` 与 `DisposableBean` 接口，这种方式了解下即可。

对于 bean 的生命周期控制在 bean 的整个生命周期中所处的位置：

* 初始化容器
    1.   创建对象（内存分配）
    2.   执行构造方法
    3.   执行属性注入（set 操作）
    4.   执行 bean 初始化方法

* 使用 bean：执行业务操作
* 关闭/销毁容器：执行 bean 销毁方法

关闭容器的两种方式：（`ConfigurableApplicationContext` 是 `ApplicationContext` 的子类）

* `close()` 方法
* `registerShutdownHook()` 方法

### 四、DI 相关内容

Spring 为我们提供了两种注入方式，setter 注入和构造器注入。
