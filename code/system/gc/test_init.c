#include "gc.h"
#include <assert.h>
#include <stdio.h>
#include <unistd.h>

int main(int argc, char const *argv[]) {
  GC_init();
  assert();
  static int initted;
  FILE *statfp;

  unsigned long stack_top, stack_bottom;
  if (initted)
    return 0;

  initted = 1;

  statfp = fopen("/proc/self/stat", "r");
  assert(statfp != NULL);
  fscanf(statfp,
         "%*d %*s %*c %*d %*d %*d %*d %*d %*u "
         "%*lu %*lu %*lu %*lu %*lu %*lu %*ld %*ld "
         "%*ld %*ld %*ld %*ld %*llu %*lu %*ld "
         "%*lu %*lu %*lu %lu",
         &stack_bottom);
  fclose(statfp);
  printf("%ld\n", stack_bottom);
  printf("%p\n", stack_bottom);
  printf("%d\n", getpid());
  pause();
  return 0;
}