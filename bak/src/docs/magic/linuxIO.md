# IO 多路复用

## Rust 使用 Epoll

```rs
use std::{
    collections::HashMap,
    io::{self, Read, Write},
    net::{TcpListener, TcpStream},
    os::unix::prelude::{AsRawFd, RawFd},
};

#[allow(unused_macros)]
macro_rules! syscall {
    ($fn: ident ( $($arg: expr),* $(,)* ) ) => {{
        let res = unsafe { libc::$fn($($arg, )*) };
        if res == -1 {
            Err(std::io::Error::last_os_error())
        } else {
            Ok(res)
        }
    }};
}

const HTTP_RESP: &[u8] = b"HTTP/1.1 200 OK
content-type: text/html
content-length: 5

Hello";

const READ_FLAGS: i32 = libc::EPOLLONESHOT | libc::EPOLLIN;
const WRITE_FLAGS: i32 = libc::EPOLLONESHOT | libc::EPOLLOUT;

#[derive(Debug)]
pub struct RequestContext {
    pub stream: TcpStream,
    pub content_length: usize,
    pub buf: Vec<u8>,
}

impl RequestContext {
    fn new(stream: TcpStream) -> Self {
        Self {
            stream,
            buf: Vec::new(),
            content_length: 0,
        }
    }

    fn read_cb(&mut self, key: u64, epoll_fd: RawFd) -> io::Result<()> {
        let mut buf = [0u8; 4096];
        // 这里 stream 应该不会阻塞，因为我们是在被通知后才调用的
        match self.stream.read(&mut buf) {
            Ok(_) => {
                if let Ok(data) = std::str::from_utf8(&buf) {
                    // 如果这段数据是开始，就能设置 Content-length.
                    // 如果是 data 的一部分，那就什么也不做，安心读取就完事了
                    self.parse_and_set_content_length(data);
                }
            }
            Err(e) if e.kind() == io::ErrorKind::WouldBlock => {}
            Err(e) => {
                return Err(e);
            }
        }

        // 把临时缓冲区的内容追加到结构体上下文里
        self.buf.extend_from_slice(&buf);

        // 判断以下读没读完，如果没有读完，就重新注册为读，下次接着读。否则注册为写，给客户端回复
        if self.buf.len() >= self.content_length {
            println!("got all data: {} bytes", self.buf.len());
            modify_interest(epoll_fd, self.stream.as_raw_fd(), listener_write_event(key))?;
        } else {
            println!("read not end: {} bytes", self.buf.len());
            modify_interest(epoll_fd, self.stream.as_raw_fd(), listener_read_event(key))?;
        }
        Ok(())
    }

    fn parse_and_set_content_length(&mut self, data: &str) {
        println!("{}", data);
        if data.contains("HTTP") {
            if let Some(content_length) = data
                .lines()
                .find(|x| x.to_lowercase().starts_with("content-length: "))
            {
                if let Some(len) = content_length
                    .to_lowercase()
                    .strip_prefix("content-length: ")
                {
                    self.content_length = len.parse::<usize>().expect("content-length is valid");
                    println!("set content length: {} bytes", self.content_length);
                }
            } else {
                println!("没读到 Content-Length");
            }
        }
        println!("不是 HTTP");
    }

    fn write_cb(&mut self, key: u64, epoll_fd: RawFd) -> io::Result<()> {
        match self.stream.write(HTTP_RESP) {
            Ok(_) => println!("answered from request {}", key),
            Err(e) => eprintln!("could not answer to request {}, {}", key, e),
        }
        self.stream.shutdown(std::net::Shutdown::Both)?;
        let fd = self.stream.as_raw_fd();
        remove_interest(epoll_fd, fd)?;
        unsafe { close(fd) };
        Ok(())
    }
}

fn main() -> io::Result<()> {
    let mut listener = TcpListener::bind("127.0.0.1:8080").expect("绑定端口失败");
    // 设置为非阻塞模式
    // 当我们 accept 时，如果 socket 没有准备好，会阻塞。
    // 而现在会直接返回一个 io::ErrorKind::WouldBlock
    listener
        .set_nonblocking(true)
        .expect("set non-block failed");
    let listener_fd = listener.as_raw_fd();

    // 创建一个 epoll，并返回它的 fd
    // 有了这个 fd，我们就能对事件进行操作，包括读取、添加、修改、移除。
    let epoll_fd = epoll_create().expect("创建 epoll 失败");

    // 向 epoll 中注册 listener，并设置我们感兴趣的事件是读
    let mut key = 100;
    add_interst(epoll_fd, listener_fd, listener_read_event(key))?;

    // 现在我们有了 epoll，也注册了事件，下一步就是事件循环
    let mut events: Vec<libc::epoll_event> = Vec::with_capacity(1024);
    let mut request_contexts: HashMap<u64, RequestContext> = HashMap::new();
    loop {
        events.clear();
        // epoll_wait 发生阻塞的条件：
        // - 有事件发生
        // - 信号把它打断
        // - 超时了
        //      - 我们可以把超时事件设置为 -1，这样 epoll_wait 会一只阻塞，直到前两种情况发生
        // 当 epoll_wait 返回时，它会返回事件的数量
        let res = match syscall!(epoll_wait(
            epoll_fd,
            events.as_mut_ptr() as *mut libc::epoll_event,
            1024,
            1000 as libc::c_int, // 超时时间，毫秒为单位
        )) {
            Ok(v) => v,
            Err(e) => panic!("在等待 epoll 时发生错误：{}", e),
        };

        // 设置 events 的容量
        unsafe { events.set_len(res as usize) };

        // 处理请求
        for event in events.iter() {
            // 因为没有 fd，我们需要通过 key 去判断，这个事件是那个 fd 的。
            match event.u64 {
                // 如果是 100，就说明我们的 server 接收到了新的连接。
                100 => {
                    match listener.accept() {
                        Ok((stream, addr)) => {
                            // 将客户端设置为非阻塞的，给他一个 key，并添加到到 epoll 中
                            stream
                                .set_nonblocking(true)
                                .expect("这里在此设置了 non-blocking");
                            println!("new client: {}", addr);
                            key += 1;
                            add_interst(epoll_fd, stream.as_raw_fd(), listener_read_event(key))
                                .expect("发生什么是了，客户端裂开了？");
                            // 这里
                            request_contexts.insert(key, RequestContext::new(stream));
                        }
                        Err(e) => eprintln!("couldn't accept: {}", e),
                    }
                    // 因为我们使用的是 ONESHORT 事件监听器，所以我们必须重新注册 server
                    modify_interest(epoll_fd, listener_fd.as_raw_fd(), listener_read_event(100))
                        .expect("重置 server 失败");
                }
                // 如果不是 key 不是 100，那就是其他的客户端连接。
                key => {
                    // 用 hashmap 去匹配是那个连接
                    if let Some(context) = request_contexts.get_mut(&key) {
                        let events = event.events;
                        match events {
                            // 如果可读，就去读，如果没读完，就重新注册读，读完了将兴趣点改为写
                            v if v as i32 & libc::EPOLLIN == libc::EPOLLIN => {
                                // 读取数据
                                context.read_cb(key, epoll_fd)?;
                            }
                            // 返回数据，close(fd), shutdown(stream), remove_interest(epoll_fd, fd)
                            v if v as i32 & libc::EPOLLOUT == libc::EPOLLOUT => {
                                context.write_cb(key, epoll_fd)?;
                                // 同时移出 hashmap
                                request_contexts.remove(&key);
                            }
                            v => println!("unexpected events: {}", v),
                        }
                    }
                }
            }
        }
    }
    println!("Hello, world!");
    Ok(())
}

/// 向 epoll 中传入一个感兴趣的连接
///
/// epoll_fd: epoll 的 fd
/// fd：将要被 epoll 管理的 fd
/// event：被通知事件类型。
///
/// 当 fd 上有事件发生时，比如读或者是写，这个事件发生后 epoll 就会通知我们，并将 fd 从 epoll 中删除
/// 因此如果我们需要继续读取，我们需要重新注册这个 fd
fn add_interst(epoll_fd: RawFd, fd: RawFd, mut event: libc::epoll_event) -> io::Result<()> {
    syscall!(epoll_ctl(epoll_fd, libc::EPOLL_CTL_ADD, fd, &mut event))?;
    Ok(())
}
fn modify_interest(epoll_fd: RawFd, fd: RawFd, mut event: libc::epoll_event) -> io::Result<()> {
    // 改用 EPOLL_CTL_MOD 标志，因为之前已经被添加过
    syscall!(epoll_ctl(epoll_fd, libc::EPOLL_CTL_MOD, fd, &mut event))?;
    Ok(())
}
fn close(fd: RawFd) {
    let _ = syscall!(close(fd));
}
fn remove_interest(epoll_fd: RawFd, fd: RawFd) -> io::Result<()> {
    // 改用 EPOLL_CTL_MOD 标志，因为之前已经被添加过
    syscall!(epoll_ctl(
        epoll_fd,
        libc::EPOLL_CTL_DEL,
        fd,
        std::ptr::null_mut()
    ))?;
    Ok(())
}

/// 生成一个事件类型
///
/// key 是我们为该事件设置的 id
///
/// 对于 listener，我们只对读事件感兴趣，因此这里只有 READ_FLAG
fn listener_read_event(key: u64) -> libc::epoll_event {
    libc::epoll_event {
        events: READ_FLAGS as u32,
        u64: key,
    }
}

fn listener_write_event(key: u64) -> libc::epoll_event {
    libc::epoll_event {
        events: WRITE_FLAGS as u32,
        u64: key,
    }
}

fn epoll_create() -> io::Result<RawFd> {
    let fd = syscall!(epoll_create1(0))?;
    if let Ok(flags) = syscall!(fcntl(fd, libc::F_GETFD)) {
        let _ = syscall!(fcntl(fd, libc::F_SETFD, flags | libc::FD_CLOEXEC));
    }
    Ok(fd)
}

#[cfg(test)]
mod test {
    #[test]
    fn test() {
        let a = [232, 183, 159];
        let s = std::str::from_utf8(&a[..]).unwrap();
        dbg!(s);
    }
}
```

