---
title: Java 数据库基础知识总结
date: 2022-03-12
references:
  - title: Java web 从入门到企业实战教程
    url: https://www.bilibili.com/video/BV1Qf4y1T7Hx
categories: 后端开发
tags: [Java, JDBC, 数据库]
---

> Java 数据库连接，JDBC（Java Database Connectivity），是 Java 语言编程中与数据库连接的 API，封装了各种数据库访问的 API 和基础类库，支持多种数据库连接，也是 Java Web 技术核心的第一部分，我把整个学习过程分为 MySQL 基础、MySQL 高级、JDBC 和数据连接池四个部分，便于理解。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### MySQL 基础

#### SQL简介

* 英文：Structured Query Language，简称 SQL
* 结构化查询语言，一门操作关系型数据库的编程语言
* 定义操作所有关系型数据库的统一标准
* 对于同一个需求，每一种数据库操作的方式可能会存在一些不一样的地方

#### 通用语法

* SQL 语句可以单行或多行书写，以分号结尾。

* MySQL 数据库的 SQL 语句不区分大小写，关键字建议使用大写。

* 注释

  * 单行注释: `-- 注释内容` 或 `#注释内容`

  * 多行注释: `/* 注释 */`

#### SQL分类

* DDL (Data Definition Language) ： 数据定义语言，用来定义数据库对象：数据库，表，列等

* DML (Data Manipulation Language) 数据操作语言，用来对数据库中表的数据进行增删改

* DQL (Data Query Language) 数据查询语言，用来查询数据库中表的记录（数据）

* DCL (Data Control Language) 数据控制语言，用来定义数据库的访问权限和安全级别，及创建用户


#### DDL：操作数据库

-  查询所有的数据库

```sql
SHOW DATABASES;
```

* 创建数据库（先判断，如果不存在则创建）

```sql
CREATE DATABASE IF NOT EXISTS 数据库名称;
```

* 删除数据库（先判断，如果存在则删除）

```sql
DROP DATABASE IF EXISTS 数据库名称;
```

* 使用数据库

```sql
USE 数据库名称;
```

* 查看当前使用的数据库

```sql
SELECT DATABASE();
```

#### DDL：操作表

* 查询当前数据库下所有表名称

```sql
SHOW TABLES;
```

* 查询表结构

```sql
DESC 表名称;
```

* 创建表

```sql
create table tb_user (
	id int,
    username varchar(20),
    password varchar(32)  -- 最后一行末尾，不能加逗号
);
```

* 删除表（先判断表是否存在）

```sql
DROP TABLE IF EXISTS 表名;
```

* 修改表名

```sql
ALTER TABLE 表名 RENAME TO 新的表名;
```

* 添加一列

```sql
ALTER TABLE 表名 ADD 列名 数据类型;

-- 给stu表添加一列address，该字段类型是varchar(50)
alter table stu add address varchar(50);
```

* 修改数据类型

```sql
ALTER TABLE 表名 MODIFY 列名 新数据类型;

-- 将stu表中的address字段的类型改为 char(50)
alter table stu modify address char(50);
```

* 修改列名和数据类型

```sql
ALTER TABLE 表名 CHANGE 列名 新列名 新数据类型;

-- 将stu表中的address字段名改为 addr，类型改为varchar(50)
alter table stu change address addr varchar(50);
```

* 删除列

```sql
ALTER TABLE 表名 DROP 列名;
```

#### SQL 的数据类型

* 数值

  ```sql
  tinyint : 小整数型，占一个字节
  int	： 大整数类型，占四个字节
  	eg ： age int
  double ： 浮点类型
  	使用格式： 字段名 double(总长度,小数点后保留的位数)
  	eg ： score double(5,2)   
  ```

* 日期

  ```sql
  date ： 日期值。只包含年月日
  	eg ：birthday date ： 
  datetime ： 混合日期和时间值。包含年月日时分秒
  ```

* 字符串

  ```sql
  char ： 定长字符串。
  	优点：存储性能高
  	缺点：浪费空间
  	eg ： name char(10)  如果存储的数据字符个数不足10个，也会占10个的空间
  varchar ： 变长字符串。
  	优点：节约空间
  	缺点：存储性能底
  	eg ： name varchar(10) 如果存储的数据字符个数不足10个，那就数据字符个数是几就占几个的空间	
  ```

#### DML

* 查询所有数据

```sql
SELECT * FROM 表名;
```

* 给指定列添加数据

```sql
INSERT INTO 表名(列名1,列名2,…) VALUES(值1,值2,…);
```

* 给全部列添加数据

```sql
INSERT INTO 表名 VALUES(值1,值2,…);
```

* 批量添加数据

```sql
INSERT INTO 表名(列名1,列名2,…) VALUES(值1,值2,…),(值1,值2,…),(值1,值2,…)…;
INSERT INTO 表名 VALUES(值1,值2,…),(值1,值2,…),(值1,值2,…)…;
```

* 修改表数据

```sql
UPDATE 表名 SET 列名1=值1,列名2=值2,… [WHERE 条件] ;
-- 修改语句中如果不加条件，则将所有数据都修改！
```

* 删除数据

```sql
DELETE FROM 表名 [WHERE 条件] ;
```

* 删除表中所有的数据

```sql
DELETE FROM 表名;
```

#### DQL

* 查询多个字段

```sql
SELECT 字段列表 FROM 表名;
SELECT * FROM 表名; -- 查询所有数据
```

* 去除重复记录

