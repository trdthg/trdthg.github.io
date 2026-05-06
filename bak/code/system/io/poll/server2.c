// Use the poll function to improve server processing power

#include <sys/types.h>
#include <sys/socket.h>
#include <sys/wait.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <strings.h>
#include <string.h>
#include <errno.h>
#include <poll.h>

#define DEFAULT_IPADDR "127.0.0.1" // server host
#define DEFAULT_PORT 6666          // server port
#define DEFAULT_LISTEN_QUEUE 5     // client_
#define DEFAULT_MAX_OPEN 1000      // 最大连接数
#define DEFAULT_MAX_LINE 1024      // 缓冲区大小
int bind_and_listen()
{
    // 初始化serverfd
    int serverfd;
    struct sockaddr_in server_addr;

    if ((serverfd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)) == 0)
    {
        perror("[ERROR] get socketfd failed!");
        return -1;
    }
    printf("[INFO] get serverfd %d success!\n", serverfd);

    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = inet_addr(DEFAULT_IPADDR);
    server_addr.sin_port = htons(DEFAULT_PORT);
    memset(server_addr.sin_zero, 0, sizeof(server_addr.sin_zero));

    // 绑定并监听端口
    if (bind(serverfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) == -1)
    {
        perror("[ERROR] bind error!");
        return -2;
    }
    printf("[INFO] bind serverfd on %s success!\n", DEFAULT_IPADDR);
    if (listen(serverfd, DEFAULT_LISTEN_QUEUE) == -1)
    {
        perror("[ERROR] listening on default port failed");
        return -3;
    }
    printf("[INFO] listening on port %d success!\n", DEFAULT_PORT);
    return serverfd;
}

int main(int argc, char *argv[])
{
    // 初始化server_fd
    int serverfd = bind_and_listen();

    // 初始化client_fd_set
    int new_clientfd;
    socklen_t client_addr_len;
    struct sockaddr_in client_addr;
    struct pollfd clientfds[DEFAULT_MAX_OPEN];

    clientfds[0].fd = serverfd;
    clientfds[0].events = POLLIN;
    for (int i = 0; i < DEFAULT_MAX_OPEN; ++i)
    {
        clientfds[i].fd = -1;
    }
    int max_i = 0;

    for (;;)
    {
        // 获取活动的文件描述符个数
        int n_ready = poll(clientfds, max_i + 1, -1);
        // if (n_ready == 0)
        // {
        //     printf("[WARN] timeout...\n");
        //     continue;
        // }
        if (n_ready == -1)
        {
            perror("[ERROR] poll error!}");
            exit(1);
        }

        //
        if (serverfd & POLLIN)
        {
            client_addr_len = sizeof(client_addr);
            // accept属于慢系统调用，可能永远无法发返回，这是内核就会返回一个EINRT错误(被中断的系统调用)，errno默认为0,发生错误是，系统会把errno修改为EINTR
            // 遇到中断错误时，可以选择goto重新运行，也可以忽视直接continue，这里就是选择了忽视中断错误
            if ((new_clientfd = accept(serverfd, (struct sockaddr *)&client_addr, &client_addr_len)) == -1)
            {
                if (errno == EINTR)
                {
                    continue;
                }
                else
                {
                    perror("[ERROR] accept error: ");
                    exit(2);
                }
            }
            fprintf(stdout, "accept a new client: %s: %d\n", inet_ntoa(client_addr.sin_addr), client_addr.sin_port);
            // 将新的连接的fd添加到client_fd_set里
            int i;
            for (i = 1; i < DEFAULT_MAX_OPEN; ++i)
            {
                if (clientfds[i].fd < 0)
                {
                    clientfds[i].fd = new_clientfd;
                }
            }
            // 如果fd数量到达最大值，就exit
            if (i == DEFAULT_MAX_OPEN)
            {
                fprintf(stderr, "too many clients.\n");
                exit(1);
            }
            clientfds[i].events = POLLIN;
            max_i = i > max_i ? i : max_i;
            // 加入到**读**描述符集合中
            n_ready -= 1;
            if (n_ready <= 0)
            {
                continue;
            }
        }

        // 准备缓冲区，如果ready，就尝试read
        char buffer[DEFAULT_MAX_LINE];
        memset(buffer, 0, sizeof(buffer));
        int read_len = 0;
        for (int i = 1; i <= max_i; ++i)
        {
            if (clientfds[i].fd < 0)
                continue;
            if (clientfds[i].revents & POLLIN)
            {
                read_len = read(clientfds[i].fd, buffer, DEFAULT_MAX_LINE);
                if (read_len == 0)
                {
                    close(clientfds[i].fd);
                    clientfds[i].fd = -1;
                    continue;
                }
                printf("buffer: %s", buffer);
                write(STDOUT_FILENO, buffer, read_len);
                write(clientfds[i].fd, buffer, read_len);
            }
        }
    }

    return 0;
}
