#include "stdio.h"
#include "stdlib.h"

#define max(a, b) (a > b ? a : b)

int main() {
  // void *a = malloc(1);
  // *(char *)a = 129;
  // printf("%d\n", *(int *)a);
  printf("%d", max(1, 2));
}