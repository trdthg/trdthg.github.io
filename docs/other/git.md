# git常用操作

## 远程仓库

### 本地创建远程仓库
[hub-git命令行插件](https://hub.github.com/)
```
hub create
```

### 添加远程仓库
```
git remote add origin(远程仓库名，随意) git@github.com:trdthg/trdthg.github.io.git
```

### 追踪远程分支

```
本地分支名可省略，默认为当前分支
git branch -u origin/remote_branch_name  <local_branch_name>

创建分支时追踪
git checkout -b local_branch_name --track origin/remote_branch_name

-u选项是--set-upstream-to的简写
git branch --set-upstream-to=origin/remote_branch_name  local_branch_name
```

## 分支

### 删除远程分支
```
git push origin --delete xxx
```
### 删除本地分支
```
git branch -d xxx
git branch -D xxx
```

### 缓存当前修改
```
git stash

git stash list

git stash pop
```

## 打标签

### 共享标签
默认情况下，git push 命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到共享服务器上。 这个过程就像共享远程分支一样——你可以运行 git push origin tagname。

```
git push origin v1.5
```
如果想要一次性推送很多标签，也可以使用带有 --tags 选项的 git push 命令。 这将会把所有不在远程仓库服务器上的标签全部传送到那里。
```
git push origin --tags
```

### 创建标签
Git 支持两种标签：轻量标签（lightweight）与附注标签（annotated）。

```
附注标签
在 Git 中创建附注标签十分简单。 最简单的方式是当你在运行 tag 命令时指定 -a 选项
-m 选项指定了一条将会存储在标签中的信息。

git tag -a v1.4 -m "my version 1.4"

轻量标签
另一种给提交打标签的方式是使用轻量标签。 轻量标签本质上是将提交校验和存储到一个文件中——没有保存任何其他信息。 创建轻量标签，不需要使用 -a、-s 或 -m 选项，只需要提供标签名字：

git tag v1.4-lw
```

### 忘记打标签？
加上分支即可
```
git tag -a v1.2 9fceb02
```
### 删除标签
```
git tag -d v1.4-lw
```

## git hook

## 其他

### pull
[菜鸟](https://www.runoob.com/git/git-pull.html)
git pull 其实就是 git fetch 和 git merge FETCH_HEAD 的简写。 命令格式如下：
```
git pull <远程主机名> <远程分支名>:<本地分支名>
```

### amend

覆盖最近一次commit信息
```
git commit --amend  -m ":bug: Fix: xxx" -s
```