## 其他

### errno.h

#### 定义

该头文件定义了一个 int 类型的左值，errno，包含了任何函数使用 errno 功能时会产生的错误码

- EINTR：表示被中断的系统调用

#### 修改 errno 的值

errno 的默认值为 0, 当	调用系统调用时，可能会接受到某个信号导致调用退出，并返回一个错误码，并修改 errno 的值，可以通过 errno 判断系统调用是否失败，

#### 错误码对不同函数有不同意义

- write: 由于信号中断，没写成功任何数据。

  > The call was interrupted by a signal before any data was written.

- read: 由于信号中断，没读到任何数据。

  > The call was interrupted by a signal before any data was read.

- sem_wait: 函数调用被信号处理函数中断

  > The call was interrupted by a signal handler.

- recv: 由于信号中断返回，没有任何数据可用。

  > function was interrupted by a signal that was caught, before any data was
  > available.

#### 如何应对

当碰到 EINTR 错误的时候，可以采取有一些可以重启的系统调用要进行重启，而对于有一些系统调用是不能够重启的。例如：accept、read、write、select、和 open 之类的函数来说，是可以进行重启的。不过对于套接字编程中的 connect 函数我们是不能重启的，若 connect 函数返回一个 EINTR 错误的时候，我们不能再次调用它，否则将立即返回一个错误。针对 connect 不能重启的处理方法是，必须调用 select 来等待连接完成。

