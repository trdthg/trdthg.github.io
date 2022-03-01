# OCI规范

## 运行时规范

### 容器格式
一个标准的container bundle包含加载和运行容器所需的所有信息,包括
1. `config.json`: 包含配置数据


2. `rootfs`: 容器的根文件系统

    `config.json`中的`route.path`字段指定,默认为`rootfs`

### 运行时和生命周期

#### 状态
包含以下属性
- ociVersion(string, REQUIRED): 遵守的OCI运行时规范规范的版本。
- id(string, REQUIRED): 是容器的ID. 这在此主机上的所有容器中必须是唯一的. 不要求它在主机之间是唯一的。
- status(string, REQUIRED): 是容器的运行时状态。该值可以是以下之一：
    - creating：正在创建容器（生命周期中的第 2 步）
    - created: 运行时已经完成创建操作（生命周期第2步之后）,容器进程既没有退出也没有执行用户指定的程序
    - running: 容器进程已经执行了用户指定的程序但还没有退出（在生命周期的第 8 步之后）
    - stopped：容器进程已退出（生命周期中的第 10 步）
    附加值可以由运行时定义,但是,它们必须用于表示上面未定义的新运行时状态。

- pid(int, REQUIRED when status is created or running on Linux, OPTIONAL 在其他平台) 是容器进程的ID。对于在运行时命名空间中执行的钩子,它是运行时看到的 pid。对于在容器命名空间中执行的钩子,它是容器看到的 pid。

- bundle(string, REQUIRED) 是容器包目录的绝对路径。这是为了可以在主机上找到容器的配置和根文件系统。

- annotations(map, OPTIONAL) 包含与容器关联的注释列表。如果未提供注释,则此属性可能不存在或为空映射。

在json序列化中必须表现为
```json
{
    "ociVersion"："0.2.0",
    "id"："oci-container1",
    "status"："running",
    "pid"：4422,
    "bundle"："/containers/redis",
    "annotations": {
        "我的钥匙"："我的价值"
    }
}
```

#### 生命周期

1. **调用create**,指定ID和bundle路径
2. 运行时必须根据`config.json`创建容器的运行环境.
    - 如果创建失败必须抛出错误.
    - 当`config.json`中规定的资源正在被创建时,用户定义的行为一定不能被执行.
    - 之后对`config.json`的更新不会影响到容器.
3. 调用`prestart hooks`.(已经弃用,被457代替)
4. 调用`createRuntime hooks`
5. 调用`createContainer hooks`
6. **调用start**, 指定容器ID
7. 调用`startContainer hooks`
8. 运行时运行用户指定的进程
9. 调用`postStart hooks`(warning if failed)
10. 容器进程退出。这可能是由于出错、退出、崩溃或运行时的kill操作被调用而发生.
11. **调用delete**
12. 通过撤销在步骤2中的操作来销毁容器
13. 调用`postStop hooks`(warning if failed)

上述钩子除了9、13外,如果调用失败,运行时必须抛出错误, 停止容器,执行第12步

#### 对于linux系统的特殊配置
**文件描述符**
默认情况下,运行时只会将`stdin, stdout and stderr`的文件描述符设置为开启状态

运行时可以传递额外的描述符去支持socket等功能

一些描述符可能会被重定向到`/dev/null`
**Dev symbolic links**
在生命周期的第二步中,当mount过程结束如果下面的文件存在,就要创建对应的`symlinks`
```
Source	Destination
/proc/self/fd	/dev/fd
/proc/self/fd/0	/dev/stdin
/proc/self/fd/1	/dev/stdout
/proc/self/fd/2	/dev/stderr
```

### 配置文件

#### OCI版本
```json
"ociVersion": "0.1.0"
```

#### ROOT
```json
"root": {
    "path": "rootfs",
    "readonly": true
}
```

#### Mounts
指定了root之外的其他挂载点

- type: linux专有,文件系统类型,比如ext4等
- options: 可选,man page中mount部分规定

```json
"mounts": [
    {
        "destination": "/tmp",
        "type": "tmpfs",
        "source": "tmpfs",
        "options": ["nosuid","strictatime","mode=755","size=65536k"]
    },
    {
        "destination": "/data",
        "type": "none",
        "source": "/volumes/testing",
        "options": ["rbind","rw"]
    }
]
```
#### Process
指定容器运行的进程的参数

