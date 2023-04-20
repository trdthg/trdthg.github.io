#define _GNU_SOURCE
#include <fcntl.h>
#include <pthread.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

static int cmdNum;

static void handler(int sig) {
  if (getpid() == getpgrp()) {
    fprintf(stderr, "Terminal FG process group: %ld caught signal %d\n",
            (long)tcgetpgrp(STDERR_FILENO), sig);
  }
  fprintf(stderr, "Process %ld (%d) caught signal %d (%s)\n", (long)getpid(),
          cmdNum, sig, strsignal(sig));

  // SIGTSTP 终端停止
  if (sig == SIGTSTP) {
    // 这里因为捕获了 SIGTSTP，所以不会停止，需要手动停止
    // SIGSTOP 确保停止
    // SIGSTOP 无法被捕获，阻塞，忽略，会确保进程停止
    // 这里明明是 SIGTSTP，但是实际是 SIGSTOP
    // 使是进程停止，对于需要捕获子进程停止原因的程序来说，
    // 这样的处理方式可能具有误导性，最好的方式还是重新发送一个 SIGTSTP
    raise(SIGSTOP);
  }
}

int main() {
  struct sigaction sa;
  sigemptyset(&sa.sa_mask);
  sa.sa_flags = SA_RESTART;
  sa.sa_handler = handler;
  // CTRL-C
  if (sigaction(SIGINT, &sa, NULL) == -1) {
    perror("sigaction SIGINT failed");
    exit(EXIT_FAILURE);
  }
  // 终端停止
  if (sigaction(SIGTSTP, &sa, NULL) == -1) {
    perror("sigaction SIGTSTP failed");
    exit(EXIT_FAILURE);
  }
  // 终端恢复
  if (sigaction(SIGCONT, &sa, NULL) == -1) {
    perror("sigaction SIGQUIT failed");
    exit(EXIT_FAILURE);
  }

  if (isatty(STDIN_FILENO)) {
    fprintf(stderr, "Terminal FG process group: %ld\n",
            (long)tcgetpgrp(STDIN_FILENO));
    fprintf(stderr, "Command    PID    PPID    PGRP    SID\n");
    cmdNum = 0;
  } else {
    if (read(STDIN_FILENO, &cmdNum, sizeof(cmdNum)) <= 0) {
      perror("read failed");
    }
  }

  cmdNum += 1;

  fprintf(stderr, "%-10d %-6ld %-6ld %-6ld %-6ld\n", cmdNum, (long)getpid(),
          (long)getppid(), (long)getpgrp(), (long)getsid(0));

  if (!isatty(STDOUT_FILENO)) {
    if (write(STDOUT_FILENO, &cmdNum, sizeof(cmdNum))) {
      perror("write failed");
    }
  }

  for (;;) {
    pause();
  }

  return 0;
}
