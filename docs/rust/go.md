# 一些特殊点
## 基础
### 格式化
```go
fmt.Printf("type %T value %v \n", a, a)
```

### 循环
```go
if num := 10; num > 0 {
    fmt.Println(num)
}

for i := 1; i < 10; i++ {
    fmt.Println(i)
    if i == 3 {
        break
    }
}

finger := 2
switch finger {
case 1:
    fmt.Println(1)
case 2:
    fmt.Println(2)
    fallthrough
default:
    println("sss")
}

dd := 1
switch {
case dd > 0:
    println(0)
case dd > -1:
    println(-1)
}
```

### 数组

数组有固定大小，数组的大小是类型的一部分，因此[5]int 和 [25]int是不同类型
```go
a := []int{2}
a[0] = 1
fmt.Println(a)

var b [3][2]int
b = [3][2]int{
    {1, 2},
    {1, 2},
    {1, 2},
}
fmt.Println(b)

veggies := []string{"potatoes", "tomatoes", "brinjal"}
fruits := []string{"oranges", "apples"}
food := append(veggies, fruits...)
fmt.Println("food:", veggies, fruits, food)
fmt.Println("food:", cap(veggies), cap(fruits), cap(food))
fmt.Println("food:", len(veggies), len(fruits), len(food))
nums := []int{1, 2}
change(nums...)
pln(nums...)
```

### map
```go
// map的零值为nil, 必须使用make初始化
// map是 引用类型，当map被赋值给另一个变量是后，他们共享一个
// map不能使用==判断，==只能用来判断map是否为nil，应该遍历字典元素去比较两个字典
var mm map[string]int
// mm["s"] = 1                    // 回报错，map is nil
// fmt.Printf("%T %v \n", mm, mm) // 这里虽然能打印出 map[]，但是无济于事
if mm == nil {
    mm = make(map[string]int)
    mm["s"] = 1
    fmt.Printf("%T %v \n", mm, mm)
}
mmm := map[string]int{
    "aaa": 1,
}
if v, ok := mmm["aa"]; ok == true {
    fmt.Println(v)
    delete(mmm, "aa")
} else {
    fmt.Println("no such key")
    fmt.Println(len(mmm))
    for k, v := range mmm {
        fmt.Println(k, v)
    }
}
```

### 字符串 与 切片
```go
// 字符串
name := "Señor"
for i := 0; i < len(name); i++ {
    fmt.Printf("%c", name[i])
}
fmt.Printf("\n")
for _, v := range name {
    fmt.Printf("%c", v)
}
fmt.Printf("\n")
name_ := []rune(name)
for i := 0; i < len(name_); i++ {
    fmt.Printf("%c", name_[i])
}
```

```go
//关于切片
// a[x] 是 (*a)[x] 的简写形式
// arr := [3]int{1, 2, 3}
// modify(&arr)
// modify(arr[:]) 这种更常用
// arr++ 这种直接进行指针操作不被允许
func modify1(arr *[3]int) {
	(*arr)[0] = 90
}
func modify2(arr *[3]int) {
	arr[0] = 90
}

func change(elems ...int) {
	for i, v := range elems {
		v += 1        // 无效
		elems[i] += 1 // 有效
	}
}

func pln(elems ...int) {
	for i, v := range elems {
		fmt.Printf("index: %v value %v\n", i, v)
	}
}
```

### 结构体

#### 书写
- 匿名结构体: string,int就是字段名，字段不能重复
    ```go
    type Person struct {
        string
        int
    }
    person := Person{"aa", 1}
    fmt.Println(person.int, person.string)
    ```
- 提升字段: 嵌入的结构体，可以直接调用里面的字段
    ```go
    type Group struct {
        string
        int
        Person
    }
    ```
- 匿名 + 提升，向上面的情况

    匿名的类型可以重复，但是会以自身的为准
    ```go
    group := Group{"bb", 1, person}
    fmt.Print(group.string, group.string)
    ```

