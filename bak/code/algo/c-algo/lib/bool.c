#include "stdbool.h"
#include "stdio.h"
#include <sys/types.h>

struct {
  int x, y;
} a[10] = {[3] = {.x = 12, .y = 1}};

enum {
  Iron = 26,
  Aluminium = 13,
  Beryllium = 4,
};

const char *element_names[] = {
    [Iron] = "Iron",
    [Aluminium] = "Aluminium",
    [Beryllium] = "Beryllium",
};

int main() {
  int len = 10;
  int arr[len]; // C99之前违法

  bool is_n;
  is_n = true;

  int8_t a = 128;
  printf("%d\n", a);
  //
}