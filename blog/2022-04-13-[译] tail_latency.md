# 对重请求 - 应对尾部延迟

[Hedged requests — Tackling tail latency](https://medium.com/swlh/hedged-requests-tackling-tail-latency-9cea0a05f577)

通常出现在出现在分布式系统中，实现分布式系统有很多优缺点

使用分布式系统的常见原因：

- 可用性
- 可扩展性
- 分区容错
- 独立部署
- 为不同目的使用不同的技术

这些可能是分布式系统的问题：

- 成本
- 复杂
- 一致性
- **延迟**

我们将重点关注延迟，更具体地说是尾部延迟。

## 延迟

当我们使用分布式系统时，延迟会不可避免的增加。分布式系统中的每一跳都不是免费的，除了网络延迟还有其他成本，如果使用 HTTP
通信，我们还要处理消息、解析消息、验证身份令牌、以及我们想要添加到管道中的任何数据。这些是在设计分布式系统时需要考虑的问题。我们必须考虑是否有必要分发新的系统。

要回答这个问题，我们需要了解如何测量延迟。最简单的答案之一是使用百分比。

## 百分比

首先是定义我们的观察组。对于延迟，最常见的观察组是给定请求类别的响应时间。计算的方式如下：

1. 获取请求的所有响应时间并排序。
2. 取前 x% 的元素。
3. 获取集合的最大（最长）值。

以请求 `/hello-world` 接口为例

1. 获取请求的所有响应时间并排序。
   - 获取响应时间：23, 20, 21, 20, 23, 20, 45, 21, 25, 25
   - 排序：20, 20, 20, 21, 21, 23, 23, 25, 25, 45
2. 取前 50% 元素： 20, 20, 20, 21, 21
3. 得到最大值：21

所以 P50 就是 21 ms，如果取前 90 % 元素，P90 就是 25 ms

## 尾部延迟

尾部延迟是百分位谱最末端的延迟。一般系统对 99% 的请求的响应都很快，但是对于剩下的 1% 可能非常差。
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204202210071.png)
对于一个每分钟接受数百万请求的系统来说，这 1% 就不是微不足道了

2013 年 Google 发表的论文介绍了一些解决方法

- Hedged requests
- Tied requests
- Micro partitions
- Selective replication
- Latency-induced probation
- Good enough responses
- Canary requests

P99 = 140ms P95 = 70ms

剩下的 5% 请求占了总请求一半的延迟

## 对冲请求

如果请求的时长超过 P95 还没有结果，那么就重发

## 模拟尾部延迟

下面的代码模拟了有 %4 的请求会等待 100ms

```go
package main

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/ishealthy", func(w http.ResponseWriter, r *http.Request) {
		rd := rand.New(rand.NewSource(time.Now().UnixNano()))
		requestPercentile := rd.Intn(100)
		waitTime := 0

		if requestPercentile > 96 {
			waitTime = 100
		}

		time.Sleep(time.Duration(waitTime+15) * time.Millisecond)
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Healthy"))
	}).Methods(http.MethodGet)
	http.ListenAndServe(":8080", router)
}
```

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204202241384.png)
从图中可以看到

- p50 小于 20ms
- p95 20ms 左右
- p99 超过 115ms

## 对重测试

新增两个接口

- `/falout`：对于每个请求都转发出 3 个副本。应该能到达 P99 性能。但会发出 3 倍以上的请求。
- `/hedged`：在第一个未达到预期 P95 (21ms) 之后触发对冲请求。应该在 40 毫秒左右将尾部性能提高到 P99。最多只能多发出 5%
  的请求。

**falout**

```go
func queryFanOut(urls []string) string {
	ch := make(chan string, len(urls))
	for _, url := range urls {
		go func(u string) {
			ch <- executeQuery(u)
		}(url)
	}
	return <-ch
}
```

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204202248476.png)

**hedged**

```go
func queryWithHedgedRequests(urls []string) string {
	ch := make(chan string, len(urls))
	for _, url := range urls {
		go func(u string, c chan string) {
			c <- executeQuery(u)
		}(url, ch)

		select {
		case r := <-ch:
			return r
		case <-time.After(21 * time.Millisecond):
		}
	}

	return <-ch
}
```

![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202204202248260.png)

## 结论

仅用几行代码，我们就可以大幅改善尾部延迟。在将其用作生产系统之前，该示例还有很多需要改进的地方，但核心实现与此没有太大区别。
该技术针对一个非常具体的问题，在用于实际生产应用之前应进行彻底分析。
