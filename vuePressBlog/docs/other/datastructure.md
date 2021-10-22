# 树

## 二叉搜索树

### 初始化
```cpp
typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

typedef struct Tree {
    int init;
    int length;
    Node* root;
} Tree;

Node* initNode() {
    Node* p = (Node*)malloc(sizeof(Node));
    p -> left = NULL;
    p -> right = NULL;
    p -> data = 0;
    return p;
}

Tree* initTree() {
    Tree* p = (Tree*)malloc(sizeof(Tree));
    p->root = initNode();    
    p->init = 0;
    return p;
}

```

### 遍历
```cpp
void preorderTraversal(Node* node) {
    if (node != NULL) {
        printf("%d ", node->data);
        preorderTraversal(node->left);
        preorderTraversal(node->right);
    }
}

void inorderTraversal(Node* node) {
    if (node != NULL) {
        inorderTraversal(node->left);
        printf("%d ", node->data);
        inorderTraversal(node->right);
    }
} 

void postorderTraversal(Node* node) {
    if (node != NULL) {
        postorderTraversal(node->left);
        postorderTraversal(node->right);
        printf("%d ", node->data);
    }
}

void levalorderTraversal(Tree* tree) {
    printf("%d\n", tree->length);
    int arr[100];
    int i=0, j=0; // i记录已经加入的元素数, j记录最后输出的节点
    int size = 1; // 记录实际元素个数
    Node* nodes[100] = {NULL};
    Node* node = tree->root;
    nodes[0] = node;
    while (size > 0) {
        printf("%d ", nodes[j]->data);
        printf("%d  ", node->data);
        j += 1;
        size -= 1;
        if (node->left != NULL)  {
            i += 1;
            nodes[i] = node->left;
            size += 1;
        }
        if (node->right != NULL) {
            i += 1;
            nodes[i] = node->right;
            size += 1;
        }
        node = nodes[j];
    }
}

```

### CRUD
```cpp
#include<stdio.h>
#include<stdlib.h>


Node* add(Tree* tree, int data) {
    Node* current = tree->root;
    Node* parent;
    tree->length += 1;
    if (tree->init == 0) {
        tree->init = 1;
        tree->root->data = data;
    } else {
        Node* node = initNode();
        node->data = data;
        while (1) {
            parent = current;
            if (data <= current->data) {
                current = current->left;
                if (current == NULL) {
                    parent->left = node;
                    break;
                }
            } else {
                current = current->right;
                if (current == NULL) {
                    parent->right = node;
                    break;
                }
            }
        }
    }
    return 0;
}


Node* findMax(Node* node) {
    if (node->right != NULL) {
        findMax(node->right);
    } else {
        return node;
    }
}


Node* findMin(Node* node) {
    if (node->left != NULL) {
        findMax(node->left);
    } else {
        return node;
    }
}

int find(Node* node, int data) {
    if (node != NULL) {
        if (node->data == data) return node->data;
        else if (data < node->data) find(node->left, data);
        else find(node->right, data);
    } else {
        return -1;
    }
}

int delete(Node* root, Node* node, int data) {
    Node* parent = node;
    // if (node == root && data == root->data) {
    //     return 0;
    // }
    if (node != NULL && node != root) {
        if (data < node->data) {
            node = node->left;
        } else {
            node = node->right;
        }
    }
    if (data == node->data) {
        if (node->left == NULL && node->right == NULL) {
            if (data <= parent->data) parent->left = NULL; else parent->right = NULL;
        } else if (node->left == NULL) {
            if (data > parent->data) parent->right = node->right; else parent->left = node->right;
        } else if (node->right == NULL) {
            if (data < parent->data) parent->left = node->left; else parent->right = node->left;
        } else {
            Node* innerparent = node;
            Node* innernode = node->right;
            while (innernode->left != NULL) {
                innerparent = innernode;
                innernode = node->left;
            }
            node->data = innernode->data;
            if (innerparent == node) {
                node->right = innernode->right;
            } else {
                innerparent->left = NULL;
            }
        }
        return 1;
    } else if (data < node->data) {
        delete(root, node, data);
    } else {
        delete(root, node, data);
    }
}
```

