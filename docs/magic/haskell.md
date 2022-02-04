# Haskell 学习

⭐️[Learn You a Haskell for Great Good!](http://learnyouahaskell.com/chapters)

## 0. 特性

1. > We usually use ' to either denote a strict  version of a function (one that isn't lazy) or a slightly modified  version of a function or a variable. Because ' is a valid character in functions, we can make a function like this.
   >

   `‘` 在haskell中是声明的合法字符， 一般中加 `’` 的函数代表一个函数的修改版本或者严格版本

## 1. 开始

**Starting Out**

### 1.1 基本函数

- 最小值:  `min 1 3`
- 最大值:  `max 1 3`
- 加一:  `succ 1`

### 1.2 列表

- 合并： `[1,2,3,4] ++ [9,10,11,12] `
- 根据索引取值： `"Steve Buscemi" !! 6`
- 开头插入： `'A':" SMALL CAT" `

  > [1,2,3] is actually just syntactic sugar for 1:2:3:[].
  >
- 取表头: `head [1, 2, 3, 4, 5]`
- 取表尾: `tail [1, 2, 3, 4, 5] `
- 取最后一个元素: `last [1, 2, 3, 4, 5]`
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
- 是否在列表中： `4 `elem `[3,4,5,6]`

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

### 2.2 Typeclasses 101

所有的 `== + - * / ` 都是function

```haskell
ghci> :t (==)
(==) :: (Eq a) => a -> a -> Bool
```

> Everything before the => symbol is called a *class constraint*. We can read the previous type declaration like this: the equality  function takes any two values that are of the same type and returns a Bool. The type of those two values must be a member of the Eq class (this was the class constraint).

- `=>` 之前的被叫做类型约束

**Type variables**

```haskell
ghci> :t head
head :: [a] -> a
```

a 就是类型变量， 但是由于a不是某一个特定的类型， 所以我们称 head 多态函数

> Functions that have type variables are called **polymorphic functions**.

**Typeclasses** 就是类型约束

下面举出了一系列常用的Typeclasses

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

### 3.1 Match表达式

**Pattern marching**

1. 在 ghci 中声明类型需要使用多行块中

   ```haskell
   :{
   lucky :: Int -> String
   lucky a = show(a)
   :}

   :type lucky
   lucky :: Int -> String
   ```
2. 匹配列表长度

   ```haskell
   tell :: (Show a) => [a] -> String
   tell [] = "The list is empty"
   tell (x:[]) = "The list has one element: " ++ show x
   tell (x:y:[]) = "The list has two elements: " ++ show x ++ " and " ++ show y
   tell (x:y:_) = "This list is long. The first two elements are: " ++ show x ++ " and " ++ show y
   ```
3. 一个 length 函数的实现

   ```haskell
   length' :: (Num b) => [a] -> b
   length' [] = 0
   length' (_:xs) = 1 + length' xs
   ```

### 3.2 Guard

1. 标准

   ```haskell
   bmiTell :: (RealFloat a) => a -> String
   bmiTell bmi
      | bmi <= 18.5 = "You're underweight, you emo, you!"
      | bmi <= 25.0 = "You're supposedly normal. Pffft, I bet you're ugly!"
      | bmi <= 30.0 = "You're fat! Lose some weight, fatty!"
      | otherwise   = "You're a whale, congratulations!"

   myCompare :: (Ord a) => a -> a -> Ordering
   a `myCompare` b
       | a > b     = GT
       | a == b    = EQ
       | otherwise = LT
   ```
2. inline 版（可读性差）

   ```haskell
   max' :: (Ord a) => a -> a -> a
   max' a b | a > b = a | otherwise = b
   ```

### 3.3 where

1. 作用在guard上

   ```haskell
       bmiTell :: (RealFloat a) => a -> a -> String
       bmiTell weight height
           | bmi <= skinny = "You're underweight, you emo, you!"
           | bmi <= normal = "You're supposedly normal. Pffft, I bet you're ugly!"
           | bmi <= fat    = "You're fat! Lose some weight, fatty!"
           | otherwise     = "You're a whale, congratulations!"
           where bmi = weight / height ^ 2
                 skinny = 18.5
                 normal = 25.0
                 fat = 30.0
   ```

   > *where* bindings aren't shared across function bodies of different  patterns. If you want several patterns of one function to access some  shared name, you have to define it globally.
   >

   where 的绑定不能在函数体里共享，除非以全局方式定义
2. 作用在 pattern match 上

   ```haskell
       initials :: String -> String -> String
       initials firstname lastname = [f] ++ ". " ++ [l] ++ "."
           where (f:_) = firstname
                 (l:_) = lastname
   ```
3. 使用 where 定义 function

   ```haskell
       calcBmis :: (RealFloat a) => [(a, a)] -> [a]
       calcBmis xs = [bmi w h | (w, h) <- xs]
           where bmi weight height = weight / height ^ 2
   ```

### 3.4 Let it be

** `let <bindings> in <expression> `**

```haskell
    cylinder :: (RealFloat a) => a -> a -> a
    cylinder r h =
        let sideArea = 2 * pi * r * h
            topArea = pi * r ^2
        in  sideArea + 2 * topArea
```

> The difference is that *let* bindings are expressions themselves. *where* bindings are just syntactic constructs.

Let 把绑定放在前面，where 把绑定放在后面， 但是 Let 是一个表达式， Where只是个语法结构

### 3.5 Case Expression

- 示例 1

  ```haskell
  describeList :: [a] -> String
  describeList xs = "The list is " ++ case xs of [] -> "empty."
                                                 [x] -> "a singleton list."
                                                 xs -> "a longer list."
  ```
- 示例 2

  ```haskell
  describeList :: [a] -> String
  describeList xs = "The list is " ++ what xs
      where what [] = "empty."
            what [x] = "a singleton list."
            what xs = "a longer list."
  ```

## 4. 递归

**Recursion**

```
### 4.1 maxium
```

```haskell
-- 第一种
maximum' :: (Ord a) => [a] -> a
maximum' [] = error "maximum of empty list"
maximum' [x] = x
maximum' (x:xs)
    | x > maxTail = x
    | otherwise = maxTail
    where maxTail = maximum' xs
-- 第二种
maximum' :: (Ord a) => [a] -> a
maximum' [] = error "maximum of empty list"
maximum' [x] = x
maximum' (x:xs) = max x (maximum' xs)
```

### 4.2 replicate

```haskell
replicate' :: (Num i, Ord i) => i -> a -> [a]
replicate' n x
    | n <= 0    = []
    | otherwise = x:replicate' (n-1) x
```

### 4.3 take

```haskell
take' :: (Num i, Ord i) => i -> [a] -> [a]
take' n _
    | n <= 0   = []
take' _ []     = []
take' n (x:xs) = x : take' (n-1) xs
```

### 4.4 zip

```haskell
elem' :: (Eq a) => a -> [a] -> Bool
elem' a [] = False
elem' a (x:xs)
    | a == x    = True
    | otherwise = a `elem'` xs
```

### 4.5 quick sort

```haskell
quicksort :: (Ord a) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) =
    let smallerSorted = quicksort [a | a <- xs, a <= x]
        biggerSorted = quicksort [a | a <- xs, a > x]
    in  smallerSorted ++ [x] ++ biggerSorted
quicksort (x:xs) = quicksort [a | a <- xs, a <= x] ++ [x] ++ quicksort [a | a <- xs, a > x]
```

## 5. 高阶函数

*Higher order functions*

能够以函数作为参数, 或者返回一个函数的函数都是高阶函数, 告诫函数就是Haskell的体验

### 5.1 Curried functions

```haskell
ghci> max 4 5
5
-- max本身可以这样写
ghci> (max 4) 5
5
```

让我们看看max的类型

```haskell
max :: (Ord a) => a -> a -> a.
-- 也能写作
max :: (Ord a) => a -> (a -> a).
```

所以max这个函数能够返回一个函数

同时

### 5.2 一些高阶函数

```haskell
applyTwice :: (a -> a) -> a -> a
applyTwice f x = f (f x)

ghci> applyTwice (+3) 10
16
```

```haskell
zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' _ [] _ = []
zipWith' _ _ [] = []
zipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys

