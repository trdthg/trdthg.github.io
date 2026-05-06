#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/msg.h>
#include <sys/types.h>

int main(int argc, char const *argv[]) {
  struct msqid_ds msginfo;
  int maxidx = msgctl(0, MSG_INFO, &msginfo);
  if (maxidx == -1) {
    perror("msgctl");
    return 0;
  }
  printf("maxidx: %d\n", maxidx);
  struct msqid_ds ds;
  for (int i = 0; i < maxidx; i++) {
    int msqid = msgctl(i, MSG_STAT, &ds);
    if (msqid == -1) {
      if (errno == EINVAL || errno == EACCES) {
        continue;
      }
      perror("msgctl");
      return 0;
    }
    printf("key: %d, msg_qnum: %ld\n", ds.msg_perm.__key, ds.msg_qnum);
  }
  return 0;
}