### 示例
```cpp
int main(void) {
    Tree* tree = initTree();
    add(tree, 8);
    add(tree, 10);
    add(tree, 5);
    add(tree, 42);
    add(tree, 6);
    add(tree, 3);
    add(tree, 2);
    add(tree, 4);
    add(tree, 7);
    preorderTraversal(tree->root);
    printf("\n");
    inorderTraversal(tree->root);
    printf("\n");
    postorderTraversal(tree->root);
    printf("\n");
    levalorderTraversal(tree);
    printf("\n");
    printf("max: %d min: %d\n", findMax(tree->root)->data, findMin(tree->root)->data);
    printf("find 3: %d \n", find(tree->root, 3));
    printf("delete: %d \n", delete(tree->root, tree->root, 8));
    preorderTraversal(tree->root);
    return 0;
}
```

## AVL树(自平衡二叉搜索树)

### 初始化  
同二叉搜索树, 只是多了一个height属性
```cpp
Node* initNode() {
    Node* p = (Node*)malloc(sizeof(Node));
    p->left = NULL;
    p->right = NULL;
    p->value = 0;
    p->height = 1;
    return p;
}
Tree* initTree() {
    Tree* p = (Tree*)malloc(sizeof(Tree));
    p->root = initNode();    
    p->init = 0;
    p->length = 0;
    return p;
}
Node* addCheck(Tree* tree, int value) {
    if (tree->init == 0) {
        tree->init = 1;
        tree->root->value = value;
        return tree->root;
    } else {
        return add(tree->root, value);
    }
}
void removeChect(Tree* tree, int value) {
    if (tree->init == 0) {
    } else {
        removeNode(tree->root, value);
    }
}
```


### 旋转

1. 右旋
```cpp
Node* RightRotation(Node* node) {
    Node* res = node->left;
    node->left = node->left->right;
    res->right = node;
    node->height = getHeight(node);
    res->height = getHeight(res);
    return res;
}
```
2. 左旋
```cpp
Node* LeftRotation(Node* node) {
    Node* res = node->right;
    node->right = node->right->left;
    res->left = node;
    node->height = getHeight(node);
    // res->height = getHeight(res);
    return res;
}
```
::: warning 注意
先旋的节点是node的子节点, 不是node本身
:::
3. 先左后右  
```cpp
Node* LeftRightRotation(Node* node) {
    node->left = LeftRotation(node->left);
    return RightRotation(node);
}
```
4. 先右后左
```cpp
Node* RightLeftRotation(Node* node) {
    node->right = RightRotation(node->right);
    return LeftRotation(node);
}
```

### add  
**注意事项**  
1. 相对于普通的二叉搜索树, AVL树要记录并更新height, 必须用递归才能在添加节点后重回老路, 更新走过的的节点
2. 在判断是否平衡时需要确保height及时被更新
3. 判断旋转方式的条件
```cpp
Node* add(Node* node, int value) {
    if (node == NULL) {
        Node* newNode = initNode();
        newNode->value = value;
        return newNode;
    } else if (value < node->value) {
        node->left = add(node->left, value);
        node->height = getHeight(node);
        if (getBalanceFactor(node) == 2) {
            if (value < node->left->value) {
                node = RightRotation(node);
            } else {
                node = LeftRightRotation(node);
            }
        }
    } else {
        node->right  = add(node->right, value);
        node->height = getHeight(node);
        if (getBalanceFactor(node) == -2) {
            if (value < node->right->value) {
                node = LeftRotation(node);
            } else {
                node = RightLeftRotation(node);
            }
        }
    }
    node->height = getHeight(node);
    return node;
}
```

