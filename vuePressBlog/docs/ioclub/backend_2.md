# 第二次课 HTTP协议

## 前言

我们上节课只是双击python文件运行了python， 不过还是建议大家使用 **vscode** 或者是 **pycharm** 这两个软件去写python

有能力使用终端运行就更好了

## 1. python 和 C的基础语法
### C 基础语法
```cpp
#include<stdio.h>

int main(void) {

    // 1. 字符串
    int a = 0;
    char* b = "this is a sentence";
    printf("%d", a);
    printf("%s", b);

    // 2. 数组
    int arr[10] = {1, 2}; // 剩下的位置会被添为0
    for (int i = 0; i < 10; i++)
    {
        printf("%d", arr[i]);
    }

    // 4. 结构体
    struct Dog {
        int a;
        int b;
    };
    struct Dog dog;
    dog.a = 1;
    printf("%d", dog.a);
    return 0;
}

// 3. 函数
int sum(int a, int b) {
    return 1;
}

```
### python 基础语法
```python

# 1. 字符串
a = 1
b = "this is python"
print(f"{a}")
print("{}".format(a))

# 2. 容器， python提供了多种方便的存储结构
# 2.1 列表(数组)
arr = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
for i in range(10):
    print(arr[i])
# 2.2 元组
a = (1, 2)
first = a[0]
## 2.3 字典
a = {
    "a": 1,
    "b": "2",
}
print(a["a"])
print(a.get("a"))

# 3. 函数
def sum(a, b) -> None:
    return a + b
print(sum(1, 1))

# 4. 类
class dog():
    name = "default"
    def __init__(self, name):
        self.name = name

    def eat(self, food):
        print(f"eat {food}")

a = dog("")

print(a.name)
a.eat("banana")

```
## 2. 解释上次的代码
```python
# UK: /flɑːsk/ US:/flæsk/

# 引入一个外部库类似与C的#include<***.h>
from flask import Flask, request

# 定义一个server
app = Flask("server name")

# 指定这个函数a()匹配的路径
@app.route("/hello")
def a(): # 定义一个函数

    # 获取所有在url上的请求参数
    # http://localhost:5000/hello?a=1&b=2
    args = request.args
    print(args)

    # 向客户端返回信息(不包括响应头,只有响应体)
    # 所以我们的server返回了`<h1>你发送了POST请求</h1>`
    # 这一段特殊格式的字符串, 这个字符串会被浏览器解析为html代码, 并被渲染出来
    return "<h1>Hello World</h1>"

# 指定运行的ip和端口并运行
app.run(host="127.0.0.1", port=5000)

# 程序运行后就类似与开启了一个无限循环

```
## 3. HTTP 格式

请求行
请求
body

response line(version, status code, desc)
header field
body

## 4. 请求信息

```
GET /hello HTTP/1.0
Host: localhost:5000
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Cache-Control: max-age=0
```

### 4.1请求行

