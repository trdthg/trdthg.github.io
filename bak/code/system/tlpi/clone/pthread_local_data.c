#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>

#define BUFLEN 100
static __thread char buf[BUFLEN] = "hello";

static void *thread_func_with_cancel_point(void *arg) {
  for (int i = 0; i < BUFLEN; i++) {
    buf[i] = ((char *)arg)[i];
    if (buf[i] == '\n') {
      break;
    }
  }
  printf("%s, start sleep\n", buf);
  pthread_setcancelstate(PTHREAD_CANCEL_DISABLE, NULL);
  sleep(4);
  pthread_setcancelstate(PTHREAD_CANCEL_ENABLE, NULL);
  sleep(10);
  printf("thread sleep done\n");
  return NULL;
}

static void *thread_func_without_cancel_point(void *arg) {
  for (int i = 0; i < BUFLEN; i++) {
    buf[i] = ((char *)arg)[i];
  }
  printf("%s, start for loop\n", buf);
  // get current time
  time_t start_time = time(NULL);
  for (;;) {
    // 计算密集型，没有取消点，不会被取消
    if (time(NULL) - start_time > 5) {
      // 5 秒后，设置取消点，可以被取消
      pthread_testcancel();
    }
  }
  return NULL;
}

int main() {
  pid_t pid = getpid();
  pthread_t t;
  printf("main:  %s\n", buf);
  *buf = pthread_create(&t, NULL, thread_func_with_cancel_point,
                        "thread with_cancel_point: fuck");

  sleep(1);
  pthread_cancel(t);
  pthread_join(t, NULL);

  pthread_t t2;
  printf("main:  %s\n", buf);
  *buf = pthread_create(&t2, NULL, thread_func_without_cancel_point,
                        "thread without_cancel_point: fuck");
  sleep(1);
  pthread_cancel(t2);
  pthread_join(t2, NULL);
  return 0;
}
