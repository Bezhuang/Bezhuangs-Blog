---
title: Learn NumPy & Pandas
date: 2022-12-06
tags: []
categories: Data Science and Analytics
references:
  - title: One Month Python
    url: https://onemonth.com/courses/python/
  - title:  梗直哥随笔
    url: https://gengzhige-essay.readthedocs.io
  - title: 十分钟了解Pandas核心内容
    url: https://www.bilibili.com/video/BV1rt4y1W769
---

> NumPy 是 Numerical Python 的缩写，是一个开源的 Python 科学计算库，也是 SciPy、Scikit-Learn、tenorflow、paddlepaddle 等各种数据科学类库的基础库。使用 NumPy 可以方便的使用数组、矩阵进行计算。Pandas 是基于 NumPy 数组构建的，但二者最大的不同是 Pandas 是专门为处理表格和混杂数据设计的，适用于统计分析中的表结构，而 NumPy 更适合处理统一的数值数组数据。虽然在之前已经在 [Python for Data Science](/Python-for-Data-Science) 一课中学习并整理英文笔记，但我认为还是有必要对于数据处理中的基础内容、工作流程和注意事项进行详细补充。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、NumPy 与 原生 Python 的性能对比

对于同样的数值计算任务，使用 NumPy 比起直接编写 Python 代码有以下优点：

-   代码更简洁： NumPy 直接以数组、矩阵为粒度计算并且支持大量的数学函数，而 Python 需要用 for 循环从底层实现；
-   性能更高效： NumPy 的数组存储效率和输入输出计算性能，比 Python 使用 `list` 好很多，而且 NumPy 的大部分代码都是 C 语言实现的，这是 NumPy 比 Python 高效的原因。

使用原生 Python 语法实现两个数组相加：
```python
def python_sum(n):
    a = [i**2 for i in range(n)]
    b = [i**3 for i in range(n)]
    c = [a[i]+b[i] for i in range(n)]
    return c
python_sum(10)
```

使用 NumPy 实现上面功能：

```python
def numpy_sum(n):
    a = np.arange(n) ** 2
    b = np.arange(n) ** 3
    c = a+b
    return c
numpy_sum(10)
```

使用 `%timeit` 魔法函数检测执行 1000 次所需时间：

```python
%timeit python_sum(1000)
%timeit numpy_sum(1000) 
#使用 NumPy 进行计算要比原生 Python 快得多，而且数据量越大，效果越明显
```

### 二、`ndarray` 对象

`ndarray` 对象是  NumPy 的核心数据结构，叫做  `array`（数组），`array` 对象可以是一维数组，也可以是多维数组。Python 的 `list` 也可以实现相同的功能，但是 `array` 的优势在于性能好，包含数组元数据信息、大量的便捷函数。NumPy 的 `array` 和 Python 的 `list` 的一个区别是它的元素必须都是同一种数据类型，这也是 NumPy 高性能的一个原因。

`ndarray` 属性：

-   `shape`：返回一个元组，表示 `array` 的形状；
-   `ndim`：返回一个数字，表示 `array` 的维度的数目；
-   `size`：返回一个数字，表示 `array` 中所有数据元素的数目；
-   `dtype`：`array` 中元素的数据类型；
-   `itemsize`：表示数组中每个元素的字节大小。

#### 创建 `array` 对象的方法

1.   使用 `np.array()` 创建 `array`：

```python
import numpy as np

# 创建一个一维数组
x = np.array([1, 2, 3 ,4, 5])

# 创建一个二维数组
y = np.array(
    [
        [1, 2, 3, 4],
        [5, 6, 7 ,8]
    ]
)

# 数组的形状  
x.shape  #(5,)
y.shape  #(2, 4)

# 数组的维度
x.ndim  #1
y.ndim  #2

# 数组所含元素的数目
x.size  #5
y.size  #8

# 数组中元素的数据类型
x.dtype  #dtype(’int32’)
y.dtype  #dtype(’int32’)

# 数组中每个元素的字节大小
y.itemsize  #4
```

2.   使用 `np.arange(start,stop,step,dtype) `生成等差数组：
     -   `start` 表示开始的数（包含） ，默认从 0 开始；
     -   `stop` 表示结束的数（不包含）；
     -   `step` 指定步长，默认为 1；
     -   `dtype` 指定数据类型。

```python
# 创建一个从0到9的数组，不包含10，步长默认为1
np.arange(10)  #array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

# [0,10) 区间，左闭右开，指定步长为 2
np.arange(0, 10, 2)  #array([0, 2, 4, 6, 8])
```