#### 比较
- 结构体是值类型。如果它的每一个字段都是可比较的，则该结构体也是可比较的。如果两个结构体变量的对应字段相等，则这两个变量也是相等的。
- 如果结构体包含不可比较的字段，则结构体变量也不可比较。

### 方法

#### 结构体上的方法
- 结构体方法: 不管是一个值，还是一个可以解引用的指针，调用这样的方法都是合法的。
    或者说: 用**一个指针**或者**一个可取得地址的值**来调用都是合法的
- 匿名字段的方法: 属于结构体的匿名字段的方法可以被直接调用，就好像这些方法是属于定义了匿名字段的结构体一样。
```go
type rectangle struct {
	length int
	width  int
}

func (r *rectangle) area() {
	r.length += 1
}

// func (r rectangle) area() {
// 	r.length += 1
// }

r := rectangle{
    length: 10,
    width:  5,
}

r.area()
(&r).area()
// {12, 5}
// 如果改为 不带*的方法，{10, 5}
```

那么什么时候使用指针接收器，什么时候使用值接收器？

- 一般来说，指针接收器可以使用在：对方法内部的接收器所做的改变应该对调用者可见时。
- 指针接收器也可以被使用在如下场景：当拷贝一个结构体的代价过于昂贵时。考虑下一个结构体有很多的字段。在方法内使用这个结构体做为值接收器需要拷贝整个结构体，这是很昂贵的。在这种情况下使用指针接收器，结构体不会被拷贝，只会传递一个指针到方法内部使用。
- 在其他的所有情况，值接收器都可以被使用。

#### 孤儿规则🐶
下面的不允许，因为int类型和这个方法，不再同一个包里
```go
func (a int) add(b int) {
}
```
解决方法

- 定义类型别名
```go
type myInt int

func (a myInt) add(b myInt) myInt {
    return a + b
}
```
- wrapper包装

### 接口
类似于dyn Train
```go
type SalaryCalculator interface {
    CalculateSalary() int
}
employees := []SalaryCalculator{pemp1, pemp2, cemp1}
```

#### 接口的内部表示
可以把接口看作内部的一个元组 (type, value)。 type 是接口底层的具体类型（Concrete Type），而 value 是具体类型的值。

#### 空接口
没有包含方法的接口称为空接口。空接口表示为 interface{}。由于空接口没有方法，因此所有类型都实现了空接口。

#### 接口的具体类型
- 类型断言
```go
func assert(i interface{}) {
    v, ok := i.(int)
    fmt.Println(v, ok)
    // 如果不是int类型，v就会被赋为T的零值
}
func main() {
    var s interface{} = 56
    assert(s)
    var i interface{} = "Steven Paul"
    assert(i)
}
```
- switch type
```go
func findType(i interface{}) {
    switch i.(type) {
    case string:
        fmt.Printf("I am a string and my value is %s\n", i.(string))
    case int:
        fmt.Printf("I am an int and my value is %d\n", i.(int))
    default:
        fmt.Printf("Unknown type\n")
    }
}

```

### 接口2

#### 接口类型变量
声明一个变量是接口类型，那么这个变量可以被赋值为，任何实现了接口的类型
```go
type Describer interface {
    Describe()
}
type Person struct {
    name string
    age  int
}
type Address struct {
    state   string
    country string
}
```
现在还不能赋值，接下来为两个struct我们实现接口

为person实现describe，使用**值**接受者, 下面两种赋值都可以，也都能调用方法
```go
func (p Person) Describe() { // 使用值接受者实现
    fmt.Printf("%s is %d years old\n", p.name, p.age)
}
var d1 Describer
p1 := Person{"Sam", 25}
d1 = p1
d1.Describe()
p2 := Person{"James", 32}
d1 = &p2
d1.Describe()
```
为Address实现describer, 使用**指针**接受者, 下面就比较特殊
d = a不能直接赋值，如果是在结构体的方法中，下面的两种赋值都是可以的，但是在接口中不行

