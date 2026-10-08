---
title: Python for Data Science, AI & Development
date: 2021-02-04
categories: 数据分析
tags: [IBM Data Science, Python]
---

> This course provided by IBM will not teach everything about Python, but it gives me the tools to work as a data scientist and enough knowledge to continue to expand Python learning. The following are the notes I took during this course. Since that I've learned [Python for everybody](/py4e-code) on Coursera before, so this note will only contain the necessary outlines and newly learned content.

<!--more-->

![](https://hexo.bezhuang.cn/img/Coursera-Py-for-DS&AI.png)

### Python Basics

Types

`int`, `float`, `str`, `True`, `False`

Expressions and Variables

Mathematical Operations

String Operations
- `Name[1:4]`, `len()`, `\n`

`try:`，`except:`

### Python Data Structures

Lists `[1, 2, 3]` and Tuples `(1, 2, 3)`
- `ABC[1]`, Tuples are immutable
- `.extend()`, `.append()`, `.split()`, `.pop()`, `.del()` , `.index()`, `sorted()`
- Append only adds one element to the list

Sets `{q, w, e}`
- unordered, unique element, `set(list)`, `.remove()`
- `set2 = set1 & set 3`, `.union`, `set2.issubset(set1)`, `.issuperset`(), `.difference()`

Dictionaries `{"key1":value1, "key2": value2}`
- `DICT['Graduation']='2022'`, `.keys()`, `.values()`, `'Graduation' in DICT`

### Python Programming Fundamentals

Conditions and Branching

- Comparison Operators `==`，Logic Operators`or` `AND`，Boolean
- `if ():`， `elif:`

Loops：`range(10,15)`，`for a in range():`，`while():`

Functions: a function can have multiple parameters

- `def function(input):`
- `global [variable]` 

Objects and Classes

- Every object has a type, a blueprint and a set of methods.

- An object is an instance of a particular type.

- Class includes Data attributes and methods  `dir(NameOfObject):`

  ```python
  class Circle(object):
      def __init__(self, radius, color='red'):
          self.radius = radius;
          self.color = color;
  ```

Reading and Writing files with `open()`

```python
with open("/example1.txt", "r") as File1:  # "r" for reading
    file_stuff=File1.read()  # file.readlines()can save text to a list
    print(file_stuff)        # file.readline(3)can only read 1 line
print(File1.closed)

with open("/example2.txt", "a") as File2:  #"a" for appending
        File2.write(line)
        
with open("example1.txt", "r") as readfile:   # copy file
    with open("example2.txt", "w"):     # "w" for writing
        for line in readfile:
            writefile.write(line)
```

### Pandas

#### Loading data with Pandas

```python
import pandas as pd
csv_path="file1.csv"
df = pd.read_csv(csv_path)  # Dataframes
df.head()  # Treat the first row as the column name
x=df[['ColumnA']]
```

#### Select Data from a data frame in Pandas

`df.loc['row', 'column']: 'value'`
- `loc` is primarily label based; when two arguments are used, you use column headers and row indexes to select the data you want.  
- `loc` can also take an integer as a row or column number.
- `loc` will return a `KeyError` if the requested items are not found.

`df.iloc[0,0]:'value'`
- `iloc` is integer-based. You use column numbers and row numbers to get rows or columns at particular positions in the data frame.
- `iloc` will return an `IndexError` if the requested indexer is out-of-bounds.

Use `loc` and `iloc` to slice data frames and assign the values to a new data frame.
- `z = df.iloc[0:2, 0:3]`

#### Working with and Saving data with Pandas

`df['ColumnA'].unique()`，``df1=df[df['ColumnA']>=1980]`

Save as CSV：`df1.to_csv('new.csv')`

### Numpy 

#### Preparation

```python
# Import the libraries
import time 
import sys
import numpy as np 
import matplotlib.pyplot as plt
%matplotlib inline  

# Plotting functions
def Plotvec1(u, z, v):    
    ax = plt.axes()
    ax.arrow(0, 0, *u, head_width=0.05, color='r', head_length=0.1)
    plt.text(*(u + 0.1), 'u')    
    ax.arrow(0, 0, *v, head_width=0.05, color='b', head_length=0.1)
    plt.text(*(v + 0.1), 'v')
    ax.arrow(0, 0, *z, head_width=0.05, head_length=0.1)
    plt.text(*(z + 0.1), 'z')
    plt.ylim(-2, 2)
    plt.xlim(-2, 2)
def Plotvec2(a,b):
    ax = plt.axes()
    ax.arrow(0, 0, *a, head_width=0.05, color ='r', head_length=0.1)
    plt.text(*(a + 0.1), 'a')
    ax.arrow(0, 0, *b, head_width=0.05, color ='b', head_length=0.1)
    plt.text(*(b + 0.1), 'b')
    plt.ylim(-2, 2)
    plt.xlim(-2, 2)
```

#### One Dimensional Numpy

A numpy array is similar to a list. It's usually fixed in size and each element is of the same type.

```python
import numpy as np
a=np.array([0,1,2,3,4])
a.size # Get the size of numpy array  5
a.ndim # Get the number of dimensions of numpy array  1
a.shape # Get the shape/size of numpy array  (5,)
a.dtype # Check the type of the values stored in numpy array
a[0]=20 # Assign value  [20,1,2,3,4]
b=a[3:5] # Slicing  [3,4]
mean = a.mean() # Get the mean of numpy array
standard_deviation=a.std() # Get the standard deviation of numpy array
max_b = b.max()
min_b = b.min()
```

Numpy Array Operations

```python
u = np.array([1, 0])
v = np.array([0, 1])
z = u + v # Numpy Array Addition
Plotvec1(u, z, v) # Plot numpy arrays (equivalent to vector addition)
z = 2 * u # Numpy Array Multiplication
z = u * v # Calculate the production of two numpy arrays
np.dot(u, v) # Calculate the dot product  1*0+0*1
u + 1 # Add the constant to array  [2,1]
x = np.array([0, np.pi/2 , np.pi]) # Create the numpy array in radians
y = np.sin(x) # Calculate the sin of each elements
```

A useful function for plotting mathematical functions is `linspace`

Linspace returns evenly spaced numbers over a specified interval.

```python
x = np.linspace(0, 2*np.pi, num=100) # Makeup a numpy array within [0, 2π] and 100 elements 
y = np.sin(x) # Calculate the sine of x list
plt.plot(x, y) # Plot the result
```

#### Two Dimensional Numpy

```python
a=[[11,12,13],[21,22,23],[31,32,33]]
A = np.array(a) # Convert list to Numpy Array，Every element is the same type
A.ndim # # Show the numpy array dimensions  2
A.shape # A.shape  (3,3)
A.size # # Show the numpy array size  9
A[1, 2] # Access the element on the second row and third column  23
A[1][2] # Access the element on the second row and third column
A[0][0:2] # Access the element on the first row and first and second columns  array([11, 12])
A[0:2, 2] # Access the element on the first and second rows third column  array([13, 23])
Z = X + Y # Add X and Y
Z = 2 * Y # Multiply Y with 2
Z = X * Y # Multiply X with Y
Z = np.dot(A,B) # Calculate the dot product
np.sin(Z) # Calculate the sine of Z
C.T # Get the transposed of C
```

### Simple APIs

#### Create and Use APIs in Python

An API lets two pieces of software talk to each other. 

An essential type of API is a REST API (**Re**presentational **S**tate **T**ransfer APIs) that allows you to access resources via the internet. 

Preparation

```python
!pip install nba_api
def one_dict(list_dict):
    keys=list_dict[0].keys()
    out_dict={key:[] for key in keys}
    for dict_ in list_dict:
        for key, value in dict_.items():
            out_dict[key].append(value)
    return out_dict
```

Pandas API

```python
import pandas as pd
import matplotlib.pyplot as plt
dict_={'a':[11,21,31],'b':[12,22,32]} # create a dictionary
df=pd.DataFrame(dict_) #use the dataframe to communicate with the pandas API
df.head()
df.mean()
```

REST APIs

- Use the [NBA API](https://pypi.org/project/nba-api/) to determine how well the Golden State Warriors performed against the Toronto Raptors.
- Use the API do the determined number of points the Golden State Warriors won or lost by for each game.

```python
from nba_api.stats.static import teams #https://pypi.org/project/nba-api/
import matplotlib.pyplot as plt
nba_teams = teams.get_teams() #returns a list of dictionaries 
#The dictionary key id has a unique identifier for each team as a value
nba_teams[0:3]
dict_nba_team=one_dict(nba_teams) #create a dictionary
df_teams=pd.DataFrame(dict_nba_team)
df_teams.head()
df_warriors=df_teams[df_teams['nickname']=='Warriors']
id_warriors=df_warriors[['id']].values[0][0] #we now have an integer that can be used to request the Warriors information
from nba_api.stats.endpoints import leaguegamefinder
wget https://s3-api.us-geo.objectstorage.softlayer.net/cf-courses-data/CognitiveClass/PY0101EN/Chapter%205/Labs/Golden_State.pkl
file_name = "Golden_State.pkl"
games = pd.read_pickle(file_name)
games.head()
games_home=games [games ['MATCHUP']=='GSW vs. TOR'] #create two dataframes
games_away=games [games ['MATCHUP']=='GSW @ TOR']   #Home&Away
games_home.mean()['PLUS_MINUS']
games_away.mean()['PLUS_MINUS']
fig, ax = plt.subplots()  #plot out
games_away.plot(x='GAME_DATE',y='PLUS_MINUS', ax=ax)
games_home.plot(x='GAME_DATE',y='PLUS_MINUS', ax=ax)
ax.legend(["away", "home"])
plt.show()
```

#### Create Speech to Text Translator

Convert an audio file of an English speaker to text using a Speech to Text API

```python
!pip install PyJWT==1.7.1 ibm_watson wget
from ibm_watson import SpeechToTextV1 
import json
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
url_s2t = "" #URL
iam_apikey_s2t = "" #API keys
authenticator = IAMAuthenticator(iam_apikey_s2t) # create a Speech To Text Adapter object
s2t = SpeechToTextV1(authenticator=authenticator)
s2t.set_service_url(url_s2t)
!wget -O PolynomialRegressionandPipelines.mp3  https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-PY0101EN-SkillsNetwork/labs/Module%205/data/PolynomialRegressionandPipelines.mp3
filename='PolynomialRegressionandPipelines.mp3'
with open(filename, mode="rb")  as wav:
    response = s2t.recognize(audio=wav, content_type='audio/mp3')
response.result
from pandas.io.json import json_normalize
json_normalize(response.result['results'],"alternatives")
response
recognized_text=response.result['results'][0]["alternatives"][0]["transcript"]

```

Translate the English version to a Spanish version using a Language Translator API

```python
from ibm_watson import LanguageTranslatorV3
url_lt='https://gateway.watsonplatform.net/language-translator/api'
apikey_lt=''
version_lt='2018-05-01'
authenticator = IAMAuthenticator(apikey_lt)
language_translator = LanguageTranslatorV3(version=version_lt,authenticator=authenticator)
language_translator.set_service_url(url_lt)
language_translator
from pandas.io.json import json_normalize
json_normalize(language_translator.list_identifiable_languages().get_result(), "languages")
translation_response = language_translator.translate(\
    text=recognized_text, model_id='en-es')
translation_response
translation=translation_response.get_result()
translation
spanish_translation =translation['translations'][0]['translation']
spanish_translation 
translation_new = language_translator.translate(text=spanish_translation ,model_id='es-en').get_result()
translation_eng=translation_new['translations'][0]['translation']
translation_eng
```

#### HTTP and Requests

When the client use a web page, browser sends an HTTP request to the server where the page is hosted. The server tries to find the desired resource by default `index.html`. 

If request is successful, the server will send the object to the client in an `HTTP` response, this includes information like the type of the resource, the length of the resource, and other information.

The `HTTP` protocol allows you to send and receive information through the web including webpages, images, and other web resources.

Uniform resource locator (URL) is the most popular way to find resources on the web.

Request：`GET`，`POST`，`PUT`，`DELETE` method

```python
import requests
import os 
from PIL import Image
from IPython.display import IFrame
url='https://www.ibm.com/'
r=requests.get(url)
r.status_code #view the status code
print(r.request.headers)
print("request body:", r.request.body)
header=r.headers #view the HTTP response header
print(r.headers)
header['date']
header['Content-Type'] #Content-Type indicates the type of data
r.encoding #check the encoding
r.text[0:100]
# Use single quotation marks for defining string
url='https://gitlab.com/ibm/skills-network/courses/placeholder101/-/raw/master/labs/module%201/images/IDSNlogo.png'
r=requests.get(url) #make a get request
print(r.headers)
r.headers['Content-Type']
# An image is a response object that contains the image as a bytes-like object
path=os.path.join(os.getcwd(),'image.png')
with open(path,'wb') as f:
    f.write(r.content)
Image.open(path)  
```

Write `wget`

```
!wget -O /resources/data/Example1.txt https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-PY0101EN-SkillsNetwork/labs/Module%205/data/Example1.txt
```

Is Equal To:

```python
url='https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-PY0101EN-SkillsNetwork/labs/Module%205/data/Example1.txt'
path=os.path.join(os.getcwd(),'example1.txt')
r=requests.get(url)
with open(path,'wb') as f:
    f.write(r.content)
```

Get Request with URL Parameters

- We append `/get` in the Route indicate we would like to preform a `GET` request
- `url_get='http://httpbin.org/get'`
- A [query string](https://en.wikipedia.org/wiki/Query_string) is a part of a uniform resource locator (URL), this sends other information to the web server.

```python
payload={"name":"Joseph","ID":"123"}
r=requests.get(url_get,params=payload)
r.url
print("request body:", r.request.body)
print(r.status_code)
print(r.text)
r.headers['Content-Type']
r.json()
r.json()['args']
```

`POST` is used to send data to a server, but the `POST` request sends the data in a request body.

`url_post='http://httpbin.org/post'`

This endpoint will expect data as a file or as a form, a from is convenient way to configure an HTTP request to send data to a server.

```python
# To make a POST request we use the post() function, the variable payload is passed to the parameter data 
r_post=requests.post(url_post,data=payload) 

print("POST request URL:",r_post.url ) #the POST request has no name or value pairs
print("GET request URL:",r.url)
print("POST request body:",r_post.request.body) #compare the POST and GET 
print("GET request body:",r.request.body)
r_post.json()['form']
```

### Final Project

#### Analyzing US Economic Data and Building a Dashboard

[A template notebook is provided in the lab](https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-PY0101EN-SkillsNetwork/labs/FinalModule_Coursera/PY0101EN_Coursera_FinalAssignment.ipynb)

Examine how changes in GDP impact the unemployment rate.

```python
import pandas as pd
from bokeh.plotting import figure, output_file, show,output_notebook
output_notebook()
# Define the function make_dashboard
def make_dashboard(x, gdp_change, unemployment, title, file_name):
    output_file(file_name)
    p = figure(title=title, x_axis_label='year', y_axis_label='%')
    p.line(x.squeeze(), gdp_change.squeeze(), color="firebrick", line_width=4, legend="% GDP change")
    p.line(x.squeeze(), unemployment.squeeze(), line_width=4, legend="% unemployed")
    show(p)
# The dictionary links contain the CSV files with all the data.    
links={'GDP':'https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-PY0101EN-SkillsNetwork/labs/FinalModule_Coursera/data/clean_gdp.csv',\
       'unemployment':'https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMDeveloperSkillsNetwork-PY0101EN-SkillsNetwork/labs/FinalModule_Coursera/data/clean_unemployment.csv'}
```

Question 1: Create a dataframe that contains the GDP data and display the first five rows of the dataframe.

```python
csv_path=links['GDP']  # links["GDP"] contains the path or name of the file.
df=pd.read_csv(csv_path)
df.head()
```

Question 2: Create a dataframe that contains the unemployment data. Display the first five rows of the dataframe.

```python
csv_path=links['unemployment']
df=pd.read_csv(csv_path)
df.head()
```

Question 3: Display a dataframe where unemployment was greater than 8.5%.

```python
csv_path=links['unemployment']
df=pd.read_csv(csv_path)
df1=df[df['unemployment']>8.5]
df1
```

Question 4: Use the function make_dashboard to make a dashboard

```python
# Create your dataframe with column date
csv_path=links['GDP']
gdp_dataframe=pd.read_csv(csv_path)
x = pd.DataFrame(gdp_dataframe, columns=['date'])
x.head()
# Create your dataframe with column change-current
gdp_change = pd.DataFrame(gdp_dataframe, columns=['change-current'])
gdp_change.head()
# Create your dataframe with column unemployment
csv_path=links['unemployment']
unemploy_dataframe= pd.read_csv(csv_path)
unemployment = pd.DataFrame(unemploy_dataframe, columns=['unemployment'])
unemployment.head()
# Give your dashboard a string title
title = "Unemployement stats & GDP"
file_name = "index.html"
# Fill up the parameters in the following function:
make_dashboard(x=x, gdp_change=gdp_change, unemployment=unemployment, title=title, file_name=file_name)
```

#### My Work

- [Final Assignment Notebook Url](https://jp-tok.dataplatform.cloud.ibm.com/analytics/notebooks/v2/86e30bef-41d8-4b38-a8f3-b0be3f7ca27d/view?access_token=7c7aa7dd80dcca2762f88c50a413cdaed865b0d218dded9d0afcf730680a7cf1) (May not be accessible from Mainland China)

  ![Unemployment stats & GDP](https://hexo.bezhuang.cn/img/Python-for-DS&AI.png)

### Assignments

- Visit my [Github Repository](https://github.com/Bezhuang/IBM-Data-Science)
