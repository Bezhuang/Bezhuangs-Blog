---
title: Python Project for Data Science
date: 2021-03-06
tags: [IBM Data Science]
categories: Data Science and Analytics
---

> This Python Project mini-course provided by IBM is intended to demonstrate basic Python skills by performing specific tasks such as extracting data, web scraping, visualizing data, and creating a dashboard. The following are the notes I took during this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/Coursera-Python-Project4DS.png)

### Web Scraping

HTML Tags

- HTML Composition
- HTML Paragraph Tags: `<p></p>`
- HTML Anchor Tag & Hyperlink Tag: `<a href=""></a>`
- Attributes: `href=""`
- Inspect HTML: `F12`
- Document Tree: `<head></head>`, `<body></body>`
- HTML Tables: `<table><tr><td>1</td><td>2</td></tr></table>`

BeautifulSoup

```python
from bs4 import BeautifulSoup
html=""
soup=BeautifulSoup(html, 'html5lib')
```

BeautifulSoup: Object

```python
tag_object=soup.title
tag_object=soup.h3
tag_child=tag_object.b #HTML Tree
parent_tag=tag_child.parent #Parent attribute
sibling_1=tag_object.next_sibling #Next-sibling attribute
tag_child.attrs #Show attributes
tag_child.string #Navigable string
```

BeautifulSoup: `find_all`

```python
table=BeautifulSoup(html, 'html5lib')
table_row=table.find_all(name='tr') #Python iterable
first_row=table_row[0]
from i,row in enumerate(table_rows): #Elements
    print("row",i)
    cells+row.find_all("td")
    for j,cell in enumerate(cells):
        print("column",j,"cell",cell)
```

Requests & BeautifulSoup in real web page

```python
import requests
from bs4 import BeautifulSoup
page=requests.get("http://...").text
soup=BeautifulSoup(page, "html.parser") #Create a BeautifulSoup object
artists=soup.find_all('a') #Pull all instances of <a> tag
for artist in artists:  #Clears data of all tags
    names=artist.contents[0]
    fullLink=artist.get('href')
    print(names)
    print(fullLink)
```

### Project: Analyzing Stock Performance and Building a Dashboard

A stock (also known as equity) is a security that represents the ownership of a fraction of a [corporation](https://www.investopedia.com/terms/c/corporation.asp).

The stock ticker is a report of the price of a certain stock, updated continuously throughout the trading session by the various stock market exchanges.

Extracting Stock Data Using a Python Library: `yfinance`

Extracting Stock Data Using Web Scraping

[Project Notebook](https://dataplatform.cloud.ibm.com/analytics/notebooks/v2/ad8810db-e61c-4227-997d-f26c1ec0ad49/view?access_token=6a4d4d444262c5dc0cc25bee7ed55437e3bde917b8c6218d9f24f68053e99955)

### Assignments 

Visit my [Github Repository](https://github.com/Bezhuang/IBM-Data-Science) 