系统中断不一定被当作错误

- 如果错误码为 EINTR 则 **重新调用系统调用** ,例如 Postgresql 中有一段代码：

  ```c
  retry1:
  if (send(port->sock, &SSLok, 1, 0) != 1)
  {
      if (errno == EINTR)
          goto retry1; /* if interrupted, just retry */
  }
  ```

- **重新定义系统调用**,忽略错误码为 EINTR 的情况。例如，Cherokee 中的一段代码：

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

#### 如何保证线/进程安全

> 一般而言，编译器会自动保证 errno 的安全性，但是为了妥善期间，我们希望在写 makefile 的时 候把 _LIBC_REENTRANT 宏定义，比
> 如我们在检查 <bits/errno.h> 文件中发现如下的定义：

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

> 也就是说，在没有定义 __LIBC 或者定义 _LIBC_REENTRANT 的时候，errno 是多线程 / 进程安全的。一般而言，
> **ASSEMBLER**, _LIBC 和 _LIBC_REENTRANT 都不会被编译器定义，但是如果我们定义 _LIBC_REENTRANT
> 一次又何妨那？为了检测一下你编译器是否定义上述变量，不妨使用下面一个简单程序。

希望读者在进行移植的时候，读一下相关的 unix 版本的 <bits/errno.h> 文 件，来确定应该定义什么宏。不同的 unix
版本可能存在着一些小的差别！

```c
#include <stdio.h>
#include <errno.h>

int main(void)
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
