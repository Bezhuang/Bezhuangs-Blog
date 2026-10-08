---
title: C++ 基础知识总结
date: 2020-11-09
references:
  - title: C语言中文网
    url: http://c.biancheng.net/cplus/
categories: 编程语言
tags: [C++, 编程语言]
---

> Object Oriented Programming，面向对象的编程的思想是一种对现实世界理解和抽象的方法，其有的封装、继承、多态性的特性，可以设计出低耦合的系统，使系统更灵活和易于维护，对软件开发相当重要。C++ 是一门面向对象的编程语言，本文包含对于C++语言中类、对象、运算符重载、继承、多态等面向对象的程序设计方法，以及模板、标准模板库STL等泛型程序设计的机制的描述，希望帮助读者能够更好的体会和领悟面向对象程序设计方法和泛型程序设计方法的优势。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 从C到C++

#### C++程序

- GCC 是所有编译器的总称，在C语言中使用 `gcc` 命令编译和链接 C 程序。`g++` 命令用来编译 C++，`gcj `命令用来编译 Java，`gccgo` 命令用来编译 Go 语言

- 命名空间（Namespace）解决合作开发时的命名冲突问题

  ```c++
  namespace name{//variables, functions, classes}
  ```
  
- `name` 是命名空间的名字，它里面可以包含变量、函数、类、typedef、#define 等

- 使用变量、函数时要指明它们所在的命名空间，`::`是域解析操作符，用来指明要使用的命名空间

- 可采用 `using` 关键字声明变量或整个命名空间，`using Li::fp;`，`using namespace Li;`

- C++头文件和`std`标准命名空间

  ```c++
  #include <iostream>
  // using namespace std;声明在全局范围中
  void func(){
      using namespace std;  
      cout<<"Bezhuang"<<endl;
  }
  int main(){
      using namespace std;    //声明命名空间std
      cout<<"C++学习者："<<endl;
      func();
      return 0;
  }
  ```
  
- 输入输出：需要包含头文件`iostream`，`cin>>`标准输入、`cout<<`标准输出、`cerr`标准错误，`endl`结束此行

- `new` 动态分配内存（对应`malloc()`），`delete` 释放内存（对应`free()`）

  ```c++
  int *p = new int[10];  //分配10个int型的内存空间
  delete[] p;
  ```

#### 内联函数

- 内联函数（Inline Function）：在函数调用处直接嵌入函数体的函数称为，类似于C语言中的宏展开

- 注意要在函数定义处添加 `inline` 关键字而不是在声明处（编译器会忽略）

  ```c++
  inline void swap(int *a, int *b){    //内联函数，交换两个数的值
      int temp;
      temp = *a;
      *a = *b;
      *b = temp;
  }
  int main(){
      int m, n;
      cin>>m>>n;
      cout<<m<<", "<<n<<endl;
      swap(&m, &n);
      cout<<m<<", "<<n<<endl;
      return 0;
  ```

#### 重载和引用

- 通过使用默认参数，可以减少要定义的析构函数、方法以及方法重载的数量

- 实参和形参的传值是从左到右依次匹配的，默认参数只能放在形参列表的最后，一旦为某个形参指定了默认值，那么它后面的所有形参都必须有默认值

  ```C++
  void func(int a, float b=d+2.9, char c='@', int e){ }
  ```

- 函数的重载（Function Overloading）允许多个函数拥有相同的名字，只要它们的参数列表（参数的类型、参数的个数和参数的顺序）不同就可以，但仅返回类型不同不能作为重载的依据

- 同指针一样，引用能够减少数据的拷贝，提高数据的传递效率

  ```C++
  类型名 &引用变量名 = 被引用变量名;    //type &name = data;
  ```

- 引用在定义时需要添加 `&`，在使用时不能添加 `&`，使用时添加 `&` 表示取地址

- 常引用：如果不希望通过引用来修改原始的数据，那么可以在定义时添加 `const` 限制

  ```C++
  const 类型名 &引用变量名 = 被引用变量名;    // comst type &name = value;
  ```

- C++ 引用可以作为函数参数也可以作为函数返回值

  ```c++
  int &plus10(int &r) {
      r += 10;
      return r;
  }
  int main() {
      int num1 = 10;
      int num2 = plus10(num1);
      cout << num1 << " " << num2 << endl;
      return 0;
  }  //运行结果20 20
  ```

#### C++字符串

- 使用 string 类需要包含头文件  `#include <string>`


- `string s1;`   `string s2 = "c plus plus";`   `string s3 = s2;`   `string s4 (5, 's');`

- `length()` 函数求长度，`c_str()` 函数转为C风格字符串

- `string` 类可以使用`+`或`+=`运算符来直接拼接字符串

- `insert()` 函数可以在 `string` 字符串中指定的位置插入另一个字符串
  
  ```c++
  string& insert (size_t pos, const string& str);
  //pos 表示要插入的位置，也就是下标；str 表示要插入的字符串
  s1.insert(pos, str);
  ```

- `erase(pos, len)` 函数可以删除 `string` 中的一个子字符串
- `substr(pos, len)` 函数用于从 `string` 字符串中提取子字符串
- `find(str, pos)` 函数用于在 `string` 字符串中查找子字符串出现的位置
- `rfind()` 和 `find()` 很类似，同样是在字符串中查找子字符串，不同的是 `find()` 函数从 `pos` 参数开始往后查找，而 `rfind()` 函数则最多查找到 `pos` 处
- `find_first_of(str)` 函数用于查找子字符串和字符串共同具有的字符在字符串中首次出现的位置

