---
title: Selenium for Python
date: 2022-12-01
references:
  - title: Selenium爬虫快速入门（Python版）
    url: https://www.bilibili.com/video/BV1RZ4y147zD
  - title: Selenium for Python
    url: http://selenium-python.readthedocs.io/index.html
categories: 工具与运维
tags: [Selenium, 爬虫, Python]
---

> [Selenium](http://www.seleniumhq.org/) 是一个 Web 的自动化测试工具，最初是为网站自动化测试而开发的，Selenium 可以直接运行在浏览器上，它支持所有主流的浏览器。因为 Selenium 可以控制浏览器发送请求，并获取网页数据，因此可以应用于爬虫领域。Selenium 可以根据我们的指令，让浏览器自动加载页面，获取需要的数据，甚至页面截屏，或者判断网站上某些动作是否发生。Selenium Python bindings 提供了一个简单的 API，让你使用 Python 和 Selenium WebDriver 来编写功能/校验测试。 以下为我在学习和实战练习过程中所做的笔记，可供参考。

<!--more-->

### 一、Selenium 概述

Selenium 支持多平台、多浏览器、多语言去实现自动化测试，是一个开源和可移植的 Web 测试框架，支持并行测试执行，从而减少了时间并提高了测试效率。利用它，我们可以编写相关的自动化程序，让程序完全像人一样在浏览器里面操作 Web 界面，比如模拟鼠标点击、模拟键盘输入等等。不但能够操作 Web 界面，还能从 Web 中获取信息，并且相对来说，使用 Selenium 来获取信息更加简单，它的基本原理是我们编写自动化程序之后利用浏览器驱动直接对浏览器进行操作，只要我们用户能在浏览器上获得的信息使用 Selenium 都可以获得。

安装 Selenium：

~~~sh
pip install selenium==3.3.1 4
~~~

### 二、浏览器驱动

Selenium 自己不带浏览器，不支持浏览器的功能，它需要与第三方浏览器结合在一起才能使用。浏览器驱动用于使用 selenium 操控本地浏览器执行自动化操作。根据本地电脑 Chrome 的版本需要下载对应的﻿﻿[ ChromeDriver](https://npmmirror.com/mirrors/chromedriver)，否则无法操控 Chrome 浏览器使用 Selenium 启动。其他浏览器也可以下载对应的驱动包，例如：[新版 Edge 驱动](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/#downloads)，[Firefox 驱动](https://github.com/mozilla/geckodriver/releases)。

驱动包不需要安装，只需要解压到 `/usr/local/bin` 目录，后续会在代码中调用：

```sh
mv ~/Downloads/msedgedriver  /usr/local/bin
```

由于 Safari 浏览器本身已经集成了 `safaridriver`，只要勾选 Safari - 开发 - 允许远程自动化并在终端输入开启即可：

```sh
safaridriver --enable
```

### 三、控制浏览器自动网页

控制 Safari 浏览器打开网页：

```python
# 导入 webdriver
from selenium import webdriver
from time import sleep
# 调用环境变量指定的浏览器创建浏览器对象
driver = webdriver.Safari()
# 隐性等待设置了一个时间，在一段时间内网页是否加载完成，如果完成了，就进行下一步；在设置的时间内没有加载完成，则会报超时加载。
driver.implicitly_wait(10)
# get方法会一直等到页面被完全加载，然后才会继续程序
driver.get('https://www.baidu.com')
# id="kw"是百度搜索输入框，输入字符串"长城"
driver.find_element('id', 'kw').send_keys('长城')
# id="su"是百度搜索按钮，click() 是模拟点击
driver.find_element('id', 'su').click()
# 等待一定时间
sleep(5)
# 关闭浏览器
driver.quit()
```

当然也可以调用 Chrome 驱动，控制 Chrome 浏览器打开网页：

~~~python
# 导入 webdriver
from selenium import webdriver
from selenium.webdriver.common.by import By
# 调用键盘按键操作时需要引入的Keys包
from selenium.webdriver.common.keys import Keys
# 调用环境变量指定的PhantomJS浏览器创建浏览器对象
driver = webdriver.Chrome("/usr/local/bin/chromedriver")
# get方法会一直等到页面被完全加载，然后才会继续程序，通常测试会在这里选择 time.sleep(2)
driver.get("http://www.baidu.com/")
# id="kw"是百度搜索输入框，输入字符串"长城"
driver.find_element(By.CSS_SELECTOR,"#kw").send_keys("长城")
# id="su"是百度搜索按钮，click() 是模拟点击
driver.find_element(By.CSS_SELECTOR,"#su").click()
# 关闭浏览器
driver.quit()
~~~

### 四、常用操作

#### 元素定位

获取单个元素：

~~~python
driver.find_element(By.ID,"inputOriginal")
driver.find_element(By.CSS_SELECTOR,"#inputOriginal")
driver.find_element(By.TAG_NAME,"div")
driver.find_element(By.NAME,"username")
driver.find_element(By.LINK_TEXT,"下一页")
~~~

-   如果找不到相应的元素会报错：`selenium.common.exceptions.NoSuchElementException: Message: no such element: Unable to locate element: xx`。

获取多个元素：

~~~python
driver.find_elements(By.ID,"inputOriginal")
driver.find_elements(By.CSS_SELECTOR,"#inputOriginal")
driver.find_elements(By.TAG_NAME,"div")
driver.find_elements(By.NAME,"username")
driver.find_elements(By.LINK_TEXT,"下一页")
~~~

访问有道翻译网站，输入单词，并获取翻译后的内容：

~~~python
from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep
driver = webdriver.Safari()
# 加载有道翻译页面
driver.get("https://fanyi.youdao.com/")
# 获取输入框
input = driver.find_element(By.ID,"inputOriginal")
# 输入内容
input.send_keys("hello")
# 获取翻译按钮
tbtn = driver.find_element(By.ID,"transMachine")
# 发现页面被遮挡，此时无法点击
# 先获取遮挡的广告条，点击关闭按钮
close_btn = driver.find_element(By.CSS_SELECTOR,".guide-con .guide-close")
close_btn.click()
#点击翻译
tbtn.click()
#获取翻译后的内容
transTarget = driver.find_element(By.ID,"transTarget")
sleep(5)
print(transTarget.text)
~~~

#### 内容获取

-   `size`：返回元素大小；
-   `text`：获取元素的文本（`<div>hello</div>`）；
-   `title`：获取页面 `title`；
-   `current_url`：获取当前页面 `URL`；
-   `get_attribute()`：获取属性值（`<a href="xxxx">百度</a>`）；
-   `is_display()`：判断元素是否可见；
-   `is_enabled()`：判断元素是否可用。

~~~python
driver = webdriver.Chrome("./chromedriver.exe")
# 加载有道翻译页面
driver.get("https://fanyi.youdao.com/")

print(driver.title)
print(driver.current_url)

# 获取输入框
transMachine = driver.find_element(By.ID,"transMachine")

print(transMachine.size)
print(transMachine.text)
print(transMachine.get_attribute("href"))
print(transMachine.is_displayed())
print(transMachine.is_enabled())
~~~

#### 窗口操作

-   `maximize_window()`：模拟浏览器最大化按钮；
-   `set_window_size(100,100)`：设置浏览器大小（宽、高像素点）；
-   `set_window_position(300,200)`：设置浏览器位置；
-   `back()`：模拟浏览器后退按钮；
-   `forward()`：模拟浏览器前进按钮；
-   `refresh()`：模拟浏览器 F5 刷新；
-   `close()` ：模拟浏览器关闭按钮（关闭单个窗口）；
-   `quit()`：关闭所有 WebDriver 启动的窗口。

### 五、元素等待

例如对于程序翻页获取每页元素：

~~~python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome("./chromedriver.exe")
# 加载当当网
driver.get("https://www.dangdang.com/")

# 获取输入框
key = driver.find_element(By.ID,"key_S")
key.send_keys("科幻")
# 获取搜索框，点击搜索
search = driver.find_element(By.CSS_SELECTOR,".search .button")
search.click()
# 获取商品标题及价格
for i in range(5):
    shoplist = driver.find_elements(By.CSS_SELECTOR, ".shoplist li")
    for li in shoplist:
        print(li.find_element(By.CSS_SELECTOR, "a").get_attribute("title"))
    # 获取下一页按钮
    next = driver.find_element(By.LINK_TEXT, "下一页")
    next.click()
~~~

现在的网页越来越多采用了 `Ajax` 技术，这样程序便不能确定何时某个元素完全加载出来了。如果实际页面等待时间过长导致某个 `dom` 元素还没出来，但是你的代码直接使用了这个 `WebElement`，那么就会抛出 `NullPointer` 的异常。

为了避免这种元素定位困难而且会提高产生 `ElementNotVisibleException` 的概率。所以 `Selenium` 提供了两种等待方式，一种是隐式等待，一种是显式等待。隐式等待是等待特定的时间，显式等待是指定某一条件直到这个条件成立时继续执行。

#### 显式等待

显式等待使用 `WebDriverWait` 完成，指定某个条件，然后设置最长等待时间。如果在这个时间还没有找到元素，那么便会抛出异常了：

~~~python
WebDriverWait(driver, timeout, poll_frequency=POLL_FREQUENCY, ignored_exceptions=None)
~~~

- `driver`：所创建的浏览器 driver；
- `timeout`：最长时间长度（默认单位：秒）；
- `poll_frequency`：间隔检测时长（每）默认 0.5 秒；
- `ignored_exceptions`：方法调用中忽略的异常，默认只抛出找不到元素的异常。

显式等待基础格式：`webDriverWait` + `until` +（判断条件）。

-   `until`：直到调用的方法返回值为 True：

    ```python
    until(method, message=’’)
    # method：expected_conditions 库中定义的方法
    # message：自定义报错信息
    ```

-   判断条件：
    -   判断当前页面标题是否为 `title`：`title_is(title)`
    -   判断当前页面标题是否包含 `title`：`title_contains(title)`
    -   判断此定位的元素是否存在：`presence_of_element_located(locator)`
    -   判断页面网址中是否包含 `url`：`url_contains(url)`
    -   判断此定位的元素是否可见：`visibility_of_element_located(locator)`
    -   判断此元素是否可见：`visibility_of(element)`
    -   判断此定位的一组元素是否至少存在一个：`presence_of_all_elements_located(locator)`
    -   判断此定位的一组元素至少有一个可见：`visibility_of_any_elements_located(locator)`
    -   判断此定位的一组元素全部可见：`visibility_of_all_elements_located(locator)`
    -   判断此定位中是否包含 `text_ `的内容：`text_to_be_present_in_element(locator, text_)`_
    -   判断此定位中的 `value` 属性中是否包含 `text_` 的内容：`text_to_be_present_in_element_value(locator, text_)`
    -   判断定位的元素是否为 `frame`，并直接切换到这个 `frame` 中：`frame_to_be_available_and_switch_to_it(locator)`
    -   判断定位的元素是否不可见：`invisibility_of_element_located(locator)`
    -   判断此元素是否不可见：`invisibility_of_element(element)`
    -   判断所定位的元素是否可见且可点击：`element_to_be_clickable(locator)`
    -   判断此元素是否不可用：`staleness_of(element)`
    -   判断该元素是否被选中：`element_to_be_selected(element)`
    -   判断定位的元素是否被选中：`element_located_to_be_selected(locator)`
    -   `element`：所获得的元素
    -   `locator`：元素的定位信息
    -   `text_`：期望的文本信息

示例程序：

~~~python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# 程序每0.5秒检查，是否满足：标题包含“百度一下”这个条件，检查是否满足条件的最长时间为：15秒，超过15秒仍未满足条件则抛出异常
WebDriverWait(driver, 15, 0.5).until(EC.title_contains("百度一下"))

# 程序每0.5秒检查，是否满足：某定位的元素出现，检查是否满足条件的最长时间为：15秒，超过15秒仍未满足条件则抛出异常
WebDriverWait(driver, 15, 0.5).until(EC.visibility_of_element_located(By.CSS_SELECTOR,"XX"))
~~~

#### 隐式等待

隐式等待比较简单，就是设置全局元素查找的超时时间：

~~~python
implicitly_wait(time_to_wait)
~~~

设置的时间单位为秒，例如 `implicitly_wait(30)`，意思是超过 30 秒没有定位到一个元素，程序就会报错抛出异常，期间会一直轮询查找定位元素。

### 六、页面操作和动作链

#### 鼠标及键盘操作

鼠标操作：

-   `context_click()`：此方法模拟鼠标右键点击效果；
-   `double_click()`：此方法模拟双标双击效果；
-   `drag_and_drop()`：此方法模拟双标拖动效果；
-   `move_to_element()`：此方法模拟鼠标悬停效果；
-   `perform()`：此方法用来触发执行以上的鼠标方法。

~~~python
#导入动作链
from selenium.webdriver import ActionChains

driver.get("https://www.baidu.com/")
more = driver.find_element(By.LINK_TEXT,"更多")
#将鼠标移动到更多按钮
ActionChains(driver).move_to_element(more).context_click().perform()
~~~

键盘操作：

-   `send_keys(Keys.BACK_SPACE)`：删除键（BackSpace） ;
-   `send_keys(Keys.SPACE)`：空格键（Space）;
-   `send_keys(Keys.TAB)`：制表键（Tab）； 
-   `send_keys(Keys.ESCAPE)`：回退键（Esc）； 
-   `send_keys(Keys.ENTER)`：回车键（Enter） ；
-   `send_keys(Keys.CONTROL,'a')`：全选（Ctrl+A）； 
-   `send_keys(Keys.CONTROL,'c')`：复制（Ctrl+C）；
-   `driver.forward()`：前进；
-   `driver.back()`：后退。

~~~python
from selenium.webdriver.common.keys import Keys

driver.get("https://www.baidu.com/")

element = driver.find_element(By.ID,"kw")

# 输入用户名
element.send_keys("admin1")
# 删除1
element.send_keys(Keys.BACK_SPACE)
# 全选
element.send_keys(Keys.CONTROL,'a')
# 复制
element.send_keys(Keys.CONTROL,'c')
# 粘贴
# element.send_keys(Keys.CONTROL,'v')
~~~

#### 滚动条操作

在 HTML 页面中，由于前端技术框架的原因，页面元素为动态显示，元素根据滚动条的下拉而被加载：

```python
#1. 设置 JavaScritp 脚本控制滚动条（左边距：0；上边距：1000）
# 单位像素
js="window.scrollTo(0,1000)" 
#2. WebDriver 调用 JS 脚本方法
driver.execute_script(js)
```

#### 窗口截图

自动化脚本是由程序去执行的，因此有时候打印的错误信息并不是十分明确。如果在执行出错的时候对当前窗口截图保存，那么通过图片就可以非常直观地看到出错的原因：

~~~PYTHON
# 截取当前窗口
driver.get_screenshot_as_file("./demo.png")
~~~

### 七、存储数据

将数据写入 CSV 文件：

~~~python
# 读写CSV文件
import csv
# 以写入方式打开文件，如果文件不存在则自动创建
f = open("/Users/zhihaozhuang/Downloads/test.csv", 'w')
# 获取csv writer，用于写入csv格式数据
writer = csv.writer(f)
# 写入数据
writer.writerow(["张三", "男", "1.7"])
# 关闭文件
f.close()
~~~

使用 [pymysql](https://zhuanlan.zhihu.com/p/60003892) 将数据写入至 MySQL：

~~~sh
pip3 install pymysql
~~~

~~~python
import pymysql
  
# 创建连接
conn = pymysql.connect(host='127.0.0.1', port=3306, user='root', passwd='', db='tkq1', charset='utf8')
# 创建游标
cursor = conn.cursor()
  
# 执行SQL，并返回收影响行数
effect_row = cursor.execute("select * from tb7")
  
# 执行SQL，并返回受影响行数
#effect_row = cursor.execute("update tb7 set pass = '123' where nid = %s", (11,))
  
# 执行SQL，并返回受影响行数,执行多次
#effect_row = cursor.executemany("insert into tb7(user,pass,licnese)values(%s,%s,%s)", [("u1","u1pass","11111"),("u2","u2pass","22222")])
  
  
# 提交，不然无法保存新建或者修改的数据
conn.commit()
  
# 关闭游标
cursor.close()
# 关闭连接
conn.close()
~~~

### 八、下载页面上的图片

可以借助 `requests` 库来完成图片的保存，通过 `selenium` 获取图片的地址，再通过 `requests` 来将图片保存到本地。

```
pip3 install requests
```

```python
from selenium import webdriver
import requests

driver = webdriver.Safari()
driver.implicitly_wait(30)

driver.get('http://baidu.com')

#  使用get_attribute()方法获取对应属性的属性值，src属性值就是图片地址。
url = driver.find_element_by_css_selector('#lg>img').get_attribute('src')
driver.quit()

# 通过requests发送一个get请求到图片地址，返回的响应就是图片内容
r = requests.get(url)

# 将获取到的图片二进制流写入本地文件
with open('baidu.png', 'wb') as f:
    # 对于图片类型的通过r.content方式访问响应内容，将响应内容写入baidu.png中
    f.write(r.content)
```
