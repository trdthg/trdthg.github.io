# 第三次课 Cookie登录

## 1. 用户管理

### 1.1 目标

1. 实现的功能

  - `/users` 展示所有用户

  - `/login` 登录
  - `/register` 注册
  - `/logout` 登出

2. 存储

   使用python中的dict负责存储用户数据

### 1.2 前置

### 1.3 具体实现

#### 1.3.1 /user

```python
import flask
app = flask.Flask(__name__)
import time

def get_time():
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) 

users = {
    "root": {
        'username': "root",
        'password': '000000',
        'id_login': False,
        'create_time': "2021-10-20 17:22:44"
    },
    'a': {
        
    }
}

@app.route('/users')
def index():
    return users
    
app.run(host='127.0.0.1', port=5000)


```

#### 1.3.2 /register

```python

@app.route('/register')
def register():
    args = flask.request.args
    username = args['username']
    password = args['password']

    if username in users.keys():
        return "该用户名已经被注册"
    users[username] = {
        'username': username,
        'password': password,
        'id_login': False,
        'create_time': get_time()
    }
    return "注册成功"
```

#### 1.3.3 /login

```python
@app.route('/login')
def login():
    args = flask.request.args
    username = args['username']
    password = args['password']
    if username in users.keys() and users[username]['password'] == password:
        if users[username]['is_login'] == True:
            return '难道是你的号被盗了'
        users[username]['is_login'] = True
        return '登录成功'
    else:
        return "没有该用户"

```

#### 1.3.4 /logout

```python
@app.route('/logout')
def logout():
    args = flask.request.args
    username = args['username']
    password = args['password']
    if username in users.keys() and users[username]['password'] == password:
        users[username]['is_login'] = False
        return '登出成功'
    else:
        return "没有该用户"
```

### 1.4. 完整代码 ( demo1.py )

```python
import flask
app = flask.Flask(__name__)
import time

def get_time():
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) 

users = {
    "root": {
        'username': "root",
        'password': '000000',
        'id_login': False,
        'create_time': "2021-10-20 17:22:44"
    }
}

@app.route('/users')
def index():
    print(time.localtime())
    return users

@app.route('/register')
def register():
    args = flask.request.args
    username = args['username']
    password = args['password']

    if username in users.keys():
        return "该用户名已经被注册"
    users[username] = {
        'username': username,
        'password': password,
        'id_login': False,
        'create_time': get_time()
    }
    return "注册成功"

@app.route('/login')
def login():
    args = flask.request.args
    username = args['username']
    password = args['password']
    if username in users.keys() and users[username]['password'] == password:
        if users[username]['is_login'] == True:
            return '难道是你的号被盗了'
        users[username]['is_login'] = True
        return '登录成功'
    else:
        return "没有该用户"

@app.route('/logout')
def logout():
    args = flask.request.args
    username = args['username']
    password = args['password']
    if username in users.keys() and users[username]['password'] == password:
        users[username]['is_login'] = False
        return '登出成功'
    else:
        return "没有该用户"

app.run(host='127.0.0.1', port=5000)
```

## 2. 校验用户是否登录

### 2.1 目标

上一部分内容中我们只实现了对users这个dict的增删改查，但是没有对用户的身份进行校验，安全性为0

所以我们要加上对用户身份的判定

**1. 如何校验用户身份？**

当用户进入网站时， 服务器需要判断进入的用户是谁， 服务器想要判断用户是谁，用户在访问网站时就必须传递给服务器某种信息（可以称为用户的标识符），这个过程有两部分

1. 前端在得到用户登录成功后，主动把用户之前输入的用户名密码保存下来，在下次访问时自动发送用户名和密码
2. 用户访问网站时，服务器获取用户传来的信息，并校验身份，如果校验成功，就展示正确的信息

**2. 如何存储用户信息？**

我们这次先介绍cookie

### 2.2 Cookie

cookie本身存储在请求头里，也是一个字段，不过cookie的不同在于 :