```sql
SELECT DISTINCT 字段列表 FROM 表名;
```

* 起别名

```sql
SELECT 字段列表 AS: 别名 FROM 表名; -- AS 也可以省略
```

- 条件查询


```sql
SELECT 字段列表 FROM 表名 WHERE 条件列表;
```

- 模糊查询
  - 使用 `LIKE` 关键字，可以使用通配符进行占位
  - `_` ：代表单个任意字符
  - `%` ：代表任意个数字符

```sql
select * from stu where name like '马%';  -- 查询姓'马'的学员信息

select * from stu where name like '_花%';  -- 查询第二个字是'花'的学员信息 

select * from stu where name like '%德%';  -- 查询名字中包含 '德' 的学员信息
```

- 排序查询

```sql
SELECT 字段列表 FROM 表名 ORDER BY 排序字段名1 [排序方式1],排序字段名2 [排序方式2] …;
/*
排序方式有两种，分别是：
ASC ： 升序排列（默认值）
DESC ： 降序排列
如果有多个排序条件，当前边的条件值一样时，才会根据第二条件进行排序
*/
```

- 聚合函数
  - 将一列数据作为一个整体，进行纵向计算


| 函数名        | 功能                             |
| ------------- | -------------------------------- |
| `count(列名)` | 统计数量（一般选用不为null的列） |
| `max(列名)`   | 最大值                           |
| `min(列名)`   | 最小值                           |
| `sum(列名)`   | 求和                             |
| `avg(列名)`   | 平均值                           |

```sql
SELECT 聚合函数名(列名) FROM 表;
-- null 值不参与所有聚合函数运算
```

- 分组查询

```sql
SELECT 字段列表 FROM 表名 [WHERE 分组前条件限定] GROUP BY 分组字段名 [HAVING 分组后条件过滤];
-- 分组之后，查询的字段为聚合函数和分组字段，查询其他字段无任何意义
```

- where 和 having 区别：

  * 执行时机不一样：`where` 是分组之前进行限定，不满足 `where` 条件，则不参与分组，而 `having` 是分组之后对结果进行过滤。


  * 可判断的条件不一样：`where` 不能对聚合函数进行判断，`having` 可以


- 分页查询

```sql
SELECT 字段列表 FROM 表名 LIMIT  起始索引 , 查询条目数;
-- 起始索引是从0开始
```

- 起始索引计算公式：

```sql
起始索引 = (当前页码 - 1) * 每页显示的条数
```

### MySQL 进阶

#### 约束

* 约束是作用于表中列上的规则，用于限制加入表的数据

* 约束的存在保证了数据库中数据的正确性、有效性和完整性

* 约束的分类

  - 非空约束：关键字是 `NOT NULL`，保证列中所有的数据不能有null值。


  - 唯一约束：关键字是 `UNIQUE`，保证列中所有数据各不相同


  - 主键约束： 关键字是 `PRIMARY KEY`，主键是一行数据的唯一标识，要求非空且唯一


  - 检查约束： 关键字是 `CHECK`，保证列中的值满足某一条件（MySQL不支持检查约束）


  - 默认约束： 关键字是  `DEFAULT`，保存数据时，未指定值则采用默认值
  - 外键约束： 关键字是 `FOREIGN KEY`，外键用来让两个表的数据之间建立链接，保证数据的一致性和完整性

* 非空约束

  * 用于保证列中所有数据不能有NULL值

  * 添加约束

    ```sql
    -- 创建表时添加非空约束
    CREATE TABLE 表名(
       列名 数据类型 NOT NULL,
       …
    ); 
    ```
    
    ```sql
    -- 建完表后添加非空约束
    ALTER TABLE 表名 MODIFY 字段名 数据类型 NOT NULL;
    ```
  
  
    * 删除约束
  
      ```sql
      ALTER TABLE 表名 MODIFY 字段名 数据类型;
      ```
  

- 唯一约束

  * 用于保证列中所有数据各不相同
  
  
    * 添加约束
  
      ```sql
      -- 创建表时添加唯一约束
      CREATE TABLE 表名(
         列名 数据类型 UNIQUE [AUTO_INCREMENT],
         -- AUTO_INCREMENT: 当不指定值时自动增长
         …
      ); 
      CREATE TABLE 表名(
         列名 数据类型,
         …
         [CONSTRAINT] [约束名称] UNIQUE(列名)
      ); 
      ```
  
      ```sql
      -- 建完表后添加唯一约束
      ALTER TABLE 表名 MODIFY 字段名 数据类型 UNIQUE;
      ```
  
  
    * 删除约束
  
      ```sql
      ALTER TABLE 表名 DROP INDEX 字段名;
      ```
  
- 主键约束

  - 主键是一行数据的唯一标识，要求非空且唯一
  - 一张表只能有一个主键

  * 添加约束

    ```sql
    -- 创建表时添加主键约束
    CREATE TABLE 表名(
       列名 数据类型 PRIMARY KEY [AUTO_INCREMENT],
       …
    ); 
    CREATE TABLE 表名(
       列名 数据类型,
       [CONSTRAINT] [约束名称] PRIMARY KEY(列名)
    ); 
    
    ```

    ```sql
    -- 建完表后添加主键约束
    ALTER TABLE 表名 ADD PRIMARY KEY(字段名);
    ```


  * 删除约束

    ```sql
    ALTER TABLE 表名 DROP PRIMARY KEY;
    ```

