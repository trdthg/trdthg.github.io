# Haskell 学习

## 1. 开始

**Starting Out**

### 1.1 基本函数
- 最小值:  `min 1 3`
- 最大值:  `max 1 3`
- 加一:  `succ 1` 
- 除:  `div 92 10`

### 1.2 列表

- 合并： `[1,2,3,4] ++ [9,10,11,12] `

- 根据索引取值： ` "Steve Buscemi" !! 6 `

- 开头插入： `'A':" SMALL CAT" `

	> [1,2,3] is actually just syntactic sugar for 1:2:3:[]. 

- 取表头: ` head [1, 2, 3, 4, 5] `

- 取表尾: `tail [1, 2, 3, 4, 5] `

- 取最后一个元素: ` last [1, 2, 3, 4, 5] `

- 取除了最后一个元素： `init [1, 2, 3, 4, 5]`

- 长度： `length [5,4,3,2,1] `

- 是否为空： `null [1,2,3] `

- 反转列表： `reverse [5,4,3,2,1] `

- 取前n个： `take 3 [5,4,3,2,1] `

- 从第n个开始向后取： `drop 3 [8,4,2,1,5,6] `

- 最大元素： `maximum [1,9,2,3,4] `

- 最小元素： `minimum [8,4,2,1,5,6]`

- 加： `sum [5,2,1,6,3,2,5,7] `

- 乘： `product [6,2,1,2] `

- 是否在列表中： `4 `elem` [3,4,5,6] `

### 1.3 生成式

- 循环追加（append）： `cycle [1,2,3]`
- 循环生成（extend）： `repeat 5`

- 生成式： `boomBangs xs = [ if x < 10 then "BOOM!" else "BANG!" | x <- xs, odd x]`

### 1.4 元组

类型随意， 

- fst： `fst ("Wow", False) `
- snd： `snd ("Wow", False)`

### 1.5 重要

- zip
    ```haskell
    zip [5,3,2,6,2,7,2,5,4,6,6] ["im","a","turtle"]
        [(5,"im"),(3,"a"),(2,"turtle")]
    zip [1..] ["apple", "orange", "cherry", "mango"]
        [(1,"apple"),(2,"orange"),(3,"cherry"),(4,"mango")] 
    ```

## 2. 类型系统

**Types and Typeclasses**

### 2.1 查看类型

ghci查看

```haskell
：t (1, "qqq")
```

### 2.2 类型

1. 所有的 `== + - * / ` 都是function

   ```haskell
   ghci> :t (==)  
   (==) :: (Eq a) => a -> a -> Bool
   ```

   > Everything before the => symbol is called a *class constraint*. We can read the previous type declaration like this: the equality  function takes any two values that are of the same type and returns a Bool. The type of those two values must be a member of the Eq class (this was the class constraint).

   - `=>` 之前的被叫做类型约束

#### 2.2.1 Eq

> The Eq typeclass provides an interface for  testing for equality. Any type where it makes sense to test for equality between two values of that type should be a member of the Eq class. All standard Haskell types except for IO (the type for dealing with input and output) and functions are a part of the Eq typeclass.

Eq提供了一个比较的接口， 任何能够比较该类型的两个值之间相等性的都应该是Eq类的成员

#### 2.2.2 Ord

> All the types we covered so far except for functions are part of Ord. Ord covers all the standard comparing functions such as >, <, >= and <=. The compare function takes two Ord members of the same type and returns an ordering. Ordering is a type that can be GT, LT or EQ, meaning *greater than*, *lesser than* and *equal*, respectively. 

Ord包含了所有标准的比较函数， 例如 > < >= <=, 比较函数接受两个类型相同的Ord成员，并返回一个排序，排序是GT， LT， EQ，分别表示大于，小于，等于

```haskell
ghci> "Abrakadabra" < "Zebra"  
True  
ghci> "Abrakadabra" `compare` "Zebra"  
LT  
ghci> 5 >= 2  
True  
ghci> 5 `compare` 3  
GT  
```

#### 2.2.3 Show

> Members of Show can be presented as strings. All types covered so far except for functions are a part of Show. The most used function that deals with the Show typeclass is show. It takes a value whose type is a member of Show and presents it to us as a string.

Show的成员可以被打印为字符串，到目前为止，除了函数之外的所有类型都是 Show 的一部分。

show函数接受一个类型为Show成员的值，并将其作为字符串呈现

```haskell
ghci> :t read  
read :: (Read a) => String -> a  
```



#### 2.2.4 Read

> Read is sort of the opposite typeclass of Show. The read function takes a string and returns a type which is a member of Read.

read函数接受一个String，并返回一个Read的成员的类型

**问题**

```haskell
ghci> read "4"  
    <interactive>:1:0:  
        Ambiguous type variable `a' in the constraint:  
        	`Read a' arising from a use of `read' at <interactive>:1:0-7  
        Probable fix: add a type signature that fixes these type variable(s)  
```

**指定return类型**

```haskell
ghci> read "5" :: Int  
5  
ghci> read "5" :: Float  
5.0  
ghci> (read "5" :: Float) * 4  
20.0  
ghci> read "[1,2,3,4]" :: [Int]  
[1,2,3,4]  
ghci> read "(3, 'a')" :: (Int, Char)  
(3, 'a')  
```

#### 2.2.5 Enum

> Enum members are sequentially ordered types — they can be enumerated. The main advantage of the Enum typeclass is that we can use its types in list ranges. They also have  defined successors and predecesors, which you can get with the succ and pred functions. Types in this class: (), Bool, Char, Ordering, Int, Integer, Float and Double.

枚举类型是按照顺序排序的类型，他们可以被枚举，我们可以在列表中使用它的所有类型。

他们还被定义了前驱和后继，因此可以对它的类型使用 `succ` 和 `pred` 函数

```haskell
ghci> ['a'..'e']  
"abcde"  
ghci> [LT .. GT]  
[LT,EQ,GT]  
ghci> [3 .. 5]  
[3,4,5]  
ghci> succ 'B'  
'C'  
```

#### 2.2.6 Bounded

> Bounded members have an upper and a lower bound.

Bounded类型有上界和下界

```haskell
ghci> minBound :: Int  
-2147483648  
ghci> maxBound :: Char  
'\1114111'  
ghci> maxBound :: Bool  
True  
ghci> minBound :: Bool  
False  
```

> minBound and maxBound are interesting because they have a type of (Bounded a) => a. In a sense they are polymorphic constants.

他们是多态性常量，见下文

如果元组的元素也在元组中，那么这个元组也是Bounded的成员。

```haskell
ghci> maxBound :: (Bool, Int, Char)  
(True,2147483647,'\1114111')  
```

#### 2.2.7 Num

Num也是一个多态性常量，他能表现的向任何Num类的成员（包括 Int, Integer, Float, Double）

```haskell
ghci> :t 20  
20 :: (Num t) => t  

ghci> 20 :: Int  
20  
ghci> 20 :: Integer  
20  
ghci> 20 :: Float  
20.0  
ghci> 20 :: Double  
20.0  
```

`(5 :: Int) * (6 :: Integer)` will error， while `5 * (6 :: Integer)`  will work just fine

#### 2.2.9 Integral & Floating

- `Integral `contains ` Int` and `Integer`

- `Floating` contains `Float` and `Double`.

`fromIntegral`可以帮我们实现类型转换

```haskell
-- It has a type declaration of
fromIntegral :: (Num b, Integral a) => a -> b
-- so, you can use it as
fromIntegral (length [1,2,3,4]) + 3.2
```

## 3. 函数语法 

**Syntax in Functions**

