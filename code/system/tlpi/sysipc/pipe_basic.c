#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

int main() {
  int pfd[2];
  if (pipe(pfd) == -1) {
    perror("pipe");
    exit(EXIT_FAILURE);
  }

  switch (fork()) {
  case -1:
    perror("fork");
    exit(EXIT_FAILURE);
  case 0:
    if (close(pfd[1]) == -1) {
      perror("close");
      exit(EXIT_FAILURE);
    }
    for (;;) {
      char buf[10];
      ssize_t nread = read(pfd[0], buf, sizeof(buf));
      if (nread == -1) {
        perror("read");
        exit(EXIT_FAILURE);
      }
      if (nread == 0) {
        break;
      }
      printf("read %ld bytes: %.*s\n", (long)nread, (int)nread, buf);
    }
    close(pfd[1]);
    exit(EXIT_FAILURE);
  default:
    if (close(pfd[0]) == -1) {
      perror("close");
      exit(EXIT_FAILURE);
    }
    while (1) {
      if (write(pfd[1], "hello", 5) != 5) {
        perror("write");
        exit(EXIT_FAILURE);
      }
    }
    if (close(STDOUT_FILENO) == -1) {
      perror("close");
      exit(EXIT_FAILURE);
    }
    if (wait(NULL) == -1) {
      perror("wait");
      exit(EXIT_FAILURE);
    }
  }
  exit(EXIT_SUCCESS);
}