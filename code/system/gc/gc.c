#include "gc.h"
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

/*
 * Scan the free list and look for a place to put the block. Basically, we're
 * looking for any block that the to-be-freed block might have been partitioned
 * from.
 */
static void add_to_free_list(header_t *bp) {
  header_t *p;

  // bp 不在 freep 和 freep->next 之间，就继续循环
  for (p = freep; !(bp > p && bp < p->next); p = p->next) {
    // 如果是转到前面了，并且 p 在 最右侧，或者最左侧
    if (p >= p->next && (bp > p || bp < p->next)) {
      break;
    }
  }
  if (p == NULL) {
    printf("p is NULL\n");
    exit(1);
  }

  // bp 和 p->next 可以合并
  if (bp + bp->size == p->next) {
    bp->size += p->next->size;
    bp->next = p->next->next;
  } else {
    bp->next = p->next;
  }

  // p 和 bp 可以合并
  if (p + p->size == bp) {
    p->size += bp->size;
    p->next = bp->next;
  } else {
    p->next = bp;
  }

  freep = p;
}

/*
 * Request more memory from the kernel.
 */
header_t *morecore(size_t num_units) {
  void *vp;
  header_t *up;
  // 不能大于 MIN_ALLOC_SIZE
  size_t size = num_units > MIN_ALLOC_SIZE ? MIN_ALLOC_SIZE
                                           : num_units * sizeof(header_t);
  printf("size: %ld\n", size);
  vp = sbrk(size);
  if (vp == (void *)-1)
    return NULL;

  up = (header_t *)vp;
  up->size = num_units;
  return up;
}

// /*
//  * Find a chunk from the free list and put it in the used list.
//  */
// void *GC_malloc(size_t alloc_size) {
//   size_t num_units;
//   header_t *p, *prevp;

//   num_units = (alloc_size + sizeof(header_t) - 1) / sizeof(header_t) + 1;
//   prevp = freep;

//   for (p = prevp->next;; prevp = p, p = p->next) {
//     if (p->size >= num_units) { /* Big enough. */
//       if (p->size == num_units) /* Exact size. */
//         prevp->next = p->next;
//       else {
//         p->size -= num_units;
//         p += p->size;
//         p->size = num_units;
//       }

//       freep = prevp;

//       /* Add to p to the used list. */
//       if (usedp == NULL)
//         usedp = p->next = p;
//       else {
//         p->next = usedp->next;
//         usedp->next = p;
//       }

//       return (void *)(p + 1);
//     }
//     if (p == freep) { /* Not enough memory. */
//       add_to_free_list(morecore(num_units));
//       p = freep;
//       if (p == NULL) /* Request for more memory failed. */
//         return NULL;
//     }
//   }
// }

// /*
//  * Scan a region of memory and mark any items in the used list appropriately.
//  * Both arguments should be word aligned.
//  */
// static void scan_region(unsigned int *sp, unsigned int *end) {
//   header_t *bp;

//   for (; sp < end; sp++) {
//     intptr_t v = *sp;
//     bp = usedp;
//     do {
//       if ((intptr_t)(bp + 1) <= v && (intptr_t)(bp + 1 + bp->size) > v) {
//         bp->next = (header_t *)(((intptr_t)bp->next) | 1);
//         break;
//       }
//     } while ((bp = UNTAG(bp->next)) != usedp);
//   }
// }

// /*
//  * Scan the marked blocks for references to other unmarked blocks.
//  */
// static void scan_heap(void) {
//   unsigned int *vp;
//   header_t *bp, *up;

//   for (bp = UNTAG(usedp->next); bp != usedp; bp = UNTAG(bp->next)) {
//     if (!((unsigned int)bp->next & 1))
//       continue;
//     for (vp = (unsigned int *)(bp + 1); vp < (bp + bp->size + 1); vp++) {
//       unsigned int v = *vp;
//       up = UNTAG(bp->next);
//       do {
//         if (up != bp && up + 1 <= v && up + 1 + up->size > v) {
//           up->next = ((unsigned int)up->next) | 1;
//           break;
//         }
//       } while ((up = UNTAG(up->next)) != bp);
//     }
//   }
// }

// unsigned long stack_bottom;

// /*
//  * Find the absolute bottom of the stack and set stuff up.
//  */
void GC_init(void) {
  static int initted;
  FILE *statfp;

  if (initted)
    return;

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

  usedp = NULL;
  base.next = freep = &base;
  base.size = 0;
}

/*
 * Mark blocks of memory in use and free the ones not in use.
 */
// void GC_collect(void) {
//   header_t *p, *prevp, *tp;
//   unsigned long stack_top;
//   extern char end, etext; /* Provided by the linker. */

//   if (usedp == NULL)
//     return;

//   /* Scan the BSS and initialized data segments. */
//   scan_region(&etext, &end);

//   /* Scan the stack. */
//   asm volatile("movl %%ebp, %0" : "=r"(stack_top));
//   scan_region(stack_top, stack_bottom);

//   /* Mark from the heap. */
//   scan_heap();

//   /* And now we collect! */
//   for (prevp = usedp, p = UNTAG(usedp->next);; prevp = p, p = UNTAG(p->next))
//   { next_chunk:
//     if (!((unsigned int)p->next & 1)) {
//       /*
//        * The chunk hasn't been marked. Thus, it must be set free.
//        */
//       tp = p;
//       p = UNTAG(p->next);
//       add_to_free_list(tp);

//       if (usedp == tp) {
//         usedp = NULL;
//         break;
//       }

//       prevp->next = (unsigned int)p | ((unsigned int)prevp->next & 1);
//       goto next_chunk;
//     }
//     p->next = ((unsigned int)p->next) & ~1;
//     if (p == usedp)
//       break;
//   }
// }

// int main() {
//   GC_init();
//   GC_malloc(10);
//   return 0;
// }