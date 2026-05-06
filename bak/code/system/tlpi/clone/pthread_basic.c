#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

struct thread_arg {
  int id;
  char *msg;
};

static void *thread_func(void *arg) {
  struct thread_arg *targ = arg;
  printf("thread_func: %d\n", targ->id);
  return NULL;
}

int main() {
  int rt;
  int thread_max = 10;
  pid_t pid = getpid();
  pthread_t *t_group = malloc(sizeof(pthread_t) * thread_max);
  for (int i = 0; i < thread_max; i++) {
    rt = pthread_create(&t_group[i], NULL, thread_func,
                        &(struct thread_arg){.id = i, .msg = "hello"});
    if (rt != 0) {
      fprintf(stderr, "pthread_create: %s\n", strerror(rt));
      exit(EXIT_FAILURE);
    }
  }
  void *res;
  for (int i = 0; i < thread_max; i++) {
    pthread_join(t_group[i], &res);
  }
  free(t_group);
  return 0;
}