其原因是：对于使用指针接受者的方法，用**一个指针**或者**一个可取得地址的值**来调用都是合法的。但接口中存储的具体值（Concrete Value）并不能取到地址，因此在下面的例子中，对于编译器无法自动获取 a 的地址，于是程序报错。
```go
func (a *Address) Describe() { // 使用指针接受者实现
    fmt.Printf("State %s Country %s", a.state, a.country)
}
var d Describer
a := Address{"Washington", "USA"}

//d = a  // 这是不合法的，会报错: Address does not implement Describer

d = &a // 这是合法的, Address 类型的指针实现了 Describer 接口
d.Describe()
```

#### 接口可以嵌套
类似于匿名结构体的嵌套
一个结构体实现了A，B，那就说它也实现了C
```go
type A interface {
    foo()
}

type B interface {
    bar() int
}

type C interface {
    A
    B
}

```

#### 接口的零值
接口的零值是nil，同时其底层值（Underlying Value）和具体类型（Concrete Type）都为 nil。调用方法会panic

### channel

#### 特性
- go的channel默认是双向的，既可以send，也可以recv
- channel必须有发送端和接收端，否则就panic
- make(chan int, n) n表示缓冲区大小, 可以省略, 默认为0
    - 如果超过缓冲区大小, 就会panic, 超过缓冲区大小的数据必须在其他的协程中处理
    - 对于rust,如果超出缓冲区大小send就会阻塞，发不出去
- 缓冲区也有len 和 cap的概念
```go
func sendData(sendch chan<- int) {
    sendch <- 10
}

func main() {
    cha1 := make(chan int)
    go sendData(cha1)
    fmt.Println(<-cha1)
}
```

#### 单向channel
```go
// 声明参数是一个只能发送的ch
func sendData(sendch chan<- int) {
    sendch <- 10
}

func main() {
    // 声明一个只能发送的channel，下面使用它去接受就会panic
    // 如果声明为 chan int, 下面的接受不会panic，在sendData会被转换为只能发送的channel，而main中的仍然是双向的
    sendch := make(chan<- int)
    go sendData(sendch)
    fmt.Println(<-sendch)
}
```

#### 关闭channel
```go
func producer(chnl chan int) {
    for i := 0; i < 10; i++ {
        chnl <- i
    }
    // 发送完成后, 使用send函数显式关闭channel
    close(chnl)
}

func main() {
    ch := make(chan int)
    go producer(ch)
    for {
        // 通过ok判断channel是否关闭
        v, ok := <-ch
        if ok == false {
            break
        }
        fmt.Println("Received ", v, ok)
    }
}
```

#### waitGroup
等待一群协程结束

注意一定要使用指针

#### 工作池
```go
// 模拟耗时的计算
func calculate(number int) int {
	time.Sleep(2 * time.Second)
	return number
}

// 生产者，分发工作
func produceJobs(jobs chan<- Job, n int) {
	for i := 0; i < n; i++ {
		// fmt.Printf("sending %d \n", i)
		jobs <- Job{
			id:     i,
			number: i,
		}
	}
	close(jobs)
}

// 消费者，接受工作，干完活就通知以下管理员
func consumeFunc(jobs <-chan Job, results chan<- int, wg *sync.WaitGroup) {
	// 每个worker都在抢工作，真积极啊
	for job := range jobs {
		// fmt.Printf("id: %d\n", job.id)
		results <- calculate(job.number)
	}
	wg.Done()
}

// 管理员，等待所有工人都通知他，每次被通知，计数器就减1, 当计数器为0是就不再阻塞
func consumeJobs(jobs <-chan Job, results chan<- int, worker_number int) {
	// 等待一批goroutine结束，类似于join
	var wg sync.WaitGroup
	// 为每一个工作开启一个goroutine
	for i := 0; i < worker_number; i++ {
		wg.Add(1)
		go consumeFunc(jobs, results, &wg)
	}
	wg.Wait() // 阻塞当前goroutine直到计数器归0, 所有job都应该做完了，result应该也都发送出去了
	close(results)
}

type Job struct {
	id     int
	number int
}

func main() {
	startTime := time.Now()

	jobs := make(chan Job, 10)
	results := make(chan int, 10)

	// 发送work, jobs send
	go produceJobs(jobs, 100)
	// jobs recv | results send
	go consumeJobs(jobs, results, 50)
	// results recv
	a := 0
	for res := range results {
		a += res
	}
	fmt.Print("res: ", a)

	endTime := time.Now()
	diff := endTime.Sub(startTime)
	fmt.Println("total time taken ", diff.Seconds(), "seconds")

}
```