- cookie主要用来保存一些用户数据，有一定的存活时间，时间过了就会被清楚
- 用户在访问网站时，浏览器会自动在header中加入cookie
- cookie里面存储的是键值对，中间用 `;` 分割

下面是一张我的火狐浏览器保存的cookies的截图

cookie本身和站点（服务器 / 域名）绑定

![image-20211023220921260](/ioclub/image-20211023220921260.png)

关于cookie的更多信息在附录里

### 2.3 flask操作Cookie （cookie.py）

```python
# make_response的第一个参数就是 响应体的内容
# 等于 return "返回的数据" 中的 "返回的数据"
from flask import make_response, Flask

app = Flask(__name__)

@app.route('/login')
def login():
    # 使用这个方法我们可以为响应添加更多自定义内容
    response = make_response("登录成功")
    # 这里就是我们服务器为用户的浏览器中设定了一些信息
    response.set_cookie("username", "aaa")
    response.set_cookie("password", "000000")
    return response

app.run(host='127.0.0.1', port=5000)
```

### 2.4 修改 /login

```python
@app.route('/login')
def login():
    # 1. 判断用户是否拥有cookie， 如果校验成功，就不作处理
    username = flask.request.cookies.get("username", None)
    password = flask.request.cookies.get("password", None)
    if username and password:
        if username in users.keys() and users[username]['password'] == password:
            return '你已经登录了'
    # 2. 如果没有检测到cookie，就将用户的is_login设为true
    # 并为用户的浏览器设置cookie信息
    args = flask.request.args
    username = args['username']
    password = args['password']
    if username in users.keys() and users[username]['password'] == password:
        if users[username]['is_login'] == True:
            return '难道是你的号被盗了'
        users[username]['is_login'] = True
        response = flask.make_response("登录成功")
        response.set_cookie("identifier", username + password)
        response.set_cookie("username", username)
        response.set_cookie("password", password)
        return response
    else:
        return "没有该用户"
```

### 2.5 修改 /logout

```python
@app.route('/logout')
def logout():
    # 根据cookie判断是否用户是否登录
    username = flask.request.cookies.get("username", None)
    password = flask.request.cookies.get("password", None)
    if username and password:
        if username in users.keys() and users[username]['password'] == password:
            # 若登录就转为登出状态并清除cookie
            users[username]['is_login'] = False
            resp = make_response("登出成功")
            resp.delete_cookie("username")
            resp.delete_cookie("password")
            return resp
    # 否则就什么也不做
    return "您尚未登录"
```

### 2.6 新增 /self

如果用户登录了，就返回他自己的信息

```python
@app.route('/self')
def index():
    username = flask.request.cookies.get("username", None)
    password = flask.request.cookies.get("password", None)
    if username and password:
        if username in users.keys():
            if users[username]['password'] == password:
                return users[username]
            else:
                return '密码错误'
        else:
            return "没有该用户"
    else:
        return '您尚未登录'
```

### 2.7 完整代码 （demo2.py）