**通用**
- terminal (bool, OPTIONAL): 是否为进程分配一个为终端
- consoleSize (object, OPTIONAL): 终端的大小
    - height (uint, REQUIRED)
    - width (uint, REQUIRED)
- cwd (string, REQUIRED): 进程运行所在的根目录
- env (array of strings, OPTIONAL): 环境变量
- args (array of strings, OPTIONAL): 进程运行需要的参数

**POSIX**
- rlimits (array of objects, OPTIONAL) : 可以为进程设置资源限制, 有效值在man page getrlimit(2)
    - type(string, REQUIRED) linux或solaris
    - soft(uint64, REQUIRED) 对相应资源实施的限制值。rlim.rlim_cur必须匹配配置的值。
    - hard(uint64, REQUIRED) 可以由非特权进程设置的软限制的上限。rlim.rlim_max必须匹配配置的值。只有特权进程（例如有CAP_SYS_RESOURCE能力的进程）才能提高硬限制。
- user
    - uid(int, REQUIRED) 指定容器命名空间中的用户 ID 。
    - gid(int, REQUIRED) 指定容器命名空间中的组 ID 。
    - umask(int, OPTIONAL) 指定用户的 umask
    - additionalGids（整数数组,可选）指定要添加到进程的容器命名空间中的其他组 ID。

**Linux**
- apparmorProfile（字符串,可选）不知
- capabilities(object, OPTIONAL) 是一个包含数组的对象,制定了一个进程拥有的能力
    - effective（字符串数组,可选）该effective字段是为流程保留的有效功能数组。
    - bounding（字符串数组,可选）该bounding字段是为进程保留的边界能力数组。
    - inheritable（字符串数组,可选）该inheritable字段是为进程保留的可继承功能数组。
    - permitted（字符串数组,可选）该permitted字段是为进程保留的允许功能的数组。
    - ambient（字符串数组,可选）该ambient字段是为进程保留的环境功能数组。
- noNewPrivileges(bool, OPTIONAL) 设置noNewPrivileges为 true 可以防止进程获得额外的权限。
- oomScoreAdj (int, OPTIONAL) 不知
- selinuxLabel(string, OPTIONAL) 不知

```json
"process": {
    "terminal": true,
    "consoleSize": {
        "height": 25,
        "width": 80
    },
    "user": {
        "uid": 1,
        "gid": 1,
        "umask": 63,
        "additionalGids": [5, 6]
    },
    "env": [
        "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        "TERM=xterm"
    ],
    "cwd": "/root",
    "args": [
        "sh"
    ],
    "apparmorProfile": "acme_secure_profile",
    "selinuxLabel": "system_u:system_r:svirt_lxc_net_t:s0:c124,c675",
    "noNewPrivileges": true,
    "capabilities": {
        "bounding": [
            "CAP_AUDIT_WRITE",
            "CAP_KILL",
            "CAP_NET_BIND_SERVICE"
        ],
       "permitted": [
            "CAP_AUDIT_WRITE",
            "CAP_KILL",
            "CAP_NET_BIND_SERVICE"
        ],
       "inheritable": [
            "CAP_AUDIT_WRITE",
            "CAP_KILL",
            "CAP_NET_BIND_SERVICE"
        ],
        "effective": [
            "CAP_AUDIT_WRITE",
            "CAP_KILL"
        ],
        "ambient": [
            "CAP_NET_BIND_SERVICE"
        ]
    },
    "rlimits": [
        {
            "type": "RLIMIT_NOFILE",
            "hard": 1024,
            "soft": 1024
        }
    ]
}
```

#### Hostname
容器看到的主机名
```json
"hostname"："mrsdalloway"
```

#### 特定与linux平台的配置
```json
"linux": {
    "namespaces": [
        {
            "type": "pid"
        }
    ]
}
```

#### Hooks
- prestart（已弃用）
- createRuntime: 在创建运行时环境之后但是在pivot_root或任何等效操作之前。
- createContainer: 同上,一般在mount之后,pivot_root之前
- startContainer: 容器启动后,运行用户进程之前
- poststart: 运行用户进程之后,操作返回之前。
- poststop: 容器被删除之后,删除操作返回之前。