`reshape` 可以改变数组的形状：

```python
# 将一维数组 改成 2行5列的 2维数组
np.arange(10).reshape(2,5)  #array([[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]])
```

3.   使用 `np.linspace(start,stop,num,endpoint)` 创建等差数组（指定数量）：
     -   `start` 表示起始值，
     -   `stop` 表示结束值，
     -   `num` 表示要生成的等间隔样例数量，默认为 50，
     -   `endpoint` 序列中是否包含 `stop `值， 默认为 `true`。

```python
np.linspace(0,10)  #array([ 0. , 0.20408163, 0.40816327, 0.6122449 , 0.81632653, 1.02040816, 1.2244898 , 1.42857143, 1.63265306, 1.83673469, 2.04081633, 2.24489796, 2.44897959, 2.65306122, 2.85714286, 3.06122449, 3.26530612, 3.46938776, 3.67346939, 3.87755102, 4.08163265, 4.28571429, 4.48979592, 4.69387755, 4.89795918, 5.10204082, 5.30612245, 5.51020408, 5.71428571, 5.91836735, 6.12244898, 6.32653061, 6.53061224, 6.73469388, 6.93877551, 7.14285714, 7.34693878, 7.55102041, 7.75510204, 7.95918367, 8.16326531, 8.36734694, 8.57142857, 8.7755102 , 8.97959184, 9.18367347, 9.3877551 , 9.59183673, 9.79591837, 10. ])

np.linspace(0, 10, 5)  #array([ 0. , 2.5, 5. , 7.5, 10. ])
```

4.   使用 `ones`、`ones_like`、`zeros`、`zeros_like`、`empty`、`empty_like`、`full`、`full_like`、`eye` 等函数创建：

```python
# 使用ones创建全是1的数组
np.ones(10)  #array([1., 1., 1., 1., 1., 1., 1., 1., 1., 1.])
np.ones((2, 4))  #array([[1., 1., 1., 1.], [1., 1., 1., 1.]])

# 使用ones_like创建形状相同的全是1的数组
np.ones_like(x)  #array([1, 1, 1, 1, 1])
np.ones_like(y)  #array([[1, 1, 1, 1], [1, 1, 1, 1]])

# 使用zeros创建全是0的数组
np.zeros(10)  #array([0., 0., 0., 0., 0., 0., 0., 0., 0., 0.])
np.zeros((2,4))  #array([[0., 0., 0., 0.], [0., 0., 0., 0.]])

# 使用zeros_like创建形状相同的全0数组
np.zeros_like(x)  #array([0, 0, 0, 0, 0])
np.zeros_like(y)  #array([[0, 0, 0, 0], [0, 0, 0, 0]])

# 使用empty创建未初始化的数组
# 注意：数据是未初始化的，里面的值可能是随机值不要用
np.empty(10)  #array([0., 0., 0., 0., 0., 0., 0., 0., 0., 0.])
np.empty((2, 3))  #array([[0., 0., 0.], [0., 0., 0.]])

# 使用empty_like创建形状相同的空数组
np.empty_like(x)  #array([1767994469, 170816364, 538976266, 1701139232, 1936474400])
np.empty_like(y)  #array([[ 24385651, 8127092, 60818051, 27328636], [ 6226044, 6946940, 19464275, -637261490]])

# 使用full创建全是指定值的数组
np.full(10, 666)  #array([666, 666, 666, 666, 666, 666, 666, 666, 666, 666])
np.full((2, 4), 666)  #array([[666, 666, 666, 666], [666, 666, 666, 666]])

# 使用full_like创建形状相同的全是指定值的数组
np.full_like(x, 666)  #array([666, 666, 666, 666, 666])
np.full_like(y, 666)  #array([[666, 666, 666, 666], [666, 666, 666, 666]])

# 使用 eye 函数创建对角线的地方为1，其余的地方为0的单位矩阵
np.eye(5)  #array([[1., 0., 0., 0., 0.], [0., 1., 0., 0., 0.], [0., 0., 1., 0., 0.], [0., 0., 0., 1., 0.], [0., 0., 0., 0., 1.]])
```

5.   `np.random` 模块创建