### 类与对象编程

#### 类的定义

- 类是创建对象的模板，通过类名创建对象的过程叫做类的实例化，对象是类的一个实例（Instance）

- 类的成员变量称为类的属性（Property），类的成员函数称为类的方法（Method）

  ```c++
  class Student{    //类通常定义在函数外面
  public:
      //成员变量Property
      char *name;
      int age;
      float score;
      //成员函数Method
      void say(){cout<<name<<"年龄是"<<age<<"，成绩是"<<score<<endl;}
  };
  ```

- 类只是一个模板（Template），编译后不占用内存空间，所以在定义类时不能对成员变量进行初始化，只有在创建对象以后才会给成员变量分配内存，才可以赋值

  ```c++
  int main(){
      Student stu;  //创建对象
      stu.name = "小明"; stu.age = 15; stu.score = 92.5f;
      stu.say();
      return 0;
  }
  ```

- 使用 `class` 时，类中的成员默认都是 `private` 属性的，而使用 `struct` 时，结构体中的成员默认都是 `public` 属性的
- 使用 `class` 来定义类，使用 `struct` 来定义结构体，这样做语义更加明确

#### 成员变量和成员函数

- 类的成员有成员变量和成员函数两种，成员函数之间可以互相调用，成员函数内部可以访问成员变量

- 在栈上创建对象指针，形式和定义普通变量类似，不能使用 delete 在栈上创建的对象

  ```c++
  Student stu;  //对象stu在栈上分配内存，需要使用&获取它的地址
  Student *pStu = &stu;  //pStu 是一个指针，它指向 Student 类型的数据
  ```

- 使用 new 在堆上创建出来的对象必须要用一个指针指向它来访问它的成员变量或成员函数

  ```c++
  Student *pStu = new Student;
  pStu -> name = "小明"; pStu -> age = 15; pStu -> score = 92.5f;
  pStu -> say();
  delete pStu;  //删除对象
  return 0;
  ```

- 可以用 `对象名.成员名`、`引用名.成员名`、`对象指针->成员名` 的方法访问对象的成员变量或调用成员函数

- 对象所占用的存储空间的大小等于各成员变量所占用的存储空间的大小之和（如果不考虑成员变量对齐问题的话）

- 当成员函数定义在类外时必须在函数名前面加上类名予以限定，域解析符（作用域运算符/限定符）`::` 用来连接类名和函数名，指明当前函数属于哪个类

  ```c++
  class Student{
  public:
      //成员函数
      void say();  //成员函数必须先在类体中作原型声明，然后在类外定义
  };
  void Student::say(){
      cout<<name<<"的年龄是"<<age<<"，成绩是"<<score<<endl;
  ```

- 在类体外定义 inline 函数的方式，必须将类的定义和成员函数的定义都放在同一个头文件中（或者同一个源文件中），否则编译时无法进行嵌入，因此强烈建议将内联函数定义在类的内部

#### 类的封装

- 成员访问限定符 `public`、`protected`、`private` 控制成员变量和成员函数的访问权限
- C++ 中的类没有共有私有之分，public、private、protected 只能修饰类的成员，不能修饰类
- 封装是指尽量隐藏类的内部实现，只向用户提供有用的成员函数

  - 实际项目开发中的成员变量以及只在类内部使用的成员函数（只被成员函数调用的成员函数）都应声明为 private，只将允许通过对象调用的成员函数声明为 public
  - 给成员变量赋值的函数通常称为 `set` 函数，读取成员变量的值的函数通常称为 `get` 函数
- 包含成员对象的类叫封闭类。任何能够生成封闭类对象的语句，都要说明对象中包含的成员对象是如何初始化的，如果不说明则编译器认为成员对象是用默认构造函数或参数全部可以省略的构造函数初始化
- 在封闭类的构造函数的初始化列表中可以说明成员对象如何初始化。封闭类对象生成时，先执行成员对象的构造函数，再执行自身的构造函数；封闭类对象消亡时，先执行自身的析构函数，再执行成员对象的析构函数

#### 构造函数和析构函数

- 构造函数（Constructor）没有返回值，不需要用户显式调用（用户也不能调用），而是在创建对象时自动执行  `类名(){}`

  ```c++
  //声明构造函数（Student类中）
  Student(char *name, int age, float score);
  //定义构造函数
  Student::Student(char *name, int age, float score){
      m_name = name; m_age = age; m_score = score;}
  //创建对象时向构造函数传参（主函数中）
  Student *pstu = new Student("李华", 16, 96);
  pstu -> show();
  ```

- 构造函数必须是 public 属性的，否则创建对象时无法调用

- 构造函数没有返回值因此不管是声明还是定义，函数名前面都不能出现返回值类型，函数体中不能有 return 语句

- 构造函数的调用是强制性的，一旦在类中定义了构造函数，那么创建对象时就一定要调用

- 创建对象时只有一个构造函数会被调用，如果有多个重载的构造函数，那么创建对象时提供的实参必须和其中的一个构造函数匹配

- 一个类必须有构造函数，要么用户自己定义，要么编译器自动生成默认构造函数 `类名(){}`

- 定义类时，如果一个构造函数都不写，则编译器自动生成默认（无参）构造函数和复制构造函数，如果编写了构造函数，则编译器不自动生成默认构造函数

- 一个类不一定会有默认构造函数，但一定会有复制构造函数

- 构造函数的初始化列表

  ```c++
  Student::Student(char *name, int age, float score): m_name(name){
      m_age = age;
      m_score = score;
  }  //只对 m_name 使用初始化列表，其他成员变量还是一一赋值
  ```