- 默认约束

  * 保存数据时，未指定值则采用默认值

  * 添加约束

    ```sql
    -- 创建表时添加默认约束
    CREATE TABLE 表名(
       列名 数据类型 DEFAULT 默认值,
       …
    ); 
    ```

    ```sql
    -- 建完表后添加默认约束
    ALTER TABLE 表名 ALTER 列名 SET DEFAULT 默认值;
    ```

  * 删除约束

    ```sql
    ALTER TABLE 表名 ALTER 列名 DROP DEFAULT;
    ```


- 默认约束只有在不给值时才会采用默认值。如果给了null，那值就是null值


#### 外键约束

- 外键用来让两个表的数据之间建立链接，保证数据的一致性和完整性

* 添加外键约束

```sql
-- 创建表时添加外键约束
CREATE TABLE 表名(
   列名 数据类型,
   …
   [CONSTRAINT] [外键名称] FOREIGN KEY(外键列名) REFERENCES 主表(主表列名) 
); 
```

```sql
-- 建完表后添加外键约束
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名称) REFERENCES 主表名称(主表列名称);
```

* 删除外键约束

```sql
ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
```

- 添加数据


```sql
-- 添加 2 个部门
insert into dept(dep_name,addr) values
('研发部','广州'),('销售部', '深圳');

-- 添加员工,dep_id 表示员工所在的部门
INSERT INTO emp (NAME, age, dep_id) VALUES 
('张三', 20, 1),
('李四', 20, 1),
('王五', 20, 1),
```

删除外键

```sql
alter table emp drop FOREIGN key fk_emp_dept;
```

重新添加外键

```sql
alter table emp add CONSTRAINT fk_emp_dept FOREIGN key(dep_id) REFERENCES dept(id);
```

#### 数据库设计

* 数据库设计概念

  * 数据库设计就是根据业务系统的具体需求，结合我们所选用的DBMS，为这个业务系统构造出最优的数据存储模型
  * 建立数据库中的表结构以及表与表之间的关联关系的过程
  * 有哪些表？表里有哪些字段？表和表之间有什么关系？
* 数据库设计的步骤

  * 需求分析（数据是什么? 数据具有哪些属性? 数据与属性的特点是什么）

  * 逻辑分析（通过ER图对数据库进行逻辑建模，不需要考虑我们所选用的数据库管理系统）

  * 物理设计（根据数据库自身的特点把逻辑设计转换为物理设计）

  * 维护设计（1.对新的需求进行建表；2.表优化）
* 表关系

  * 一对一（如：用户 和 用户详情）：一对一关系多用于表拆分，将一个实体中经常使用的字段放一张表，不经常使用的字段放另一张表，用于提升查询性能

  * 一对多（如：部门 和 员工）：一个部门对应多个员工，一个员工对应一个部门
  
  * 多对多（如：商品 和 订单）：一个商品对应多个订单，一个订单包含多个商品
  

- 表关系（一对多）

  - 实现方式：在多的一方建立外键，指向一的一方的主键


  - 以 `员工表` 和 `部门表` 举例：在员工表中添加一列（dep_id），指向于部门表的主键（id）


```sql
-- 删除表
DROP TABLE IF EXISTS tb_emp;
DROP TABLE IF EXISTS tb_dept;

-- 部门表
CREATE TABLE tb_dept(
    id int primary key auto_increment,
    dep_name varchar(20),
    addr varchar(20)
);
-- 员工表 
CREATE TABLE tb_emp(
    id int primary key auto_increment,
    name varchar(20),
    age int,
    dep_id int,

    -- 添加外键 dep_id,关联 dept 表的id主键
    CONSTRAINT fk_emp_dept FOREIGN KEY(dep_id) REFERENCES tb_dept(id)	
);
```

- 表关系（多对多）

  - 建立第三张中间表，中间表至少包含两个外键，分别关联两方主键

  * 以 `订单表` 和 `商品表` 举例：订单表和商品表都属于多的一方，此时需要创建一个中间表，在中间表中添加订单表的外键和商品表的外键指向两张表的主键：

  ```sql
    -- 删除表
    DROP TABLE IF EXISTS tb_order_goods;
    DROP TABLE IF EXISTS tb_order;
    DROP TABLE IF EXISTS tb_goods;
    
    -- 订单表
    CREATE TABLE tb_order(
    id int primary key auto_increment,
    payment double(10,2),
    payment_type TINYINT,
    status TINYINT
    );
    
    -- 商品表
    CREATE TABLE tb_goods(
    id int primary key auto_increment,
    title varchar(100),
    price double(10,2)
    );
    
    -- 订单商品中间表
    CREATE TABLE tb_order_goods(
    id int primary key auto_increment,
    order_id int,
    goods_id int,
    count int
    );
    
    -- 建完表后，添加外键
    alter table tb_order_goods add CONSTRAINT fk_order_id FOREIGN key(order_id) REFERENCES tb_order(id);
    alter table tb_order_goods add CONSTRAINT fk_goods_id FOREIGN key(goods_id) REFERENCES tb_goods(id);
  ```

- 表关系（一对一）

  * 在任意一方加入外键，关联另一方主键，并且设置外键为唯一（`UNIQUE`）


  * 以 `用户表` 举例：在真正使用过程中发现 id、photo、nickname、age、gender 字段比较常用，此时就可以将这张表查分成两张表

