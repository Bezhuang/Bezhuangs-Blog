---
title: C# 101
date: 2023-04-09
references:
  - title: C# 101
    url: https://learn.microsoft.com/zh-cn/shows/csharp-101/?wt.mc_id=educationalcsharp-c9-scottha
categories: 编程语言
tags: [C#, 编程语言]
---

> C# 是一种强大而广泛使用的编程语言，基于面向对象的原则，融合了其他范例中的许多功能，尤其是函数编程，你可以用它来制作网站、游戏、移动应用程序、桌面应用程序等等。C# 也是 .NET 编程平台的一部分，大多数 .NET 运行时和库都是用 C# 编写的，微软提供了 C# for beginners 课程（101、201）为初学者提供引导，以下为我在学习第一门课程过程中所做的笔记，可供参考。

<!--more-->

### 一、Hello World

`Console.WriteLine` 是一个用于向文本控制台打印消息的方法：

```c#
Console.WriteLine("Hello World!");
```

变量是一个符号，你可以用不同的值来运行相同的代码。例如，你可以声明一个名为 `aFriend` 的新变量，你可以用 `Console.WriteLine` 来输出一个字符串。你可以通过使用 `string` 类型来声明这个变量，或者使用 `var` 关键字，它将自动为你计算出类型。

```c#
string aFriend = "Bill";
Console.WriteLine(aFriend);
```

### 二、字符串的基本知识

上一个代码块中缺少 "Hello "这个词，你可以通过使用 `+` 将多个字符串组合在一起，创建一个新的字符串，输出到控制台，来解决这个问题。

```c#
Console.WriteLine("Hello " + aFriend + "!");
```

字符串插值：将变量放在 `{` 和 `}` 之间，告诉 C# 用变量的值来替换该文本。然后，你可以在开头的引号前加上 `$`，使字符串插值成为可能。

```c#
Console.WriteLine($"Hello {aFriend}!");
```

`firstFriend` 和 `secondFriend` 是字符串的变量。`Console.WriteLine` 中的那一行也是一个字符串。它是一个字符串字面量。字符串字面量是代表一个恒定字符串的文本。

```c#
string firstFriend = "Maria";
string secondFriend = "Sophia";
Console.WriteLine($"My friends are {firstFriend} and {secondFriend}");
```

字符串不仅仅是一个字母的集合，你可以使用 "Length "找到字符串的长度。`Length` 是一个字符串的属性，它返回该字符串的字符数。

```c#
Console.WriteLine($"The name {firstFriend} has {firstFriend.Length} letters.");
Console.WriteLine($"The name {secondFriend} has {secondFriend.Length} letters.");
```

假设你的字符串中有你不想显示的前面或后面的空格。你想修剪字符串中的空格。 你可以直接使用 `Trim` 方法和相关的 `TrimStart `和 `TrimEnd` 方法来删除前导和尾部空格。

```c#
string greeting = "      Hello World!       ";
Console.WriteLine($"[{greeting}]");

string trimmedGreeting = greeting.TrimStart();
Console.WriteLine($"[{trimmedGreeting}]");

trimmedGreeting = greeting.TrimEnd();
Console.WriteLine($"[{trimmedGreeting}]");

trimmedGreeting = greeting.Trim();
Console.WriteLine($"[{trimmedGreeting}]");
```

你也可以使用 `Replace` 方法用其他值来替换子串。

```c#
string sayHello = "Hello World!";
Console.WriteLine(sayHello);
sayHello = sayHello.Replace("Hello", "Greetings");
Console.WriteLine(sayHello);
```

有时你需要你的字符串是全大写或全小写，`ToUpper` 和 `ToLower` 就是做这个的。

```c#
Console.WriteLine("WhiSPer".ToUpper());
Console.WriteLine("sHoUt".ToLower());
```

你的字符串中是否包含另一个字符串？你可以使用 `Contains` 来找出答案，`Contains` 方法返回一个 boolean，可以容纳两个值： `True` 或 `False`。

```c#
string songLyrics = "You say goodbye, and I say hello";
Console.WriteLine(songLyrics.Contains("goodbye"));
Console.WriteLine(songLyrics.Contains("greetings"));
```

`StartsWith` 和 `EndsWith` 是类似于 `Contains` 的方法，它们告诉你一个字符串是否以你要检查的字符串开始或结束。

```c#
Console.WriteLine(songLyrics.StartsWith("You"));
```

### 三、整型变量和浮点型变量

一个整型变量是一个正数或负数的整数。整型变量的操作遵循数学运算的顺序，你也可以通过在你想先做的事情周围加上括号来强制执行不同的顺序。 整型变量运算将总是产生整数，即使数学结果是小数或分数，答案也会被截断为整数。

```c#
int a = 18;
int b = 6;
int c = a + b;
int d = a - b;
int e = a * b;
int f = a / b;
int g = a + b * c;
int h = (a + b) - 6 * c + (12 * 4) / 3 + 12;
Console.WriteLine($"{c} {d} {e} {f} {g} {h}");
```

你可以用余数运算符 `%` 找到余数。

```c#
int a = 7;
int b = 4;
int c = 3;
int d = (a + b) / c;
int e = (a + b) % c;
Console.WriteLine($"quotient: {d}");
Console.WriteLine($"remainder: {e}");
```

由于整数在编码中的结构方式，其大小是有限制的。

```c#
int max = int.MaxValue;
int min = int.MinValue;
Console.WriteLine($"The range of integers is {min} to {max}");
// The range of integers is -2147483648 to 2147483647
```

双精度浮点型变量是数据的另一种表现形式。

```c#
double a = 19;
double b = 23;
double c = 8;
double d = (a + b) / c;
Console.WriteLine(d);
```

双精度浮点型变量的取值范围相当大，比整数大得多。
```c#
double max = double.MaxValue;
double min = double.MinValue;
Console.WriteLine($"The range of double is {min} to {max}");
// The range of double is -1.7976931348623157E+308 to 1.7976931348623157E+308
```

当然，双精度浮点型变量并不完美，它们也有四舍五入的误差。
```C#
double third = 1.0 / 3.0;
Console.WriteLine(third);
```

28 位浮点型（Decimal）与双精度浮点型类似，但它的精度要高得多，可用来满足进行精密数学运算的需求。

```c#
decimal min = decimal.MinValue;
decimal max = decimal.MaxValue;
Console.WriteLine($"The range of the decimal type is {min} to {max}");
// The range of the decimal type is -79228162514264337593543950335 to 79228162514264337593543950335
```

数字的后缀 M 是表示常量应该使用 `decimal` 类型，数字的后缀 F 是表示常量应该使用 `float` 类型的方法。否则，编译器会默认假定为 `Double` 类型。

```c#
double a = 1.0;
double b = 3.0;
Console.WriteLine(a / b);

decimal c = 1.0M;
decimal d = 3.0M;
Console.WriteLine(c / d);

float radiuss = 2.5F;
float areas = (float)Math.PI * radiuss * radiuss;
Console.WriteLine(areas);
```

同理，整型变量也有不同精度。

```c#
long min1 = long.MinValue;
long max1 = long.MaxValue;
Console.WriteLine($"The range of the long type is {min1} to {max1}");

short min3 = short.MinValue;
short max4 = short.MaxValue;
Console.WriteLine($"The range of the short type is {min3} to {max4}");
```

### 四、分支和循环

条件是在 `if` 后面的括号中的语句。条件是一个布尔值，这意味着它必须返回一个真或假。这意味着使用符号，如 `>`、`<`、`<=`、`>=` 或 `==`。

```c#
bool outcome = 3 > 5;
Console.WriteLine("This condition is " + outcome);

int a = 5;
int b = 3;
if (a + b > 10)
	Console.WriteLine("The answer is greater than 10");
else
	Console.WriteLine("The answer is not greater than 10");
```

如果你想在你的 `if` 语句中使用更复杂的代码，只要在你想做的事情周围加上大括号。

```c#
int c = 4;
if ((a + b + c > 10) && (a == b))
{
    Console.WriteLine("The answer is greater than 10");
    Console.WriteLine("And the first number is equal to the second");
}
else
{
    Console.WriteLine("The answer is not greater than 10");
    Console.WriteLine("Or the first number is not equal to the second");
}
```

使用循环以重复执行语句。 `while` 语句会检查条件，并执行 `while` 后面的语句或语句块。 除非条件为 `false`，否则它会重复检查条件并执行这些语句。

```c#
int counter = 0;
while (counter < 10)
{
	Console.WriteLine($"Hello World! The counter is {counter}");
	counter++;
}
```

`while` 循环先测试条件，然后再执行 `while` 后面的代码。 `do` ... `while` 循环先执行代码，然后再检查条件。

```c#
int counter = 0;
do
{
	Console.WriteLine($"Hello World! The counter is {counter}");
	counter++;
} while (counter < 10);
```

`for` 语句包含三个控制具体工作方式的部分。第一部分是 for 初始值设定项，中间部分是 for 条件，最后一部分是 for 迭代器。

```c#
for (int counter = 0; counter < 10; counter++)
{
	Console.WriteLine($"Hello World! The counter is {counter}");
}
```

### 五、数组、列表和集合

基本列表示例，`System.collection.Generic`  是一个有列表的命名空间。如果你不告诉代码你正在使用它，那么每次你想使用一个列表时，你都必须写`Systems.Collections.Generic.List`。

```C#
using System;
using System.Collections.Generic;

var names = new List<string> { "<name>", "Ana", "Felipe" };
foreach (var name in names)
{
    Console.WriteLine($"Hello {name.ToUpper()}!");
}
```

创建的集合使用 `List<T>` 类型，此类型存储一系列元素，可以 `Add()` 添加或 `Remove()` 删除元素。

```c#
Console.WriteLine();
names.Add("Maria");
names.Add("Bill");
names.Remove("Ana");
foreach (var name in names)
{
    Console.WriteLine($"Hello {name.ToUpper()}!");
}

Console.WriteLine($"My name is {names[0]}");
Console.WriteLine($"I've added {names[2]} and {names[3]} to the list");

Console.WriteLine($"The list has {names.Count} people in it");
```

若要在更大的集合中查找元素，需要在列表中搜索不同的项。 `IndexOf` 方法可搜索项，并返回此项的索引。 如果项不在列表中，`IndexOf `将返回 -1。

```c#
using System;
using System.Collections.Generic;
var names = new List<string> { "Sophia", "Ana", "Jayme", "Bill" };
string name = "Ana";
var index = names.IndexOf(name);
Console.WriteLine($"Found {name} at {index}");
```

`Sort()` 接收一个列表并对其进行组织。它查看变量类型，并以最合理的方式进行组织，如果是字符串，它按字母顺序排序，如果是数字，它从最小到最大进行组织。注意，你不需要写 `sortedList = names.Sort()`，你只需要写 `names.Sort()`。`Sort()` 改变了列表本身，你不需要把这个动作保存到一个新的对象中。

```c#
var names = new List<string> { "Sophia", "Ana", "Jayme", "Bill" };
Console.WriteLine("Pre Sorting:");
foreach(var name in names )
{
    Console.WriteLine(name);
}

names.Sort();

Console.WriteLine();
Console.WriteLine("Post Sorting:");
foreach(var name in names )
{
    Console.WriteLine(name);
}
```

### 六、对象和类

面向对象编程：对象是在编程中模仿现实世界的一种方式。 如果你采用人的概念，他们可以有姓名、地址、身高，所有这些属性都会因人而异。 面向对象的编码封装了那种类型的信息，这样你就可以很容易地让一个人拥有所有这些细节。

例如我们可以创建具有以下属性的银行帐户对象 `BankAccount`：

- 它有一个唯一标识银行帐户的 10 位数字。
- 它有一个字符串，用于存储所有者的姓名。
- 可以检索余额。
- 它接受存款。
- 它接受提款。
- 初始余额必须为正。
- 提款不会导致负余额。

还可以对这些目标进行分类：

- 属性：有关对象的详细信息（它有多少钱，帐户名称）。
- 动作：对象可以做的事情（接受存款和取款）。
- 规则：对象的准则，这样它就不会尝试做不可能的事情（确保帐户永远不会为负）。

属性是每个对象所拥有的值的一个很好的小列表。

`get` 和 `set`：有时你只想让用户看到一个变量而不是改变它。 其他时候，您希望用户能够更改变量。 `get` 让你看到变量，`set` 让你改变它。

```csharp
public class BankAccount
{
    // Properties 
	public string Number { get; }
    public string Owner { get; set; }
    public decimal Balance { get; }
}
```
构造函数：此方法用于创建对象的特定实例。 创建一个 `BankAccount` 类，就像您现在所做的那样，就像为所有银行账户创建一个模板。 它不是一个单独的个人帐户。 构造函数将创建一个包含所有人员实际详细信息的单一帐户。 您向构造函数提供特定帐户所需的所有详细信息，并将详细信息分配给新对象的属性。

`this` 是一种样式选择。 它明确指出变量“所有者”是该特定实例的变量。 将来，您将有一个对象的两个实例进行交互，而 `this` 将变得更加明确有用。 如果你愿意，你也可以写 `Owner` 而不是 `this.Owner`！

```csharp
public class BankAccount
{
    // Properties
    public string Number { get; }
    public string Owner { get; set; }
    public decimal Balance { get; }

    // Constructor
    public BankAccount(string name, decimal initialBalance)
    {
        this.Owner = name;
        this.Balance = initialBalance;
    }
    // Functions
}
```
创建实例：

```csharp
var account = new BankAccount("Kendra", 1000);
Console.WriteLine($"Account{account.Number} was created for {account.Owner} with {account.Balance} dollars");
// Account was created for Kendra with 1000 dollars
```
函数用于对对象执行操作或更改对象变量。 这两个函数将进行存款（加钱）和提款（取出钱）。

```csharp
public class BankAccount
{
    // Variables 
    public string Number { get; }
    public string Owner { get; set; }
    public decimal Balance { get; }

    // Constructor 
    public BankAccount(string name, decimal initialBalance)
    {
        this.Owner = name;
        this.Balance = initialBalance;
    }

    // Functions 
    public void MakeDeposit(decimal amount, DateTime date, string note)
    {
    }

    public void MakeWithdrawal(decimal amount, DateTime date, string note)
    {
    }
}

var account = new BankAccount("Kendra", 1000);
Console.WriteLine($"Account{account.Number} was created for {account.Owner} with {account.Balance} dollars");
// Account was created for Kendra with 1000 dollars
```
### 七、方法和成员变量

到目前为止，这是您的银行帐户！ 它现在做的不多，只打印出所有者和余额。 它甚至还没有帐号。 您将处理一个交易类，该类已为您添加为一个空类。

帐号：您需要一个起始编号，您可以以此作为新帐号的基础，以确保所有帐户都是唯一的。

- `Private`：这意味着没有客户端可以看到这个号码。 它是内部的，是代码内部工作的一部分。
- `Static`：这意味着该号码在所有个人帐户中是通用的。 如果一个帐户更改了它，那么所有其他帐户都会更新该编号。 这就是您如何使它成为确保帐号都是唯一的好方法！ 一旦银行账户使用它作为银行号码，它就可以向账户种子添加一个，下一个新银行账户就有一个新号码。

```csharp
public class BankAccount
{
    // Properties
    public string Number { get; }
    public string Owner { get; set; }
    public decimal Balance { get; }
    private static int accountNumberSeed = 1234567890;

    // Constructor
    public BankAccount(string name, decimal initialBalance)
    {
        this.Owner = name;
        this.Balance = initialBalance;
        this.Number = accountNumberSeed.ToString();
        accountNumberSeed++;

    }

    // Functions
    public void MakeDeposit(decimal amount, DateTime date, string note)
    {
    }

    public void MakeWithdrawal(decimal amount, DateTime date, string note)
    {
    }
}
```

```csharp
var account = new BankAccount("Kendra", 1000);
Console.WriteLine($"Account {account.Number} was created for {account.Owner} with {account.Balance} dollars");
// Account 1234567890 was created for Kendra with 1000 dollars
```
交易属性和构造去：您需要的下一部分是余额！ 您可以执行此操作的一种方法是保留一个正在运行的标签。 但是，另一种方法是创建交易历史记录。 为此，您将制作一个小交易类，用于记录一次交易。

```csharp
public class Transaction
{
    // Properties
    public decimal Amount { get; }
    public DateTime Date { get; }
    public string Notes { get; }

    // Constructor 
    public Transaction(decimal amount, DateTime date, string note)
    {
        this.Amount = amount;
        this.Date = date;
        this.Notes = note;
    }
}
```
更新 `BankAccount` 以匹配：现在您有了交易类，您可以在我们的银行账户中使用它。 首先，您需要列出交易清单。

```csharp
using System.Collections.Generic;

public class BankAccount
{
    // Properties
    public string Number { get; }
    public string Owner { get; set; }
    public decimal Balance{ get;}
    private static int accountNumberSeed = 1234567890;
    private List<Transaction> allTransactions = new List<Transaction>();

    // Constructor
    public BankAccount(string name, decimal initialBalance)
    {
        this.Owner = name;
        this.Balance = initialBalance;
        this.Number = accountNumberSeed.ToString();
        accountNumberSeed++;

    }

    // Functions
    public void MakeDeposit(decimal amount, DateTime date, string note)
    {
    }

    public void MakeWithdrawal(decimal amount, DateTime date, string note)
    {
    }
}
```
更新余额：既然您已经有了可以使用的交易列表，您需要将 `Balance` 附加到它上面。 你想要做的是，每当有人想要获得余额时，代码会检查交易列表并将其全部汇总，然后返回答案。 您可以通过将一些说明附加到 Balance 中的 `get` 来做到这一点！

```csharp
public class BankAccount
{
    // Properties
    public string Number { get; }
    public string Owner { get; set; }
    public decimal Balance
    {
        get
        {
            decimal balance = 0;
            foreach (var item in allTransactions)
            {
                balance += item.Amount;
            }

            return balance;
        }
    }
    private static int accountNumberSeed = 1234567890;
    private List<Transaction> allTransactions = new List<Transaction>();


    // Constructor
    public BankAccount(string name, decimal initialBalance)
    {
        this.Owner = name;
        this.Number = accountNumberSeed.ToString();
        accountNumberSeed++;
    }

    // Functions
    public void MakeDeposit(decimal amount, DateTime date, string note)
    {
    }

    public void MakeWithdrawal(decimal amount, DateTime date, string note)
    {
    }
}
```
这是我们下面这个模块的最终代码。 不过有问题！ 您不再有初始余额并且有 0 钱！ 由于您将余额与交易挂钩，因此您需要能够进行存款和取款才能将钱存入银行。 您将在下一个模块中了解到这一点！

```csharp
public class Transaction
{
    // Properties (#2)
    public decimal Amount { get; }
    public DateTime Date { get; }
    public string Notes
    {
        get;

    }

    // Constructor (#3)
    public Transaction(decimal amount, DateTime date, string note)
    {
        this.Amount = amount;
        this.Date = date;
        this.Notes = note;
    }
}

using System.Collections.Generic;

public class BankAccount
{
    // Properties
    public string Number { get; }
    public string Owner { get; set; }
    public decimal Balance  //(#5)
    {
        get

        {
            decimal balance = 0;
            foreach (var item in allTransactions)
            {
                balance += item.Amount;
            }

            return balance;
        }


    }
    private static int accountNumberSeed = 1234567890; //(#1)
    private List<Transaction> allTransactions = new List<Transaction>(); //(#4)


    // Constructor
    public BankAccount(string name, decimal initialBalance)
    {
        this.Owner = name;
        //(#6: deleted "this.Balance = initialBalance;")
        this.Number = accountNumberSeed.ToString(); //(#1)
        accountNumberSeed++; //(#1)

    }

    // Functions
    public void MakeDeposit(decimal amount, DateTime date, string note)
    {
    }

    public void MakeWithdrawal(decimal amount, DateTime date, string note)
    {
    }
}

var account = new BankAccount("Kendra", 1000);
Console.WriteLine($"Account {account.Number} was created for {account.Owner} with {account.Balance} dollars");
// Account 1234567890 was created for Kendra with 0 dollars
```
### 八、方法和异常

以上是您到目前为止所做的代码。 通过汇总交易列表获得余额，但您还没有编写添加交易的方法。 这种情况在编码中发生了很多次，要使某些东西更健壮，您必须先退后一步，然后再继续。

增加充值：首先，是时候做充值功能了。 此添加将使交易列出金额、日期和您存入的注释，然后将其添加到交易列表中。

例外情况：但是如果有人试图存入负值怎么办？ 这在逻辑上没有意义，但目前该方法允许这样做。 你能做的就是破例。 在做任何事情之前，您检查存入的金额是否大于 0。如果是，代码将继续添加交易。 如果不是，代码会抛出一个异常，它会停止代码并打印出问题。

然后您需要为提款做同样的事情！

```csharp
using System.Collections.Generic;

public class BankAccount
{
    // Properties
    public string Number { get; }
    public string Owner { get; set; }
    public decimal Balance
    {
        get

        {
            decimal balance = 0;
            foreach (var item in allTransactions)
            {
                balance += item.Amount;
            }

            return balance;
        }


    }
    private static int accountNumberSeed = 1234567890;
    private List<Transaction> allTransactions = new List<Transaction>();

    // Constructor
    public BankAccount(string name, decimal initialBalance)
    {
        this.Owner = name;
        this.Number = accountNumberSeed.ToString();
        accountNumberSeed++;
    }

    // Functions
    public void MakeDeposit(decimal amount, DateTime date, string note)
    {
        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount of deposit must be positive");
        }
        var deposit = new Transaction(amount, date, note);
        allTransactions.Add(deposit);
    }

    public void MakeWithdrawal(decimal amount, DateTime date, string note)
    {
        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount of withdrawal must be positive");
        }
        if (Balance - amount < 0)
        {
            throw new InvalidOperationException("Not sufficient funds for this withdrawal");
        }
        var withdrawal = new Transaction(-amount, date, note);
        allTransactions.Add(withdrawal);
        }
}
```
创建初始存款：现在您已经有了存款和取款，您终于可以再次进行初始存款了。 您要做的是在您首次建立银行账户时创建一笔初始金额的存款。

```csharp
public class Transaction
{
    // Properties
    public decimal Amount { get; }
    public DateTime Date { get; }
    public string Notes { get; }

    // Constructor
    public Transaction(decimal amount, DateTime date, string note)
    {
        this.Amount = amount;
        this.Date = date;
        this.Notes = note;
    }
}

using System.Collections.Generic;

public class BankAccount
{
    // Properties
    public string Number { get; }
    public string Owner { get; set; }
    public decimal Balance
    {
        get

        {
            decimal balance = 0;
            foreach (var item in allTransactions)
            {
                balance += item.Amount;
            }

            return balance;
        }


    }
    private static int accountNumberSeed = 1234567890;
    private List<Transaction> allTransactions = new List<Transaction>();

    // Constructor
    public BankAccount(string name, decimal initialBalance)
    {

        this.Owner = name;
        this.Number = accountNumberSeed.ToString();
        accountNumberSeed++;
        MakeDeposit(initialBalance, DateTime.Now, "Initial balance"); //(#4)

    }

    // Functions
    public void MakeDeposit(decimal amount, DateTime date, string note)
    {
        //(#2)
        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount of deposit must be positive");
        }
        //(#1)
        var deposit = new Transaction(amount, date, note);
        allTransactions.Add(deposit);
    }

    public void MakeWithdrawal(decimal amount, DateTime date, string note)
    {
        //(#3)
        if (amount <= 0)
        {
            throw new ArgumentOutOfRangeException(nameof(amount), "Amount of withdrawal must be positive");
        }
        if (Balance - amount < 0)
        {
            throw new InvalidOperationException("Not sufficient funds for this withdrawal");
        }
        var withdrawal = new Transaction(-amount, date, note);
        allTransactions.Add(withdrawal);
    }
}

var account = new BankAccount("Kendra", 1000);
Console.WriteLine($"Account {account.Number} was created for {account.Owner} with {account.Balance} dollars");

account.MakeWithdrawal(500, DateTime.Now, "Rent payment");  //Added test code
Console.WriteLine(account.Balance);
account.MakeDeposit(100, DateTime.Now, "Friend paid me back");
Console.WriteLine(account.Balance);

/* 
Account 1234567890 was created for Kendra with 1000 dollars
500
600
*/
```
### 九、继续学习

还有更多资源可供学习继续学习：

-   [C# Documentation](https://docs.microsoft.com/dotnet/csharp/?WT.mc_id=csharpnotebook-35129-website)
-   [Microsoft Learn](https://docs.microsoft.com/learn/dotnet/?WT.mc_id=csharpnotebook-35129-website)
-   [Documentation: Object Oriented Coding in C#](https://docs.microsoft.com/dotnet/csharp/fundamentals/tutorials/classes?WT.mc_id=Educationalcsharp-c9-scottha)
-   [Other 101 Videos](https://dotnet.microsoft.com/learn/videos?WT.mc_id=csharpnotebook-35129-website)
