#ifndef FIFO_H
#define FIFO_H

#include <unistd.h>

#define SERVER_FIFO "/tmp/seqnum_sv"

#define CLIENT_FIFO_TEMPLATE "/tmp/seqnum_cl.%ld"

#define CLIENT_FIFO_NAME_LEN (sizeof(CLIENT_FIFO_TEMPLATE) + 20)

struct request_t {
  pid_t pid;
  int seq_len;
};

struct response_t {
  int seq_num;
};

#endif