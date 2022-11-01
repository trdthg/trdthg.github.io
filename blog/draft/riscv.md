# RISC-V

## RISC-V 特点

1. 增量 ISA(指令集架构)

- 核心是名为 RV32I 的核心 ISA，它是固定的永远不会改变
- 可以增加拓展，例如 RV32IMDF 将乘法 (RV32M),单精度浮点 (RV32D) 和双精度浮点 (RV32D) 的拓展添加到了基础指令集中。
- RISC-V 编译器可以根据拓展生成当前硬件环境下的最佳代码

## ISA

### ISA 设计

- 成本（美元硬币）
- 简洁性（轮子）
    
    -  ISA 的简洁性，从而缩小实现 ISA 的处理器的尺寸
- 性能（速度计）
- 架构和具体实现的分离（分开的两个半圆）
- 提升空间（手风琴）
- 程序大小（相对的压迫着一条线的两个箭头）
- 易于编程/编译/链接（儿童积木“像 ABC 一样简单”）

### RV32I 指令格式

六种基本指令格式分别是：
- 用于 `寄存器-寄存器` 操作的 R 类型指令
- 用于短立即数和访存 load 操作的 I 型指令
- 用于访存 store 操作的 S 型指令
- 用于条件跳转操作的 B 类型指令
- 用于长立即数的 U 型指令
- 用于无条件跳转的 J 型指令

优势：

- 指令只有六种格式，并且所有的指令都是 32 位长，这简化了指令解码
- 第二，RISC-V 指令提供三个寄存器操作数，而不是像 x86-32 一样，让源操作数和目的操作数共享一个字段。(节约了 1 条 move（搬运）指令)

### 寄存器

- RV32I 有 31 寄存器加上一个值恒为 0 的 x0 寄存器。
- ARM-32 只有 16 个寄存器
- x86-32 甚至只有 8 个寄存器。

1. 为常量 0 单独分配一个寄存器是 RISC-V ISA 能如此简单的一个很
大的因素。而 ARM-32 和 x86-32 指令集中没有零寄存器。

2. 程序计数器（PC）是 ARM-32 的 16 个寄存器之一，这意味着任何改变寄存器的指令
都有可能导致分支跳转。PC 作为一个寄存器使硬件分支预测变得复杂，因为在典型的 ISA
中，仅 10%-20% 的指令为分支指令，而在 ARM-32 中，任何指令都有可能是分支指令。而
分支预测的准确性对于良好的流水线性能至关重要。另外将 PC 作为一个寄存器也意味着
可用的通用寄存器少了一个。

| 寄存器 | 功能 |
|------|--------------|
|  x0 / szero  |  硬连线到 0 (Hardwired zero)   |
|  x1 / ra  |  返回地址 (Return address)  |
|  x2 / sp  |  栈指针 (Stack pointer)  |
|  x3 / gp |  全局指针 (Global pointer)  |
|  x4 / tp |  线程指针 (Thread pointer)  |
|  x5 / t0 |  临时 (Temporary)  |
|  x6 / t1 |  临时   |
|  x7 / t2 |  临时   | 
|  x8 / s0 / fp |  保存寄存器 (saved register) / frame pointer   |
|  x9 / s1 |  保存寄存器   |
|  x10 / a0 |  函数参数 (Function argument), 返回地址   |
|  x11 / a1 |  函数参数，返回地址   |
|  x12 / a2 |  函数参数  |
|  x13 / a3 |  函数参数  |
|  x14 / a4 |  函数参数  |
|  x15 / a5 |  函数参数  |
|  x16 / a6 |  函数参数  |
|  x17 / a7 |  函数参数  |
|  x18 / s2 |  保存寄存器  |
|  x19 / s3 |  保存寄存器  |
|  x20 / s4 |  保存寄存器  |
|  x21 / s5 |  保存寄存器  |
|  x22 / s6 |  保存寄存器  |
|  x23 / s7 |  保存寄存器  |
|  x24 / s8 |  保存寄存器  |
|  x25 / s9 |  保存寄存器  |
|  x26 / s10 |  保存寄存器  |
|  x27 / s11 |  保存寄存器  |
|  x28 / t3 |  临时   |
|  x29 / t4 |  临时   |
|  x30 / t5 |  临时   |
|  x31 / t6 |  临时   |
| | |
| PS | 程序计数器 |

## 计算机中的指令表示

## 计算

- 简单计算: add, sub
- 逻辑指令: and, or, xor
- 移位指令: sll, srl, sra 
- 小于时置位: slt, altu (unsigned), 立即数版 (slti，sltiu)


## 用于决策的指令

### 判断 (if-then-else)

```c
// f,   g,   h,   i,   j
// x19, x20, x21, x22, x23

if (i == g) 
    f = g + h;
else
    f = g - h;
```

除了 Else 标签之外，还需要有一个 Exit 的标签，用于 If 执行完跳过 Else。

```assembly
    bne x22, x23, Else  // if
    add x19, x20, x21
    beq x0, x0, Exit    // 无条件分支的一种实现方法
Else: sub x19, x20. x21 // else
Exit:
```

### 循环 (for / while)

```c
// i: x22, k: x24, save: x25
while (save[i] == k) 
    i += 1;
```

