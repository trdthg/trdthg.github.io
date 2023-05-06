#ifndef GC_H
#define GC_H

#include <stdlib.h>
#include <unistd.h>

#define UNTAG(p) (((unsigned int)(p)) & 0xfffffffc)

#define MIN_ALLOC_SIZE 4096 /* We allocate blocks in page sized chunks. */

typedef struct header {
  unsigned int size;
  struct header *next;
} header_t;

static unsigned long stack_bottom;

static header_t base;           /* Zero sized block to get us started. */
static header_t *freep = &base; /* Points to first free block of memory. */
static header_t *usedp;         /* Points to first used block of memory. */

header_t *morecore(size_t num_units);
static void add_to_free_list(header_t *bp);

void GC_init(void);
// void *GC_malloc(size_t alloc_size);

// static void scan_region(unsigned int *sp, unsigned int *end);
// static void scan_heap(void);

// void GC_collect(void);

#endif