```python
# 设置随机种子  作用是：使得每次随机的结果固定
np.random.seed(666)

# 返回数据在[0,1)之间  包含0 不包含1
np.random.rand(5)  #array([0.70043712, 0.84418664, 0.67651434, 0.72785806, 0.95145796])

# 随机生成 2行5列的2维数组  数据在[0,1)之间
np.random.rand(2,5)  #array([[0.0127032 , 0.4135877 , 0.04881279, 0.09992856, 0.50806631], [0.20024754, 0.74415417, 0.192892 , 0.70084475, 0.29322811]])

# 生成随机整数  区间范围：[2,5) 左闭右开  包含2不包含5
np.random.randint(2,5)  #4

# 指定shape
np.random.randint(2,5,5)  #array([2, 2, 2, 2, 2])

#uniform() 在 [low,high) 之间 生成均匀分布的数字
np.random.uniform(2,5,10)  #array([4.30223703, 4.85969412, 2.87292148, 4.54334592, 3.04928571, 4.77169077, 2.88468359, 3.57314184, 4.82761689, 2.22421847])

# 指定shape，前面的2，5表示取值的区间范围 [2,5)
# 后面的(2,5) 是指定的shape
np.random.uniform(2,5,(2,5))  #array([[2.82938752, 3.40275649, 2.94744596, 3.17048776, 2.80498943], [4.26099152, 4.0002124 , 4.61863861, 3.56329157, 4.25061275]])

# randn  返回数据具有标准正态分布 
# 即：均值为0 方差为1
np.random.randn(5)  #array([-1.21715355, -0.99494737, -1.56448586, -1.62879004, 1.23174866])
np.random.randn(2,5)  #array([[-0.91360034, -0.27084407, 1.42024914, -0.98226439, 0.80976498], [ 1.85205227, 1.67819021, -0.98076924, 0.47031082, 0.18226991]])

# normal()  可以指定均值和标准差
np.random.normal(1,10,5)  #array([-7.43882492, 3.0996833 , 3.29586662, 3.63076422, 22.66332222])
np.random.normal(1,10,(2,5))  #array([[ -9.48875925, -17.47684423, 6.34015028, -10.95748024, -1.89157372], [ -1.43327034, -6.42666527, 13.07905106, 11.27877114, 1.57388197]])

# choice 从给定的数组里 生成随机结果
np.random.choice(5, 3)  #array([0, 1, 2])

# 等同于 np.random.choice(0, 5, 3)  在[0,5)的区间范围内 生成3个数据
np.random.choice(5, (2, 3))  #array([[0, 1, 0], [0, 1, 2]])
np.random.choice([1,3,5,2,3], 3)  #array([3, 3, 5])

# shuffle 把一个数组进行随机排列
a = np.arange(10)
np.random.shuffle(a) 
a  #array([6, 3, 5, 1, 0, 8, 4, 9, 2, 7])

a = np.arange(20).reshape(4, 5)
a  #array([[ 0, 1, 2, 3, 4], [ 5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19]])

# 如果数组是多维的  则只会在第一维度打散数据
np.random.shuffle(a)
a  #array([[10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [ 5, 6, 7, 8, 9], [ 0, 1, 2, 3, 4]])

# permutation 把一个数组进行随机排列  或者数字的全排列
np.random.permutation(10)  #array([4, 9, 8, 7, 3, 5, 6, 1, 0, 2])

arr = np.arange(9).reshape((3,3))
arr  #array([[0, 1, 2], [3, 4, 5], [6, 7, 8]])

# permutation 与 shuffle 函数功能相同  区别在于：
# 注意 permutation不会更改原来的arr 会返回一个新的copy
np.random.permutation(arr)  #array([[3, 4, 5], [6, 7, 8], [0, 1, 2]])
arr  #array([[0, 1, 2], [3, 4, 5], [6, 7, 8]])
```

#### NumPy 的数组索引

1.   基础索引：

```python
# 一维向量
x = np.arange(10)
x  #array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

# 二维向量 一般用大写字母
Y = np.arange(20).reshape(4, 5)
Y  #array([[ 0, 1, 2, 3, 4], [ 5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19]])

# 取索引从2到 倒数第一个（不包含倒数第一个）
x[2:-1]  #array([2, 3, 4, 5, 6, 7, 8])

# 取第1行第1列的数 
# 注意：索引是从0开始的，我们日常所说的第1行，它的索引值是0
Y[0, 0]  #0

# 取索引为第2行的数据
Y[2]  #array([10, 11, 12, 13, 14])

# 取索引为第2列的数据
Y[:,2]  #array([ 2, 7, 12, 17])

#注意：切片的修改会修改原来的数组
#原因：numpy经常要处理大数组，避免每次都复制

# 修改x的第0-2（不包含2）数据
x[:2] = 666
x  #array([666, 666, 2, 3, 4, 5, 6, 7, 8, 9])
```

