

# 第四次课 SQL

## 1. 了解数据库

#### 1.1 什么是数据库

**数据库**，又称为数据管理系统，简而言之可视为[电子化](https://zh.wikipedia.org/w/index.php?title=電子化&action=edit&redlink=1)的[文件柜](https://zh.wikipedia.org/wiki/档案柜)——存储电子[文件](https://zh.wikipedia.org/wiki/檔案)的处所，用户可以对[文件](https://zh.wikipedia.org/wiki/檔案)中的资料运行新增、截取、更新、删除等操作[[1\]](https://zh.wikipedia.org/wiki/数据库#cite_note-1)。

#### 1.2 技术初衷

在[操作系统](https://zh.wikipedia.org/wiki/操作系统)出现之后，随着[计算机](https://zh.wikipedia.org/wiki/计算机)应用范围的扩大、需要处理的[数据](https://zh.wikipedia.org/wiki/数据)迅速膨胀。最初，数据与[程序](https://zh.wikipedia.org/wiki/程序)一样，以简单的文件作为主要存储形式。以这种方式组织的数据在逻辑上更简单，但[可扩展性](https://zh.wikipedia.org/wiki/可扩展性)差，访问这种数据的程序需要了解数据的具体组织格式。当系统数据量大或者用户访问量大时，应用程序还需要解决数据的完整性、一致性以及安全性等一系列的问题。因此，必须开发出一种[系统软件](https://zh.wikipedia.org/wiki/系统软件)，它应该能够像操作系统屏蔽了硬件访问复杂性那样，屏蔽数据访问的复杂性。由此产生了数据管理系统，即数据库。

#### 1.3 数据库管理系统

主条目：[数据库管理系统](https://zh.wikipedia.org/wiki/数据库管理系统)

[数据库管理系统](https://zh.wikipedia.org/wiki/数据库管理系统)（英语：Database Management System，简称[DBMS](https://zh.wikipedia.org/wiki/DBMS)）是为管理[数据库](https://zh.wikipedia.org/wiki/資料庫)而设计的电脑[软件](https://zh.wikipedia.org/wiki/軟體)系统，一般具有存储、截取、安全保障、备份等基础功能。数据库管理系统可以依据它所支持的[数据库模型](https://zh.wikipedia.org/w/index.php?title=資料庫模型&action=edit&redlink=1)来作分类，例如[关系式](https://zh.wikipedia.org/wiki/關聯模型)、[XML](https://zh.wikipedia.org/wiki/XML)；或依据所支持的电脑类型来作分类，例如服务器聚类、移动电话；或依据所用查询语言来作分类，例如[SQL](https://zh.wikipedia.org/wiki/SQL)、[XQuery](https://zh.wikipedia.org/w/index.php?title=XQuery&action=edit&redlink=1)；或依据性能冲量重点来作分类，例如最大规模、最高运行速度；亦或其他的分类方式。不论使用哪种分类方式，一些DBMS能够跨类别，例如，同时支持多种查询语言。

#### 1.5 数据库的分类

1. 关系数据库

- [MySQL](https://www.mysql.com/cn/) 最广泛使用的

- Sqlite 轻量级数据库

- [Microsoft SQL Server](https://zh.wikipedia.org/wiki/Microsoft_SQL_Server) 微软的，上课用

- [Oracle数据库](https://zh.wikipedia.org/wiki/Oracle数据库) 企业级数据库

- 关系行数据库的存储格式类似于excel表格, 所有数据以表的形式按行或按列存储， 下图是一个mysql数据库中user表的可视化结果

  - TDSQL-C-tmp是数据库服务器的名字

  - demo 是其中一个数据库
  - user 是demo数据库中的一张表


2. 非关系型数据库（[NoSQL](https://zh.wikipedia.org/wiki/NoSQL)）

- [MongoDB](https://zh.wikipedia.org/wiki/MongoDB)
- Redis

非关系型数据库数据结构简单，内部是以键值对存储数据，结构相比关系型更简单

除此之外还有一系列用于专业用途的数据库， 在此不做说明

#### 1.6 操作数据库

##### 1.6.1 建立连接

一般数据库系统都分为两部分，服务端和客户端，在用户安装完数据库软件后，需要先启动数据库的服务端，接着通过客户端连接到服务端

- redis 需要先与服务端连接，有服务端执行具体操作

    我们用一行命令通过 redis 的客户端连接到了服务端，可以看到目前在操作的是运行在本机 (127.0.0.1)6379端口上的redis数据库的服务端，使用set命令设置了 a 对应的值为 111, 又用get命令获取了 a 的值

    这些命令实际上会被发送到服务端，在由服务端执行
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021313036.png)

- Sqlite 数据库没有服务端，操作的就是一个数据文件

    下面我们进入sqlite的命令行，直接创建了一个名为 test.db 数据库, 再次查看该文件夹，多了一个文件
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021314920.png)
##### 1.6.2 通过cmd操作数据库

下面是一些常规操作，通过在运行sqlite3时加上数据库文件名，就能连接到数据库


![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021315179.png)
分别执行了

- 创建数据表
- 插入一行数据
- 查看数据表中的所有数据

## 2. SQL 语句

SQL语句只是一个标准，不同的数据库软件的具体实现都大致相同，只有一些细节不同

SQL语句对关键字不区分大小写, 不过一般用大写

#### 2.1 数据类型

数据库支持的数据类型非常多，主要分为3类， 数字， 日期， 字符串（字符），这里以mysql的为例

**数字**

| 类型         | 大小     |
| ------------ | -------- |
| TINYINT      | 1 Bytes  |
| SMALLINT     | 2 Bytes  |
| MEDIUMINT    | 3  Bytes |
| INT或INTEGER | 4  Bytes |
| BIGINT       | 8  Bytes |
| FLOAT        | 4  Bytes |
| DOUBLE       | 8  Bytes |

**日期**

| 类型      | 大小 | 范围                                         | 格式                | 用途                     |
| --------- | ---- | -------------------------------------------- | ------------------- | ------------------------ |
| DATE      | 3    | 1000-01-01/9999-12-31                        | YYYY-MM-DD          | 日期值                   |
| TIME      | 3    | '-838:59:59'/'838:59:59'                     | HH:MM:SS            | 时间值或持续时间         |
| YEAR      | 1    | 1901/2155                                    | YYYY                | 年份值                   |
| DATETIME  | 8    | 1000-01-01 00:00:00/9999-12-31 23:59:59      | YYYY-MM-DD HH:MM:SS | 混合日期和时间值         |
| TIMESTAMP | 4    | unix*时间戳是*从1970年1月1日开始所经过的秒数 | YYYYMMDD HHMMSS     | 混合日期和时间值，时间戳 |

**字符串**

| 类型       | 大小                  | 用途                            |
| ---------- | --------------------- | ------------------------------- |
| CHAR       | 0-255 bytes           | 定长字符串                      |
| VARCHAR    | 0-65535 bytes         | 变长字符串                      |
| TINYBLOB   | 0-255 bytes           | 不超过 255 个字符的二进制字符串 |
| TINYTEXT   | 0-255 bytes           | 短文本字符串                    |
| BLOB       | 0-65 535 bytes        | 二进制形式的长文本数据          |
| TEXT       | 0-65 535 bytes        | 长文本数据                      |
| MEDIUMBLOB | 0-16 777 215 bytes    | 二进制形式的中等长度文本数据    |
| MEDIUMTEXT | 0-16 777 215 bytes    | 中等长度文本数据                |
| LONGBLOB   | 0-4 294 967 295 bytes | 二进制形式的极大文本数据        |
| LONGTEXT   | 0-4 294 967 295 bytes | 极大文本数据                    |

最常用的还是 int， char， varchar， text， datetime

#### 2.2 约束

数据库为了保持内部数据的完整性和安全性， 可以对字段作出一些限制， 比如年龄是数字类型，可以规定age > 0 and age < 100, 或者性别只能为男或女， 用户的id不能重复等等。

- **NOT NULL** - 指示某列不能为空。
- **UNIQUE** - 保证某列的每行必须有唯一的值。
- **PRIMARY KEY** - NOT NULL 和 UNIQUE 的结合。确保某列（或两个列多个列的结合）有唯一标识，有助于更容易更快速地找到表中的一个特定的记录。
- **FOREIGN KEY** - 保证另外一个表中一定某一行与这个表中对应
- **CHECK** - 保证列中的值符合指定的条件。
- **DEFAULT** - 规定没有给列赋值时的默认值。

 约束一般在创建数据表时加入，不同数据库有不同的写法，这一块可以以后深入研究

#### 2.3 一些基本操作

注意：

1. 数据库语句都以 `；` 结尾，所以普通的换行不影响sql的执行
2. 以 `.sql` 一般用 `--` 开头做为注释
3. SQL 语句是大小写都可以的，不过一般为了可读性更好，还是用大写

##### 2.3.1 创建数据库

```sql
-- sqlite不用搞， 链接数据库时就会自动创建，例如
-- import sqlite3
-- conn = sqlite3.connect('test.db')

-- 正常数据库需要用语句创建，例如
CREATE DATABASE test；
```

##### 2.3.2 新建数据表

```sql
-- 注意！！！ 最后一个字段结尾不能有逗号
-- 加入约束建议按照教程自己查询
CREATE TABLE table_name
(
	column_name1 data_type(size) constraint_name,
	column_name2 data_type(size) constraint_name,
	column_name3 data_type(size) constraint_name
);
```

##### 2.3.3 查询数据

```sql
SELECT DISTINCT column_1,column_2
FROM table_name;
```

查询时可以加入一些运算符， 这里列出了3个简单的运算符

1. **WHERE**

```sql
-- WHERE name = 'zhangsan'， 只查询名字为张三的行
SELECT column_1,column_2
FROM table_name
WHERE name = '张三';
```

2. **AND & OR**

```sql
-- WHERE name = 'zhangsan'， 只查询名字为张三的行
SELECT column_1,column_2
FROM table_name
WHERE name = '张三' OR name = '李四';
```

3. **ORDER BY**

```sql
-- 按照column_1的值升序排列
SELECT column_1,column_2
FROM table_name
ORDER BY column_1
```

##### 2.3.4 插入数据

1. 插入所有字段

```sql
INSERT INTO table_name
VALUES (value1,value2,value3,...);
```

2. 插入一些字段

```sql
-- 在指定了列插入一些字段
INSERT INTO table_name (column1,column2,column3)
VALUES (value1,value2,value3);
```

##### 2.3.5 修改数据

```sql
-- 修改姓名为张三的行，column1,column2对应的值
UPDATE table_name
SET column1=value1,column2=value2,...
WHERE name = '张三';
```

##### 2.3.6 删除字段

```sql
-- 删除姓名为张三的行
DELETE FROM table_name
WHERE name = '张三';
```

## 3. Python 操作 Sqlite

操作不同的数据库，需要引入不同的库，比如操作mysql就需要引入pymysql，操作sqlite就需要sqlite3， 这些库都可以通过pip安装

### 3.0 安装 Sqlite

`pip install sqlite3`

### 3.1 基本操作

```python
# 对应 demo1.py 文件

# 1.引入操作sqlite数据库需要的库
import sqlite3

# 2. 与数据库建立连接， 如果目录下没有该文件， 就会自动创建
conn = sqlite3.connect('test.db')

# 3.1 建立一个可以操作数据库的对象， 我们通过它执行sql语句
cursor = conn.cursor()

# 3.1 创建数据表， 这里是一个字符串， python可以用``` ```让字符串能够换行
# ！！！注意： 如果名为user的数据表已经存在， 就会报错， 可以先把文件删除
cursor.execute('''
create table user (
    id varchar(20) primary key,
    name varchar(20)
)
''')

# 3.2.1 向user表里插入一行新的数据，字符串两边需要加'', 加上\是为了转义，防止和外面的''冲突
cursor.execute('insert into user (id, name) values (\'1\', \'Michael\')')
# 3.2.2因为数据库本身具有事务这个概念, 对数据库的修改操作之后, 都要在进行一次提交, 这个修改才真正生效
conn.commit()

# 3.3.1 查询所有user表里的数据，不会直接返回查询结果
cursor.execute('select * from user')
# 3.3.2 获取查询结果， 查询需要主动用fetchall()获取查询结果
values = cursor.fetchall()
print(values)
```

## 3. 修改登录

### 3.1 准备一个数据库

```sql
import sqlite3
import time
conn = sqlite3.connect('test.db')
cursor = conn.cursor()
def get_time():
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

cursor.execute('''
create table user (
    id int primary key,
    username varchar(20),
    password varchar(20),
    createtime datetime
)
''')

cursor.execute('insert into user (id, username, password, createtime) values (?, ?, ?, ?)', [1, 'zhangsan', 'aaaa', get_time()])
cursor.execute('insert into user (id, username, password, createtime) values (?, ?, ?, ?)', [2, 'lisi', 'bbbb', get_time()])
cursor.execute('insert into user (id, username, password, createtime) values (?, ?, ?, ?)', [3, 'wangwu', 'cccc', get_time()])
cursor.execute('insert into user (id, username, password, createtime) values (?, ?, ?, ?)', [4, 'zhaoliu', 'dddd', get_time()])
conn.commit()

cursor.execute('select * from user')
values = cursor.fetchall()
print(values)
```

### 3.2 完善之前的登录

```python
from flask import Flask, request, make_response
import time
import json
import sqlite3

app = Flask(__name__)

def get_time():
    return time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

# 访问 /user 直接返回用户的所有信息
@app.route('/users')
def index():
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    cursor.execute('select * from user')
    values = cursor.fetchall()
    return json.dumps(values)

# /self 根据cookie返回用户自己的信息
@app.route('/self')
def self():
    username = request.cookies.get("username", None)
    password = request.cookies.get("password", None)
    if username and password:
        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        cursor.execute('select * from user where username = ?', [username])
        user = cursor.fetchone()
        if user:
            return json.dumps(user)
        else:
            return "没有该用户"
    else:
        return '您尚未登录'

# /register 在数据库中插入一条新的用户
@app.route('/register')
def register():
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()

    args = request.args
    username = args.get('username')
    password = args.get('password')
    if username and password:
        cursor.execute('select username, password from user where username = ?', (username,))
        value = cursor.fetchone()
        if value:
            return "该用户名已经被注册"
        else:
            cursor.execute('insert into user values(?, ?, ?, ?)', (6, username, password, get_time()))
        return "注册成功"
    else:
        return '没有输入注册信息'

# /login 登录,在数据库中查询用户, 如果用户名密码匹配, 就设置cookie
@app.route('/login')
def login():
    # 建立数据库连接
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()

    args = request.args
    username = args.get('username')
    password = args.get('password')
    if username and password:
        # 查询状态
        cursor.execute('select username, password from user where username = ?', [username])
        value = cursor.fetchone()
        if value:
            if password == value[1]:
                response = make_response("登录成功")
                response.set_cookie("identifier", username + password)
                response.set_cookie("username", username)
                response.set_cookie("password", password)
                return response
            else:
                return '密码错误'
        else:
            return "没有该用户"
    else:
        return '没有输入用户的用户名和密码'

app.run(host='127.0.0.1', port=5000)

```

## 4. 附录

### 4.1 python查看变量的类型

```python
a = [1, 2, 3]
# type() 能够输出变量的类型
print(type(a))

a = {
    'a': 1,
    'b': [1, 2, 3]
}

print(type(a))
print(type(a.get('a')))
print(type(a.get('b')))
print(type(a.get('c')))
# <class 'dict'> 字典类型
# <class 'int'> 数字类型
# <class 'list'> 列表类型
# <class 'NoneType'> 空
# 所以使用get时要判断返回值是否为空
```

# sss

###### dfssfesf

```c
int main() {
	return 0;
}
