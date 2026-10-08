---
title: 2021 阿里云 Java 训练营第一期
date: 2021-02-24
tags: []
categories: Java
---

> 在阿里云开发者社区中看到有[Java新手训练营](https://developer.aliyun.com/learning/trainingcamp/java/1?spm=a2c6h.21110250.J_3925608520.1.73b63c67PXfMgE)（5天突破Java面向对象编程）的课程，采用直播授课的形式，希望能在侠客大佬的指导下有更好的学习效果吧。当然，直播时间有限，所以这篇日志并不是对Java知识点完全系统的梳理，主要记录一些开发中常用的语法和概念和在面试时会遇到的问题，以[训练](https://github.com/Bezhuang/LearnCS/tree/main/Java%E8%AE%AD%E7%BB%83%E8%90%A5)和熟悉特性为主。

<!--more-->

![](https://hexo.bezhuang.cn/img/Java第一期训练营.png)

### Java知识点

1. Java语言的发展历史
2. Java语言的优势和特点
3. OOP面向对象编程概念：对象、`Class`类、继承、封装、多态
4. 基础语法：数据类型、8大基本类型、数据结构
5. 关键字：`int` 、`class`
6. 变量：存储数据
7. 数据类型: `String`、`int`、`bool`、链表`List`、数组、哈希表、字典
8. 控制语句: `if else`、`while`、`for`
9. 文件操作：调用封装好的类库 `File`
10. 网络编程：Socket TCP/IP、SMTP邮件传输协议等
11. 数据库连接：ADO.NET , JDBC 等连接库 NoSQL
12. 网站框架：PHP、ASP、JSP、ASP.NET、Spring MVC、Node

#### Java语言特性

- IDE：Eclipse 或者IntelliJ IDEA、MyEclipse
- JDK（Java Development Kit）：Java开发工具包，包含JAVA的运行环境和开发工具

  - Java虚拟机（JVM+Java系统类库）、Java编译器、Java调试工具、Java分析工具
  - 安装和配置：JDK环境变量和 classpath
- Src：源代码文件夹，Source；Bin文件夹：保存编译后的二进制文件


#### Hello World

```java
package come.alibiba;
public class Test {
	public static void main(String[] args) {
		System.out.println("Hello World");   //println：输出行
	}
}
```

#### Java代码执行顺序

1. 编译原理：Java源代码 词法分析、语法分析

2. 编译后的文件 `.class` 文件， ByteCode 字节码格式
3. JVM 类装载器 ClassLoader 装载执行的类文件
4. 代码检验：符合JVM规范和类型安全等
5. Java中间代码 IR（Intermediate Representation）IL
6. 准备：准备方法表、静态字段等需要的内存空间
7. JIT 即时编译器执行二次编译 IR 中间代码
8. 转换为机器码
9. CPU 以 线程Thread 身份执行机器码

#### Java 9新特性

1. Jigsaw 项目：模块化，包，仿C#的程序集`dll`概念
2. 简化了的进程 API
3. 轻量级的 JSON API
4. 钱和货币的相关 API
5. 改善多线程锁争用机制
6. 代码分段缓存
7. 改进的 Stream API
8. 改进的 Javadoc
9. HTTP 2.0 客户端 HTTP/2。WebSocket
10. 多版本兼容JAR

#### Java三个版本

1. 2005年6月，JavaOne大会SUN公司公开Java SE 6（To，Java已经更名以取消其中数字"2“）
2. JavaSE（Java 2 Platform Standard Edition，java标准版）
3. JavaEE（Java 2 Platform,Enterprise Edition，java企业版）
4. JavaME（Java 2 Platform Micro Edition，java平台微型版）
5. Enterprise Java Bean（EJB）Java企业开发规范标准，框架重
6. Pivotal 公司开发一套 Spring 框架：取代EJB框架，简化Java企业级开发

#### JVM（Java虚拟机）

1. Java虚拟机： 托管执行Java的中间代码 `.class`，Java Virtual Machine缩写
2. 虚拟机：linux系统，Window系统虚拟计算机
3. Java编译成中间代码，JIT 即时编译器再次编译为CPU指令
4. CPU执行
5. JVM把 `.class` 文件加载内存，C#编译后文件格式 `.dll`
6. 二次编译 jit（Just in Time）转换为CPU指令执行
7. JVM 负责Java代码编译、执行、内存分配、GC回收
8. C#等价概念 CLR 公共语言运行时，包含C#、VB、F#等
9. Common Language Runtime

### 变量

- 8大基本数据类型
  - `byte` 字节 8bit 位，`short` 短整型 2X8bit，`int` 整型 4X8bit，`long` 长整型 8X8bit，`float` 浮点 4X8bit，`double` 双精度 8X8bit，`char` 字符 8bit，`boolean` 布尔类型 8bit
- 两大数据类型
  - 基本数据类型（Java 8大基本类型，C#中也有）
  - 引用数据类型（复杂的数据类型，Java，C#中也有）
  - C#中还有一种值类型概念
- 6大包装类（包装一层）：`Boolean`、`Character`、`Integer`、`Long`、`Float`、`Double`

#### Java的枚举类型

1. Java 中的枚举是一些常量的集合，Java 1.5 中引入，属于引用类型

2. `java.lang.Enum`

3. 大写关键字 `Enum`，小写关键字 `enum`

4. `Enum` 抽象类，所有枚举类型的基类，`enum` 继承自  `Enum`

   ```java
   public enum Season { SPRING, SUMMER, AUTUM, WINTER }
   ```

### 条件和循环语句

#### if条件

```java
int num = 10000;
if (num > 10000000) { System.out.println("超级富豪程序员"); } 
else if (num > 1000000) { System.out.println("富豪程序员"); }
else { System.out.println("码畜"); }
```

#### switch条件

```java
System.out.println("输入星期查询");
Scanner sin = new Scanner(System.in);
int day = sin.nextInt();
switch (day){
    case 6:
        System.out.println("休息");
        break;
    default:
        System.out.println("上班");
        break;}
```

#### for循环，for each循环

```java
int sum = 0;
for (int i = 1; i <= 100; i++) { sum = sum + i; } System.out.println(sum);
for (String s : list){ System.out.println(s); }  //foreach循环
```

#### while循环，do while循环

```java
int age = 18;
while(age<100) { age=age+1; System.out.println(age); }
do{ age++; System.out.println(age); }while (age<100)
```

#### 运算符

- 算数运算符，二进制位运算符（ `&`  与，`|`  或，`^ `异或，`〜 `按位取反），逻辑运算符（`&&` and，`||` or，`!` not），赋值运算符（`/= `除和），条件运算符 （三元运算符）`(a=1)?1:2`

### 面向对象编程

- Object Oriented Programming

- 软件工程的发展

  `面向硬件：CPU指令，汇编` -> `面向过程PO：C语言、Pascal` -> `面向对象OO：C++、Java、C#` -> `面向组件CO：COM` -> `面向服务SO：Web服务`

- `Class`类代码封装的基本单元，`Class`封装了数据（变量）和行为（函数功能）

- `Class` 描述抽象事务的类型，万物（`Object`）皆可归为类，对象是类的具体实体

- 类继承

#### OOP面向对象的三大特征

- 继承 `Inheritence`：子类继承父类的代码。继承是父类和子类之间共享数据和方法的机制，本质就是代码重用，通常把父类称为基类，子类称为派生类，Java和C#单继承，通过接口来实现多重继承，接口可以从多个基接口继承。
- 封装 `Encapsulation`：`Class` + 修饰符封装代码。就是用一个`Class`把数据和行为代码组合在一起，形成一个对象，面向过程封装`Function`，在Java和C#中类的工具，对象则是封装的基本单元，访问级别修饰符：`Public`、`Protected`、`Private`
- 多态性 `Polymorphism`：同一种行为，多种代码实现。就是指同一个操作作用于不同的对象，可以有不同的解释，产生不同的执行结果，多态性有两种，一种是静态多态（编译时多态），一种是动态多态（运行时多态），方法重载和重写实现。

#### 面向对象OOP核心概念

1. 面向过程编程（POP），Procedure Oriented Programming
2. 函数 Function 改名叫 方法 Method
3. 汇编、C、SQL、C++， Java，JavaScript、C#、Go
4. 对物品 Object 进行分类 Class，万物分类，抽象，Object物体，编程语言：对象
5. Class 代码封装的更大的单位，类包含功能函数和数据变量
6. 类全局变量：属性、成员，函数外面变量
7. `Class` 类：数据 + 行为功能，代码组织更合理，变量+函数， 字段+方法

#### 封装Encapsulation

- 封装 Encapsulation：相比之前Function功能，把数据和行为功能代码打包在一起，形成一个封闭Class类。代码封装单位。
- 在C#和Java中，类是支持对象封装的工具，对象则是封装的基本单元。
3. 类和结构是 .NET 和 Java 中的常规类型系统的基本构造，本质上都属于数据结构，封装着一个逻辑单位的数据和行为。
- 数据和行为是该类或结构的“成员”，它们包含各自的方法、属性和事件等。
- Class 默认是 `Internal`，成员是 `Private`

### OOP原则

#### Class类继承

- 为了更好的代码重用
- 在Java中，子类可以继承父类，所有的方法都是默认 `Virtual` 的

```java
public class Dog extends Animal{
    @Override               //重写
    public void Run()
    {System.out.println("Hello dog run...");}
}
```

- 构造函数，创建对象，实例化，构造对象，通过对象，调用行为，功能、方法

#### 面向对象行为多态

- 多态是行为（功能、函数、方法）的多态，指为同名的方法提供不同的实现代码，是面向对象编程的最重要特征

- 我们不用关心方法的具体实现而仅仅依靠名称来进行调用操作

- `Abstract` 抽象方法和 `Virtual` 虚方法是多态性的基础

- Java和C#提供三种多态能力：接口多态、继承多态、抽象多态

- 接口：部分约束、合约、约定

  ```java
  public interface IBike //声明一个接口 叫功能
  {void Call();}  //定义Call方法
  public class Cat : IBike //猫类实现接口
  {public void Call(){     
      Console.WriteLine("喵喵喵");}  //实现Call方法
  }
  ```

#### 多态的实现方式

- 重载 `Overloading`：同一个类中，兄弟方法，方法名相同，参数个数、类型、顺序不同
- 重写 `Override`：子类和父类，父子关系，子类重新实现父类中的同名方法
- `@override` 标记到重写的方法上

#### 抽象类

- 抽象的类型，无法具体化接口，约束合约

  ```java
  package com.frankxulei; //接口表示一种约束，电源接口、USB接口
  	public interface IFly { void Fly(); }
      public class Dog extends Animal implements IFly { //继承抽象类和接口
      @Override
      public void Run() { System.out.println("Hello dog run..."); }
      @Override
      public void Fly() { System.out.println("Hello dog fly..."); } }
  ```

#### 抽象类和接口的区别

1. 实例方法：创建对象才能调用的方法
2. 静态方法：`Static` 修饰的方法，属于类`Class`，不需要实例化
3. 虚方法：`virtual`，介于抽象和实体方法之间，可以重写

4. 除了 `static`、`final`、`private` 修饰的所有方法都是抽象类
5. `Abstract` 抽象类不可以被实例化，`interface` 接口也不可以
6. 抽象类只允许单继承，接口可以多继承
7. `Abstract` 抽象类有具体方法实现，接口只有方法声明
8. 抽象类使用关键字 `extends`，接口继承使用 `implements`
9. 抽象类代表同一类别， 接口代表一种部分约束

#### 虚方法，抽象方法和重写

- 父类不希望子类重写我

  ```java
  abstract class Car
  	{public void Run()//虚方法
  	{Console.WriteLine("BaseClass.VirtualMethod");}
  	public abstract void AddPower();} //抽象方法
  class BMWCar : Car
  	{ @override //重写虚方法
  	  public void Run(){ Console.WriteLine("SubClass.VirtualMethod");}
   	  @override
  	  public void AddPower(){ Console.WriteLine(“加油"); }}
  class Test
  { static void Main(){
  Car baseClass = new BMWCar(); //声明类型为基类，实际类型为子类
  //由实际类型决定调用子类还是父类方法，实际是SubClass类的对象：SubClass.VirtualMethod
  baseClass. Run();
  baseClass. AddPower(); }}//重写抽象方法
  ```

#### 简易计算器

- 用户输入数据：借用 `Scanner` 类
- 选择加减乘除：`IF` 条件判断
- 计算结果：数据类型
- 方法重载

### 文件编程

#### File文件流和IO读写文件工具类

- `Java.io` 包几乎包含了所有操作输入、输出需要的类，所有这些流类代表了输入源和输出目标
- `Java.io` 包，File文件类库的流支持很多格式（基本类型、对象、本地化字符集等）
- 一个流可以理解为一个数据的序列，输入流表示从一个源读取数据，输出流表示向一个目标写数据
- Java为I/O提供了强大而灵活的支持（类库），使其更广泛地应用到文件传输和网络编程中

  ```java
  import java.io.FileReader;
  import java.io.FileWriter;
  import java.io.IOException;
  ```

#### Java IO读写文件工具类

- Java读文件，通常会使用 FileInputStream 和 FileReader（也可以单独使用）读文本内容
- java写文件中，通常会使用 FileOutputStream 和 FileWriter（也可以单独使用），
- FileWriter 只能写文本文件

#### Java打开/保存开文件对话框

- AWT：FileDialog 类 + FilenameFilter 类实现本功能
- Swing：JFileChooser 类 + FileFilter 类实现本功能

###   复杂数据类型

#### 数组（Array）

- 物理上内存空间（数组连续的存储空间）连续，访问速度快，不灵活

- 相同数据类型的元素按一定顺序排列的集合（一组连续的存储空间），就是把有限个类型相同的变量用一个名字命名，然后用编号区分他们的变量的集合，这个名字成为数组名，编号成为下标。也叫索引 Index

- 数组是一种数据结构，它包含若干相同类型的变量。

- 数组元素，通过下标，0开始计数

  ```java
  int[10] array1 = new int[10];
  int[1]=2;
  int[] array2 = new int[] { 1, 3, 5, 7, 9 };
  String[] nameArray = {“C”,”Java”,”C++”};
  ```

#### 数组特点

- 内存空间连续
- 数组可以是一维、多维或交错的。
- 数值数组元素的默认值设置为零，而引用元素的默认值设置为 null
- 交错数组是数组的数组，因此其元素是引用类型并初始化为 null
- 数组的索引从0开始：具有n 个元素的数组的索引是从 0 到 n-1
- 数组元素可以是任何类型，包括数组类型。
- C#7.0 元组不限制数组元素类型，数组元素是各种类型
- 数组访问效率高，但是删除和插入效率低

#### 列表（List）

- List 链表：空间节点指针连接，链条节点，可变长度，物理上不连续，插入和删除节点性能高，但是查找性能较低
- 内存空间分离，指针指向下一个节点，灵活、空间大
- 单链表和双链表

#### 数据列表（ArrayList）

- Array 数组: 一组连续的物理空间，一组元素，不可变长度，查找性能高，但是插入和删除需要移动位置，性能低
- ArrayList：可变长度的数组

- 使用 `ArrayList` 类 `Add`、`AddRange` 和 `ToArray` 方法的项代码：

  ```java
  public static void Main() {
      ArrayList myAL = new ArrayList();// 创建和初始化ArrayList.
      myAL.Add("The"); //添加一个元素
      myAL.AddRange(new string[] { "the", "lazy","dog" });//添加一组元素
  }
  ```

#### 集合（Set）接口

- 集合 Set：不包含重复元素的集合，属于 Collection Framework 框架

- `public interface Set <E>`、`extends Collection <E>`

- 集合提供一种更灵活的方式使用对象组，内存空间灵活

- 与数组不同，处理的对象组可根据程序更改的需要动态地增长和收缩

- 对于某些集合，可以指定键Key，则放入集合中的所有对象，以便可以快速检索对象

- 集合是类，因此必须 `new` 新集合后，才能添加元素

  ```java
  Set<Integer> set = new HashSet<Integer>();
      for(int i = 0; i < 100; i++) {
      set.add(i);}
  System.out.println(set);
  TreeSet sortedSet = new TreeSet<Integer>(set); //有序集
  System.out.println(sortedSet);
  ```

#### 哈希映射（HashMap）

- HashMap，存储键值对（Key/Value）数据，类型定义 `java.util.HashMap<K,V>`

- `public class HashMap<K,V>`、`extends AbstractMap<K,V>`、`implements Map<K,V>, Cloneable, Serializable`

- 继承了抽象类 AbstractMap，基于哈希表的Map接口的实现，并允许 `null` 值和 `null` 键。

- 提供了 `get( )`  和 `put( )` 方法，HashMap 是无序的，即不会记录插入的顺序

- HashMap 与 Hashtable 基本一样，但是不同步，允许为 `null`

  ```java
  HashMap<Integer, String> hashmap = new HashMap<Integer, String>();
  System.out.println(hashmap.put(1, “C") ); //添加Key,Value
  System.out.println(hashmap.put(2, “C++") ); //添加Key,Value
  System.out.println(hashmap.put(3, “Java") ); //添加Key,Value
  ```

#### 哈希表（Hashtable）

- Hashtable 类实现一个哈希表，存储键Key映射到值Value，任何非空（Null）对象都可以用作键或值

- 为了成功地从哈希表存储和检索对象，用作键的对象必须实现 `hashCode` 方法和 `equals` 方法

- `Hashtable` 类包含在 `java.util` 包中，`java.util.Hashtable<K,V>`

- 哈希表（散列表）类似HashMap，但支持多线程安全，哈希表将key/value(键/值对)存储在哈希表中。

- 在Hashtable中，我们指定一个用作键的对象，以及要与该键关联的值，然后对键进行哈希处理，并将生成的哈希码用作将值存储在表中的索引。

- Hashtable 类的初始默认容量为11，而 loadFactor 为0.75。

- 在Java版本2中，重写了Hashtable类以实现Map接口，并使它成为 Java Collection Framework的成员

  ```java
  Hashtable<Integer, String> hashtable = new Hashtable<Integer, String>();
  System.out.println( hashtable.put(1, “C") ); //添加Key,Value
  System.out.println( hashtable.put(2, “C++") ); //添加Key,Value
  System.out.println( hashtable.put(3, “Java") ); //添加Key,Value
  ```

#### HashMap 和 HashTable的区别

| HashMap                       | Hashtable                              |
| ----------------------------- | -------------------------------------- |
| 非同步synchronized            | 同步synchronized                       |
| 不是线程安全                  | 线程安全                               |
| 允许1个null key 和多个null 值 | 不允许null key 和null value            |
| JDK 1.2引入                   | 早期就有                               |
| 使用Iterator遍历Hashmap       | 使用Iterator或Enumeration遍历Hashtable |
| 继承AbstractMap类             | 继承Dictionary类                       |
| 并发高                        | 并发低                                 |

#### 其他复杂数据类型

- 枚举（ Enumeration）
- 向量（ Vector）
- 栈（ Stack）：先进后出
- 字典（Dictionary ）
- 队列（Queue）：先进先出
- 树（Tree）

### 泛型

#### Java 泛型机制

- Java泛型（ generic Type）是JDK 5 2004年中引入的一个新特性。是万能类型，泛型实现代码和算法的重用
- Java泛型方法和泛型类 让类型定义更灵活，以后随意替换具体类型
- 早期 `List<Object>` 来接受更多的参数类型，该机制允许程序员在编译时检测到非法的类型，比如重用排序算法，支持各种类型对象的排序
- 泛型方法在调用时可以接收不同类型的参数
- Java泛型使用的机制和C#不同（伪泛型）。编译器会把泛型信息类型擦除。
- 实际编译的代码不包含类型信息 `type erasure`
- `ArrayList<E>` 和`HashMap<k,v>`都是典型的泛型类型

#### 泛型定义

```java
// Java泛型定义和C#泛型List定义语法一样
public class List<T> {
    private t;
    public void add(T t) {
    this.t = t;}
public T get() {
	return t;}
}
```

#### 泛型实战

```java
System.out.println("Java泛型实战");
ArrayList<String> listNames = new ArrayList<String>();
Class c2 = listNames.getClass();
listNames.add(“阿里Java训练营"); listNames.add(“阿里云大学");
System.out.println(c1 == c2);
for (String s : listNames) { System.out.println(s); }
```

### 数据库

#### ODBC开放数据库连接

- 微软提出的数据库接口标准：Open Database Connectivity，简称ODBC
- 开放数据库连接技术，解决不同异构数据库连接的问题，主要是Windows系统来用，支持多种数据库
- ODBC 现已成为WOSA（The Windows Open System Architecture）（Windows开放系统体系结构）的主要部分
- ODBC基于Windows系统一种数据库访问接口标准，用ODBC 可以访问各类计算机上的DB文件，也可以访问如Excel 表和 ASCII 数据文件这类非数据库对象

#### Java数据库连接驱动 JDBC

- JDBC 框架，Java数据库连接技术（Java Database Connectivity），与`.NET`中的`ADO.NET`类似
- JDBC是Java语言编程中与数据库连接的API，封装了各种数据库访问的API 和基础类库，支持多种数据库连接
- NoSQL：Mongodb 公司提供 Java 和 C# 驱动
- JDBC 支持的数据库：Oracle、DB2、Sql Server、Sybase、Informix、MySQL、PostgreSQL、access（直连用ODBC）
- JDBC 很像微软的`ADO.NET` 和C#的数据库连接技术，可以向数据库传递SQL语句命令，实现各种操作，也可以调用储存过程
- SQLHelper 和 MySQLHelper支持Java和C#工具类
- 现在普遍使用 ORM 框架，底层使用了JDBC和ADO.NET
- Hibernate（Entity Framework），mybatis（Dapper）

#### JDBC 5大对象 接口和类

- DriverManager：驱动管理器，管理数据库驱动程序列表
- Driver：处理与数据库服务器的通信，可能由多种驱动
- Connection：数据库连接对象。C#的连接对象是 SQLConnection
- Statement：SQL语句对象，将SQL语句提交数据库。SQLCommand
- ResultSet：SQL查询这些对象保存查询结果。DataSet、DataReader
- SQLException：数据库操作异常类型，C#也有

#### JDBC编程5大步骤

- JDBC 连接MySQL 对应的驱动包，工具类

  ```xml
  <!--在pom.xml文件中添加驱动dependency-->
  <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
  <dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.46</version>
  </dependency>
  ```

- 手动引用到项目中，Maven自动化构建工具

```java
package com.alibaba.AlibabaJava07JDBCMySQLDemo;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;

public class Test{
 public static void main(String[] args) throws ClassNotFoundException, SQLException { 
  // 1.加载驱动 JSP连接MySQL
  Class.forName("com.mysql.jdbc.Driver");
  // 2.连接数据
  String url = "jdbc:mysql://localhost:3306/taobao?useUnicode=true&characterEncoding=utf-8&useSSL=false";
  String username = "root";
  String password = "990312";
  Connection con = DriverManager.getConnection(url, username, password);
  // 3.SQL命令
  String sql = "select * from users order by Id";
  java.sql.Statement statement = con.createStatement();
  // 4.执行SQL命令
  ResultSet result = statement.executeQuery(sql);
  // 5.结果处理
  while (result.next()) {
   String id = result.getString("id");
   String name = result.getString("name");
   String psw = result.getString("password");
   System.out.println(id+" : "+ name + " : " + psw); }
  // 6.结束运行
  result.close();
  statement.close();
  con.close();  }  }
```

- 加载（注册）数据库驱动库 -> 建立链接 -> 执行SQL语句 -> 处理结果集RecordSet -> 关闭数据库

```java
// 3.SQL命令
String sql = "INSERT INTO `users` (`id`,`name`,`password`) VALUES(?,?,?);";
// 4.准备命令
PreparedStatement statement = connection.prepareStatement(sql);
// 5.设置参数
statement.setInt(1, id);
statement.setString(2, name);
statement.setString(3, password);
// 6.执行SQL命令
statement.execute();
// 7.关闭连接
statement.close();
connection.close();
```

#### JDBC驱动和数据库URL

| 数据库     | JDBC驱动名称                    | URL格式                                            |
| ---------- | ------------------------------- | -------------------------------------------------- |
| MySQL      | com.mysql.jdbc.Driver           | jdbc:mysql://hostname/databaseName                 |
| ORACLE     | oracle.jdbc.driver.OracleDriver | jdbc:oracle:thin:@hostname:portNumber:databaseName |
| PostgreSQL | org.postgresql.Driver           | jdbc:postgresql://hostname:port/dbname             |
| DB2        | com.ibm.db2.jdbc.net.DB2Driver  | jdbc:db2:hostname:port Number/databaseName         |
| Sybase     | com.sybase.jdbc.SybDriver       | jdbc:sybase:Tds:hostname:portNumber/databaseName   |

#### Java三层架构

1. UI展示层Presentation Layer：Swing、网页、WP、IOS、安卓
2. Services 业务逻辑层
3. DAO 数据访问层

### JSP网站开发和Servlet底层原理

#### Web网站开发框架

- JQuery、Bootstrap、EasyUI、Angular JS、React.JS、Vue.JS
- HTML5、CSS3、JavaScript、XML、JSON、Flash Silverlight
- PHP、ASP、JSP、ASP.NET MVC、Java Spring MVC、Node.js、Spring Boot
- Web服务器：Tomcat\Nginx\IIS
- ORM数据库连接

#### JSP动态网站开发框架

- PHP 脚本语言，1994
- ASP VBScript，1996 Active Server Page
- JSP JavaScript，1999年 网页中嵌入Java语言
- Netscape 网景公司和Sun
- ASP.NET WebForm 2002 拖控件，网页嵌入 C#

#### JSP动态网站开发技术

- JSP与PHP、ASP、ASP.NET等类似，是动态网页开发技术。
- JSP（全称Java Server Page）Sun公司，1999发布，由Sun Microsystems公司倡导和许多公司参与共同创建
- JSP 技术是以Java语言作为开发语言的，网页嵌入Java代码
- ASP是以vb脚本作为开发语言， C#嵌入，文件扩展名为 `.asp`
- ASP.NET WebForm 前后分离，嵌入C#，文件扩展名 `.aspx`
- JSP 网页本质上Java代码在服务器端处理客户端的HTTP请求
- HTML：Hypertext Markup Language 超文本标记语言，HTTP：Hypertext Transfer Protocol 超文本传输协议
- JSP文件后缀名为 `.jsp` ，JSP可以运行在Linux和Windows上

#### 新建一个JSP网站

1. Eclipse新建一个JSP网站
2. 编写页面内容Hello 阿里巴巴Java训练营
3. 使用Tomcat运行起来

#### Java写网页

- 内嵌 Java语言代码 `<%Java代码%>`

  ```html
  <%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  <html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>Java实战训练营</title>
  </head>
  <body>
  <img alt="" src="Images/mongodb.png">
  <% out.println(“阿里巴巴Java实战训练营"); %>
  </body>
  </html>
  ```

#### JSP网页9大内置对象

| 对象        | 名词       | 描述                                                         |
| ----------- | ---------- | ------------------------------------------------------------ |
| request     | 请求       | HttpServletRequest类的实例，用户请求                         |
| response    | 应答       | HttpServletResponse类的实例，返回应答消息                    |
| out         | 临时输出   | PrintWriter类的实例，用于把结果输出到网页流中                |
| session     | 会话       | HttpSession类的实例，会话，记录和当前用户相关的数据          |
| application | 应用程序   | ServletContext类的实例，与应用上下文有关                     |
| config      | 配置       | ServletConfig类的实例                                        |
| pageContext | 页面上下文 | PageContext类的实例，提供对JSP页面所有对象以及命名空间的访问 |
| page        | 页面       | 类似于Java类中的this关键字                                   |
| Exception   | 异常       | Exception类的对象，代表发生错误的JSP页面中对应的异常对象     |

#### Session跨页面传递数据

- Session会话对象
- 用于用户访问网站期间的临时数据的缓存
- 购物车

#### JSP对象的4大作用范围（4大作用域）

1. page scope 页面范围
2. request scope 请求范围
3. session scope 会话范围
4. application scope. 应用程序范围

#### JSP查询MySQL

1. 新建JSP网页
2. 网页中导入JDBC包
3. 连接MySQL数据库Alibaba
4. 查询用户
5. 显示到页面上
6. HTML5：标签语言网页内容
7. CSS3：样式，颜色，大小，位置，Bootstrap
8. JavaScript：脚本语言，JQuery

#### Bootstrap样式

- http://www.bootcss.com/
- Tweeter提供的免费开源样式
- 页面直接加入样式引用，在html标签使用样式
- `<table class="table">`

#### JSP访问MySQL数据库

- 包引用只存入Web目录下就可以了

- 命名空间

  ```html
  <%@ page import="java.io.*,java.util.*,java.sql.*"%>
  <%@ page import="javax.servlet.http.*,javax.servlet.*" %>
  <%@page import="java.sql.Connection" %>
  <%@page import="java.sql.DriverManager" %>
  <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
  <%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
  ```

#### JSP连接MYSQL代码

```html
<table class="table">
<tr>
  <th>编号</th>
  <th>标题</th>
  <th>阅读次数</th>
</tr>
  <%
    String driverClass="com.mysql.jdbc.Driver";
    String url="jdbc:mysql://localhost:3306/taobao";
    String user="root";
    String password="1234qwer";
    Connection conn;
    try{
	Class.forName(driverClass);
	conn=DriverManager.getConnection(url,user,password);
	Statement stmt=conn.createStatement();
	String sql="select * from news order by Id desc";
	ResultSet rs=stmt.executeQuery(sql);
	while(rs.next()){
  %>
  <tr>
  <td><%=rs.getString("Id") %></td>
  <td><%=rs.getString("Title") %></td>
  <td><%=rs.getInt("ViewTimes") %></td>
  </tr>
  <%
  }
  }
  catch(Exception ex){ ex.printStackTrace(); }
  %>
</table>
```

#### JSP实战新闻编辑

1. 用户选择编辑，id传递
2. 编辑页面接收id,
3. 保存到隐藏html元素：hidden
4. 数据查询：新闻数据
5. 赋值给控件：从发布新闻页面拷贝，CSS，HTML5
6. 提交单独页面：独立保存编辑后的信息

#### Java JSP生命周期

- Servlet：Java中用来处理HTTP请求的类
- JSP生命周期：从创建到销毁的整个过程，Servlet 生命周期，编译、创建、执行、销毁
- JSP生命周期包括：将JSP文件编译成 servlet
- 开发阶段： 编写JSP页面代码
- 编译阶段：JSP编译成servlet类，生成 servlet 类class
- 初始化阶段：加载JSP的servlet类，创建对象，初始化
- 执行阶段：调用JSP对应的servlet实例的服务方法
- 销毁阶段：调用JSP对应的servlet实例的销毁方法，销毁对象

### 部署网站

#### Tomcat9网站Web服务器

- Tomcat开源免费的Java Web服务器软件，最初由Sun的软件构架师詹姆斯·邓肯·戴维森开发的，
- Tomcat是 Apache 软件基金会（Apache Software Foundation）的Jakarta 项目中的一个核心项目，由Apache、Sun 和Oracle其他一些公司及个人共同开发而成
- Tomcat支持Servlet 和JSP 规范规范、WebSocket、微软的IIS Web服务器
- 官方网站：http://tomcat.apache.org/

#### Tomcat的核心组件（架构）

- Web容器---处理静态页面
- catalina --- servlet容器-----处理servlet
- JSP容器，它就是把jsp页面翻译成一般的servlet

### 课程代码

- 课程代码已上传 [Github 仓库](https://github.com/Bezhuang/LearnCS/tree/main/%E9%98%BF%E9%87%8C%E4%BA%91%E5%BC%80%E5%8F%91%E8%80%85%E5%AD%A6%E9%99%A2/Java%E5%88%9D%E7%BA%A7%E8%AE%AD%E7%BB%83%E8%90%A5)