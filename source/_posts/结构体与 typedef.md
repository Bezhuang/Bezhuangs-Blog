---
title: C 语言结构体与 typedef 的使用
date: 2022-05-11
references:
  - title: 跟“龙哥”学C语言编程
    url: https://weread.qq.com/web/reader/1bf323f071f02f351bf2985
categories: 编程语言
tags: [C, 结构体]
---

> 在我们编写程序时，有时候需要将不同类型的数据组合为一个整体，以便于引用。例如，一名学生有学号、姓名、性别、年龄、地址等属性，如果针对学生的学号、姓名、年龄等都单独定义一个变量，那么在有多名学生时，变量就难以分清。为此，C 语言提供结构体来管理不同类型的数据组合。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、结构体的定义

先声明一个结构体类型，再定义变量名。结构体类型声明要放在 main 函数之前，这样 main 函数中才可以使用这个结构体，工作中往往把结构体声明放在头文件中。

注意，结构体类型声明最后一定要加分号，否则会编译不通。另外，定义结构体变量时，使用 struct student 来定义，不能只有 struct 或 student，否则也会编译不通。

```c
#include <stdio.h>
#include <stdlib.h>

struct student
{
    int num;
    char name[20];
    char sex;
    int age;
    float score;
    char addr[30];
}; //结构体类型声明，注意最后一定要加分号

int main()
{
    struct student s = {1001, "lele", 'M', 20, 85.4, "Shenzhen"}; //定义及初始化
    struct student sarr[3];
    int i;
    printf("%d%s %c %d %f %s\n", s.num, s.name, s.sex, s.age, s.score, s.addr);
    for (i = 0; i < 3; i++)
    {
        scanf("%d%s %c%d%f%s", &sarr[i].num, sarr[i].name, &sarr[i].sex, &sarr[i].age, &sarr[i].score, sarr[i].addr);
    }
    for (i = 0; i < 3; i++)
    {
        printf("%d %s %c %d %f %s\n", sarr[i].num, sarr[i].name, sarr[i].sex, sarr[i].age, sarr[i].score, sarr[i].addr);
    }
    system("pause");
    return 0;
}
```

sarr 是结构体数组变量。结构体的初始化只能在一开始定义，如果 `struct student s={1001,"lele",'M',20,85.4,"Shenzhen"}` 已经执行，即 `struct student s` 已经定义，就不能再执行 `s={1001,"lele",'M',20,85.4,"Shenzhen"}`。如果结构体变量已经定义, 那么只能对它的每个成员单独赋值，如 `s.num=1003`。

采用 `结构体变量名,成员名` 的形式来访问结构体成员，例如用 `s.num` 访问学号。

在进行打印输出时，必须访问到成员，而且 `printf` 中的 `%` 类型要与各成员匹配。使用 `scanf` 读取标准输入时，也必须是各成员取地址，然后进行存储，不可以写成 `&s`，即不可以直接对结构体变量取地址。整型数据（`%d`）、浮点型数据（`%f`）、字符串型数据（`%s`）都会忽略空格，但是字符型数据（`%c`）不会忽略空格，所以如果要读取字符型数据，那么就要在待读取的字符数据与其他数据之间加入空格。

### 二、结构体指针

一个结构体变量的指针就是该变量所占据的内存段的起始地址。可以设置一个指针变量，用它指向一个结构体变量，此时该指针变量的值是结构体变量的起始地址。指针变量也可以用来指向结构体数组中的元素。

```c
//结构体指针
struct student
{
    int num;
    char name[20];
    char sex;
};

int main()
{
    struct student s = {1001, "wangle", "M"};
    struct student sarr[3] = {1001, "lilei", 'M', 1005, "zhangsan", 'M', 1007, "lili", 'F'};
    struct student *p; //定义结构体指针
    int num;
    p = &s;
    printf("%d %s %c\n", p->num, p->name, p->sex);
    p = sarr;
    printf("%d %s %c\n", (*p).num, (*p).name, (*p).sex); //方式一获取成员
    printf("%d %s %c\n", p->num, p->name, p->sex);       //方式二获取成员
    num = p->num++;
    printf("num=%d,p->num=%d\n", num, p->num);
    num = p++->num;
    printf("num=%d,p->num=%d\n", num, p->num);
    system("pause");
}
```

可以看到，p 就是一个结构体指针，可以对结构体 s 取地址并赋给 p，这样借助成员选择操作符，就可以通过 p 访问结构体的每个成员，然后进行打印。我们知道数组名中存储的是数据的首地址，所以可以将 `sarr` 赋给 p，这样就可以通过两种方式访问对应的成员。

使用 `(*p).num` 访问成员为什么要加括号呢？原因是 “`.`” 成员选择的优先级高于 “`*`”（即取值）运算符，所以必须加括号，通过 `*p` 得到 `sarr[0]`，然后获取对应的成员。

### 三、typedef 的使用

使用 typedef 声明新的类型名来代替已有的类型名。使用 stu 定义结构体变量和使用 struct student 定义结构体变量是等价的；使用 INTEGER 定义变量 ⅰ 和使用 int 定义变量i是等价的；pstu 等价于 `struct student*`，所以 p 是结构体指针变量。

```c
#include <stdio.h>
#include <stdlib.h>
//结构体指针
typedef struct student
{
    int num;
    char name[20];
    char sex;
} stu, *pstu; // pstu 等价于 struct student *
typedef int INTEGER;  //代码即注释
int main()
{
    stu s = {1001, "wangle", 'M'};
    pstu p;  //也可写为 stu *p，此时 p 也是结构体指针
    INTEGER i = 10;
    p = &s;
    printf("i=%d,p->num=%d\n", i, p->num);
    system("pause");
}
```