- 成员变量的初始化顺序与初始化列表中列出的变量的顺序无关，只与成员变量在类中声明的顺序有关

- 初始化 `const` 成员变量的唯一方法就是使用初始化列表

  ```c++
  class VLA{
  private:
      const int m_len;
      int *m_arr;
  public:
      VLA(int len);
  };
  //必须使用初始化列表来初始化 m_len
  VLA::VLA(int len): m_len(len){
      m_arr = new int[len];
  }
  ```

- 对象在消亡时会调用析构函数

- 析构函数（Destructor）没有返回值，不需要程序员显式调用，在销毁对象时自动执行  `~类名(){}`

- 构造函数和析构函数对于类来说是不可或缺的，`new` 分配内存时会调用构造函数，用 `delete` 释放内存时会调用析构函数

#### 静态成员和常成员

- `this` 指针也是一个 `const` 指针，它指向当前对象，用`->`来访问当前对象的所有成员变量或成员函数，它的值是不能被修改的

- `this` 只能用在类的内部，通过 this 可以访问类的所有成员，包括 `private`、`protected`、`public` 属性的

- `this` 只能在成员函数内部使用，只有当对象被创建后 `this` 才有意义，因此也不能在 `static` 成员函数中使用

- `this` 实际上是成员函数的一个形参，在调用成员函数时将对象的地址作为实参传递给 `this`

- 成员函数中出现的 `this` 指针，就是指向成员函数所作用的对象的指针，因此静态成员函数内部不能出现 `this` 指针

- 成员函数实际上的参数个数比表面上看到的多一个，多出来的参数就是 `this` 指针

- 静态成员变量是一种特殊的成员变量，它被关键字 `static` 修饰

  ```c++
  static int m_total;  //静态成员变量
  ```

- `static` 成员变量不占用对象的内存，而是在所有对象之外开辟内存，即使不创建对象也可以访问

- 一个类中可以有一个或多个静态成员变量，所有的对象都共享这些静态成员变量，都可以引用它

- 每个对象有各自的一份普通成员变量，但是静态成员变量只有一份，被所有对象所共享。

- 静态成员变量必须初始化，而且只能在类体外进行：`int Student::m_total = 10;`

- `static` 静态成员函数不具体作用于某个对象。即便对象不存在，也可以访问类的静态成员。

- 静态成员函数内部不能访问非静态成员变量，也不能调用非静态成员函数。

- 和静态成员变量类似，静态成员函数在声明时要加 `static`，在定义时不能加 `static`。静态成员函数可以通过类来调用（一般都是这样做），也可以通过对象来调用

- 如果你不希望某些数据被修改，可以使用`const`关键字加以限定。`const` 可以用来修饰成员变量和常成员函数

- `const` 成员和引用成员必须在构造函数的初始化列表中初始化，此后值不可修改

- 常成员函数需要在声明和定义的时候在函数头部的结尾加上 `const` 关键字

  ```c++
  //声明常成员函数
  char *getname() const;
  //定义常成员函数
  char * Student::getname() const{
      return m_name;
  ```

- 函数开头加 `const` 用来修饰函数的返回值，表示返回值是 `const` 类型，也就是不能被修改，例如`const char * getname()`

- 函数头部的结尾加上 `const` 表示常成员函数，这种函数只能读取成员变量的值，而不能修改成员变量的值，例如`char * getname() const`

- `const` 也可以用来修饰对象，称为常对象。一旦将对象定义为常对象之后，就只能调用类的 `const` 成员了

- 常量对象上面不能执行非常量成员函数，只能执行常量成员函数

  ```c++
  //定义常对象的语法和定义常量的语法类似
  const class object(params); 
  class const object(params);
  //当然你也可以定义 const 指针
  const class *p = new class(params);  
  class const *p = new class(params);
  //class为类名，object为对象名，params为实参列表，p为指针名
  ```

#### 友元函数和友元类

- 借助友元（friend）可以使得其他类中的成员函数以及全局范围内的函数访问当前类的 `private` 成员
  ```c++
  friend void show(Student *pstu);  //将show()声明为友元函数
  ```
  
- 友元函数不同于类的成员函数，在友元函数中不能直接访问类的成员，必须要借助对象。

  ```c++
  void show(Student *pstu){cout<<pstu->m_name<<"的年龄是 "<<pstu->m_age<<endl;}
  ```
  
- 可以将非成员函数声明为友元函数，也可以将其他类的成员函数声明为友元函数

- 一个函数可以被多个类声明为友元函数，这样就可以访问多个类中的 private 成员

- 友元类中的所有成员函数都是另外一个类的友元函数  `friend class Student;`

- 友友元分为友元函数和友元类，友元关系不能传递。如果类 B 是类 A 的友元类，类 C 是类 B 的友元类，不等于类 C 是类 A 的友元类

- 友元的关系是单向的而不是双向的。如果声明了类 B 是类 A 的友元类，不等于类 A 是类 B 的友元类

### 引用

- 参数的传递本质上是一次赋值的过程，赋值就是对内存进行拷贝，将一块内存上的数据复制到另一块内存上（内存拷贝）

- C/C++ 禁止在函数调用时直接传递数组的内容，而是强制传递数组指针，而对于结构体和对象没有这种限制，调用函数时既可以传递指针，也可以直接传递内容

- 引用（Reference）可以看做是数据的一个别名，通过这个别名和原来的名字都能够找到这份数据

  ```cpp
  type &name = data;
  ```