```sql
create table tb_user_desc (
	id int primary key auto_increment,
	city varchar(20),
	edu varchar(10),
	income int,
	status char(2),
	des varchar(100)
);

create table tb_user (
	id int primary key auto_increment,
	photo varchar(100),
	nickname varchar(50),
	age int,
	gender char(1),
	desc_id int unique,
	-- 添加外键
	CONSTRAINT fk_user_desc FOREIGN KEY(desc_id) REFERENCES tb_user_desc(id)	
);
```

#### 多表查询

- 多表查询顾名思义就是从多张表中一次性的查询出我们想要的数据


```sql
DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;

# 创建部门表
	CREATE TABLE dept(
        did INT PRIMARY KEY AUTO_INCREMENT,
        dname VARCHAR(20)
    );

	# 创建员工表
	CREATE TABLE emp (
        id INT PRIMARY KEY AUTO_INCREMENT,
        NAME VARCHAR(10),
        gender CHAR(1), -- 性别
        salary DOUBLE, -- 工资
        join_date DATE, -- 入职日期
        dep_id INT,
        FOREIGN KEY (dep_id) REFERENCES dept(did) -- 外键，关联部门表(部门表的主键)
    );
	-- 添加部门数据
	INSERT INTO dept (dNAME) VALUES ('研发部'),('市场部'),('财务部'),('销售部');
	-- 添加员工数据
	INSERT INTO emp(NAME,gender,salary,join_date,dep_id) VALUES
	('孙悟空','男',7200,'2013-02-24',1),
	('猪八戒','男',3600,'2010-12-02',2),
	('唐僧','男',9000,'2008-08-08',2),
	('白骨精','女',5000,'2015-10-07',3),
	('蜘蛛精','女',4500,'2011-03-14',1),
	('小白龙','男',2500,'2011-02-14',null);	
```

- 执行下面的多表查询语句


```sql
select * from emp , dept;  -- 从emp和dept表中查询所有的字段数据
```

- 通过限制员工表中的 `dep_id` 字段的值和部门表 `did` 字段的值相等来消除无效的数据，


```sql
select * from emp , dept where emp.dep_id = dept.did;
```

* 连接查询 

  * 内连接查询 ：相当于查询AB交集数据
  * 外连接查询
    * 左外连接查询 ：相当于查询A表所有数据和交集部门数据
    * 右外连接查询 ： 相当于查询B表所有数据和交集部分数据
  * 子查询
  

- 内连接查询

```sql
-- 隐式内连接
SELECT 字段列表 FROM 表1,表2… WHERE 条件;

-- 显示内连接
SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 条件;
```

* 隐式内连接

```sql
SELECT * FROM emp, dept WHERE emp.dep_id = dept.did;
```

* 查询 emp 的 name， gender，dept 表的 dname

```sql
SELECT
	t1. NAME,
	t1.gender,
	t2.dname
FROM
	emp t1,
	dept t2
WHERE
	t1.dep_id = t2.did;
```

* 显式内连接

```sql
select * from emp inner join dept on emp.dep_id = dept.did;
-- 上面语句中的inner可以省略，可以书写为如下语句
select * from emp  join dept on emp.dep_id = dept.did;
```

- 外连接查询

```sql
-- 左外连接：相当于查询A表所有数据和交集部分数据
SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件;

-- 右外连接：相当于查询B表所有数据和交集部分数据
SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 条件;
```

* 查询emp表所有数据和对应的部门信息（左外连接）

```sql
select * from emp left join dept on emp.dep_id = dept.did;
-- 结果显示查询到了左表（emp）中所有的数据及两张表能关联的数据
```

* 查询dept表所有数据和对应的员工信息（右外连接）

```sql
select * from emp right join dept on emp.dep_id = dept.did;
-- 结果显示查询到了右表（dept）中所有的数据及两张表能关联的数据
```

。要查询出部门表中所有的数据，也可以通过左外连接实现，只需要将两个表的位置进行互换：

```sql
select * from dept left join emp on emp.dep_id = dept.did;
```

- 子查询

  - 查询中嵌套查询，称嵌套查询为子查询


  * 子查询根据查询结果不同，作用不同
  * 子查询语句结果是单行单列，子查询语句作为条件值，使用 =  !=  >  <  等进行条件判断
  * 子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断
  * 子查询语句结果是多行多列，子查询语句作为虚拟表
  * 查询 '财务部' 和 '市场部' 所有的员工信息

```sql
-- 查询 '财务部' 或者 '市场部' 所有的员工的部门did
select did from dept where dname = '财务部' or dname = '市场部';

select * from emp where dep_id in (select did from dept where dname = '财务部' or dname = '市场部');
```


  * 查询入职日期是 '2011-11-11' 之后的员工信息和部门信息

```sql
-- 查询入职日期是 '2011-11-11' 之后的员工信息
select * from emp where join_date > '2011-11-11' ;
-- 将上面语句的结果作为虚拟表和dept表进行内连接查询
select * from (select * from emp where join_date > '2011-11-11' ) t1, dept where t1.dep_id = dept.did;
```

#### 事务

- 概述

  - 数据库的事务（Transaction）是一种机制、一个操作序列，包含了一组数据库操作命令

  - 事务把所有的命令作为一个整体一起向系统提交或撤销操作请求，即这一组数据库命令要么同时成功，要么同时失败

  - 事务是一个不可分割的工作逻辑单元


- 语法

  * 开启事务

  ```sql
  START TRANSACTION;
  或者  
  BEGIN;
  ```


  * 提交事务

    ```sql
    commit;
    ```


  * 回滚事务

    ```sql
    rollback;
    ```


