#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main() {
  printf("%d \n", getppid());
  printf("%d \n", getpid());

  return 0;
}
