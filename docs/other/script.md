# 脚本

## shell 脚本

### 文件操作
```shell
rm -r folder_name/* # /*忽略以.开头的隐藏文件, /.不会
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
``` javascript
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
	ads.push(document.getElementById("activity_vote"))
	for (var index = 0; index < ads.length; index++) {
		if (ads[index]) {
			ads[index].style.display="none";
		}
	}
	var ads_arr = new Array();
  	ads_arr.push(document.getElementsByClassName("ad-report"));
    ads_arr.push(document.getElementsByClassName("operate-wrapper"));
	for (index = 0; index < ads_arr.length; index++) {
        if (ads_arr[index]) {
			for (var i = 0; i < ads_arr[index].length; i++) {
				if (ads_arr[index][i] != null) {
					ads_arr[index][i].style.display="none";
				}
			}
		}
	}
    ads=[];
    ads_arr=[]
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


## markdown流程图

- 六个元素
- 4个方向
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

### cpu调频

1. 查看当前所有CPU的信息：
```shell
cpupower -c all frequency-info
```
2. 设置所有CPU为性能模式：
```shell
cpupower -c all frequency-set -g performance
```
- performance: 固定最高运行频率上，不动态调节。

- powersave: 固定工作在其支持的最低运行频率上

- ondemand: 按需快速动态调整CPU频率， 一有cpu计算量的任务，就会立即达到最大频率运行，等执行完毕就立即回到最低频率；

- conservative: 与ondemand不同，平滑地调整CPU频率，频率的升降是渐变式的,会自动在频率上下限调整，和ondemand的区别在于它会按需分配频率，而不是一味追求最高频率；

###  自动挂载

```shell
# 100mb虚拟硬盘
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

# 注： 末尾的2行是添加的内容。其中/dev/nvme0n1p3一行代表C盘分区将自动挂载到/mnt/C目录下，文件系统为NTFS（如果步骤1中查看分 区的文件系统为FAT32时，此处请写vfat），字符编码为utf8。umask表示文件目录的权限，此参数以及之后的2个参数都为0即可。以下几行以 此类推。此处可以选择性的添加需要自动挂载的分区，不想挂载的分区不用书写。
```

###  openssh-server(sshd)启动

###   OpenSSH
OpenSSH可以支撑Manjaro成为SSH Server，以便其他主机可以通过SSH连接到Manjaro。
```shell
# 安装OpenSSH
sudo pacman -S openssh
# 开机自启sshd服务
sudo systemctl enable sshd
# 启动sshd服务
sudo systemctl start sshd
# 重启sshd服务
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