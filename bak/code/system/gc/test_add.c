#include "gc.h"
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char const *argv[]) {
  header_t*head = malloc(sizeof);
  header_t *h1 = morecore(4);
  header_t *h2 = morecore(4);
  header_t *h3 = morecore(4);
  header_t *h4 = morecore(4);
  header_t *h5 = morecore(4);
  header_t *h6 = morecore(4);
  printf("pointer: %p, size: %d, next: %p\n", h2, h2->size, h2->next);
  assert((unsigned long)h2 - (unsigned long)h == 4 * sizeof(header_t));
  return 0;
}