#include "helper.h"
#include "stdio.h"
#include "stdlib.h"
#define max(a, b) (a > b ? a : b)
// - 投资问题（递归关系、算法）
//
int inverst(int m, int n, int **inversts) {
  int dp[m + 1][n + 1];
  for (int i = 1; i <= n; i++) {
    dp[0][i] = 0;
    dp[1][i] = inversts[1][i];
  }
  for (int i = 0; i < m; i++) {
    dp[i][0] = 0;
  }
  printf("dp[1][6]:%d\n", dp[1][6]);

  for (int i = 2; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
      dp[i][j] = 0;
      for (int k = 0; k <= j; k++) {
        dp[i][j] = max(dp[i][j], dp[i - 1][j - k] + inversts[i][k]);
        printf("%d %d %d\n", dp[i][j], i, j);
      }
    }
  }
  return dp[m][n];
}

void test_inverst() {
  int m = 4;
  int n = 6;
  int tmp[5][7] = {
      {0, 0, 0, 0, 0, 0, 0},      {0, 8, 13, 15, 25, 36, 40},
      {0, 4, 16, 20, 28, 34, 45}, {0, 6, 13, 15, 24, 32, 40},
      {0, 7, 20, 16, 22, 34, 38},
  };
  // 1-1 + 2-2 + 3-1 + 4-2 = 50
  int **inversts = malloc(sizeof(int *) * 5);
  for (int i = 0; i < 5; i++) {
    inversts[i] = malloc(sizeof(int) * 7);
    for (int j = 0; j < 7; j++) {
      inversts[i][j] = tmp[i][j];
    }
  };
  print_matrix(inversts, 5, 7);
  int res = inverst(4, 6, inversts);
  printf("最大利润：%d\n", res);
}
// - 0-1背包问题（递归关系、算法）
// c: 背包容量
// items: 所有物品
// len：物品数量
struct Item {
  int w;
  int v;
};
int packet(int c, struct Item *items, int len) {
  int res = 0;

  // 初始化dp数组
  int **dp = malloc(sizeof(int *) * (len + 1));
  for (int i = 0; i <= len; i++) {
    dp[i] = malloc(sizeof(int) * (c + 1));
  }
  // 第一行赋值
  for (int i = 0; i <= c; i++) {
    dp[1][i] = items[0].w <= c ? items[0].v : 0;
  }

  for (int i = 1; i <= len; i++) {
    for (int j = 1; j <= c; j++) {
      // items 的索引要 -1
      if (items[i - 1].w >= j) {
        // 超重了
        dp[i][j] = dp[i - 1][j];
      } else {
        // 没超重
        dp[i][j] = max(dp[i][j - 1], dp[i - 1][j] + items[i - 1].v);
      }
    }
  }
  return dp[len][c];
}
void test_package() {
  int n = 3;
  struct Item items[] = {{1, 15}, {3, 20}, {4, 30}};
  int c = 4;
  int res = packet(c, items, n);
  printf("最大价值：%d", res);
};

// - 最长公共子序列（递归关系、算法）
// x 序列1 长度为 m
// y 序列2 长度为 n
// c 最优值
// b 方向，用于找到最优解
enum {
  NONE,
  LT,
  LEFT,
  TOP,
};

void longest(char *x, char *y, int m, int n, int **c, int **b) {
  // 初始化
  // 竖直方向的为 m
  for (int i = 0; i <= m; i++) {
    c[i][0] = 0;
  }
  // 水平方向的为 n
  for (int i = 1; i <= n; i++) {
    c[0][n] = 0;
  }
  for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
      // if (i == 1) {
      //   printf("%c %c %d\n", x[i], y[j], x[i] == y[j]);
      // }
      if (x[i] == y[j]) {
        c[i][j] = c[i - 1][j - 1] + 1;
        b[i][j] = LT;
      } else if (c[i - 1][j] >= c[i][j - 1]) {
        c[i][j] = c[i - 1][j];
        b[i][j] = TOP;
      } else {
        c[i][j] = c[i][j - 1];
        b[i][j] = LEFT;
      }
    }
  }
}

void get_lcs(int **b, char *x, int m, int n) {
  if (m == 0 || n == 0) {
    return;
  }
  if (b[m][n] == LT) {
    get_lcs(b, x, m - 1, n - 1);
    printf("%c", x[m]);
  } else if (b[m][n] == LEFT) {
    get_lcs(b, x, m, n - 1);
  } else {
    get_lcs(b, x, m - 1, n);
  }
}

