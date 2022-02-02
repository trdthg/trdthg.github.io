# 文件系统

## 1. inode

### 1.1 什么是 inode

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021258963.png)
文件存储在硬盘上， 硬盘的最小存储单元是扇区， 硬盘会按照多个扇区按块读取扇区， 一个文件的数据就被存储在多个块中， 同时我们还需要有一个地方存储文件的元信息。这种存储文件元信息的区域就叫做 inode（索引节点）。

### 1.2 inode的内容

每一个文件都有对应的 inode 我们可以通过 `stat xxx` 去查看，主要包括：

- 文件大小
- 文件的拥有者
- 文件的Group ID
- 文件的读写执行权限
- 文件的时间戳， ctime：创建时间， mtime：修改时间， atime：打开时间
- 链接数：比如创建软链接，再次查看就会多1
- 数据块的位置

不过单单没有文件名就离谱

```sh
[trthg@trthg--manjaro ioclub]$ stat package.json
  File: package.json
  Size: 1006            Blocks: 8          IO Block: 4096   regular file
Device: 0,39    Inode: 4528790     Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/   trthg)   Gid: ( 1001/   trthg)
Access: 2021-11-01 22:00:54.464935992 +0800
Modify: 2021-11-01 22:00:54.464935992 +0800
Change: 2021-11-01 22:00:54.464935992 +0800
 Birth: 2021-11-01 22:00:54.464935992 +0800
```

### 1.3 inode的大小

1. inode 与 数据块本身会储存在不同的区域， 硬盘格式化时， 操作系统就会把硬盘分为两个区， 数据区和inode区
2. inode节点的大小一般在格式化时就给定，一般是128或256字节
3. 一般每1-2kb就会设置一个inode， 假定在一块1GB的硬盘中，每个inode节点的大小为128字节，每1KB就设置一个inode，那么inode table的大小就会达到128MB，占整块硬盘的12.8%。

查看每个硬盘分区的inode总数， 和已经使用的数量

```sh
[trthg@trthg--manjaro ioclub]$ df -i
Filesystem     Inodes IUsed IFree IUse% Mounted on
dev              1.9M   585  1.9M    1% /dev
run              1.9M  1.1K  1.9M    1% /run
/dev/nvme0n1p2      0     0     0     - /
tmpfs            1.9M   175  1.9M    1% /dev/shm
/dev/nvme0n1p2      0     0     0     - /home
/dev/nvme0n1p2      0     0     0     - /var/cache
/dev/nvme0n1p2      0     0     0     - /var/log
tmpfs            400K  3.8K  397K    1% /tmp
/dev/nvme0n1p1      0     0     0     - /boot/efi
tmpfs            386K   303  386K    1% /run/user/1000
```

查看inode大小

没找到

### 1.4 inode号码

每个 inode 都有一个id相当与， 操作系统用这个id来识别文件

```sh
[trthg@trthg--manjaro ioclub]$ ls -i package.json
4528790 package.json
```

###  1.5 目录文件

目录文件也是一种文件，目录文件本身结构简单，它存储的是一个列表， 列表中存储目录项

目录项存储的：

- 文件名
- 文件的 inode 号

可以用 `ls -i dir` 查看该目录下所有文件的文件名和inode

目录文件的读权限（r）和写权限（w），都是针对目录文件本身。由于目录文件内只有文件名和inode号码，读取inode节点内的信息需要目录文件的执行权限（x），  所以如果只有读权限，只能获取文件名，无法获取其他信息，因为其他信息都储存在inode节点中，而

### 1.6 硬链接

有了上面的知识就能理解了，硬链接就是指多个文件名可以指向同一个inode号， `.` 和 `..` 就是硬链接，加了一个硬链接， 原文件的 LINK 数就会 +1

### 1.7 软链接

软链接指的是一个文件的内容存储的是另一个文件的路径， 访问A就会自动导向B

`ln -s`

### 1.8 其他

**八、inode的特殊作用**

由于inode号码与文件名分离，这种机制导致了一些Unix/Linux系统特有的现象。

　　1.  有时，文件名包含特殊字符，无法正常删除。这时，直接删除inode节点，就能起到删除文件的作用。

　　2.  移动文件或重命名文件，只是改变文件名，不影响inode号码。

　　3.  打开一个文件以后，系统就以inode号码来识别这个文件，不再考虑文件名。因此，通常来说，系统无法从inode号码得知文件名。

