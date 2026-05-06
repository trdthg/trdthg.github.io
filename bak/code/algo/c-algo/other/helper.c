#include "stdio.h"

void print_arr(int *nums, int len) {
  for (int i = 0; i < len; i++) {
    printf("%d ", nums[i]);
  }
  printf("\n");
}
void print_matrix(int **nums, int x, int y) {
  for (int i = 0; i < x; i++) {
    print_arr(nums[i], y);
  }
  printf("\n");
}
// int quick_sort_inner(int nums[], int l, int r) {
//   int pivot = nums[l];
//   while (l < r) {
//     while (l < r && nums[r] >= pivot) {
//       r -= 1;
//     }
//     if (l < r)
//       nums[l] = nums[r];
//     while (l < r && nums[l] <= pivot) {
//       l += 1;
//     }
//     if (l < r)
//       nums[r] = nums[l];
//   }
//   nums[l] = pivot;
//   return l;
// }

// void quick_sort(int nums[], int l, int r) {
//   if (l < r) {
//     int mid = quick_sort_inner(nums, l, r);
//     quick_sort(nums, l, mid - 1);
//     quick_sort(nums, mid + 1, r);
//   }
// }

// // 合并数组中的一段
// void merge_sort_inner(int nums[], int l, int mid, int r) {
//   int tmp[5] = {0};

//   int start1 = l;
//   int start2 = mid + 1;

//   int offset = start1;
//   int cnt = 0;
//   // 1 2 3 4 5
//   // 0   2   4
//   // 0 1 2 | 3 4
//   //
//   while (start1 <= mid && start2 <= r) {
//     if (nums[start1] <= nums[start2]) {
//       tmp[cnt] = nums[start1];
//       start1 += 1;
//     } else {
//       tmp[cnt] = nums[start2];
//       start2 += 1;
//     }
//     cnt += 1;
//   }
//   while (start1 <= mid) {
//     tmp[cnt] = nums[start1];
//     start1 += 1;
//     cnt += 1;
//   }
//   while (start2 <= r) {
//     tmp[cnt] = nums[start2];
//     // nums[cnt] = nums[start2];
//     start2 += 1;
//     cnt += 1;
//   }

//   for (int i = 0; i < cnt; i++) {
//     nums[i + offset] = tmp[i];
//   }
//   // print_arr(tmp, 5);
// }

// // 归并排序
// void merge_sort(int nums[], int l, int r) {
//   if (l >= r) {
//     return;
//   }
//   int mid = l + (r - l) / 2;
//   merge_sort(nums, l, mid);
//   merge_sort(nums, mid + 1, r);
//   merge_sort_inner(nums, l, mid, r);
// }
