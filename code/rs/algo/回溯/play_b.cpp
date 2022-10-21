//#include "stdafx.h"

#include <queue>
#include <stdio.h>
#include <string.h>
#include <vector>
using namespace std;
//#define LOCAL
const int inf = ~0u >> 1; // 最大int, 骚写法

int n, m, cnt; // n是野怪点数, m是敌法师需要的金钱,cnt是连通分支的个数
bool map[55][55], vist[55]; // 无向图,map[i][j]=true 表示敌法师可以从野怪点i
                            // blink到 j, vist[i]表示i这个野怪点是否访问过了

struct Node // 优先队列中的节点
{
  int c, w; // 该节点的价值（即金钱）和时间
  Node(int c, int w) : c(c), w(w) {}
  bool operator<(const Node &b) const {
    return w == b.w
               ? c > b.c
               : w < b.w; // 如果金钱相等,则时间长的优先低, 反之金钱高的优先级高
  }
};

priority_queue<Node> pq1,
    pq2; // 两个用于分支限界的队列, 具体过程就是pq1剪枝之后倒到pq2中去,
         // 然后pq2中再次剪枝之后才倒回pq1中去, pq1才是主战场,pq2 是中转站

struct Monster {
  int c, w; // 打这处的野怪需要耗费c的时间, 但是获得w的金钱
} monsters[55]; // 野怪点

vector<Monster> g[55]; // 连通分支

typedef vector<Monster>::iterator mit;

void dfs(int i) {
  vist[i] = true;
  g[cnt].push_back(monsters[i]); // 收集第cnt个连通分支
  for (int j = 1; j <= n; j++) {
    if (!vist[j] && map[i][j]) {
      dfs(j);
    }
  }
}

void divide() {
  for (int i = 1; i <= n; i++) {
    g[i].clear();
  }
  cnt = 0;
  for (int i = 1; i <= n; i++) {
    if (!vist[i]) {
      cnt++;  //连通分支数+1
      dfs(i); // 开始去获取第cnt个连通分支（起始于i号野怪点）
    }
  }
}

int sz() // 使用优先队列式分支限界法求解01背包问题
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
        s.w += j->w;  // 考虑放当前物品
        if (s.w >= m) // 如果当前节点已经满足了要求,则s不需要再进队了（纵使后面金钱可能更多,
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
#ifdef LOCAL
  freopen("d:\\data.in", "r", stdin);
  // freopen("d:\\my.out", "w", stdout);
#endif
  int t;
  scanf("%d", &t);
  for (int i = 1; i <= t; i++) {
    scanf("%d%d", &n, &m); // 野怪点数目, 敌法师需要的金钱
    memset(map, 0, sizeof(map));
    memset(vist, 0, sizeof(vist));
    for (int j = 1, k, x; j <= n; j++) // 读取n个野怪点的数据
    {
      scanf("%d%d%d", &monsters[j].c, &monsters[j].w, &k);
      while (k--) // 读取k个当前野怪点可以blink到的点
      {
        scanf("%d", &x);
        map[j][x] = map[x][j] = true;
      }
    }         // 至此, 一个case的数据全部读取完毕
    divide(); // dfs划分无向图的连通分支（因为敌法师只能在一个连通分支中blink）
    int ans;
    if ((ans = sz()) == inf) {
      printf("Case %d: Poor Magina, you can't save the world all the time!\n",
             i);
    } else {
      printf("Case %d: %d\n", i, ans);
    }
  }
  return 0;
}