- 代码验证

  * 环境准备

  ```sql
  DROP TABLE IF EXISTS account;
  
  -- 创建账户表
  CREATE TABLE account(
  	id int PRIMARY KEY auto_increment,
  	name varchar(10),
  	money double(10,2)
  );
  
  -- 添加数据
  INSERT INTO account(name,money) values('张三',1000),('李四',1000);
  ```


  * 不加事务演示问题

    ```sql
    -- 转账操作
    -- 1. 查询李四账户金额是否大于500
    
    -- 2. 李四账户 -500
    UPDATE account set money = money - 500 where name = '李四';
    
    出现异常了...  -- 此处不是注释，在整体执行时会出问题，后面的sql则不执行
    -- 3. 张三账户 +500
    UPDATE account set money = money + 500 where name = '张三';
    ```


  * 添加事务 sql

    ```sql
    -- 开启事务
    BEGIN;
    -- 转账操作
    -- 1. 查询李四账户金额是否大于500
    
    -- 2. 李四账户 -500
    UPDATE account set money = money - 500 where name = '李四';
    
    出现异常了...  -- 此处不是注释，在整体执行时会出问题，后面的sql则不执行
    -- 3. 张三账户 +500
    UPDATE account set money = money + 500 where name = '张三';
    
    -- 提交事务
    COMMIT;
    
    -- 回滚事务
    ROLLBACK;
    ```

    - 上面sql中的执行成功进选择执行提交事务，而出现问题则执行回滚事务的语句，以后我们肯定不可能这样操作，而是在java中进行操作，在java中可以抓取异常，没出现异常提交事务，出现异常回滚事务


- 事务的四大特征

  * 原子性（Atomicity）: 事务是不可分割的最小操作单位，要么同时成功，要么同时失败
  * 一致性（Consistency） :事务完成时，必须使所有的数据都保持一致状态
  * 隔离性（Isolation） :多个事务之间，操作的可见性
  * 持久性（Durability） :事务一旦提交或回滚，它对数据库中的数据的改变就是永久的
  * MySQL 中事务是自动提交的，也就是说我们不添加事务执行sql语句，语句执行完毕会自动的提交事务
    * 可以通过下面语句查询默认提交方式：

 ```java
SELECT @@autocommit;
 ```

-  查询到的结果是1 则表示自动提交，结果是0表示手动提交。当然也可以通过下面语句修改提交方式


 ```sql
set @@autocommit = 0;
 ```

### JDBC

#### JDBC 简介

- JDBC 概念

  - JDBC 就是使用Java语言操作关系型数据库的一套API

  - JDBC 全称：( Java DataBase Connectivity ) Java 数据库连接

  - sun公司指定了一套标准接口（JDBC），JDBC中定义了所有操作关系型数据库的规则，众所周知接口是无法直接使用的，我们需要使用接口的实现类，而这套实现类（称之为：驱动）就由各自的数据库厂商给出

-  JDBC本质

  * 官方（sun公司）定义的一套操作所有关系型数据库的规则，即接口

  * 各个数据库厂商去实现这套接口，提供数据库驱动jar包

  * 我们可以使用这套接口（JDBC）编程，真正执行的代码是驱动jar包中的实现类


- JDBC好处

  * 各数据库厂商使用相同的接口，Java代码不需要针对不同数据库分别开发

  * 可随时替换底层数据库，访问数据库的Java代码基本不变
  * 以后编写操作数据库的代码只需要面向JDBC（接口），操作哪儿个关系型数据库就需要导入该数据库的驱动包，如需要操作MySQL数据库，就需要再项目中导入MySQL数据库的驱动包


#### JDBC快速入门

- 通过Java操作数据库的流程

  - 第一步：编写Java代码
  
  
    - 第二步：Java代码将SQL发送到MySQL服务端
  
  
    - 第三步：MySQL服务端接收到SQL语句并执行该SQL语句
  
  
    - 第四步：将SQL语句执行的结果返回给Java代码
  


- 编写代码步骤

  * 创建工程，导入驱动 jar 包（mysql-connector-java-5.1.48.jar）


  * 注册驱动

    ```sql
    Class.forName("com.mysql.jdbc.Driver");
    ```


  * 获取连接

    ```sql
    Connection conn = DriverManager.getConnection(url, username, password);
    ```

    * Java代码需要发送SQL给MySQL服务端，就需要先建立连接


  * 定义SQL语句

    ```sql
    String sql =  "select * from table;" ;
    ```


  * 获取执行SQL对象

    * 执行SQL语句需要SQL执行对象，而这个执行对象就是Statement对象

    ```sql
    Statement stmt = conn.createStatement();
    ```

  * 执行SQL

    ```sql
    stmt.executeUpdate(sql);  
    ```


  * 处理返回结果
  * 释放资源
  * IDEA 中编写代码

```java
/**
 * JDBC快速入门
 */
public class JDBCDemo {

    public static void main(String[] args) throws Exception {
        //1. 注册驱动
        //Class.forName("com.mysql.jdbc.Driver");
        //2. 获取连接
        String url = "jdbc:mysql://127.0.0.1:3306/db1?useSSL=false";
        String username = "root";
        String password = "1234";
        Connection conn = DriverManager.getConnection(url, username, password);
        //3. 定义sql
        String sql = "update account set money = 2000 where id = 1";
        //4. 获取执行sql的对象 Statement
        Statement stmt = conn.createStatement();
        //5. 执行sql
        int count = stmt.executeUpdate(sql);//受影响的行数
        //6. 处理结果
        System.out.println(count);
        //7. 释放资源
        stmt.close();
        conn.close();
    }
}
```

