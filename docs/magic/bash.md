# Bash

## 变量

### 定义

```sh
# 普通变量
myUrl="abcd"

# 只读变量
readonly myUrl="abcd"
```

注意事项

- 变量定义的等号两边**不能有空格**
- 使用变量时 变量名外面的花括号是可选的
  ```sh
  for skill in Ada Coffee Action Java; do
    echo "I am good at ${skill}Script"
  done
  ```
- 使用 `unset` 删除变量

### 字符串

- 获取长度

```sh
echo "length: ${#myUrl}"
```

- 获取切片

```sh
echo "length: ${myUrl:1:4}"
```

- 第一次出现的索引

```sh
string="runoob is a great site"
echo `expr index "$string" r`  # 输出 1
echo `expr index "$string" u`  # 输出 2
echo `expr index "$string" un`  # 输出 2
```

### 数组

```sh
array=(value0 garabe value2 value3)
array[1]=value1

echo ${array[1]}
echo ${array[@]} # 读取所有

# 读取长度
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
```

bash 里的数组和字典较为类似，如果不指定，那么每个元素对应的键就是索引

```sh
dict=()
# declare dict
# declare -A dict
dict["a"]=1
echo ${dict["a"]}
# 1
```

## 参数

### `$` 相关

1. 参数相关

- **`$#`**:传递到脚本的参数个数

下面两个常用来遍历所有参数

- **`$@`**:	与 **`$*`** 相同，但是使用时加引号，并在引号中返回每个参数。

  如 `$@` 用 `「"」` 括起来的情况、以 `"$1" "$2" … "$n"` 的形式输出所有参数。

  ```sh
  for i in "$*"; do
      echo $i
  done
  # 1 2 3

  for i in "$@"; do
      echo $i
  done

  # 1
  # 2
  # 3
  ```

- `$_`:	拼接所有参数并返回。

  如 `$_` 用 `「"」` 括起来的情况、以 `"$1 $2 … $n"` 的形式输出所有参数。

2. 进程 ID 相关

- `$$`:	脚本运行的当前进程 ID 号
- `$!`:	后台运行的最后一个进程的 ID 号
- `$-`:	显示 Shell 使用的当前选项，与 set 命令功能相同。
- `$?`:	显示最后命令的退出状态。0 表示没有错误，其他任何值表明有错误。

## 运算符

原生 bash 不支持数学运算，但是可以通过其他命令实现，例如 awk 和 expr

```sh
val=`expr 2 + 2`
echo "两数之和为 : $val"
```

### 算数运算符

`+ - * / % = == !=`

**注意 :**

- 表达式和运算符之间必须有空格
- 表达式必须要被 `` 包含
- 注意要转义 `*` 号
  ```sh
  val=`expr $a \* $b`
  echo "a * b : $val"
  ```
  > 在 MAC 中 shell 的 expr 语法是：$((表达式))，此处表达式中的 "*" 不需要转义符号 "\" 。
- 判断的中括号两侧必须有空格
  ```sh
  if [ $a == $b ]
  then
    echo "a 等于 b"
  fi
  if [ $a != $b ]
  then
    echo "a 不等于 b"
  fi
  ```

### 关系运算符

关系运算符只支持数字，不支持字符串，除非字符串的值是数字。

`-eq -ne -gt -lt -ge -le`

### 布尔运算符

`! (非)  -o (或)  -a (与)`

### 逻辑运算符

`&& ||`

### 字符串运算符

- `==`: 相等
- `!=`: 不相等
- `$`: 字符串是否不为空
  ```sh
  if [ $a ]
  ```

- `-z`: 长度是否为 0
  ```sh
  if [ -z $a ]
  ```
- `-n`: 长度是否不为 0

### 文件测试运算符

常用

- `-e`: 检测文件（包括目录）是否存在
- `-s`:	检测文件是否为空（文件大小是否大于 0）
- `-f`: 检测文件是否是普通文件（既不是目录，也不是设备文件）
- `-d`: 检测文件是否是目录

- `-r`: 检测文件是否可读
- `-w`: 检测文件是否可写
- `-x`: 检测文件是否可执行

其他

- `-b`: 检测文件是否是块设备文件
- `-c`: 检测文件是否是字符设备文件
- `-g`: 检测文件是否设置了 SGID 位
- `-k`: 检测文件是否设置了粘着位 (Sticky Bit)
- `-p`: 检测文件是否是有名管道
- `-u`: 检测文件是否设置了 SUID 位
- `-S`: 判断某文件是否 socket。
- `-L`: 检测文件是否存在并且是一个符号链接。

