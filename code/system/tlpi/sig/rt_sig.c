#define __USE_POSIX199309
#include <errno.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <wait.h>

static void handler(int sig, siginfo_t *si, void *uc) {
  printf("Child process %d received signal %d sigval %s from process %d\n",
         getpid(), sig, (char *)si->si_value.sival_ptr, si->si_pid);
  _exit(EXIT_SUCCESS);
}

int main() {
  pid_t pid = getpid();
  union sigval sv;

  sigset_t sig_block_set;
  sigset_t sig_origin_set;
  sigemptyset(&sig_origin_set);
  sigemptyset(&sig_block_set);

  sigaddset(&sig_block_set, SIGRTMIN);
  sigprocmask(SIG_BLOCK, &sig_block_set, NULL);
  for (int i = 0; i < 10; i++) {
    char *sigv = malloc(sizeof(char) * 10);
    sigv = "SIGRTMIN";

    sv.sival_ptr = (void *)sigv;
    struct sigaction ac = {.sa_sigaction = handler, .sa_flags = SA_SIGINFO};
    // create child process，and get child process's pid
    pid_t child_pid = fork();
    switch (child_pid) {
    case -1:
      perror("fork");
      exit(EXIT_FAILURE);
    case 0:
      // child process
      sigaction(SIGRTMIN, &ac, NULL);
      sigprocmask(SIG_UNBLOCK, &sig_block_set, NULL);
      printf("Child %d waiting for signal %d from process %d\n", getpid(),
             SIGRTMIN, getppid());
      // sigsuspend(&sig_block_set);
      // _exit(EXIT_SUCCESS);
      while (1)
        ;
      break;
    default:
      // parent process
      printf("Parent process %d sending signal %d to process %d\n", pid,
             SIGRTMIN, child_pid);
      sigqueue(child_pid, SIGRTMIN, sv);
    }
  }
  sigprocmask(SIG_SETMASK, &sig_origin_set, NULL);
  pid_t child_pid;
  for (;;) {
    child_pid = wait(NULL);
    if (child_pid != -1)
      continue;
    if (errno != ECHILD) {
      perror("error on wait");
    }
    break;
  }
  return 0;
}