zipWith' (++) ["aaa", "bbb"] ["ccc", "ddd"]
["aaaccc","bbbddd"]
```

**flip**

```haskell
flip' :: (a -> b -> c) -> b -> a -> c
flip' f y x = f x y
```

### 5.3 Map

> `map (+3) [1,5,3,1,6] `is the same as writing `[x+3 | x <- [1,5,3,1,6]].`

```haskell
    map :: (a -> b) -> [a] -> [b]
    map _ [] = []
    map f (x:xs) = f x : map f xs
```

### 5.4 Filter

```haskell
    filter :: (a -> Bool) -> [a] -> [a]
    filter _ [] = []
    filter p (x:xs)
        | p x       = x : filter p xs
        | otherwise = filter p xs
```

### 5.5 takeWhile

take直到限制条件到

```haskell
sum (takeWhile (<10000) (filter odd (map (^2) [1..])))

sum (takeWhile (<10000) [n^2 | n <- [1..], odd (n^2)])
```

### 5.6 Chain

生成 Collatz sequences

```haskell
chain :: (Integral a) => a -> [a]
chain 1 = [1]
chain n
    | even n =  n:chain (n `div` 2)
    | odd n  =  n:chain (n*3 + 1)

-- 小练习
numLongChains :: Int
numLongChains = length (filter isLong (map chain [1..100]))
    where isLong xs = length xs > 15
