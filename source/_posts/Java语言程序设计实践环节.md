---
title: Java 语言程序设计实践性环节
date: 2022-10-30
references: 
  - title: 《Java语言程序设计》实践性环节考核大纲
    url: https://ce.sjtu.edu.cn/Home/Tz/859
categories: 后端开发
tags: [Java, 实践环节]
---

> Java 语言程序设计实践环节（04748）是 Java 语言程序设计（一）专业课的上级测试部分，考核目标是掌握调试、完善和简单设计 Java 程序的能力、掌握 MyEclipse 开发工具的使用（新建项目，新建类，修改与运行程序）、掌握 Java 的基本语句，基本输入输出流、掌握使用类及方法进行 Java 面向对象程序开发的方法。运行环境是 Windows 10 系统下的 MyEclipse 软件。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

#### 一、输入、输出语句

使用 Scanner 语句输入时需要引入包 `import java.util.Scanner;` ，并定义 Scanner 对象：

```java
import java.util.Scanner;

public class Test1 {
  	public static void main(String[] args){
      	Scanner sc = new Scanner(System.in);
      	int n = sc.nextInt();
      	String temp = sc.next();
      	System.out.println("temp："+ n);
    }
}
```

`BufferedReader` 由 `Reader` 类扩展而来，提供通用的缓冲方式文本读取，而且提供了很实用的 `readLine`，读取一个文本行，从字符输入流中读取文本，缓冲各个字符，从而提供字符、数组和行的高效读取。使用 BufferedReader 流前需要引入 `import java.io.Reader;`：

```java
import java.io.*
  
public class Test2 {
  	public static void main(String[] args){
      	String st;
      	int num;
      	float fnum;
      	try{
          	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
          	// 读取一个文本行
          	st = br.readLine(); // 阻塞式，当没有数据读取时，就一直会阻塞，而不是返回null
            num = Integer.parseInt(br.readLine());  //需要整型数据 Integer 转换为基本数据类型 int
          	fnum = Float.parseFloat(br.readLine());  //Java 把从键盘输入的数据一律看作是字符串，因此若要从键盘输入并让系统认可是数值型数据，必须经过转换。
          	System.out.println(st + num + snum);
        }catch(IOException e){
          	System.out.println("错误");
        }
    }
}
```

### 二、实现常见的基本算法

字符统计程序。编写输入字符行，统计输入字符行中数字符、英文字母个数的 Java 应用程序：

```java
import java.util.Scanner;

public class Test3 {
    public static void main(String[] args) {
    int a = 0 ;
    int b = 0 ;
    int c = 0 ;
    int d = 0 ;
    Scanner sc = new Scanner(System.in) ;
    System.out.println("请输入一串字符串");
    String s = sc.nextLine() ;
    char[] sr = s.toCharArray() ;
    for(int i = 0 ;i<sr.length ; i ++ ) {
        if('A'<=sr[i] && 'Z'>=sr[i] || 'a'<=sr[i] && 'z'>=sr[i] ) {
          	a++ ;
        }else if('0'<=sr[i] && '9'>=sr[i]) {
          	b++ ;
        }else if(sr[i] == ' ') {
          	c++ ;
        }else {
          	d++ ;
        }
    }
    System.out.println("字母的个数为：" + a);
    System.out.println("数字的个数为：" + b);
    System.out.println("空格的个数为：" + c);
    System.out.println("其他字符的个数为：" + d);
    }
}
```

特殊性质数的判断。例如水仙花数、完数、素数的判断程序：

```java
// 水仙花数，即：三位数的每一位的立方和等于这个三位数本身
public class Daffodil {
    public static  void main(String[] args) {
        int sum=0, number;
        for(number=100;number<=999;number++) {
           int num1 = number%10;
           int num10 = number/10%10;
           int num100 = number/100%10;
           sum = num1*num1*num1 + num10*num10*num10 + num100*num100*num100;
            if(sum==number) {
                System.out.println(number+"是水仙花数");
            }
        }
    }
}

// 完数，即：所有因子和（除了他本身）== 他本身
public class WanNumber {
    public static void main(String[] args) {
        int i;
        for(int num=1;num<=1000;num++) {
           int sum = 0;
            for( i=1;i<num;i++) {
                if(num%i==0) {
                    sum+=i;
                }
            }
            if(num==sum) {
                System.out.println(num);
            }
        }
    }
}

//素数：只能被1和他本身整除的数
public class PrimeDemo {
    public static void main(String[] args){
        System.out.println("请输入一个数");
        Scanner sc = new Scanner(System.in);
        int paime = sc.nextInt();
        boolean t=true;
         int i;
         for (i=2;i<paime;i++)
         {
             if(paime%i==0)
             {
                 t=false;
             }
         }
         if(t)
         {
             System.out.println("是素数");
         }
         else
         {
           System.out.println("是素数");
         }
    }
}
```