```python
import flask
from flask.helpers import make_response
from werkzeug.wrappers import request
app = flask.Flask(__name__)
import time

# 如何获取用户是否登录
# 当用户进入网站时， server需要判断进入的用户是谁， 然后展示他的个人信息
# 想要判断用户是谁，用户在访问网站时就必须传递给服务器某种信息（用户的标识符）
# 1. 前端在得到用户登录成功后，主动吧用户之前输入的用户名密码保存下来，在下次访问时自动发送这个标识符
# 2. 后端判断用户登录后主动在用户浏览器的cookie里存入用户信息
# 2.1 后端需要主动尝试判断用户是否有之前的登录信息，进行校验无误后确认用户已经登录， 展示登录后的信息
# 2.2 若校验失败， 让用户回到登录界面，这个跳转前后端都能做

def get_time():
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) 

users = {
    "root": {
        'username': "root",
        'password': '000000',
        'is_login': False,
        'create_time': "2021-10-20 17:22:44"
    }
}

@app.route('/users')
def index():
    print(time.localtime())
    return users

@app.route('/self')
def self():
    username = flask.request.cookies.get("username", None)
    password = flask.request.cookies.get("password", None)
    if username and password:
        if username in users.keys():
            if users[username]['password'] == password:
                return users[username]
            else:
                return '密码错误'
        else:
            return "没有该用户"
    else:
        return '您尚未登录'

@app.route('/register')
def register():
    args = flask.request.args
    username = args['username']
    password = args['password']

    if username in users.keys():
        return "该用户名已经被注册"
    users[username] = {
        'username': username,
        'password': password,
        'is_login': False,
        'create_time': get_time()
    }
    return "注册成功"

@app.route('/login')
def login():
    username = flask.request.cookies.get("username", None)
    password = flask.request.cookies.get("password", None)
    if username and password:
        if username in users.keys() and users[username]['password'] == password:
            return '你已经登录了'
    
    args = flask.request.args
    username = args['username']
    password = args['password']
    if username in users.keys() and users[username]['password'] == password:
        if users[username]['is_login'] == True:
            return '难道是你的号被盗了'
        users[username]['is_login'] = True
        response = flask.make_response("登录成功")
        response.set_cookie("identifier", username + password)
        response.set_cookie("username", username)
        response.set_cookie("password", password)
        return response
    else:
        return "没有该用户"

@app.route('/logout')
def logout():
    # 根据cookie判断是否用户是否登录
    username = flask.request.cookies.get("username", None)
    password = flask.request.cookies.get("password", None)
    if username and password:
        if username in users.keys() and users[username]['password'] == password:
            # 若登录就转为登出状态并清除cookie
            users[username]['is_login'] = False
            resp = make_response("登出成功")
            resp.delete_cookie("username")
            resp.delete_cookie("password")
            return resp
    # 否则就什么也不做
    return "您尚未登录"

app.run(host='127.0.0.1', port=5000)
```

## 3. 把用户数据存入文件中

之前我们一直使用dict存储用户数据， 现在我们要把存储在硬盘里

这里只介绍最常用的json格式

### 3.1 文件操作 (rwjson.py)

json库中有一些方便的函数能够处理 python中数据类型和字符串的转换

- `json.dump()`: 把数据类型转换成字符串并存储在文件中  

- `json.load()`: 把文件打开从字符串转换成数据类型

```python
import json

users = {
    "root": {
        'username': "root",
        'password': '000000',
        'id_login': False,
        'create_time': "2021-10-20 17:22:44"
    }
}

print('正在写入文件')
f = open('./record.json', 'w')
json.dump(users, f)
f.close()

print('正在加载文件')
f = open('./record.json', 'r')
content = json.load(f)
f.close()
print(content)

```

### 3.2 新增 /save

```python
@app.route('/save')
def save():
    username = flask.request.cookies.get("username", None)
    password = flask.request.cookies.get("password", None)
    if username and password: 
        if username == 'root' and password == users[username]['password']:
            f = open('./users.json', 'w')
            json.dump(users, f)
            f.close()
            return '写入成功'
    return '您尚未登录 或者 没有权限'
```



### 3.3 将 users 改为从文件中读取

```python
# 注意：需要有user.json这个文件， 不然会报错（找不到文件）
f = open('./users.json', 'r')
users = json.load(f)
# users = {
#     "root": {
#         'username': "root",
#         'password': '000000',
#         'is_login': False,
#         'create_time': "2021-10-20 17:22:44"
#     }
# }
f.close()
```

## 4. 加入文章功能（蓝图）

### 4.1 新建article.py

```python
# 引入BluePrint创建蓝图
from flask import Blueprint
import json

# 新建一个app对象
app2 = Blueprint('article', __name__)

articles = {
    'root发布的1篇文章': {
        'title': 'root发布的1篇文章',
        'content': '这是文章的内容',
        'author': 'root',
        'create_time': '2021-10-20 17:22:44',
        'update_time': '2021-10-20 17:22:44',
    },
    'root发布的2篇文章': {
        'title': 'root发布的2篇文章',
        'content': '这是文章的内容',
        'author': 'root',
        'create_time': '2021-10-20 17:25:44',
        'update_time': '2021-10-20 17:25:44',
    },
}

# 这里我们只为app2定义了一个新的方法（就是函数），当用户访问 http://localhost:3000/articles是就能访问到这个接口（就是函数）
@app2.route('/get_articles')
def show_articles():
    res = json.dumps(articles)
    return res
```