```

### 5.7 map (*) [0..]

> If we map `*` over the list ` [0..]`, we get back a list of functions that only take one parameter, so `(Num a) => [a -> a]`. `map (*) [0..]` produces a list like the one we'd get by writing `[(0*),(1*),(2*),(3*),(4*),(5*)...`

实例代码

```haskell
ghci> let listOfFuns = map (*) [0..]
ghci> (listOfFuns !! 4) 5
20
```

### 5.8 Lambdas

语法: 一般以小括号阔起来, 以 `\` 开头

```haskell
numLongChains :: Int
numLongChains = length (filter (\xs -> length xs > 15) (map chain [1..100]))
```

一个比较好的用发

```haskell
flip' :: (a -> b -> c) -> b -> a -> c
flip' f = \x y -> f y x
```

### 5.9 Fold

我们用 *fold* 再次实现 `sum` 函数

```haskell
sum' :: (Num a) => [a] -> a
sum' xs = foldl (\acc x -> acc + x) 0 xs
ghci> sum' [3,5,2,1]
11
```

1. **foldl** 接受2个参数, 分别是函数和一个初始值(或者说累加器), acc开始为0, 之后依次加 3, 5, 2, 1

函数的第一个参数是累加器, 第二个是当前的值

```haskell
-- 再次实现 elem
elem' :: (Eq a) => a -> [a] -> Bool
elem' x xs = foldl (\acc el -> if el == x then True else acc) False xs
```

2. **foldr** 与 foldl 相似, 不过是从右侧开始遍历元素, 其中, foldr的第一个参数是当前元素, 第二个元素是 acc 累加器
3. **两种map的实现**

   ```haskell
   -- foldr
   map' :: (a -> b) -> [a] -> [b]
   map' f xs = foldr (\x acc -> f x : acc) [] xs
   -- foldl
   map' f xs = foldl (\acc x -> acc ++ [f x]) [] xs
   ```

   在上面的案例中,  `foldr` 实现的更好, 因为 `:` 的开销比 `++` 小的多
4. 要注意的是 foldr 可以作用在无线列表上, foldl 不能
5. **foldl1** 和 **foldr1** 使用第一个或者最后一个作为初值, 不需要那个参数了

   ```haskell
   -- 这里是一堆例子
   maximum' :: (Ord a) => [a] -> a
   maximum' = foldr1 (\x acc -> if x > acc then x else acc)

   reverse' :: [a] -> [a]
   reverse' = foldl (\acc x -> x : acc) []

   product' :: (Num a) => [a] -> a
   product' = foldr1 (*)

   filter' :: (a -> Bool) -> [a] -> [a]
   filter' p = foldr (\x acc -> if p x then x : acc else acc) []

   head' :: [a] -> a
   head' = foldr1 (\x _ -> x)

   last' :: [a] -> a
   last' = foldl1 (\_ x -> x)
   ```
6. **scanl** 和 **scanr** 和fold类似, 不过会把中间的状态保留, 并返回一个列表

   ```haskell
   ghci> scanl (+) 0 [3,5,2,1]
   [0,3,8,10,11]
   ghci> scanr (+) 0 [3,5,2,1]
   [11,8,3,1,0]
   ghci> scanl1 (\acc x -> if x > acc then x else acc) [3,4,5,3,7,9,2,1]
   [3,4,5,5,7,9,9,9]
   ghci> scanl (flip (:)) [] [3,2,1]
   [[],[3],[2,3],[1,2,3]]
   ```

### 5.10 $ 运算符

> Whereas normal function application (putting a space between two things) has a really high precedence, the $ function has the lowest precedence. Function application with a space is left-associative (so f a b c is the same as ((f a) b) c)), function application with $ is right-associative.

空格具有较高的优先级, 但是 `$` 具有最低的优先级

使用空格分割的是左关联的, 而使用 `$` 分割的是右关联的

有什么用?

1. 少些括号

   `sum (map sqrt [1..130])` 可以用 `sum $ map sqrt [1..130]` 代替, `sqrt 3 + 4 + 9`是13+根号3, 但是 `sqrt $ 3 + 4 + 9` 就正常

   []:

   > How about sum (filter (> 10) (map (*2) [2..10]))? Well, because $ is right-associative, f (g (z x)) is equal to f $ g $ z x. And so, we can rewrite sum (filter (> 10) (map (*2) [2..10])) as sum $ filter (> 10) $ map (*2) [2..10].
   >
2. 增加特性

加了 `$` 意味着可以被当作函数来对待， 所以下面的写法是可行的

```haskell
ghci> map ($ 3) [(4+), (10*), (^2), sqrt]
[7.0,30.0,9.0,1.7320508075688772]
```

### 5.11 函数组合

`.` 是一个运算符， 他的定义如下

```haskell
(.) :: (b -> c) -> (a -> b) -> a -> c
f . g = \x -> f (g x)
```

有了这个后， 一些嵌套的函数就能简写， 例如

```haskell
-- before
ghci> map (\x -> negate (abs x)) [5,-3,-6,7,-3,2,-19,24]
[-5,-3,-6,-7,-3,-2,-19,-24]
-- now
ghci> map (negate . abs) [5,-3,-6,7,-3,2,-19,24]
[-5,-3,-6,-7,-3,-2,-19,-24]
```

## 6. 模块

**Modules**

### 6.1 导入模块

1. 导入

```haskell
-- 1. 导入一个模块
ghci> import Data.List
-- 2. 导入多个模块
ghci> :m + Data.List Data.Map Data.Set
-- 3. 导入某些函数
ghci> import Data.List (nub, sort)
-- 4. 不导入某些指定的函数
ghci> import Data.List hiding (nub)
```

2. As

```haskell
-- 避免重名， 但是使用时必须指定 Data.Map.filter
import qualified Data.Map
-- 换名， 可以用 M.filter
import qualified Data.Map as M
```

### 6.2 Data.List

1. intersperse

   向List中填充元素*, 类似与python中的 join

   ```haskell
   ghci> intersperse '.' "MONKEY"
   "M.O.N.K.E.Y"
   ghci> intersperse 0 [1,2,3,4,5,6]
   [1,0,2,0,3,0,4,0,5,0,6]
   ```
2. intercalate

   join后进行concat, 填充后合并返回,

   ```haskell
   ghci> intersperse '.' "MONKEY"
   "M.O.N.K.E.Y"
   ghci> intersperse 0 [1,2,3,4,5,6]
   [1,0,2,0,3,0,4,0,5,0,6]
   ```
3. transpose

   矩阵转置

   ```haskell
   ghci> transpose [[1,2,3],[4,5,6],[7,8,9]]
   [[1,4,7],[2,5,8],[3,6,9]]
   ghci> transpose ["hey","there","guys"]
   ["htg","ehu","yey","rs","e"]
   ```
4. foldl' foldl1'

   能够立即运算， 防止堆栈溢出

   > foldl' and foldl1' are stricter versions of their respective lazy incarnations. When using lazy folds on really big lists, you might often get a stack overflow  error. The culprit for that is that due to the lazy nature of the folds, the accumulator value isn't actually updated as the folding happens.  What actually happens is that the accumulator kind of makes a promise  that it will compute its value when asked to actually produce the result (also called a thunk). That happens for every intermediate accumulator  and all those thunks overflow your stack. The strict folds aren't lazy  buggers and actually compute the intermediate values as they go along  instead of filling up your stack with thunks. So if you ever get stack  overflow errors when doing lazy folds, try switching to their strict  versions.
   >
5. concat

   和并所有元素并返回

   ```haskell
   ghci> concat ["foo","bar","car"]
   "foobarcar"
   ghci> concat [[3,4,5],[2,3,4],[2,1,1]]
   [3,4,5,2,3,4,2,1,1]
   ```

   **concatMap == concat map**
6. and & or

   需要配合map使用

   > and takes a list of boolean values and returns True only if all the values in the list are True.
   >

   全为真返回True

   ```haskell
   ghci> and $ map (>4) [5,6,7,8]
   True
   ghci> and $ map (==4) [4,4,4,3,4]
   False
   ```

   > or is like and, only it returns True if any of the boolean values in a list is True.
   >

   有真就返回True

   ```haskell
   ghci> or $ map (==4) [2,3,4,5,6,1]
   True
   ghci> or $ map (>4) [1,2,3]
   False
   ```
7. all & any

   and 和 or 的替代品

   ```haskell
   ghci> any (==4) [2,3,5,6,1,4]
   True
   ghci> all (>4) [6,9,10]
   True
   ghci> all (`elem` ['A'..'Z']) "HEYGUYSwhatsup"
   False
   ghci> any (`elem` ['A'..'Z']) "HEYGUYSwhatsup"
   True
   ```
8. iterate

   根据每次的结果生成下一次的值

   ```haskell
   Prelude> take 10 (iterate (+10) 0)
   [0,10,20,30,40,50,60,70,80,90]
   Prelude> take 5 $ iterate (++ "haha") "haha"
   ["haha","hahahaha","hahahahahaha","hahahahahahahaha","hahahahahahahahahaha"]
   ```
9. splitAt

   分割生成列表

   ```haskell
   ghci> splitAt 3 "heyman"
   ("hey","man")
   ghci> splitAt 100 "heyman"
   ("heyman","")
   ghci> splitAt (-3) "heyman"
   ("","heyman")
   ghci> let (a,b) = splitAt 3 "foobar" in b ++ a
   "barfoo"
   ```
10. takeWhile & dropWhile

    根据条件 take或drop

    ```haskell
    ghci> takeWhile (>3) [6,5,4,3,2,1,2,3,4,5,4,3,2,1]
    [6,5,4]
    ghci> takeWhile (/=' ') "This is a sentence"
    "This"

    ghci> dropWhile (/=' ') "This is a sentence"
    " is a sentence"
    ghci> dropWhile (<3) [1,2,2,2,3,4,5,4,3,2,1]
    [3,4,5,4,3,2,1]
    ```
11. break & span

    就是把takeWhile的后半部分也返回了

    ```haskell
    ghci> break (==4) [1,2,3,4,5,6,7]
    ([1,2,3],[4,5,6,7])
    ghci> span (/=4) [1,2,3,4,5,6,7]
    ([1,2,3],[4,5,6,7])
    ```
12. sort

    排序呗

    ```haskell
    ghci> sort [8,5,3,2,1,6,4,2]
    [1,2,2,3,4,5,6,8]
    ghci> sort "This will be sorted soon"
    "    Tbdeehiillnooorssstw"
    ```
13. group

    分组但不排序

    ```haskell
    ghci> group [1,1,1,1,2,2,2,2,3,3,2,2,2,5,6,7]
    [[1,1,1,1],[2,2,2,2],[3,3],[2,2,2],[5],[6],[7]]
    ```
14. inits & tails

    生成一个前缀和

    ```haskell
    ghci> inits "w00t"
    ["","w","w0","w00","w00t"]
    ghci> tails "w00t"
    ["w00t","00t","0t","t",""]
    ghci> let w = "w00t" in zip (inits w) (tails w)
    [("","w00t"),("w","00t"),("w0","0t"),("w00","t"),("w00t","")]
    ```
15. isInfixOf & isPrefixOf & isSuffixOf

    是否是sublist, 是否在开头, 是否在结尾

    ```haskell
    ghci> "cat" `isInfixOf` "im a cat burglar"
    True
    ghci> "Cat" `isInfixOf` "im a cat burglar"
    False
    ghci> "cats" `isInfixOf` "im a cat burglar"
    False

    ghci> "hey" `isPrefixOf` "hey there!"
    True
    ghci> "hey" `isPrefixOf` "oh hey there!"
    False
    ghci> "there!" `isSuffixOf` "oh hey there!"
    True
    ghci> "there!" `isSuffixOf` "oh hey there"
    False
    ```
16. elem & notElem & partition

```
判断是否是, 分为两组

```haskell
ghci> partition (`elem` ['A'..'Z']) "BOBsidneyMORGANeddy"
("BOBMORGAN","sidneyeddy")
```

```

17. find & findIndex & findIndices

```

find返回第一个符合的元素

```haskell
ghci> find (>4) [1,2,3,4,5,6]
Just 5
ghci> find (>9) [1,2,3,4,5,6]
Nothing
ghci> :t find
find :: (a -> Bool) -> [a] -> Maybe a

ghci> findIndex (==4) [5,3,2,1,6,4]
Just 5
ghci> findIndex (==7) [5,3,2,1,6,4]
Nothing
ghci> findIndices (`elem` ['A'..'Z']) "Where Are The Caps?"
[0,6,10,14]
```

```

18. elemIndex  & elemIndIces

    返回元素的index

    ```haskell
    ghci> :t elemIndex
    elemIndex :: (Eq a) => a -> [a] -> Maybe Int
    ghci> 4 `elemIndex` [1,2,3,4,5,6]
    Just 3
    ghci> 10 `elemIndex` [1,2,3,4,5,6]
    Nothing

    ghci> ' ' `elemIndices` "Where are the spaces?"
    [5,9,13]
    ```
19. more zip

    一直提供到7

    ```haskell
    ghci> zipWith3 (\x y z -> x + y + z) [1,2,3] [4,5,2,2] [2,2,3]
    [7,9,8]
    ghci> zip4 [2,3,3] [2,2,2] [5,5,3] [2,2,2]
    [(2,2,5,2),(3,2,5,2),(3,2,3,2)]
    ```
20. line & word

    line 切出没一行, word切出每个单词

    ```haskell
    ghci> lines "first line\nsecond line\nthird line"
    ["first line","second line","third line"]
    ghci> unlines ["first line", "second line", "third line"]
    "first line\nsecond line\nthird line\n"
    ghci> words "hey these are the words in this sentence"
    ["hey","these","are","the","words","in","this","sentence"]
    ghci> words "hey these           are    the words in this\nsentence"
    ["hey","these","are","the","words","in","this","sentence"]
    ghci> unwords ["hey","there","mate"]
    "hey there mate"
    ```
21. nub

    元素去重

    ```haskell
    ghci> nub [1,2,3,4,3,2,1,2,3,4,3,2,1]
    [1,2,3,4]
    ghci> nub "Lots of words and stuff"
    "Lots fwrdanu"
    ```
22. delete

    删掉地一个匹配的元素

    ```haskell
    -- delete takes an element and a list and deletes the first occurence of that element in the list.

    ghci> delete 'h' "hey there ghang!"
    "ey there ghang!"
    ghci> delete 'h' . delete 'h' $ "hey there ghang!"
    "ey tere ghang!"
    ghci> delete 'h' . delete 'h' . delete 'h' $ "hey there ghang!"
    "ey tere gang!"
    ```
23. \\\\

```

删掉更多

```haskell
-- \\ is the list difference function. It acts like a set difference, basically. For every element in the right-hand list, it removes a matching element in the left one.

ghci> [1..10] \\ [2,5,9]
[1,3,4,6,7,8,10]
ghci> "Im a big baby" \\ "big"
"Im a  baby"
```

```

24. union

    求并集

    ```haskell
    ghci> "hey man" `union` "man what's up"
    "hey manwt'sup"
    ghci> [1..7] `union` [5..10]
    [1,2,3,4,5,6,7,8,9,10]
    ```
25. intersect

    求交集

    ```haskell
    ghci> [1..7] `intersect` [5..10]
    [5,6,7]
    ```
26. insert

    插入呗

    ```haskell
    ghci> insert 4 [3,5,1,2,8,2]
    [3,4,5,1,2,8,2]
    ghci> insert 4 [1,3,4,4,1]
    [1,3,4,4,4,1]
    ```
27. deleteBy, unionBy, intersectBy and groupBy

    以一个数开始， 以此比较他后面的数，知道不匹配， 组成数组

    接着以第一个不匹配的数开始，重复比较

    ```haskell
    ghci> let values = [-4.3, -2.4, -1.2, 0.4, 2.3, 5.9, 10.5, 29.1, 5.3, -2.4, -14.5, 2.9, 2.3]
    ghci> groupBy (\x y -> (x > 0) == (y > 0)) values
    -- 也可以写成 \x y -> (x > 0) && (y > 0) || (x <= 0) && (y <= 0)
    [[-4.3,-2.4,-1.2],[0.4,2.3,5.9,10.5,29.1,5.3],[-2.4,-14.5],[2.9,2.3]]
    ghci> groupBy (\x y -> (x>0) == (y<0)) values
    -- 第一个数和后面的符号都不同
    [[-4.3],[-2.4],[-1.2,0.4,2.3,5.9,10.5,29.1,5.3],[-2.4],[-14.5,2.9,2.3]]
    ```
28. on

    还有更好的方法写上面的 lambada 表达式

    on 需要从 Data.Function 导入

    on接受两个参数，第二个会对参数做的运算， 第一个是函数会比较两个运算后结果

    ```haskell
    on :: (b -> b -> c) -> (a -> b) -> a -> a -> c
    f `on` g = \x y -> f (g x) (g y)
    ```

### 6.3 Data.Char

Data.Char 提供了一系列处理字符的函数，配合 map 和 filter 使用也可以用来处理字符串

**1. 判断类**

1. isControl checks whether a character is a control character.
2. isSpace checks whether a character is a white-space characters. That includes spaces, tab characters, newlines, etc.
3. isLower checks whether a character is lower-cased.
4. isUpper checks whether a character is upper-cased.
5. isAlpha checks whether a character is a letter.
6. isAlphaNum checks whether a character is a letter or a number.
7. isPrint checks whether a character is printable. Control characters, for instance, are not printable.
8. isDigit checks whether a character is a digit.
9. isOctDigit checks whether a character is an octal digit.
10. isHexDigit checks whether a character is a hex digit.
11. isLetter checks whether a character is a letter.
12. isMark checks for Unicode mark characters. Those are characters that combine with preceding letters to form latters with accents. Use this if you are French.
13. isNumber checks whether a character is numeric.
14. isPunctuation checks whether a character is punctuation.
15. isSymbol checks whether a character is a fancy mathematical or currency symbol.
16. isSeparator checks for Unicode spaces and separators.
17. isAscii checks whether a character falls into the first 128 characters of the Unicode character set.
18. isLatin1 checks whether a character falls into the first 256 characters of Unicode.
19. isAsciiUpper checks whether a character is ASCII and upper-case.
20. isAsciiLower checks whether a character is ASCII and lower-case.

**2. 转换类**

1. toUpper converts a character to upper-case. Spaces, numbers, and the like remain unchanged.
2. toLower converts a character to lower-case.
3. toTitle converts a character to title-case. For most characters, title-case is the same as upper-case.
4. digitToInt converts a character to an Int. To succeed, the character must be in the ranges '0'..'9', 'a'..'f' or 'A'..'F'.
5. intToDigit is the inverse function of digitToInt. It takes an Int in the range of 0..15 and converts it to a lower-case character.
6. ord and chr convert characters to their corresponding numbers and vice versa:

   ```haskell
   ghci> ord 'a'
   97
   ghci> chr 97
   'a'
   ghci> map ord "abcdefgh"
   [97,98,99,100,101,102,103,104]
```

7. encode

   ```haskell
   -- 一种编码方式
   encode :: Int -> String -> String
   encode shift msg =
   	let ords = map ord msg
   		shifted = map (+ shift) ords
   	in  map chr shifted
   -- 另一种实现
   map (chr . (+ shift) . ord) msg.
   -- 实例代码
   ghci> encode 3 "Heeeeey"
   "Khhhhh|"
   ghci> encode 4 "Heeeeey"
   "Liiiii}"
   ghci> encode 1 "abcd"
   "bcde"
   ghci> encode 5 "Marry Christmas! Ho ho ho!"
   "Rfww~%Hmwnxyrfx&%Mt%mt%mt&"
   ```

### 6.4 Data.Map

下面给出了几种写map的方法

```haskell
-- 第一种 filter实现
findKey :: (Eq k) => k -> [(k, v)] -> v
findKey key xs = (snd . head . filter (\ (k, v) -> key == k)) xs

-- 第二种 Maybe非空校验
findKey :: (Eq k) => k -> [(k, v)] -> Maybe v
findKey _ [] = Nothing
findKey key ((k, v):xs) = if k == key
                                                        then Just v
                                                        else findKey key xs

-- 第三种 使用foldr而非递归，因为比递归的可读性更好
-- Note: It's usually better to use folds for this standard list recursion pattern instead of explicitly writing the recursion because they're easier to read and identify. Everyone knows it's a fold when they see the foldr call, but it takes some more thinking to read explicit recursion.
findKey :: (Eq k) => k -> [(k,v)] -> Maybe v
findKey key xs = foldr (\(k,v) acc -> if key == k then Just v else acc) Nothing xs

main :: IO ()
main = do
        let phoneBook =
                [("aaa","111")
                ,("bbb","222")
                ,("ccc","333")
                ]
        print $ findKey "bbb" phoneBook
```

下面是一堆函数

1. fromList

   创建一个Map

   ```haskell
   ghci> Map.fromList [("betty","555-2938"),("bonnie","452-2928"),("lucille","205-2928")]
   fromList [("betty","555-2938"),("bonnie","452-2928"),("lucille","205-2928")]
   ghci> Map.fromList [(1,2),(3,4),(3,2),(5,5)]
   fromList [(1,2),(3,2),(5,5)]
   ```

   自己实现

   ```haskell
   -- We can implement our own fromList by using the empty map, insert and a fold. Watch:

   fromList' :: (Ord k) => [(k,v)] -> Map.Map k v
   fromList' = foldr (\(k,v) acc -> Map.insert k v acc) Map.empty
   ```
2. empty

   返回一个空Map

   ```haskell
   ghci> Map.empty 
   fromList []  
   ```
3. insert

   插入一对k， v

   ```haskell
   ghci> Map.empty
   fromList []
   ghci> Map.insert 3 100 Map.empty
   fromList [(3,100)]
   ghci> Map.insert 5 600 (Map.insert 4 200 ( Map.insert 3 100  Map.empty))
   fromList [(3,100),(4,200),(5,600)]
   ghci> Map.insert 5 600 . Map.insert 4 200 . Map.insert 3 100 $ Map.empty
   fromList [(3,100),(4,200),(5,600)]
   ```
4. null

   检查是否为空

   ```haskell
   ghci> Map.null Map.empty
   True
   ghci> Map.null $ Map.fromList [(2,3),(5,5)]
   False
   ```
5. size

   返回map的大小

   ```haskell
   ghci> Map.size Map.empty
   0
   ghci> Map.size $ Map.fromList [(2,4),(3,3),(4,2),(5,4),(6,4)]
   5
   ```
6. singleton

   重建只有一对kv的Map

   ```haskell
   ghci> Map.singleton 3 9
   fromList [(3,9)]
   ghci> Map.insert 5 9 $ Map.singleton 3 9
   fromList [(3,9),(5,9)]
   ```
7. lookup

   就是get

   ```haskell
   Prelude Map> Map.lookup 4 a
   Just 200
   ```
8. member

   就是in

   ```haskell
   ghci> Map.member 3 $ Map.fromList [(3,6),(4,3),(6,9)]
   True
   ghci> Map.member 3 $ Map.fromList [(2,5),(4,5)]
   False
   ```
9. map and filter

   只作用于 v

   ```haskell
   ghci> Map.map (*100) $ Map.fromList [(1,1),(2,4),(3,9)]
   fromList [(1,100),(2,400),(3,900)]
   ghci> Map.filter isUpper $ Map.fromList [(1,'a'),(2,'A'),(3,'b'),(4,'B')]
   fromList [(2,'A'),(4,'B')]
   ```
10. toList

    如其名

    ```haskell
    ghci> Map.toList . Map.insert 9 2 $ Map.singleton 4 3
    [(4,3),(9,2)]
    ```
11. keys and elems

    返回 keys 和 values
12. fromListWith

    类似与fromList， 不过有一个函数决定重复的key应该怎么办

    ```haskell
    -- 有重复的键
    phoneBook =
        [("betty","555-2938")
        ,("betty","342-2492")
        ,("bonnie","452-2928")
        ,("patsy","493-2928")
        ,("patsy","943-2929")
        ,("patsy","827-9162")
        ,("lucille","205-2928")
        ,("wendy","939-8282")
        ,("penny","853-2492")
        ,("penny","555-2111")
    ]
    -- 重复的键的值会被加一起
    phoneBookToMap :: (Ord k) => [(k, String)] -> Map.Map k String
    phoneBookToMap xs = Map.fromListWith (\number1 number2 -> number1 ++ ", " ++ number2) xs

    -- 查看
    ghci> Map.lookup "patsy" $ phoneBookToMap phoneBook
    "827-9162, 943-2929, 493-2928"
    ghci> Map.lookup "wendy" $ phoneBookToMap phoneBook
    "939-8282"
    ghci> Map.lookup "betty" $ phoneBookToMap phoneBook
    "342-2492, 555-2938"
    ```

    下面是另外两个例子

    ```haskell
    ghci> Map.fromListWith max [(2,3),(2,5),(2,100),(3,29),(3,22),(3,11),(4,22),(4,15)]
    fromList [(2,100),(3,29),(4,22)]
    ghci> Map.fromListWith (+) [(2,3),(2,5),(2,100),(3,29),(3,22),(3,11),(4,22),(4,15)]
    fromList [(2,108),(3,62),(4,37)]
    ```
13. insertWith

    差不多， 条件插入

    ```haskell
    ghci> Map.insertWith (+) 3 100 $ Map.fromList [(3,4),(5,103),(6,339)]
    fromList [(3,104),(5,103),(6,339)]
    ```

### 6.5 Data.Set

1. fromList

   去重

   ```haskell
   text1 = "I just had an anime dream. Anime... Reality... Are they so different?"
   text2 = "The old man left his garbage can out and now his trash is all over my lawn!"
   ghci> let set1 = Set.fromList text1
   ghci> let set2 = Set.fromList text2
   ghci> set1
   fromList " .?AIRadefhijlmnorstuy"
   ghci> set2
   fromList " !Tabcdefghilmnorstuvwy"
   ```
2. intersection

   求交集

   ```haskell
   ghci> Set.intersection set1 set2
   fromList " adefhilmnorstuy"
   ```
3. difference

   求第一个集合有第二个没有

   ```haskell
   ghci> Set.difference set1 set2
   fromList ".?AIRj"
   ghci> Set.difference set2 set1
   fromList "!Tbcgvw"
   ```
4. union

   ```haskell
   ghci> Set.union set1 set2
   fromList " !.?AIRTabcdefghijlmnorstuvwy"
   ```
5. 其他

   null, size, member, empty, singleton, insert and delete 就和你想的一样

## 7. 自定义类型

使用 data 关键字定义

等号左边的是 **type name**， 等好右边的是 **value constructors**

```haskell
data Bool = False | True
```

Int 类型可能有下面的定义

```haskell
-- 真实不是这样的，只是为了说明问题
data Int = -2147483648 | -2147483647 | ... | -1 | 0 | 1 | 2 | ... | 2147483647
```

### 7.1 基本类型定义

下面让我们进行一个形状的定义

一个圆的定义可能需要三个参数， 前两个是圆的坐标，第三个参数是半径， 所以我们可以想 `(43.1, 55.0, 10.4)`这样定义一个圆， 但是这三个参数也能表示一个 3D vector或者是别的什么东西， 所以我们最好定义一个叫做 Shape 的新类型

```haskell
data Shape = Circle Float Float Float | Rectangle Float Float Float Float

ghci> :t Circle
Circle :: Float -> Float -> Float -> Shape
ghci> :t Rectangle
Rectangle :: Float -> Float -> Float -> Float -> Shape
```

**new 一个实例**

```haskell
ghci> Circle 10 20 5
Circle 10.0 20.0 5.0
ghci> Rectangle 50 230 60 90
Rectangle 50.0 230.0 60.0 90.0
```

type name 和 value constructor 首字母需要大写

下面定义了一个完整的Shape模块

```haskell
-- Shape(..) 会将所有的构造器暴露给外部
-- 等同于 Shape (Rectangle, Circle)
module Shapes
( Point(..)
, Shape(..)
, surface
, nudge
, baseCircle
, baseRect
) where

-- deriving (Show) 自动实现Show
data Point = Point Float Float deriving (Show)
data Shape = Circle Point Float | Rectangle Point Point deriving (Show)
surface :: Shape -> Float
surface (Circle _ r) = pi * r ^ 2
surface (Rectangle (Point x1 y1) (Point x2 y2)) = (abs $ x2 - x1) * (abs $ y2 - y1)

nudge :: Shape -> Float -> Float -> Shape
nudge (Circle (Point x y) r) a b = Circle (Point (x+a) (y+b)) r
nudge (Rectangle (Point x1 y1) (Point x2 y2)) a b = Rectangle (Point (x1+a) (y1+b)) (Point (x2+a) (y2+b))

baseCircle :: Float -> Shape
baseCircle r = Circle (Point 0 0) r

baseRect :: Float -> Float -> Shape
baseRect width height = Rectangle (Point 0 0) (Point width height)
```

我们也可以不暴露Shape，让用户只能通过 baseCircle， baseRect 构造，让我们的接口更加抽象

### 7.2 record syntax 定义类型

第一种方式

```haskell
data Person = Person String String Int Float String String deriving (Show)
firstName :: Person -> String
firstName (Person firstname _ _ _ _ _) = firstname

lastName :: Person -> String
lastName (Person _ lastname _ _ _ _) = lastname

age :: Person -> Int
age (Person _ _ age _ _ _) = age

height :: Person -> Float
height (Person _ _ _ height _ _) = height

phoneNumber :: Person -> String
phoneNumber (Person _ _ _ _ number _) = number

flavor :: Person -> String
flavor (Person _ _ _ _ _ flavor) = flavor
```

使用 record syntax 定义Person

```haskell
data Person = Person { firstName :: String
                     , lastName :: String
                     , age :: Int
                     , height :: Float
                     , phoneNumber :: String
                     , flavor :: String
                     } deriving (Show)
```

haskell会自动生成上面的函数

```haskell
ghci> :t flavor
flavor :: Person -> String
ghci> :t firstName
firstName :: Person -> String
```

**new 一个实例**

```haskell
ghci> Car {company="Ford", model="Mustang", year=1967}
Car {company = "Ford", model = "Mustang", year = 1967}
```

### 7.3 类型参数

#### 7.3.1 Maybe

```haskell
data Maybe a = Nothing | Just a
```

**类型构造器**

a 是一个类型参数， 因为这个类型 a， 所以我们称 Maybe是一个 type constructor（类型构造器）（注意：和之前的 value constructor 不一样）， 所以 Maybe 不是一个类型

我们能够传入 Char 或者 Int， 就能的到一个 Maybe Char 或者 Maybe Int 类型

#### 7.3.2 Car

下面举了一个 Car 的例子，他就可能是 (Car String String Int) 类型

```haskell
    data Car a b c = Car { company :: a
                         , model :: b
                         , year :: c
                         } deriving (Show)
```

但是用这种形式声明并没有太多好处，大部分情况下我们只需要一种状态 `Car String String Int` 就够了

所以我们会用下面的方式

```haskell
data Car = Car { company :: String
               , model :: String
               , year :: Int
               } deriving (Show)
tellCar :: Car -> String
tellCar (Car {company = c, model = m, year = y}) = "This " ++ c ++ " " ++ m ++ " was made in " ++ show y
```

我们之前也见过一个使用类型参数的例子，就是 Map， k， v 分别是key和value的类型

```haskell
data (Ord k) => Map k v = ...
```

#### 7.3.3 Vector

```haskell
data Vector2 a = Vector2 [a] [a] [a] deriving (Show)
vplus :: (Char t) => Vector2 t -> Vector2 t -> Vector2 t
(Vector2 a1 a2 a3) `vplus` (Vector2 b1 b2 b3) = Vector2 a1++b1 a2++b2 a3++b3
```

### 7.4 派生实例

**Derived instances**

#### 7.4.1 derive

Typeclasses 更像是接口， 我们使用 `derive` 关键字可以自动派生出行为

```haskell
    data Person = Person { firstName :: String
                         , lastName :: String
                         , age :: Int
                         } deriving (Eq, Show, Read)
```

该类型派生自Eq，所以实现了 `==` 和 `/=`, 还能够应用在任何在类型签名上具有 `Eq a` 的函数

```haskell
ghci> let mikeD = Person {firstName = "Michael", lastName = "Diamond", age = 43}
ghci> let adRock = Person {firstName = "Adam", lastName = "Horovitz", age = 41}
ghci> let mca = Person {firstName = "Adam", lastName = "Yauch", age = 44}
ghci> mca == adRock
False
ghci> mikeD == Person {firstName = "Michael", lastName = "Diamond", age = 43}
True
```

Read 和 Show能实现类型和字符串间的相互转化， 当我们使用 Read 时，需要指定结果的类型

```haskell
ghci> read "Person {firstName =\"Michael\", lastName =\"Diamond\", age = 43}" :: Person
Person {firstName = "Michael", lastName = "Diamond", age = 43}
```

偶们也能够读取参数化类型（parameterized types），但是必须填上类型

```haskell
-- So we can't do
read "Just 't'" :: Maybe a
-- but we can do
read "Just 't'" :: Maybe Char
```

#### 7.4.2 实现一些Typeclasses

1. Ord 的比较规则，在前面的比较小，与Char比较无关

   ```haskell
   data Day = Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday deriving (Eq, Ord, Show, Read, Bounded, Enum)

   ghci> Saturday > Friday
   True
   ```

#### 7.4.3 类型同义词

**Type synonyms**

就是换个名而已

```haskell
-- 下面是String的定义
type String = [Char]

type IntMap v = Map Int v
type IntMap = Map Int
```

需要分清类型构造器和值构造器（ type constructors and value constructors）的区别

#### 7.4.4 Either

下面我们在介绍一种类型 Either

```haskell
-- 定义
data Either a b = Left a | Right b deriving (Eq, Ord, Read, Show)
```

> So far, we've seen that Maybe a was mostly used to represent the results of computations that could have either failed or not. But somtimes, Maybe a isn't good enough because Nothing doesn't really convey much information other than that something has  failed. That's cool for functions that can fail in only one way or if  we're just not interested in how and why they failed. A Data.Map lookup fails only if the key we were looking for wasn't in the map, so  we know exactly what happened. However, when we're interested in how  some function failed or why, we usually use the result type of Either a b, where a is some sort of type that can tell us something about the possible failure and b is the type of a successful computation. Hence, errors use the Left value constructor while results use Right.

Maybe 不能满足所有的需要， Either 通常用于错误处理， 左值一般表示错误原因， 右值一般是正确的结果

下面给除了一个例子

```haskell
import qualified Data.Map as Map

-- declear LockerMap
data LockerState = Taken | Free deriving (Show, Eq)
type Code = String
type LockerMap = Map.Map Int (LockerState, Code)

-- give a LoockerLookUp function
lockerLookUp :: Int -> LockerMap -> Either String Code
lockerLookUp lockerNum map = case Map.lookup lockerNum map of
        Nothing  -> Left $ "Locker Number" ++ show lockerNum ++ "doesn't exist"
        Just (lockerState, code) -> if lockerState == Taken
                                 then Left $ "Locker Number" ++ show lockerNum ++ "is already taken!"
                                 else Right code

main = do
    let lockers = Map.fromList[(1, (Taken, "aaa")),(2, (Free, "bbb")),(3, (Taken, "ccc"))]
    print $ lockerLookUp 1 lockers
    print $ lockerLookUp 2 lockers
    print $ lockerLookUp 3 lockers
    print $ lockerLookUp 4 lockers

```

#### 7.4.5 递归

下面的例子实现了一个List 和一个 Tree

```haskell
infixr 5 :-:
data List a = Empty | a :-: (List a) deriving (Show, Read, Ord, Eq)
-- 或者是record syntex
-- data Lsit = Empty | Cons {listHead :: a, listTail :: List a} deriving (Show, Read, Eq, Ord)

-- infixr 5 ++
-- (++) :: [a] -> [a] -> [a]
-- [] ++ ys = ys
-- (x:xs) ++ ys = x:(xs ++ ys)
infixr 5 .++
(.++) :: List a -> List a -> List a
Empty .++ ys = ys
(x :-: xs) .++ ys = x :-: (xs .++ ys)

data Tree a = EmptyTree | Node a (Tree a) (Tree a) deriving (Show, Read, Eq, Ord)

singleton :: a -> Tree a
singleton x = Node x EmptyTree EmptyTree

treeInsert :: (Ord a) => a -> Tree a -> Tree a
treeInsert x EmptyTree = singleton x
treeInsert x (Node a left right)
    | x == a = Node x left right
    | x  < a = Node a (treeInsert x left) right
    | x  > a = Node a left (treeInsert x right)

treeElem :: (Ord) a => a -> Tree a -> Bool
treeElem x EmptyTree = False
treeElem x (Node a left right)
    | x == a = True
    | x < a = treeElem x left
    | x > a = treeElem x right


main = do
    putStrLn "start..."
    let a = 3 :-: 4 :-: 5 :-: Empty
    print a
    let b = 6 :-: 7 :-: Empty
    print(a .++ b)
    let nums = [8, 6, 4, 1, 3, 5]
    let numsTree = foldr treeInsert EmptyTree nums
    print numsTree
    print $ treeElem 4 numsTree
    putStrLn "end..."

```

#### 7.4.6 Typeclasses 102

> A quick recap on typeclasses: typeclasses are like interfaces. A  typeclass defines some behavior (like comparing for equality, comparing  for ordering, enumeration) and then types that can behave in that way  are made instances of that typeclass. The behavior of typeclasses is  achieved by defining functions or just type declarations that we then  implement. So when we say that a type is an instance of a typeclass, we  mean that we can use the functions that the typeclass defines with that  type.

对typeclasses的简要回顾：typeclasses就像接口。一个typeclasses定义了一些行为（比如比较，排序），可以实现这些行为的类型就是这些typeclass的实例，通过定义函数或者声明去实现这些行为，因此，当我们说类型是类型的一个类型的实例时，我们的意思是我们可以使用TypeClass定义该类型的函数。

```haskell
-- 使用 :info Num 可以查看 typeclass定义
Prelude> :info Num
type Num :: * -> Constraint
class Num a where
  (+) :: a -> a -> a
  (-) :: a -> a -> a
  (*) :: a -> a -> a
  negate :: a -> a
  abs :: a -> a
  signum :: a -> a
  fromInteger :: Integer -> a
  {-# MINIMAL (+), (*), abs, signum, fromInteger, (negate | (-)) #-}
        -- Defined in ‘GHC.Num’
instance Num Word -- Defined in ‘GHC.Num’
instance Num Integer -- Defined in ‘GHC.Num’
instance Num Int -- Defined in ‘GHC.Num’
instance Num Float -- Defined in ‘GHC.Float’
instance Num Double -- Defined in ‘GHC.Float’

```

**1. 定义typeclasses**

下面是Eq在标准库的定义

```haskell
class Eq a where
    (==) :: a -> a -> Bool
    (/=) :: a -> a -> Bool
    x == y = not (x /= y)
    x /= y = not (x == y)
```

class定义了一个typeclass， Eq是名字， a是实例，a只要是一个小写的单词就行

接着我们定义了一些函数，在class里实现函数不是强制的，只需要一个定义就够了

> Some people might understand this better if we wrote class Eq equatable where and then specified the type declarations like `(==) :: equatable -> equatable -> Bool`.
>
> 这种写法可能更好理解：`(==) :: equatable -> equatable -> Bool`

> If we have say class Eq a where and then define a type declaration within that class like (==) :: a -> -a -> Bool, then when we examine the type of that function later on, it will have the type of `(Eq a) => a -> a -> Bool`.
>
> 当我们在class中定义这个函数后，在查看这个函数的类型时，就会显示出typeclasses

**2. 实现 typeclass**

下面我们实现一个 `TrafficLight`

```haskell
data TrafficLight = Red | Yellow | Green
-- 实现比较
instance Eq TrafficLight where
    Red == Red = True
    Green == Green = True
    Yellow == Yellow = True
    _ == _ = False
-- 手动实现字符串转换
instance Show TrafficLight where
    show Red = "Red light"
    show Yellow = "Yellow light"
    show Green = "Green light"
main = do
    putStrLn "start..."
    print $ Red == Red
    print $ show [Red, Yellow, Green]
```

**3. subtypeclasses**

下面是 Num 在标准库中的定义（第一行）

```haskell
class (Eq a) => Num a where
```

在实现Num前，必须保证 a 实现了 Eq

**对于多态类型**

```haskell
instance Eq (Maybe m) where
    Just x == Just y = x == y
    Nothing == Nothing = True
    _ == _ = False

```

上面的例子好像解决了问题， 但是不能确定 m 的类型实现了 Eq，所以我们应该修改上面的声明：

```haskell
instance (Eq m) => Eq (Maybe m) where
	Just x == Just y = x == y
	Nothing == Nothing = True
	_ == _ = False
```

这次我们增加了一个类型限定，我们限定了所有Maybe m类型都是Eq，除非 m 也是 Eq

🍏

> Take into account that the type you're trying to make an instance of will replace the parameter in the *class* declaration. The a from class Eq a where will be replaced with a real type when you make an instance, so try  mentally putting your type into the function type declarations as well. (==) :: Maybe -> Maybe -> Bool doesn't make much sense but (==) :: (Eq m) => Maybe m -> Maybe m -> Bool does. But this is just something to think about, because == will always have a type of (==) :: (Eq a) => a -> a -> Bool, no matter what instances we make.
>
> 一定要 注意 'a' 在实现时需要被替换为concrete type

**4. 实现一个玩具**

在 js 中，任何非空类型都被当成是 true

```js
if (0) alert("YEAH!") else alert("NO!")
if ("") alert ("YEAH!") else alert("NO!")
if (false) alert("YEAH") else alert("NO!)
//etc. and all of these will throw an alert of NO!. If you do
if ("WHAT") alert ("YEAH") else alert("NO!")
// it will alert a "YEAH!"
```

*A yesno typeclass*

```haskell
class YesNo a where
    yesno :: a -> Bool

instance YesNo Int where
    yesno 0 = False
    yesno _ = True

instance YesNo [a] where
    yesno [] = False
    yesno _ = True

-- Bool 也不要忘了
instance YesNo Bool where
    yesno = id

-- 因为我们并不关心Maybe 包含什么类型，只要他有东西就行了，所以没有加类型限定
instance YesNo (Maybe a) where
    yesno (Just _) = True
    yesno Nothing = False

-- 仿照着写一个 if
yesnoIf :: (YesNo a) => a -> b -> b -> b
yesnoIf a onyes onno = if yesno a then onyes else onno

main :: IO ()
main = do
    putStrLn "start..."
    print $ length []
    print $ yesno [0]
    print $ yesno Nothing
    print $ yesno True
    putStrLn $ yesnoIf (Just 1) "yes !" "No -_-"

```

#### 7.4.7 Functor 和 Kinds

**1. 什么是 Kind**

> We used :k on a type to get its kind, just like we can use :t on a value to get its type. Like we said, types are the labels of  values and kinds are the labels of types and there are parallels between the two.

我们能用 `:t` 查看一个值(value)的类型(type)

```haskell
-- '=>'是类型限定 !!!
Prelude> :t 1
1 :: Num p => p

Prelude> :t [1, 2]
[1, 2] :: Num a => [a]

Prelude> :t Just 1
Just 1 :: Num a => Maybe a
```

也能用 `:k` 查看一个类型(type)的Kind

```haskell
Prelude> :k Int
Int :: *

Prelude> :k Num
Num :: * -> Constraint

Prelude> :k Maybe
Maybe :: * -> *

Prelude> :k Either
Either :: * -> * -> *

Prelude> :k Functor
Functor :: (* -> *) -> Constraint
```

**'*' 是什么**

> A * means that the type is a concrete type. A concrete type is a type that doesn't take any type parameters and  values can only have types that are concrete types. If I had to read * out loud (I haven't had to do that so far), I'd say *star* or just *type*.

`*` 就是一个固定的类型, 不能携带Type parameter

`* -> *` 就是接受一个type parameter, 返回一个类型, 比如 Maybe 和 Maybe Int

`* -> * -> *` 同理

所以Functor的类型就好理解了

```haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b
```

**2. 什么是Functor**

看一眼fmap的定义, 实现了Functor的类型,fmap 能够把这些类型*里面*的东西转换到另一种东西, 就是说fmap只作用于box里面的东西

```haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b
```

这个是map的定义

```haskell
map :: (a -> b) -> [a] -> [b]
```

map就是特殊化的 fmap ,只能用于 [],不能用于 Maybe, Ehther等类型

> anything like a box that can hold something can impl Functor, lsuch as Maybe, [], Tree = Empty | Tree a left rght, Either

所有能够承载其他类型的东西都能实现Functor,比如Maybe, [], Tree, Either

下面是关于Either的Functor实现

```haskell
instance Functor (Either a) where
    fmap f (Right x) = Right (f x)
    fmap f (Left x) = Left x
-- (b -> c) -> Either a b -> Ether a c
-- 和下面的一样
-- (b -> c) -> (Either a) b -> (Either a) c
```

> -- in this case, we only mapped the right value constructor,
> -- well, if we look at the define of Either:
> -- data Either a b = Left a | Right b
> -- we can't make sure f can handle both type a and type b
> -- Another example is Map.Map, where fmap just map a function v -> v' over a Map k v, and return Map k v'

在这个例子里,我们只map了Either的右值,因为不能保证Either a b的类型相同, Map.Map也是,只有value改变

**3. 实现一个 Tofu**

```haskell
class Tofu t where
    tofu :: j a -> t a j

data Frank a b = Frank {frankField :: b a} deriving (Show)

instance Tofu Frank where
    tofu x = Frank x

data Barry t k p = Barry { yabba :: p, dabba :: t k }

instance Functor (Barry a b) where
    fmap f (Barry { yabba = x, dabba = y }) = Barry {yabba = f x, dabba = y }

main :: IO ()
main = do
    let a = Frank { frankField = Just 'c' }
    print a
    let b = tofu (Just 'a') :: Frank Char Maybe
    print b
    let c = tofu ["Hello"] :: Frank [Char] []
    print c
    putStrLn "start..."
```

## 8. IO

### 8.1 cmd 参数

```haskell
import System.Environment
import Data.List

main = do
    -- 获取参数
    args <- getArgs
    -- 获取名字
    progName <- getProgName
    putStrLn progName
    mapM_ putStrLn args

```

### 8.2 输入

1. 获取输入

   ```haskell
   main = do
       putStrLn "start..."
       -- 获取输入数据
       line <- getLine
       -- 判断不为空就反转
       if null line
           then return ()
           else do
               putStrLn $ reverseWords line
               main
   reverseWords :: String -> String
   reverseWords = unwords . map reverse . words
   ```
2. 文件交互

- openFile (fileName, openMode): 打开文件返回handle对象
- hGetContents (handle)：读取文件内容
- with 语法
- appendFile(fileName, content)：追加内容
- readBuffer: 设置缓冲区

```haskell
import System.IO

main = do
    handle <- openFile "haiku.txt" ReadMode
    -- Lazy, don't read and stored in memory an once
    contents <- hGetContents handle
    putStrLn contents
    hClose handle

    withFile "haiku.txt" ReadMode (\handle -> do
    contents <- hGetContents handle
    putStrLn contents)

    -- withOpen's define
    -- openFle :: FilePath -> IOMode -> (Handle -> IO a) -> IO a
    -- openFile path mode f = do
    --     handle <- openFile path mode
    --     result <- f handle
    --     hClose f
    --     return result

    -- More function
    -- hGetLine hPutStr hPutStrLn hGetChar
    contents <- readFile "todo.txt"
    putStrLn contents

    todo <- getLine
    appendFile "todo.txt" $ todo ++ "\n"

    -- set buffering manualy
    -- BufferMode = NoBuffering | LineBuffering | BlockBuffering (Maybe Int)
    withFile "todo.txt" ReadMode (\handle -> do
        hSetBuffering handle $ BlockBuffering (Just 2)
        contents <- hGetContents handle
        putStrLn contents)
    -- read file in big chunks can help to minimize disk access or when our file is actually a slow network resource
```

### 8.3. 循环

1. forever(loop)

```haskell
import Control.Monad
import Data.Char

main = forever $ do
    putStr "Give a input: "
    l <- getLine
    putStrLn $ map toUpper l
```

2. when(while)

```haskell
import Control.Monad

main = do
  return ()
  -- aaa <- return "aaavvv"
  -- putStrLn aaa

  c <- getChar
  when (c /= ' ') $ do
    putChar c
    main
```

### 8.4 map IO action

mapM & mapM_ & sequence

```haskell
main = do
  -- 1.1 sequence can run erery IO action in it, and return their result as a list
  -- rs <- sequence [getLine, getLine, getLine]
  -- print rs

  -- 1.2
  -- map print [1, 2, 3]
  -- [print 1, print 2, print 3]
  res <- sequence $ map print [1, 2, 3]
  -- `print 1` just return a `()`
  -- so res is [(), (), ()]
  print res

  -- 2.1 mapM can be used to map a function that return IO action
  mapm <- mapM print [1, 2, 3]
  print mapm
  -- 2.2 mapM_ just abundon the results
  mapm_ <- mapM_ print [1, 2, 3]
  print mapm_
```

### 8.6 todo list

```haskell
import Data.List
import System.Directory
import System.Environment
import System.IO

dispatch :: [(String, [String] -> IO ())]
dispatch =
  [ ("add", add),
    ("view", view),
    ("remove", remove)
  ]

main = do
  (command : args) <- getArgs
  let (Just action) = lookup command dispatch
  action args

add :: [String] -> IO ()
add [fileName, todoItem] = appendFile fileName (todoItem ++ "\n")
add _ = putStrLn "Plz input [filename, todoItem]"

view :: [String] -> IO ()
view [fileName] = do
  contents <- readFile fileName
  let todoTasks = lines contents
      numberedTasks = zipWith (\n line -> show n ++ " - " ++ line) [0 ..] todoTasks
  putStr $ unlines numberedTasks
view _ = putStrLn "Plz input [filename]"

remove :: [String] -> IO ()
remove [fileName, numberString] = do
  handle <- openFile fileName ReadMode
  (tempName, tempHandle) <- openTempFile "." "temp"
  contents <- hGetContents handle
  let number = read numberString
      todoTasks = lines contents
      newTodoItems = delete (todoTasks !! number) todoTasks
  hPutStr tempHandle $ unlines newTodoItems
  hClose handle
  hClose tempHandle
  removeFile fileName
  renameFile tempName fileName
remove _ = putStrLn "Plz input [filename, numberString]"
```

### 8.7 Error Handle

1. try & catch

```haskell
import Control.Exception
import System.Environment
import System.IO
import System.IO.Error

main = toTry `catch` handler

toTry :: IO ()
toTry = do
  (fileName : _) <- getArgs
  contents <- readFile fileName
  putStrLn $ "The file has " ++ show (length (lines contents)) ++ " lines!"

handler :: IOError -> IO ()
handler e = putStrLn "Whoops, had some trouble!"

-- main = do
--   toTry `catch` handler1
--   thenTryThis `catch` handler2
--   launchRockets
```

2. error kind

```haskell

import System.Environment
import System.IO
import System.IO.Error
import Control.Exception

main = toTry `catch` handler

toTry :: IO ()
toTry = do (fileName:_) <- getArgs
           contents <- readFile fileName
           putStrLn $ "The file has " ++ show (length (lines contents)) ++ " lines!"

handler :: IOError -> IO ()
handler e
    | isDoesNotExistError e = putStrLn "The file doesn't exist!"
    | otherwise = ioError e

-- isAlreadyExistsError
-- isDoesNotExistError
-- isAlreadyInUseError
-- isFullError
-- isEOFError
-- isIllegalOperation
-- isPermissionError
-- isUserError
```

## 9. Solve Some Problems

### 9.1计算后缀表达式

```haskell
import Data.List

solveRPN :: (Num a, Read a) => String -> a
solveRPN = head . foldl foldingFunction [] . words
    where
        foldingFunction (x:y:ys) "*" = (x * y):ys
        foldingFunction (x:y:ys) "+" = (x + y):ys
        foldingFunction (x:y:ys) "-" = (x - y):ys
        foldingFunction xs numString = read numString:xs

solveRPN2 :: (Num a, Read a, Floating a) => String -> a
solveRPN2 = head . foldl foldingFunction [] . words
    where
        foldingFunction (x:y:ys) "*" = (x * y):ys
        foldingFunction (x:y:ys) "+" = (x + y):ys
        foldingFunction (x:y:ys) "-" = (x - y):ys
        foldingFunction (x:y:ys) "/" = (y / x):ys
        foldingFunction (x:y:ys) "^" = (y ** x):ys
        foldingFunction (x:xs) "ln" = log x:xs
        foldingFunction xs "sum" = [sum xs]
        foldingFunction xs numString = read numString:xs


main :: IO ()
main = do
    putStrLn "start..."
    print $ solveRPN "90 34 12 33 55 66 + * - + -"
    putStrLn "end..."
```

### 9.2 计算最短路

```haskell
-- newtype Road = Road Int Node
-- newtype Node = Node Road Road | EndNode Road

-- newtype Road = Road Int Node
-- newtype Node = Node Road (Maybe Road)

data Section = Section
  { getA :: Int,
    getB :: Int,
    getC :: Int
  }
  deriving (Show)

type RoadSystem = [Section]

headthrowToLondon :: RoadSystem
headthrowToLondon = [Section 50 10 30, Section 5 90 20, Section 40 2 25, Section 10 8 0]

data Label = A | B | C deriving (Show)

type Path = [(Label, Int)]

roadStep :: (Path, Path) -> Section -> (Path, Path)
roadStep (pathA, pathB) (Section a b c) =
  let priceA = sum $ map snd pathA
      priceB = sum $ map snd pathB
      forwardPriceToA = priceA + a
      crossPriceToA = priceB + b + c
      forwardPriceToB = priceB + b
      crossPriceToB = priceA + a + c
      newPathToA =
        if forwardPriceToA <= crossPriceToA
          then (A, a) : pathA
          else (C, c) : (B, b) : pathB
      newPathToB =
        if forwardPriceToB <= crossPriceToB
          then (B, b) : pathB
          else (C, c) : (A, a) : pathA
   in (newPathToA, newPathToB)

optimalPath :: RoadSystem -> Path
optimalPath roadSystem =
  let (bestAPath, bestBPath) = foldl roadStep ([], []) roadSystem
   in if sum (map snd bestAPath) <= sum (map snd bestBPath)
        then reverse bestAPath
        else reverse bestBPath

main :: IO ()
main = do
  print $ roadStep ([], []) (head headthrowToLondon)
  print $ optimalPath headthrowToLondon


  contents <- getContents
  let threes = groupOf 3 (map read $ lines contents)
      roadSystem = map (\[a,b,c] -> Section a b c) threes
      path = optimalPath roadSystem
      pathString = concat $ map (show . fst) path
      pathPrice = sum $ map snd path
  putStrLn $ "The best path to take is: " ++ pathString
  putStrLn $ "The price is: " ++ show pathPrice


groupOf :: Int -> [a] -> [[a]]
groupOf 0 _ = undefined
groupOf _ [] = []
groupOf n xs = take n xs : groupOf n (drop n xs)
```

## 10. Functors, Applicative Functors and Monoids

极度建议参考下面的文章，图文解释十分直观
[Functors, Applicatives, And Monads In Pictures](https://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)

### 10.1 Functor
```haskell
fmap (+3) (Just 2)
```
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202022316684.png)

### 10.2 Applicatives
```haskell
Just (+3) <*> Just 2 == Just 5

> [(*2), (+3)] <*> [1, 2, 3]
[2, 4, 6, 4, 5, 6]
```
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202022317350.png)

### 10.3 Monads

判断一个数的奇偶
```haskell
half x = if even x
           then Just (x `div` 2)
           else Nothing
```
加入x现在是一个wrapped的比如说Maybe, 这里引入一个新的操作符 `>>=`
```haskell
> Just 3 >>= half
Nothing
> Just 4 >>= half
Just 2
> Nothing >>= half
Nothing
```
之所以能像上面一样操作是因为，Maybe是个Monad
```haskell
instance Monad Maybe where
    Nothing >>= func = Nothing
    Just val >>= func  = func val
```
Just
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202022324827.png)
Nothing
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202022324432.png)

### 10.4 总结
![](https://trdthg-img-for-md-1306147581.cos.ap-beijing.myqcloud.com/img/202202022325497.png)