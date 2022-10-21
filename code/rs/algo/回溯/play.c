#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Vec {
  int *data;
  int len;
  int cap;
};

enum {
  INVALID_COLOR = 0,
  RED = 1,
  GREEN = 2,
};

struct Bird {
  char *Name;
  char *Addr;
  int Color;
  int Weight;

  void (*SetName)(struct Bird *Bird, char *Name);
  void (*SetAddr)(struct Bird *Bird, char *Addr);
  void (*SetColor)(struct Bird *Bird, const int Color);
  void (*SetWeight)(struct Bird *Bird, const int Weight);

  char *(*GetName)(struct Bird *Bird);
  int (*GetColor)(struct Bird *Bird);
};

void SetBirdName(struct Bird *Bird, const char *const Name) {
  if (Bird == NULL) {
    return;
  }
  Bird->Name = (char *)Name;
}

void SetBirdAddr(struct Bird *Bird, const char *const Addr) {
  if (Bird == NULL) {
    return;
  }
  Bird->Addr = (char *)Addr;
  // strcpy(Bird->Addr, Addr);
}

void SetBirdColor(struct Bird *Bird, const int Color) {
  if (Bird == NULL) {
    return;
  }
  Bird->Color = Color;
}

void SetBirdWeight(struct Bird *Bird, const int Weight) {
  if (Bird == NULL) {
    return;
  }
  Bird->Weight = Weight;
}

char *GetName(struct Bird *Bird) {
  if (Bird == NULL) {
    return NULL;
  }

  return Bird->Name;
}

int GetColor(struct Bird *Bird) {
  if (Bird == NULL) {
    return INVALID_COLOR;
  }

  return Bird->Color;
}
void BirdDeinit(struct Bird *Bird) {
  if (Bird == NULL) {
    return;
  }

  memset(Bird, 0, sizeof(struct Bird));
}
void BirdInit(struct Bird *Bird) {
  if (Bird == NULL) {
    return;
  }
  Bird->SetAddr = (void (*)(struct Bird *, char *))SetBirdAddr;
  Bird->SetColor = SetBirdColor;
  Bird->SetName = (void (*)(struct Bird *, char *))SetBirdName;
  Bird->SetWeight = SetBirdWeight;

  Bird->GetColor = GetColor;
  Bird->GetName = GetName;

  Bird->SetAddr(Bird, "Guangzhou");
  Bird->SetColor(Bird, RED);
  Bird->SetWeight(Bird, 10);
  Bird->SetName(Bird, "Xiaoming");
}

void print(char *string) { printf("%s", string); }

int main() {

  int arr[10] = {0};
  printf("%lu", sizeof(arr) / sizeof(int));
  struct Bird *Bird = (struct Bird *)malloc(sizeof(struct Bird));

  BirdInit(Bird);               //调用构造函数
  Bird->SetName(Bird, "Lihua"); //更改Bird的名称
  Bird->SetColor(Bird, GREEN);  //更改Bird的颜色
  printf("Bird name: %s, color: %d\n", Bird->GetName(Bird),
         Bird->GetColor(Bird));
  BirdDeinit(Bird); //调用析构函数
  free(Bird);
  Bird = NULL;

  char *a = &"aaa"[4];
  print("bbb\n");
  print(a);
  return 0;
}