### 4.2 新建demo4.py

1. 把demo3的内容复制过来

2. 增加如下内容

   ```python
   # 加到这行之后
   app = Flask(__name__)
   
   # 这里是多加的内容
   from article import app2
   app.register_blueprint(app2)
   ```

3. 尝试访问`http://localhsot:3000/articles`

### 4.3 为 article.py 下的接口批量增加前缀

```python
# 修改这行代码， url_prefix 指定了全部参数
app2 = Blueprint('article', __name__, url_prefix='/article')
```

尝试访问 `http://localhsot:3000/article/get_articles`

### 4.4 完整代码

1. demo4.py

   ```python
   from flask import Flask, request, make_response
   import time
   import json
   app = Flask(__name__)
   
   from article import app2
   app.register_blueprint(app2)
   
   def get_time():
       return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) 
   
   f = open('./users.json', 'r')
   users = json.load(f)
   f.close()
   
   @app.route('/save')
   def save():
       username = request.cookies.get("username", None)
       password = request.cookies.get("password", None)
       if username and password: 
           if username == 'root' and password == users[username]['password']:
               f = open('./users.json', 'w')
               json.dump(users, f)
               f.close()
               return '写入成功'
       return '您尚未登录 或者 没有权限'
   
   @app.route('/users')
   def index():
       print(time.localtime())
       return users
   
   @app.route('/self')
   def self():
       username = request.cookies.get("username", None)
       password = request.cookies.get("password", None)
       if username and password:
           if username in users.keys():
               if users[username]['password'] == password:
                   return users[username]
               else:
                   return '密码错误'
           else:
               return "没有该用户"
       else:
           return '您尚未登录'
   
   @app.route('/register')
   def register():
       args = request.args
       username = args['username']
       password = args['password']
   
       if username in users.keys():
           return "该用户名已经被注册"
       users[username] = {
           'username': username,
           'password': password,
           'is_login': False,
           'create_time': get_time()
       }
       return "注册成功"
   
   @app.route('/login')
   def login():
       username = request.cookies.get("username", None)
       password = request.cookies.get("password", None)
       if username and password:
           if username in users.keys() and users[username]['password'] == password:
               return '你已经登录了'
       
       args = request.args
       username = args['username']
       password = args['password']
       if username in users.keys() and users[username]['password'] == password:
           if users[username]['is_login'] == True:
               return '难道是你的号被盗了'
           users[username]['is_login'] = True
           response = make_response("登录成功")
           response.set_cookie("identifier", username + password)
           response.set_cookie("username", username)
           response.set_cookie("password", password)
           return response
       else:
           return "没有该用户"
   
   @app.route('/logout')
   def logout():
       username = request.cookies.get("username", None)
       password = request.cookies.get("password", None)
       if username and password:
           if username in users.keys() and users[username]['password'] == password:
               users[username]['is_login'] = False
               resp = make_response("登出成功")
               resp.delete_cookie("username")
               resp.delete_cookie("password")
               return resp
       return "您尚未登录"
   
   app.run(host='127.0.0.1', port=5000)
   ```

2. article.py

   ```python
   from flask import Blueprint
   import json
   app2 = Blueprint('article', __name__, url_prefix='/article')
   
   articles = {
       'root发布的1篇文章': {
           'title': 'root发布的1篇文章',
           'content': '这是文章的内容',
           'author': 'root',
           'create_time': '2021-10-20 17:22:44',
           'update_time': '2021-10-20 17:22:44',
       },
       'root发布的2篇文章': {
           'title': 'root发布的2篇文章',
           'content': '这是文章的内容',
           'author': 'root',
           'create_time': '2021-10-20 17:25:44',
           'update_time': '2021-10-20 17:25:44',
       },
   }
   
   @app2.route('/articles')
   def show_articles():
       res = json.dumps(articles)
       return res
   ```

   