#### select

用法挺普通

- 如果有多个channel准备就绪, 就随机选择一个执行
- 死锁与默认情况: ch并没有send任何东西, 如果没有default就会触发死锁, 导致panic, 空select一样也会导致panic
```go
func main() {
    ch := make(chan string)
    select {
    case <-ch:
    default:
        fmt.Println("default case executed")
    }
}
```

### 并发
goroutine不能保证并发安全, 下面是一些解决方法

- 总体说来，当 Go 协程需要与其他协程通信时，可以使用channel。而当只允许一个协程访问临界区时，可以使用 Mutex。
- 就我们上面解决的问题而言，我更倾向于使用 Mutex，因为该问题并不需要协程间的通信。所以 Mutex 是很自然的选择。


#### mutex
```go
func aa(wg *sync.WaitGroup, m *sync.Mutex) {
	m.Lock()
	x += 1
	m.Unlock()
	wg.Done()
}

func main() {
    var wg sync.WaitGroup
    var m sync.Mutex
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go aa(&wg, &m)
    }
    wg.Wait()
    fmt.Print(x)
}
```

#### channel
使用缓冲为1的channel实现
```go
func aa(wg *sync.WaitGroup, ch chan bool) {
	ch <- true
	x += 1
	<-ch
	wg.Done()
}

func main() {
	startTime := time.Now()
	var wg sync.WaitGroup
	var ch = make(chan bool, 1)
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go aa(&wg, ch)
	}
	wg.Wait()
	fmt.Print(x)
}
```

### defer

#### 实参求值
当执行 defer 语句的时候，就会对延迟函数的实参进行求值。
```go
func printA(a int) {
    fmt.Println("value of a in deferred function", a)
}
func main() {
    a := 5
    defer printA(a)
    a = 10
}
// value of a in deferred function 5
```

#### defer栈
当一个函数内多次调用 defer 时，Go 会把 defer 调用放入到一个栈中，随后按照后进先出（Last In First Out, LIFO）的顺序执行。

下面的程序，使用 defer 栈，将一个字符串逆序打印。
```go
func main() {
    name := "Naveen"
    for _, v := range []rune(name) {
        defer fmt.Printf("%c", v)
    }
}
// 倒叙输出: neevaN
```

#### 使用场景
```go
func (r rect) area(wg *sync.WaitGroup) {
    // defer wg.Done() // 代替下面的3个return中的wg.Done()
    if r.length < 0 {
        fmt.Printf("rect %v's length should be greater than zero\n", r)
        wg.Done()
        return
    }
    if r.width < 0 {
        fmt.Printf("rect %v's width should be greater than zero\n", r)
        wg.Done()
        return
    }
    area := r.length * r.width
    fmt.Printf("rect %v's area %d\n", r, area)
    wg.Done()
}
```

### 错误处理

#### 错误接口
在标准库里的定义
```go
type error interface {
    Error() string
}
```

open函数的设计
```go
type PathError struct {
    Op   string
    Path string
    Err  error
}

func (e *PathError) Error() string { return e.Op + " " + e.Path + ": " + e.Err.Error() }
```

#### 错误类型断言

通过类型断言拿到错误信息
```go
func main() {
    f, err := os.Open("/test.txt")
    if err, ok := err.(*os.PathError); ok {
        fmt.Println("File at path", err.Path, "failed to open")
        return
    }
    fmt.Println(f.Name(), "opened successfully")
}
```

