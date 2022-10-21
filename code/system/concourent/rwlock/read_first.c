#include "stdbool.h"
#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>

sem_t write_lock;
sem_t can_read;
sem_t read_lock;
int reader_count = 0;

void *read(void *p) {
  sem_wait(&read_lock);
  if (reader_count == 0) {
    sem_wait(&write_lock);
  }
  reader_count += 1;
  sem_post(&read_lock);
  printf("reader(read) : %d\n", reader_count);
  sem_wait(&read_lock);
  reader_count -= 1;
  if (reader_count == 0) {
    sem_post(&write_lock);
  }
  sem_post(&read_lock);
  return 0;
}

// write 可能会阻塞
void *write(void *p) {
  sem_wait(&write_lock);
  printf("reader(write): %d\n", reader_count);
  sem_post(&write_lock);
  return 0;
}

int main() {
  // init
  sem_init(&write_lock, 0, 1);
  sem_init(&read_lock, 0, 1);

  // M 个 Writer
  int M = 10;
  pthread_t writers[M];
  for (int i = 0; i < M; i++) {
    pthread_create(&writers[i], NULL, write, NULL);
  }

  // N 个 Reader
  int N = 10;
  pthread_t readers[N];
  for (int i = 0; i < N; i++) {
    pthread_create(&readers[i], NULL, read, NULL);
  }

  // exit
  pthread_exit(0);
  return 0;
}