2.   神奇索引（即用整数数组进行的索引）：

```python
x = np.arange(10)
x  #array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
x[[2,3,4]]  #array([2, 3, 4])
indexs = np.array([[0,2],[1,3]])
x[indexs]  #array([[0, 2], [1, 3]])
```

获取数组中最大的前 n 个数字：

```python
# 随机生成1-100之间的10个数字
arr = np.random.randint(1, 100, 10)
arr  #array([37, 30, 76, 20, 63, 80, 42, 83, 91, 67])

# arr.argsort() 会返回排序后的索引index
# 取最大值对应的3个下标
arr.argsort()[-3:]  #array([5, 7, 8], dtype=int64)
arr[arr.argsort()[-3:]]  #array([80, 83, 91])
```

对于二维数组：

```python
Y = np.arange(20).reshape(4, 5)
Y  #array([[ 0, 1, 2, 3, 4], [ 5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19]])
# 筛选多行，列可以省略
Y[[0,2]]  #array([[ 0, 1, 2, 3, 4], [10, 11, 12, 13, 14]])
Y[[0,2],:]  #array([[ 0, 1, 2, 3, 4], [10, 11, 12, 13, 14]])

# 筛选多列 行不能省略
Y[:,[0, 2]]  #array([[ 0, 2], [ 5, 7], [10, 12], [15, 17]])

# 同时指定行列
Y[[0,2,3],[1,2,3]]  #array([ 1, 12, 18])
```

3.   布尔索引：

```python
x = np.arange(10)
x  #array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

# 返回bool值的数组
x>5  #array([False, False, False, False, False, False, True, True, True, True])

#返回通过条件判断的数组
x[x>5]  #array([6, 7, 8, 9])

# 通过条件进行赋值
x[x<=5] = 0
x[x>5] = 1
x  #array([0, 0, 0, 0, 0, 0, 1, 1, 1, 1])

x = np.arange(10)
x[x<5] += 20
x  #array([20, 21, 22, 23, 24, 5, 6, 7, 8, 9])
```

对于二维数组：

```python
Y = np.arange(20).reshape(4, 5)
Y  #array([[ 0, 1, 2, 3, 4], [ 5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19]])

Y > 5  #array([[False, False, False, False, False], [False, True, True, True, True], [ True, True, True, True, True], [ True, True, True, True, True]])

# Y>5 的boolean数组 既有行又有列 因此返回的是 行列一维数组
Y[Y>5]  #array([ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])

Y[:, 3]  #array([ 3, 8, 13, 18])

Y[:, 3]>5  #array([False, True, True, True])

# 把第3列大于5的行数据筛选出来
Y[:, 3][Y[:, 3]>5]  #array([ 8, 13, 18])
```

条件的组合：

```python
x = np.arange(10)
x  #array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

condition = (x%2==0)| (x>7)
condition  #array([ True, False, True, False, True, False, True, False, True, True])

x[condition]  #array([0, 2, 4, 6, 8, 9])
```

### 三、NumPy 的操作与函数

#### 数组的计算

```python
A  = np.arange(6).reshape(2, 3)
A  #array([[0, 1, 2], [3, 4, 5]])

# 相当于 A中的每个数据都+1
A+1  #array([[1, 2, 3], [4, 5, 6]])

# 相当于 A中的每个数据都*3
A*3  #array([[ 0, 3, 6], [ 9, 12, 15]])

#三角函数
np.sin(A)  #array([[ 0. , 0.84147098, 0.90929743], [ 0.14112001, -0.7568025 , -0.95892427]])

#指数函数
np.exp(A)  #array([[ 1. , 2.71828183, 7.3890561 ], [ 20.08553692, 54.59815003, 148.4131591 ]])

#矩阵运算
B  = np.arange(6,12).reshape(2, 3)
B  #array([[ 6, 7, 8], [ 9, 10, 11]])

# 对应位置元素相加
A + B  #array([[ 6, 8, 10], [12, 14, 16]])

# 对应位置元素相减
A - B   #array([[-6, -6, -6], [-6, -6, -6]])

# 对应位置元素相乘
A*B  #array([[ 0, 7, 16], [27, 40, 55]])
```

#### NumPy 的数学统计函数

