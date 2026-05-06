#include "helper.h"
#include "stdio.h"
#include "stdlib.h"

// - 最优装载问题（算法、算法时间复杂度、算法正确性证明）、重量
void quick_sort(int nums[], int l, int r);

// return: 返回装的数量
int loading(int c, int *w, int len) {
  quick_sort(w, 0, len - 1);

  int i;
  int cnt = 0;
  for (i = 0; i < len; i++) {
    c -= w[i];
    if (c < 0) {
      break;
    }
    cnt += 1;
  }
  return cnt;
}

void test_loading() {
  int len = 5;
  int w[] = {8, 4, 7, 2, 8};
  int c = 20;

  int n = loading(c, w, 5);

  print_arr(w, 5);
  printf("%d\n", n);
}

// - 分数背包问题（算法、算法时间复杂度、算法正确性证明）、单位质量价值 Vi /
// Wi
struct Item {
  int v;
  int w;
};
int cmp(const void *a, const void *b) {
  struct Item *a1 = (struct Item *)a;
  struct Item *b1 = (struct Item *)b;
  return a1->v / a1->w < b1->v / b1->w ? 1 : -1;
}
int package(int c, struct Item *items, int len) {
  qsort(items, len, sizeof(struct Item), cmp);
  int res = 0;
  for (int i = 0; i < len; i++) {
    c -= items[i].w;
    if (c < 0) {
      break;
    }
    res += items[i].v;
  }
  return res;
}
void test_package() {
  struct Item items[] = {{12, 4}, {1, 2}, {5, 10}, {1, 1}, {8, 2}};
  int n = package(10, items, 5);
  printf("%d\n", n);
}

// - 活动安排（算法、算法时间复杂度、算法正确性证明） 结束早的在前
int activity(int *result, int *S, int *f, int len) {
  int cnt = 1;
  result[1] = 1;
  for (int i = 2; i <= len; i++) {
    if (S[i] >= f[result[cnt]]) {
      cnt += 1;
      result[cnt] = i;
    }
  }
  return cnt;
}

void test_activity() {
  int S[] = {0, 1, 3, 0, 5, 3, 5, 6, 8, 8, 2, 12};
  int f[] = {0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14};
  int result[12] = {0};
  int n = activity(result, S, f, 11);
  print_arr(result, n + 1);
}

int main() {
  //   test_activity();
  //   test_loading();
  test_package();
}

int quick_sort_inner(int nums[], int l, int r) {
  int pivot = nums[l];
  while (l < r) {
    while (l < r && nums[r] >= pivot) {
      r -= 1;
    }
    if (l < r)
      nums[l] = nums[r];
    while (l < r && nums[l] <= pivot) {
      l += 1;
    }
    if (l < r)
      nums[r] = nums[l];
  }
  nums[l] = pivot;
  return l;
}

void quick_sort(int nums[], int l, int r) {
  if (l < r) {
    int mid = quick_sort_inner(nums, l, r);
    quick_sort(nums, l, mid - 1);
    quick_sort(nums, mid + 1, r);
  }
}