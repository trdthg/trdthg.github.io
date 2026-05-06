#include <pthread.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

static void handler(int sig) {}

void printInfo() {
  // ttyname(STDIN_FILENO);
  printf("child: pid=%ld, ppid=%ld, pgid=%ld, sid=%ld, tty=%s\n",
         (long)getpid(), (long)getppid(), (long)getpgrp(), (long)getsid(0),
         ctermid(NULL));
}

// 打印终端的 pid
// echo $$
int main(int argc, char *argv[]) {
  // code...
  setbuf(stdout, NULL);
  struct sigaction sa = {.sa_flags = 0, .sa_handler = handler};
  sigemptyset(&sa.sa_mask);

  if (sigaction(SIGHUP, &sa, NULL) == -1) {
    perror("sigaction SIGHUP failed");
    exit(EXIT_FAILURE);
  }

  pid_t child_pid = fork();
  if (child_pid == 0 && argc > 1) {
    // 切换进程组，但会话 id 不变
    setpgid(0, 0);
  }
  printInfo();
  alarm(60);
  for (;;) {
    pause();
    printf("child %ld: caught SIGHUP\n", (long)getpid());
  }

  return 0;
}