## 5. 附录

### 5.1 Cookie

**分类**

Cookie保存在客户端中，按在客户端中的存储位置，可分为内存Cookie和硬盘Cookie。

内存 Cookie 由[浏览器](https://zh.wikipedia.org/wiki/浏览器)维护，保存在[内存](https://zh.wikipedia.org/wiki/内存)中，浏览器关闭即消失，存在时间短暂。硬盘Cookie保存在[硬盘](https://zh.wikipedia.org/wiki/硬盘)里，有过期时间，除非用户手动清理或到了过期时间，硬盘Cookie不会清除，存在时间较长。所以，按存在时间，可分为非持久Cookie和持久Cookie。

**用途**

因为[HTTP协议](https://zh.wikipedia.org/wiki/HTTP)是无状态的，即[服务器](https://zh.wikipedia.org/wiki/服务器)不知道用户上一次做了什么，这严重阻碍了[交互式Web应用程序](https://zh.wikipedia.org/wiki/交互式Web应用程序)的实现。在典型的网上购物场景中，用户浏览了几个页面，买了一盒饼干和两瓶饮料。最后结帐时，由于HTTP的无状态性，不通过额外的手段，服务器并不知道用户到底买了什么，所以Cookie就是用来绕开HTTP的无状态性的“额外手段”之一。服务器可以设置或读取Cookie中包含的信息，借此维护用户跟服务器[会话](https://zh.wikipedia.org/wiki/会话_(计算机科学))中的状态。

在刚才的购物场景中，当用户选购了第一项商品，服务器在向用户发送网页的同时，还发送了一段Cookie，记录着那项商品的信息。当用户访问另一个页面，浏览器会把Cookie发送给服务器，于是服务器知道他之前选购了什么。用户继续选购饮料，服务器就在原来那段Cookie里追加新的商品信息。结帐时，服务器读取发送来的Cookie即可。

Cookie另一个典型的应用是当登录一个网站时，网站往往会请求用户输入用户名和密码，并且用户可以勾选“下次自动登录”。如果勾选了，那么下次访问同一网站时，用户会发现没输入用户名和密码就已经登录了。这正是因为前一次登录时，服务器发送了包含登录凭据（用户名加密码的某种[加密](https://zh.wikipedia.org/wiki/加密)形式）的Cookie到用户的硬盘上。第二次登录时，如果该Cookie尚未到期，浏览器会发送该Cookie，服务器验证凭据，于是不必输入用户名和密码就让用户登录了。

**Cookie的缺陷**

1. Cookie会被附加在每个HTTP请求中，所以无形中增加了流量。
2. 由于HTTP请求中的Cookie是明文传递的，所以安全性成问题，除非使用HTTPS
3. Cookie的大小限制在4 KB左右，对于复杂的存储需求来说是不够用的。

**flask的cookie API**

```python
# 这个是函数的定义
set_cookie(
    key, # 必须传
    value='', # 默认为空字符串
    # 下面两个不传就在关闭浏览器时删除
    max_age=None, # 存活时间
    expires=None, # 过期时间
    path='/', # 让cookie在指定的path传递， 不是在访问所有路径时都传递
    domain=None, # 
    secure=False, # 只能通过HTTPS传递
    httponly=False, # 防止JS获取
    samesite=None # 防止外部请求发送cookie
)
```

### 5.2 文件操作

1. 读取文件的另一种写法， 主要是with关键字

    ```python
    with open("./record.json", "w") as f:
        json.dump(users, f)
        print("写入文件完成...")

    with open("./record.json", 'r') as f:
        file_content = json.load(f)
        print("读入文件完成...")
        print(file_content)
    ```

2. loads 和 dumps

   ```python
   # 与两外两个的区别就是不会写入文件， 只是做了数据类型的转换
   # loads把字符串转换成数据类型  
   # dumps把数据类型转换成字符串 
   
   a = [1, 2, 3]
   b = json.dumps(a)
   print(a, b)
   ```

3. open的坑

    如果找不到对应的文件就会报错