#### JDBC API 详解

- DriverManager（驱动管理类）

  * 注册驱动：`registerDriver` 方法是用于注册驱动的，但是我们之前做的入门案例并不是这样写的。而是如下实现

    ```sql
    Class.forName("com.mysql.jdbc.Driver");
    ```

  * 在该类中的静态代码块中已经执行了 `DriverManager` 对象的 `registerDriver()` 方法进行驱动的注册了，那么我们只需要加载 `Driver` 类，该静态代码块就会执行，而 `Class.forName("com.mysql.jdbc.Driver");` 就可以加载 `Driver` 类
  
  
    * 获取数据库连接
  
      ```sql
      Connection conn = DriverManager.getConnection(url, username, password);
      ```
  
      * url ： `jdbc:mysql://ip地址(域名):端口号/数据库名称?参数键值对1&参数键值对2…`
        * 配置 `useSSL=false` 参数，禁用安全连接方式，解决警告提示
      * user ：用户名
      * poassword ：密码
  


- Connection（数据库连接对象）

  - 获取执行 SQL 的对象

    * 普通执行SQL对象

    ```sql
    Statement createStatement()  
    -- 通过该方法获取执行对象
    Statement stmt = conn.createStatement();
    int count = stmt.executeUpdate(sql);
    ```
  
    - 预编译SQL的执行SQL对象：防止SQL注入
  
    ```sql
    PreparedStatement  prepareStatement(sql)
    ```
  
    - 通过这种方式获取的 `PreparedStatement` SQL语句执行对象可以防止SQL注入
  
    - 执行存储过程的对象
  
      ```sql
      CallableStatement prepareCall(sql)
      ```
  
    - 通过这种方式获取的 `CallableStatement` 执行对象是用来执行存储过程的，但存储过程在MySQL中不常用
  
  
    - 事务管理
  
      - MySQL事务管理的操作（MySQL默认是自动提交事务）
  
        * 开启事务 ： `BEGIN;` 或者 `START TRANSACTION;`
  
        * 提交事务 ： `COMMIT;`
  
        * 回滚事务 ： `ROLLBACK;`
      
      - JDBC事务管理的方法
      
      
        - Connection几个接口中定义了3个对应的方法：
      
          * 开启事务
      
            ```sql
            setAutoCommit(boolean autoCommit)
            ```
      
          * 参与 `autoCommit` 表示是否自动提交事务，true表示自动提交事务，false表示手动提交事务，而开启事务需要将该参数设为为 false
      
          * 提交事务
      
            ```sql
            commit()
            ```
      
          * 回滚事务
      
            ```sql
            rollback;
            ```
      
  


- Statement（声明执行对象）

  - Statement对象的作用就是用来执行SQL语句，而针对不同类型的SQL语句使用的方法也不一样
  
  
    * 执行DDL、DML语句
  
      ```sql
      int excuteUpdate(sql)
      ```
  
      * 返回值：DML语句影响的行数，DDL语句执行成功后可能返回0
  
  
    * 执行DQL语句
  
      ```sql
      ResultSet excuteQuery(sql)
      ```
  
      - 返回值： `ResultSet` 结果集对象
  


- ResultSet（结果集对象）
  * 封装了SQL查询语句的结果，执行DQL语句后就会返回该对象
    * `ResultSet  executeQuery(sql)`：执行DQL 语句，返回 `ResultSet` 对象
  
  - `ResultSet` 对象提供了获取查询结果数据的方法
  
    - `boolean  next()`：将光标从当前位置向前移动一行，判断当前行是否为有效行
  
    - 方法返回值：true （ 有效行，当前行有数据），false（无效行，当前行没有数据）
  
    - `xxx  getXxx(参数)`：获取数据
    - xxx : 数据类型；如： `nt getInt(参数)` ；`String getString(参数)`
    - int 类型的参数：列的编号，从1开始
    - String 类型的参数： 列的名称 
  
  
  - 一开始光标指定于第一行前，当我们调用了 `next()` 方法后，光标就下移到第一行数据，并且方法返回 true，此时就可以通过 `getInt("id")` 获取当前行id字段的值，也可以通过 `getString("name")` 获取当前行name字段的值。如果想获取下一行的数据，继续调用 `next()`  方法，以此类推。
  