```json
"hooks": {
    "prestart": [
        {
            "path": "/usr/bin/fix-mounts",
            "args": ["fix-mounts", "arg1", "arg2"],
            "env":  [ "key1=value1"]
        },
        {
            "path": "/usr/bin/setup-network"
        }
    ],
    "createRuntime": [
        {
            "path": "/usr/bin/fix-mounts",
            "args": ["fix-mounts", "arg1", "arg2"],
            "env":  [ "key1=value1"]
        },
        {
            "path": "/usr/bin/setup-network"
        }
    ],
    "createContainer": [
        {
            "path": "/usr/bin/mount-hook",
            "args": ["-mount", "arg1", "arg2"],
            "env":  [ "key1=value1"]
        }
    ],
    "startContainer": [
        {
            "path": "/usr/bin/refresh-ldcache"
        }
    ],
    "poststart": [
        {
            "path": "/usr/bin/notify-start",
            "timeout": 5
        }
    ],
    "poststop": [
        {
            "path": "/usr/sbin/cleanup.sh",
            "args": ["cleanup.sh", "-f"]
        }
    ]
}
```

## linux容器配置

### 默认文件系统

`Linux ABI`包含系统调用和一些特殊的文件路径，下面的文件路径应该是可用的
|Path    |	Type|
| ----   | --- |
|/proc	 |proc|
|/sys	 |sysfs|
|/dev/pts|	devpts|
|/dev/shm|	tmpfs|

### 命名空间

- type (string, REQUIRED) - 命名空间类型。应该支持以下命名空间类型：
    - pid: 容器内的进程将只能看到同一容器内或同一 pid 命名空间内的其他进程。
    - network: 容器将有自己的网络堆栈。
    - mount: 容器将有一个隔离的安装表。
    - ipc: 容器内的进程将只能通过系统级 IPC 与同一容器内的其他进程通信。
    - uts: 容器将能够拥有自己的主机名和域名。
    - user: 容器将能够将用户和组 ID 从主机重新映射到容器内的本地用户和组。
    - cgroup: 容器将具有 cgroup 层次结构的隔离视图。
- path (string, OPTIONAL) - 命名空间文件路径。此值必须是运行时挂载命名空间中的绝对路径。

    如果path未指定，运行时必须创建一个类型为 的新容器命名空间type。

```json
"namespaces": [
    {
        "type": "pid",
        "path": "/proc/1234/ns/pid"
    },
    {
        "type": "network",
        "path": "/var/run/netns/neta"
    },
    {
        "type": "mount"
    },
    {
        "type": "ipc"
    },
    {
        "type": "uts"
    },
    {
        "type": "user"
    },
    {
        "type": "cgroup"
    }
]
```

### 用户命名空间映射
- uidMappings（对象数组，可选）描述从主机到容器的用户命名空间 uid 映射。

    每个条目具有以下结构：

    - containerID (uint32, REQUIRED) - 是容器中的起始 uid/gid。
    - hostID (uint32, REQUIRED) - 是主机上要映射到containerID的起始 uid/gid 。
    - size (uint32, REQUIRED) - 是要映射的 id 数。

运行时不应该修改引用文件系统的所有权来实现映射。请注意，映射条目的数量可能受内核限制。

```json
"uidMappings": [
    {
        "containerID": 0,
        "hostID": 1000,
        "size": 32000
    }
],
"gidMappings": [
    {
        "containerID": 0,
        "hostID": 1000,
        "size": 32000
    }
]
```

### 设备


- devices（对象数组，可选）列出容器中必须可用的设备。运行时可以根据自己的喜好提供它们（mknod通过从运行时挂载命名空间绑定挂载，使用符号链接等）。
    - type (string, REQUIRED) - 设备类型：c, b,u或p. 参考mknod(1)
    - path (string, REQUIRED) - 容器内设备的完整路径。如果已经存在与请求的设备不匹配的文件，则运行时必须生成错误。
    - major, minor (int64, REQUIRED unless type is p) - 设备的主要、次要编号。
    - fileMode (uint32, OPTIONAL) - 设备的文件模式。您还可以使用`cgroups`控制对设备的访问。
    - uid （uint32，可选） -容器命名空间中设备所有者的 ID 。
    - gid (uint32, OPTIONAL) -容器命名空间中设备组的 id 。

