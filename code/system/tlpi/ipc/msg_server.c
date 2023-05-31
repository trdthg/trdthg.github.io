#include "msg_cs.h"
#include "signal.h"
#include "sys/stat.h"
#include <errno.h>
#include <fcntl.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/msg.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
#include <wait.h>

static void
grimReaper(int sig)
{
	int savedErrno = errno;
	while (waitpid(-1, NULL, WNOHANG) > 0) {
		continue;
	}
	errno = savedErrno;
}

static void
handleReq(const struct request_t *req)
{
	int fd = open(req->filepath, O_RDONLY);
	if (fd == -1) {
		char *s;
		sprintf(s, "open [%s]", req->filepath);
		perror(s);
		return;
	}

	struct response_t resp;
	resp.msg_type = RESP_MT_DATA;
	resp.msg_type = req->client_id;
	ssize_t numRead;
	printf("start read\n");
	while ((numRead = read(fd, resp.data, sizeof(resp.data))) > 0) {
		if (msgsnd(req->client_id, &resp, numRead, 0) == -1) {
			break;
		}
	}
	resp.msg_type = RESP_MT_END;
	msgsnd(req->client_id, &resp, 0, 0);
	printf("handle req done\n");
}

int
main(int argc, char const *argv[])
{
	int server_id =
	    msgget(SERVER_KEY, IPC_CREAT | S_IRUSR | S_IWUSR | S_IWGRP);
	if (server_id == -1) {
		perror("msgget failed");
		exit(1);
	}
	printf("server started at %d\n", server_id);

	struct sigaction sa;
	sigemptyset(&sa.sa_mask);
	sa.sa_flags   = SA_RESTART;
	sa.sa_handler = grimReaper;
	if (sigaction(SIGCHLD, &sa, NULL)) {
		perror("sigaction");
	}

	for (;;) {
		// 注意：这里的 server 在调用 msgrcv
		// 后就变了，需要重置，不然会出现 segment fault
		int server_id = msgget(
		    SERVER_KEY, IPC_CREAT | S_IRUSR | S_IWUSR | S_IWGRP);
		// 或者你可以使用 fork 来避免这个问题

		printf("server: [%d] waiting...\n", server_id);
		struct request_t req = {};
		int msg_len = msgrcv(server_id, &req, REQ_MSG_SIZE, 1, 0);
		printf("server: [%d] received\n", server_id);
		if (msg_len == -1) {
			if (errno == EINTR) {
				continue;
			}

			printf("hahaha~~~\n");
			printf("msgrcv -1, msg_len: %d, errno: %d\n", msg_len,
			    errno);
			break;
		}
		printf("server: [%d] receive new req: %d, %ld, %s\n",
		    server_id, req.client_id, req.msg_type, req.filepath);
		int pid = fork();
		if (pid == -1) {
			perror("fork");
			return 0;
		}
		if (pid == 0) {
			handleReq(&req);
			_exit(0);
		}
	}

	printf("close server [%d]...", server_id);
	if (msgctl(server_id, IPC_RMID, NULL) == -1) {
		perror("msgctl");
		return 0;
	}

	return 0;
}