- 引用必须在定义的同时初始化，并且不能再引用其它数据，类似于 const 常量

  ```cpp
  int main() {
      int a = 99;
      int &r = a;    //引用
      return 0;
  }
  ```

- 常引用：如果不希望通过引用来修改原始的数据，那么可以在定义时添加 const 限制

  ```cpp
  const type &name = value;
  //或type const &name = value;
  ```

#### 引用作为函数参数

- 在定义或声明函数时，可以将函数的形参指定为引用的形式，这样在调用函数时就会将实参和形参绑定在一起，让它们都指代同一份数据

- 如此一来，如果在函数体中修改了形参的数据，那么实参的数据也会被修改，从而拥有“在函数内部影响函数外部数据”的效果

  ```cpp
  void swap1(int a, int b);
  void swap2(int *p1, int *p2);
  void swap3(int &r1, int &r2);
  int main() {
      int num1, num2;
      swap1(num1, num2);
      swap2(&num1, &num2);
      swap3(num1, num2);
      return 0;
  }
  //直接传递参数内容，不能达到交换两个数的值的目的
  void swap1(int a, int b) {
      int temp = a;
      a = b;
      b = temp;
  }
  //传递指针，调用函数时，分别将 num1、num2 的指针传递给 p1、p2，此后 p1、p2 指向 a、b 所代表的数据，在函数内部可以通过指针间接地修改 a、b 的值
  void swap2(int *p1, int *p2) {
      int temp = *p1;
      *p1 = *p2;
      *p2 = temp;
  }
  //按引用传参，调用函数时，分别将 r1、r2 绑定到 num1、num2 所指代的数据，此后 r1 和 num1、r2 和 num2 就都代表同一份数据了，通过 r1 修改数据后会影响 num1，通过 r2 修改数据后也会影响 num2
  void swap3(int &r1, int &r2) {
      int temp = r1;
      r1 = r2;
      r2 = temp;
  }
  ```

#### 引用作为函数返回值

- 将引用作为函数返回值时，不能返回局部数据（例如局部变量、局部对象、局部数组等）的引用，因为当函数调用完成后局部数据就会被销毁，有可能在下次使用时数据就不存在了，C++ 编译器检测到该行为时也会给出警告

  ```cpp
  int &plus10(int &r) {
      r += 10;
      return r;
  }
  int main() {
      int num1 = 10;
      int num2 = plus10(num1);
      cout << num1 << " " << num2 << endl;
      return 0;
  }
  ```

### 继承与派生

#### 三种继承方式

- 继承（Inheritance）/ 派生（Derive）是一个类从另一个类获取成员变量和成员函数的过程

- 被继承的类称为父类或基类，继承的类称为子类或派生类

  ```c++
  class 派生类名:［继承方式］ 基类名{
      派生类新增加的成员
  };
  ```

- 继承方式包括 `public`、`private`和 `protected`，此项是可选的，如果不写，那么默认为 `private`

- 类成员的访问权限由高到低依次为 `public` --> `protected` --> `private`

- protected 成员和 private 成员类似，也不能通过对象访问。但是当存在继承关系时，基类中的 protected 成员可以在派生类中使用，而基类中的 private 成员不能在派生类中使用

- 基类成员在派生类中的访问权限不得高于继承方式中指定的权限，也就是说，继承方式中的 public、protected、private 是用来指明基类成员在派生类中的最高访问权限的

- 实际上基类的 private 成员是能够被继承的，并且（成员变量）会占用派生类对象的内存，它只是在派生类中不可见，导致无法使用罢了

- 在派生类中访问基类 private 成员的唯一方法就是借助基类的非 private 成员函数，如果基类没有非 private 成员函数，那么该成员在派生类中将无法访问

  ```cpp
  //基类People
  class People{
  public:
      void setname(char *name);
      void setage(int age);
      void sethobby(char *hobby);
      char *gethobby();
  protected:
      char *m_name;
      int m_age;
  private:
      char *m_hobby;
  };
  void People::setname(char *name){ m_name = name; }
  void People::setage(int age){ m_age = age; }
  void People::sethobby(char *hobby){ m_hobby = hobby; }
  char *People::gethobby(){ return m_hobby; }
  //派生类Student
  class Student: public People{
  public:
      void setscore(float score);
  protected:
      float m_score;
  };
  void Student::setscore(float score){ m_score = score; }
  //派生类Pupil
  class Pupil: public Student{
  public:
      void setranking(int ranking);
      void display();
  private:
      int m_ranking;
  };
  void Pupil::setranking(int ranking){ m_ranking = ranking; }
  void Pupil::display(){
      cout<<m_name<<"的年龄是"<<m_age<<"，考试成绩为"<<m_score<<"分，班级排名第"<<m_ranking<<"，TA喜欢"<<gethobby()<<"。"<<endl;
  }
  int main(){
      Pupil pup;
      pup.setname("小明");
      pup.setage(15);
      pup.setscore(92.5f);
      pup.setranking(4);
      pup.sethobby("乒乓球");
      pup.display();
      return 0;
  }
  ```

#### 改变访问权限

- 使用 `using` 关键字可以改变基类成员在派生类中的访问权限

- using 只能改变基类中 public 和 protected 成员的访问权限，不能改变 private 成员的访问权限，因为基类中 private 成员在派生类中是不可见的，根本不能使用，所以基类中的 private 成员在派生类中无论如何都不能访问

  ```cpp
  //派生类Student
  class Student : public People {
  public:
      void learning();
  public:
      using People::m_name;  //将protected改为public
      using People::m_age;  //将protected改为public
  ```

