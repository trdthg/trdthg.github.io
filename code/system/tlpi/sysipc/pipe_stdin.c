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
    if (close(pfd[0]) == -1) {
      perror("close");
      exit(EXIT_FAILURE);
    }
    if (pfd[1] != STDOUT_FILENO) {
      if (dup2(pfd[1], STDOUT_FILENO) == -1) {
        perror("dup2");
        exit(EXIT_FAILURE);
      }
      if (close(pfd[1]) == -1) {
        perror("close");
        exit(EXIT_FAILURE);
      }
    }
    execlp("ls", "ls", "-lha", (char *)NULL);
    exit(EXIT_FAILURE);
  default:
    break;
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
    if (pfd[0] != STDIN_FILENO) {
      if (dup2(pfd[0], STDIN_FILENO) == -1) {
        perror("dup2");
        exit(EXIT_FAILURE);
      }
      if (close(pfd[0]) == -1) {
        perror("close");
        exit(EXIT_FAILURE);
      }
    }
    execlp("wc", "wc", "-l", (char *)NULL);
    exit(EXIT_FAILURE);
  default:
    break;
  }

  if (close(pfd[0]) == -1) {
    perror("close");
    exit(EXIT_FAILURE);
  }
  if (close(pfd[1]) == -1) {
    perror("close");
    exit(EXIT_FAILURE);
  }
  wait(NULL);
  wait(NULL);
}