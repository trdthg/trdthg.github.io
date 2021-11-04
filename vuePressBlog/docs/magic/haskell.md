# Haskell 学习

## 0. 特性

1. > We usually use ' to either denote a strict  version of a function (one that isn't lazy) or a slightly modified  version of a function or a variable. Because ' is a valid character in functions, we can make a function like this.

   `‘` 在haskell中是声明的合法字符， 一般中加 `’` 的函数代表一个函数的修改版本或者严格版本 

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

	### 4.1 maxium

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

> If we map `*` over the list` [0..]`, we get back a list of functions that only take one parameter, so `(Num a) => [a -> a]`. `map (*) [0..]` produces a list like the one we'd get by writing `[(0*),(1*),(2*),(3*),(4*),(5*)...`

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

   `sum (map sqrt [1..130])` 可以用 `sum $ map sqrt [1..130]` 代替, `sqrt 3 + 4 + 9`是13+根号3, 但是`sqrt $ 3 + 4 + 9` 就正常

   []: 

   > How about sum (filter (> 10) (map (*2) [2..10]))? Well, because $ is right-associative, f (g (z x)) is equal to f $ g $ z x. And so, we can rewrite sum (filter (> 10) (map (*2) [2..10])) as sum $ filter (> 10) $ map (*2) [2..10]. 

2.  增加特性

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

#### 6.2.1 intersperse

*向List中填充元素*

```haskell
ghci> intersperse '.' "MONKEY"  
"M.O.N.K.E.Y"  
ghci> intersperse 0 [1,2,3,4,5,6]  
[1,0,2,0,3,0,4,0,5,0,6]  
```

#### 6.2.2 intercalate

*填充后和并返回*

```haskell
ghci> intersperse '.' "MONKEY"  
"M.O.N.K.E.Y"  
ghci> intersperse 0 [1,2,3,4,5,6]  
[1,0,2,0,3,0,4,0,5,0,6]  
```

#### 6.2.3 transpose

*矩阵转置*

```haskell
ghci> transpose [[1,2,3],[4,5,6],[7,8,9]]  
[[1,4,7],[2,5,8],[3,6,9]]  
ghci> transpose ["hey","there","guys"]  
["htg","ehu","yey","rs","e"]  
```

#### 6.2.4 foldl' foldl1'

> foldl' and foldl1' are stricter versions of their respective lazy incarnations. When using lazy folds on really big lists, you might often get a stack overflow  error. The culprit for that is that due to the lazy nature of the folds, the accumulator value isn't actually updated as the folding happens.  What actually happens is that the accumulator kind of makes a promise  that it will compute its value when asked to actually produce the result (also called a thunk). That happens for every intermediate accumulator  and all those thunks overflow your stack. The strict folds aren't lazy  buggers and actually compute the intermediate values as they go along  instead of filling up your stack with thunks. So if you ever get stack  overflow errors when doing lazy folds, try switching to their strict  versions.

能够即使运算， 防止堆栈溢出

#### 6.2.5 concat

```haskell
ghci> concat ["foo","bar","car"]  
"foobarcar"  
ghci> concat [[3,4,5],[2,3,4],[2,1,1]]  
[3,4,5,2,3,4,2,1,1]  
```

**concatMap == concat map**

####  6.2.6 and & or

需要配合map使用

> and takes a list of boolean values and returns True only if all the values in the list are True.

全为真返回True

```haskell
ghci> and $ map (>4) [5,6,7,8]  
True  
ghci> and $ map (==4) [4,4,4,3,4]  
False  
```

> or is like and, only it returns True if any of the boolean values in a list is True.

有真就返回True

```haskell
ghci> or $ map (==4) [2,3,4,5,6,1]  
True  
ghci> or $ map (>4) [1,2,3]  
False  
```

#### 6.2.7 all & any

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

### 6.3 其他常用模块

不写了， 自己去查

### 6.4 写模块