- PreparedStatement
  - 预编译SQL语句并执行：预防SQL注入问题
  - SQL注入是通过操作输入来修改事先定义好的SQL语句，用以达到执行代码对服务器进行攻击的方法。

  - 代码模拟SQL注入问题

  ```java
  @Test
  public void testLogin() throws  Exception {
      //2. 获取连接：如果连接的是本机mysql并且端口是默认的 3306 可以简化书写
      String url = "jdbc:mysql:///db1?useSSL=false";
      String username = "root";
      String password = "1234";
      Connection conn = DriverManager.getConnection(url, username, password);
  
      // 接收用户输入 用户名和密码
      String name = "sjdljfld";
      String pwd = "' or '1' = '1";
      String sql = "select * from tb_user where username = '"+name+"' and password = '"+pwd+"'";
      // 获取stmt对象
      Statement stmt = conn.createStatement();
      // 执行sql
      ResultSet rs = stmt.executeQuery(sql);
      // 判断登录是否成功
      if(rs.next()){
          System.out.println("登录成功~");
      }else{
          System.out.println("登录失败~");
      }
  
      //7. 释放资源
      rs.close();
      stmt.close();
      conn.close();
  }
  ```

  - 上面代码是将用户名和密码拼接到sql语句中，拼接后的sql语句如下

  ```sql
  select * from tb_user where username = 'sjdljfld' and password = ''or '1' = '1'
  ```

  - 获取 PreparedStatement 对象


  ```java
  // SQL语句中的参数值，使用？占位符替代
  String sql = "select * from user where username = ? and password = ?";
  // 通过Connection对象获取，并传入对应的sql语句
  PreparedStatement pstmt = conn.prepareStatement(sql);
  ```

  * 设置参数值：PreparedStatement 的sql语句中参数使用 ? 进行占位，在之前之前肯定要设置这些 ?  的值

  * PreparedStatement对象：`setXxx(参数1，参数2)`：给 ? 赋值

  * Xxx：数据类型 ； 如 setInt (参数1，参数2)

  * 参数：
  * 参数1： ？的位置编号，从1 开始
      * 参数2： ？的值


  * 执行SQL语句

    - `executeUpdate()`;  执行DDL语句和DML语句
    - `executeQuery()`;  执行DQL语句
    - 调用这两个方法时不需要传递SQL语句，因为获取SQL语句执行对象时已经对SQL语句进行预编译了

  - 使用PreparedStatement改进

  ```java
   @Test
  public void testPreparedStatement() throws  Exception {
      //2. 获取连接：如果连接的是本机mysql并且端口是默认的 3306 可以简化书写
      String url = "jdbc:mysql:///db1?useSSL=false";
      String username = "root";
      String password = "1234";
      Connection conn = DriverManager.getConnection(url, username, password);
  
      // 接收用户输入 用户名和密码
      String name = "zhangsan";
      String pwd = "' or '1' = '1";
  
      // 定义sql
      String sql = "select * from tb_user where username = ? and password = ?";
      // 获取pstmt对象
      PreparedStatement pstmt = conn.prepareStatement(sql);
      // 设置？的值
      pstmt.setString(1,name);
      pstmt.setString(2,pwd);
      // 执行sql
      ResultSet rs = pstmt.executeQuery();
      // 判断登录是否成功
      if(rs.next()){
          System.out.println("登录成功~");
      }else{
          System.out.println("登录失败~");
      }
      //7. 释放资源
      rs.close();
      pstmt.close();
      conn.close();
  }
  ```

  - PreparedStatement 实际上是将特殊字符进行了转义，转义的SQL如下：

  ```sql
  select * from tb_user where username = 'sjdljfld' and password = '\'or \'1\' = \'1'
  ```

  - PreparedStatement原理

    - 预编译SQL，性能更高
    - 防止SQL注入：将敏感字符进行转义

    * 将sql语句发送到MySQL服务器端


    * MySQL服务端会对sql语句进行如下操作
    
      * 检查SQL语句的语法是否正确。
    
      * 编译SQL语句。将SQL语句编译成可执行的函数。
      * 检查SQL和编译SQL花费的时间比执行SQL的时间还要长。如果我们只是重新设置参数，那么检查SQL语句和编译SQL语句将不需要重复执行。这样就提高了性能。
      * 执行SQL语句


  * 开启预编译功能：`useServerPrepStmts=true`

    ```sql
    String url = "jdbc:mysql:///db1?useSSL=false&useServerPrepStmts=true";
    ```
    
  * 配置MySQL执行日志（重启mysql服务后生效）

    * 在mysql配置文件（my.ini）中添加如下配置

    ```ini
    log-output=FILE
    general-log=1
    general_log_file="D:\mysql.log"
    slow-query-log=1
    slow_query_log_file="D:\mysql_slow.log"
    long_query_time=2
    ```


* PreparedStatement 小结
  * 在获取PreparedStatement对象时，将sql语句发送给mysql服务器进行检查，编译（这些步骤很耗时）
  * 执行时就不用再进行这些步骤了，速度更快
  * 如果sql模板一样，则只需要进行一次检查、编译
  

### 数据库连接池

#### 数据库连接池简介

- 数据库连接池是个容器，负责分配、管理数据库连接(Connection)
- 它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个；
- 释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏
- 好处
  * 资源重用
  * 提升系统响应速度
  * 避免数据库连接遗漏
- 之前我们代码中使用连接是没有使用都创建一个Connection对象，使用完毕就会将其销毁。这样重复创建销毁的过程是特别耗费计算机的性能的及消耗时间的
- 而数据库使用了数据库连接池后，就能达到Connection对象的复用
- 连接池是在一开始就创建好了一些连接（Connection）对象存储起来。用户需要连接数据库时，不需要自己创建连接，而只需要从连接池中获取一个连接进行使用，使用完毕后再将连接对象归还给连接池；这样就可以起到资源重用，也节省了频繁创建连接销毁连接所花费的时间，从而提升了系统响应的速度

#### 数据库连接池实现

* 标准接口：DataSource

* 官方(SUN) 提供的数据库连接池标准接口，由第三方组织实现此接口。该接口提供了获取连接的功能：

  ```java
  Connection getConnection()
  ```
  

- 那么以后就不需要通过 `DriverManager` 对象获取 `Connection` 对象，而是通过连接池（DataSource）获取 `Connection` 对象。

* 常见的数据库连接池

  * DBCP
  * C3P0
  * Druid

  我们现在使用更多的是Druid，它的性能比其他两个会好一些。