- 将 `save[i]` 加载到临时寄存器里。
    - 加载 `save[i]` 前还需要得到它的地址，将 i 加到 save 的基址上。
    - 由于字节寻址问题，i 还需要乘 8。这个可以通过左移实现
    - 添加 Loop 标签

```asm
      slid x10, x22, 3  ; i * 8, 并存到 x10 里
      add x10, x10, x25 ; 在加上 save 基址
      ld x9, 0(x10)     ; 将 x10 存储到临时寄存器
Loop: bne x9, x24, Exit ; 比较
      addi x22, x22, 1  ; i = i + １
      beq x0, x0, Loop  ; 继续循环
Exit：
```

### case / switch

实现方法：
1. 转换为一系列 if-then-else
2. 更高效的方法：使用分支地址表或分支表。

## "过程"

### 过程调用时的寄存器的分配

- `x0` 硬连线为 0
- `x10 - x17`: 参数寄存器，用于传递参数或者返回值
- `x1`: 一个返回地址寄存器

### 跳转指令

- `jal`: 跳转 - 链接指令

```asm
jal x1, ProcedureAddress
```
跳转到 ProcedureAddress 并把下一条指令的返回值保存到目标寄存器 **`rd`**.

> 在存储程序中，总需要一个寄存器存储当前指令的地址，这个寄存器被称为 "程序计数器", 缩写为 "PC".所以 `jal` 指令实际上是将 `PC + 4` 写入到 x1 中

- `jalr` 间接跳转，可以用于处理 case 语句。

```asm
jalr x0, 0(x1)
```

由于 x0 硬连线到 0，所以其效果是丢弃返回地址

当用户 `jal x1 X` `jalr x0, 0(x1)`


## 使用更多寄存器

假设一个过程需要比 8 个更多的寄存器，需要将寄存器换出到存储器。

换出寄存器的理想结构是栈，栈中需要一个指针，指向下一个过程应该放置寄存器的位置（或者旧寄存器值的存放位置）。在 RISC-V 中，栈指针是 `x2` 也称 `sp`。

```c
// g: x10, h: x11, i: x12, j: x13
// f: x20
// 临时寄存器：x5, x6
long long int leaf_example(long long int g, long long int h, long long int i, long long int k) {
    long long int f;
    f = (g + h) - (i + j);
    return f;
}
```

汇编：
```asm
leaf_example:
    ; 压栈 (sd 从寄存器取双字到存储器)
    addi sp, sp, -24
    sd x5, 16(sp)        ; tmp1
    sd x6, 8(sp)         ; tmp2
    sd x20, 0(sp)        ; f

    ; 计算
    add x5, x10, x11     ; x5 = g + h
    add x6, x12, x13     ; x6 = i + j
    sub x20, x5, x6      ; f = x5 - x6

    ; 把返回值复制到一个参数寄存器
    addi x10, x20, 0     ; f -> x10

    ; 弹栈 (ld 从存储器取双字到寄存器)
    ld x20, 0(sp)
    ld x6, 8(sp)
    ld x5, 16(sp)
    addi sp, sp, 24
    
    ; 返回
    jalr x0, 0(x1)
```

上面使用了 x5 和 x6 作为临时寄存器，并假设它的旧值必须被保存和恢复。为了避免保存和恢复一个其值从没被用过的寄存器 (通常称为临时寄存器), RISC-V 把寄存器分为类两组：

- x5 ~ x7, x28 ~ x31: 临时寄存器,在过程调用时, 不会被调用者保存.
- x8 ~ x9, x18 ~ x27: 保存寄存器 (saved register), 在过程调用中, 必须被保存.

这一约定，减少了寄存器换出，x5, x6 不用保存，减少了两次存储和载入，x20 必须保存和恢复。

## 嵌套过程

不调用其他过程的过程称为 leaf 进程

如何解决嵌套？

将其他所有必须保存的寄存器压栈。调用者将所有参数寄存器 (x10 ~ x17) 或临时寄存器 (x5~x7 和 x28 ~ x31) 压栈，被调用者将返回地址寄存器 x1 和被调用者使用的保存寄存器 (x8~x9 和 x18 ~ x27) 压栈。

```c
long long int fact(long long int n) {
    if (n < 1)
        return 1;
    else
        return n * fact(n - 1);
}
```

汇编：

```asm
fact:
    ; 压栈
    addi sp, sp, 16    ; n 和 x1
    sd x1, 8(sp)       ; 返回地址 x1
    sd x10, 16(sp)     ; 参数 n

    ; 判断
    addi x5, x10, -1   ; x5 = n - 1
    bge x5, x0, L1     ; if (n < 1) goto L1;
    
    ; true
    addi x10, x0, 1    ; x10 = 1

    addi sp, sp, 16    ; 再次压栈
    jalr x0, 0(x1)     ; 跳到 x1
L1:
    ; false
    addi x10, x10, -1  ; x10 = n - 1
    jal x1, fact       ; fact
    addi x6, x10, 0    ; 把计算结果存到 x6

    ld x10, 0(sp)
    ld x1, 8(sp)
    addi sp, sp, 16
    mul x10, x10, x6   ; return n * fact(n - 1)
    jalr x0, 0(x1)