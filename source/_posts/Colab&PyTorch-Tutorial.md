---
title: Colab Tutorial and PyTorch Tutorial
date: 2023-05-01
tags: [2023-ML]
categories: Artificial Intelligence
references: 
  - title: 李宏毅 2023 春机器学习课程
    url: https://speech.ee.ntu.edu.tw/~hylee/ml/2023-spring.php

---

> 吴恩达说：AI 是最新的电力，大约在一百年前，我们社会的电气化改变了每个主要行业，从交通运输行业到制造业、医疗保健、通讯等方面，如今我们见到了 AI 明显的令人惊讶的能量，带来了同样巨大的转变。而在 AI 的各个分支中，发展的最为迅速的就是深度学习。去年初时，我尝试学习过[动手学深度学习](/动手学深度学习/)课程，但是没坚持下来。这次选择李宏毅 2023 年春季最新的机器学习课程，这门课专注于深度学习领域，和最新技术的应用。以下为我在学习第二讲：Colab Tutorial and PyTorch Tutorial 时所做的笔记，可供参考。

<!--more-->

### 一、Colab Tutorial 

#### 什么是 Colab？

Colab，即“Colaboratory”，允许您在浏览器中编写和执行 Python，零配置，免费使用 GPU，轻松分享。无论您是学生、数据科学家还是 AI 研究人员，Colab 都可以让您的工作更轻松。 您可以在代码块中键入 Python 代码，或使用前导感叹号 `!` 将代码块更改为 bash 环境以执行 Linux 代码（`!ls`）。