### remove
**注意事项**  
4. 注意旋转条件
```cpp
Node* removeNode(Node* node, int value) {
    if (node == NULL) {
        return NULL;
    }
    if (value == node->value) {
        if (node->left == NULL && node->right == NULL) {
            return NULL;
        } else if (node->right == NULL) {
            return node->left;
        } else if (node->left == NULL) {
            return node->right;
        } else {
            Node* newNode = reHeightRight(node->right);
            node->value = newNode->value;
            node->right = newNode->right;
        }
    } else if (value < node->value) {
        node->left = removeNode(node->left, value);
        node->height = getHeight(node);
        if (getBalanceFactor(node) == -2) {
            if (getHeight(node->left) > 0) {
                node = RightRotation(node);
            } else {
                node = RightLeftRotation(node);
            }
        }
    } else {
        node->right = removeNode(node->right, value);
        node->height = getHeight(node);
        if (getBalanceFactor(node) == 2) {
            if (getHeight(node->left) > 0) {
                node = LeftRightRotation(node);
            } else {
                node = LeftRotation(node);
            }
        }
    }
    node->height = getHeight(node);
}
```

### 工具方法

1. getHeight
```cpp
int getHeight(Node* node) {
    if (node == NULL) {
        return 0;
    }
    int hl, hr;
    if (node->left == NULL) {
        hl = 0;
    } else {
        hl = node->left->height;
    }
    if (node->right == NULL) {
        hr = 0;
    } else {
        hr = node->right->height;
    }
    return 1 + max(hl, hr);
}
```

2. reHeight  
配合remove使用, 保证当有两个子节点的node被remove后, node.right的min被删除后, node.right的height被更新
```cpp
Node* reHeightRight(Node* node) {
    Node* parent = node;
    if (node->left != NULL) {
        node = node->left;
        Node* newNode = reHeightRight(node);
        node->height = getHeight(node);
        return newNode;
    } else {
        return node;
    }
}
```

3. getBalanceFactor  
获取平衡因子
```cpp
int getBalanceFactor(Node* node) {
    // 获取平衡因子(左子树-右子树, 注意保留负号)
    if (node == NULL) {
        return 0;
    }
    int a = getHeight(node->left) - getHeight(node->right);
    return a;
}
```

### 已知问题
1. 旋转条件有待确认
2. 当根节点被旋转时, tree.root无法及时更新  
已解决: remove方法多传一个Tree* tree, 判断node==tree->root, 如果是,则tree->root = temp
```cpp
if (getBalanceFactor(node) == 2) {
    Node* temp = NULL;
    if (getHeight(node->left) > 0) {
        temp = LeftRightRotation(node);
    } else {
        temp = LeftRotation(node);
    }
    if (node == tree->root) {
        tree->root = temp;
    } else {
        node = temp;
    }
}
```

