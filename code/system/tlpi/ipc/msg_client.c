#include "msg_cs.h"
#include "sys/msg.h"
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>

int
main(int argc, char const *argv[])
{
	if (argc == 1) {
		exit(0);
	}

	int server_id = msgget(SERVER_KEY, S_IWUSR);
	printf("server: %d\n", server_id);
	if (server_id == -1) {
		perror("msgget failed");
		exit(1);
	}
	// for (int i = 1; i < argc; i++) {
	int i         = 1;
	int client_id = msgget(IPC_PRIVATE, S_IRUSR | S_IWUSR | S_IWGRP);
	if (client_id == -1) {
		perror("client get ipc failed");
		exit(1);
	}
	printf("client: %d\n", client_id);
	struct request_t req = (struct request_t) {
		.client_id = client_id,
		.msg_type  = 1,
	};
	strncpy(req.filepath, argv[i], sizeof(req.filepath) - 1);
	req.filepath[sizeof(req.filepath) - 1] = '\0';

	printf("req: %s\n", req.filepath);
	msgsnd(server_id, &req, REQ_MSG_SIZE, 0);
	printf("send done\n");

	struct response_t resp;
	msgrcv(client_id, &resp, RES_MSG_SIZE, 0, 0);
	printf("res info: %d, %s\n", resp.msg_type, resp.data);
	while (resp.msg_type != RESP_MT_END) {
		printf("%s", resp.data);
		msgrcv(client_id, &resp, RES_MSG_SIZE, 0, 0);
	}
	// }
	return 0;
}