第3点使得软件更新变得简单，可以在不关闭软件的情况下进行更新，不需要重启。因为系统通过inode号码，识别运行中的文件，不通过文件名。更新的时候，新版文件以同样的文件名，生成一个新的inode，不会影响到运行中的文件。等到下一次运行这个软件的时候，文件名就自动指向新版文件，旧版文件的inode则被回收。

## 2. 文件描述符

> Advanced Programming in the UNIX® Environment: Second Edition
> By W. Richard  Stevens, Stephen A. Rago
>
> [书里有更详细的解释](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.458.2318&rep=rep1&type=pdf)

### 2.1 与 inode 的区别

inode本身只是对应没一个文件， 但是一个文件能被多个人打开， 因此需要有 fd 去记录文件的打开状态

内核维护一个内核级文件描述符表， 存储了主要包括：

- 文件偏移量
- 文件的打开状态
- inode 指针

这些是全部

    1. 当前文件偏移量（调用read()和write()时更新，或使用lseek()直接修改）
    2. 打开文件时所使用的状态标识（即，open()的flags参数）
    3. 文件访问模式（如调用open()时所设置的只读模式、只写模式或读写模式）
    4. 与信号驱动相关的设置
    5. 对该文件i-node对象的引用
    6. 文件类型（例如：常规文件、套接字或FIFO）和访问权限
    7. 一个指针，指向该文件所持有的锁列表
    8. 文件的各种属性，包括文件大小以及与不同类型操作相关的时间戳

只要有进程打开一个文件， 内核就会产生这个去记录文件打开状态， 接着向进程返回这个记录的索引位置，就是 fd

进程本身维护一个进程级的文件描述符表， 存储了：

- 文件描述符
- 文件指针

查看进程占用的 fd 数目

```bash
// 226889是进程的PID， 可以通过 lsof -i：6379查看
ls /proc/226889/fd | wc -w                                                       ✔
9
```



### 2.2 不同级别的表的对应关系
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021301758.png)

1. 在进程A中，文件描述符1和30都指向了同一个打开的文件句柄（标号23）。这可能是通过调用dup()、dup2()、fcntl()或者对同一个文件多次调用了open()函数而形成的。
2. 进程A的文件描述符2和进程B的文件描述符2都指向了同一个打开的文件句柄（标号73）。这种情形可能是在调用fork()后出现的（即，进程A、B是父子进程关系），或者当某进程通过UNIX域套接字将一个打开的文件描述符传递给另一个进程时，也会发生。再者是不同的进程独自去调用open函数打开了同一个文件，此时进程内部的描述符正好分配到与其他进程打开该文件的描述符一样。
3. 此外，进程A的描述符0和进程B的描述符3分别指向不同的打开文件句柄，但这些句柄均指向i-node表的相同条目（1976），换言之，指向同一个文件。发生这种情况是因为每个进程各自对同一个文件发起了open()调用。同一个进程两次打开同一个文件，也会发生类似情况。

不同文件描述符存储的内容

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202021301124.png)
### 2.3 fd 的限制

1. 系统级限制

   文件描述符是系统的一个重要资源，**虽然说系统内存有多少就可以打开多少的文件描述符**，但是在实际实现过程中内核是会做相应的处理的，一般最大打开文件数会是系统内存的10%（以KB来计算）

   查看方式：`sysctl -a | grep fs.file-max`

2. 用户级限制

   与此同时，内核为了不让某一个进程消耗掉所有的文件资源，其也会对单个进程最大打开文件数做默认值处理，默认值一般是1024，使用 `ulimit -n` 命令可以查看。

一般可以通过修改限制优化系统



## 3. 使用 fd

### 3.1 open / read

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main (void){
    int fd;
    int numbytes;
    char path[] = "file";
    char buf[256];

    /*
     * O_CREAT:如果文件不存在则创建
     * O_RDONLY:以只读模式打开文件
     */
    fd = open(path, O_CREAT | O_RDONLY, 0644);
    if(fd < 0){
        perror("open()");
        exit(EXIT_FAILURE);
    }

    memset(buf, 0x00, 256);
    while((numbytes = read(fd, buf, 255)) > 0){
        printf("%d bytes read: %s", numbytes, buf);
        memset(buf, 0x00, 256);
    }
    close (fd);
    exit(EXIT_SUCCESS);
}
```