- 如果派生类中的成员（包括成员变量和成员函数）和基类中的成员重名，那么就会遮蔽从基类继承过来的成员
- 所谓遮蔽，就是在派生类中使用该成员（包括在定义派生类时使用，也包括通过派生类对象访问该成员）时，实际上使用的是派生类新增的成员，而不是从基类继承来的
- 基类成员函数和派生类成员函数不会构成重载，如果派生类有同名函数，那么就会遮蔽基类中的所有同名函数，不管它们的参数是否一样

#### 基类和派生类的构造函数和析构函数

- 类的构造函数不能被继承

- 解决方法：在派生类的构造函数中调用基类的构造函数

- 派生类构造函数中只能调用直接基类的构造函数，不能调用间接基类的

- 定义派生类构造函数时最好指明基类构造函数；如果不指明，就调用基类的默认构造函数（不带参数的构造函数）；如果没有默认构造函数，那么编译失败

  ```cpp
  //基类People
  class People{
  protected:
      char *m_name;
      int m_age;
  public:
      People();  //基类默认构造函数
      People(char*, int);
  };
  People::People(): m_name("xxx"), m_age(0){ }
  People::People(char *name, int age): m_name(name), m_age(age){}
  //派生类Student
  class Student: public People{
  private:
      float m_score;
  public:
      Student();
      Student(char *name, int age, float score);
      void display();
  };
  //People(name, age)就是调用基类的构造函数
  Student::Student(): m_score(0.0){ }  //派生类默认构造函数
  Student::Student(char *name, int age, float score): People(name, age), m_score(score){ }
  void Student::display(){
      cout<<m_name<<"的年龄是"<<m_age<<"，成绩是"<<m_score<<"。"<<endl;
  }
  int main(){
      Student stu1;
      stu1.display();
      Student stu2("小明", 16, 90.5);
      stu2.display();
      return 0;
  }
  ```

- 和构造函数类似，析构函数也不能被继承
- 与构造函数不同的是，在派生类的析构函数中不用显式地调用基类的析构函数，因为每个类只有一个析构函数，编译器知道如何选择，无需程序员干涉
- 析构函数的执行顺序和构造函数的执行顺序也刚好相反：
  - 创建派生类对象时，构造函数的执行顺序和继承顺序相同，即先执行基类构造函数，再执行派生类构造函数
  - 而销毁派生类对象时，析构函数的执行顺序和继承顺序相反，即先执行派生类析构函数，再执行基类析构函数

#### 多重继承

- 多继承（Multiple Inheritance）：一个派生类可以有两个或多个基类

- 多继承容易让代码逻辑复杂、思路混乱，一直备受争议，中小型项目中较少使用，后来的 Java、C#、PHP 等干脆取消了多继承

  ```cpp
  class D: public A, private B, protected C{
      //类D新增加的成员
  }
  ```

- D 是多继承形式的派生类，它以公有的方式继承 A 类，以私有的方式继承 B 类，以保护的方式继承 C 类

- D 根据不同的继承方式获取 A、B、C 中的成员，确定它们在派生类中的访问权限

- 多继承形式下的构造函数和单继承形式基本相同，只是要在派生类的构造函数中调用多个基类的构造函数

- 基类构造函数的调用顺序和和它们在派生类构造函数中出现的顺序无关，而是和声明派生类时基类出现的顺序相同

  ```cpp
  D(形参列表): A(实参列表), B(实参列表), C(实参列表){
      //其他操作
  }
  ```

- 当两个或多个基类中有同名的成员时，如果直接访问该成员，就会产生命名冲突，编译器不知道使用哪个基类的成员
- 命名冲突的时候需要在成员名字前面加上类名和域解析符`::`，以显式地指明到底使用哪个类的成员，消除二义性

#### 虚继承和虚基类

- 虚继承（Virtual Inheritance）：在继承方式前面加上 virtual 关键字，使得在派生类中只保留一份间接基类的成员

  ```cpp
  //间接基类A
  class A{
  protected:
      int m_a;
  };
  //直接基类B
  class B: virtual public A{  //虚继承
  protected:
      int m_b;
  };
  //直接基类C
  class C: virtual public A{  //虚继承
  protected:
      int m_c;
  };
  //派生类D
  class D: public B, public C{
  public:
      void seta(int a){ m_a = a; }  //正确
      void setb(int b){ m_b = b; }  //正确
      void setc(int c){ m_c = c; }  //正确
      void setd(int d){ m_d = d; }  //正确
  private:
      int m_d;
  };
  int main(){
      D d;
      return 0;
  ```

- 虚继承的目的是让某个类做出声明，承诺愿意共享它的基类，这个被共享的基类就称为虚基类（Virtual Base Class）
- 必须在虚派生的真实需求出现前就已经完成虚派生的操作
- 虚派生只影响从指定了虚基类的派生类中进一步派生出来的类，它不会影响派生类本身
- C++ 标准库中的 iostream 类就是一个虚继承的实际应用案例
  - iostream 从 istream 和 ostream 直接继承而来，而 istream 和 ostream 又都继承自一个共同的名为 base_ios 的类
  - 此时 istream 和 ostream 必须采用虚继承，否则将导致 iostream 类中保留两份 base_ios 类的成员
- 不提倡在程序中使用多继承，只有在比较简单和不易出现二义性的情况或实在必要时才使用多继承，能用单一继承解决的问题就不要使用多继承

