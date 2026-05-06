#include "sys/wait.h"
#include <fcntl.h>
#include <stdio.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <unistd.h>
#include <wait.h>

#define MEM_SIZE 10

int
main(int argc, char const *argv[])
{
	int fd = open("./mmshare_test.txt", O_RDWR);
	if (fd == -1) {
		perror("打开文件失败");
		return 1;
	}

	// 创建共享文件映射
	char *addr =
	    mmap(NULL, MEM_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
	if (addr == MAP_FAILED) {
		return 1;
	}

	if (close(fd) == -1) {
		return 1;
	}

	pid_t child_pid;
	child_pid = fork();
	switch (child_pid) {
	case -1:
		return 1;
	case 0:
		// 子进程
		addr[0] = 'J';
		addr[1] = 'u';
		addr[2] = 's';
		addr[3] = 't';
		addr[4] = ' ';
		addr[5] = 'a';
		addr[6] = ' ';
		addr[7] = 't';
		addr[8] = 'e';
		addr[9] = 's';
		// 强制将数据写入磁盘
		// MS_SYNC: 内存与磁盘同步
		// MS_ASYNC: 内存与内核高速缓冲区同步，可以被
		// read，但不一定写入磁盘
		if (msync(addr, MEM_SIZE, MS_SYNC) == -1) {
			return 1;
		}
		_exit(0);
	default:
		// 父进程
		break;
	}

	printf("等待子进程结束: %d\n", child_pid);
	if (waitpid(child_pid, NULL, 0) == -1) {
		return 1;
	}

	// 打印结果
	if (write(STDOUT_FILENO, addr, MEM_SIZE) != MEM_SIZE) {
		return 1;
	}

	// 解除映射
	// - 如果指定的映射不存在，会返回 0，成功
	// - 内核会自动删除内存范围中的所有内存锁
	if (munmap(addr, MEM_SIZE) == -1) {
		return 1;
	}
	return 0;
}