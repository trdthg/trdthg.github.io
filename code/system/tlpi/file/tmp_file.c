#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>

int main() {
    int fd;
    char template[] = "/tmp/tlpi_tmp_fileXXXXXX";
    fd = mkstemp(template);
    if (fd == -1) {
        return 1;
    }
    // 文件确实会创建在 /tmp 目录下
    printf("%s\n", template);
    unlink(template);

    FILE *tmp = tmpfile();
    return 0;
}
