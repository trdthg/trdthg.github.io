# 进程组、会话、作业控制

## 相关信号

- SIGTTIN: BG 从终端读取
- SIGTTOU: BG 向终端写入
- SIGSTOP: 确保停止
- SIGTSTP: 终端停止，当用户按下 Ctrl+Z 时，会产生这个信号

## ps

- `$$`: shell 的 pid

```sh
ps -p $$ -o "pid pgid sid tty time command"
```

## nohup

控制终端停止后会向前端进程组发送 SIGHUP 信号

### 实例 1

```sh
./a.out > samegroup.log 2>&1 &
./a.out s > samegroup.log 2>&1
# 接着关闭终端
```

- 控制进程: `bash`
- 后台进程组: `./a.out > samegroup.log 2>&1 &`
- 前台进程组: `./a.out s > samegroup.log 2>&1`

### 实例 2

```sh
exec ./a.out d s s > sig.log 2>&1
# 接着关闭终端
```

exec 会使 a.out 取代 shell 成为控制进程

此时，d 和 ./a.out 在同一进程组内，为前端进程组

s, s 则为后端进程组

> nohup 会使进程组脱离控制终端，但不会使进程组脱离控制进程? bash 内置命令 disown 提供类似的功能

## job

- `jobs`: 列出当前 shell 的所有任务
- `fg %n`: 将任务 n 移动到前台 SIGCONT
- `bg %n`: 恢复后台被停止的作业 SIGCONT
- Control-Z: 将当前前台进程组挂起 SIGTSTP

- stty tostop：禁止后台任务输出到终端

    ```sh
    stty tostop
    date &
    fg
    ```
