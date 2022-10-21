#include "helper.h"
#include "stdio.h"
#include "stdlib.h"
#include <stdbool.h>
#include <sys/types.h>
#define max(a, b) (a > b ? a : b)
// - 0-1背包问题（解空间树，画解空间树中的搜索过程，解的形式，约束，目标、算法）

// 解向量:{x1, x2, x3, ..., xn} 表示第i行的皇后位置 | 定点 i 的颜色 |
// 可行性约束函数： Z wixi <= ci , 重量总和不超过 c
// 解空间树： 有 2n 个节点，总节点数有 2^(n+1) - 1 个

int bound(int i, int c, int n, int *w, int *v, int cv, int cw) {
  int cleft = c - cw; // 剩余的空间
  int b = cv;         // 当前价值
  while (i <= n && w[i] <= cleft) { // 遍历所有能装得进去的，把价值，重量加进去
    cleft -= w[i];
    b += v[i];
    i++;
  }
  // 类似分数背包，切块后加进去
  if (i <= n) {
    b += v[i] / w[i] * cleft;
  }
  return b;
}

// i：当前深度
// c：最大装载重量
// n：物品总数
// w：物品重量
// v：物品价值
// x：已经选择的物品
// maxv：最大价值
// cw：当前重量
// cv：当前价值

void backtrace(int i, int n, int c, int *w, int *v, int *x, int *maxv, int cw,
               int cv) {
  if (i > n) { // 到达叶节点
    *maxv = max(cv, *maxv);
    return;
  }

  // 进入左子树（选）
  if (cw + w[i] <= c) { // 能装的进去
    x[i] = 1;           // 标记
    backtrace(i + 1, n, c, w, v, x, maxv, cw + w[i], cv + v[i]);
  }

  // 进入右子树（不选）
  if (bound(i + 1, c, n, w, v, cv, cw) >
      *maxv) { // 装满背包的价值是否能超过当前最大价值
    x[i] = 0;  // 标记
    backtrace(i + 1, n, c, w, v, x, maxv, cw, cv);
  }
}

void packet_test() {
  int N = 5;

  int *w = malloc(sizeof(int) * (N + 1));
  int _w[5] = {30, 20, 20, 50, 40};
  for (int i = 1; i <= N; i++) {
    w[i] = _w[i - 1];
  }
  print_arr(w, 6);

  int *v = malloc(sizeof(int) * (N + 1));
  int _v[5] = {65, 40, 30, 60, 40};
  for (int i = 1; i <= N; i++) {
    v[i] = _v[i - 1];
  }
  print_arr(v, 6);

  int *x = malloc(sizeof(int) * (N + 1));
  print_arr(x, 6);

  int maxv = 0;
  backtrace(1, 5, 100, w, v, x, &maxv, 0, 0);

  printf("最大价值：%d\n", maxv);
}

// - n后问题（解的形式，约束）

bool is_valid(int current_row, int *s, int n) {
  for (int row = 1; row < current_row; row++) {
    // 同列
    if (s[row] == s[current_row]) {
      return false;
    }
    // 对角线
    if (abs(current_row - row) == abs(s[row] - s[current_row])) {
      return false;
    }
  }
  return true;
}

// s: 结果集
// n: 棋盘大小
// row: 现在的行数
void queue1(int *s, int n, int *sum, int row) {
  if (row == n + 1) {
    print_arr(s, n + 1);
    *sum += 1;
    return;
  }
  for (int col = 1; col <= n; col++) {
    s[row] = col;
    if (!is_valid(row, s, n))
      continue;
    queue1(s, n, sum, row + 1);
  }
}

void queue2(int *s, int n, int *sum) {
  s[1] = 0;
  int k = 1;
  while (k > 0) {
    // 找到第 k 行应该放置的位置
    s[k] += 1;
    while (s[k] <= n && !is_valid(k, s, n)) {
      s[k] += 1;
    }
    // 如果 s[k] > n, 就说明这一行不能放
    if (s[k] > n) {
      s[k] = 0;
      k -= 1;
      continue;
    }
    // 这一行可以放，要么 k++ 走下一行，
    // 要么就是结束了，当下次循环时 s[k] + 1，超出导致回退
    if (k == n) { // 列为末尾
      *sum += 1;
    } else {
      k += 1;
    }
  }
}

void queue(int *s, int n, int *sum) {
  s[1] = 0;
  int k = 1;
  while (k > 0) {
    s[k] += 1;
    while (s[k] <= n && !is_valid(k, s, n)) {
      s[k] += 1;
    }
    if (s[k] > n) {
      s[k] = 0;
      k--;
      continue;
    }
    if (k == n) {
      *sum += 1;
    } else {
      k += 1;
    }
  }
}
// bool is_valid2(int *s, int n, int k) {
//   for (int i = 1; i < k; i++) {
//     if (s[i] == s[k]) {
//       return false;
//     }
//     if (abs(s[k] - s[i]) == abs(k - i)) {
//       return false;
//     }
//   }
//   return true;
// }

void test_queue() {
  int N = 4;
  int *s = malloc(sizeof(int) * (N + 1));
  for (int i = 0; i <= N; i++) {
    s[i] = 0;
  }
  int sum = 0;
  // queue1(s, N, &sum, 1);
  // queue2(s, N, &sum);
  queue(s, N, &sum);
  printf("共有 %d 种", sum);
}

// - 图的M着色（解的形式，约束，算法）、

// 解向量:{x1, x2, x3, ..., xn} 表示第i行的皇后位置 | 定点 i 的颜色 |
// 可行性约束函数：第 i 行皇后于同行同列对角线不相交 | 于相邻定点颜色不重复
// 解空间树：n = 3, m = 4

bool is_color(int *x, int n, int **g, int k) {
  for (int i = 1; i <= n; i++) {
    if (g[i][k] == 1 && x[i] == x[k])
      return false;
  }
  return true;
}

// - 装载问题（解的形式，算法）。

void backtrace4(int i, int n, int c, int *w, int *maxw, int cw, int r) {
  if (i > n) {
    // x[i] = 1;
    *maxw = max(*maxw, cw);
    return;
  }
  if (cw + w[i] <= c) {
    backtrace4(i + 1, n, c, w, maxw, cw + w[i], r - w[i]);
  }
  if (cw + r - w[i] > *maxw) {
    backtrace4(i + 1, n, c, w, maxw, cw, r - w[i]);
  }
}

void test_backtrace4() {
  int N = 5;
  int *w = malloc(sizeof(int) * (N + 1));
  int _w[] = {0, 30, 20, 20, 50, 40};
  int r = 0;
  for (int i = 1; i <= N; i++) {
    w[i] = _w[i];
    r += w[i];
  }
  int maxw = 0;
  backtrace4(1, N, 150, w, &maxw, 0, r);
  printf("共有 %d\n", maxw);
}

int main() {
  // test_queue();
  // packet_test();
  test_backtrace4();
  return 0;
}