所有HTTP请求的第一行都是请求行，依次是当前HTTP版本号，3位数字组成的[状态代码](https://zh.wikipedia.org/wiki/HTTP状态码)，以及描述状态的短语，彼此由**空格分隔**。

```apl
+---------+--------+------------+
|method   |url     |HTTP version|
+---------+--------+------------+
|GET      |/hello  |HTTP/1.1    |
+---------+--------+------------+
```

#### 4.1.1 method

服务端可以根据method, 对于同一个url作出不同的响应

HTTP 协议定义了一组请求方法，以表明要对给定资源执行的操作。指示针对给定资源要执行的期望动作。

- GET
    向特定的资源发出请求，使用GET的请求应该只被用于获取数据。
- POST
    向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的创建和/或已有资源的修改。


#### 4.1.2 url

统一资源标识符, 需要注意的是 **url不包含host(ip)和port(端口号)**

```
https://www.baidu.com/s?wd=hello?a=1&b=2
                     |--------URL-------|

http://http://182.61.200.6:80/s?wd=hello
                             |---URL---|
:80可以不带(dns服务器解析后会自动加上80)
```
#### **4.1.3 demo1**

- 准备一个python文件例如（server1.py）， 写入下面的内容

  ```python
  from flask import Flask, request
  app = Flask("server name")

  # 把hello()函数 绑定到url /hello 上
  # 并指定了访问这个url必须使用GET或者是POST方法
  @app.route("/hello", methods=["GET", "POST"])
  def hello():
      if request.method == "GET":
          return "<h1>你发送了GET请求</h1>"
      else:
          return "<h1>你发送了POST请求</h1>"

  app.run(host="127.0.0.1", port=5000)
  ```

  当我在终端中输入`python server1.py `运行这个文件后出现![/assets/img/image-20211017114146285](/assets/img/image-20211017114146285.png)

  表示运行成功

- 现在我们尝试发送请求

  当我们在地址栏输入`http://localhost:5000/hello`后出现了

  ![/assets/img/image-20211017114823081](/assets/img/image-20211017114823081.png)

  原因是浏览器地址栏只能发送出GET请求, 所以我们的server返回了`<h1>你发送了POST请求</h1>`

  想要发送post请求, 这里我们使用requests库, 使用前类似与flask, 需要进行安装

  1. 安装requests: 在cmd 或者 powershell 输入

     `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple `

     之后等待安装成功

  2.  通过代码模拟浏览器发送请求

     准备一个新的python文件（例如client1.py, 不要起成requests.py）

     ```python
     import requests
     分别尝试向服务器发送url相同但method不同的请求
     # res = requests.get('http://localhost:5000/hello')
     res = requests.post('http://localhost:5000/hello')
     # res = requests.patch('http://localhost:5000/hello')

     # 打印服务去返回的相应码
     print(res.status_code)
     # 打印服务器返回的信息
     print(res.text)
     ```

     在终端下（cmd或者powershell里）使用python运行这个新的文件

     输入`python client1.py`

     下面是我的运行结果

     ![/assets/img/image-20211017120112170](/assets/img/image-20211017120112170.png)

### 4.2 请求头(首部字段)

#### 4.2.1 常见的字段

```txt
- Host: cn.windicss.org
- User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0

- Accept: image/avif,image/webp,*/*
- Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
- Accept-Encoding: gzip, deflate, br
- Connection: keep-alive
- Cache-Control: max-age=0
- Cookie: BAIDUID=00252988D408C94FC60DDBD3E7084AE3:FG=1;
- ........
```
在请求头中, 只有host是必选的内容

下面是一些常见的字段

| 协议头字段名   | 说明                                                         | 示例                                                         |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Accept         | 能够接受的回应内容类型（Content-Types）                      | `Accept: text/plain`                                         |
| User-Agent     | 浏览器的浏览器身份标识字符串                                 | `User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0` |
| Host           | 服务器的域名,以及监听的端口号。如果所请求的端口默认端口例如80，则端口号可被省略。 | `Host: zh.wikipedia.org:80` `Host: zh.wikipedia.org`         |
| Cookie         | 由服务器通过发送的一些信息, 作为缓存存储在客户端(浏览器)上   | `Cookie: $Version=1; Skin=new;`                              |
| Content-Length | 请求体的长度                                                 | `Content-Length: 348`                                        |
| Content-Type   | 请求体的 [MIME](https://zh.wikipedia.org/wiki/MIME)类型 （用于POST和PUT请求中） | `Content-Type: application/x-www-form-urlencoded`            |

#### 4.2.2 demo2

服务器能够获取浏览器（或者是任何东西按照格式）发出的请求的详细信息

1. 准备一个`server2.py`并写入下面的内容， 之后运行

   ```python
   from flask import Flask, request
   app = Flask("server name")

   @app.route("/hello", methods=["GET", "POST"])
   def hello():
       # 只有这里的代码和之前的不一样
       method = request.method
       url = request.path
       headers = request.headers
   	# 和C语言一样，往字符串里加入变量， 只不过写法稍微不同， 大括号里就是变量名
       responce = f'method: {method} \nurl: {url}\nheaders: {headers}'
       return responce
   app.run(host="127.0.0.1", port=5000)
   ```

2. 我们从浏览器访问`http://localhost:5000/hello`

   结果![/assets/img/image-20211017125042261](/assets/img/image-20211017125042261.png)

3. 尝试用代码发送请求， 准备一个`client2.py`并复制下面的代码

   这次我们主动向发出的请求头中加入了两个我们自定义的两个字段

   `"a": "aa" "b": "bb"`

   ```python
   import requests
   # .get就是发送get请求
   # 这个函数本身有很多参数， 我们可以通过`参数名=参数`手动制定每个参数的对应关系
   res = requests.get(import requests
   res = requests.get(
       url='http://localhost:5000/hello',
       headers={
           "a": "aa",
           "b": "bb"
       }
   )
   print(res.status_code)
   print(res.text)
   ```

   在终端输入`python client2.py`

   结果![/assets/img/image-20211017125630840](/assets/img/image-20211017125630840.png)



## 5. 响应信息

### 5.1 状态行

所有HTTP响应的第一行都是**状态行**，依次是当前HTTP版本号，3位数字组成的[状态代码](https://zh.wikipedia.org/wiki/HTTP状态码)，以及描述状态的短语，彼此由空格分隔。

```apl
+---------+-----+-------+
|HTTP版本号|状态码|描述短语|
+---------+-----+-------+
|HTTP/1.1 |200  | OK    |
+---------+-----+-------+
```

#### 5.1.1 响应码

状态代码的第一个数字代表当前响应的类型：

- [1xx消息](https://zh.wikipedia.org/wiki/HTTP状态码#1xx消息)——请求已被服务器接收，继续处理
- [2xx成功](https://zh.wikipedia.org/wiki/HTTP状态码#2xx成功)——请求已成功被服务器接收、理解、并接受
- [3xx重定向](https://zh.wikipedia.org/wiki/HTTP状态码#3xx重定向)——需要后续操作才能完成这一请求
- [4xx请求错误](https://zh.wikipedia.org/wiki/HTTP状态码#4xx请求错误)——请求含有词法错误或者无法被执行
- [5xx服务器错误](https://zh.wikipedia.org/wiki/HTTP状态码#5xx服务器错误)——服务器在处理某个正确请求时发生错误

下面是一些常见的响应码

- 200 OK
  请求成功。

- 404 Not Found

  请求失败，请求所希望得到的资源未被在服务器上发现

- 500 Internal Server Error
  服务器遇到了不知道如何处理的情况。

#### 5.1.2 demo3

我们分别尝试向百度和豆瓣发送请求

准备一个`client3.py`并复制下面的代码

```python
import requests
res = requests.get('https://www.baidu.com')
# res = requests.get('https://movie.douban.com/top250')
print(res.status_code)
print(res.text)
```

分别尝试向豆瓣和百度发送请求

百度： 返回了200 和正常的html代码

![/assets/img/image-20211017130015023](/assets/img/image-20211017130015023.png)

豆瓣： 418 以及 空（没有正常的html代码）

![/assets/img/image-20211017130050841](/assets/img/image-20211017130050841.png)

**如何让豆瓣也能正常访问呢？**

下面的代码手动想请求头（header）中加入了一项新的信息

```python
import requests
# res = requests.get('https://www.baidu.com')
res = requests.get('https://movie.douban.com/top250',
    # 欺骗服务器我们是浏览器而不是python
    headers={
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0'
    }
)
print(res.status_code)
print(res.text)
```

请再次尝试运行这段代码， 观察是否有正常的返回值

### 5.2 响应头

#### 5.2.1 常见的字段

实例： 使用google搜索后的相应内容

```
HTTP/2 204 No Content
content-type: text/html; charset=UTF-8
date: Sat, 16 Oct 2021 06:42:22 GMT
server: gws
content-length: 0
x-xss-protection: 0
x-frame-options: SAMEORIGIN
alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-T051=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"
X-Firefox-Spdy: h2
```
下面是一些常见的字段

| 字段名           | 说明                                                         | 例子                                   |
| ---------------- | ------------------------------------------------------------ | -------------------------------------- |
| Content-Encoding | 文档的编码（Encode）方法。与之对应的，请求头中有一个Accept-Encoding表示客户端接受的编码方法 | `Content-Encoding: gzip`               |
| Content-Type     | 返回内容的[MIME](https://zh.wikipedia.org/wiki/MIME)类型， client不以文件的后缀明判断文件类型，所以需要server制定返回的文件类型， 对应Accept | Content-Type: text/html; charset=utf-8 |
| Content-Length   | 回应消息体的长度，以 字节 （8位为一字节）为单位              | `Content-Length: 348`                  |
| Date             | 此条消息被发送时的日期和时间                                 | `Date: Tue, 15 Nov 1994 08:12:31 GMT`  |
| Server           | 服务器的名字                                                 | `Werkzeug/2.0.2 Python/3.9.7`          |

#### 5.2.2 demo4

我们之前没有在函数体内返回了一个字符串，就是响应体body， 并没有手动制定上面提到的所有信息， 那是因为flask已经帮我们处理了那一部分内容， 我们只需要关注最重要的body就行了

加入现在我们根据需要手动设置响应的内容， 下面是一个实例

1. 创建`server4.py`并复制下面的代码后运行

```python
from flask import Flask, request
app = Flask("server name")

@app.route("/hello")
def hello():
    return ("<h1>Hello World!</h1>", 404, [("aa", 1), ("bb", 2)])
app.run(host="127.0.0.1", port=5000)
```

2.  通过浏览器访问，观察结果

   ![/assets/img/image-20211017134914547](/assets/img/image-20211017134914547.png)

可以看到， 虽然返回的是404, 但是依然能够看到hello world， headers里的内容也成功修改

## 6. 最关注的

#### 6.1 获取url参数

```python
# args是字典类型， 可以通过下面的方法获取值
# value = args.get("key")
# value = args["key"]
args = request.args
```

#### 6.2 获取header参数

```python
# 同上， 字典类型
headers = request.headers
```

#### 6.3 获取body参数

请求体的类型有很多， 格式也不一样

我们需要先从请求头headers中读取到客户端传来的body的类型， 在根据类型去按照相应格式解析这个body

最常用的格式有下面几种， 我们依次介绍这些类型

##### 6.3.0 表单

form表单就是一堆输入框， 当点击按钮就会向服务器发送表单中的内容

![/assets/img/image-20211017154841006](/assets/img/image-20211017154841006.png)

##### 6.3.1 application/x-www-form-urlencoded (Form)

这个格式对应的是前端通过form表单传递的body格式

6.3.2 application/json

对应的是一种比较规范的字符串格式， 和python的字典很相似

```json
{
    "a": 1,
    "b": "this is a sentence"
}
```

##### 6.3.3 multipart/form-data

这是一种复合格式， 一般用来传递文件

##### 6.3.4 text/html 及其它

一般都由浏览器自动解析渲染到页面上， 或者是直接作为文件下载

#### 6.4 demo5

1. 先准备一个`server5.py`， 同上启动



这里是一段HTML代码演示 form 和 multi/part两种格式



```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <hr>
    <!-- 第一个表单 演示 application/x-www-form-urlencoded -->
    <form action="http://localhost:5000/hello" method="post" enctype="application/x-www-form-urlencoded">
        <input type="text" name="key1">
        <input type="text" name="key2">
        <button>向/hello发送</button>
    </form>
    <hr>
    <!-- 第二个表单 演示 multipart/form-data -->
    <!-- 只有指定了multi/form-data，才能将文件类型发送的出去 -->
    <form action="http://localhost:5000/hello2" method="post" enctype="multipart/form-data">
        <input type="text" name="key1">
        <input type="text" name="key2">
        <input type="file">
        <button>向/hello2发送</button>
    </form>
</body>
</html>
```

用浏览器打开这个文件可以看到

![/assets/img/image-20211017155748427](/assets/img/image-20211017155748427.png)

分别尝试填写两个表单并发送， 观察server在终端的输出结果

![/assets/img/image-20211017161212682](/assets/img/image-20211017161212682.png)

#### 6.5 demo6

发送json

准备一个`client6.py` 并运行

```python
import requests
res = requests.post('http://localhost:5000/hello3', json={
    "a": 1,
    "b": 2
})
```

结果

![/assets/img/image-20211017161715045](/assets/img/image-20211017161715045.png)



## 7. 附录

### 1. 请求方法(method)

HTTP 定义了一组请求方法，以表明要对给定资源执行的操作。指示针对给定资源要执行的期望动作。

- GET
  向特定的资源发出请求，使用GET的请求应该只被用于获取数据。
- POST
  向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的创建和/或已有资源的修改。
- OPTIONS
  返回服务器针对特定资源所支持的HTTP请求方法。
- HEAD
  HEAD方法请求一个与GET请求的响应相同的响应，但没有响应体。
- PUT
  上传资源
- DELETE
  删除资源。
- TRACE
  回显服务器收到的请求，主要用于测试或诊断。
- PATCH
  PATCH方法用于对资源应用部分修改。

### 2. 响应码

#### 信息响应(100–199)

- 100 Continue
  这个临时响应表明，迄今为止的所有内容都是可行的，客户端应该继续请求，如果已经完成，则忽略它。

#### 成功响应(200–299)

- 200 OK
  请求成功。成功的含义取决于HTTP方法：
    - GET：资源已被提取并在消息正文中传输。
    - HEAD：实体标头位于消息正文中。
    - POST：描述动作结果的资源在消息体中传输。
    - TRACE：消息正文包含服务器收到的请求消息
- 206 Partial Content
  服务器已经成功处理了部分 GET 请求。类似于 FlashGet 或者迅雷这类的 HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。该请求必须包含 Range 头信息来指示客户端希望得到的内容范围，并且可能包含 If-Range 来作为请求条件。

#### 重定向(300–399)

- 301 Moved Permanently
  被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个 URI 之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是可缓存的。
- 302 Found
  请求的资源现在临时从不同的 URI 响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在Cache-Control或Expires中进行了指定的情况下，这个响应才是可缓存的。

#### 客户端错误(400–499)

- 400 Bad Request
  1、语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。
  2、请求参数有误。

- 404 Not Found
  请求失败，请求所希望得到的资源未被在服务器上发现。没有信息能够告诉用户这个状况到底是暂时的还是永久的。假如服务器知道情况的话，应当使用410状态码来告知旧资源因为某些内部的配置机制问题，已经永久的不可用，而且没有任何可以跳转的地址。404这个状态码被广泛应用于当服务器不想揭示到底为何请求被拒绝或者没有其他适合的响应可用的情况下。

- 405 Method Not Allowed
  请求行中指定的请求方法不能被用于请求相应的资源。该响应必须返回一个Allow 头信息用以表示出当前资源能够接受的请求方法的列表。 鉴于 PUT，DELETE 方法会对服务器上的资源进行写操作，因而绝大部分的网页服务器都不支持或者在默认配置下不允许上述请求方法，对于此类请求均会返回405错误。

- 408 Request Timeout
  请求超时。客户端没有在服务器预备等待的时间内完成一个请求的发送。客户端可以随时再次提交这一请求而无需进行任何更改。

- 418 I'm a teapot

  本操作码是在1998年作为[IETF](https://zh.wikipedia.org/wiki/IETF)的传统[愚人节笑话](https://zh.wikipedia.org/wiki/惡搞RFC), 在RFC 2324[超文本咖啡壶控制协议](https://zh.wikipedia.org/wiki/超文本咖啡壶控制协议)'中定义的，并不需要在真实的HTTP服务器中定义。当一个控制茶壶的[HTCPCP](https://zh.wikipedia.org/wiki/HTCPCP)收到BREW或POST指令要求其煮咖啡时应当回传此错误。[[48\]](https://zh.wikipedia.org/wiki/HTTP状态码#cite_note-48)这个HTTP状态码在某些网站（包括Google.com）与项目（如[Node.js](https://zh.wikipedia.org/wiki/Node.js)、[ASP.NET](https://zh.wikipedia.org/wiki/ASP.NET)和[Go语言](https://zh.wikipedia.org/wiki/Go语言)）中用作[彩蛋](https://zh.wikipedia.org/wiki/彩蛋_(媒体))。[[49\]](https://zh.wikipedia.org/wiki/HTTP状态码#cite_note-49)

#### 服务器错误 (500–599)

- 500 Internal Server Error
  服务器遇到了不知道如何处理的情况。
- 502 Bad Gateway
  此错误响应表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应。



### 3. content-type(MIME类型 / 互联网媒体类型)

#### 3.1 独立类型

类似于一种文件类型

```
text/plain(未知文本)
text/html
image/jpeg
image/png
audio/mpeg
audio/ogg
audio/*
video/mp4
application/*
* application/json
application/javascript
application/ecmascript
application/octet-stream
* application/x-www-form-urlencoded
```

#### 3.2 Multipart类型

就是复合类型， 比如client传来的body里面既有文本又有图片

```
* multipart/form-data
multipart/byteranges
```



### 4. 发送请求的几种方式

#### form表单

```html
发送GET请求
<form action="http://foo.com/get" method="get">
    <input name="say" value="Hi">
    <input name="to" value="Mom">
    <button>Send my greetings</button>
</form>
发送POST请求
<form action="http://foo.com/post" method="post" enctype="multipart/form-data">
    <input type="text" name="description" value="some text">
    <input type="file" name="myFile">
    <button type="submit">Submit</button>
</form>
```
#### postman

一个很方便的发请求的软件

####  requests库

```python
import requests
response = request.get("http://www.baidu.com")
print(response)
```

####  浏览器

1. 浏览器的地址栏可以发送简单的get请求, 不过会附带很多的额外信息, 比如缓存之类