- 在虚继承中，虚基类是由最终的派生类初始化的，最终派生类的构造函数必须要调用虚基类的构造函数
- 对最终的派生类来说，虚基类是间接基类，而不是直接基类，这跟普通继承不同
  - 在普通继承中，派生类构造函数中只能调用直接基类的构造函数，不能调用间接基类的

#### 向上转型

- 数据类型转换的前提是，编译器知道如何对数据进行取舍
- 类其实也是一种数据类型，也可以发生数据类型转换
- 不过这种转换只有在基类和派生类之间才有意义，并且只能将派生类赋值给基类，包括将派生类对象赋值给基类对象、将派生类指针赋值给基类指针、将派生类引用赋值给基类引用，这称为向上转型（Upcasting）
- 相应地，将基类赋值给派生类称为向下转型（Downcasting）
- 向上转型非常安全，可以由编译器自动完成；向下转型有风险，需要程序员手动干预
- 赋值的本质是将现有的数据写入已分配好的内存中，对象的内存只包含了成员变量，所以对象之间的赋值是成员变量的赋值，成员函数不存在赋值问题
- 这种转换关系是不可逆的，只能用派生类对象给基类对象赋值，而不能用基类对象给派生类对象赋值
- 通过基类指针访问派生类的成员
  - 编译器通过指针来访问成员变量，指针指向哪个对象就使用哪个对象的数据
  - 编译器通过指针的类型来访问成员函数，指针属于哪个类的类型就使用哪个类的函数

### 多态与虚函数

- 多态（polymorphism）：同一名字的事物可以完成不同的功能
- 多态可以分为编译时的多态和运行时的多态
  - 编译时的多态：主要是指函数的重载（包括运算符的重载）、对重载函数的调用，在编译时就能根据实参确定应该调用哪个函数
  - 运行时的多态：通常所指的多态，和继承、虚函数等概念有关
- 通过基类指针只能访问派生类的成员变量，但是不能访问派生类的成员函数
  - 为了消除这种尴尬，让基类指针能够访问派生类的成员函数，C++ 增加了虚函数（Virtual Function），只需要在函数声明前面增加 virtual 关键字即可
- 有了虚函数，基类指针指向基类对象时就使用基类的成员（包括成员函数和成员变量），指向派生类对象时就使用派生类的成员
- 因此，基类指针可以按照基类的方式来做事，也可以按照派生类的方式来做事，它有多种形态，或者说有多种表现方式，称为多态（Polymorphism）
- C++提供多态的目的：可以通过基类指针对所有派生类（包括直接派生和间接派生）的成员变量和成员函数进行全方位的访问，尤其是成员函数。如果没有多态，我们只能访问成员变量
- 借助引用也可以实现多态，不过引用不像指针灵活，指针可以随时改变指向，而引用只能指代固定的对象，在多态性方面缺乏表现力
- 为了方便，可以只将基类中的函数声明为虚函数，这样所有派生类中具有遮蔽关系的同名函数都将自动成为虚函数
- 当在基类中定义了虚函数时，如果派生类没有定义新的函数来遮蔽此函数，那么将使用基类的虚函数
- 只有派生类的虚函数覆盖基类的虚函数（函数原型相同）才能构成多态（通过基类指针访问派生类函数）
  - 例如基类虚函数的原型为`virtual void func();`，派生类虚函数的原型为`virtual void func(int);`，那么当基类指针 p 指向派生类对象时，语句`p -> func(100);`将会出错，而语句`p -> func();`将调用基类的函数
- 派生类不继承基类的构造函数，将构造函数声明为虚函数没有什么意义
- 析构函数可以声明为虚函数，而且有时候必须要声明为虚函数

#### 构成多态的条件

- 必须存在继承关系

- 继承关系中必须有同名的虚函数，并且它们是覆盖关系（函数原型相同）

- 存在基类的指针，通过该指针调用虚函数

  ```cpp
  //基类Base
  class Base{
  public:
      virtual void func();
      virtual void func(int);
  };
  void Base::func(){
      cout<<"void Base::func()"<<endl;
  }
  void Base::func(int n){
      cout<<"void Base::func(int)"<<endl;
  }
  //派生类Derived
  class Derived: public Base{
  public:
      void func();
      void func(char *);
  };
  void Derived::func(){
      cout<<"void Derived::func()"<<endl;
  }
  void Derived::func(char *str){
      cout<<"void Derived::func(char *)"<<endl;
  }
  //在基类中将void func()声明为虚函数，这样派生类中的void func()就会自动成为虚函数
  int main(){
      Base *p = new Derived();
      p -> func();  //调用的是派生类的虚函数，构成了多态，输出void Derived::func()
      p -> func(10);  //调用的是基类的虚函数，因为派生类中没有函数覆盖它，输出void Base::func(int)
      p -> func("abcd");  //compile error，因为通过基类的指针只能访问从基类继承过去的成员，不能访问派生类新增的成员
      return 0;
  }
  ```

- 什么时候声明虚函数

  - 首先看成员函数所在的类是否会作为基类，然后看成员函数在类的继承后有无可能被更改功能
  - 如果希望更改其功能的，一般应该将它声明为虚函数
  - 如果成员函数在类被继承后功能不需修改，或派生类用不到该函数，则不要把它声明为虚函数

#### 纯虚函数和抽象类

- 纯虚函数没有函数体，只有函数声明，在虚函数声明的结尾加上 `=0`，表明此函数为纯虚函数

- 包含纯虚函数的类称为抽象类（Abstract Class），无法实例化，也就是无法创建对象，原因很明显，纯虚函数没有函数体，不是完整的函数，无法调用，也无法为其分配内存空间

  ```cpp
  virtual 返回值类型 函数名 (函数参数) = 0;
  ```

