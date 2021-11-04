(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{397:function(t,s,a){"use strict";a.r(s);var n=a(46),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"文件系统"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#文件系统"}},[t._v("#")]),t._v(" 文件系统")]),t._v(" "),a("h2",{attrs:{id:"_1-inode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-inode"}},[t._v("#")]),t._v(" 1. inode")]),t._v(" "),a("h3",{attrs:{id:"_1-1-什么是-inode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-什么是-inode"}},[t._v("#")]),t._v(" 1.1 什么是 inode")]),t._v(" "),a("p",[a("img",{attrs:{src:"/assets/img/image-20211104125905459.png",alt:"image-20211104125905459"}})]),t._v(" "),a("p",[t._v("文件存储在硬盘上， 硬盘的最小存储单元是扇区， 硬盘会按照多个扇区按块读取扇区， 一个文件的数据就被存储在多个块中， 同时我们还需要有一个地方存储文件的元信息。这种存储文件元信息的区域就叫做 inode（索引节点）。")]),t._v(" "),a("h3",{attrs:{id:"_1-2-inode的内容"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-inode的内容"}},[t._v("#")]),t._v(" 1.2 inode的内容")]),t._v(" "),a("p",[t._v("每一个文件都有对应的 inode 我们可以通过 "),a("code",[t._v("stat xxx")]),t._v(" 去查看，主要包括：")]),t._v(" "),a("ul",[a("li",[t._v("文件大小")]),t._v(" "),a("li",[t._v("文件的拥有者")]),t._v(" "),a("li",[t._v("文件的Group ID")]),t._v(" "),a("li",[t._v("文件的读写执行权限")]),t._v(" "),a("li",[t._v("文件的时间戳， ctime：创建时间， mtime：修改时间， atime：打开时间")]),t._v(" "),a("li",[t._v("链接数：比如创建软链接，再次查看就会多1")]),t._v(" "),a("li",[t._v("数据块的位置")])]),t._v(" "),a("p",[t._v("不过单单没有文件名就离谱")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("trthg@trthg--manjaro ioclub"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stat")]),t._v(" package.json\n  File: package.json\n  Size: "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1006")]),t._v("            Blocks: "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),t._v("          IO Block: "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4096")]),t._v("   regular "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("file")]),t._v("\nDevice: "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0,39")]),t._v("    Inode: "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4528790")]),t._v("     Links: "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("\nAccess: "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0644/-rw-r--r--"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("  Uid: "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),t._v("/   trthg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("   Gid: "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1001")]),t._v("/   trthg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nAccess: "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2021")]),t._v("-11-01 "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),t._v(":00:54.464935992 +0800\nModify: "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2021")]),t._v("-11-01 "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),t._v(":00:54.464935992 +0800\nChange: "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2021")]),t._v("-11-01 "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),t._v(":00:54.464935992 +0800\n Birth: "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2021")]),t._v("-11-01 "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),t._v(":00:54.464935992 +0800\n")])])]),a("h3",{attrs:{id:"_1-3-inode的大小"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-inode的大小"}},[t._v("#")]),t._v(" 1.3 inode的大小")]),t._v(" "),a("ol",[a("li",[t._v("inode 与 数据块本身会储存在不同的区域， 硬盘格式化时， 操作系统就会把硬盘分为两个区， 数据区和inode区")]),t._v(" "),a("li",[t._v("inode节点的大小一般在格式化时就给定，一般是128或256字节")]),t._v(" "),a("li",[t._v("一般每1-2kb就会设置一个inode， 假定在一块1GB的硬盘中，每个inode节点的大小为128字节，每1KB就设置一个inode，那么inode table的大小就会达到128MB，占整块硬盘的12.8%。")])]),t._v(" "),a("p",[t._v("查看每个硬盘分区的inode总数， 和已经使用的数量")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("trthg@trthg--manjaro ioclub"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("df")]),t._v(" -i\nFilesystem     Inodes IUsed IFree IUse% Mounted on\ndev              "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".9M   "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("585")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".9M    "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("% /dev\nrun              "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".9M  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".1K  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".9M    "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("% /run\n/dev/nvme0n1p2      "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     - /\ntmpfs            "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".9M   "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("175")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".9M    "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("% /dev/shm\n/dev/nvme0n1p2      "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     - /home\n/dev/nvme0n1p2      "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     - /var/cache\n/dev/nvme0n1p2      "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     - /var/log\ntmpfs            400K  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(".8K  397K    "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("% /tmp\n/dev/nvme0n1p1      "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("     - /boot/efi\ntmpfs            386K   "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("303")]),t._v("  386K    "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("% /run/user/1000\n")])])]),a("p",[t._v("查看inode大小")]),t._v(" "),a("p",[t._v("没找到")]),t._v(" "),a("h3",{attrs:{id:"_1-4-inode号码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-inode号码"}},[t._v("#")]),t._v(" 1.4 inode号码")]),t._v(" "),a("p",[t._v("每个 inode 都有一个id相当与， 操作系统用这个id来识别文件")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("trthg@trthg--manjaro ioclub"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ls")]),t._v(" -i package.json\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4528790")]),t._v(" package.json\n")])])]),a("h3",{attrs:{id:"_1-5-目录文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-目录文件"}},[t._v("#")]),t._v(" 1.5 目录文件")]),t._v(" "),a("p",[t._v("目录文件也是一种文件，目录文件本身结构简单，它存储的是一个列表， 列表中存储目录项")]),t._v(" "),a("p",[t._v("目录项存储的：")]),t._v(" "),a("ul",[a("li",[t._v("文件名")]),t._v(" "),a("li",[t._v("文件的 inode 号")])]),t._v(" "),a("p",[t._v("可以用 "),a("code",[t._v("ls -i dir")]),t._v(" 查看该目录下所有文件的文件名和inode")]),t._v(" "),a("p",[t._v("目录文件的读权限（r）和写权限（w），都是针对目录文件本身。由于目录文件内只有文件名和inode号码，读取inode节点内的信息需要目录文件的执行权限（x），  所以如果只有读权限，只能获取文件名，无法获取其他信息，因为其他信息都储存在inode节点中，而")]),t._v(" "),a("h3",{attrs:{id:"_1-6-硬链接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-6-硬链接"}},[t._v("#")]),t._v(" 1.6 硬链接")]),t._v(" "),a("p",[t._v("有了上面的知识就能理解了，硬链接就是指多个文件名可以指向同一个inode号， "),a("code",[t._v(".")]),t._v(" 和 "),a("code",[t._v("..")]),t._v(" 就是硬链接，加了一个硬链接， 原文件的 LINK 数就会 +1")]),t._v(" "),a("h3",{attrs:{id:"_1-7-软链接"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-7-软链接"}},[t._v("#")]),t._v(" 1.7 软链接")]),t._v(" "),a("p",[t._v("软链接指的是一个文件的内容存储的是另一个文件的路径， 访问A就会自动导向B")]),t._v(" "),a("p",[a("code",[t._v("ln -s")])]),t._v(" "),a("h3",{attrs:{id:"_1-8-其他"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-8-其他"}},[t._v("#")]),t._v(" 1.8 其他")]),t._v(" "),a("p",[a("strong",[t._v("八、inode的特殊作用")])]),t._v(" "),a("p",[t._v("由于inode号码与文件名分离，这种机制导致了一些Unix/Linux系统特有的现象。")]),t._v(" "),a("p",[t._v("1.  有时，文件名包含特殊字符，无法正常删除。这时，直接删除inode节点，就能起到删除文件的作用。")]),t._v(" "),a("p",[t._v("2.  移动文件或重命名文件，只是改变文件名，不影响inode号码。")]),t._v(" "),a("p",[t._v("3.  打开一个文件以后，系统就以inode号码来识别这个文件，不再考虑文件名。因此，通常来说，系统无法从inode号码得知文件名。")]),t._v(" "),a("p",[t._v("第3点使得软件更新变得简单，可以在不关闭软件的情况下进行更新，不需要重启。因为系统通过inode号码，识别运行中的文件，不通过文件名。更新的时候，新版文件以同样的文件名，生成一个新的inode，不会影响到运行中的文件。等到下一次运行这个软件的时候，文件名就自动指向新版文件，旧版文件的inode则被回收。")]),t._v(" "),a("h2",{attrs:{id:"_2-文件描述符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-文件描述符"}},[t._v("#")]),t._v(" 2. 文件描述符")]),t._v(" "),a("blockquote",[a("p",[t._v("Advanced Programming in the UNIX® Environment: Second Edition\nBy W. Richard  Stevens, Stephen A. Rago")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.458.2318&rep=rep1&type=pdf",target:"_blank",rel:"noopener noreferrer"}},[t._v("书里有更详细的解释"),a("OutboundLink")],1)])]),t._v(" "),a("h3",{attrs:{id:"_2-1-与-inode-的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-与-inode-的区别"}},[t._v("#")]),t._v(" 2.1 与 inode 的区别")]),t._v(" "),a("p",[t._v("inode本身只是对应没一个文件， 但是一个文件能被多个人打开， 因此需要有 fd 去记录文件的打开状态")]),t._v(" "),a("p",[t._v("内核维护一个内核级文件描述符表， 存储了主要包括：")]),t._v(" "),a("ul",[a("li",[t._v("文件偏移量")]),t._v(" "),a("li",[t._v("文件的打开状态")]),t._v(" "),a("li",[t._v("inode 指针")])]),t._v(" "),a("p",[t._v("这些是全部")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("1. 当前文件偏移量（调用read()和write()时更新，或使用lseek()直接修改）\n2. 打开文件时所使用的状态标识（即，open()的flags参数）\n3. 文件访问模式（如调用open()时所设置的只读模式、只写模式或读写模式）\n4. 与信号驱动相关的设置\n5. 对该文件i-node对象的引用\n6. 文件类型（例如：常规文件、套接字或FIFO）和访问权限\n7. 一个指针，指向该文件所持有的锁列表\n8. 文件的各种属性，包括文件大小以及与不同类型操作相关的时间戳\n")])])]),a("p",[t._v("只要有进程打开一个文件， 内核就会产生这个去记录文件打开状态， 接着向进程返回这个记录的索引位置，就是 fd")]),t._v(" "),a("p",[t._v("进程本身维护一个进程级的文件描述符表， 存储了：")]),t._v(" "),a("ul",[a("li",[t._v("文件描述符")]),t._v(" "),a("li",[t._v("文件指针")])]),t._v(" "),a("p",[t._v("查看进程占用的 fd 数目")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("// "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("226889")]),t._v("是进程的PID， 可以通过 "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("lsof")]),t._v(" -i：6379查看\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ls")]),t._v(" /proc/226889/fd "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wc")]),t._v(" -w                                                       ✔\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9")]),t._v("\n")])])]),a("h3",{attrs:{id:"_2-2-不同级别的表的对应关系"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-不同级别的表的对应关系"}},[t._v("#")]),t._v(" 2.2 不同级别的表的对应关系")]),t._v(" "),a("img",{staticStyle:{zoom:"50%"},attrs:{src:"/assets/img/image-20211104104539093.png",alt:"image-20211104104539093"}}),t._v(" "),a("p",[a("img",{attrs:{src:"/assets/img/image-20211104104520025.png",alt:"image-20211104104520025"}})]),t._v(" "),a("ol",[a("li",[t._v("在进程A中，文件描述符1和30都指向了同一个打开的文件句柄（标号23）。这可能是通过调用dup()、dup2()、fcntl()或者对同一个文件多次调用了open()函数而形成的。")]),t._v(" "),a("li",[t._v("进程A的文件描述符2和进程B的文件描述符2都指向了同一个打开的文件句柄（标号73）。这种情形可能是在调用fork()后出现的（即，进程A、B是父子进程关系），或者当某进程通过UNIX域套接字将一个打开的文件描述符传递给另一个进程时，也会发生。再者是不同的进程独自去调用open函数打开了同一个文件，此时进程内部的描述符正好分配到与其他进程打开该文件的描述符一样。")]),t._v(" "),a("li",[t._v("此外，进程A的描述符0和进程B的描述符3分别指向不同的打开文件句柄，但这些句柄均指向i-node表的相同条目（1976），换言之，指向同一个文件。发生这种情况是因为每个进程各自对同一个文件发起了open()调用。同一个进程两次打开同一个文件，也会发生类似情况。")])]),t._v(" "),a("p",[t._v("不同文件描述符存储的内容")]),t._v(" "),a("img",{staticStyle:{zoom:"50%"},attrs:{src:"/assets/img/image-20211104102649779.png",alt:"image-20211104102649779"}}),t._v(" "),a("h3",{attrs:{id:"_2-3-fd-的限制"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-fd-的限制"}},[t._v("#")]),t._v(" 2.3 fd 的限制")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("系统级限制")]),t._v(" "),a("p",[t._v("文件描述符是系统的一个重要资源，"),a("strong",[t._v("虽然说系统内存有多少就可以打开多少的文件描述符")]),t._v("，但是在实际实现过程中内核是会做相应的处理的，一般最大打开文件数会是系统内存的10%（以KB来计算）")]),t._v(" "),a("p",[t._v("查看方式："),a("code",[t._v("sysctl -a | grep fs.file-max")])])]),t._v(" "),a("li",[a("p",[t._v("用户级限制")]),t._v(" "),a("p",[t._v("与此同时，内核为了不让某一个进程消耗掉所有的文件资源，其也会对单个进程最大打开文件数做默认值处理，默认值一般是1024，使用 "),a("code",[t._v("ulimit -n")]),t._v(" 命令可以查看。")])])]),t._v(" "),a("p",[t._v("一般可以通过修改限制优化系统")]),t._v(" "),a("h2",{attrs:{id:"_3-使用-fd"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-使用-fd"}},[t._v("#")]),t._v(" 3. 使用 fd")]),t._v(" "),a("h3",{attrs:{id:"_3-1-open-read"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-open-read"}},[t._v("#")]),t._v(" 3.1 open / read")]),t._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<stdio.h>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<stdlib.h>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<string.h>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<unistd.h>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<sys/types.h>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<sys/stat.h>")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token macro property"}},[a("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),a("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("<fcntl.h>")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("main")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" fd"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" numbytes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),t._v(" path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"file"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("char")]),t._v(" buf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n     * O_CREAT:如果文件不存在则创建\n     * O_RDONLY:以只读模式打开文件\n     */")]),t._v("\n    fd "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" O_CREAT "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" O_RDONLY"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0644")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fd "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("perror")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"open()"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("exit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("EXIT_FAILURE"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("memset")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("buf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x00")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("numbytes "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("read")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fd"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" buf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("255")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("printf")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"%d bytes read: %s"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" numbytes"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" buf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("memset")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("buf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0x00")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("256")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("close")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fd"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("exit")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("EXIT_SUCCESS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);