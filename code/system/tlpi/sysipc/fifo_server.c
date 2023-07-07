#include "fifo.h"
#include <fcntl.h>
#include <stdio.h>
#include <sys/stat.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char const *argv[]) {
  unlink(SERVER_FIFO);
  umask(0);
  if (mkfifo(SERVER_FIFO, S_IRUSR | S_IWUSR | S_IWGRP) == -1) {
    perror("mkfifo");
    return 1;
  }
  printf("self: %d\n", getpid());
  int server_fd = open(SERVER_FIFO, O_RDONLY);

  // 多开起了一个 fd，假装一直有人写东西，否则 read 不会阻塞，立即返回 EOF
  int dummy_fd = open(SERVER_FIFO, O_WRONLY);
  printf("open: %d\n", server_fd);

  int seq_cnt = 0;
  struct request_t req;
  for (;;) {
    read(server_fd, &req, sizeof(struct request_t));
    seq_cnt += req.seq_len;
    printf("next seq: %d\n", seq_cnt);
    char client_fifo[CLIENT_FIFO_NAME_LEN];
    sprintf(client_fifo, CLIENT_FIFO_TEMPLATE, (long)req.pid);
    int client_fd = open(client_fifo, O_WRONLY);

    struct response_t res;
    res.seq_num = seq_cnt;
    write(client_fd, &res, sizeof(struct response_t));
    close(client_fd);
    printf("write done!\n");
  }
  return 0;
}