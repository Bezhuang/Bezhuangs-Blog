---
title: Requests 和 cURL
date: 2022-09-05
references: 
  - title: 技术蛋老师
    url: https://space.bilibili.com/327247876
  - title: curl网站开发指南
    url: https://www.ruanyifeng.com/blog/2011/09/curl.html
  - title: requests库的使用
    url: https://www.jb51.net/article/236832.htm
categories: 工具与运维
tags: [HTTP, Python, 网络请求]
---

> 在开发过程中，我们常常需要和各种 API 打交道，cURL 和 Requests 都是很实用的 HTTP 客户端（库），[curl](https://curl.haxx.se/) 是一种命令行工具，作用是发出网络请求，然后得到和提取数据，显示在"标准输出"（stdout）上面。requests 是 Python 语言的第三方的库，专门用于发送 HTTP 请求，使用起来比 urllib 简洁很多。另外，关于 HTTP 协议的格式也可以参照[这篇笔记](/HTTP&Servlet)。以下为我在学习和实战练习过程中所做的总结，可供参考。

<!--more-->

### 一、GET、POST 和 URL

统一资源定位符（URL）是用于完整地描述互联网上网页和其他资源的地址的一种标识方法。一次网页访问包括：通过 DNS 解析 URL 中域名对应的服务器主机 IP 地址，与服务器主机三次握手建立 TCP 连接，发送 HTTP 请求，获取服务器返回的数据，浏览器解析前端文件，渲染页面。

GET 和 POST 是 HTTP 最常用的两大请求方法。GET 是 HTTP 的默认方法，用于检索和获取网页内容，而 POST 方法的含义更倾向于创建、更新。GET 使用 URL 或 Cookie 传参，而和 GET 不一样的是，POST 请求内容不会在 URL 上显示，而是会出现在请求主体中。

GET 和 POST 底层都是使用 TCP 链接。GET 的请求方式是将 HTTP 的请求头（header）和请求行中的 data 一并发往服务端，也就是一条 TCP 数据包发送，这就会有两个问题：数据量有限，依赖于 TCP 负载能力，所以携带的数据量很大的情况下，容易造成重发。所有的携带的数据只能接受转化成 ASCII 字符。但是 POST 不一样，POST 使用两步走，先发送 HTTP 的 header，然后再传输 data，数据类型也不受限制，而且数据隐秘性比较好。

### 二、cURL（Command Line URL Viewer）

cURL 是一个利用 URL 语法在命令行下工作的文件传输工具，1997 年首次发行。它支持文件上传和下载，所以是综合传输工具，但按传统，习惯称 cURL 为下载工具。 cURL 支持的通信协议有 FTP、FTPS、HTTP、HTTPS、TFTP、SFTP、Gopher、SCP、Telnet、DICT、FILE、LDAP、LDAPS、IMAP、POP3、SMTP 和 RTSP。

直接在 curl 命令后加上网址，就可以看到网页源码，如果对 API 请求，返回的就是 API 的数据了：

```
curl www.baidu.com
```

如果要把这个网页保存下来，可以使用 `-o` 参数，这就相当于使用 `wget` 命令了：

```
curl -o [文件名] www.baidu.com
curl --limit-rate 100k -o [文件名] www.baidu.com
```

有的网址是自动重定向的。使用 `-L` 参数，curl 就会跳转到新的网址：

```
curl -L www.bilibili.com
```

`-i `参数可以显示 `http response` 的头信息，连同网页代码一起：

```
curl -i www.bilibili.com
```

`-I` 参数则是只显示 `http response` 的头信息。

```
curl -I www.bilibili.com
```

`-v` 参数可以显示一次 HTTP 通信的整个过程，包括端口连接和 `http response` 头信息：

```
curl -v www.baidu.com
```

发送表单信息有 GET 和 POST 两种方法。

GET 方法相对简单，只要把数据附在网址后面就行：

```
curl example.com/form.cgi?data=xxx
```

POST 方法必须把数据和网址分开，curl 就要用到 `--data` 参数：

```
curl -X POST --data "data=xxx" example.com/form.cgi
```

如果你的数据没有经过表单编码，还可以让 curl 为你编码，参数是 `--data-urlencode`：

```
curl -X POST--data-urlencode "date=April 1" example.com/form.cgi
```

curl 默认的 HTTP 动词是 GET，使用 `-X` 参数可以支持其他动词，例如上文的 `-XPOST`：

```
curl -XPOST example.com/posts -d '{"title": "bezhuang"}' 
```

要更新数据可以用 `-XPUT` ，把更新数据放在 `-d` 后面即可。

```
curl -XPUT www.example.com -d '{"title": "another"; "id": "2"}' 
```

同理，删除使用：

```
curl -X DELETE www.example.com
```

假定文件上传的表单是下面这样：

```html
<form method="POST" enctype='multipart/form-data' action="upload.cgi">
    <input type=file name=upload>
    <input type=submit name=press value="OK">
</form>
```

你可以用 curl 这样上传文件：

```
curl --form upload=@localfilename --form press=OK [URL]
```

有时你需要在 `http request` 头信息中，提供一个 `referer` 字段，表示你是从哪里跳转过来的：

```
curl --referer http://www.example.com http://www.example.com
```

User Agent 字段用来表示客户端的设备信息。服务器有时会根据这个字段，针对不同设备，返回不同格式的网页，比如手机版和桌面版，curl 可以这样模拟：

```
curl --user-agent "[User Agent]" [URL]
```

使用 `--cookie` 参数，可以让 curl 发送 cookie：

```
curl --cookie "name=xxx" www.example.com
```

至于具体的 cookie 的值，可以从 `http response` 头信息的 `Set-Cookie` 字段中得到。

`-c cookie-file `可以保存服务器返回的 cookie 到文件，`-b cookie-file` 可以使用这个文件作为 cookie 信息，进行后续的请求：

```
curl -c cookies http://example.com
curl -b cookies http://example.com
```

有时需要在 `http request` 之中，自行增加一个头信息。`--header` 参数就可以起到这个作用：

```
curl --header "Content-Type:application/json" http://example.com
```

有些网域需要 HTTP 认证，这时 curl 需要用到 `--user` 参数：

```
curl --user name:password example.com
```

### 三、Requests 库

requests 属于第三方库，Python 不内置，因此需要我们 `pip` 安装，安装完成后 `import` 一下，正常则说明可以开始使用了。

`requests.get()` 用于请求目标网站，类型是一个 `HTTP response` 类型：

```python
import requests

response = requests.get('http://www.baidu.com')
print(response.status_code)  # 打印状态码
print(response.url)          # 打印请求url
print(response.headers)      # 打印头信息
print(response.cookies)      # 打印cookie信息
print(response.text)  #以文本形式打印网页源码
print(response.content) #以字节流形式打印
print(response.content.decode("utf-8")) #解决了通过response.text直接返回显示乱码的问题
response.encoding="utf-8" #避免乱码的问题发生
```

各种请求方式：

```python
import requests

requests.get('http://httpbin.org/get')
requests.post('http://httpbin.org/post')
requests.put('http://httpbin.org/put')
requests.delete('http://httpbin.org/delete')
requests.head('http://httpbin.org/get')
requests.options('http://httpbin.org/get')
```

基本的 GET 请求：

```python
import requests

response = requests.get('http://httpbin.org/get')
print(response.text)
```

带参数的 GET 请求：

1.   直接将参数放在 url 内：

```python
import requests

response = requests.get(http://httpbin.org/get?name=gemey&age=22)
print(response.text)
```

2.   先将参数填写在 `dict` 中，发起请求时 `params` 参数指定为 `dict`：

```python
import requests

data = {
    'name': 'tom',
    'age': 20
}
response = requests.get('http://httpbin.org/get', params=data)
print(response.text)
```

解析 json：

```python
import requests

response = requests.get('http://httpbin.org/get')
print(response.text)
print(response.json())  #response.json()方法同json.loads(response.text)
print(type(response.json()))
```

-   如果 JSON 解码失败， 将会抛出 `ValueError: No JSON object could be decoded` 异常。而成功调用 `response.json()` 并不意味着响应的成功。有的服务器会在失败的响应中包含一个 JSON 对象（比如 HTTP 500 的错误细节）。这种 JSON 会被解码返回。要检查请求是否成功，请使用 `r.raise_for_status()` 或者检查 `response.status_code` 是否和你的期望相同

保存一个二进制文件，二进制内容为 `response.content`：

```python
import requests

response = requests.get('http://img.ivsky.com/img/tupian/pre/201708/30/kekeersitao-002.jpg')
b = response.content
with open('F://fengjing.jpg','wb') as f:
    f.write(b)
```

添加 `HTTP headers` 信息：

```
import requests
heads = {}
heads['User-Agent'] = 'Mozilla/5.0 ' \
                          '(Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 ' \
                          '(KHTML, like Gecko) Version/5.1 Safari/534.50'
 response = requests.get('http://www.baidu.com',headers=headers)
```

使用代理，同添加 `headers` 方法，代理参数也要是一个 `dict`，这里使用 `requests` 库爬取了 IP 代理网站的 IP 与端口和类型：

```python
import requests
import re

def get_html(url):
    proxy = {
        'http': '120.25.253.234:812',
        'https': '163.125.222.244:8123'
    }
    heads = {}
    heads['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0'
    req = requests.get(url, headers=heads,proxies=proxy)
    html = req.text
    return html

def get_ipport(html):
    regex = r'<td data-title="IP">(.+)</td>'
    iplist = re.findall(regex, html)
    regex2 = '<td data-title="PORT">(.+)</td>'
    portlist = re.findall(regex2, html)
    regex3 = r'<td data-title="类型">(.+)</td>'
    typelist = re.findall(regex3, html)
    sumray = []
    for i in iplist:
        for p in portlist:
            for t in typelist:
                pass
            pass
        a = t+','+i + ':' + p
        sumray.append(a)
    print('高匿代理')
    print(sumray)


if __name__ == '__main__':
    url = 'http://www.kuaidaili.com/free/'
    get_ipport(get_html(url))
```

基本 POST 请求：

```python
import requests

data = {'name':'tom','age':'22'}

response = requests.post('http://httpbin.org/post', data=data)
```

获取 cookie：

```python
import requests

response = requests.get('http://www.baidu.com')
print(response.cookies)
print(type(response.cookies))
for k,v in response.cookies.items():
    print(k+':'+v)
```

会话维持：

```python
import requests

session = requests.Session()
session.get('http://httpbin.org/cookies/set/number/12345')
response = session.get('http://httpbin.org/cookies')
print(response.text)
```

证书验证设置：

```python
import requests
from requests.packages import urllib3

urllib3.disable_warnings()  #从urllib3中消除警告
response = requests.get('https://www.12306.cn',verify=False)  #证书验证设为FALSE
print(response.status_code)
```

超时异常捕获：

```python
import requests
from requests.exceptions import ReadTimeout

try:
    res = requests.get('http://httpbin.org', timeout=0.1)
    print(res.status_code)
except ReadTimeout:
    print(timeout)
```

异常处理，在你不确定会发生什么错误时，尽量使用 `try…except` 来捕获异常：

```python
import requests
from requests.exceptions import ReadTimeout,HTTPError,RequestException

try:
    response = requests.get('http://www.baidu.com',timeout=0.5)
    print(response.status_code)
except ReadTimeout:
    print('timeout')
except HTTPError:
    print('httperror')
except RequestException:
    print('reqerror')
```
