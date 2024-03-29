# Docker

## 1 镜像

### 1.1 获取镜像

`docker pull`

没必要，直接 docker run 就行了

### 1.2 列出镜像

1. 列出所有： `docker image list`

2. 列出所有虚悬镜像： `docker image list -f dangling=true`

   这个镜像既没有仓库名，也没有标签，均为 `<none>`

### 1.3 删除镜像

1. 删除： `docker image rm xxx`

   xxx 可以是 镜像短 ID、镜像长 ID、镜像名、或者镜像摘要

2. 删除所有虚悬镜像： `docker image prune`

3. 删除所有仓库名为 redis 的镜像：`docker image rm $(docker image ls -q redis)`

### 1.4 docker-drag

https://github.com/NotGlop/docker-drag

使用方法：

```sh
python docker_pull.py hello-world

python docker_pull.py mysql/mysql-server:8.0

python docker_pull.py mcr.microsoft.com/mssql-tools

python docker_pull.py consul@sha256:6ba4bfe1449ad8ac5a76cb29b6c3ff54489477a23786afb61ae30fb3b1ac0ae9
```

加载镜像：`docker image load -i xxx.tar`

## 2 容器

### 2.0 列出容器

`docker container ls -a`

`docker ps -a`

### 2.1 启动容器

新建容器： `docker run -d -it ubuntu:18.04 /bin/bash`

### 2.2 重启容器

`docker container start`

### 2.3 终止容器

`docker container stop`

`docker container restart`

### 2.4 进入容器

`docker exec -it ubuntu:18.04 /bin/bash`

### 2.5 导入导出

1. 导出：`docker export 7691a814370e > ubuntu.tar`

2. 导入：
   - 从文件：`cat ubuntu.tar | docker import - test/ubuntu:v1.0`
   - 从路径：`docker import http://example.com/exampleimage.tgz example/imagerepo`

### 2.6 删除容器

- 删除已经关闭的一个容器： `docker container rm`

- 删除所有已经关闭的容器：`docker container prune`

## 3 Dockerfile

这里会将一个 Dockerfile 的构建过程

### ENV & ARG

ARG 用于设置环境变量
- **只在 build 期间生效，run 期无效**
- 在构建镜像的时候使用 `--build-arg` 进行传递，会 **覆盖** Dockerfile 中指定的同名参数

> 灵活使用 ARG 指令，可以在不修改 Dockerfile 的情况下，构建不同镜像。我们可以在构建镜像的时候，给参数传递不同的值，构建出不同的镜像

ENV 指令和 ARG 指令特别相似
- ARG 在 build 的时候生效，ENV 在 run 的时候生效，都可以直接使用这里定义的环境变量。
- `docker run --env` 可以修改这些值

### ADD & COPY

COPY

- 支持通配符
- 可以改变用户和组

```dockerfile
COPY package.json /usr/src/app/
COPY hom* /mydir/
COPY hom?.txt /mydir/
COPY --chown=55:mygroup files* /mydir/
```


- 如果 src 是 URL，并且 dest 不以斜杠结尾，则从 URL 下载文件并将其复制到 dest。
- 如果 dest 以斜杠结尾，将自动推断出 url 的名字（保留最后一部分），保存到 dest
- 如果 src 是目录，则将复制目录的整个内容，包括文件系统元数据。


ADD

- 源路经是 URL 会尝试下载
- 源路径是压缩文件 (gzip, bzip2 以及 xz), 会自动解压

### EXPOSE

指定容器向外部暴露的端口，但并不会自动映射到宿主机，使用`-P`后会将这些端口随机映射到宿主机

```dockerfile
EXPOSE 8080
EXPOSE 7000-8000
```

### RUN

```dockerfile
RUN cd /app
RUN echo "hello" > world.txt
```

上面的两个`RUN`并不是在同一个环境下运行的，他们不是一个容器，他们的工作目录当然也不一样

