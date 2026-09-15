#define _GNU_SOURCE
#include <unistd.h>
#include <signal.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

static void 
siginfoHandler(int sig) {
    printf("catch by custome sig handler\n");
}

int main() {
    pid_t pid = getpid();
    
    struct sigaction *sa = malloc(sizeof(struct sigaction));
    sa->sa_handler = siginfoHandler;
    sa->sa_flags = SA_RESETHAND;
    sigaction(SIGINT, sa, NULL); 
    while(1) {

    }
    return 0;
}
