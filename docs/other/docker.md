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
ADD
- 源路经是URL会尝试下载
- 源路径是压缩文件(gzip, bzip2 以及 xz), 会自动解压

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

### VOLUME
挂载主机目录 / 挂载数据卷
```dockerfile
VOLUME: HostPath:ContainerPath
```
挂载匿名卷, 匿名卷中的数据不会持久化
```dockerfile
VOLUME /data
```

命令行挂载
```
--mount type=bind,source=/src/webapp,target=/usr/share/nginx/html,readonly \
```
|key| value |
|---|-------------------------|
|type|	bind, volume, or tmpfs|
|source/src	|Docker Host上的一个目录或者文件|
|destination/dst/target	|被挂载容器上的一个目录或者文件|
|readonly|	挂载为只读|

### 格式

1. 指定基础镜像

   定制一个镜像，需要以一个镜像为基础

   ```dockerfile
   FROM alpine:latest
   ```

2. RUN 执行命令
    格式：`RUN <命令>`，就像直接在命令行中输入的命令一样。刚才写的 Dockerfile 中的 `RUN` 指令就是这种格式。

3. ENTRYPOINT 添加prefix

    `ENTRYPOINT [ "curl", "-s", "http://myip.ipip.net" ]`

    从外部运行`docker run myip -i`，就相当于`docker run myip curl -s http://myip.ipip.net -i`


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

### 端口映射

- 一对一指定: ` -p <宿主端口>:<容器端口>`
- 一对一随机:
    - `-P 80` 把容器的80端口随机映射宿主机上
- 多对多指定:
    - `-p 1000-2000:1000-2000` 容器的1000-2000的所有端口，映射到宿主机端口1000-2000
- 多对多随机:
    - `docker run --expose=1000-2000` 容器的1000-2000的所有端口，随机映射到宿主机
    - `docker run -P` 把容器暴露的所有端口都随机映射宿主机上

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