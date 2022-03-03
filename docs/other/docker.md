# Docker

## 1 镜像

### 1.1 获取镜像

`docker pull`

没必要， 直接 docker run 就行了

### 1.2 列出镜像

1. 列出所有： `docker image list`

2. 列出所有虚悬镜像： `docker image list -f dangling=true`

   这个镜像既没有仓库名，也没有标签，均为 `<none>`

### 1.3 删除镜像

1. 删除： `docker image rm xxx`

   xxx 可以是 镜像短 ID、镜像长 ID、镜像名、或者镜像摘要

2. 删除所有虚悬镜像： `docker image prune`

3. 删除所有仓库名为redis的镜像：`docker image rm $(docker image ls -q redis)`

## 2 容器

### 2.0 列出容器

`docker container ls -a`

`docker ps -a`

### 2.1 启动容器

新建容器： `docker run -d -it ubuntu:18.04 /bin/bash`

### 2.2 重启容器

`docker container start`

### 2.3 终止容器

`docker container stop `

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

这里会将一个Dockerfile的构建过程

### 格式

1. 指定基础镜像

   定制一个镜像，需要以一个镜像为基础

   ```dockerfile
   FROM alpine:latest
   ```

2. RUN 执行命令
    格式：`RUN <命令>`，就像直接在命令行中输入的命令一样。刚才写的 Dockerfile 中的 `RUN` 指令就是这种格式。

3. ENTRYPOINT 添加prefix
    从外部运行`docker run myip -i`，就相当于`docker run myip curl -s http://myip.ipip.net -i`
    `ENTRYPOINT [ "curl", "-s", "http://myip.ipip.net" ]`

### build
```sh
docker build -t xxx .
```

## 4 实践

### curl自动查询ip
```sh
FROM ubuntu:18.04

RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*

CMD ["curl", "-s", "http://"]

```
### redis镜像
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

## 5 其他

### 正则匹配用法
- 删除容器

    `sudo docker ps -a | awk '{print $1, $2}' | grep "jdk" | xargs -t sudo docker rm`
- 删除镜像
    `sudo docker images | awk '{print $1, $2}' | grep "jdk" | awk '{print $1}' | xargs -t sudo docker rmi`

    awk能够且分为一行，print能选择字段

### 重命名
```
           镜像id   名称  tag(可省略)
docker tag e49db activemp:1.5.5
```

### 推送到dockerhub
1. 登陆
```
docker login -u xxx
Password: 输入token
```

2. 推送
注意：需要修改image名称为 `{username}/{image-name}:{tag}`
```
docker push `{username}/{image-name}:{tag}`
```