相同type，major并且minor不应该用于多个设备。
```json
"devices": [
    {
        "path": "/dev/fuse",
        "type": "c",
        "major": 10,
        "minor": 229,
        "fileMode": 438,
        "uid": 0,
        "gid": 0
    },
    {
        "path": "/dev/sda",
        "type": "b",
        "major": 8,
        "minor": 0,
        "fileMode": 432,
        "uid": 0,
        "gid": 0
    }
]
```

#### 默认设备
```
/dev/null
/dev/zero
/dev/full
/dev/random
/dev/urandom
/dev/tty
/dev/console is set up if terminal is enabled in the config by bind mounting the pseudoterminal pty to /dev/console.
/dev/ptmx. A bind-mount or symlink of the container's /dev/pts/ptmx.
```
#### 控制组(Control groups)
- cgroupsPath (string, OPTIONAL) cgroups 的路径
- resources
    - devices: 可用设备列表
        - allow (boolean, REQUIRED) - 输入是允许还是拒绝。
        - type (string, OPTIONAL) - 设备类型：a(all), c(char), or b(block)。未设置的值表示“全部”，映射到a.
        - major, minor (int64, OPTIONAL) -设备的主要、次要编号。未设置的值表示“全部”，映射到*文件系统 API中。
        - access （字符串，可选） - 设备的 cgroup 权限。r(read)、w(write) 和m(mknod)的组合。
    - memory: 内存
        - limit (int64, OPTIONAL) - 设置内存使用限制
        - reservation (int64, OPTIONAL) - 设置内存使用的软限制
        - swap (int64, OPTIONAL) - 设置内存+交换使用限制
        - kernel (int64, OPTIONAL, NOT RECOMMENDED) - 设置内核内存的硬限制
        - kernelTCP (int64, OPTIONAL, NOT RECOMMENDED) - 设置内核 TCP 缓冲内存的硬限制

        以下属性不指定内存限制，但由memory控制器覆盖：

        - swappiness (uint64, OPTIONAL) - 设置 vmscan 的 swappiness 参数（参见 sysctl 的 vm.swappiness） 值是从 0 到 100。更高意味着更多的 swappy。
        - disableOOMKiller (bool, OPTIONAL) - 超过内存限制的进程会被杀死
        - useHierarchy (bool, OPTIONAL) - 未知
    - cpu: CPU
        - shares (uint64, OPTIONAL) - 指定 cgroup 中任务可用的 CPU 时间的相对份额
        - quota (int64, OPTIONAL) - 指定一个 cgroup 中的所有任务在一个时间段内可以运行的总时间（以微秒为单位）（定义period如下）
        - period (uint64, OPTIONAL) - 以微秒为单位指定一个 cgroup 对 CPU 资源的访问应该重新分配的频率（仅限 CFS 调度程序）
        - realtimeRuntime (int64, OPTIONAL) - 指定 cgroup 中的任务可以访问 CPU 资源的最长连续时间段（以微秒为单位）
        - realtimePeriod (uint64, OPTIONAL) - 与实时调度程序相同period但仅适用于实时调度程序
        - cpus （字符串，可选） - 容器将在其中运行的 CPU 列表
        - mems （字符串，可选） - 容器将在其中运行的内存节点列表


```json
{
"cgroupsPath": "/myRuntime/myContainer",
"resources": {
    "memory": {
        "limit": 536870912,
        "reservation": 536870912,
        "swap": 536870912,
        "kernel": -1,
        "kernelTCP": -1,
        "swappiness": 0,
        "disableOOMKiller": false
    },
    "devices": [
        "devices": [
            {
                "allow": false,
                "access": "rwm"
            },
            {
                "allow": true,
                "type": "c",
                "major": 10,
                "minor": 229,
                "access": "rw"
            },
            {
                "allow": true,
                "type": "b",
                "major": 8,
                "minor": 0,
                "access": "r"
            }
        ]
    ]
}
}
```

### 其他

- Block IO
    不同设备的IO权重
- Network
- Huge page limits
- PIDs
    - pids设置任务最大数量
        ```json
        "pids": {
            "limit": 32771
        }
        ```