## 红黑树
::: tip 建议
不建议用递归, 建议用while循环实现, 不是顺序回退, 而是跳连的
:::
![红黑树在线演示](https://rbtree.phpisfuture.com/)

### 第二版

### 初始化
```cpp

typedef struct Node {
    int key;
    int value;
    int color; // 红为1, 黑为0
    struct Node* parent;
    struct Node* left;
    struct Node* right;
} Node;

typedef struct Tree {
    int init;
    Node* root;
} Tree;

void preorderTraversal(Node* node) {
    if (node != NULL) {
        printf("%d %s ", node->value, node->color ? "r" : "b");
        preorderTraversal(node->left);
        preorderTraversal(node->right);
    }
}

Node* initNode() {
    Node* p = (Node*)malloc(sizeof(Node));
    p->key = 0;
    p->value = 0;
    p->color = red;
    p->parent = NULL;
    p->left = NULL;
    p->right = NULL;
    return p;
}

Tree* initTree() {
    Tree* p = (Tree*)malloc(sizeof(Tree));
    p->root = initNode();    
    p->init = 0;
    return p;
}

```

### 旋转  
::: tip 注意
左/右旋与变色是分开的, 这里只有旋转, 变色需要在调用前实现
左右/右左旋的第一次不需要变色, 第二次旋转前的变色已经嵌入两次旋转之间
:::
1. 右旋
```cpp
Node* RightRotation(Node* node, Tree* tree) {
    Node* res = node->left;
    node->left = res->right;
    if (res->right != NULL) 
        res->right->parent = node;
    res->right = node;
    res->parent = node->parent;
    if (node->parent == NULL) {
        tree->root = res;
    } else {
        if (node->parent->left == node) 
            node->parent->left = res;
        else
            node->parent->right = res;
    }
    node->parent = res;
    // if (node == tree->root) {
    //     tree->root = res;
    // }
    return res;
}
```
2. 左旋
```cpp
Node* LeftRotation(Node* node, Tree* tree) {
    Node* res = node->right;
    node->right = res->left;
    if (res->left != NULL) 
        res->left->parent = node;
    res->left = node;   
    res->parent = node->parent;
    if (node->parent == NULL) {
        tree->root = res;
    } else {
        if (node->parent->left == node) 
            node->parent->left = res;
        else
            node->parent->right = res;
    }
    node->parent = res;
    // if (node == tree->root) {
    //     tree->root = res;
    // }
    return res;
} 
```
3. 左右旋
```cpp
Node* LeftRightRotation(Node* node, Tree* tree) {
    node->left = LeftRotation(node->left, tree);
    node->color = red;
    node->left->color = black;
    RightRotation(node, tree);
}
```
4. 右左旋
```cpp
Node* RightLeftRotation(Node* node, Tree* tree) {
    node->right = RightRotation(node->right, tree);
    node->color = red;
    node->right->color = black;
    LeftRotation(node, tree);
}
```

### add
这里只需要找到正确的位置插入即可, fixUp()传入的是新插入的node
```cpp
Node* put(Node* node, int key, int value) {
    Node* parent = NULL;
    Node* newNode = initNode();
    newNode->key = key; newNode->value = value;
    // 1.添加新节点
    while (node != NULL) {
        parent = node;
        if (value < node->value) {
            node = node->left;
            if (node == NULL) {
                parent->left = newNode;
                newNode->parent = parent;
                break;
            }
        }
        else {
            node = node->right;
            if (node == NULL) {
                parent->right = newNode;
                newNode->parent = parent;
                break;
            }
        }
    } 
    return newNode;
}

void putCheck(Tree* tree, int key, int value) {
    if (tree->init == 0) {
        tree->root->key = key;
        tree->root->value = value;
        tree->init = 1;
        tree->root->color = 0;
    } else {
        fixUp(put(tree->root, key, value), tree);
        tree->root->color = black;
    }
}
```
#### remove
删除较为复杂, 这里先把代码一节两半, 以下为文字叙述:
1. while循环目的是找到要删除的点

#### 第一部分, 若有两个子节点   
1. 把点进行对接, 一共可以拆分为4块
2. 若被删除的点是黑色则进fixUp(), 传入的是被删去节点的右子树的最小节点右节点
```cpp
Node* removes(Node* node, int key, int value, Tree* tree) {
    Node* parent = NULL;  // 这个parent是指replace的parent
    Node* child = NULL;
    Node* replace = NULL;
    int color;
    while (node != NULL) {
        // 找到了那个点
        if (node->value == value) {
            // 两个子节点都不为空
            /*
            *共有四次对接过程
            * 1. replace(移动后)和 replace.father
            * 2. replace(移动前).right 和 replace.father
            * 3. replace(移动后) 和 node.right
            * 4. replace(移动前) 和 node.left
            */
            if (node->left != NULL && node->right != NULL) { 
                replace = node->right;
                while (replace->left != NULL) {
                    replace = replace->left;
                }
                // 1.1 
                if (node->parent != NULL) {
                    if (node->parent->left == node) {
                        node->parent->left = replace;
                    } else {
                        node->parent->right = replace;
                    }
                } else {
                    tree->root = replace;
                } 
                child = replace->right;
                parent = replace->parent;
                color = replace->color;
                // 2.
                if (parent == node) {
                    parent = replace;
                } else {
                    // 被替换的节点的兄弟节点要被接到replace.parent上
                    if (child != NULL) {child->parent = parent;}
                    parent->left = child;
                    // 3.
                    replace->right = node->right;
                    node->right->parent = replace;
                }
                // 1.2
                replace->parent = node->parent;
                replace->color = node->color;
                // 4.
                replace->left = node->left;
                node->left->parent = replace;
                
                if (color == black) {
                    if (child != NULL) {
                        fixUp(child, tree);
                    } else {
                        fixUp(parent, tree);
                    }
                }
                node = NULL;
                return NULL;
            }

```

#### 第二部分, 若最多有一个子节点
```cpp
            // 获取node的子节点
            if (node->left != NULL) {
                child = node->left;
            } else {
                child = node->right;
            }
            if (child != NULL) {
                child->parent = node->parent;
            }
            parent = node->parent;
            color = node->color;
            // node.子节点要被接到node.parent上
            if (parent != NULL) {
                if (parent->left == node) {
                    parent->left = child;
                } else {
                    parent->right = child;
                }
            } else {
                // 特殊处理若去掉的节点是根节点
                tree->root = child;
            }
            // 若果删去的点是黑色的, 需要修复
            node = NULL;
            if (child != NULL) {
                fixUp(child, tree);
            } else {
                fixUp(parent, tree);
            }
            return NULL;
        }
        // 继续找到要去除的点
        if (value < node->value) {
            node = node->left;
        } else {
            node = node->right;
        }
    } 
    return NULL;
}
```

### fixUp
这里是核心: 注意回退的跳跃性
1. 若只是变色, 则node = grandparent
2. 若只是左旋或右旋, 则node = parent
3. 若是左右旋或右左旋, 则node = grandparent
```cpp
Node* fixUp(Node* node, Tree* tree) {
    Node* parent;
    Node* grandparent;
    Node* uncle;
    while (node->parent != NULL && node->parent->color == red) {
        parent = node->parent;
        grandparent = parent->parent;
        if (grandparent == NULL) return NULL;
        if (parent == grandparent->left) {
            uncle = grandparent->right;
        } else {
            uncle = grandparent->left;
        }
        if (uncle != NULL && uncle->color == red) {
            uncle->color = black;
            parent->color = black;
            grandparent->color = red;
            node = grandparent;
            continue;
        } else if (uncle == NULL || uncle->color == black) {
            if (grandparent->left == parent) {
                if (parent->left == node) {
                    parent->color = black;
                    grandparent->color = red;
                    RightRotation(grandparent, tree);
                } else {
                    LeftRightRotation(grandparent, tree);
                    node = node->parent;
                }
            } else {
                if (parent->left == node) {
                    RightLeftRotation(grandparent, tree);
                    node = node->parent;
                } else {
                    parent->color = black;
                    grandparent->color = red;
                    RightRotation(grandparent, tree);
                }
            }
        }
    }
}
```

### 测试样例
```cpp
int main(void) {
    Tree* tree = initTree();
    putCheck(tree, 1, 80);
    putCheck(tree, 1, 40);
    putCheck(tree, 1, 160);
    putCheck(tree, 1, 20);
    putCheck(tree, 1, 60);
    // 1.单右旋
    // putCheck(tree, 10);
    // putCheck(tree, 5);
    // 2.左右旋
    // putCheck(tree, 5); putCheck(tree, 11);
    // 3.右左旋
    // putCheck(tree, 30);
    // putCheck(tree, 25);
    // 4.红红
    putCheck(tree, 1, 10);
    putCheck(tree, 1, 30);
    putCheck(tree, 1, 25);
    // 5. 暂时就这样了, 明天再说
    preorderTraversal(tree->root);
    printf("\n");
    // 6. 负载测试
    putCheck(tree, 1, 28);
    putCheck(tree, 1, 22);
    preorderTraversal(tree->root);
    printf("\n");
    putCheck(tree, 1, 23);
    putCheck(tree, 1, 24);
    preorderTraversal(tree->root);
    printf("\n");
    // 删除
    removeChect(tree, 1, 23);
    preorderTraversal(tree->root);
    return 0;
}

```

![参考文章](https://www.cnblogs.com/skywang12345/p/3624343.html)

### 失败的写了一半第一版

#### 初始化

1. 相比于AVL树, 红黑树不再强调高度, 转为由红黑判断是否旋转或变色
2. 因为高度不用改变, 所以用while循环代替递归会更好更容易
```cpp
typedef struct Node {
    int value;
    int color; // 红为1, 黑为0
    struct Node* parent;
    struct Node* left;
    struct Node* right;
} Node;

typedef struct Tree {
    int init;
    Node* root;
} Tree;

Node* initNode() {
    Node* p = (Node*)malloc(sizeof(Node));
    p->value = 0;
    p->color = red;
    p->parent = NULL;
    p->left = NULL;
    p->right = NULL;
    return p;
}

Tree* initTree() {
    Tree* p = (Tree*)malloc(sizeof(Tree));
    p->root = initNode();    
    p->init = 0;
    return p;
}

```

#### add

```cpp
Node* add(Node* node, int value, Tree* tree) {
    // 判断是否递归到nil, 并创建新节点
    if (node == NULL) {
        Node* newNode = initNode();
        newNode->value = value;
        return newNode;
    }
    // 👈
    if (value < node->value) {
        Node* newNode = add(node->left, value, tree);
        // 判断是否发生旋转, 若果旋转了则递归的node与newNode父子关系会发生改变, 要判断并及时继续回退, 知道父子关系正常
        if (newNode == tree->root) {
            return newNode;
        }
        // 若父子关系正常, 则纠正父子关系, 好像只在新建新子节点时真正发挥作用, 待证实,
        // 用递归写真难受
        newNode->parent = node;
        node->left = newNode;
        // 判断是否需要旋转或变色
        // 父节点为红色 
        // node->parent != tree->root 这个待大量测试
        if (node->color != black && node != tree->root  && node->parent != tree->root) {
            Node* newNode = reNode(node, leftdirctction, tree);
            // 如果只换颜色则结构没有调整, 按正常递归走
            if (newNode == NULL) {return node;}
            // 判断根是否被转走了
            else if (newNode->right == tree->root) {
                newNode->parent = NULL;
                newNode->color = black;
                tree->root = newNode;
            } else {
                // 只要进了船, 就不走寻常路
                return newNode;
            } 
        }
    } else { // 👉
        Node* newNode = add(node->right, value, tree);
        if (newNode == tree->root) {
            return newNode;
        } else if (node->parent == newNode) {
            return newNode;
        }
        newNode->parent = node;
        node->right = newNode;
        if (node->color != black && node != tree->root) {
            Node* newNode = reNode(node, rightdirctction, tree);
            if (newNode == NULL) {return node;} 
            else if (newNode->right == tree->root) {
                newNode->parent = NULL;
                newNode->color = black;
                tree->root = newNode;
            } else {
                return newNode;
            } 
        }
    }
    return node;
}



Node* addCheck(Tree* tree, int value) {
    if (tree->init == 0) {
        tree->init = 1;
        tree->root->value = value;
        tree->root->color = black;
        return tree->root;
    } else {
        return add(tree->root, value, tree);
    }
}

```

#### reNode  
用于旋转或变色, 配合图片酌情观看(＞﹏＜)
1. 单旋的情况

```cpp
Node* reNode(Node* node, int isleftdirection, Tree* tree) {
    Node* res = NULL; // 声明返回值
    // 找到需要用得到的节点, father(node) 和 gradfather
    Node* grandfather = node->parent;
    Node* brother = NULL;
    // isleft 父节点是不是爷节点的左支, isleftdirection 子节点是不是父节点的左支
    int isleft = node->value < grandfather->value;
    if (isleft) brother = grandfather->right; else brother = grandfather->left;
    // 若兄弟节点为红色则只换颜色
    if (brother != NULL && brother->color == red) {
        brother->color = black;
        node->color = black;
        grandfather->color = red;
        return NULL;
    } else {
        // 若爷节点和父节点均为红色, 需要把当前节点设为爷节点, 这里用while循环会方便得多, 在此处暂时只处理父节点和爷节点同为红色, 如果再有更高辈的节点, 这里不写了
        if (grandfather->parent == NULL) {
            return node;
        } else if (grandfather->color == red) {
            grandfather = grandfather->parent;
            // 单旋就行
            if (isleft) {
                res = RightRotation(grandfather);
            } else {
                res = LeftRotation(grandfather);
            }
        } else {
            if (isleft) {
                if (isleftdirection) {  // 左左 右旋
                    res = RightRotation(grandfather);
                } else {  // 左右 左右旋
                    res = LeftRightRotation(grandfather);
                }
            } else {
                if (isleftdirection) { // 右右 左旋
                    res = RightLeftRotation(grandfather);
                } else { // 右左 右左旋
                    res = LeftRotation(grandfather);
                }
            }
            return res;
        }
    }
}

```


## 待续...