#include "msg_cs.h"
#include "sys/stat.h"
#include <fcntl.h>
#include <stdio.h>
#include <sys/msg.h>
#include <sys/types.h>
// #include <sys/stat.h>
// #include <unistd.h>

int main(int argc, char const *argv[]) {

  int server_id = msgget(SERVER_KEY, IPC_CREAT | S_IRUSR | S_IEXEC);

  struct request_t req;
  for (;;) {
    msgrcv(server_id, &req, REQ1, 0, 0);
  }

  return 0;
}