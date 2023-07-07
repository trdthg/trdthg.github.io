#ifndef MSG_CS_H
#define MSG_CS_H

#include <stddef.h>

#define SERVER_KEY 0x1aaaaaa1

#define FILENAME_MAX 40

struct request_t {
	long msg_type;
	int  client_id;
	char filepath[FILENAME_MAX];
};

#define REQ_MSG_SIZE                            \
	(offsetof(struct request_t, filepath) - \
	    offsetof(struct request_t, client_id) + FILENAME_MAX)

#define RES_MSG_SIZE 1024
struct response_t {
	int  msg_type;
	char data[RES_MSG_SIZE];
};

#define RESP_MT_FAILURE 1
#define RESP_MT_DATA 2
#define RESP_MT_END 3

#endif