```python
arr = np.arange(12).reshape(3,4)
arr  #array([[ 0, 1, 2, 3], [ 4, 5, 6, 7], [ 8, 9, 10, 11]])

# 求和
np.sum(arr)  #66

# 乘积
np.prod(arr)  #0

# 累加
np.cumsum(arr)  #array([ 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66], dtype=int32)

# 累乘
np.cumprod(arr)  #array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], dtype=int32)

# 最小值
np.min(arr)  #0

# 最大值
np.max(arr)  #11

# 求取数列第?分位的数值
np.percentile(arr,[25,50,75])  #array([2.75, 5.5 , 8.25])

# 功能同上面  只不过范围为0-1直接
np.quantile(arr,[0.25,0.5,0.75])  #array([2.75, 5.5 , 8.25])

#中位数
np.median(arr)  #5.5

# 平均值
np.mean(arr)  #5.5

# 标准差
np.std(arr)  #3.452052529534663

# 方差
np.var(arr)  #11.916666666666666

# 加权平均
# weights 的 shape 需要和 arr 一样
weights = np.random.rand(*arr.shape)
np.average(arr, weights=weights)  #5.355698948848374
```

#### NumPy 的 `axis `参数

`axis=0` 代表行，`axis=1` 代表列，对于 `sum/mean/media` 等聚合函数：

-   `axis=0` 代表把行消解掉，`axis=1` 代表把列消解掉；
-   `axis=0 `代表跨行计算，`axis=1` 代表跨列计算。

```python
arr = np.arange(12).reshape(3,4)
arr  #array([[ 0, 1, 2, 3], [ 4, 5, 6, 7], [ 8, 9, 10, 11]])

#当axis=0的时候，我们可以将数据和轴组成的整体看作是一串竖着摆放的糖葫芦
#此时[ 0, 1, 2, 3]、[ 4, 5, 6, 7]、[ 8, 9, 10, 11]可以分别看作是糖葫芦的三个果子，互相做运算
arr.sum(axis=0)  #array([12, 15, 18, 21])

arr.sum(axis=1)  #array([ 6, 22, 38])

arr.cumsum(axis=0)  #array([[ 0, 1, 2, 3], [ 4, 6, 8, 10], [12, 15, 18, 21]], dtype=int32)

arr.cumsum(axis=1)  #array([[ 0, 1, 3, 6], [ 4, 9, 15, 22], [ 8, 17, 27, 38]], dtype=int32)

mean = np.mean(arr, axis=0)
mean  #array([4., 5., 6., 7.])

std = np.std(arr,axis=0)
std  #array([3.26598632, 3.26598632, 3.26598632, 3.26598632])

result = arr-mean
result  #array([[-4., -4., -4., -4.], [ 0., 0., 0., 0.], [ 4., 4., 4., 4.]])
```

#### 给数组添加维度

建立一个一维数组：

```python
arr = np.arange(5)
arr  #array([0, 1, 2, 3, 4])
arr.shape  #(5,)
```

1.   `np.newaxis` 关键字：

```python
#np.newaxis 就是None的别名
np.newaxis is None  #True
np.newaxis == None  #True

# 给一维向量添加一个行维度
arr[np.newaxis, :]  #array([[0, 1, 2, 3, 4]])
arr[np.newaxis, :].shape  #(1, 5)

# 给一维向量添加一个列维度
arr[:, np.newaxis]  #array([[0], [1], [2], [3], [4]])
arr[:,np.newaxis].shape  #(5, 1)
```

2.   `np.expand_dims` 方法

```python
# 给一维向量添加一个行维度
np.expand_dims(arr, axis=0)  #array([[0, 1, 2, 3, 4]])
np.expand_dims(arr,axis=0).shape  #(1, 5)

# 给一维向量添加一个列维度
np.expand_dims(arr,axis=1)  #array([[0], [1], [2], [3], [4]])
np.expand_dims(arr,axis=1).shape  #(5, 1)
```

3.   `np.reshape` 方法：

```python
np.reshape(arr, (1,5))  #array([[0, 1, 2, 3, 4]])

# -1表示 自动计算出结果  
np.reshape(arr,(1,-1))  #array([[0, 1, 2, 3, 4]])

np.reshape(arr,(1,-1)).shape  #(1, 5)

np.reshape(arr,(-1,1))  #array([[0], [1], [2], [3], [4]])

np.reshape(arr,(-1,1)).shape  #(5, 1)
```

#### 数组合并、插入操作

合并行：

