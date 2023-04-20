#include <stdio.h>
#include <unistd.h>

int main() {
    printf("A without \\n");
    write(STDOUT_FILENO, "B\n", 2);
    return 0;
}
