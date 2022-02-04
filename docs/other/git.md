# git常用操作

## 远程仓库

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

## 删除分支

### 删除远程
```
git push origin --delete xxx
```
### 删除本地
```
git branch -d xxx
git branch -D xxx
```

## 缓存当前修改
```
git stash

git stash list

git stash pop
```

## 本地创建远程仓库
[hub-git命令行插件](https://hub.github.com/)
```
hub create
```

## pull
[菜鸟](https://www.runoob.com/git/git-pull.html)
git pull 其实就是 git fetch 和 git merge FETCH_HEAD 的简写。 命令格式如下：
```
git pull <远程主机名> <远程分支名>:<本地分支名>
```

## 其他
覆盖最近一次commit信息
```
git commit --amend  -m ":bug: Fix: xxx" -s
```