## 流程控制

### if

if 语句语法格式：

```sh
if [ "$a" -gt "$b" ]; then
    command1
elif (( a > b )); then
    command2
else
    commandN
fi
```

- if else 的 `[...]` 判断语句中大于使用 `-gt`，小于使用 `-lt`。
- 如果使用 `((...))` 作为判断语句，大于和小于可以直接使用 `>` 和 `<`。
- 也可以使用 test

> 注意：所有分支都不能为空

写成一行（适用于终端命令提示符）：

```sh
if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi
```

### for 循环

```sh
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done
```

写成一行：

```sh
for var in item1 item2 ... itemN; do command1; command2… done;
```

支持 break 和 continue 语句

```sh
while : # 无限循环
do
    echo -n "输入 1 到 5 之间的数字:"
    read aNum # 获取用户输入
    case $aNum in
        # 可以匹配多个模式
        1|2|3|4|5) echo "你输入的数字为 $aNum!"
        ;;
        *) echo "你输入的数字不是 1 到 5 之间的! 游戏结束"
            break
        ;;
    esac
done
```

示例

```sh
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done

for str in This is a string
do
    echo $str
done
```

### while

```sh
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
```

> let 命令，它用于执行一个或多个表达式，变量计算中不需要加上 $ 来表示变量

### 无限循环

无限循环语法格式：

```sh
while :
do
    command
done
```

或者

```sh
while true
do
    command
done
```

或者

```sh
for (( ; ; ))
```

### until 循环

until 循环执行一系列命令直至条件为 true 时停止。

与 while 循环在处理方式上刚好相反。

until 语法格式：

```sh
until condition
do
  command
done
```

输出 0-9

```sh
a=0

until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```

### case 语句

- `;;`: 表示 break
- `*`: 如果没有匹配就会走 `*`

```sh
aNum=1
case $aNum in
    1|2)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
```

## 函数

bash 的函数类似于进程

参数传递直接跟在函数名之后，参数获取使用 `$` 获取

```sh
funWithParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73
```

- 返回值可选 return，如果不加 return，会以最后一条命令的返回值作为返回值。
- 命令的返回值仅仅表示是否出错，返回值为 0 就是成功，其他值为出错

  > 要注意的是，和 C 语言不同，shell 语言中 0 代表 true，0 以外的值代表 false。

- 必须使用 `$?` 拿到真正的返回值

```sh
function demoFun2(){
 echo "这是我的第二个 shell 函数!"
 expr 1 + 1
}

demoFun2
echo $?
```

## 重定向

- 将 stdout 重定向到 file：`command > file`
- 将 stdin 重定向到 file：`command < file`
- stderr 重定向到 file： `command 2>file`
  > 注意：这里的 2 和 > 之间不可以有空格，2> 是一体的时候才表示错误输出。
- stderr **追加**到 file 文件末尾：`command 2>>file`

- 将 stdout 和 stderr 合并后重定向到 file: `command > file 2>&1` 或 `command >> file 2>&1`
- 对 stdin 和 stdout 都重定向：`command < file1 >file2`

  command 命令将 stdin 重定向到 file1，将 stdout 重定向到 file2。

执行某个命令，但不在屏幕上显示输出结果，那么可以将输出重定向到 _/dev/null_：

```sh
command > /dev/null
```

/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃。如果尝试从该文件读取内容，那么什么也读不到。

将命令的输出重定向到它，会起到"禁止输出"的效果。如果希望屏蔽 stdout 和 stderr，可以这样写：

```sh
command > /dev/null 2>&1
```

## import

Shell 也可以包含外部脚本

```sh
#使用 . 号来引用test1.sh 文件
. ./test1.sh

# 或者使用以下包含文件代码
# source ./test1.sh
```

## 其他

### echo

- 执行命令（反引号）
  ```sh
  echo `date`
  ```
- 结果重定向
  ```sh
  echo "It is a test" > myfile
  ```
- 原样输出字符串，不进行转义或取变量 (用单引号)
  ```sh
  echo '$name\"'
  ```
- `-e` 开启转义

  ```sh
  echo -e "OK! \n" # -e 开启转义 \n 换行

  echo -e "OK! \c" # -e 开启转义 \c 不换行
  ```

### test

```sh
if [ $a == $b ]

if test $a == $b
```

### 注释

`SomeThing` 可以是任何东西

```sh
:<<SomeThing
注释内容...
注释内容...
注释内容...
SomeThing
```