```python
a = np.arange(6).reshape(2,3)
b = np.arange(6,18).reshape(4,3)
a  #array([[0, 1, 2], [3, 4, 5]])
b  #array([[ 6, 7, 8], [ 9, 10, 11], [12, 13, 14], [15, 16, 17]])

#首尾合并
np.concatenate([a,b])  #array([[ 0, 1, 2], [ 3, 4, 5], [ 6, 7, 8], [ 9, 10, 11], [12, 13, 14], [15, 16, 17]])
np.vstack([a,b])  #array([[ 0, 1, 2], [ 3, 4, 5], [ 6, 7, 8], [ 9, 10, 11], [12, 13, 14], [15, 16, 17]])
np.row_stack([a,b])  #array([[ 0, 1, 2], [ 3, 4, 5], [ 6, 7, 8], [ 9, 10, 11], [12, 13, 14], [15, 16, 17]])
```

合并列：

```python
a = np.arange(12).reshape(3,4)
a  #array([[ 0, 1, 2, 3], [ 4, 5, 6, 7], [ 8, 9, 10, 11]])
b = np.arange(12,18).reshape(3,2)
b  #array([[12, 13], [14, 15], [16, 17]])

np.concatenate([a,b],axis=1)  #array([[ 0, 1, 2, 3, 12, 13], [ 4, 5, 6, 7, 14, 15], [ 8, 9, 10, 11, 16, 17]])
np.hstack([a,b])  #array([[ 0, 1, 2, 3, 12, 13], [ 4, 5, 6, 7, 14, 15], [ 8, 9, 10, 11, 16, 17]])
np.column_stack([a,b])  #array([[ 0, 1, 2, 3, 12, 13], [ 4, 5, 6, 7, 14, 15], [ 8, 9, 10, 11, 16, 17]])
```

插入数组到指定位置（`np.insert(arr, obj, values, axis)` ）： 

-   `arr` 是原始数组，可一可多，`obj` 是插入元素位置，`values` 是是插入内容，`axis` 是按行按列插入。

```python
#插入的数组是一维的
a = np.array([1, 4, 6, 5, 6, 8])
np.insert(a, 0, 9)  #array([9, 1, 4, 6, 5, 6, 8])
#插入元素都是在所给位置之前

#多维：如果axis没有给出，相当于是做降维操作，与一维数组一致
a = np.array([[1,2],[3,4],[5,6]])
np.insert(a,1,11,axis = 1)  #array([[ 1, 11,  2], [ 3, 11,  4], [ 5, 11,  6]])

a = np.array([[1,2],[3,4],[5,6]])
np.insert(a,1,[2,6],axis = 0)  #array([[1, 2], [2, 6], [3, 4], [5, 6]])
```

#### 数组的拷贝、去重操作

数组的拷贝：

```python
#首先创建一个从 0 到 50，并且平分元素为 10 个的数组
x = np.linspace(0, 50, 10)  
x  #array([ 0.        ,  5.55555556, 11.11111111, 16.66666667, 22.22222222,27.77777778, 33.33333333, 38.88888889, 44.44444444, 50.        ])

#使用view方法拷贝
y = x.view()  
y  #array([ 0.        ,  5.55555556, 11.11111111, 16.66666667, 22.22222222, 27.77777778, 33.33333333, 38.88888889, 44.44444444, 50.        ])
#view方法如果对拷贝后的元素进行修改，会影响到原来的数组

#使用copy方法拷贝
z = x.copy() 
z  #array([ 0.        ,  5.55555556, 11.11111111, 16.66666667, 22.22222222, 27.77777778, 33.33333333, 38.88888889, 44.44444444, 50.        ])
```

去除重复的字符串：

```python
arr = np.array(['鸡蛋', '鸭蛋', '龟蛋', '鸵鸟蛋', '鸭蛋', '龟蛋', '鸵鸟蛋'])
arr2 = np.unique(arr)
print( arr2 )  #['鸡蛋' '鸭蛋' '鸵鸟蛋' '龟蛋']
```

删除数组指定位置的元素：

```python
arr = np.array(['鸡蛋', '鸭蛋', '鸵鸟蛋', '龟蛋'])
np.delete(arr, 3)  #array(['鸡蛋', '鸭蛋', '鸵鸟蛋'], dtype='<U3')
```

### 四、Pandas 的基础操作

#### 选择表格（DataFrame）中的行或者列

从 Python 字典生成 `DataFrame` 表格：

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

