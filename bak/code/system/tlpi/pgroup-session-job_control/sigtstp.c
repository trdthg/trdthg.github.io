#include <errno.h>
#include <fcntl.h>
#include <pthread.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

static void tstpHandler(int sig) {

  sigset_t tstpMask, prevMask;
  int savedErrno;
  struct sigaction sa;
  printf("child %ld: caught SIGTSTP\n", (long)getpid());

  // 将 SIGTSTP 信号设为 SIG_DFL
  if (signal(SIGTSTP, SIG_DFL) == SIG_ERR) {
    perror("signal SIGTSTP failed\n");
  }

  // 再次发起 SIGTSTP
  // 信号，会走默认的处理流程，因此程序会阻塞，这个信号的生命周期结束
  raise(SIGTSTP);

  // 当 SIGCONT 信号发起时，第一个信号处理程序会继续执行下面的代码，恢复处理器
  sigemptyset(&tstpMask);
  sigaddset(&tstpMask, SIGTSTP);
  if (sigprocmask(SIG_UNBLOCK, &tstpMask, &prevMask) == -1) {
    perror("sigprocmask failed\n");
  }

  if (sigprocmask(SIG_SETMASK, &prevMask, NULL) == -1) {
    perror("sigprocmask failed\n");
  }

  sigemptyset(&sa.sa_mask);
  sa.sa_flags = SA_RESTART;
  sa.sa_handler = tstpHandler;
  if (sigaction(SIGTSTP, &sa, NULL) == -1) {
    perror("sigaction SIGTSTP failed\n");
  }

  printf("Exit tstpHandler\n");
  errno = savedErrno;
}

int main() {
  struct sigaction sa = {.sa_flags = 0, .sa_handler = tstpHandler};
  sigemptyset(&sa.sa_mask);
  sigaction(SIGTSTP, &sa, NULL);

  printf("child %ld: pausing\n", (long)getpid());
  if (sa.sa_handler != SIG_IGN) {
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART;
    sa.sa_handler = tstpHandler;
    sigaction(SIGTSTP, &sa, NULL);
  }
  for (;;) {
    pause();
    printf("Main\n");
  }
  return 0;
}
