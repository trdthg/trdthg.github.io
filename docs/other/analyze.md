# 性能优化分析工具

## 全连路追踪

### 使用skywalking监测java

这里使用探针实现信息收集，使用默认的H2存储

#### springboot配置
```yml
server:
  port: 8848
spring:
  datasource:
    url: jdbc:mysql://mysql:3306/dev?serverTimezone=UTC&useSSL=false&autoReconnect=true&tinyInt1isBit=false&useUnicode=true&characterEncoding=utf8&allowPublicKeyRetrieval=true
    username: admin
    password: admin
  jpa:
    properties:
      hibernate:
        format_sql: true
        hbm2ddl:
          auto: update
  redis:
    host: redis
    port: 6379
    pool:
      max-active: 8
      max-wait: -1
      max-idle: 4
      min-idle: 1
```

#### Dockerfile配置

1. `ADD /target/decsion-engine-0.1.5.jar app.jar`

    - 拷贝项目打包好的jar包

2. `ADD ./agent agent`

    - 注意: agent需要和jar包放一起，不仅仅是skywalking-agent.jar，
    - config下是skywalking的默认配置文件，其中的参数可以被java传递的参数覆盖
    - log下存储了日志，一般监测信息没有可以尝试查看该文件夹
    - plugin下存储了对不同进程的信息采集工具，必须依赖他们才能正常监测

3. `java xxx`

    - xxx指服务的名字，随意
    - backend_service指的是skywalking的链接
        - 可以是docker-compose定义的(oap:port1)
        - 也可以是宿主机的ip端口(192.168.xxx:port2)

4. 完整
```yml
FROM adoptopenjdk/openjdk8
VOLUME ["/tmp", "/logs"]
EXPOSE 8848
ADD /target/decsion-engine-0.1.5.jar app.jar
ADD ./agent agent
# ADD ./skywalking-agent.jar skywalking-agent.jar # 这个不对

CMD java -javaagent:agent/skywalking-agent.jar -Dskywalking.agent.service_name=xxx -Dskywalking.collector.backend_service=192.168.31.226:11800 -jar app.jar

# 下面的一样，不影响，如果没成功，一定是别的地方写错了😅
# ENTRYPOINT ["java", "-javaagent:agent/skywalking-agent.jar", "-Dskywalking.agent.service_name=xxx", "-Dskywalking.collector.backend_service=192.168.31.226:11800", "-jar", "app.jar"]
```

#### docker-compose.yml
需要注意的点

- 服务的先后顺序
    - 通过设置restart不断重试，直到依赖的服务启动完成
- ip(host), 端口号(port)
    - 容器之间通过可以直接用`${container_name}:${container_port}`互相访问: `mysql:3306`
    - 也可以直接用`${host_ip}:${host_port}`互相访问: `192.168.31.226:4205`

```yml
services:
  web:
#    image: "trdthg/decision-engine:latest"
    build: .
    ports:
      - "8848:8848"
    depends_on:
      - mysql
      - redis
      - oap
      - skywaling-ui
    restart: always
  mysql:
    image: mysql:latest
    environment:
      MYSQL_DATABASE: dev
      MYSQL_USER: admin
      MYSQL_PASSWORD: admin
      MYSQL_ROOT_PASSWORD: 2022A22db
    ports:
      - "4205:3306"
    logging:
      driver: "none"
    restart: always

  redis:
    image: "redis:alpine"
    ports:
      - "5470:6379"
    logging:
      driver: "none"
  oap:
    image: apache/skywalking-oap-server:8.4.0-es6
    container_name: oap
    restart: always
    ports:
      - 11800:11800 # agent 上报数据的端口，这是 gRPC 端口
      - 12800:12800 # ui 读取数据的端口， 这是 http 端口
    # logging:
    #   driver: "none"
  skywaling-ui:
    image: apache/skywalking-ui:8.4.0
    container_name: ui
    depends_on:
      - oap
    links:
      - oap
    ports:
      - 8088:8080
    environment:
      - SW_OAP_ADDRESS=http://oap:12800
    logging:
      driver: "none"
```


