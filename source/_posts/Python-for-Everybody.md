---
title: Python for everybody
date: 2020-05-14
tags: []
categories: 待分类
references: 
  - title: Python学习-PY4E作业
    url: https://blog.csdn.net/u012348774/article/details/78106407
---

> The Python for Everybody Specialization provided by UNIVERSITY OF MICHIGAN introduces fundamental programming concepts including data structures, networked application program interfaces, and databases, using the Python programming language. Python for Everybody is a completely open-source course, you can find all the notes and textbooks on its official [website](https://www.py4e.com/), so this note will only contain my solution to all post-lesson exercises in this course.

<!--more-->

![](https://hexo.bezhuang.cn/img/Coursera-py4e.png)

### Chapter 1

#### Question 1

Write a program that uses a **print** statement to say 'hello world' as shown in 'Desired Output'.
**Desired Output**

```
hello world
```

**Solution**

```python
print("hello world")
```

### Chapter 2

#### Question 1

Write a program to prompt the user for hours and rate per hour using input to compute gross pay. Use 35 hours and a rate of 2.75 per hour to test the program (the pay should be 96.25). You should use **input** to read a string and **float()** to convert the string to a number. Do not worry about error checking or bad user data.
**Desired Output**

```
Pay: 96.25
```

**Solution**

```
hrs = input("Enter Hours: ")
rat = input("Enter Rates: ")
pay = float(hrs) * float(rat)
print("Pay: " + str(pay))
```

### Chapter 3

#### Question 1

Write a program to prompt the user for hours and rate per hour using input to compute gross pay. Pay the hourly rate for the hours up to 40 and 1.5 times the hourly rate for all hours worked above 40 hours. Use 45 hours and a rate of 10.50 per hour to test the program (the pay should be 498.75). You should use **input** to read a string and **float()** to convert the string to a number. Do not worry about error checking the user input - assume the user types numbers properly.
**Desired Output**

```
498.75
```

**Solution**

```
hrs = input("Enter Hours:")
h = float(hrs)
rat = input("Enter Rates:")
r = float(rat)
if h <=40:
    pay = h * r
else:
    pay = 40 * r + (h - 40) * r * 1.5
print(str(pay))
```

#### Question 2

Write a program to prompt for a score between 0.0 and 1.0. If the score is out of range, print an error. If the score is between 0.0 and 1.0, print a grade using the following table:
Score Grade
\>= 0.9 A
\>= 0.8 B
\>= 0.7 C
\>= 0.6 D
< 0.6 F
If the user enters a value out of range, print a suitable error message and exit. For the test, enter a score of 0.85.
**Desired Output**

```
B
```

**Solution**

```
score = input("Enter Score: ")
sco = float(score)
if 0.0 <= sco <= 1.0:
    if sco >= 0.9:
        grade = "A"
    elif sco >= 0.8:
        grade = "B"
    elif sco >= 0.7:
        grade = "C"
    elif sco >= 0.6:
        grade = "D"
    else:
        grade = "F"
    print(grade)
else:
    print("error")
```

### Chapter 4

#### Question 1

Write a program to prompt the user for hours and rate per hour using input to compute gross pay. Pay should be the normal rate for hours up to 40 and time-and-a-half for the hourly rate for all hours worked above 40 hours. Put the logic to do the computation of pay in a function called **computepay()** and use the function to do the computation. The function should return a value. Use 45 hours and a rate of 10.50 per hour to test the program (the pay should be 498.75). You should use **input** to read a string and **float()** to convert the string to a number. Do not worry about error checking the user input unless you want to - you can assume the user types numbers properly. Do not name your variable sum or use the sum() function.
**Desired Output**

```
Pay 498.75
```

**Solution**

```
def computepay(h,r):
    if h <= 40:
        p = h * r
    else:
        p = 40 * r + (h - 40) * 1.5 * r
    return p
hrs = input("Enter Hours:")
ho = float(hrs)
rat = input("Enter Rates:")
ro = float(rat)
p = computepay(ho,ro)
print("Pay",p)
```

### Chapter 5

#### Question 1

Write a program that repeatedly prompts a user for integer numbers until the user enters 'done'. Once 'done' is entered, print out the largest and smallest of the numbers. If the user enters anything other than a valid number catch it with a try/except and put out an appropriate message and ignore the number. Enter 7, 2, bob, 10, and 4 and match the output below.
**Desired Output**

```
Invalid input
Maximum is 10
Minimum is 2
```

**Solution**

```
largest = None
smallest = None
shuzi = []
while True:
    num = input("Enter a number: ")
    if num == "done" : break
    else:
        try:
            numm = int(num)
            shuzi.append(numm)
        except:
            print("Invalid input")
            continue
largest = max(shuzi)
smallest = min(shuzi)
print("Maximum is", largest)
print("Minimum is", smallest)
```

### Chapter 6

#### Question 1

Write code using find() and string slicing (see section 6.10) to extract the number at the end of the line below. Convert the extracted value to a floating point number and print it out.
**Desired Output**

```
0.8475
```

**Solution**

```
text = "X-DSPAM-Confidence:    0.8475";
shuziqian = text.find(':')
number = float(text[shuziqian+1:])
print(number)
```

### Chapter 7

#### Question 1

Write a program that prompts for a file name, then opens that file and reads through the file, looking for lines of the form:

```
X-DSPAM-Confidence:    0.8475
```

Count these lines and extract the floating point values from each of the lines and compute the average of those values and produce an output as shown below. Do not use the sum() function or a variable named sum in your solution.
You can download the sample data at [http://www.py4e.com/code3/mbox-short.txt](https://www.py4e.com/code3/mbox-short.txt) when you are testing below enter **mbox-short.txt** as the file name.
**Desired Output**

```
Average spam confidence: 0.750718518519
```

**Solution**

```
# Use the file name mbox-short.txt as the file name
fname = input("Enter file name: ")
fh = open(fname)
value = 0
count = 0
for line in fh:
    if not line.startswith("X-DSPAM-Confidence:") :
        continue
    shuziqian = line.find(':')+1
    value = float(line[shuziqian:]) + value
    count = count + 1
print("Average spam confidence:",value / count)
```

### Chapter 8

#### Question 1

Open the file **romeo.txt** and read it line by line. For each line, split the line into a list of words using the **split()** method. The program should build a list of words. For each word on each line check to see if the word is already in the list and if not append it to the list. When the program completes, sort and print the resulting words in alphabetical order.
You can download the sample data at [http://www.py4e.com/code3/romeo.txt](https://www.py4e.com/code3/romeo.txt)
**Desired Output**

```
['Arise', 'But', 'It', 'Juliet', 'Who', 'already', 'and', 'breaks', 'east', 'envious', 'fair', 'grief', 'is', 'kill', 'light', 'moon', 'pale', 'sick', 'soft', 'sun', 'the', 'through', 'what', 'window', 'with', 'yonder']
```

**Solution**

```
fname = input("Enter file name: ")
fh = open(fname)
lst = list()
for line in fh:
    line = line.strip()
    words = line.split()
    for word in words:
        if word not in lst:
            lst.append(word)
print(sorted(lst))
```

#### Question 2

Open the file **mbox-short.txt** and read it line by line. When you find a line that starts with 'From ' like the following line:

```
From stephen.marquard@uct.ac.za Sat Jan  5 09:14:16 2008
```

You will parse the From line using split() and print out the second word in the line (i.e. the entire address of the person who sent the message). Then print out a count at the end.
**Hint:** make sure not to include the lines that start with 'From:'.
You can download the sample data at [http://www.py4e.com/code3/mbox-short.txt](https://www.py4e.com/code3/mbox-short.txt)
**Desired Output**

```
stephen.marquard@uct.ac.za
louis@media.berkeley.edu
zqian@umich.edu
rjlowe@iupui.edu
zqian@umich.edu
rjlowe@iupui.edu
cwen@iupui.edu
cwen@iupui.edu
gsilver@umich.edu
gsilver@umich.edu
zqian@umich.edu
gsilver@umich.edu
wagnermr@iupui.edu
zqian@umich.edu
antranig@caret.cam.ac.uk
gopal.ramasammycook@gmail.com
david.horwitz@uct.ac.za
david.horwitz@uct.ac.za
david.horwitz@uct.ac.za
david.horwitz@uct.ac.za
stephen.marquard@uct.ac.za
louis@media.berkeley.edu
louis@media.berkeley.edu
ray@media.berkeley.edu
cwen@iupui.edu
cwen@iupui.edu
cwen@iupui.edu
There were 27 lines in the file with From as the first word
```

**Solution**

```
fname = input("Enter file name: ")
if len(fname) < 1 : fname = "mbox-short.txt"
fh = open(fname)
count = 0
for line in fh:
    line = line.strip()
    if not line.startswith("From "):
        continue
    words = line.split()
    print(words[1])
    count = count + 1
print("There were", count, "lines in the file with From as the first word")
```

### Chapter 9

#### Question 1

Write a program to read through the **mbox-short.txt** and figure out who has sent the greatest number of mail messages. The program looks for 'From ' lines and takes the second word of those lines as the person who sent the mail. The program creates a Python dictionary that maps the sender's mail address to a count of the number of times they appear in the file. After the dictionary is produced, the program reads through the dictionary using a maximum loop to find the most prolific committer.
**Desired Output**

```
cwen@iupui.edu 5
```

**Solution**

```
fname = input("Enter file name: ")
if len(fname) < 1 : fname = "mbox-short.txt"

fh = open(fname)
count_dict = dict()

for line in fh:
    line = line.strip()
    if not line.startswith('From '):
        continue
    words = line.split()
    count_dict[words[1]] = 1 + count_dict.get(words[1],0)
sort_list = sorted([(v,k) for k,v in count_dict.items()],reverse=True)
print(sort_list[0][1],sort_list[0][0])
```

### Chapter 10

#### Question 1

Write a program to read through the **mbox-short.txt** and figure out the distribution by hour of the day for each of the messages. You can pull the hour out from the 'From ' line by finding the time and then splitting the string a second time using a colon.

```
From stephen.marquard@uct.ac.za Sat Jan  5 09:14:16 2008
```

Once you have accumulated the counts for each hour, print out the counts, sorted by hour as shown below.
**Desired Output**

```
04 3
06 1
07 1
09 2
10 3
11 6
14 1
15 2
16 4
17 2
18 1
19 1
```

**Solution**

```
fname = input("Enter file name: ")
if len(fname) < 1 : fname = "mbox-short.txt"
fh = open(fname)
count_dict = dict()
for line in fh:
    line = line.strip()
    if not line.startswith('From '):
        continue
    words = line.split()
    times = words[5].split(':')
    hours = times[0]
    count_dict[hours] = 1 + count_dict.get(hours,0)
count_list = sorted([(k,v) for k,v in count_dict.items()])
for k,v in count_list:
    print(k,v)
```

### Chapter 11

#### Question 1

**Handling The Data**
The basic outline of this problem is to read the file, look for integers using the **re.findall()**, looking for a regular expression of **'[0-9]+'** and then converting the extracted strings to integers and summing up the integers.
**Solution**

```
import re
file = open('C:/Users/dell/Desktop/regex_sum_501451.txt', 'r')
file_data = file.read()
numbers_str = re.findall('[0-9]+', file_data)
total = 0
for number_str in numbers_str:
    total = total + int(number_str)
print(total)
```

### Chapter 12

#### Question 1

**Exploring the HyperText Transport Protocol**
You are to retrieve the following document using the HTTP protocol in a way that you can examine the HTTP Response headers.

- http://data.pr4e.org/intro-short.txt
  There are three ways that you might retrieve this web page and look at the response headers:
- **Preferred:** Modify the [socket1.py](https://www.py4e.com/code3/socket1.py) program to retrieve the above URL and print out the headers and data. Make sure to **change** the code to retrieve the above URL - the values are different for each URL.
- Open the URL in a web browser with a developer console or FireBug and manually examine the headers that are returned.
- Use the **telnet** program as shown in lecture to retrieve the headers and content.
  **Desired Output**

```
HTTP/1.1 200 OK
Date: Sun, 01 Oct 2017 05:25:59 GMT
Server: Apache/2.4.7 (Ubuntu)
Last-Modified: Sat, 13 May 2017 11:22:22 GMT
ETag: “1d3-54f6609240717”
Accept-Ranges: bytes
Content-Length: 467
Cache-Control: max-age=0, no-cache, no-store, must-revalidate
Pragma: no-cache
Expires: Wed, 11 Jan 1984 05:00:00 GMT
Connection: close
Content-Type: text/plain
```

**Solution**

```
import socket

mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
mysock.connect(('data.pr4e.org', 80))
cmd = 'GET http://data.pr4e.org/intro-short.txt HTTP/1.0\r\n\r\n'.encode()
mysock.send(cmd)
while True:
    data = mysock.recv(512)
    if (len(data) < 1):
        break
    print(data.decode())
mysock.close()
```

#### Question 2

**Scraping Numbers from HTML using BeautifulSoup** In this assignment you will write a Python program similar to [http://www.py4e.com/code3/urllink2.py](https://www.py4e.com/code3/urllink2.py). The program will use **urllib** to read the HTML from the data files below, and parse the data, extracting numbers and compute the sum of the numbers in the file.
We provide two files for this assignment. One is a sample file where we give you the sum for your testing and the other is the actual data you need to process for the assignment.

- Sample data: http://py4e-data.dr-chuck.net/comments_42.html (Sum=2553)
- Actual data: http://py4e-data.dr-chuck.net/comments_501453.html (Sum ends with 35)
  You do not need to save these files to your folder since your program will read the data directly from the URL. **Note:** Each student will have a distinct data url for the assignment - so only use your own data url for analysis.
  **Solution**

```
from urllib.request import urlopen
from bs4 import BeautifulSoup
import ssl
# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
url = input('Enter - ')
html = urlopen(url, context=ctx).read()
# html.parser is the HTML parser included in the standard Python 3 library.
# information on other HTML parsers is here:
# http://www.crummy.com/software/BeautifulSoup/bs4/doc/#installing-a-parser
soup = BeautifulSoup(html, "html.parser")
# Retrieve all of the anchor tags
tags = soup('span')
total = 0
for tag in tags:
    # Look at the parts of a tag
    total = total + int(tag.contents[0])
print(total)
```

#### Question 3

**Following Links in Python**
In this assignment you will write a Python program that expands on [http://www.py4e.com/code3/urllinks.py](https://www.py4e.com/code3/urllinks.py). The program will use **urllib** to read the HTML from the data files below, extract the href= vaues from the anchor tags, scan for a tag that is in a particular position relative to the first name in the list, follow that link and repeat the process a number of times and report the last name you find.
We provide two files for this assignment. One is a sample file where we give you the name for your testing and the other is the actual data you need to process for the assignment

- Sample problem: Start at http://py4e-data.dr-chuck.net/known_by_Fikret.html
  Find the link at position **3** (the first name is 1). Follow that link. Repeat this process **4** times. The answer is the last name that you retrieve.
  Sequence of names: Fikret Montgomery Mhairade Butchi Anayah
  Last name in sequence: Anayah
- Actual problem: Start at: http://py4e-data.dr-chuck.net/known_by_Malaeka.html
  Find the link at position **18** (the first name is 1). Follow that link. Repeat this process **7** times. The answer is the last name that you retrieve.
  Hint: The first character of the name of the last page that you will load is: K
  **Solution**

```
  import urllib.request
import urllib.parse
import urllib.error
from bs4 import BeautifulSoup
import ssl
def findUrl(url, position):
    html = urllib.request.urlopen(url, context=ctx).read()
    soup = BeautifulSoup(html, 'html.parser')
    # Retrieve all of the anchor tags
    tags = soup('a')
    return tags[position].get('href', None)
# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
count_str = input('Enter count - ')
count = int(count_str)
position_str = input('Enter position - ')
position = int(position_str)-1
for i in range(count):
    if i == 0:
        url_now = input('Enter - ')
        print(url_now)
        url_now = findUrl(url_now, position)
        print(url_now)
    else:
        url_now = findUrl(url_now, position)
        print(url_now)
```

### Chapter 13

#### Question 1

**Extracting Data from XML**
In this assignment you will write a Python program somewhat similar to [http://www.py4e.com/code3/geoxml.py](https://www.py4e.com/code3/geoxml.py). The program will prompt for a URL, read the XML data from that URL using **urllib** and then parse and extract the comment counts from the XML data, compute the sum of the numbers in the file.
We provide two files for this assignment. One is a sample file where we give you the sum for your testing and the other is the actual data you need to process for the assignment.

- Sample data: http://py4e-data.dr-chuck.net/comments_42.xml (Sum=2553)
- Actual data: http://py4e-data.dr-chuck.net/comments_501455.xml (Sum ends with 78)
  You do not need to save these files to your folder since your program will read the data directly from the URL. **Note:** Each student will have a distinct data url for the assignment - so only use your own data url for analysis.
  **Solution**

```
import urllib.request
import urllib.parse
import urllib.error
import xml.etree.ElementTree as ET
url = 'http://py4e-data.dr-chuck.net/comments_501455.xml'
print('Retrieving', url)
uh = urllib.request.urlopen(url)
data = uh.read()
print('Retrieved', len(data), 'characters')
tree = ET.fromstring(data)
comments_node = tree.findall('comments')
comment_node = comments_node[0].findall('comment')
total = 0
for node in comment_node:
    total = total + int(node.find('count').text)
print(total)
```

#### Question 2

**Extracting Data from JSON**
In this assignment you will write a Python program somewhat similar to [http://www.py4e.com/code3/json2.py](https://www.py4e.com/code3/json2.py). The program will prompt for a URL, read the JSON data from that URL using **urllib** and then parse and extract the comment counts from the JSON data, compute the sum of the numbers in the file and enter the sum below:
We provide two files for this assignment. One is a sample file where we give you the sum for your testing and the other is the actual data you need to process for the assignment.

- Sample data: http://py4e-data.dr-chuck.net/comments_42.json (Sum=2553)
- Actual data: http://py4e-data.dr-chuck.net/comments_501456.json (Sum ends with 42)
  You do not need to save these files to your folder since your program will read the data directly from the URL. **Note:** Each student will have a distinct data url for the assignment - so only use your own data url for analysis.
  **Solution**

```
import urllib.request
import urllib.parse
import urllib.error
import json
url = 'http://py4e-data.dr-chuck.net/comments_501456.json'
print('Retrieving', url)
uh = urllib.request.urlopen(url)
data = uh.read()
info = json.loads(data.decode())
print('User count:', len(info))
comments_dic = info['comments']
total = 0
for item in comments_dic:
    total = total + int(item['count'])
print(total)
```

#### Question 3

**Calling a JSON API**
In this assignment you will write a Python program somewhat similar to [http://www.py4e.com/code3/geojson.py](https://www.py4e.com/code3/geojson.py). The program will prompt for a location, contact a web service and retrieve JSON for the web service and parse that data, and retrieve the first **place_id** from the JSON. A place ID is a textual identifier that uniquely identifies a place as within Google Maps.
**API End Points**
To complete this assignment, you should use this API endpoint that has a static subset of the Google Data:

```
http://py4e-data.dr-chuck.net/json?
```

This API uses the same parameter (address) as the Google API. This API also has no rate limit so you can test as often as you like. If you visit the URL with no parameters, you get "No address..." response.
To call the API, you need to include a **key=** parameter and provide the address that you are requesting as the **address=** parameter that is properly URL encoded using the **urllib.parse.urlencode()** function as shown in [http://www.py4e.com/code3/geojson.py](https://www.py4e.com/code3/geojson.py)
Make sure to check that your code is using the API endpoint is as shown above. You will get _different_ results from the **geojson** and **json** endpoints so make sure you are using the same end point as this autograder is using.
**Solution**

```
import urllib.request
import urllib.parse
import urllib.error
import json
import ssl
api_key = False
# If you have a Google Places API key, enter it here
# api_key = 'AIzaSy___IDByT70'
# https://developers.google.com/maps/documentation/geocoding/intro
if api_key is False:
    api_key = 42
    serviceurl = 'http://py4e-data.dr-chuck.net/json?'
else:
    serviceurl = 'https://maps.googleapis.com/maps/api/geocode/json?'
# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
while True:
    address = input('Enter location: ')
    if len(address) < 1:
        break
    parms = dict()
    parms['address'] = address
    if api_key is not False:
        parms['key'] = api_key
    url = serviceurl + urllib.parse.urlencode(parms)
    print('Retrieving', url)
    uh = urllib.request.urlopen(url, context=ctx)
    data = uh.read().decode()
    print('Retrieved', len(data), 'characters')
    try:
        js = json.loads(data)
    except:
        js = None
    if not js or 'status' not in js or js['status'] != 'OK':
        print('==== Failure To Retrieve ====')
        print(data)
        continue
    print(json.dumps(js, indent=4))
    lat = js['results'][0]['geometry']['location']['lat']
    lng = js['results'][0]['geometry']['location']['lng']
    print('lat', lat, 'lng', lng)
    location = js['results'][0]['formatted_address']
    print(location)
```

### Chapter 15

#### Question 1

create a SQLITE database or use an existing database and create a table in the database called "Ages":

```
CREATE TABLE Ages (
  name VARCHAR(128),
  age INTEGER
)
```

Then make sure the table is empty by deleting any rows that you previously inserted, and insert these rows and only these rows with the following commands:

```
DELETE FROM Ages;
INSERT INTO Ages (name, age) VALUES ('Muqadaas', 29);
INSERT INTO Ages (name, age) VALUES ('Sabine', 13);
INSERT INTO Ages (name, age) VALUES ('Brydon', 35);
INSERT INTO Ages (name, age) VALUES ('Jayla', 39);
```

Once the inserts are done, run the following SQL command:

```
SELECT hex(name || age) AS X FROM Ages ORDER BY X
```

#### Question 2

**Counting Organizations**
This application will read the mailbox data (mbox.txt) and count the number of email messages per organization (i.e. domain name of the email address) using a database with the following schema to maintain the counts.

```
CREATE TABLE Counts (org TEXT, count INTEGER)
```

When you have run the program on **mbox.txt** upload the resulting database file above for grading.
If you run the program multiple times in testing or with dfferent files, make sure to empty out the data before each run.
You can use this code as a starting point for your application: [http://www.py4e.com/code3/emaildb.py](https://www.py4e.com/code3/emaildb.py).
The data file for this application is the same as in previous assignments: [http://www.py4e.com/code3/mbox.txt](https://www.py4e.com/code3/mbox.txt).
**Solution**

```
import sqlite3
conn = sqlite3.connect('emaildb2.sqlite')
cur = conn.cursor()
cur.execute('''
DROP TABLE IF EXISTS Counts''')
cur.execute('''
CREATE TABLE Counts (org TEXT, count INTEGER)''')
fh = open('C:/Users/dell/Desktop/mbox.txt', 'r')
list_1 = []
for line in fh:
    if not line.startswith('From: '):
        continue
    pieces = line.split()
    email = pieces[1]
    dom = email.find('@')
    org = email[dom+1:len(email)]
    cur.execute('SELECT count FROM Counts WHERE org = ? ', (org,))
    row = cur.fetchone()
    if row is None:
        cur.execute('''INSERT INTO Counts (org, count)
                VALUES (?, 1)''', (org,))
    else:
        cur.execute('UPDATE Counts SET count = count + 1 WHERE org = ?',
                    (org,))
conn.commit()
# https://www.sqlite.org/lang_select.html
sqlstr = 'SELECT org, count FROM Counts ORDER BY count DESC LIMIT 10'
for row in cur.execute(sqlstr):
    print(str(row[0]), row[1])
cur.close()
```

#### Question 3

**Musical Track Database**
This application will read an iTunes export file in XML and produce a properly normalized database with this structure:

```
CREATE TABLE Artist (
    id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    name    TEXT UNIQUE
);
CREATE TABLE Genre (
    id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    name    TEXT UNIQUE
);
CREATE TABLE Album (
    id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    artist_id  INTEGER,
    title   TEXT UNIQUE
);
CREATE TABLE Track (
    id  INTEGER NOT NULL PRIMARY KEY
        AUTOINCREMENT UNIQUE,
    title TEXT  UNIQUE,
    album_id  INTEGER,
    genre_id  INTEGER,
    len INTEGER, rating INTEGER, count INTEGER
);
```

If you run the program multiple times in testing or with different files, make sure to empty out the data before each run.
You can use this code as a starting point for your application: [http://www.py4e.com/code3/tracks.zip](https://www.py4e.com/code3/tracks.zip). The ZIP file contains the **Library.xml** file to be used for this assignment. You can export your own tracks from iTunes and create a database, but for the database that you turn in for this assignment, only use the **Library.xml** data that is provided.
To grade this assignment, the program will run a query like this on your uploaded database and look for the data it expects to see:

```
SELECT Track.title, Artist.name, Album.title, Genre.name
    FROM Track JOIN Genre JOIN Album JOIN Artist
    ON Track.genre_id = Genre.ID and Track.album_id = Album.id
        AND Album.artist_id = Artist.id
    ORDER BY Artist.name LIMIT 3
```

The expected result of the modified query on your database is: (shown here as a simple HTML table with titles)
**Solution**

```
import xml.etree.ElementTree as ET
import sqlite3
conn = sqlite3.connect('trackdb.sqlite')
cur = conn.cursor()
# Make some fresh tables using executescript()
cur.executescript('''
DROP TABLE IF EXISTS Artist;
DROP TABLE IF EXISTS Album;
DROP TABLE IF EXISTS Genre;
DROP TABLE IF EXISTS Track;
CREATE TABLE Artist (
    id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    name    TEXT UNIQUE
);
CREATE TABLE Album (
    id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    artist_id  INTEGER,
    title   TEXT UNIQUE
);
CREATE TABLE Genre (
    id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    name   TEXT UNIQUE
);
CREATE TABLE Track (
    id  INTEGER NOT NULL PRIMARY KEY
        AUTOINCREMENT UNIQUE,
    title TEXT  UNIQUE,
    album_id  INTEGER,
    genre_id  INTEGER,
    len INTEGER, rating INTEGER, count INTEGER
);
''')
fname = input('Enter file name: ')
if (len(fname) < 1):
    fname = 'Library.xml'
# <key>Track ID</key><integer>369</integer>
# <key>Name</key><string>Another One Bites The Dust</string>
# <key>Artist</key><string>Queen</string>
def lookup(d, key):
    found = False
    for child in d:
        if found:
            return child.text
        if child.tag == 'key' and child.text == key:
            found = True
    return None
stuff = ET.parse(fname)
all = stuff.findall('dict/dict/dict')
print('Dict count:', len(all))
for entry in all:
    if (lookup(entry, 'Track ID') is None):
        continue
    name = lookup(entry, 'Name')
    artist = lookup(entry, 'Artist')
    album = lookup(entry, 'Album')
    genre = lookup(entry, 'Genre')
    count = lookup(entry, 'Play Count')
    rating = lookup(entry, 'Rating')
    length = lookup(entry, 'Total Time')
    if name is None or artist is None or album is None:
        continue
    print(name, artist, album, genre, count, rating, length)
    cur.execute('''INSERT OR IGNORE INTO Artist (name)
        VALUES ( ? )''', (artist, ))
    cur.execute('SELECT id FROM Artist WHERE name = ? ', (artist, ))
    artist_id = cur.fetchone()[0]
    cur.execute('''INSERT OR IGNORE INTO Album (title, artist_id)
        VALUES ( ?, ? )''', (album, artist_id))
    cur.execute('SELECT id FROM Album WHERE title = ? ', (album, ))
    album_id = cur.fetchone()[0]
    cur.execute('''INSERT OR IGNORE INTO Genre (name)
    VALUES ( ? )''', (genre, ))
    cur.execute('SELECT id FROM Genre WHERE name = ? ', (genre, ))
    genre_id = cur.fetchone()[0]
    cur.execute('''INSERT OR REPLACE INTO Track
        (title, album_id, genre_id, len, rating, count)
        VALUES ( ?, ?, ?, ?, ?, ?)''',
                (name, album_id, genre_id, length, rating, count))
    conn.commit()
```

#### Question 4

This application will read roster data in JSON format, parse the file, and then produce an SQLite database that contains a User, Course, and Member table and populate the tables from the data file.
You can base your solution on this code: [http://www.py4e.com/code3/roster/roster.py](https://www.py4e.com/code3/roster/roster.py) - this code is incomplete as you need to modify the program to store the **role** column in the **Member** table to complete the assignment.
Each student gets their own file for the assignment. Download [this file](https://www.py4e.com/tools/sql-intro/roster_data.php?PHPSESSID=4e9bbaef3d818a7530c32084639a353c) and save it as `roster_data.json`. Move the downloaded file into the same folder as your `roster.py` program.
Once you have made the necessary changes to the program and it has been run successfully reading the above JSON data, run the following SQL command:

```
SELECT hex(User.name || Course.title || Member.role ) AS X FROM
    User JOIN Member JOIN Course
    ON User.id = Member.user_id AND Member.course_id = Course.id
    ORDER BY X
```

Find the **first** row in the resulting record set and enter the long string that looks like **53656C696E613333**.
**Solution**

```
import json
import sqlite3
# PART 1: Creating the database
dbname = "roster.sqlite"
conn = sqlite3.connect(dbname)
cur = conn.cursor()
cur.executescript('''
	DROP TABLE IF EXISTS User;
	DROP TABLE IF EXISTS Course;
	DROP TABLE IF EXISTS Member;
	CREATE TABLE User (
		id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		name TEXT UNIQUE
	);
	CREATE TABLE Course (
		id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
		title TEXT UNIQUE
	);
	CREATE TABLE Member (
		user_id INTEGER,
		course_id INTEGER,
		role INTEGER,
		PRIMARY KEY(user_id, course_id)
	)
''')
# Note: if we don't add UNIQUE after "User.name" and "Course.title",
# the IGNORE statement won't work and therefore we'll have duplicates
# PART 2: DESERIALIZING THE data
# The JSON data we're going to process is stored in an array form, with each
# item being also an array of three elements: one corresponding to the username
# one corresponding to the course name, and one indicating if the user is instructor
# None of them has any field title.
filename = "roster_data.json"
jsondata = open('C:/Users/dell/Desktop/roster_data.json')
data = json.load(jsondata)
# PART 3: INSERTING DATA
for entry in data:
    user = entry[0]
    course = entry[1]
    instructor = entry[2]
    # Inserting user
    user_statement = """INSERT OR IGNORE INTO User(name) VALUES( ? )"""
    SQLparams = (user, )
    cur.execute(user_statement, SQLparams)
    # Inserting course
    course_statement = """INSERT OR IGNORE INTO Course(title) VALUES( ? )"""
    SQLparams = (course, )
    cur.execute(course_statement, SQLparams)
    # Getting user and course id
    courseID_statement = """SELECT id FROM Course WHERE title = ?"""
    SQLparams = (course, )
    cur.execute(courseID_statement, SQLparams)
    courseID = cur.fetchone()[0]
    userID_statement = """SELECT id FROM User WHERE name = ?"""
    SQLparams = (user, )
    cur.execute(userID_statement, SQLparams)
    userID = cur.fetchone()[0]
    # Inserting the entry
    member_statement = """INSERT INTO Member(user_id, course_id, role)
		VALUES(?, ?, ?)"""
    SQLparams = (userID, courseID, instructor)
    cur.execute(member_statement, SQLparams)
# Saving the changes
conn.commit()
# PART 4: Testing and obtaining the results
test_statement = """
SELECT hex(User.name || Course.title || Member.role ) AS X FROM
    User JOIN Member JOIN Course
    ON User.id = Member.user_id AND Member.course_id = Course.id
    ORDER BY X
"""
cur.execute(test_statement)
result = cur.fetchone()
print("RESULT: " + str(result))
# Closing the connection
cur.close()
conn.close()
```