类的继承定义。声明几何形状类，类中定义几何形状的成员变量和方法，然后继承声明几何形状类，创建对象，并显示对象的相关信息。

```java
import java.util.Scanner;
class GeometricObject {
    private String col;    //String类型的私有数据域color，用于保存几何对象的颜色，默认值为white。
    private boolean fil;   //boolean类型的私有数据域filled，用于表明几何对象是否填充颜色，默认值为false。

    public GeometricObject() {  //有参构造方法，将颜色、是否填充颜色设置为给定的参数。
      col = "white";
      fil = false;
    }

    public GeometricObject(String col, boolean fil) {
      this.col = col;
      this.fil = fil;
    }

    public String getCol() {    //访问器方法getColor、isFilled，分别用于访问颜色、是否填充颜色。
      return col;
    }

    public void setCol(String col) {   //更改器方法setColor、setFilled，分别用于更改颜色、是否填充颜色。
      this.col = col;
    }

    public boolean isFil() {
      return fil;
    }

    public void setFil(boolean fil) {
      this.fil = fil;
    }
}

class Triangle extends GeometricObject {   //定义一个名为Triangle的类来继承GeometricObject类。
    private double s1;
    private double s2;
    private double s3;

    public Triangle() {
      s1 = 1;
      s2 = 1;
      s3 = 1;
    }

    public Triangle(String col, boolean fil, double s1, double s2, double s3) {
      super(col, fil);
      this.s1 = s1;
      this.s2 = s2;
      this.s3 = s3;
    }

    public double gets() {
      double p = (s1 + s2 + s3) / 2.0;
      double s = p * (p - s1) * (p - s2) * (p - s3);
      s = Math.sqrt(s);
      return s;
    }

    public double getc() {
      return s1 + s2 + s3;
    }

    public void tos()
    {
      String s="Triangle:\n"+"side1 = "+s1+" side2 = "+s2+" side3 = "+s3+"\n"
        +"Color: "+getCol()+" and filled: "+isFil()+"\n"
        +"The area is "+gets()+"\n"+"The perimeter is "+getc()+"\n";
      System.out.println(s);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        double a=sc.nextDouble();
        double b=sc.nextDouble();
        double c=sc.nextDouble();
        String s=sc.next();
        boolean f=sc.nextBoolean();
        sc.close();
        Triangle t=new Triangle(s,f,a,b,c);
        t.tos();
    }
}
```

数组排序程序。编写输入整数序列、对输入的整数进行排序后输出的程序：

```java
// 冒泡排序算法
class Array4{
    public static void main(String[] args){
        int[] Arr = new int[]{14,52,56,32,17};
        printArray(Arr);
        bubbleSort(Arr);
        printArray(Arr);
    }

    public static void printArray(int[] arr){
        System.out.print("[");
        for(int x=0; x<arr.length; x++){
            if(x!=arr.length-1)
              	System.out.print(arr[x]+",");
            else
              	System.out.println(arr[x]+"]");
        }
    }

    public static void swap(int[] arr, int a, int b){
        int temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }

    //冒泡排序法
    public static void bubbleSort(int[] arr){
        for(int x=0; x<arr.length-1; x++){
            for(int y=0; y<arr.length-1-x;y++){
                if(arr[y]>arr[y+1])
                  	swap(arr,y+1,y);
            }
        }
    }
}
```

提取整数中每个数字的程序：

```java
public class Test{
  	public String print(int num){
      	while(num>0){
          	System.out.print(num%10+"，");
          	num/=10;
        }
    }
  	public static void main(String [] args){
      	Test t = new Test();
      	t.print(12345);
    }
}
```

### 三、基于 Swing 和 AWT 的界面程序设计

两个顶级容器的应用：Frame(窗口)、Dialog(弹窗)  ：

