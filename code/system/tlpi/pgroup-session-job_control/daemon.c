#include "unistd.h"
#include <fcntl.h>
#include <stdlib.h>
#include <sys/stat.h>

#define BD_NO_CHDIR 01
#define BD_NO_CLOSE_FILES 02
#define BD_NO_REOPEN_STD_FDS 04

#define BD_NO_UMASK0 010

#define BD_MAX_CLOSE 8192

int become_daemon(int flags) {
  int max_fd, fd;
  // fork() 一次，父进程退出
  switch (fork()) {
  case -1:
    return -1;
  case 0:
    break;
  default:
    _exit(EXIT_SUCCESS);
  }
  // 创建新会话，子进程成为会话首进程
  setsid();

  switch (fork()) {
  case -1:
    return -1;
  case 0:
    break;
  default:
    _exit(EXIT_SUCCESS);
  }
  // 清除文件模式创建屏蔽字
  if (!(flags & BD_NO_UMASK0)) {
    umask(0);
  }
  // 改变工作目录
  if (!(flags & BD_NO_CHDIR)) {
    chdir("/");
  }
  // 关闭所有文件描述符
  if (!(flags & BD_NO_CLOSE_FILES)) {
    max_fd = sysconf(_SC_OPEN_MAX);
    if (max_fd == -1) {
      max_fd = BD_MAX_CLOSE;
    }
    for (fd = 0; fd < max_fd; fd++) {
      close(fd);
    }
  }
  // 重定向标准输入、输出、错误
  if (!(flags & BD_NO_REOPEN_STD_FDS)) {
    close(STDIN_FILENO);
    fd = open("/dev/null", O_RDWR);
    if (fd != STDIN_FILENO) {
      return -1;
    }
    if (dup2(STDIN_FILENO, STDOUT_FILENO) != STDOUT_FILENO) {
      return -1;
    }
    if (dup2(STDIN_FILENO, STDERR_FILENO) != STDERR_FILENO) {
      return -1;
    }
  }
  return 0;
}

int main() {
  become_daemon(0);
  sleep(10);
  return 0;
}