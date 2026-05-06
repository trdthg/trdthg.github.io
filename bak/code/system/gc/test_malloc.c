#include "gc.h"
#include <assert.h>
#include <stdio.h>

int main(int argc, char const *argv[]) {
  header_t *h = morecore(4);
  printf("pointer: %p, size: %d, next: %p\n", h, h->size, h->next);
  header_t *h2 = morecore(4);
  printf("pointer: %p, size: %d, next: %p\n", h2, h2->size, h2->next);
  assert((unsigned long)h2 - (unsigned long)h == 4 * sizeof(header_t));
  return 0;
}