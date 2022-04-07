# Python

## MicroPython

### MicroPython --- esp8266

#### 运行

1. 准备项目

- 下载 win10usb-series 的驱动[个人用]()
- 下载基于 ESP8266 的 MicroPython
  固件[MicroPython 的官网](https://micropython.org/download/#esp8266)
- 下载串口工具[Putty](https://www.putty.org/)
- 下载[烧录工具](https://www.espressif.com/en/support/download/other-tools)
- 下载[webrepl 客户端](https://github.com/micropython/webrepl)

2. 烧录连接

- 烧写固件把该固件烧写到 0x0 位置即可。
- 上电打印出现下例表示成功

```java
MicroPython v1.8.6-7-gefd0927 on 2016-11-10; ESP module with ESP8266
Type "help()" for more information.
>>>
```

::: warning 注意 putty 连接时，若键盘无法输入，尝试设置 (Connection -> Serial -> Flow control =
None) :::

#### 连接 WiFi

- 连接

```python
import network
sta_if = network.WLAN(network.STA_IF)
sta_if.active(True)
sta_if.scan()                             # Scan for available access points
sta_if.connect("<wifiname>", "<password>") # Connect to an AP
sta_if.isconnected()                      # Check for successful connection
```

- 设置上电自动连接 MicroPython 初始化后都会自动执行 main.py 文件，所以我们只需要设置该文件即可上电自动连接
  WiFi。打开自己常用的编辑器，输入下面代码，并保存为 main.py 文件：

```python
# main.py
import network
import webrepl
import time

SSIDs = [("602", "4602yyds")]

def do_connect():
    import network
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('connecting to network...')
        wlan.connect(SSIDs[0][0], SSIDs[0][1])

    start = time.time()
    while not wlan.isconnected():
        time.sleep(1)
        if time.time()-start > 5:
            print("connect timeout!")
            break

    if wlan.isconnected():
        print("successfully connected!")
        print('network config:', wlan.ifconfig())

def main():
    do_connect()
main()
```

#### WebREPL 上传文件

webrepl 是 MicroPython 官方提供的文件管理工具。 并且有一个 webrepl 客户端工具， 使用它可以通过浏览器来访 ESP8266。

1. 初始化 (putty)

```python
import webrepl_setup
```

2. 启动 (putty)

```python
import webrepl
webrepl.start()
```

3. 连接 (webrepl 客户端)

- ESP8266 连接好 WiFi 后，输入 sta_if.ifconfig() 查看连接信息，返回的元组第一个 IP 就是无线路由器分配给 ESP8266
  的 IP。
- 如果你的电脑和 ESP8266 在同一个局域网，修改 WebREPL 要连接的地址为 ESP8266 的 IP，点击「Connect」，返回「Welcome
  to MicroPython!」说明连接成功，根据提示输入密码（密码默认不显示）。回车后显示「WebREPL connected」表示登录成功。
- 之后就可以用这个客户端上传下载文件了。

#### 待续...

## Conda

### 基本操作

```shell
# 安装 PYTHON 指定环境
conda create -n $name python=$version
# 列出所有环境
conda env list
# 进入环境
conda activate $name
# 退出环境
conda deactivate $name
# 删除环境
conda env remove -n $name
```

::: warning 若不进入环境，默认在 base 环境进行所有操作 :::

### 待续...

## 模拟输入

### PyUserInput

1. 安装

- 安装 PyHook: [PyHook](https://www.lfd.uci.edu/~gohlke/pythonlibs/) 找到 PyHook 目录，
  找到对应的 python 版本，下载后直接`pip install pyHook‑1.5.1‑cp35‑cp35m‑win_amd64.whl`
- 安装 PyUserInput: `pip install PyUserput`

2. 基本操作

```python
from pymouse import *     # 模拟鼠标所使用的包
from pykeyboard import *   # 模拟键盘所使用的包
import time   # 连续进行两个动作可能太快而效果不明显，因此加入暂停时间

m = PyMouse()   # 鼠标的实例 m
k = PyKeyboard()   # 键盘的实例 k
x_dim, y_dim = m.screen_size()     # 获取屏幕尺寸（一般为电脑屏幕的分辨率，如 1920*1080）
# 估计需要点击的位置坐标（不知道有没有定位代码，我没找到，我是自己估计的。例如，我的电脑屏幕为 (1920，1080)，我想要单击的地方估计坐标为 (10，500)）

m.move(10, 500)   # 将鼠标移动到位（此步可忽略，直接单击也可）
time.sleep(0.5)   # 暂停 0.5s，方便观察移动结果
m.click(10, 500, 1, 1)   # 表示在 (10, 500) 的地方，单击左键
```

3. 常用函数

```python
k.type_string('Hello, World!')	# 模拟键盘输入字符串
k.press_key('H')	# 模拟键盘按 H 键
k.release_key('H')	# 模拟键盘松开 H 键
k.tap_key("H")	# 模拟点击 H 键
k.tap_key('H',n=2,interval=5)	# 模拟点击 H 键，2 次，每次间隔 5 秒
k.tap_key(k.function_keys[5])	# 点击功能键 F5
k.tap_key(k.numpad_keys[5],3)	# 点击小键盘 5,3 次
```

4. 组合键

```python
k.press_key(k.alt_key)	# 按住 alt 键
k.tap_key(k.tab_key)	# 点击 tab 键
k.release_key(k.alt_key)	# 松开 alt 键
```

5. 常见的键和键值码

```python
字母和数字键     数字小键盘的键       功能键         其它键
键   键码      键   键码          键   键码       键         键码
A   65          0   96            F1   112       Backspace  8
B   66          1   97            F2   113       Tab        9
C   67          2   98            F3   114       Clear      12
D   68          3   99            F4   115       Enter      13
E   69          4   100           F5   116       Shift      16
F   70          5   101           F6   117       Control    17
G   71          6   102           F7   118       Alt        18
H   72          7   103           F8   119       Caps Lock  20
I    73         8   104           F9   120       Esc        27
J    74         9   105           F10  121       Spacebar   32
K   75          *   106           F11  122       Page Up    33
L   76          +   107           F12  123       Page Down  34
M   77        Enter 108                          End        35
N   78          -   109                          Home       36
O   79          .   110                          LeftArrow  37
P   80          /   111                          UpArrow    38
Q   81                                           RightArrow 39
R   82                                           DownArrow  40
S   83                                           Insert     45
T   84                                           Delete     46
U   85                                           Help       47
V   86                                           Num Lock   144
W  87
X   88
Y   89
Z   90
0   48
1   49
2   50
3   51
4   52
5   53
6   54
7   55
8   56
9   57
```

## 标准库

### http.client

1. demo 实例

```python
import json

h1 = HTTPConnection('127.0.0.1:7878')
body = json.dumps({"aaa": 1, "bbb": 2, "ccc": "sss"}).encode("utf-8")
h1.request("POST", "/", body=body, headers={"Content-Type": "application/json"})
```

2. 基本流程

```php
          --- start ---
                |
                |===== self.__state = _CS_IDLE
                v
HTTPConnection => _create_connect()
                |
                | socket  // 获取连接
                | _output // 储存请求字符串
                v
    request() -> _send_request(method, url, body, headers)
                |
                |===== self.__state = _CS_REQ_STARTED
                v
    putrequests(method, url)
                |
                | self._output.append(method url http-vsn)
                v
[ putheaders(hdr, value) for hdr, vale in headers ]
                |
                | 形成了不带 body 的部分
                v
    endheaders(body) -> _send_output(body)
                |
                |===== self.__state = _CS_REQ_STARTED
                | self.__state = _CS_REQ_SENT
                | send(msg)
                | send(body) if body exists
                | send(b"0\r\n\r\n")
                v
            ---end---
```
