#define _GNU_SOURCE
#include "unistd.h"
#include <sched.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/resource.h>
#include <sys/times.h>

static volatile int wg = 2;

#define CSEC_STEP 100 /* CPU centiseconds between messages */

void use_cpu(int i) {
  int prevStep = 0;
  int prevSec = 0;
  for (;;) {
    struct tms tms;
    times(&tms);
    int cpuCentisecs =
        (tms.tms_utime + tms.tms_stime) * 100 / sysconf(_SC_CLK_TCK);

    if (cpuCentisecs >= prevStep + CSEC_STEP) {
      prevStep += CSEC_STEP;
      printf("child-%d (PID %ld) cpu%d=%0.2f\n", i, (long)getpid(),
             sched_getcpu(), cpuCentisecs / 100.0);
    }

    if (cpuCentisecs > 1000) /* Terminate after 3 seconds */
      break;

    if (cpuCentisecs >= prevSec + 200) { /* Yield once/second */
      prevSec = cpuCentisecs;
      sched_yield();
    }
  }
}

int main() {

  cpu_set_t set;
  CPU_ZERO(&set);
  CPU_SET(1, &set);
  sched_setaffinity(getpid(), sizeof(set), &set);

  struct rlimit rlim;
  rlim.rlim_cur = rlim.rlim_max = 500;
  setrlimit(RLIMIT_CPU, &rlim);

  // 设置为 SCHED_FIFO 策略
  struct sched_param sp;
  sp.sched_priority = sched_get_priority_min(SCHED_FIFO);
  sched_setscheduler(0, SCHED_FIFO, &sp);

  if (fork() == 0) {
    use_cpu(1);
  } else {
    use_cpu(2);
  }
  return 0;
}
