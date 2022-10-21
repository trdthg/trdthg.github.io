// 不能让所有人同时动筷子

#include <pthread.h>
#include <semaphore.h>
#include <stdbool.h>
#include <stdio.h>

const int N = 5;
// 5 个人
sem_t sems[5];
sem_t lock;
sem_t cnt;

void *eat(void *i) {
  while (true) {
    // 同一时刻不能所有人都上
    sem_wait(&cnt);
    sem_wait(&sems[*(int *)i]);
    sem_wait(&sems[(*(int *)i + 1) % N]);
    sem_post(&cnt);

    printf("%d\n", *(int *)i);
    sem_post(&sems[(*(int *)i + 1) % N]);
    sem_post(&sems[*(int *)i]);
  }
  return 0;
}

int main() {
  sem_init(&lock, 0, 1);
  sem_init(&cnt, 0, N - 1);
  pthread_t threads[N];
  int args[N];
  for (int i = 0; i < N; i++) {
    args[i] = i;
    sem_init(&sems[i], 0, 1);
  }
  for (int i = 0; i < N; i++) {
    int tmp = i;
    pthread_create(&threads[i], NULL, eat, &args[i]);
  }
  pthread_exit(0);
  return 0;
}