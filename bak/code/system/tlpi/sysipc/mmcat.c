#include <fcntl.h>
#include <stdio.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <unistd.h>
int
main(int argc, char const *argv[])
{
	if (argc < 2) {
		return 1;
	}
	int fd = open(argv[1], O_RDONLY);
	if (fd == -1) {
		return 1;
	}

	// 获取文件大小
	struct stat st;
	if (fstat(fd, &st) == -1) {
		return 1;
	}

	// 创建私有内存映射
	char *addr = mmap(NULL, st.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
	if (addr == MAP_FAILED) {
		return 1;
	}

	// 打印文件内容
	if (write(STDOUT_FILENO, addr, st.st_size) != st.st_size) {
		return 1;
	}

	// 解除映射
	// - 如果指定的映射不存在，会返回 0，成功
	// - 内核会自动删除内存范围中的所有内存锁
	if (munmap(addr, st.st_size) == -1) {
		return 1;
	}
	return 0;
}