#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>

int main() {
  FILE *fp;
  int status;
  char buf[1024];
  // 注意，默认是块缓冲
  if ((fp = popen("ls -lha", "r")) == NULL) {
    perror("popen");
    exit(EXIT_FAILURE);
  }
  while (fgets(buf, sizeof(buf), fp) != NULL) {
    printf("%s", buf);
  }
  if (pclose(fp) == -1) {
    perror("pclose");
    exit(EXIT_FAILURE);
  }
  exit(EXIT_SUCCESS);
}