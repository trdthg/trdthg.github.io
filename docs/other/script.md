# 脚本

## shell 脚本

### 文件操作

```shell
rm -r folder_name/* # /*忽略以。开头的隐藏文件，/.不会
cp -a foldername/* desc # 拷贝
mv oldname newname # 重命名
cd - # 返回上次工作目录
```

### CodeRunner For C

```json
"code-runner.runInTerminal": true,
    "code-runner.executorMap": {
		"c":
			"cd $dir &&
			if (!'exes') { mkdir 'exes' } ; &&
			gcc $fileName -o exes\\$fileNameWithoutExt &&
			cd ./exes &&
			./$fileNameWithoutExt"
	},
```

## 去广告

```javascript
// ==UserScript==
// @name         anti-ad
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Me
// @match        *://www.nvzox.com/*
// @match        *://zh.numberempire.com/*
// @match        *://wenku.baidu.com/*
// @match        *://www.bilibili.com/*
// @grant        none
// ==/UserScript==

"use strict";
function rmad() {
  var ads = new Array();
  ads.push(document.getElementById("activity_vote"));
  for (var index = 0; index < ads.length; index++) {
    if (ads[index]) {
      ads[index].style.display = "none";
    }
  }
  var ads_arr = new Array();
  ads_arr.push(document.getElementsByClassName("ad-report"));
  ads_arr.push(document.getElementsByClassName("operate-wrapper"));
  for (index = 0; index < ads_arr.length; index++) {
    if (ads_arr[index]) {
      for (var i = 0; i < ads_arr[index].length; i++) {
        if (ads_arr[index][i] != null) {
          ads_arr[index][i].style.display = "none";
        }
      }
    }
  }
  ads = [];
  ads_arr = [];
}
(function () {
  var times = 50;
  setTimeout(() => {
    while (times--) {
      setTimeout(function () {
        rmad();
      }, 500);
    }
  }, 3000);
})();
```

---

## markdown 流程图

- 六个元素
- 4 个方向
- 两个判断

```flow
startID=>start: 开始框
inputoutputID=>inputoutput: 输入输出框
operationID=>operation: 操作框
conditionID=>condition: 条件框
subroutineID=>subroutine: 子流程
endID=>end: 结束框

startID(left)->inputoutputID()->operationID->conditionID(yes, right)->endID
conditionID(no, left)->operationID
conditionID->
```

## manjaro

### cpu 调频

1. 查看当前所有 CPU 的信息：

```shell
cpupower -c all frequency-info
```

2. 设置所有 CPU 为性能模式：

```shell
cpupower -c all frequency-set -g performance
```

- performance: 固定最高运行频率上，不动态调节。

- powersave: 固定工作在其支持的最低运行频率上

- ondemand: 按需快速动态调整 CPU 频率，一有 cpu 计算量的任务，就会立即达到最大频率运行，等执行完毕就立即回到最低频率；

- conservative:
  与 ondemand 不同，平滑地调整 CPU 频率，频率的升降是渐变式的，会自动在频率上下限调整，和 ondemand 的区别在于它会按需分配频率，而不是一味追求最高频率；

### 自动挂载

```shell
# 100mb 虚拟硬盘
mount tmpfs in /home/trdthg/tmp/
tmpfs /home/trdthg/tmp tmpfs size=96m 0 0

# 1.查看电脑中所有硬盘的分区情况。
# 命令如下：
# sudo fdisk -l
# 2.结果如下
# /dev/nvme0n1p3    567296  210282495 209715200   100G Microsoft 基本数据
# /dev/nvme0n1p4 210282496  872337407 662054912 315.7G Microsoft 基本数据

#auto mount windows fs
/dev/nvme0n1p3 /mnt/C ntfs nls=utf8,umask=000   0   0
/dev/nvme0n1p4 /mnt/D ntfs nls=utf8,umask=000   0   0

# 注： 末尾的 2 行是添加的内容。其中/dev/nvme0n1p3 一行代表 C 盘分区将自动挂载到/mnt/C 目录下，文件系统为 NTFS（如果步骤 1 中查看分 区的文件系统为 FAT32 时，此处请写 vfat），字符编码为 utf8。umask 表示文件目录的权限，此参数以及之后的 2 个参数都为 0 即可。以下几行以 此类推。此处可以选择性的添加需要自动挂载的分区，不想挂载的分区不用书写。
```

### openssh-server(sshd) 启动

### OpenSSH

OpenSSH 可以支撑 Manjaro 成为 SSH Server，以便其他主机可以通过 SSH 连接到 Manjaro。

```shell
# 安装 OpenSSH
sudo pacman -S openssh
# 开机自启 sshd 服务
sudo systemctl enable sshd
# 启动 sshd 服务
sudo systemctl start sshd
# 重启 sshd 服务
sudo systemctl restart sshd
```

## Git

### 基础命令

```shell
git init
git add -A
git commit -m "commit"
git push -u origin main
```

### 下载某个文件夹

```sh
git init
git remote add -f origin $url
git config core.sparsecheckout true
echo $file_name >> .git/info/sparse-checkout
git pull origin master
```

## 待续...
