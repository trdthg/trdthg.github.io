# Git

## 远程仓库

### 本地创建远程仓库

[hub-git 命令行插件](https://hub.github.com/)

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

-u 选项是--set-upstream-to 的简写
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

## 仓库管理

### 拆分仓库

1. 将 src/locale 目录拆分到一个新分支里

```
git subtree split -P src/locale -b my-locale
```

> 必须从仓库根目录下执行

2. 从另一个仓库里拉取上面的分支

```
cd ..
mkdir repo
cd repo
git init

git pull ../dayjs my-locale
```

## 打标签

### 共享标签

默认情况下，git push 命令并不会传送标签到远程仓库服务器上。在创建完标签后你必须显式地推送标签到共享服务器上。
这个过程就像共享远程分支一样——你可以运行 git push origin tagname。

```
git push origin v1.5
```

如果想要一次性推送很多标签，也可以使用带有 --tags 选项的 git push 命令。这将会把所有不在远程仓库服务器上的标签全部传送到那里。

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

git hook 的所有类型都在`.git/hooks`文件夹下

```
applypatch-msg.sample      post-update.sample     pre-merge-commit.sample    pre-rebase.sample        update.sample
commit-msg.sample          pre-applypatch.sample  prepare-commit-msg.sample  pre-receive.sample
fsmonitor-watchman.sample  pre-commit.sample      pre-push.sample            push-to-checkout.sample
```

不过一般可以使用 [husky](https://github.com/typicode/husky) 这个插件去具体使用

### 安装

npm install husky -D

### 生成 ./husky 配置文件夹

```
npm set-script prepare "husky install"
npm run prepare
```

### Add a hook:

下面可以直接把要执行的脚本写在 `./husky/pre-commit` 中

```
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```

### 测试：

```
git commit -m "Keep calm and commi
```

## .gitignore

### 基本规则

```
.idea/          # 忽略仓库中所有.idea (目录)
/.idea/         # 忽略仓库中 (根) 目录下的.idea (目录)
/.settings      # 忽略仓库中 (根) 目录下的 .settings (文件或目录)
~'$'*.docx      # office 打开时生成的 (临时文件)

!etc/eclipse/.checkstyle    # (不忽略) .checkstyle 文件或目录
```

### glob 模式 (正则)

```
doc/*.txt           # 忽略 doc 目录下一级的所有 (以 `.txt` 结尾) 的 (文件或目录)
doc/**/*.pdf        # 忽略 doc (目录下所有的) .pdf 文件或目录

debug?.log          # 忽略 debug?.log 文件或目录，其中 ? 为任意一个字符

debug[0-9].log      # 忽略 debug0.log、debug2.log 等，但不忽略 debuga.log 文件
debug[01].log       # 仅忽略 debug0.log、debug1.log
debug[!01].log      # 不忽略 debug0.log、debug1.log
```

### 特性

- 从上到下，后面覆盖前面的
- 以上规则仅适用于未被缓存或加入版本控制的文件 如果忽略失效，可以尝试
  ```
  .gitignore 只能忽略那些原来没有被 track 的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore 是无效的。
  那么解决方法就是先把本地缓存删除（改变成未 track 状态），然后再提交。

  git rm -r --cached .

  git add .
  git commit -m 'update .gitignore'
  ```

## 其他

### pull

[菜鸟](https://www.runoob.com/git/git-pull.html) git pull 其实就是 git fetch 和 git
merge FETCH_HEAD 的简写。命令格式如下：

```
git pull <远程主机名> <远程分支名>:<本地分支名>
```

### amend

覆盖最近一次 commit 信息

```
git commit --amend  -m ":bug: Fix: xxx" -s
```
