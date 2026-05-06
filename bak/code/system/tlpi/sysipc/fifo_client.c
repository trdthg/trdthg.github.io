#include "fifo.h"
#include <fcntl.h>
#include <stdio.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char const *argv[]) {

  char client_fifo[CLIENT_FIFO_NAME_LEN];
  sprintf(client_fifo, CLIENT_FIFO_TEMPLATE, (long)getpid());
  mkfifo(client_fifo, S_IRUSR | S_IWUSR | S_IWGRP);

  umask(0);
  int server_fd = open(SERVER_FIFO, O_WRONLY);

  struct request_t req;
  req.pid = getpid();
  req.seq_len = 10;
  write(server_fd, &req, sizeof(struct request_t));

  int client_fd = open(client_fifo, O_RDONLY);

  struct response_t res;
  read(client_fd, &res, sizeof(struct response_t));

  printf("next_seq: %d\n", res.seq_num);
  unlink(client_fifo);
  return 0;
}