```java
import java.awt.Button;
import java.awt.Color;
import java.awt.Dialog;
import java.awt.Frame;
import java.awt.Label;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
 
public class Test{
    public static void main(String[] args) {
        Myframe frame = new Myframe();
        frame.init();
        frame.compen();
    }
}
//创建一个桌面窗口，并在窗口中添加一个按钮组件
class Myframe extends Frame{
    private static final long serialVersionUID = -3005332394925719672L;
    public Myframe() {
      	super("测试窗口");
    }
    //通过设置初始化函数来对此窗口进行初始化
    public void init() {
        super.setVisible(true);
        super.setBounds(200, 200, 200, 200);
        //为窗口添加事件，进行关闭操作
        this.addWindowListener(new WindowAdapter() {
        @Override
        public void windowClosing(WindowEvent e) {
            	System.exit(0);
          }
        });
    }
    //为此窗口添加一个组件---按钮组件
    public void compen() {
        Button button = new Button("按钮");
        button.setSize(100, 100);
        //设置组件的布局方式
        this.setLayout(null);;
        this.add(button);
        //为按钮主键添加侦听器---侦听器通过内部类实现---接口、继承
        button.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                //当侦听到事件后，响应此继承的方法，并执行方法中的语句
                //事件产生后，重新创建一个弹窗对象进行显示
                end();
            }
        });
    }
    public void end() {
      	new Mydialog(this,"测试弹窗").increase();
    }
}
 
//创建一个弹窗通过监听弹出
class Mydialog extends Dialog{
    private static final long serialVersionUID = 1L;
    /**
     * 添加构造函数，直接通过构造函数对弹窗进行初始化
     */
    public Mydialog(Frame owner,String title) {
        super(owner,title);
        setVisible(true);//方法继承自window类，往往用于顶级窗口，设置窗口是否可见
        setSize(100, 200);//继承自window类，用于设置组件的大小
        /*
         * 继承自window类，用于设置窗口的背景颜色，
         * 其需要传入color类对象可以使用color类中的类变量。
         */
        setBackground(Color.BLUE);
        setLocation(200, 300);//继承自window类，移动组件到指定位置，也就是将组件放到指定位置。以物理机左上角作为原点。
        /*setBounds(x, y, width, height);
         * 继承自window类，用于移动组件到指定位置，并设定组件的大小。
         */
        //为窗口添加事件，进行关闭操作,
        //这种内部类不去实现一个接口而是去继承一个类，而这个类实现类所有方法，但是方法体为空，便于以后
        //进行使用，这种模式方法叫做适配器模式，大大降低了无效代码的使用。
        this.addWindowListener(new WindowAdapter() {
            //当事件产生后，系统构造出内部类对象，通过此对象调用，复写的方法
            //其中复写中方法中的参数，通过系统产生传入，
            @Override
            public void windowClosing(WindowEvent e) {
              	System.exit(0);
            }
        });
    }
    //向此容器中添加组件---文本框
    public void increase() {
        Label label = new Label("这是一个文本框",1);
        this.add(label);
    }
}
```

### 四、JavaApplet 下的图形处理

```java
import java.awt.* ;
import java.applet.Applet ;
public class AppletImage extends Applet{
		private Image img[] ;
		private int index=0;
		public void init(){
				img=new Image[10];
				int num ;
				for(num=0;num<10;num++){
						img[num]=getImage(getDocumentBase(),"T"+(num+1)+".gif") ;
        }
    }
		public  void start(){
      
    }
		public void paint(Graphics g){
        g.drawImage(img[index],0,0,this) ;  //绘制图像
        index=++index%10 ;
        repaint() ;  //重画applet 界面
				try{
          	Thread.sleep(500) ;  //线程暂停
        }catch(Exception e){
          
        }
    }
}
```

### 五、Java 下的多线程程序设计

编写一个有两个线程的程序，第一个线程用来计算 1~100 之间的偶数及个数，第二个线程用来计算 1-100 之间的偶数及个数：

```java
package experiment4;
class NumberRunnable implements Runnable{
    private final int first;
    NumberRunnable(int first){
        this.first=first;
    }
    @Override
    public void run() {
        for (int i=first;i<=100;i+=2){
            System.out.println(i+ " ");
        }
        System.out.println("结束！");
    }
}
public class Exp4_1 {
    public static void main(String[] args){
        NumberRunnable runnable1 = new NumberRunnable(1);
        NumberRunnable runnable2 = new NumberRunnable(2);
        Thread thread_odd = new Thread(runnable1,"奇数线程");
        Thread thread_even = new Thread(runnable2,"偶数线程");
        thread_odd.start();
        thread_even.start();	
    }
}
```
