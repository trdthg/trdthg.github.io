# 第一节课 前导知识

## Python 安装

> [菜鸟教程](https://www.runoob.com/python3/python3-tutorial.html)
>
> [廖学锋的官方网站](https://www.liaoxuefeng.com/wiki/1016959663602400)
>
> [白月黑羽](http://www.byhy.net/tut/py/basic/01/)

1. import & pip import 能够引用另一个 python 文件里定义的函数，变量等 也能用来引入一个文件夹中的东西（当然这个文件夹需要一定的格式）

pip 是一个官方的包管理器，我们能用 pip 下载别人的模块，如果下载没有速度，是因为默认 python 是从官方的软件仓库寻找你需要的模块 (库，包) pip
install -i https://pypi.tuna.tsinghua.edu.cn/simple 加上 -i 就能指定从国内的软件仓库下载

# 也可以通过编写配置文件把默认的 url 改为需要的

```sh
pip install flask
# 或者
D:/python/python.exe pip install flask
# 能够直接在命令行中直接使用 pip 是因为：在安装 python 是已经将 python 添加到了环境变量里
# 这种写法能够应对你的电脑上有多个不同 python 版本的情况
```

2. print

```python
a = 1
print("a{}".format(a))
print("a{}".format(a) == "a1")

print("a{1}".format(a, "11"))
print(f"{a}")
```

3. 循环控制

- for、while
  ```python
  for i in [0, 1, 2]:
      print(i)
  for i in range(1, 5):
      print(i)

  i = 5
  while i > 0:
      print(i)
      i -= 1
  ```
- if
  ```python
  a = 1
  while True:
      if a == 1:
          print(a)
          a = 2
      elif a == 2:
          print(a)
          a = 3
      else:
          break
  ```

4. 容器

- list

```python
a = [1, 2, 3]
print(a)

# 获得一个列表
a = list("[1, 2, 3]")
print(a)

# 向后追加 (一个元素 (任意类型)，或者一个列表)
a.append(4)

a.extend([4, 5, 6])
a += [4, 5, 6]

# 删除最后一个元素
last_elem = a.pop()
```

- dict

```python
 a = {
     "a": 1,
     "b": 2,
     "c": 3,
 }


 # 添加元素，如果存在就覆盖原来的的内容
 a["d"] = 4
 # 删除一个键值对
 del a["a"]
```

5. 函数

```python
# example1
def a(num1, num2):
    return num1 + num2

num = a(1, 2)
print(num)
```

## 网络基础

- 信息传输
- URL（Uniform Resource Locator 统一资源定位符）
- DNS（Domain Name System 域名系统）

## 实现一个简易页面的服务器

> [flask 官网](https://flask.net.cn/)
>
> [W3Cschool](https://www.w3cschool.cn/flask/)

```python
from flask import Flask
app = Flask("hello_server")


@app.route('/')
def hello_world():
    return 'Hello World'

app.run(host="0.0.0.0", port=5000)
```

在浏览器访问 http://localhost:5000

```text
hello World
```
