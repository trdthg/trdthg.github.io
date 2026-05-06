#define _GNU_SOURCE
#include <errno.h>
#include <fcntl.h>
#include <pthread.h>
#include <sched.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main() {
  cpu_set_t set_child;
  cpu_set_t set_parent;
  CPU_ZERO(&set_child);
  CPU_ZERO(&set_parent);
  // 限制父进程只能在 cpu-5 上运行
  CPU_SET(5, &set_parent);
  // 限制子进程只能在 cpu-1,2,3 上运行
  CPU_SET(1, &set_child);
  CPU_SET(2, &set_child);
  CPU_SET(3, &set_child);
  for (int i = 0; i < 10; i++) {
    if (fork() == 0) {
      // pid = 0 表示调用线程
      if (sched_setaffinity(0, sizeof(set_child), &set_child) == -1) {
        exit(EXIT_FAILURE);
      }
      perror("set child affinity");
      while (1) {
        printf("child-%d run on cpu-%d\n", i, sched_getcpu());
        sleep(1);
      }
      exit(EXIT_SUCCESS);
    }
  }
  if (sched_setaffinity(0, sizeof(set_parent), &set_parent) == -1) {
    exit(EXIT_FAILURE);
  }
  perror("set parent affinity");
  while (1) {
    printf("parent run on cpu-%d\n", sched_getcpu());
    sleep(1);
  }
  return 0;
}