#### 子错误类型
```go
type DNSError struct {
    ...
}

func (e *DNSError) Error() string {
    ...
}
func (e *DNSError) Timeout() bool {
    ...
}
func (e *DNSError) Temporary() bool {
    ...
}

func main() {
    addr, err := net.LookupHost("golangbot123.com")
    if err, ok := err.(*net.DNSError); ok {
        if err.Timeout() {
            fmt.Println("operation timed out")
        } else if err.Temporary() {
            fmt.Println("temporary error")
        } else {
            fmt.Println("generic error: ", err)
        }
        return
    }
    fmt.Println(addr)
}
```

#### panic和recover

下面使用recover去恢复panic
- 注意: Go 协程中调用 recover 才管用。recover 不能恢复一个不同协程的 panic。
```go
func recoverName() {
    if r := recover(); r!= nil {
        fmt.Println("recovered from ", r)
    }
}

func fullName(firstName *string, lastName *string) {
    defer recoverName()
    if firstName == nil {
        panic("runtime error: first name cannot be nil")
    }
    if lastName == nil {
        panic("runtime error: last name cannot be nil")
    }
    fmt.Printf("%s %s\n", *firstName, *lastName)
    fmt.Println("returned normally from fullName")
}
```
#### 恢复后获得堆栈
```go
import (
    "runtime/debug"
)

func r() {
    if r := recover(); r != nil {
        fmt.Println("Recovered", r)
        debug.PrintStack()
    }
}
```

### 更多函数

#### 匿名函数
```go
func main() {
    func(n string) {
        fmt.Println("Welcome", n)
    }("Gophers")
}
```

#### 自定义函数类型
```go
type add func(a int, b int) int

func main() {
    var a add = func(a int, b int) int {
        return a + b
    }
    s := a(5, 6)
    fmt.Println("Sum", s)
}
```

#### 高阶函数
```go
// 接受函数
func simple(a func(a, b int) int) {
    fmt.Println(a(60, 7))
}

// 返回函数
func simple() func(a, b int) int {
    f := func(a, b int) int {
        return a + b
    }
    return f
}

```

### 反射
没什么好说的
```go
type order struct {
	ordId      int
	customerId int
}

func play(q interface{}) {
	t := reflect.TypeOf(q)
	k := t.Kind()

	v := reflect.ValueOf(q)
	fieldsNum := v.NumField()
	fmt.Println("Type: ", t, "Kind: ", k)
	fmt.Println("Value: ", v, "FieldNum: ", fieldsNum)
	for i := 0; i < fieldsNum; i++ {
		fmt.Println(t.Field(i).Name, v.Field(i).Type(), v.Field(i))
	}
}

func createQuery(q interface{}) {
	if reflect.TypeOf(q).Kind() != reflect.Struct {
		return
	}
	t := reflect.TypeOf(q).Name()
	query := fmt.Sprintf("insert into %s values(", t)
	v := reflect.ValueOf(q)
	for i := 0; i < v.NumField(); i++ {
		switch v.Field(i).Kind() {
		case reflect.Int:
			if i == 0 {
				query = fmt.Sprintf("%s%d", query, v.Field(i).Int())
			} else {
				query = fmt.Sprintf("%s, %d", query, v.Field(i).Int())
			}
		case reflect.String:
			if i == 0 {
				query = fmt.Sprintf("%s\"%s\"", query, v.Field(i).String())
			} else {
				query = fmt.Sprintf("%s, \"%s\"", query, v.Field(i).String())
			}
		default:
			fmt.Println("unsupported field type")
			return
		}
	}
	query = fmt.Sprintf("%s)", query)
	fmt.Println(query)
	return
}

func main() {
	o := order{
		ordId:      456,
		customerId: 56,
	}
	play(o)
	println("----------------------------------------")
	createQuery(o)

	var a int = 1
	b := reflect.ValueOf(a).String()
	fmt.Println(reflect.TypeOf(b))
}
```