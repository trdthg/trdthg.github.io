#include <fcntl.h>
#include <pthread.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/ioctl.h>
#include <unistd.h>

void printInfo() {
  // ttyname(STDIN_FILENO);
  printf("child: pid=%ld, ppid=%ld, pgid=%ld, sid=%ld, tty=%s\n",
         (long)getpid(), (long)getppid(), (long)getpgrp(), (long)getsid(0),
         ctermid(NULL));
}

int main() {
  switch (fork()) {
  case -1:
    perror("fork");
    exit(EXIT_FAILURE);
  case 0:
    // 创建一个新会话
    setsid();
    int cterm;
    // 创建控制终端
    // if (ioctl(cterm, TIOCSCTTY) == -1) {
    //   perror("ioctl TIOCSCTTY failed");
    //   exit(EXIT_FAILURE);
    // } else {
    //   printInfo();
    // }
    // 因为没有控制终端，所以 open 调用失败
    if (open("/dev/tty", O_RDWR) == -1) {
      perror("open /dev/tty failed");
      exit(EXIT_FAILURE);
    }
    exit(EXIT_SUCCESS);
  default:
    printInfo();
    _exit(EXIT_SUCCESS);
  }
  return 0;
}
