#include <libgen.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <wait.h>

#define CMD_SIZE 128

int aaa(int a, int b) { return a + b; }

int main(int argc, char *argv[]) {
  char cmd[CMD_SIZE];
  int c = aaa(1, 2);
  pid_t pid = getpid();
  pid_t child_pid = fork();
  switch (child_pid) {
  case -1:
    exit(EXIT_FAILURE);
  case 0:
    _exit(EXIT_SUCCESS);
  default:
    sleep(1);
    snprintf(cmd, CMD_SIZE, "ps | grep %s", basename(argv[0]));
    cmd[CMD_SIZE - 1] = '\0';
    system(cmd);
    if (kill(child_pid, SIGKILL) == -1) {
      exit(EXIT_FAILURE);
    }
    sleep(1);
    printf("After sending SIGKILL to zombie (PID=%ld):\n", (long)child_pid);
    system(cmd);
    // 内核只有在 wait 后，才将其从进程表中删除
    // 即使是进程退出，kill -9 也不行
    printf("After check SIGKILL to zombie (PID=%ld):\n", (long)child_pid);
    // wait(NULL);
    // 不阻塞 wait，效果和 wait 阻塞一样
    while (waitpid(-1, NULL, WNOHANG) > 0) {
      continue;
    }
    system(cmd);
    exit(EXIT_SUCCESS);
  }
}
