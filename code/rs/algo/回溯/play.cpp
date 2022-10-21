#include <queue>
#include <stdio.h>
#include <string.h>
#include <vector>

using namespace std;

// 无穷大
const int inf = ~0u >> 1;

// 可以 blink 的点
bool map[55][55], vist[55];

// 野怪点
struct Monster {
  int c;        // 耗费c的时间,
  int w;        // 获得w的金钱
} monsters[55]; // 野怪点

// 获取连通分支
vector<Monster> g[55];

int cnt;
void dfs(int i // 第 i 个初始野怪点
         ,
         int n // 总野怪点
) {
  vist[i] = true;
  g[cnt].push_back(monsters[i]);
  for (int j = 0; j <= n; j++) {
    if (!vist[i] && map[i][j]) {
      dfs(j, n);
    }
  }
}

void divide(int n // 野怪点数目
) {
  // 初始化
  for (int i = 1; i <= n; i++) {
    g[i].clear();
  }
  cnt = 0;
  // 找连通分支
  for (int i = 1; i <= n; i++) {
    if (!vist[i]) {
      cnt++;
      dfs(i, n);
    }
  }
}

struct Node {
  int c;
  int w;
  // 构造函数
  Node(int c, int w) : c(c), w(w) {}
  // w相同区c小，否则去 w小
  bool operator<(const Node &b) const { return w == b.w ? c > b.c : w < b.w; }
};

// 两个优先队列
priority_queue<Node> pq1, pq2;
typedef vector<Monster>::iterator mit;

int sz(int m) // 使用优先队列式分支限界法求解01背包问题
{
  int ret = inf;
  for (int i = 1; i <= cnt; i++) // 只需要在各个连通分支上取最小即可
  {
    while (!pq1.empty())
      pq1.pop();
    while (!pq2.empty())
      pq2.pop(); // 开始考察第i个连通分支g[i], 首先清空pq1、pq2这两个优先队列
    Node s(0, 0); // 不放任何物品, 金钱为0
    pq1.push(s);
    for (mit j = g[i].begin(); j != g[i].end();
         j++) // 考虑逐个加入g[i]这个连通分支中的物品
    {
      while (!pq1.empty()) {
        Node s = pq1.top();
        pq1.pop();   // 队首出堆
        pq2.push(s); // 不放置当前物品,则金钱和耗费都不会增加
        s.c += j->c;
        s.w += j->w; // 考虑放当前物品
        if (s.w >=
            m) // 如果当前节点已经满足了要求,则s不需要再进队了（纵使后面金钱可能更多,
               // 但不需要）,剪枝了,剪枝点1
        {
          if (s.c < ret) // 更新ret
          {
            ret = s.c;
          }
          continue;
        }
        if (s.c >=
            ret) // 如果节点的耗费大于当前最优, 但是因为pq是按照金钱出堆的,
                 // 所以当前节点的金钱一定少于之前某个节点,
                 // 则s就不需要开拓了，剪枝了,剪枝点2
        {
          continue;
        }
        pq2.push(s);
      }
      int tmp = inf; // pq2中的节点（都是pq1中的节点开辟出来的）别急着倒回pq1,
                     // 还要进行剪枝呢! 这里剪枝的手段是让pq2中的节点互相厮杀
      while (!pq2.empty()) {
        Node s = pq2.top();
        pq2.pop();
        if (s.c < tmp) {
          tmp = s.c;
          pq1.push(s);
        } // 对于 s.c>=tmp的, 也不需要继续开拓了, 理由同剪枝点2,
          // 这里发生了剪枝——剪枝点3
      }
    }
  }
  return ret;
}
int main() {
  int t;
  scanf("%d", &t);
  for (int i = 1; i <= t; i++) {
    int n; // n 野怪点数量
    int m; // 金钱所需数目
    scanf("%d %d", &n, &m);
    // 初始化 map
    memset(map, 0, sizeof(map));
    // 初始化和 vist
    memset(vist, 0, sizeof(vist));

    // 读取数据
    for (int j = 1, k, x; j <= n; j++) {
      // 使用数组保存野怪点信息
      scanf("%d %d %d", &monsters[j].c, &monsters[j].w, &k);
      while (k--) {
        // 读取blink的位置
        int x;
        scanf("%d", &x);
        map[j][k] = map[k][j] = true;
      }
    } // 至此，一个状态读取完成

    // 找连通分支
    divide(n);

    int ans = sz(m);
    if (ans == inf) {
      printf("Case %d: Poor Magina, you can't save the world all the time!\n",
             i);
    } else {
      printf("Case %d: %d\n", i, ans);
    }
  }
  return 0;
}
