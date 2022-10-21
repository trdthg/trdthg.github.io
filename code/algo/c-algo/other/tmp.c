#include <stdio.h>
struct student {
  char *id;
  int mark;
} arr[4], test0 = {"0001", 80}, test1 = {"0002", 90}, test2 = {"0003", 60},
          test3 = {"0004", 61};
int cmp(const void *a, const void *b) {
  int mark1 = ((struct student *)a)->mark;
  int mark2 = ((struct student *)b)->mark;
  return mark1 > mark2 ? 1 : -1;
}
int main() {
  arr[0] = test0;
  arr[1] = test1;
  arr[2] = test2;
  arr[3] = test3;
  printf("—————排序前—————\n");
  for (int i = 0; i < 4; i++)
    printf("%s %d\n", arr[i].id, arr[i].mark);
  qsort(arr, 4, sizeof(struct student), cmp);
  printf("—————排序后—————\n");
  for (int i = 0; i < 4; i++)
    printf("%s %d\n", arr[i].id, arr[i].mark);
  return 0;
}
