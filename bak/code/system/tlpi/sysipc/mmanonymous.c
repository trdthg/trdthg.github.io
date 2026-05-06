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
	// 创建匿名映射有两种方式
	// 1. 打开 /dev/zero
	// 2. 使用 MAP_ANONYMOUS 标志，并指定 fd = -1

	// 作用：malloc 创建匿名私有映射分配大于 MMAP_THRESHOLD
	// 的内存时，会使用 mmap
	// linux 还提供 mremap: 类似于 realloc，可以将内存映射到新的地址

	// int fd = open("/dev/zero", O_RDWR);
	// if (fd == -1) {
	// 	perror("打开文件失败");
	// 	return 1;
	// }

	// 创建私有匿名映射
	char *addr = mmap(NULL, sizeof(int), PROT_READ | PROT_WRITE,
	    MAP_PRIVATE | MAP_ANONYMOUS, -1, 0);
	if (addr == MAP_FAILED) {
		return 1;
	}

	*addr = 1;

	pid_t child_pid;
	child_pid = fork();
	switch (child_pid) {
	case -1:
		return 1;
	case 0:
		*addr += 1;
		_exit(0);
	default:
		// 父进程
		if (wait(NULL) == -1) {
			return 1;
		}
		printf("addr changed by child: %d\n", *addr);
		break;
	}
	if (munmap(addr, MEM_SIZE) == -1) {
		return 1;
	}
	return 0;
}