- 抽象基类除了约束派生类的功能，还可以实现多态

- 一个纯虚函数就可以使类成为抽象基类，但是抽象基类中除了包含纯虚函数外，还可以包含其它的成员函数（虚函数或普通函数）和成员变量

- 只有类中的虚函数才能被声明为纯虚函数，普通成员函数和顶层函数均不能声明为纯虚函数

  ```cpp
  //顶层函数不能被声明为纯虚函数
  void fun() = 0;   //compile error
  class base{
  public :
      //普通成员函数不能被声明为纯虚函数
      void display() = 0;  //compile error
  };
  ```

#### typeid 运算符

- typeid 运算符用来获取一个表达式的类型信息

- 类型信息是创建数据的模板，数据占用多大内存、能进行什么样的操作、该如何操作等，这些都由它的类型信息决定

  ```cpp
  typeid( dataType )
  typeid( expression )    //dataType 是数据类型，expression 是表达式
  ```

- typeid 会把获取到的类型信息保存到一个 `type_info` 类型的对象里面，并返回该对象的常引用,当需要具体的类型信息时，可以通过成员函数来提取

- type_info 类位于 `typeinfo` 头文件，它的构造函数是 private 属性的，所以不能在代码中直接实例化，只能由编译器在内部实例化（借助友元），而且还重载了 private 属性的 `=` 运算符，所以也不能赋值

### 运算符重载（operator）

- 运算符重载是通过函数实现的，它本质上是函数重载，运算符重载函数除了函数名有特定的格式，其它地方和普通函数并没有区别

  ```cpp
  返回值类型 operator 运算符名称 (形参表列){
      //TODO:
  }
  ```

- 重载后运算符的含义应该符合原有用法习惯，例如重载 `+` 运算符，完成的功能就应该类似于做加法

- 重载应尽量保留运算符原有的特性

- 运算符重载不改变运算符的优先级。

- `.、.*、::、? :、sizeof` 不能被重载

- 重载运算符 `()、[]、->` 或者赋值运算符 `=` 时，只能将它们重载为成员函数，不能重载为全局函数

- 运算符重载的实质是将运算符重载为一个函数，使用运算符的表达式就被解释为对重载函数的调用

- 运算符可以重载为全局函数，此时函数的参数个数就是运算符的操作数个数，运算符的操作数就成为函数的实参

- 运算符也可以重载为成员函数。此时函数的参数个数就是运算符的操作数个数减一，运算符的操作数有一个成为函数作用的对象，其余的成为函数的实参

- 必要时需要重载赋值运算符 `=`，以避免两个对象内部的指针指向同一片存储空间

- 运算符可以重载为全局函数，然后声明为类的友元

- `<<` 和 `>>` 是在 iostream 中被重载，才成为所谓的“流插入运算符”和“流提取运算符”的
- 类型的名字可以作为强制类型转换运算符，也可以被重载为类的成员函数，它能使得对象被自动转换为某种类型

- 自增、自减运算符各有两种重载方式，用于区别前置用法和后置用法

- 运算符重载不改变运算符的优先级，重载运算符时，应该尽量保留运算符原本的特性


### 模板和泛型程序设计

-  泛型程序设计（generic programming）是一种算法在实现时不指定具体要操作的数据的类型的程序设计方法

- 所谓“泛型”，指的是算法只要实现一遍，就能适用于多种数据类型，泛型程序设计方法的优势在于能够减少重复代码的编写

- 泛型程序设计的概念最早出现于 1983 年的 Ada 语言，其最成功的应用就是 C++ 的标准模板库（STL）

- 在 C++ 中，模板分为函数模板和类模板两种，在编写函数时考虑能否将其写成函数模板，编写类时考虑能否将其写成类模板，以便实现重用

- 类型的参数化：数据的类型也可以通过参数来传递，在函数定义时可以不指明具体的数据类型，当发生函数调用时，编译器可以根据传入的实参自动推断数据类型

- 函数模板（Function Template）：建立一个通用函数，它所用到的数据的类型（包括返回值类型、形参类型、局部变量类型）可以不具体指定，而是用一个虚拟的类型来代替（实际上是用一个标识符来占位），等发生函数调用时再根据传入的实参来逆推出真正的类型

- 函数模板除了支持值的参数化，还支持类型的参数化

- 一但定义了函数模板（类模板），就可以将类型参数用于函数定义和函数声明了

- 函数模板也可以提前声明，不过声明时需要带上模板头，并且模板头和函数定义（声明）是一个不可分割的整体，它们可以换行，但中间不能有分号

  ```cpp
  template <typename 类型参数1 , typename 类型参数2 , ...> 返回值类型  函数名(形参列表){
      //在函数体中可以使用类型参数
  }
  ```

- 类模板和函数模板都是以 template 开头（当然也可以使用 class，目前来讲它们没有任何区别），后跟类型参数；类型参数不能为空，多个类型参数用逗号隔开

  ```cpp
  template<typename 类型参数1 , typename 类型参数2 , …> class 类名{
      //TODO:
  };
  ```

