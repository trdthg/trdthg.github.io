#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

static pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
static int notice_got = 0;

static void clean_func(void *arg) {
  free(arg);
  printf("block at %p has been freed\n", arg);
  pthread_mutex_unlock(&mutex);
  printf("mutex has been unlocked\n");
}

static void *thread_func(void *arg) {
  // 分配的 block 会被清理函数释放
  void *buf = malloc(0x10000);
  // 加的互斥锁会被取消时自动解锁
  pthread_mutex_lock(&mutex);

  // 注册清理函数
  pthread_cleanup_push(clean_func, buf);
  while (!notice_got) {
    pthread_cond_wait(&cond, &mutex);
  }
  // 注销清理函数
  pthread_cleanup_pop(1);
  return NULL;
}

int main() {
  pthread_t t;
  pthread_create(&t, NULL, thread_func, NULL);

  sleep(1);

  {
    notice_got = 1;
    pthread_cond_signal(&cond);
    // pthread_cancel(t);
  }

  void *res;
  pthread_join(t, &res);
  return 0;
}
