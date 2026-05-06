#include <pthread.h>
#include <semaphore.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

sem_t empty;
sem_t mutex;
sem_t stuffs;

int n = 0;
int m = 0;
int t = 0;
int N = 100000;

void *produce(void *p) {
  while (n < N) {
    sem_wait(&empty); // 缓冲区有空的
    sem_wait(&mutex);
    n++;
    t++;
    sem_post(&mutex);
    sem_post(&stuffs); // 缓冲区装一个
  }
  printf("Producer: [%d %d]\n", n, m);
  return 0;
}

void *consume(void *p) {
  while (m < N) {
    sem_wait(&stuffs); // 有东西
    sem_wait(&mutex);  // 锁缓冲区
    m++;
    t--;
    sem_post(&mutex); // 那缓冲区
    sem_post(&empty); // 减一个东西
  }
  printf("Consumer: [%d %d %d]\n", n, m, t);
  return 0;
}

int main() {
  // init
  sem_init(&mutex, 0, 1);
  sem_init(&empty, 0, 2);
  sem_init(&stuffs, 0, 0);

  // create threads
  pthread_t t1;
  pthread_t t2;
  pthread_create(&t1, NULL, produce, NULL);
  pthread_create(&t2, NULL, consume, NULL);

  // exit
  pthread_exit(0);
  return 0;
}