- 根据“在定义变量时是否需要显式地指明数据类型”可以分为强类型语言和弱类型语言

  - 强类型语言在定义变量时需要显式地指明数据类型，并且一旦为变量指明了某种数据类型，该变量以后就不能赋予其他类型的数据了，除非经过强制类型转换或隐式类型转换（C/C++、Java、C#）
  - 弱类型语言在定义变量时不需要显式地指明数据类型，编译器（解释器）会根据赋给变量的数据自动推导出类型，并且可以赋给变量不同类型的数据（JavaScript、Python、PHP、Ruby、Shell、Perl）
  - 不管是强类型语言还是弱类型语言，在编译器（解释器）内部都有一个类型系统来维护变量的各种信息

### 异常处理

- 程序的错误大致可以分为三种，分别是语法错误、逻辑错误和运行时错误：
  1. 语法错误在编译和链接阶段就能发现，只有 100% 符合语法规则的代码才能生成可执行程序
  2. 编写的代码思路有问题，不能够达到最终的目标，这种错误可以通过调试来解决
  3. 运行时错误是指程序在运行期间发生的错误，例如除数为 0、内存分配失败、数组越界、文件不存在等

- C++ 异常（Exception）机制就是为解决运行时错误而引入的

- 抛出异常:报告一个运行时错误，程序员可以根据错误信息来进一步处理

- 捕获异常

  ```cpp
  try{
      // 可能抛出异常的语句
  }catch(exceptionType variable){
      // 处理异常的语句
  }
  ```

- 发生异常时必须将异常明确地抛出，try 才能检测到；如果不抛出来，即使有异常 try 也检测不到

- 可以将 catch 看做一个没有返回值的函数，当异常发生后 catch 会被调用，并且会接收实参（异常数据），但catch 和真正的函数调用相比，多了一个「在运行阶段将实参和形参匹配」的过程

- 多级 catch

  ```cpp
  try{
      //可能抛出异常的语句
  }catch (exception_type_1 e){
      //处理异常的语句
  }catch (exception_type_2 e){
      //处理异常的语句
  }
  //其他的catch
  catch (exception_type_n e){
      //处理异常的语句
  }
  ```

- throw 用作异常规范

  ```cpp
  double func (char param) throw (int, char, exception);
  ```

### 文件和流

- 打开文件

  ```cpp
  void open(const char *filename, ios::openmode mode);
  ```

- 关闭文件

  ```cpp
  void close();
  ```

- 读取 & 写入

  ```cpp
  #include <fstream>
  #include <iostream>
  using namespace std;
   
  int main ()
  {
     char data[100];
     // 以写模式打开文件
     ofstream outfile;
     outfile.open("afile.dat");
     cout << "Writing to the file" << endl;
     cout << "Enter your name: "; 
     cin.getline(data, 100);
     // 向文件写入用户输入的数据
     outfile << data << endl;
     cout << "Enter your age: "; 
     cin >> data;
     cin.ignore();
     // 再次向文件写入用户输入的数据
     outfile << data << endl;
     // 关闭打开的文件
     outfile.close();
     // 以读模式打开文件
     ifstream infile; 
     infile.open("afile.dat"); 
     cout << "Reading from the file" << endl; 
     infile >> data;  
     // 在屏幕上写入数据
     cout << data << endl;   
     // 再次从文件读取数据，并显示它
     infile >> data; 
     cout << data << endl; 
     // 关闭打开的文件
     infile.close();
     return 0;
  }
  ```

- istream 和 ostream 都提供了用于重新定位文件位置指针的成员函数。这些成员函数包括关于 istream 的 seekg（"seek get"）和关于 ostream 的 seekp（"seek put"）

  ```cpp
  // 定位到 fileObject 的第 n 个字节（假设是 ios::beg）
  fileObject.seekg( n );
  // 把文件的读指针从 fileObject 当前位置向后移 n 个字节
  fileObject.seekg( n, ios::cur );
  // 把文件的读指针从 fileObject 末尾往回移 n 个字节
  fileObject.seekg( n, ios::end );
  // 定位到 fileObject 的末尾
  fileObject.seekg( 0, ios::end );
  ```

  








### 重用类代码
- 用类定义对象
- 通过组合定义新的类（组合类）
- 多级访问
- 类的聚合（指针形式传递）
- 通过继承定义新的类（继承类）
- 基类，派生类（基类成员与新增成员）
- 同名覆盖
- 派生类对基类成员的二次封装
- `obj.Circle::input()`
- 保护权限与保护继承
- 继承与派生主要用于重用类代码和凝练类代码
- 多态性：相同程序元素不同的语法解释
- 运算符的多态与重载
- 对象的替换和多态
- Liskov 替换准则：将派生类对象当做基类对象使用
- 类族：基类和派生类
- 对象的多态性
- 虚函数（virtual关键字）
- 抽象类
- 多继承（从多个类中继承，JAVA和C#中没有）

### 流类库和文件读写
- 输入/输出流
- 流类库：以ios为基类的类族
- 数据缓冲区和流缓冲区
- 标准I/O（`<iostream>`，`cin`/`cout`）
- 文件I/O（`<fstream>`，`fin`/`fout`）
- string类和字符串I/O（`<string>`，`<sstream>`，`str`）
- 基于Unicode编码的流类库（以wios为基类）

### C++标准库
- 系统函数和系统类库
- 模板技术：函数模板和类模板
- 使用typedef类型定义显示地实例化类模板
- 标准模板库STL（Standard Template Library）
- 异常处理机制：throw语句 / try-catch机制 / `<exception>`
- 数据集合及处理算法（CRUD）
- 链表
- 迭代器（Iterator）
- 查找算法、增删改算法和排序相关算法
- 容器类：`<vector>`、`<list>`、`<set>`、`<map>`

### 第三方开发的函数/类库
- 微软基础类库 Microsoft Foundation Classes（MFC）