可以通过`WORKDIR`去同步不同命令的工作目录

```dockerfile
WORKDIR /app
RUN echo "hello" > world.txt
```

多个`WORKDIR`之间是有联系的

```dockerfile
WORKDIR /a
WORKDIR b
WORKDIR c

RUN pwd
# /a/b/c
```

### ENTRYPOINT

ENTRYPOINT 配置容器启动时的执行命令

- 不会被忽略，**一定会被执行**，即使运行 docker run 时指定了其他命令

### VOLUME

挂载主机目录 / 挂载数据卷

```dockerfile
VOLUME: HostPath:ContainerPath
```

挂载匿名卷，匿名卷中的数据不会持久化

```dockerfile
VOLUME /data
```

命令行挂载

```
--mount type=bind,source=/src/webapp,target=/usr/share/nginx/html,readonly \
```

| key                    | value                  |
| ---------------------- | ---------------------- |
| type                   | bind, volume, or tmpfs |
| source/src             | Docker Host 上的一个目录或者文件  |
| destination/dst/target | 被挂载容器上的一个目录或者文件        |
| readonly               | 挂载为只读                  |


### 格式

1. 指定基础镜像

   定制一个镜像，需要以一个镜像为基础

   ```dockerfile
   FROM alpine:latest
   ```

2. RUN 执行命令 格式：`RUN <命令>`，就像直接在命令行中输入的命令一样。刚才写的 Dockerfile 中的 `RUN` 指令就是这种格式。

3. ENTRYPOINT 添加 prefix

   `ENTRYPOINT [ "curl", "-s", "http://myip.ipip.net" ]`

   从外部运行`docker run myip -i`，就相当于`docker run myip curl -s http://myip.ipip.net -i`

### build

```sh
docker build -t xxx .
```

### 例子

#### curl 自动查询 ip

```sh
FROM ubuntu:18.04

RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*

CMD ["curl", "-s", "http://"]
```

#### redis + redis-json + redis-search

```sh
FROM alpine:latest

COPY ./cargo-config /cargo-config

RUN mkdir -p ~/.cargo && mv /cargo-config ~/.cargo/config \
\
        && sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
        && apk add --no-cache \
        redis \
        openssh \
        sudo \
        libgcc \
\
        clang-libs \
        git \
        bash \
        python3 \
        py3-setuptools \
        py3-pip \
        unzip \
        wget \
        alpine-sdk \
        cmake \
        cargo \
\
        && mkdir -p /opt/build /opt/redis-modules \
\
        && cd /opt/build \
        && git clone https://github.com/RedisJSON/RedisJSON \
        && cd RedisJSON \
        && git submodule update --init --recursive \
        && cd .. \
        && git clone https://github.com/RediSearch/RediSearch \
\
        && cd /opt/build/RedisJSON \
        && make build shell=/bin/bash \
        && cp target/release/librejson.so /opt/redis-modules \
\
        && cd /opt/build/RediSearch \
        && cmake . -DCMAKE_INSTALL_PREFIX="/opt/redis-modules" -Bbuild \
        && cmake --build build \
        && cp build/redisearch.so /opt/redis-modules \
\
        && rm -rf /opt/build \
        && rm -rf ~/.cargo \
        && strip /opt/redis-modules/*.so \
        && apk del --purge alpine-sdk cmake cargo python3 py3-setuptools py3-pip unzip wget bash git clang-libs \
        && adduser -D -s /bin/ash admin

USER admin
VOLUME ["/home/admin"]
WORKDIR /home/admin
EXPOSE 6379
CMD ["redis-server", "--loadmodule", "/opt/redis-modules/librejson.so", "--loadmodule", "/opt/redis-modules/redisearch.so"]
```

## 4 自动化

### pass 凭证管理

- pass
- docker-credential-pass

