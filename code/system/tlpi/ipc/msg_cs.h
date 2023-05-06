#ifndef MSG_CS_H
#define MSG_CS_H

#define SERVER_KEY 0x1aaaaaa1

struct request_t {
  long mtype;
  int pid;
  char data[1];
};

#endif