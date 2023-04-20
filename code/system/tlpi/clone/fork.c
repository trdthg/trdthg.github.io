#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main() {
  pid_t pid = getpid();
  pid_t child_pid;
  switch (child_pid = fork()) {
  case -1:
    return -1;
  case 0:
    printf("father: %d\n", pid);
    break;
  default:
    printf("child : %d\n", child_pid);
  }

  return 0;
}