![Docker Login 登录凭证安全存储](https://blog.csdn.net/Rambo_Yang/article/details/108294632)

### 坑

gpg2 一定不要使用 sudo 执行，docker 也要加到 group 里

- 注意`docker login`登陆的 url 是什么，这个 url 需要时 jib 白名单里有的

  `docker login`默认登陆的 url 是`index.docker.io/v1`

  如果 jib 无法识别，可以尝试使用 `docker login registry.hub.docker.com`

  现在有的凭证可以通过`docker-credential-pass list`查看
  ```
  »»»» docker-credential-pass list
  {"https://index.docker.io/v1/":"trdthg","registry.hub.docker.com":"trdthg"}
  ```
- jib 自动 push 需要从白名单 url 中一个个尝试，`docker login`

### jib

![Jib](https://github.com/GoogleContainerTools/jib)

登陆成功会有下面的提示

```
[INFO] Using credentials from Docker config (/home/trdthg/.docker/config.json) for adoptopenjdk/openjdk8
```

## 5 docker-compose

### 限制资源

```yml
redis:
  image: redis:alpine
  container_name: redis
  deploy:
    resources:
      limits:
        cpus: '0.50'
        memory: 50M
```

`--compatibility`: 以兼容模式运行，将 v3 的语法转化为 v2 的语法，而不需要将 compose 文件改为 v2 的版本

```shell
docker-compose --compatibility up -d
```

### 完整配置参考

```yml
version: "3"  # 指定 docker-compose 语法版本
services:    # 从以下定义服务配置列表
  server_name:   # 可将 server_name 替换为自定义的名字，如 mysql/php 都可以
    container_name: container_name  # 指定实例化后的容器名，可将 container_name 替换为自定义名
    image: xxx:latest # 指定使用的镜像名及标签
    build:  # 如果没有现成的镜像，需要自己构建使用这个选项
      context: /xxx/xxx/Dockerfile  # 指定构建镜像文件的路径
      dockerfile: ....     # 指定 Dockerfile 文件名，上一条指定，这一条就不要了
    ports:
      - "00:00"  # 容器内的映射端口，本地端口：容器内端口
      - "00:00"  # 可指定多个
    volumes:
      - test1:/xx/xx  # 这里使用 managed volume 的方法，将容器内的目录映射到物理机，方便管理
      - test2:/xx/xx  # 前者是 volumes 目录下的名字，后者是容器内目录
      - test3:/xx/xx  # 在文件的最后还要使用 volumes 指定这几个 tests
    volumes_from:  # 指定卷容器
       - volume_container_name  # 卷容器名
    restarts: always  # 设置无论遇到什么错，重启容器
    depends_on:       # 用来解决依赖关系，如这个服务的启动，必须在哪个服务启动之后
      - server_name   # 这个是名字其他服务在这个文件中的 server_name
      - server_name1  # 按照先后顺序启动
    links:  # 与 depend_on 相对应，上面控制容器启动，这个控制容器连接
      - mysql  # 值可以是 - 服务名，比较复杂，可以在该服务中使用 links 中 mysql 代替这个 mysql 的 ip
    networks: # 加入指定的网络，与之前的添加网卡名类似
      - my_net  # bridge 类型的网卡名
      - myapp_net # 如果没有网卡会被创建，建议使用时先创建号，在指定
    environment: # 定义变量，类似 dockerfile 中的 ENV
      - TZ=Asia/Shanghai  # 这里设置容器的时区为亚洲上海，也就解决了容器通过 compose 编排启动的 时区问题！！！！解决了容器的时区问题！！！
      变量值：变量名   # 这些变量将会被直接写到镜像中的/etc/profile
    command: [                        #使用 command 可以覆盖容器启动后默认执行的命令
            '--character-set-server=utf8mb4',            #设置数据库表的数据集
            '--collation-server=utf8mb4_unicode_ci',    #设置数据库表的数据集
            '--default-time-zone=+8:00'                    #设置 mysql 数据库的 时区问题！！！！而不是设置容器的时区问题！！！！
    ]
  server_name2:  # 开始第二个容器
    server_name:
      stdin_open: true # 类似于 docker run -d
      tty: true  # 类似于 docker run -t
volumes:   # 以上每个服务中挂载映射的目录都在这里写入一次，也叫作声明 volume
  test1:
  test2:
  test3:
networks:  # 如果要指定 ip 网段，还是创建好在使用即可，声明 networks
  my_net:
    driver: bridge  # 指定网卡类型
  myapp_net:
    driver: bridge
```

### spring-boot + mysql

#### doocker-compose.yml

网络：

- 如果不特殊指明，所有的 service 都会自动加入 default 网络里
- host 会被 service 的名称代替 `tguio.club => mysql`
- 端口号会被容器暴露的端口代替 `4205 => 3306`

- 容器之间可以通过自己暴露的端口互相访问
- 宿主机还是需要通过绑定到宿主机上的端口访问

```yml
services:
  web:
    build: .
    ports:
      - "8848:8848"
    depends_on:
      - mysql
      - redis
  mysql:
    image: mysql:latest
    environment:
      MYSQL_DATABASE: dev
      MYSQL_USER: admin
      MYSQL_PASSWORD: admin
      MYSQL_ROOT_PASSWORD: 2022A22db
    ports:
      - "4205:3306"
    restart: always

  redis:
    image: "redis:alpine"
    ports:
      - "5470:6379"
```

```yml
server:
  port: 8848
spring:
  datasource:
#    url: jdbc:mysql://tguio.club:4205/dev?serverTimezone=UTC&useSSL=false&autoReconnect=true&tinyInt1isBit=false&useUnicode=true&characterEncoding=utf8&allowPublicKeyRetrieval=true
    url: jdbc:mysql://mysql:3306/dev?serverTimezone=UTC&useSSL=false&autoReconnect=true&tinyInt1isBit=false&useUnicode=true&characterEncoding=utf8&allowPublicKeyRetrieval=true
    username: admin
    password: admin
  jpa:
    properties:
      hibernate:
        format_sql: true
#        show_sql: true
        hbm2ddl:
          auto: update
  redis:
#    host: tguio.club
    host: redis
    port: 5470
    pool:
      max-active: 8
      max-wait: -1
      max-idle: 4
      min-idle: 1
#    timeout: 5
```

## 5 其他

### 端口映射

- 一对一指定：`-p <宿主端口>:<容器端口>`
- 一对一随机：
  - `-P 80` 把容器的 80 端口随机映射宿主机上
- 多对多指定：
  - `-p 1000-2000:1000-2000` 容器的 1000-2000 的所有端口，映射到宿主机端口 1000-2000
- 多对多随机：
  - `docker run --expose=1000-2000` 容器的 1000-2000 的所有端口，随机映射到宿主机
  - `docker run -P` 把容器暴露的所有端口都随机映射宿主机上

### 正则匹配用法

- 删除容器

  `sudo docker ps -a | awk '{print $1, $2}' | grep "jdk" | xargs -t sudo docker rm`
- 删除镜像
  `sudo docker images | awk '{print $1, $2}' | grep "jdk" | awk '{print $1}' | xargs -t sudo docker rmi`

  awk 能够且分为一行，print 能选择字段

### 重命名

```
           镜像 id   名称  tag(可省略)
docker tag e49db activemp:1.5.5
```

### 添加`sudo`权限

```shell
# 如果 docker 组不存在，则添加之：
sudo groupadd docker

# 将当前用户添加到 docker 组
sudo gpasswd -a trdthg docker

# 添加访问和执行权限
sudo chmod a+rw /var/run/docker.sock
```

### 推送到 dockerhub

1. 登陆

```
docker login -u xxx
Password: 输入 token
```

2. 推送 注意：需要修改 image 名称为 `{username}/{image-name}:{tag}`

```
docker push `{username}/{image-name}:{tag}`
```