#创建表格
workout_dict = {
  "calories": [420, 380, 390, 390],
  "duration": [50, 40, 45, 45],
  "type": ['run', 'walk', 'walk', 'run']
}
workout = pd.DataFrame(workout_dict)
display(workout)
```

查看列名/索引（column index）和行索引：

```python
workout.columns  #Index(['calories', 'duration', 'type'], dtype='object')
workout.index  #RangeIndex(start=0, stop=4, step=1)

#转换成其他数据类型
workout.columns.tolist()  #['calories', 'duration', 'type']
workout.index.to_numpy()  #array([0, 1, 2, 3])
```

当然我们也可以单独指定/改变索引：

```python
#直接重新赋值行索引
workout.index=["day1", "day2", "day3", "day4"]

#直接重新赋值列列名/索引
workout.columns=["Calories", "Duration", "Type"]

# 单独改变某一列列名/索引
workout = workout.rename(columns={"Calories": "Cal"})

#转换回dict字典
workout_dict = workout.to_dict()

#在构建pandas时单独指定索引
workout = pd.DataFrame(workout_dict, index=['day1', 'day2', 'day3', 'day4'])

#使用reset_index()重新建立索引，把成为索引的列恢复成正常列
survive_by_class = survive_by_class.reset_index()

# set_index与reset_index互为逆运算
survive_by_class.set_index(['Pclass', 'Survived'])
```

访问表格中的列与行：

```python
#选择一列
workout['Calories']

#选择一列（保留列表形式）
workout[['Calories']]

#loc: 根据索引选取数据
workout.loc['day1', :]

#保留DataFrame格式
workout.loc[['day1'], :]

#iloc: 根据位置选取数据，从0开始编号（类比: 访问list中的数据）
workout.iloc[0, :]
workout.iloc[[0], :]

# 访问表格左上角前两行前两列的数据
workout.iloc[0:2, 0:2]
# workout.iloc[[0,1], [0,1]]

#.at[]: 访问单独数据
workout.at['day1', 'calories']  #420

#改变单个数据的值
workout.at['day1', 'calories'] = 800
```

#### 数据的输出/输入

读取外部文件：

```python
#例如若txt文件是用Tab分隔的，指定分隔符为"\t"
pd.read_csv('imdb_top_10000.txt', sep="\t")
```

导出到文件

```python
data.to_csv('test.csv', header=True, index=True, sep=',')
```

使用 `names` 设置列标题行，使用`index_col=0`，直接将第一列作为索引，不额外添加列。

```python
names = ['id','title','year','rating','votes','length','genres']
data = pd.read_csv('imdb_top_10000.txt', sep="\t", names=names, index_col=0)
```

使用 Pandas 方法查看表格信息：

```python
# 打印表格的行数
len(data)

# 打印表格的形状(行数与列数)
data.shape

#默认返回前5行，也可以在在方法中指定行数
data.head()
data.head(3)

#默认返回倒数5行，也可以在方法中指定行数
data.tail()
data.tail(3)

#随机返回5行数据
data.sample(5)

#返回统计性信息（索引、每一列的信息、表格占用电脑内存的大小）等。
data.info()

#返回表格中所有数字类型列的分布信息（平均值、标准偏差）等。
data.describe()

#返回每一列的数据类型信息
data.dtypes
```

表格列搜索排序：

```python
#按rating从高到低排序
data.sort_values(by='rating', ascending=False)

#打印所有的不重复的元素
data['year'].unique()

# # 使用for loop 查看每一列的独特值
# for col in titanic.columns:
#     print('列名：', col, titanic[col].unique())

#分组title、year两列
data[['title', 'year']]

#返回特定数值
data['rating'].mean()
data['rating'].max()
data['rating'].min()
data['rating'].value_counts()
data['rating'].value_counts().sort_index()
data['rating'].value_counts().sort_index(ascending=False)
```

删除一些列

```python
# 删除一列
del titanic['SibSp']

# 删除多个列
titanic = titanic.drop(columns=['Parch', 'Ticket', 'Fare'])
# titanic.drop(columns=['Parch', 'Ticket', 'Fare'], inplace=True)
```

高级选择：

```python
#看看特定年份之后的所有数据
data[data['year'] > 1995]

#查找特定年份的电影
data[data['year'] == 1966]

#查找一个范围
data[(data['year'] > 1995) & (data['year'] < 2000)]