## 火焰图

### 火焰图简明教程

#### arthas
arthas 是 Alibaba 开源的 Java 诊断工具，其中整合了很多实用的工具，例如查看当前JVM的线程堆栈信息、查看和修改JVM的系统属性、方法执行数据观测、生成火焰图等。最大的优点是对监控应用无代码侵入，也不需要重启监控应用或者添加启动参数就可以随意attach到目标JVM进程然后进行各种操作。
此处重点提到的是arthas中的profiler功能，实际上是对async-profiler的封装，可以对JVM应用进行采样后输出各种类型的火焰图。

#### 基本使用

##### 1. 安装启动

启动profiler采样后，需要选择对应的进程
```shell
wget https://alibaba.github.io/arthas/arthas-boot.jar
java -jar arthas-boot.jar
```

##### 2. 开始采集

###### 2.1 基于CPU使用率采样(适用于CPU密集型)

async-profiler支持对多种事件做采样分析，例如cpu、alloc、lock、cache-misses等，常用的采样事件为cpu和wall。其中火焰图采样未指定事件时默认对cpu事件进行采样，即On-CPU火焰图，仅包含JVM在CPU执行时的采样，而不包含CPU等待时的采样。

```hell
$ profiler start
Started [cpu] profiling
```

###### 2.2 基于样本采样,可估算耗时(适用于IO密集型)

如果需要分析IO密集型应用，比较适合对wall事件进行采样，如下官方描述，wall事件会对所有任意状态的线程进行采样，既包含CPU执行时的采样，也包含了CPU等待时的采样，可以用来更显著地分析线程在各个方法上的耗时分布。
```shell
$ profiler start -e wall
Started [wall] profiling
```

##### 3. 查看状态

获取已采集的sample的数量

```shell
$ profiler getSamples
```

查看profiler状态

```shell
$ profiler status
[cpu] profiling is running for 4 seconds
```

##### 4. 生成结果
生成svg格式结果
```shell
$ profiler stop --file xxx.svg --format svg
profiler output file: /tmp/demo/arthas-output/20191125-135546.svg
OK
```

##### 5. demo
```java
@RestController
@RequestMapping
public class IndexController {@GetMapping("/")
    public String index() throws InterruptedException {
        long start = System.currentTimeMillis();
        cpuHandler();
        long time1 = System.currentTimeMillis();
        timeHandler();
        long time2 = System.currentTimeMillis();
        normalHandler();
        long time3 = System.currentTimeMillis();

        return String.format("%d %d %d", time1 - start, time2 - time1, time3 - time2);
    }

    private int cpuHandler() {
        int value = 0;
        int max = (int)(Math.random() * 100_000_000);
        for (int i = 0; i < max; i++) {
            value += i;
        }
        return value;
    }

    private void timeHandler() throws InterruptedException {
        Thread.sleep(10);
    }

    private void normalHandler() {
        Random random = new Random();
        random.nextInt(100);
    }

}
```

- cpu事件采样

    由图可以明细的看出来，index方法中cpuHandler事件采样占比最高，即On-CPU中cpuHandler方法占用的CPU最高。如果因为应用占用CPU消耗高，需要进行优化，那么通过该火焰图很容易分析出来需要对cpuHandler方法优化来降低CPU消耗。

- wall事件采样

    由图可以明细的看出来，index方法中timeHandler事件采样占比最高，即timeHandler方法占用线程耗时时间最高。如果因为index方法耗时较长，需要进行优化，那么通过该火焰图很容易分析出来需要对timeHandler方法优化来降低线程耗时时间

直接观察"平顶"（plateaus）往往不能快速定位性能问题，因为顶部记录的多半是对底层库函数的调用情况。我认为，要快速定位性能问题，首先应该观察的是业务函数在火焰图中的宽度，然后在往顶部找到第一个库函数来缩小范围，而不是直接就看平顶。