void test_longest() {
  char *x = " BCADB";
  char *y = " ABCBAB";
  int **c = malloc(sizeof(int *) * (5 + 1));
  int **b = malloc(sizeof(int *) * (6 + 1));
  for (int i = 0; i < 7; i++) {
    c[i] = malloc(sizeof(int) * (5 + 1));
    b[i] = malloc(sizeof(int) * (6 + 1));
  }
  longest(x, y, 5, 6, c, b);

  for (int i = 0; i < 6; i++) {
    print_arr(c[i], 7);
  }
  for (int i = 0; i < 6; i++) {
    print_arr(b[i], 7);
  }

  get_lcs(b, x, 5, 6);
};

// - 矩阵连乘（递归关系、算法）
// P: 矩阵的值
// len: 长度
// m：最优值
// s：最优解
void matrix_chain(int *p, int n, int **m, int **s) {
  // 对角线设置为 0
  for (int i = 1; i <= n; i++) {
    m[i][i] = 0;
  }
  // 自底向上计算
  for (int r = 2; r <= n; r++) {           // 子问题规模（链长）
    for (int i = 1; i <= n - r + 1; i++) { // 当前链的起始
      int j = i + r - 1;                   // 当前链的结尾
      // 划分链：A(i) * A[i+1:j]
      // m[i][j] = i处的计算量（i处的形状 × 后面算完的形状） + 后面的计算量
      m[i][j] = p[i - 1] * p[i] * p[j] + m[i + 1][j];

      // 标记A[i][j]的划分位置
      s[i][j] = i;

      // 依次选择中点进行划分
      for (int k = i + 1; k < j; k++) {
        // 将链划分为 A[i:k] + A[k+1:j]
        int t = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
        if (t < m[i][j]) {
          // 更新最优解
          m[i][j] = t;
          // 标记A[i][j]的划分位置
          s[i][j] = k;
        }
      }
    }
  }
}

void trace_back(int i, int j, int **s) {
  if (i == j) {
    printf("A%d", i);
    return;
  }
  printf("(");
  trace_back(i, s[i][j], s);
  trace_back(s[i][j] + 1, j, s);
  printf(")");
}

// void matrix_chain(int *p, int n, int **m, int **s) {
//   for (int i = 1; i <= n; i++) {
//     m[i][i] = 0;
//   }
//   for (int r = 2; r <= n; r++) {
//     for (int i = 1; i <= n - r + 1; i++) {
//       int j = i + r - 1;
//       m[i][j] = p[i] * p[i - 1] * p[j] + m[i + 1][j];
//       s[i][j] = i;
//       for (int k = i + 1; k < j; k++) {
//         int t = m[i][k] + p[i] * p[k - 1] * p[j] + m[k + 1][j];
//         if (t < m[i][j]) {
//           m[i][j] = t;
//           s[i][j] = k;
//         }
//       }
//     }
//   }
// }

// void trace_back(int i, int j, int **s) {
//   if (i == j) {
//     printf("%d", i);
//     return;
//   }
//   printf("(");
//   trace_back(i, s[i][j], s);
//   trace_back(s[i][j] + 1, j, s);
//   printf(")");
// }
const int MAXN = 3;
// a, b 是待乘的两个矩阵
// c 是结果矩阵
void mult(int a[MAXN][MAXN], int b[MAXN][MAXN], int c[MAXN][MAXN], int p, int q,
          int r) {
  int i, j, k;
  //先对c进行初始化
  for (i = 0; i < p; i++) {
    for (j = 0; j < r; j++) {
      c[i][j] = 0;
    }
  }
  //计算矩阵乘法
  //  a 行数
  for (i = 0; i < p; i++) {
    //  a 列数 / b 列数
    for (j = 0; j < r; j++) {
      // b 行数
      for (k = 0; k < q; k++) {
        c[i][j] += a[i][k] * b[k][j];
      }
    }
  }
}

void test_matrix_chain() {
  int n = 6;
  int p[] = {30, 35, 15, 5, 10, 20, 25};
  int N = 7;
  int **s = malloc(sizeof(int) * N);
  int **m = malloc(sizeof(int) * N);
  for (int i = 0; i < N; i++) {
    s[i] = malloc(sizeof(int) * N);
    m[i] = malloc(sizeof(int) * N);
  }
  matrix_chain(p, n, m, s);
  trace_back(1, 6, s);
};

int main() {
  test_inverst();
  // test_package();
  // test_longest();
  // test_matrix_chain();
  return 0;
}
