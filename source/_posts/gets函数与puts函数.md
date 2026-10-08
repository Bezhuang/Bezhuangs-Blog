---
title: C 语言 gets 函数与 puts 函数
date: 2022-05-03
references:
  - title: 跟“龙哥”学C语言编程
    url: https://weread.qq.com/web/reader/1bf323f071f02f351bf2985
categories: 编程语言
tags: [C, 字符串]
---

> C 语言标准输入 scanf 在通过 `%s` 读取字符串时遇到空格就认为读取结束，这样没办法把一行带有空格的字符串存入到一个字符数组中。所以当需要输入的字符串中含有空格时，我们需要使用 gets 函数进行读取，使用 puts 函数进行输出。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、字符数组

字符数组的定义方法一维数组、二维数组类似，例如 `char c[10]="hello"`。

因为 C 语言规定字符串的结束标志为 `\0`，而系统会对字符串常量自动加一个 `\0`，为了保证处理方法一致，一般会人为地在字符数组中添加 `\0`，所以字符数组存储的字符串长度必须比字符数组少 1 字节。例如 `char[10]` 最多存储 9 个字符，最后一个字符用来存储 `\0`。

字符数组的数组名里存的就是字符数组的起始地址，类型是字符指针。即编译器给字符数组 c 内部存了一个值，c 中存储的值的类型是字符指针。

### 二、gets 函数和 puts 函数

scanf 函数没办法把一行带有空格的字符串存入到一个字符数组中，所以当需要输入的字符串中含有空格时，我们需要使用 gets 函数进行读取：`char *gets(char *str)`。

gets 函数从 STDIN（标准输入）读取字符并把它们加载到 str（字符串）中，直到遇到换行符（\n）或到达 EOF。gets 遇到 `\n` 后, 不会存储 `\n`，而是将其翻译为空字符 `\0`。

puts 函数类似于 printf 函数，用于输出标准输出：`int puts(char *str);`。

函数 puts 把 str (字符串) 写人STDOU (标准输出)。puts 执行成功时返回非负值，执行失败时返回 EOF。相对于 printf 函数，puts 只能用于输出字符串，同时多打印一个换行符。

```c
int main()
{
	char c[20];
	gets(c); //当一次读取一行时，使用gets
	puts(c); //等价于printf("%s\n",c);
	return 0;
}
```

虽然用 `gets()` 时有空格也可以直接输入，但是 gets 不检查预留存储区是否能够容纳实际输入的数据，换句话说，如果输入的字符数目大于数组的长度，gets 无法检测到这个问题，就会发生内存越界，所以编程时建议使用 `fgets()`。fgets 相对于 gets 去读取标准输入时，会把 `\n` 放到字符数组中。`char *fgets(char *s, int size, FILE *stream);`。

```c
int main()
{
	char c[20];
	fgets(c, sizeof(c), stdin);
	int len = strlen(c);
  c[len -1] = '\0';
	puts(c);
  return 0;
}
```

### 三、str 系列字符串操作函数

str 系列字符串操作函数主要包括 strlen、strcpy 、strcmp、strcat 等。strlen 函数用于统计字符串长度，strcpy 函数用于将某个字符串复制到字符数组中，strcmp 函数用于比较两个字符串的大小，strcat 函数用于将两个字符串连接到一起：

```c
#include <string.h>
size_t strlen(char *str);
char *strcpy(char *to, const char *from); //有const修饰代表此处可以放字符串常量
int strcmp(const char *str1, const char *str2);
char *strcat(char *str1, const char *str2);
```

对于传参类型 `char*`，直接放入字符数组的数组名即可。

```c
#include <stdio.h>
#include <string.h>
int main(){
    char c[20] = "zhuang";
    puts(c); //zhuang
    printf("数组c内字符串的长度=%d\n", strlen(c));
    char d[20];
    strcpy(d, c); // 将c的内容复制到d中
    puts(d); //zhuang
    strcpy(d, "study"); // 将字符串study复制到d中
    //strcmp比较字符串对应字符位置的ascii码值
    int ret = strcmp("hello", "how");
    printf("两个字符串比较结果=%d\n", ret);  //-1
    //strcat拼接两个字符串
    strcat(d, "!"); // 将字符串!拼接到d中
    puts(d);  //study!
    return 0;
}
```

### 四、判断回文数

读取一个字符串，字符串可能含有空格，将字符串逆转，原来的字符串与逆转后字符串相同，输出 0，原字符串小于逆转后字符串输出 -1，大于逆转后字符串输出 1。例如输入 hello，逆转后的字符串为 olleh，因为hello 小于 olleh，所以输出 -1。

```c
#include <stdio.h>
#include <string.h>
int main()
{
  char c[20], d[20];
  gets(c);
  int i, j;
  for (i = strlen(c) - 1, j = 0; i >= 0; i--, j++)
  {
    d[j] = c[i];
  }
  d[j] = '\0';
  int result = strcmp(c, d);
  if (result < 0)
  {
    printf("%d\n", -1);
  }
  else if (result > 0)
  {
    printf("%d\n", 1);
  }
  else
  {
    printf("%d\n", 0);
  }
  return 0；
}
```
