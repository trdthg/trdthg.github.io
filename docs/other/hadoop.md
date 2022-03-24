# 大数据

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

## HDFS

日志型，只允许追加

## HBase

基于HDFS，不会将旧数据删除

### 数据模型

HBase是一个稀疏的(不同时间没有数据)，多维度(4个维度在能限定到一个单元格)的，排序的映射表
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241641728.png)

#### 概念视图
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241634039.png)
不同时间可能没有数据，体现了HBase是稀疏表

#### 物理视图
列标识并没有区分
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241635344.png)

#### 按行按列的区分
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241637049.png)

按行:
- 不便于读取某一列数据, 必须扫描所有行，并把每行的某个字段取出来

按列:

- 压缩性能好，按列存，数据类型相同，能够更好的压缩

### 实现原理

#### 服务器划分
- master服务器负责管理写请求，负载均衡等
- 客户端并不依赖master服务去找到数据位置
- 用户直接访问的是region服务器
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241654144.png)

#### 物理存储
- 不同的region不许存储在同一个服务器上，一个服务器可以存储多个region(1-2G, 10-1000个)
- region太大了就会垂直分裂(操作指针，速度较快)，分裂时用户读取的依然是之前的region，当服务器经过合并，写入新的文件之后，新来的用户彩绘访问新的region
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241657033.png)

#### 索引结构
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241701862.png)
各个层次的作用
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241702112.png)
3层结构完全足够使用，对于经常访问的可以增加缓存
- 如何解决缓存失效，缓存失效的话数据就找不到了

### 运行架构

#### 架构图
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241709216.png)
master:
- 对数据表进行增删改查
- 负载均衡，把负载大的服务器上的region表拿到其他负载小的服务器上
- 管理region的分裂合并操作之后的发布
- 重新分配故障服务器上的region

#### region写入HDFS
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202203241715580.png)
对于单个region服务器，上面存储了多个region块，每个列族被划分为一个store

锁与resion块共用一个Hlog文件

region将数据写入HDFS会线写入memStore中(缓存)，缓存满了之后，刷入StoreFile中，StoreFile就是HFile, HDFS中的数据格式

#### 用户写入Region
用户写入请求被分配给region
- 写入缓存
- 写入日志(Hlog), 必须写入磁盘才算成功
- 系统将缓存周期性刷入磁盘，并在Hlog写入标记
- 每次刷写都会生成一个StoreFile
- 多个StoreFile会合并为大文件，太大就会引发StoreFile的分裂，region就分裂了


zookeeper监听Region服务器，如果Region服务器发生故障，就会通知Master服务武器，Master服务器将Region服务器上的Hlog文件拉取过来，并根据日志文件将所有Region分配到其他可用的Region服务器

### 优化存储

- 时间靠近的数据存在一起:

   用`Long.Max_VALUE - timestamp`作为行键，最新的数据能够快速命中

- 提升读写性能

   设置`HColumnDescriptor.setlnMemory = true`, 将Region服务器的Region放入缓存中

- 删除旧版本数据
   设置`HColumnDescriptr.setMaxVersionsMaxVersions = true`， 只会保留最新版本

- 过期自动清除
   设置`setTimeToLive(2 * 24 * 60 * 60)`超过两天就自动清除

### 二级索引
Hindex: 依赖触发器在插入数据后同时插入索引表
HBase + Redis: 将索引暂时存入redis，之后在刷入HBase
Solr + HBase: 高性能全文索引，由Solr构建索引得到数据的RowKey