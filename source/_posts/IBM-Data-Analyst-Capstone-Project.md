---
title: IBM Data Analyst Capstone Project
date: 2021-04-03
tags: [IBM Data Science]
categories: Data Science and Analytics
---

> In this course provided by IBM, I will assume the role of an Associate Data Analyst who has recently joined the organization and be presented with a business challenge that requires data analysis to be performed on real-world datasets. The capstone project will culminate with a presentation of your data analysis report, with an executive summary for the various stakeholders in the organization. I believe this project is a great opportunity to showcase Data Analytics skills, and demonstrate proficiency to potential employers. The following are the notes I took during this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/IBM-Data-Analyst.png)

![](https://hexo.bezhuang.cn/img/Coursera-Data-Analyst-Capstone-Project.png)

### Data Collection

#### Collecting Data Using APIs

The `HTTP` protocol allows you to send and receive information through the web including webpages, images, and other web resources.

Uniform resource locator(URL): the most popular way to find resources on the web

- Scheme: `http://`
- Internet address or Base URL: `www.ibm.com` 
- Route location on the web server: `/images/IDSNlogo.png`

Request

- Request start line = `GET` method + location of the resource `/index.html` + `HTTP` version
- Request header passes additional information with an `HTTP` request

Response

- Response start line = version number `HTTP/1.0` + a status code (200) meaning success, + a descriptive phrase (OK). 
- Response header contains useful information
- Response body containing the requested file an `HTML` document

Requests in Python

```python
import requests
import os 
from PIL import Image
from IPython.display import IFrame
#GET request //# Use single quotation marks for defining string
url='https://www.ibm.com/'  
r=requests.get(url)
#status of the request
r.status_code  
#view request headers //r.request.body
print(r.request.headers)  
#HTTP response header
header=r.headers  
#obtain the date
header['date']  
#obtain the type of data
header['Content-Type']  
r.encoding
#view text
r.text[0:100]  
#write content(image)
path=os.path.join(os.getcwd(),'image.png')
with open(path,'wb') as f:
    f.write(r.content)
Image.open(path)
```

Get Request with URL Parameters

- You can use the `GET` method to modify the results of your query

```python
url_get='http://httpbin.org/get'
#To create a Query string, add a dictionary.
payload={"name":"Joseph","ID":"123"}  
r=requests.get(url_get,params=payload)
r.url  #'http://httpbin.org/get?name=Joseph&ID=123'
#key args in JSON format
r.json()['args']  
```

Post Requests

- the `POST` request sends the data in a request body

```python
url_post='http://httpbin.org/post'
r_post=requests.post(url_post,data=payload)
r_post.url 
r_post.request.body
r_post.json()['form']
```

#### Collecting Data Using Webscraping

Review of Webscraping

```python
from bs4 import BeautifulSoup  # this module helps in web scrapping.
import requests  # this module helps us to download a web page
url = "http://www.ibm.com"
# get the contents of the webpage in text format and store in a variable called data
data  = requests.get(url).text  
# create a soup object using the variable 'data'
soup = BeautifulSoup(data,"html5lib")  
# in html anchor/link is represented by the tag <a>
for link in soup.find_all('a'):  
    print(link.get('href'))
# in html image is represented by the tag <img>
for link in soup.find_all('img'):
    print(link.get('src'))
```

Scrape data from html table

```python
url = "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DA0321EN-SkillsNetwork/labs/datasets/HTMLColorCodes.html"
# get the contents of the webpage in text format and store in a variable called data
data  = requests.get(url).text  
soup = BeautifulSoup(data,"html5lib")
# in html table is represented by the tag <table>
table = soup.find('table') 
# in html table row is represented by the tag <tr>
for row in table.find_all('tr'): 
    # in html a column is represented by the tag <td>
    cols = row.find_all('td') 
    # store the value in column 3 as color_name
    color_name = cols[2].getText() 
    # store the value in column 4 as color_code
    color_code = cols[3].getText() 
    print("{}--->{}".format(color_name,color_code))
```

#### Exploring Data

Load the dataset

```python
import pandas as pd
dataset_url = "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DA0321EN-SkillsNetwork/LargeData/m1_survey_data.csv"
df = pd.read_csv(dataset_url)
```

Explore the dataset

```python
#Display the top & bottom 5 rows and columns from your dataset
df.head()  
df.tail()
#The number of rows in the dataset.
df.shape[0]  
#The number of columns in the dataset.
df.shape[1]  
#Print the datatype of all columns.
df.dtypes  
#Print the mean age of the survey participants.
df["Age"].mean()
#Print how many unique countries are there in the Country column.
df["Country"].nunique()  
```

### Data Wrangling

Load the dataset

```python
import pandas as pd
df = pd.read_csv("https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DA0321EN-SkillsNetwork/LargeData/m1_survey_data.csv")
```

Finding Duplicates

```python
#Find how many duplicate rows exist in the dataframe.
df.duplicated(keep='first').sum()  
#Show duplicated rows
duplicateRows = df[df.duplicated()]  
duplicateRows  
#numbers of duplicate values in the column Respondent
df["Respondent"].duplicated(keep='first').sum()  
```

Removing Duplicates

```python
#Remove the duplicate rows from the dataframe.
df.drop_duplicates(ignore_index=True, inplace=True)  
#Verify if duplicates were actually dropped.
df.duplicated(keep='first').sum()  
#number of rows and columns left
df.shape  
#numbers of unique rows left in the column Respondent
df["Respondent"].nunique  
```

Finding Missing Values

```python
#Find the missing values for all columns.
df.isnull().sum()  
#Find out how many rows are missing in the column EdLevel
df["EdLevel"].isnull().sum()  
```

Determine Missing Values

```python
#Find the value counts for the column WorkLoc.
df["WorkLoc"].value_counts()  
#Impute (replace) all the empty rows in the column WorkLoc with the value that you have identified as majority.
df["WorkLoc"].fillna(value="Office",inplace=True)  
#After imputation there should ideally not be any empty rows in the WorkLoc column.
df["WorkLoc"].isnull().sum()  
```

Normalizing Data

```python
#List out the various categories in the column 'CompFreq'
df["CompFreq"].unique()  
#If the CompFreq is Yearly then use the exising value in CompTotal
df["CompFreq"].replace(to_replace="Yearly",value=1,inplace=True)  
#If the CompFreq is Monthly then multiply the value in CompTotal with 12 (months in an year)
df["CompFreq"].replace(to_replace="Monthly",value=12,inplace=True)  
#If the CompFreq is Weekly then multiply the value in CompTotal with 52 (weeks in an year)
df["CompFreq"].replace(to_replace="Weekly",value=52,inplace=True)  
df["CompFreq"].unique()
df["CompFreq"].value_counts()
#it makes comparison of salaries easy.
df['NormalizedAnnualCompensation'] = df["CompTotal"] * df["CompFreq"]  
df["Respondent"].nunique()
df["ConvertedComp"].describe()
df["ConvertedComp"].hist(figsize=(15,4))
df['NormalizedAnnualCompensation'].median()
```

### Exploratory Data Analysis

Import necessary modules

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
%matplotlib inline
df = pd.read_csv("https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DA0321EN-SkillsNetwork/LargeData/m2_survey_data.csv")
```

Distribution: Determine how the data is distributed

```python
  #Plot the distribution curve for the column ConvertedComp
  plt.figure(figsize=(10,5))
  sns.distplot(a=df["ConvertedComp"],bins=20,hist=False)
  plt.show()
  #Plot the histogram for the column ConvertedComp
  plt.figure(figsize=(10,5))
  sns.distplot(a=df["ConvertedComp"],bins=20,kde=False)
  plt.show()
  #the median of the column ConvertedComp
  df["ConvertedComp"].median()
  #number of responders identified themselves only as a Man
  df["Gender"].value_counts()
  #the median number of ConvertedComp of responders identified themselves only as a Woman
  woman = df[df["Gender"] == "Woman"]
  woman["ConvertedComp"].median()
  #five number summary for the column Age
  df["Age"].describe()
```

Outliers

```python
#Find out if outliers exist in the column ConvertedComp using a box plot
plt.figure(figsize=(10,5))
sns.boxplot(x=df.ConvertedComp, data=df)
plt.show()
#Find out the Inter Quartile Range for the column ConvertedComp
df["ConvertedComp"].describe()
#Find out the upper and lower bounds.
Q1 = df["ConvertedComp"].quantile(0.25)
Q3 = df["ConvertedComp"].quantile(0.75)
IQR = Q3 - Q1
print(IQR)
#Identify how many outliers are there in the ConvertedComp column
outliers = (df["ConvertedComp"] < (Q1 - 1.5 * IQR)) | (df["ConvertedComp"] > (Q3 + 1.5 * IQR))
outliers.value_counts()
less = (df["ConvertedComp"] < (Q1 - 1.5 * IQR))
less.value_counts()
more = (df["ConvertedComp"] > (Q3 + 1.5 * IQR))
more.value_counts()
#Create a new dataframe by removing the outliers from the ConvertedComp column
RemoveConvertedcomp = df[~(df["ConvertedComp"] > (Q3 + 1.5 * IQR))]
RemoveConvertedcomp.head()
RemoveConvertedcomp["ConvertedComp"].median()
RemoveConvertedcomp["ConvertedComp"].mean()
```

Correlation: Find the correlation between all numerical columns

```python
df.corr()
```

### Data Visualization

Work with Database

```python
!wget https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBM-DA0321EN-SkillsNetwork/LargeData/m4_survey_data.sqlite
import sqlite3
import pandas as pd
# open a database connection
conn = sqlite3.connect("m4_survey_data.sqlite") 
# print how many rows are there in the table named 'master'
QUERY = """
SELECT COUNT(*)
FROM master
"""
# the read_sql_query runs the sql query and returns the data as a dataframe
df = pd.read_sql_query(QUERY,conn)
df.head()
# print all the tables names in the database
QUERY = """
SELECT name as Table_Name FROM
sqlite_master WHERE
type = 'table'
"""
# the read_sql_query runs the sql query and returns the data as a dataframe
pd.read_sql_query(QUERY,conn)
#run a group by query
QUERY = """
SELECT Age,COUNT(*) as count
FROM master
group by age
order by age
"""
pd.read_sql_query(QUERY,conn)
#Describe a table
table_name = 'master'  # the table you wish to describe
QUERY = """
SELECT sql FROM sqlite_master
WHERE name= '{}'
""".format(table_name)
df = pd.read_sql_query(QUERY,conn)
print(df.iat[0,0])
```

Visualizing Distribution of Data

Relationship

Composition

Comparison

### Dashboard Creation

IBM Cognos Dashboard Embedded (CDE) is an AI-fueled business intelligence service that supports the entire data analytics cycle, from discovery to operationalization. It provides users with data discovery capabilities to visually explore and interact with their data to identify the key insights for improving data driven decisions. Users can perform data discovery and then quickly assemble that information into interactive, visually appealing dashboards; all without the need of formal training.

Add a Cognos Dashboard Embedded (CDE) service and upload external data files to your project (supports CSV file only)

General navigation around the CDE user interface (UI), start a new dashboard with a template in CDE, populate it with a data visualization as well as save the dashboard.

### Presentation of Findings

Data collected, cleaned and organized -> Report (paper style report or slideshow presentation)

Elements Of A Successful Data Findings Report

- Outline
- Cover Page
- Executive Summary: briefly explain the details of the project and should be considered a stand-alone document
- Table of Contents
- Introduction: explains the nature of the analysis, states the problem, and gives the questions that were to be answered by performing the analysis
- Methodology: explains the data sources that were used in the analysis and outlines the plan for the collected data
- Results: goes into the detail of the data collection, how it was organized, and how it was analyzed,  also contain the charts and graphs that would substantiate the results and call attention to the more complex or crucial findings
- Discussion: engage the audience with a discussion of your implications that were drawn from the research
- Conclusion: reiterate the problem given in the introduction and gives an overall summary of the findings, also state the outcome of the analysis and if any other steps would be taken in the future
- Appendix: contain information that really didn’t fit in the main body of the report, but you deemed it was still important enough to include

Factors to remember in accurately conveying your message

- Make sure charts and graphs are not too small and are clearly labeled
- Use the data only as supporting evidence
- Share only one point from each chart
- Eliminate data that does not support the key message

### Final Presentation (PDF version):

{% pdf /pdf/Capstone_Story.pdf %}

Or download it from My [Github Repository](https://github.com/Bezhuang/IBM-Data-Science)

### Assignments

Visit my [Github Repository](https://github.com/Bezhuang/IBM-Data-Science)