* Druid（德鲁伊）

  * Druid连接池是阿里巴巴开源的数据库连接池项目 

  * 功能强大，性能优秀，是Java语言最好的数据库连接池之一

#### Driud 使用

- 导入jar包 druid-1.1.12.jar
- 定义配置文件：src 目录下新建 `druid.properties`

```properties
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql:///db1?useSSL=false&useServerPrepStmts=true
username=root
password=1234
# 初始化连接数量
initialSize=5
# 最大连接数
maxActive=10
# 最大等待时间
maxWait=3000
```

- 加载配置文件
- 获取数据库连接池对象
- 获取连接

```java
/**
 * Druid数据库连接池演示
 */
public class DruidDemo {

    public static void main(String[] args) throws Exception {
        // 加载配置文件
        Properties prop = new Properties();
        prop.load(new FileInputStream("jdbc-demo/src/druid.properties"));
        // 获取连接池对象
        DataSource dataSource = DruidDataSourceFactory.createDataSource(prop);
        // 获取数据库连接 Connection
        Connection connection = dataSource.getConnection();
        System.out.println(connection); //获取到了连接后就可以继续做其他操作了
        //System.out.println(System.getProperty("user.dir"));
    }
}
```

- druid 配置详解


|                   属性                   |                             说明                             |          建议值           |
| :--------------------------------------: | :----------------------------------------------------------: | :-----------------------: |
|                   url                    |   数据库的jdbc连接地址。一般为连接oracle/mysql。示例如下：   |                           |
|                                          |    mysql : jdbc:mysql://ip:port/dbname?option1&option2&…     |                           |
|                                          |        oracle : jdbc:oracle:thin:@ip:port:oracle_sid         |                           |
|                                          |                                                              |                           |
|                 username                 |                      登录数据库的用户名                      |                           |
|                 password                 |                     登录数据库的用户密码                     |                           |
|               initialSize                |            启动程序时，在连接池中初始化多少个连接            |        10-50已足够        |
|                maxActive                 |                连接池中最多支持多少个活动会话                |                           |
|                 maxWait                  | 程序向连接池中请求连接时,超过maxWait的值后，认为本次请求失败，即连接池 |            100            |
|                                          |         没有可用连接，单位毫秒，设置-1时表示无限等待         |                           |
|        minEvictableIdleTimeMillis        | 池中某个连接的空闲时长达到 N 毫秒后, 连接池在下次检查空闲连接时，将 |        见说明部分         |
|                                          |               回收该连接,要小于防火墙超时设置                |                           |
|                                          |   net.netfilter.nf_conntrack_tcp_timeout_established的设置   |                           |
|      timeBetweenEvictionRunsMillis       |    检查空闲连接的频率，单位毫秒, 非正整数时表示不进行检查    |                           |
|                keepAlive                 | 程序没有close连接且空闲时长超过 minEvictableIdleTimeMillis,则会执 |           true            |
|                                          | 行validationQuery指定的SQL,以保证该程序连接不会池kill掉,其范围不超 |                           |
|                                          |                  过minIdle指定的连接个数。                   |                           |
|                 minIdle                  |          回收空闲连接时，将保证至少有minIdle个连接.          |     与initialSize相同     |
|             removeAbandoned              | 要求程序从池中get到连接后, N 秒后必须close,否则druid 会强制回收该 |   false,当发现程序有未    |
|                                          | 连接,不管该连接中是活动还是空闲, 以防止进程不会进行close而霸占连接。 | 正常close连接时设置为true |
|          removeAbandonedTimeout          | 设置druid 强制回收连接的时限，当程序从池中get到连接开始算起，超过此 |  应大于业务运行最长时间   |
|                                          |            值后，druid将强制回收该连接，单位秒。             |                           |
|               logAbandoned               |    当druid强制回收连接后，是否将stack trace 记录到日志中     |           true            |
|              testWhileIdle               | 当程序请求连接，池在分配连接时，是否先检查该连接是否有效。(高效) |           true            |
|             validationQuery              | 检查池中的连接是否仍可用的 SQL 语句,drui会连接到数据库执行该SQL, 如果 |                           |
|                                          |         正常返回，则表示连接可用，否则表示连接不可用         |                           |
|               testOnBorrow               |  程序 **申请** 连接时,进行连接有效性检查（低效，影响性能）   |           false           |
|               testOnReturn               |  程序 **返还** 连接时,进行连接有效性检查（低效，影响性能）   |           false           |
|          poolPreparedStatements          |                缓存通过以下两个方法发起的SQL:                |           true            |
|                                          |    public PreparedStatement prepareStatement(String sql)     |                           |
|                                          |    public PreparedStatement prepareStatement(String sql,     |                           |
|                                          |         int resultSetType, int resultSetConcurrency)         |                           |
| maxPoolPrepareStatementPerConnectionSize |                  每个连接最多缓存多少个SQL                   |            20             |
|                 filters                  |                这里配置的是插件,常用的插件有:                |      stat,wall,slf4j      |
|                                          |                    监控统计: filter:stat                     |                           |
|                                          |              日志监控: filter:log4j 或者 slf4j               |                           |
|                                          |                   防御SQL注入: filter:wall                   |                           |
|            connectProperties             |         连接属性。比如设置一些连接池统计方面的配置。         |                           |
|                                          |    druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000    |                           |
|                                          |                 比如设置一些数据库连接属性:                  |                           |
|                                          |                                                              |                           |
