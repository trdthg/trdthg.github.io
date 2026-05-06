#include <errno.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

#define CHILDREN_COUNT 10

static volatile int numLiveChildren = CHILDREN_COUNT;

static void sigchild_handler(int sig) {
  pid_t child_pid;
  while ((child_pid = waitpid(-1, NULL, WNOHANG) > 0)) {
    numLiveChildren--;
    printf("Handler reaped child %ld (numLiveChildren=%d)\n", (long)child_pid,
           numLiveChildren);
  }
}

int main(int argc, char const *argv[]) {
  sigset_t empty_mask;
  sigemptyset(&empty_mask);
  sigset_t block_mask;
  sigemptyset(&block_mask);
  sigaddset(&block_mask, SIGCHLD);

  int sig_count = 0;
  sigprocmask(SIG_BLOCK, &block_mask, NULL);
  sigaction(SIGCHLD, &(struct sigaction){.sa_handler = sigchild_handler}, NULL);

  for (int i = 0; i < CHILDREN_COUNT; i++) {
    switch (fork()) {
    case -1:
      perror("fork");
      exit(EXIT_FAILURE);
    case 0:
      _exit(EXIT_SUCCESS);
    default:
      break;
    }
  }

  sigprocmask(SIG_UNBLOCK, &block_mask, NULL);

  while (numLiveChildren > 0) {
    if (sigsuspend(&empty_mask) == -1 && errno != EINTR) {
      perror("sigsuspend");
      exit(EXIT_FAILURE);
    }
    sig_count += 1;
  }
  printf("All children have terminated; SIGCHLD was caught %d times\n",
         sig_count);
  return 0;
}