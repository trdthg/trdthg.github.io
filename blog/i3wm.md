# Linux 发行版配置

## i3wm

### 多屏幕

```sh
xrandr
xrandr --output DP-1 --auto --right-of eDP-1
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

## gamepad

驱动下载：xboxdrv

蓝牙：

```txt
bluetoothctl pair <mac_addr>
bluetoothctl connect <mac_addr>
bluetoothctl remove <mac_addr>
bluetoothctl trust <mac_addr>
```

[如何使用 bluetoothctl 在 Linux 上管理蓝牙设备](https://zhongguo.eskere.club/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8bluetoothctl%E5%9C%A8linux%E4%B8%8A%E7%AE%A1%E7%90%86%E8%93%9D%E7%89%99%E8%AE%BE%E5%A4%87/2021-05-16/)

测试：

[树莓派和手柄 - 蓝牙连接](https://www.shumeijiang.com/2021/08/04/%E6%A0%91%E8%8E%93%E6%B4%BE%E5%92%8C%E6%89%8B%E6%9F%84-%E8%93%9D%E7%89%99%E8%BF%9E%E6%8E%A5.html)

资料：

[How to Set Up and Use Game Controllers on Linux](https://www.makeuseof.com/tag/get-game-controllers-running-linux/)
[Arch-Wiki Gamepad](https://wiki.archlinux.org/title/Gamepad)
[Guide – Configuring XInput support for Linux](https://help.wooting.io/en/article/guide-configuring-xinput-support-for-linux-69m32u/)
