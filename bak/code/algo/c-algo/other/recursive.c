#include "helper.h"
#include <stdio.h>
int fac(long n) {
  if (n > 1) {
    return n * fac(n - 1);
  } else {
    return n;
  }
}

int fib(int n) {
  if (n == 1) {
    return 1;
  } else if (n == 2) {
    return 1;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
}

int binary_search(int nums[], int target, int l, int r) {
  while (l <= r) {
    int mid = (l + r) / 2;
    if (target == nums[mid]) {
      return mid;
    } else if (target < nums[mid]) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return -1;
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

// 合并数组中的一段
void merge_sort_inner(int nums[], int l, int mid, int r) {
  int tmp[50] = {0};

  int start1 = l;
  int start2 = mid + 1;

  int offset = start1;
  int cnt = 0;
  // 1 2 3 4 5
  // 0   2   4
  // 0 1 2 | 3 4
  //
  while (start1 <= mid && start2 <= r) {
    if (nums[start1] <= nums[start2]) {
      tmp[cnt] = nums[start1];
      start1 += 1;
    } else {
      tmp[cnt] = nums[start2];
      start2 += 1;
    }
    cnt += 1;
  }
  while (start1 <= mid) {
    tmp[cnt] = nums[start1];
    start1 += 1;
    cnt += 1;
  }
  while (start2 <= r) {
    tmp[cnt] = nums[start2];
    // nums[cnt] = nums[start2];
    start2 += 1;
    cnt += 1;
  }

  for (int i = 0; i < cnt; i++) {
    nums[i + offset] = tmp[i];
  }
  // print_arr(tmp, 5);
}

// 归并排序
void merge_sort(int nums[], int l, int r) {
  if (l >= r) {
    return;
  }
  int mid = l + (r - l) / 2;
  merge_sort(nums, l, mid);
  merge_sort(nums, mid + 1, r);
  merge_sort_inner(nums, l, mid, r);
}

void test_fib_and_fac() {
  printf("%d\n", fac(4));
  printf("%d\n", fib(5)); // 1 1 2 3 5
}
void test_binary_search() {
  int nums[] = {4, 2, 5, 1, 3};
  printf("%d\n", binary_search(nums, 2, 0, sizeof(nums) / sizeof(int) - 1));
  print_arr(nums, 5);
}
void test_quick_sort() {
  int nums[] = {4, 2, 5, 1, 3};
  quick_sort(nums, 1, sizeof(nums) / sizeof(int) - 1);
  print_arr(nums, 5);

  quick_sort(nums, 0, sizeof(nums) / sizeof(int) - 1);
  print_arr(nums, 5);
}
void test_merge_sort() {
  int nums[] = {4, 2, 5, 1, 3};
  merge_sort(nums, 1, 4);
  print_arr(nums, 5);
  merge_sort(nums, 0, 4);
  print_arr(nums, 5);
}

int main() {
  test_merge_sort();
  test_quick_sort();
  return 0;
}