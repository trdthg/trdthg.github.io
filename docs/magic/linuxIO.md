# Linux IO 多路复用

## 1. errno.h

**1. 定义**

该头文件定义了一个int类型的左值，errno，包含了任何函数使用errno功能时会产生的错误码

- EINTR： 表示被中断的系统调用

**2. 修改errno的值**

errno的默认值为0, 当	调用系统调用时，可能会接受到某个信号导致调用退出，并返回一个错误码，并修改errno的值，可以通过errno判断系统调用是否失败，

**3. 错误码对不同函数有不同意义**

   - write: 由于信号中断，没写成功任何数据。
      
      > The call was interrupted by a signal before any data was written.
      
   -  read: 由于信号中断，没读到任何数据。
      
      > The call was interrupted by a signal before any data was read.
      
   -  sem_wait: 函数调用被信号处理函数中断
      
      > The call was interrupted by a signal handler.
      
   -  recv: 由于信号中断返回，没有任何数据可用。
      
      > function was interrupted by a signal that was caught, before any data was available.

**4. 如何应对**

当碰到EINTR错误的时候，可以采取有一些可以重启的系统调用要进行重启，而对于有一些系统调用是不能够重启的。例如：accept、read、write、select、和open之类的函数来说，是可以进行重启的。不过对于套接字编程中的connect函数我们是不能重启的，若connect函数返回一个EINTR错误的时候，我们不能再次调用它，否则将立即返回一个错误。针对connect不能重启的处理方法是，必须调用select来等待连接完成。

系统中断不一定被当作错误

- 如果错误码为EINTR则 **重新调用系统调用** ,例如Postgresql中有一段代码:

  ```c
  retry1: 
  if (send(port->sock, &SSLok, 1, 0) != 1) 
  { 
      if (errno == EINTR) 
          goto retry1; /* if interrupted, just retry */ 
  }
  ```

- **重新定义系统调用**,忽略错误码为EINTR的情况.例如,Cherokee中的一段代码:

  ```c
  int cherokee_stat (const char *restrict path, struct stat *buf) 
  { 
    int re; 
    do { 
       re = stat (path, buf); 
    } while ((re == -1) && (errno == EINTR)); 
    return re; 
  } 
  ```

**5. 如何保证线/进程安全**

> 一般而言，编译器会自动保证 errno 的安全性，但是为了妥善期间，我们希望在写 makefile 的时 候把 _LIBC_REENTRANT 宏定义，比 如我们在检查 <bits/errno.h> 文件中发现如下的定义：

```c
# ifndef __ASSEMBLER__ 
/* Function to get address of global `errno' variable. */ 
extern int *__errno_location (void) __THROW __attribute__ ((__const__)); 
 
 
# if !defined _LIBC || defined _LIBC_REENTRANT 
/* When using threads, errno is a per-thread value. */ 
# define errno (*__errno_location ()) 
# endif 
# endif /* !__ASSEMBLER__ */ 
#endif /* _ERRNO_H */ 
```

> 也就是说，在没有定义 __LIBC 或者定义 _LIBC_REENTRANT 的时候， errno 是多线程 / 进程安全的。 
> 一般而言， __ASSEMBLER__, _LIBC 和 _LIBC_REENTRANT 都不会被编译器定义，但是如果我们定义 _LIBC_REENTRANT 一次又何妨那？ 
> 为了检测一下你编译器是否定义上述变量，不妨使用下面一个简单程序。  

希望读者在进行移植的时候，读一下相关的 unix 版本的 <bits/errno.h> 文 件，来确定应该定义什么宏。不同的 unix 版本可能存在着一些小的差别！

```c
#include <stdio.h> 
#include <errno.h> 
 
int main( void ) 
{ 
#ifndef __ASSEMBLER__ 
printf( "Undefine __ASSEMBLER__\n" ); 
#else 
printf( "define __ASSEMBLER__\n" ); 
#endif 
 
#ifndef __LIBC 
printf( "Undefine __LIBC\n" ); 
#else 
printf( "define __LIBC\n" ); 
#endif 
 
#ifndef _LIBC_REENTRANT 
printf( "Undefine _LIBC_REENTRANT\n" ); 
#else 
printf( "define _LIBC_REENTRANT\n" ); 
#endif 
 
return 0; 
} 
```

参考：https://blog.csdn.net/hnlyyk/article/details/51444617

## 2. 