使用感叹号 `!` 启动一个新的 shell，执行操作，然后终止该 shell，而百分比 `%` 影响与笔记本相关的进程，它被称为魔术命令。对于 `cd`（更改目录）命令，使用 `%cd` 而不是 `!` ，其他魔术命令列在[这里](https://ipython.readthedocs.io/en/stable/interactive/magics.html)。

要使用 Google 提供的免费 GPU，请单击 "Runtime" -> "Change Runtime Type"。“Hardward Accelerator” 下有三个选项，选择“GPU”。

导入 PyTorch 并检查分配的 GPU，如果拿到 K80 可能会跑非常久：

```python
import torch
torch.cuda.is_available() # is GPU available
# Outputs True if running with GPU
```

```python
# check allocated GPU type
!nvidia-smi
```

#### Colab 文件操作

通过 Google Drive 下载文件：存储在 Google Drive 中的一个文件有以下分享链接，可以使用 `--fuzzy` 命令通过知道链接的 Colab 下载文件。

```python
# Download the file with the following link, and rename it to pikachu.png
!gdown --fuzzy https://drive.google.com/file/d/14FK5G6DOh7EdLyoj4D5teRSzriTOUPD7/view?usp=sharing --output pikachu.png
```

```python
# List all the files under the working directory
!ls
```

挂载 Google Drive：如果你不想每次开始新的会话都下载数据，或者你希望一些文件永久保存，你可以将自己的 Google Drive 挂载到Colab，直接下载/保存数据到你的 Google Drive。

```python
from google.colab import drive
drive.mount('/content/drive')
# your google drive will be mounted at /content/drive
```

挂载驱动器后，Google Drive 的内容将被挂载到名为 MyDrive 的目录中。

```python
%cd /content/drive/MyDrive 
#change directory to google drive
!mkdir ML2023 #make a directory named ML2023
%cd ./ML2023
#change directory to ML2023
```

```python
!pwd #output the current directory
```

#### 可能遇到的问题

由于 Colab 会侦测使用者是否在电脑前面使用，因此一定时间没有动作会自动断线。开启 F12 控制台，贴上 Javascript：

```js
function ClickConnect() {
    console.log("Working...");  // debug 用
    // 去選擇按鈕
    var connectbutton = document.querySelector(
        "colab-toolbar-button" +
        "#connect-icon.big-icon.icon-okay");
    // 點個兩下
    connectbutton.click(); connectbutton.click();
};

// 設定固定每 10 分鐘點一下
const stopit = setInterval(
    ClickConnect, 10 * 60 * 1000);

// 這行沒有沒關係，只是避免停不下來
const stopping = stopper => clearInterval(stopper);
```

有用的 Linux 命令（在 Colab 中）：

-   `ls` : 列出当前目录下的所有文件，
-   `ls -l `: 列出当前目录下所有文件的详细信息，
-   `pwd `: 输出工作目录，
-   `mkdir <dirname>` : 创建一个目录 `<dirname>`，
-   `cd <dirname> `: 移动到目录 `<dirname>`，
-   `gdown `：从谷歌驱动器下载文件，
-   `wget` : 从网上下载文件，
-   `python <python_file>`：执行一个 Python 文件。

### 二、PyTorch Tutorial

#### 视频讲解

-   https://www.youtube.com/watch?v=6dEp6oRN2NE
-   https://speech.ee.ntu.edu.tw/~hylee/ml/ml2023-course-data/Pytorch_Tutorial_1_rev_1.pdf

#### 什么是 PyTorch？

PyTorch 是 Python 中的机器学习框架。两个主要特点：N-dimensional Tensor computation (like NumPy) on GPUs & Automatic differentiation for training deep neural networks（自动计算微分）。

训练神经网络需要：定义神经网络（Define Neural Network）、损失函数（Loss Function）、优化算法（Optimization Algorithm）。

在 Pytorch 中训练和测试神经网络需要：加载数据（Load Data）、训练（Training）、验证（Validation）、测试（Testing）。

#### Dataset & Dataloader

Dataset：存储数据样本和期望值。

Dataloader：批量分组数据，启用多处理。

```python
from torch.utils.data import Dataset, DataLoader

# Read data & preprocess
class MyDataset(Dataset):
	def init (self, file): 
		self.data = ...

# Returns one sample at a time
def __getitem__(self, index): 
	return self.data[index]

# Returns the size of the dataset
def __len__(self):
	return len(self.data)

dataset = MyDataset(file)
dataloader = DataLoader(dataset, batch_size=5, shuffle=False) # Training: True Testing: False
```

#### Tensors 

高维矩阵（数组）：`dim in PyTorch == axis in NumPy`。

Creating Tensors：

```python
# Directly from data (list or numpy.ndarray)
x = torch.tensor([[1, -1], [-1, 1]])
x = torch.from_numpy(np.array([[1, -1], [-1, 1]]))

# Tensor of constant zeros & ones
x = torch.zeros([2, 2])
x = torch.ones([1, 2, 5])
```

Tensors – [Common Operations](https://pytorch.org/docs/stable/tensors.html)：

```python
# Common arithmetic functions are supported, such as
z = x + y
z = x - y
y = x.sum()  # Summation
y = x.mean() # Mean
y = x.pow(2) # Power

# Transpose: transpose two specified dimensions
x = torch.zeros([2, 3])
x.shape  # torch.Size([2, 3])
x = x.transpose(0, 1)
x.shape  # torch.Size([3, 2])

# Squeeze: remove the specified dimension with length = 1
x = torch.zeros([1, 2, 3])
x.shape  # torch.Size([1, 2, 3])
x = x.squeeze(0) # (dim = 0)
x.shape  # torch.Size([2, 3])

# Unsqueeze: expand a new dimension
x = torch.zeros([2, 3])
x.shape  # torch.Size([2, 3])
x = x.unsqueeze(1)  # (dim = 1)
x.shape  # torch.Size([2, 1, 3])

# Cat: concatenate multiple tensors
x = torch.zeros([2, 1, 3])
y = torch.zeros([2, 3, 3])
z = torch.zeros([2, 2, 3])
w = torch.cat([x, y, z], dim=1)
w.shape  # torch.Size([2, 6, 3])
```

Tensors – [Data Type](https://pytorch.org/docs/stable/tensors.html)：对模型和数据使用不同的数据类型会导致错误。

Tensors - Devices：Tensors & modules 默认使用 CPU 计算。

```python
# Use .to() to move tensors to appropriate devices.
x = x.to(‘cpu’)
x = x.to(‘cuda’)

# Check if your computer has NVIDIA GPU
torch.cuda.is_available()
```

####  Gradient Calculation

![](https://hexo.bezhuang.cn/img/Pytorch01.png)

#### Training & Testing Neural Networks

torch.nn – Network Layers：

```python
# Linear Layer (Fully-connected Layer)
layer = torch.nn.Linear(32, 64)
layer.weight.shape  # torch.Size([64, 32])
layer.bias.shape  # torch.Size([64])
```

#### Build your own neural network

```python
import torch.nn as nn
class MyModel(nn.Module): 
    # Initialize your model & define layers
    def init(self):
        super(MyModel, self).init () 
            self.net = nn.Sequential(
                nn.Linear(10, 32), 
                nn.Sigmoid(), 
                nn.Linear(32, 1)
        )
    
    # Compute output of your NN
    def forward(self, x): 
    	return self.net(x)
```

####  Loss Functions

```python
# Mean Squared Error (for regression tasks)
criterion = nn.MSELoss()
# Cross Entropy (for classification tasks)
criterion = nn.CrossEntropyLoss()
loss = criterion(model_output, expected_value)
```

#### torch.optim

基于梯度的优化算法，调整网络参数以减少错误。

```python
optimizer = torch.optim.SGD(model.parameters(), lr, momentum = 0)
```

对于每批数据：

1.   调用 `optimizer.zero_grad()` 重置模型参数的梯度。
2.   调用 `loss.backward()` 反向传播预测损失的梯度。
3.   调用 `optimizer.step()` 调整模型参数。

#### Neural Network Training Setup

```python
dataset = MyDataset(file)  # read data via MyDataset
tr_set = DataLoader(dataset, 16, shuffle=True)  # put dataset into Dataloader
model = MyModel().to(device)  # construct model and move to device (cpu/cuda) 
criterion = nn.MSELoss()  # set loss function
optimizer = torch.optim.SGD(model.parameters(), 0.1)  # set optimizer
```

#### Neural Network Training Loop

```python
for epoch in range(n_epochs):    # iterate n_epochs
    model.train()  # set model to train mode 
    for x, y in tr_set:  # iterate through the dataloader
        optimizer.zero_grad()  # set gradient to zero
        x, y = x.to(device), y.to(device)   # move data to device (cpu/cuda) 
        pred = model(x)    # forward pass (compute output)
        loss = criterion(pred, y)   # compute loss
        loss.backward()   # compute gradient (backpropagation)
        optimizer.step()  # update model with optimizer
```

#### Neural Network Validation Loop

```python
model.eval()  # set model to evaluation mode
total_loss = 0
for x, y in dv_set:  # iterate through the dataloader
    x, y = x.to(device), y.to(device)  # move data to device (cpu/cuda)
    with torch.no_grad():  # disable gradient calculation
        pred = model(x)    # forward pass (compute output)
        loss = criterion(pred, y)  # compute loss
    total_loss += loss.cpu().item() * len(x)   # accumulate loss
    avg_loss = total_loss / len(dv_set.dataset)  # compute averaged loss
```

#### Neural Network Testing Loop

```python
model.eval()  # set model to evaluation mode
preds = []
for x in tt_set:  # iterate through the dataloader 
    x = x.to(device)  # move data to device (cpu/cuda) 
    with torch.no_grad():  # disable gradient calculation 
        pred = model(x)   # forward pass (compute output) 
        preds.append(pred.cpu())  # collect prediction
```

注意：

-   模型 `model.eval()`：更改某些模型层的行为，例如 dropout 和 batch 正常化。
-   使用 `torch.no_grad()`：防止将计算添加到梯度计算图中。通常用于防止对验证/测试数据进行意外训练。

#### Save/Load Trained Models

```python
# Save
torch.save(model.state_dict(), path)

# Load
ckpt = torch.load(path) 
model.load_state_dict(ckpt)
```

#### More About PyTorch

-   torchaudio：speech/audio processing 
-   torchtext ：natural language processing 
-   torchvision ：computer vision 
-   skorch ：scikit-learn + pyTorch

-   Useful github repositories using PyTorch：

    -   Huggingface Transformers (transformer models: BERT, GPT, ...) 

    -   Fairseq (sequence modeling for NLP & speech) 

    -   ESPnet (speech recognition, translation, synthesis, ...) 

    -   Most implementations of recent deep learning papers

### 三、PyTorch 文档和常见错误

#### PyTorch Documentation

https://pytorch.org/docs/stable/ 

-   `torch.nn` -> Neural Network 
-   `torch.optim` -> Optimization Algorithms 
-   `torch.utils.data` -> Dataset, Dataloader