#查找1996年至1999年收视率最高的电影
data[(data['year'] > 1995) & (data['year'] < 2000)].sort_values(by='rating', ascending=False).head(10) 
```

根据列的值分类，对每个类型集计信息（groupby）：

```python
# 打印表格中的男女数量分布
titanic[['Sex', 'PassengerId']].groupby(['Sex']).count()

# 针对多列进行信息集计
# 每个船舱等级乘客生存和死亡的概率
survive_by_class = titanic[['Pclass', 'Survived', 'PassengerId']].groupby(['Pclass', 'Survived']).count()

survive_by_class = survive_by_class.reset_index()
survive_by_class = survive_by_class.rename(columns={"PassengerId": "count"})

#每年电影的平均评分
data.groupby(data['year'])['rating'].mean()
```

根据列的值，动态选择记录（filter）：

```python
#isnull 返回是否缺失的值，缺失返回True
#～表示按位取反
filt = (~titanic['Age'].isnull())  # & | ~
titanic = titanic.loc[filt, :]
titanic.head()

# 年龄中位数
titanic[['Pclass', 'Survived', 'Age']].groupby(['Pclass', 'Survived']).median()
```

![](https://hexo.bezhuang.cn/img/pandas.png)

使用 `agg` 可以完成很多统计量的计算：

```python
def percentile_25(x):
    return x.quantile(0.25)

def percentile_75(x):
    return x.quantile(0.75)

age_agg = titanic[['Pclass', 'Survived', 'Age']].groupby(['Pclass', 'Survived']).agg(
    ['min', 'max', 'median', 'mean', len, np.std, percentile_25, percentile_75])

age_agg
```

### 五、可视化表格

一旦我们评估了数据，可以以更直观的形式绘制数据可能会有用。我们使用 Matplotlib 库来做到这一点。Matplotlib是一个 Python 2D 绘图库，以各种格式生成数字。使用 Matplotlib 可以轻松生成绘图、直方图、框图、功率谱、条形图、饼图、误差图、散点图等。

```python
%matplotlib inline

#默认Plot
data.plot()

#设置图片参数
plt.figure(figsize=(10,5),dpi=600,facecolor='white',edgecolor='white')

#做一个散点图：
data.plot(kind='scatter', x='rating', y='votes', alpha='0.3')

#做一个矩形图
data['rating'].plot(kind='hist')
```

查看 DataFrame.plot [文档](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.plot.html)，您会发现创建所有不同的变体的方法。

另一个绘图库是 Seaborn。Seaborn 是一个基于 matplotlib 的 Python 数据可视化库。它提供了一个高级界面，用于绘制有吸引力且信息丰富的统计图形。

```python
import seaborn as sns

plt.figure(facecolor='white')

sns.lmplot(x='rating', y='votes', data=data)
#这是一个与使用Matplotlib非常相似的绘图，但有一个自动线性回归来解释数据

#Seaborn能做的另一件很酷的事情是pairplot，它会自动绘制所有数字列相互比较的图像
sns.pairplot(data)
```

现在我们已经可视化了数据，我们挖掘出了一个普通的最小二乘（或OLS）回归。如果对计算统计数据感兴趣，有一个名为 [StatsModels](http://www.statsmodels.org/stable/index.html) 的库可以帮助您做到这一点。StatsModels为估计许多不同的统计模型以及进行统计测试和统计数据探索提供了类和功能。

```python
# 研究一个普通的最小二乘（或OLS）回归
import statsmodels.api as sm
results = sm.OLS(data["votes"], data["rating"]).fit()
results.summary()
```

### 六、数据清洗

数据清理是数据分析的重要组成部分。为了进行适当的分析，您必须确保您的数据干净且没有错误。

例如，如果想去除电影标题后的年份，可以字符串切片：

```python
#The Dark Knight(2008)
data['formatted title'] = data['title'].str[:-7]  #The Dark Knight

#另一种方法，寻找括号并拆分它们（将一些东西分成一个列表）
data['title'].str.split('\(').str[0] 
#或
data['title'].str.split('\(').str.get(0)
```

又如，如果想去除时长后的字符串：

```python
#142 mins.
data['length'].str(-6)  #142
data['length'].str.split().str.get(0)  #142

#问题是Jupyter仍然认为这是一根字符串，但我们可以快速将其转换为整数
data['length'].str.split().str.get(0).astype('int') 

#或
data['length'].str.replace(' min ', ' ' ).astype('int)
```

当我们将其转换为格式化的长度列时，就像我们创建格式化的标题列一样，我们就可以在与所有其他数字列的配对绘图中正确地看到它。
