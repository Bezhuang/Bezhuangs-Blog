---
title: 基于 Python 和 OpenCV 实现人脸识别
date: 2021-08-03
references:
  - title: 怎样使用 OpenCV 进行人脸识别
    url: https://www.cnblogs.com/guoming0000/archive/2012/09/27/2706019.html
categories: 人工智能
tags: [OpenCV, 计算机视觉, Python]
---

> Open Source Computer Vision Library（OpenCV）是一个跨平台的计算机视觉库，可用于开发实时的图像处理、计算机视觉以及模式识别程序。OpenCV 用 C++ 语言编写，但本次实战项目使用的是 `python-opencv` 库实现的，主要是为了初步了解人脸识别的步骤和算法后面的原理。源代码保存在 [Github 仓库 ](https://github.com/Bezhuang/Learn-CS/tree/main/%E7%BB%83%E6%89%8B%E9%A1%B9%E7%9B%AE/Python-OpenCV)中。以下为我在实战练习过程中所做的笔记，可供参考。

<!--more-->

### 项目背景

#### 人脸识别介绍

对人类来说，人脸识别很容易：我们的大脑有专门的神经细胞针对不同的场景或运动特征作出反应，视觉皮层再以某种方式把不同的信息来源转化成可用的模型。

自动人脸识别就是研究如何从一幅图像中提取有意义的特征，形成可用的模型，然后对他们进行一些分类，因此基于几何特征的人脸的人脸识别可能是最直观的识别人脸的方法。但即使是使用最先进的算法，标记点的确定也是很复杂的，单靠几何特征不能提供足够的信息用于人脸识别。

特征脸方法：把面部图像看作是一个点，从高维图像空间找到它在低维空间的表示，使用主元分析（Principal Component Analysis，PCA）可以找拥有最大方差的轴，但轴的最大方差不一定包含任何有鉴别性的信息。

使用线性鉴别（Linear Discriminant Analysis，LDA）的特定类投影方法：使类内方差最小的同时，使类外方差最大。

仅仅使用的局部特征描述图像的方法避免输入的图像的高维数据：提取的特征对于局部遮挡、光照变化、小样本等情况更强健。如：盖伯小波：Gabor Waelets，离散傅立叶变换：Discrete Cosinus Transform（DCT），局部二值模式：Local Binary Patterns（LBP）。
#### OpenCV 介绍

从 OpenCV 2.4 开始，加入了新的类 FaceRecognizer，可以使用它便捷地进行人脸识别实验。

FaceRecognizer 类目前包含三种人脸识别方法：
1.  基于 PCA 变换的人脸识别：EigenFaceRecognizer。
2.  基于 Fisher 变换的人脸识别：FisherFaceRecognizer。
3.  基于局部二值模式的人脸识别：LBPHFaceRecognizer。

特征脸（Eigenfaces）：图像表示的问题是他的高维问题，如果数据有任何差异，可以通过寻找主元来知道主要信息，把一些可能相关的变量转换成一个更小的不相关的子集。

一个高维数据集经常被相关变量表示，因此只有一些的维上数据才是有意义的（包含最多的信息），PCA 方法寻找数据中拥有最大方差的方向（主成分）。计算特征值和对应的特征向量，对特征值进行递减排序，特征向量和它顺序一致。

k 个主成分也就是 k 个最大的特征值对应的特征向量。

把所有的训练数据投影到 PCA 子空间 -> 把待识别图像投影到 PCA 子空间 -> 找到训练数据投影后的向量和待识别图像投影后的向量最近的那个。

FisherFaces：基于线性判别分析（Linear Discriminant Analysis，LDA）理论，在降维的同时考虑类别信息，基于特征脸的方法，找到使数据中最大方差的特征线性组合。在低维表示下，相同的类应该紧紧的聚在一起，而不同的类别尽量距离越远。

局部二值模式直方图（Local Binary Patterns Histograms）：不把整个图像看成一个高维向量，仅用局部特征来描述一个物体，通过这种方式提取特征，获得一个低维隐式。对图像的像素和它局部周围像素进行对比后的结果进行求和，把这个像素作为中心，对相邻像素进行阈值比较。如果中心像素的亮度大于等于他的相邻像素，标记为 1，否则标记为 0（用二进制数字来表示每个像素）。
### OpenCV 的基本使用

#### 读取图片

```python
#导入模块
import cv2 as cv
#读取图片
img=cv.imread('lena.jpg')    #加载图片路径中不能有中文
#显示图片
cv.imshow('read_img',img)
#等待键盘输入 单位毫秒  传入0 则就是无限等待
cv.waitKey(3000)
#释放内存  由于OpenCV底层是C++编写的
cv.destroyAllWindows()
```

#### 图片灰度转换

```python
import cv2 as cv
img=cv.imread('lena.jpg')
cv.imshow('BGR_img',img)
#将图片灰度转换
gray_img=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
cv.imshow('gray_img',gray_img)
#保存图片
cv.imwrite('gray_lena.jpg',gray_img)
cv.waitKey(0)
cv.destroyAllWindows()
```

#### 修改图片尺寸

```python
import cv2 as cv
img=cv.imread('lena.jpg')
cv.imshow('img',img)
print('原来图片的形状',img.shape)
# 修改图片尺寸
resize_img=cv.resize(img,dsize=(600,560))
print('修改后图片的形状：',resize_img.shape)
cv.imshow('resize_img',resize_img) 
#输入q时退出
while True:
    if ord('q')==cv.waitKey(0):
        break
cv.destroyAllWindows()
```

#### 画图

```python
import cv2 as cv
img=cv.imread('lena.jpg')
#绘制矩形，左上角坐标(x,y) 矩形的宽度和高度(w,h)
x,y,w,h=100,100,100,100
cv.rectangle(img,(x,y,x+w,y+h),color=(0,255,255),thickness=3) #BGR
#绘制圆形，圆点的坐标center，半径radius
x,y,r=200,200,100
cv.circle(img,center=(x,y),radius=r,color=(0,0,255),thickness=2)
#显示图片
cv.imshow('rectangle_img',img)
cv.waitKey(0)
cv.destroyAllWindows()
```

### 人脸检测

#### Haarcascades

提取出图像的细节对产生稳定分类结果和跟踪结果很有用，这些提取的结果被称为特征。

虽然任意像素都可以能影响多个特征，但特征应该比像素少得多，两个图像的相似程度可以通过它们对应特征的欧氏距离来度量。

Haar 特征是一种用于实现实时人脸跟踪的特征，每一个 Haar 特征都描述了相邻图像区域的对比模式，如边、顶点和细线都能生成具有判别性的特征。

#### 官方 demo

下载：https://sourceforge.net/projects/opencvlibrary/files/4.5.3/opencv-4.5.3-vc14_vc15.exe/download。

build 中是 OpenCV 使用时要用到的一些库文件。

sources 中是 OpenCV 官方提供的 demo 示例源码。

sources/data/haarcascades 文件夹包含了所有 OpenCV 的人脸检测的 XML 文件，可用于检测静止图像、视频和摄像头所得到图像中的人脸。

#### 静态人脸检测

```python
import cv2 as cv
def face_detect_demo():
    #将图片转换为灰度图片
    gray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
    #加载特征数据
    face_detector=cv.CascadeClassifier('opencv/sources/data/haarcascades/haarcascade_frontalface_default.xml')
    faces=face_detector.detectMultiScale(gray)
    for x,y,w,h in faces:
        cv.rectangle(img,(x,y),(x+w,y+h),color=(0,255,0),thickness=2)
    cv.imshow('result',img)
#加载图片
img=cv.imread('lena.jpg')
face_detect_demo()
cv.waitKey(0)
cv.destroyAllWindows()
```

#### 检测多张人脸

```python
import cv2 as cv
def face_detect_demo():
    #将图片灰度
    gray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
    #加载特征数据
    face_detector = cv.CascadeClassifier(
        'opencv/sources/data/haarcascades/haarcascade_frontalface_default.xml')
    faces = face_detector.detectMultiScale(gray)
    for x,y,w,h in faces:
        print(x,y,w,h)
        cv.rectangle(img,(x,y),(x+w,y+h),color=(0,0,255),thickness=2)
        cv.circle(img,center=(x+w//2,y+h//2),radius=w//2,color=(0,255,0),thickness=2)
    #显示图片
    cv.imshow('result',img)
#加载图片
img=cv.imread('face3.jpg')
#调用人脸检测方法
face_detect_demo()
cv.waitKey(0)
cv.destroyAllWindows()
```

#### 检测视频中的人脸

```python
import cv2 as cv
def face_detect_demo(img):
    #将图片灰度
    gray=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
    #加载特征数据
    face_detector = cv.CascadeClassifier('opencv/sources/data/haarcascades/haarcascade_frontalface_default.xml')
    faces = face_detector.detectMultiScale(gray)
    for x,y,w,h in faces:
        cv.rectangle(img,(x,y),(x+w,y+h),color=(0,0,255),thickness=2)
        cv.circle(img,center=(x+w//2,y+h//2),radius=(w//2),color=(0,255,0),thickness=2)
    cv.imshow('result',img)
#读取视频
cap=cv.VideoCapture('video.mp4')
while True:
    flag,frame=cap.read()
    print('flag:',flag,'frame.shape:',frame.shape)
    if not flag:
        break
    face_detect_demo(frame)
    if ord('q') == cv.waitKey(10):
        break
cv.destroyAllWindows()
cap.release()
```

### 人脸识别

用一系列分好类的图像来训练程序，并基于这些图像来进行识别，每个识别都具有转置信（confidence）评分，因此可在实际应用中通过对其设置阈值来进行筛选。

#### 训练数据

`train()` 函数中有两个参数：图像数组和标签数组，这些标签表示进行识别时候某人人脸的ID 。

需要安装 `opencv-contrib-python` 模块。

```python
import os
import cv2 as cv
import sys
from PIL import Image
import numpy as np
def getImageAndLabels(path):
    facesSamples=[]
    ids=[]
    imagePaths=[os.path.join(path,f) for f in os.listdir(path)]
    #检测人脸
    face_detector = cv.CascadeClassifier(
        'opencv/sources/data/haarcascades/haarcascade_frontalface_default.xml')
    #遍历列表中的图片
    for imagePath in imagePaths:
        #打开图片
        PIL_img=Image.open(imagePath).convert('L')
        #将图像转换为数组
        img_numpy=np.array(PIL_img,'uint8')
        faces = face_detector.detectMultiScale(img_numpy)
        #获取每张图片的id
        id=int(os.path.split(imagePath)[1].split('.')[0])
        for x,y,w,h in faces:
            facesSamples.append(img_numpy[y:y+h,x:x+w])
            ids.append(id)
    return facesSamples,ids
if __name__ == '__main__':
    #图片路径
    path='./data/jm/'
    #获取图像数组和id标签数组
    faces,ids = getImageAndLabels(path)
    #获取训练对象
    recognizer = cv.face.LBPHFaceRecognizer_create()
    recognizer.train(faces,np.array(ids))
    #保存文件
    recognizer.write('trainer/trainer.yml')
```

#### 基于 LBPH 的人脸识别

LBPH（Local Binary Pattern Histogram）将检测到的人脸分为小单元，并将其与模型中的对应单元进行比较，对每个区域的匹配值产生一个直方图。由于这种方法的灵活性，LBPH 是唯一允许模型样本人脸和检测到的人脸在形状、大小上可以不同的人脸识别算法。

调整后的区域中调用 `predict()`函数，该函数返回两个元素的数组：第一个元素是所识别个体的标签，第二个是置信度评分。

所有的算法都有一个置信度评分阈值，置信度评分用来衡量所识别人脸与原模型的差距，0 表示完全匹配，可能有时不想保留所有的识别结果，则需要进一步处理，因此可用自己的算法来估算识别的置信度评分。

一个好的 LBPH 识别参考值要低于50，任何高于80的参考值都会被认为是低的置信度评分。

```python
import cv2 as cv
import numpy as np
import os

# 加载训练数据集文件
recognizer = cv.face.LBPHFaceRecognizer_create()
recognizer.read('trainer/trainer.yml')
# 准备识别的图片
faceCascade = cv.CascadeClassifier(
    'opencv/sources/data/haarcascades/haarcascade_frontalface_default.xml')
font = cv.FONT_HERSHEY_SIMPLEX
id = 0
img = cv.imread('19.pgm')
gray_img=cv.cvtColor(img,cv.COLOR_BGR2GRAY)
faces = faceCascade.detectMultiScale(gray_img)
for x, y, w, h in faces:
    cv.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
    # 人脸识别
    id, confidence = recognizer.predict(gray_img[y:y + h, x:x + w])
    print('标签id:', id, '置信评分：', confidence)
cv.imshow('result', img)
cv.waitKey(0)
cv.destroyAllWindows()
```

### 摄像头人脸识别

#### 摄像头调试

```python
#导入opencv模块
import cv2
#捕捉帧，笔记本摄像头设置为0即可
capture = cv2.VideoCapture(0)
#循环显示帧
while(True):
    ret, frame = capture.read()
    #显示窗口第一个参数是窗口名，第二个参数是内容
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) == ord('q'):      #按q退出
        break
```

#### 摄像头人脸识别

```python
import cv2
import numpy as np
face_cascade = cv2.CascadeClassifier(    "opencv\sources\data\haarcascades\haarcascade_frontalface_default.xml")
eye_cascade = cv2.CascadeClassifier("opencv\sources\data\haarcascades\haarcascade_eye.xml")
cap = cv2.VideoCapture(0)
while True:
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 5)
    if len(faces) > 0:
        for faceRect in faces:
            x, y, w, h = faceRect
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
            roi_gray = gray[y:y + h // 2, x:x + w]
            roi_color = img[y:y + h // 2, x:x + w]
            eyes = eye_cascade.detectMultiScale(roi_gray, 1.1, 1, cv2.CASCADE_SCALE_IMAGE, (2, 2))
            for (ex, ey, ew, eh) in eyes:
                cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)
    cv2.imshow("img", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```
