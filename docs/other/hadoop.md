# 技术

## 使用VM搭建hadoop集群

### 1. 准备

- centos7.5镜像
- JDK8
- Hadoop
- [参考链接](https://www.cnblogs.com/aeolian/p/8882790.html)

### 2. 安装hadoop101虚拟机

- 软件选择: 最小安装是纯命令行
- 安装位置: 选择手动和以自由配置盘符配置及大小, 设备类型(LVM相比于标准分区能自由扩缩容)
- KDUMP可以暂时不要
- 设置用户名密码: 示例 username: hadoop101 password: 000000

### 3. 配置本机网络环境

1. 关闭防火墙
2. VM配置VMnet8
   编辑 -> 虚拟网络编辑器
3. Windows配置VMnet8

### 4. 配置虚拟机网络环境

1. 关闭虚拟机防火墙: `systemctl disable firewalld.service`
2. 关闭NetworkManage:

- `systemctl stop NetworkManager`
- `systemctl disable NetworkManager`

3. !!!修改网卡配置:

- `vim /etc/sysconfig/network-scripts/ifcfg-ens33`

```
BOOTPROTO=static  #启用静态IP地址 ,默认为dhcp
IPADDR=192.168.182.3  #设置IP地址(这台虚拟机想要的ip)
NETMASK=255.255.225.0  #设置子网掩码
GATEWAY=192.168.182.2  #设置网关(和外部的网关相同)
```

4. 重启网卡: `service  network restart`
   可以通过 `ping 8.8.8.8`检测是否通

### 5. 克隆前

1. 安装辅助包管理器: `yum install -y epel-release`
2. 未知: `kill -9 3030`
3. 卸载系统自带JDK:

- 查看: `rpm -qa | grep java`
- 卸载: `sudo yum remove packagename`

4. 修改虚拟机host

- 修改hostname如下: `nano /etc/hostname`

```
hadoop101
```

- 修改hosts如下: `nano /etc/hosts`

```
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

192.168.93.21 hadoop101
192.168.93.22 hadoop102
192.168.93.23 hadoop103
```

### 6. 克隆(完整克隆)后

1. 通过vmware进行clone出n台相同的虚拟机

- 修改每台克隆出的网卡IPADDR: `vim /etc/sysconfig/network-scripts/ifcfg-ens33`
- 修改hostname: `nano /etc/hostname`

### 7. 安装及配置环境变量

1. 安装软件
   为了方便统一管理

- 压缩包目录: `/opt/software`
- 解压目录: `/opt/module`
  解压:
- 给权限: `chmod 777 /opt/software`
- 解压(-C指定解压目录): `tar -zxvf jdk-8u212-linux-x64.tar.gz -C /opt/module/`

2. 修改环境变量
   为了永久修改环境变量: 修改文件 `sudo nano /etc/profile.d/users.sh`如下

```shell
#JAVA
export JAVA_HOME=/opt/module/jdk1.8.0_212
export PATH=$PATH:$JAVA_HOME/bin
#HADOOP
export HADOOP_HOME=/opt/module/hadoop-3.1.3
export PATH=$PATH:$HADOOP_HOME/bin
export PATH=$PATH:$HADOOP_HOME/sbin
```

3. 重置
   `source /etc/profile`
   ::: warning
   使用 `export PATH=$PATH:xxxxx`会在终端关闭后失效
   :::

### 8. 配置集群分发脚本和免密登录

1. scp服务器间拷贝

```shell
# 将当前服务器的/opt/module/jdk1.8.0_212目录拷贝到hadoop102服务器的/opt/module目录下
# 值得注意的是，hadoop102服务器下的/opt/module目录必须存在
# -r指递归复制整个目录
# root是指hadoop102的用户
scp -r /opt/module/jdk1.8.0_212 root@hadoop102:/opt/module
```

2. rsync远程同步工具

```shell
# 值得注意的是，每个服务器都需要安装
yum -y install rsync

# -a表示归档拷贝
# -v表示显示拷贝过程
rsync -av /opt/module/hadoop-3.1.3/ root@hadoop102:/opt/module/hadoop-3.1.3/
# 让两个文件夹同步
```

3. 分发脚本(起名:xsync)

```shell
#!/bin/bash
#1. 判断参数个数
if [ $# -lt 1 ]
then
 echo Not Enough Arguement!
 exit;
fi
#2. 遍历集群所有机器
for host in hadoop101 hadoop102 hadoop103
    do
    echo ==================== $host ====================
    #3. 遍历所有目录，挨个发送

    for file in $@
    do
        #4. 判断文件是否存在
        if [ -e $file ]
        then
            #5. 获取父目录
            pdir=$(cd -P $(dirname $file); pwd)
            #6. 获取当前文件的名称
            fname=$(basename $file)
            ssh $host "mkdir -p $pdir"
            rsync -av $pdir/$fname $host:$pdir
        else
            echo $file does not exists!
        fi
    done
done
```

::: danger

> 空格必须加: `if [ -e $file ]`
> 等号两边的空格必不能加: `pdir=$(cd -P $(dirname $file); pwd)`
> $@返回所有命令行参数, 所以可以一次同步多个文件(夹)
> :::

4. 后续处理
   文件创建在/bin/下: `/bin/xsync`方便直接调用

```shell
# 给运行权限
chmod +x xsync
# 测试同步环境变量
xsync /etc/profile.d/
```

5. 免密登录

```shell
cd /root/.ssh
# 生成私钥公钥
ssh-keygen -t rsa
# 分发密钥
ssh-copy-id hadoop101
ssh-copy-id hadoop102
ssh-copy-id hadoop103
```

### 9

### 待续

## 待续
