---
title: 初学使用 Python 库进行自然语言处理
date: 2023-02-10
references:
  - title: Complete Natural Language Processing (NLP) Tutorial in Python! (with examples)
    url: https://www.youtube.com/watch?v=M7SWr5xObkA
categories: 人工智能
tags: [NLP, Python]
---

> 最近，自然语言处理工具 [ChatGPT](https://chat.openai.com/chat) 彻底出圈火爆全网，显然自然语言处理和深度学习将是下一步人工智能发展的趋势之一。于是，我尝试跟着 MIT 大神 [Keith Galli](https://www.youtube.com/@KeithGalli) 的 [Tutorial](https://www.youtube.com/watch?v=M7SWr5xObkA) 一起，初学使用 Python 库进行自然语言处理，在一个个例子中深入了解自然语言处理的主要概念。以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、Bag-of-words

机器学习算法不能直接处理原始文本，文本必须转换为数字向量。在语言处理中，向量 x 来自文本数据，以反映文本的各种语言特性。这称为特征提取或特征编码。Bag-of-words（词袋）模型就是一种流行且简单的文本数据特征提取方法，在这种方法中，我们将每个单词计数视为一个特征。词袋模型假设我们不考虑文本中词与词之间的上下文关系，仅仅只考虑所有词的权重。而权重与词在文本中出现的频率有关。

第 1 步：定义一些训练语句

```python
class Category:
  BOOKS = "BOOKS"
  CLOTHING = "CLOTHING"

train_x = ["i love the book", "this is a great book", "the fit is great", "i love the shoes"]
train_y = [Category.BOOKS, Category.BOOKS, Category.CLOTHING, Category.CLOTHING]
```

第 2 步：使用机器学习库 [scikit-learn](https://sklearncn.cn/) 拟合模型，将每个自由文本文档转换为一个向量，我们可以将其用作机器学习模型的输入或输出。最简单的评分方法是将单词的存在标记为布尔值，0 表示不存在，1 表示存在，用向量中的一个位置对每个词进行评分：

```python
from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer(binary=True)
train_x_vectors = vectorizer.fit_transform(train_x)

print(vectorizer.get_feature_names())
# 输出词汇表
# ['book', 'fit', 'great', 'is', 'love', 'shoes', 'the', 'this']

print(train_x_vectors.toarray())
# [[1 0 0 0 1 0 1 0]
#  [1 0 1 1 0 0 0 1]
#  [0 1 1 1 0 0 1 0]
#  [0 0 0 0 1 1 1 0]]
```

第 3 步：使用线性 SVM 模型构建一个简单的文本分类器：

```python
from sklearn import svm

clf_svm = svm.SVC(kernel='linear')
clf_svm.fit(train_x_vectors, train_y)
```

第 4 步：在经过训练的模型上测试新语句：

```python
test_x = vectorizer.transform(['i love the books'])  # 向量化新语句

clf_svm.predict(test_x)
# 被分类到书籍类别
# array(['CLOTHING'], dtype='<U8')
```

### 二、Word Vectors 

词向量（Word Vectors）模型是考虑词语位置关系的一种模型，通过大量语料的训练，将每一个词语映射到高维度的向量当中，通过求余弦的方式，可以判断两个词语之间的关系。把词映射为实数域向量的技术也叫词嵌入（Word Embedding）。随着优秀的词向量模型（Word2Vec、ELMo、Bert 等）的出现，推动了 NLP 领域飞跃式的发展。

spaCy 是世界上最快的工业级自然语言处理工具。 支持多种自然语言处理基本功能，包括分词、词性标注、词干化、命名实体识别、名词短语提取等等。

```python
!pip install spacy
!python -m spacy download en_core_web_md
```

使用词向量构建文本分类模型：

```python
import spacy

nlp = spacy.load("en_core_web_md")

print(train_x)
# ['i love the book', 'this is a great book', 'the fit is great', 'i love the shoes']

docs = [nlp(text) for text in train_x]
train_x_word_vectors = [x.vector for x in docs]

from sklearn import svm

clf_svm_wv = svm.SVC(kernel='linear')
clf_svm_wv.fit(train_x_word_vectors, train_y)
```

使用我们的模型预测新的语句：

```python
test_x = ["I love the books"]
test_docs = [nlp(text) for text in test_x]
test_x_word_vectors =  [x.vector for x in test_docs]

clf_svm_wv.predict(test_x_word_vectors)
# array(['BOOKS'], dtype='<U8')
```

### 三、Regexes

正则表达式（Regexes）本质上是一种嵌入在 Python 中并通过 re 模块提供的高度专业化的微型编程语言。 使用这种小语言，您可以为要匹配的可能字符串集指定规则； 该集合可能包含英文句子、电子邮件地址、TeX 命令或任何您喜欢的内容。 然后，您可以提出诸如“此字符串是否与模式匹配？”或“此字符串中任何位置的模式是否匹配？”之类的问题。 您还可以使用 RE 修改字符串或以各种方式将其拆分：

```python
import re

regexp = re.compile(r"\bread\b|\bstory\b|book")

phrases = ["I liked that story.", "the car treaded up the hill", "this hat is nice"]

matches = []
for phrase in phrases:
  if re.search(regexp, phrase):
    matches.append(phrase)

print(matches)
# ['I liked that story.']
```

### 四、Stemming/Lemmatization

Python NLTK 中的词干提取（Stemming）和词形还原（Lemmatization）是自然语言处理的文本规范化技术。这些技术广泛用于文本预处理。词干化和词形还原之间的区别在于，词干化更快，因为它在不知道上下文的情况下切割单词，而词形还原更慢，因为它在处理之前知道单词的上下文：

```python
import nltk

nltk.download('wordnet')
nltk.download('stopwords')
nltk.download('punkt')
```

词干提取是一种将句子中的一组单词转换为序列以缩短其查找时间的技术。在这种方法中，具有相同含义但根据上下文或句子有一些变化的词被归一化。换句话说，只有一个词根，但同一个词有许多变体。例如，词根是 eat，它的变体是 eats, eating, eaten and like so。同样，借助 Python 中的词干提取，我们可以找到任何变体的词根。

NLTK 有一个名为 PorterStemmer 的算法。该算法接受标记化词列表并将其词干化为词根：

```python
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

stemmer = PorterStemmer()

phrase = "reading the books"
words = word_tokenize(phrase)

stemmed_words = []
for word in words:
  stemmed_words.append(stemmer.stem(word))

" ".join(stemmed_words)
# 'read the book'
```

词形还原是根据词义和上下文查找词词元的算法过程。词形还原通常是指对单词进行词法分析，旨在去除屈折词尾。它有助于返回称为词条的单词的基本形式或字典形式。

Lemmatization 优于 Stemming，因为词干算法通过从单词中删除后缀来工作。从广义上讲，就是切断单词的开头或结尾。相反，Lemmatization 是一个更强大的操作，它考虑了单词的形态分析。它返回作为所有屈折形式的基本形式的引理。需要深入的语言知识来创建词典和寻找单词的正确形式。词干提取是一种通用操作，而词形还原是一种智能操作，可以在字典中查找正确的形式。因此，词形还原有助于形成更好的机器学习特征。

NLTK Lemmatization 方法基于 WorldNet 的内置 morph 函数：

```python
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()

phrase = "reading the books"
words = word_tokenize(phrase)

lemmatized_words = []
for word in words:
  lemmatized_words.append(lemmatizer.lemmatize(word, pos='v'))

" ".join(lemmatized_words)
# 'read the book'
```

### 五、Stopwords

停用词（Stopwords）是搜索引擎被编程为忽略的常用词（例如 the、a、an、in），无论是在索引条目进行搜索时还是在检索条目时作为搜索查询的结果。 我们不希望这些词占用我们数据库中的空间，或占用宝贵的处理时间。为此，我们可以通过存储您认为是停用词的单词列表来轻松删除它们。

![](https://media.geeksforgeeks.org/wp-content/cdn-uploads/Stop-word-removal-using-NLTK.png)

Python 中的 NLTK（自然语言工具包）有一个以 16 种不同语言存储的停用词列表，标记化，然后删除停用词：

```python
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

stop_words = stopwords.words('english')

phrase = "Here is an example sentence demonstrating the removal of stopwords"

words = word_tokenize(phrase)

stripped_phrase = []
for word in words:
  if word not in stop_words:
    stripped_phrase.append(word)

" ".join(stripped_phrase)
# 'Here example sentence demonstrating removal stopwords'
```

### 六、TextBlob

TextBlob 是一个用 Python 编写的开源的文本处理库。它可以用来执行很多自然语言处理的任务，比如，词性标注，名词性成分提取，情感分析，文本翻译等等。

```python
!python -m textblob.download_corpora
```

使用 TextBlob 进行拼写更正、情感和词性标注：

```python
from textblob import TextBlob

phrase = "the book was horrible"

tb_phrase = TextBlob(phrase)

tb_phrase.correct()
# TextBlob("the book was horrible")

tb_phrase.tags
# [('the', 'DT'), ('book', 'NN'), ('was', 'VBD'), ('horrible', 'JJ')]

tb_phrase.sentiment
# Sentiment(polarity=-1.0, subjectivity=1.0)
```

### 七、State-of-the-art Models

#### Recurrent Neural Networks (RNNs) for text classification

循环神经网络（Rerrent Neural Network, RNN）是一种专门处理序列信息的具有时间依赖的网络。

#### Transformer architectures (attention is all you need)

Transformer 模型基于 encoder-decoder 架构，抛弃了传统的 RNN、CNN 模型，仅由 Attention 机制实现，并且由于 encoder 端是并行计算的，训练时间大大缩短。

Transformer 模型广泛应用于 NLP 领域，机器翻译、文本摘要、问答系统等等，目前火热的 Bert 模型就是基于 Transformer 模型构建的。

使用 spaCy 来使用 BERT 模型：

```python
!pip install spacy-transformers
!python -m spacy download en_trf_bertbaseuncased_lg
```

使用 Transformers/BERT 编写分类模型：

```python
import spacy
import torch

nlp = spacy.load("en_trf_bertbaseuncased_lg")
doc = nlp("Here is some text to encode.")

class Category:
  BOOKS = "BOOKS"
  BANK = "BANK"

train_x = ["good characters and plot progression", "check out the book", "good story. would recommend", "novel recommendation", "need to make a deposit to the bank", "balance inquiry savings", "save money"]
train_y = [Category.BOOKS, Category.BOOKS, Category.BOOKS, Category.BOOKS, Category.BANK, Category.BANK, Category.BANK]

from sklearn import svm

docs = [nlp(text) for text in train_x]
train_x_vectors = [doc.vector for doc in docs]
clf_svm = svm.SVC(kernel='linear')

clf_svm.fit(train_x_vectors, train_y)

test_x = ["check this story out"]
docs = [nlp(text) for text in test_x]
test_x_vectors = [doc.vector for doc in docs]

clf_svm.predict(test_x_vectors)
# array(['BOOKS'], dtype='<U5')
```

### 八、课后小练习

[构建一个高性能模型来对亚马逊评论的类别进行分类](https://colab.research.google.com/github/KeithGalli/pycon2020/blob/master/NLP_Exercise.ipynb)