- RDMA
- Unified
- IntelRdt
- Sysctl: 允许在容器运行时修改内核参数
- Seccomp
- The Container Process State
- Rootfs Mount Propagation
- Masked Paths
- Readonly Paths
- Mount Label
- Personality
```json

    "linux": {
        "devices": [
            {
                "path": "/dev/fuse",
                "type": "c",
                "major": 10,
                "minor": 229,
                "fileMode": 438,
                "uid": 0,
                "gid": 0
            },
            {
                "path": "/dev/sda",
                "type": "b",
                "major": 8,
                "minor": 0,
                "fileMode": 432,
                "uid": 0,
                "gid": 0
            }
        ],
        "uidMappings": [
            {
                "containerID": 0,
                "hostID": 1000,
                "size": 32000
            }
        ],
        "gidMappings": [
            {
                "containerID": 0,
                "hostID": 1000,
                "size": 32000
            }
        ],
        "sysctl": {
            "net.ipv4.ip_forward": "1",
            "net.core.somaxconn": "256"
        },
        "cgroupsPath": "/myRuntime/myContainer",
        "resources": {
            "network": {
                "classID": 1048577,
                "priorities": [
                    {
                        "name": "eth0",
                        "priority": 500
                    },
                    {
                        "name": "eth1",
                        "priority": 1000
                    }
                ]
            },
            "pids": {
                "limit": 32771
            },
            "hugepageLimits": [
                {
                    "pageSize": "2MB",
                    "limit": 9223372036854772000
                },
                {
                    "pageSize": "64KB",
                    "limit": 1000000
                }
            ],
            "memory": {
                "limit": 536870912,
                "reservation": 536870912,
                "swap": 536870912,
                "kernel": -1,
                "kernelTCP": -1,
                "swappiness": 0,
                "disableOOMKiller": false
            },
            "cpu": {
                "shares": 1024,
                "quota": 1000000,
                "period": 500000,
                "realtimeRuntime": 950000,
                "realtimePeriod": 1000000,
                "cpus": "2-3",
                "mems": "0-7"
            },
            "devices": [
                {
                    "allow": false,
                    "access": "rwm"
                },
                {
                    "allow": true,
                    "type": "c",
                    "major": 10,
                    "minor": 229,
                    "access": "rw"
                },
                {
                    "allow": true,
                    "type": "b",
                    "major": 8,
                    "minor": 0,
                    "access": "r"
                }
            ],
            "blockIO": {
                "weight": 10,
                "leafWeight": 10,
                "weightDevice": [
                    {
                        "major": 8,
                        "minor": 0,
                        "weight": 500,
                        "leafWeight": 300
                    },
                    {
                        "major": 8,
                        "minor": 16,
                        "weight": 500
                    }
                ],
                "throttleReadBpsDevice": [
                    {
                        "major": 8,
                        "minor": 0,
                        "rate": 600
                    }
                ],
                "throttleWriteIOPSDevice": [
                    {
                        "major": 8,
                        "minor": 16,
                        "rate": 300
                    }
                ]
            }
        },
        "rootfsPropagation": "slave",
        "seccomp": {
            "defaultAction": "SCMP_ACT_ALLOW",
            "architectures": [
                "SCMP_ARCH_X86",
                "SCMP_ARCH_X32"
            ],
            "syscalls": [
                {
                    "names": [
                        "getcwd",
                        "chmod"
                    ],
                    "action": "SCMP_ACT_ERRNO"
                }
            ]
        },
        "namespaces": [
            {
                "type": "pid"
            },
            {
                "type": "network"
            },
            {
                "type": "ipc"
            },
            {
                "type": "uts"
            },
            {
                "type": "mount"
            },
            {
                "type": "user"
            },
            {
                "type": "cgroup"
            }
        ],
        "maskedPaths": [
            "/proc/kcore",
            "/proc/latency_stats",
            "/proc/timer_stats",
            "/proc/sched_debug"
        ],
        "readonlyPaths": [
            "/proc/asound",
            "/proc/bus",
            "/proc/fs",
            "/proc/irq",
            "/proc/sys",
            "/proc/sysrq-trigger"
        ],
        "mountLabel": "system_u:object_r:svirt_sandbox_file_t:s0:c715,c811"
    },
```