---
title: C++ 的引用
date: 2022-06-06
references:
  - title: 跟“龙哥”学C语言编程
    url: https://weread.qq.com/web/reader/1bf323f071f02f351bf2985
  - title: 菜鸟教程
    url: https://www.runoob.com/cplusplus/
categories: 编程语言
tags: [C++, 引用]
---

> 严老师的数据结构和王道数据结构都是用的 C 语言语法，但是额外使用了 C++的引用。引用变量是一个别名，也就是说，它是某个已存在变量的另一个名字。一旦把引用初始化为某个变量，就可以使用该引用名称或变量名称来指向变量。相对于 C 指针来说，C++ 引用会便捷许多。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、引用的使用

通过原始变量名称或引用来访问变量的内容。我们在修改函数外的某一变量时，使用了引用后，在子函数内的操作和函数外操作手法一致，这样编程效率较高，对于初学者理解也非常方便。

```cpp
#include <iostream>
using namespace std;

int main()
{
    // 声明简单的变量
    int i;
    double d;
    // 声明引用变量
    int &r = i;
    double &s = d;
    i = 5;
    cout << "Value of i : " << i << endl;
    cout << "Value of i reference : " << r << endl;
    d = 11.7;
    cout << "Value of d : " << d << endl;
    cout << "Value of d reference : " << s << endl;
    return 0;
}
```

### 二、C 指针 vs C++ 引用

引用必须连接到一块合法的内存，不存在空引用；一旦引用被初始化为一个对象，就不能被指向到另一个对象，指针可以在任何时候指向到另一个对象；引用必须在创建时被初始化，指针可以在任何时间被初始化。

#### 在子函数内修改主函数的普通变量

C 指针：

```c
void modify_num(int *b)
{
  	++(*b);
}

int main()
{
  	int a = 10;
  	modify_num(&a)
}
```

C ++ 引用：

```cpp
void modify_num(int &b)
{
  	++b;
}
int main()
{
  	int a = 10;
  	modify_num(a)
}
```

#### 在子函数内修改主函数的一级指针

C 指针：

```c
void modify_pointer(int **p)
{
  	*p = q;
}

int main()
{
  	int *p = NULL;
  	modify_pointer(&p)
}
```

C ++ 引用：

```cpp
void modify_pointer(int *&p)
{
  	p = q;
}

int main()
{
  	int *p = NULL;
  	modify_pointer(p)
}
```
