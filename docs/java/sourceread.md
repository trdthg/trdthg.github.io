# 源码试读

## List

### Arrays

#### Arrays.copy()
1. 创建一个新的集合用来储存数据
    - type(T) == type(U) ? 直接创建 : 通过反射机制创建
2. 调用System.arraycopy()拷贝到新集合上

```java
public static <T,U> T[] copyOf(U[] original, int newLength, Class<? extends T[]> newType) {
    @SuppressWarnings("unchecked")
    T[] copy = ((Object)newType == (Object)Object[].class)
        ? (T[]) new Object[newLength]
        : (T[]) Array.newInstance(newType.getComponentType(), newLength);
    System.arraycopy(original, 0, copy, 0,
                        Math.min(original.length, newLength));
    return copy;
}

```

### Collection

1. 解释
```java
public interface Collection<E> extends Iterable<E> {
```
- 继承自Iterable, 实现了forEach && iterator && spliterator
- removeIf方法传入Predicate(函数接口, 传入比较的方法), 利用Iterator迭代

2. 源码
```java
public interface MyCollection<E> extends Iterable<E> {
    int size();
    boolean isEmpty();
    boolean contains(Object o);
    Iterator<E> iterator();
    Object[] toArray();
    <T> T[] toArray(T[] a);
    boolean add(E e);
    boolean remove(Object o);
    boolean containsAll(Collection<?> c);
    boolean addAll(Collection<? extends E> c);
    boolean removeAll(Collection<?> c);
    default boolean removeIf(Predicate<? super E> filter) {
        Objects.requireNonNull(filter);
        boolean removed = false;
        final Iterator<E> each = iterator();
        while (each.hasNext()) {
            if (filter.test(each.next())) {
                each.remove();
                removed = true;
            }
        }
        return removed;
    }
    boolean retainAll(Collection<?> c);
    void clear();
    boolean equals(Object o);
    int hashCode();

    // 自从 1.8
    //default Spliterator<E> spliterator() {
    //    return Spliterators.spliterator(this, 0);
    //}
    //default Stream<E> stream() {
    //    return StreamSupport.stream(spliterator(), false);
    //}
    //default Stream<E> parallelStream() {
    //    return StreamSupport.stream(spliterator(), true);
    //}

}

```

### List

1. 解释
- 相比于Collection, 主要增加了
- get
- sort
- index相关
- listIterator
- SubList

2. 源码
```java
public interface MyList<E> extends Collection<E> {
    int size();
    boolean isEmpty();
    boolean contains(Object o);
    Iterator<E> iterator();
    Object[] toArray();
    <T> T[] toArray(T[] a);
    boolean add(E e);
    boolean remove(Object o);
    boolean containsAll(Collection<?> c);
    boolean addAll(Collection<? extends E> c);
    boolean addAll(int index, Collection<? extends E> c);
    boolean removeAll(Collection<?> c);
    boolean retainAll(Collection<?> c);
    default void replaceAll(UnaryOperator<E> operator) {
        Objects.requireNonNull(operator);
        final ListIterator<E> li = this.listIterator();
        while (li.hasNext()) {
            li.set(operator.apply(li.next()));
        }
    }
    default void sort(Comparator<? super E> c) {
        Object[] a = this.toArray();
        Arrays.sort(a, (Comparator) c);
        ListIterator<E> i = this.listIterator();
        for (Object e : a) {
            i.next();
            i.set((E) e);
        }
    }
    void clear();
    boolean equals(Object o);
    int hashCode();
    E get(int index);
    E set(int index, E element);
    void add(int index, E element);
    E remove(int index);
    int indexOf(Object o);
    int lastIndexOf(Object o);
    ListIterator<E> listIterator();
    ListIterator<E> listIterator(int index);
    List<E> subList(int fromIndex, int toIndex);
```

### AbstractCollection

1. 解释
- 提供了两个抽象方法
```java
public abstract Iterator<E> iterator();
public abstract int size();
```
- 实现了toArray()方法


2. 源码
```java
public abstract class MyAbstractCollection<E> implements Collection<E> {
    protected MyAbstractCollection() {
    }
    public abstract Iterator<E> iterator();
    public abstract int size();
    public boolean isEmpty() {
        return size() == 0;
    }
    public boolean contains(Object o) {
        Iterator<E> it = iterator();
        if (o==null) {
            while (it.hasNext())
                if (it.next()==null)
                    return true;
        } else {
            while (it.hasNext())
                if (o.equals(it.next()))
                    return true;
        }
        return false;
    }
    public Object[] toArray() {
        // Estimate size of array; be prepared to see more or fewer elements
        Object[] r = new Object[size()];
        Iterator<E> it = iterator();
        for (int i = 0; i < r.length; i++) {
            if (! it.hasNext()) // fewer elements than expected
                return Arrays.copyOf(r, i);
            r[i] = it.next();
        }
        return it.hasNext() ? finishToArray(r, it) : r;
    }
    public <T> T[] toArray(T[] a) {
        // Estimate size of array; be prepared to see more or fewer elements
        int size = size();
        T[] r = a.length >= size ? a :
                (T[])java.lang.reflect.Array
                        .newInstance(a.getClass().getComponentType(), size);
        Iterator<E> it = iterator();

        for (int i = 0; i < r.length; i++) {
            if (! it.hasNext()) { // fewer elements than expected
                if (a == r) {
                    r[i] = null; // null-terminate
                } else if (a.length < i) {
                    return Arrays.copyOf(r, i);
                } else {
                    System.arraycopy(r, 0, a, 0, i);
                    if (a.length > i) {
                        a[i] = null;
                    }
                }
                return a;
            }
            r[i] = (T)it.next();
        }
        // more elements than expected
        return it.hasNext() ? finishToArray(r, it) : r;
    }
    private static <T> T[] finishToArray(T[] r, Iterator<?> it) {
        int len = r.length;
        int i = len;
        while (it.hasNext()) {
            if (i == len) {
                len = ArraysSupport.newLength(len,
                        1,             /* minimum growth */
                        (len >> 1) + 1 /* preferred growth */);
                r = Arrays.copyOf(r, len);
            }
            r[i++] = (T)it.next();
        }
        // trim if overallocated
        return (i == len) ? r : Arrays.copyOf(r, i);
    }
    public boolean add(E e) {
        throw new UnsupportedOperationException();
    }
    public boolean remove(Object o) {
        Iterator<E> it = iterator();
        if (o==null) {
            while (it.hasNext()) {
                if (it.next()==null) {
                    it.remove();
                    return true;
                }
            }
        } else {
            while (it.hasNext()) {
                if (o.equals(it.next())) {
                    it.remove();
                    return true;
                }
            }
        }
        return false;
    }
    public boolean containsAll(Collection<?> c) {
        for (Object e : c)
            if (!contains(e))
                return false;
        return true;
    }
    public boolean addAll(Collection<? extends E> c) {
        boolean modified = false;
        for (E e : c)
            if (add(e))
                modified = true;
        return modified;
    }
    public boolean removeAll(Collection<?> c) {
        Objects.requireNonNull(c);
        boolean modified = false;
        Iterator<?> it = iterator();
        while (it.hasNext()) {
            if (c.contains(it.next())) {
                it.remove();
                modified = true;
            }
        }
        return modified;
    }
    public boolean retainAll(Collection<?> c) {
        Objects.requireNonNull(c);
        boolean modified = false;
        Iterator<E> it = iterator();
        while (it.hasNext()) {
            if (!c.contains(it.next())) {
                it.remove();
                modified = true;
            }
        }
        return modified;
    }
    public void clear() {
        Iterator<E> it = iterator();
        while (it.hasNext()) {
            it.next();
            it.remove();
        }
    }
    public String toString() {
        Iterator<E> it = iterator();
        if (! it.hasNext())
            return "[]";
        StringBuilder sb = new StringBuilder();
        sb.append('[');
        for (;;) {
            E e = it.next();
            sb.append(e == this ? "(this Collection)" : e);
            if (! it.hasNext())
                return sb.append(']').toString();
            sb.append(',').append(' ');
        }
    }

}
```

2. 解释
- toArray
该方法没有直接返回, 目的是为了应对多线程
```java
public Object[] toArray() {
    // Estimate size of array; be prepared to see more or fewer elements
    Object[] r = new Object[size()];
    Iterator<E> it = iterator();
    for (int i = 0; i < r.length; i++) {
        if (! it.hasNext()) // fewer elements than expected
            return Arrays.copyOf(r, i);
        r[i] = it.next();
    }
    return it.hasNext() ? finishToArray(r, it) : r;
}
```
- 为什么不是遍历迭代器？  
如果有多个线程操作该集合，其中某个线程向集合中添加了元素，此时如果在迭代器的遍历中向数组中添加元素，则会抛出数组越界异常。
- 为什么返回一个新数组? 
如果多线程删除了元素, 新数组长度更小, 节约空间
如果多线程添加了元素, 调用finishToArray
```java
private static <T> T[] finishToArray(T[] r, Iterator<?> it) {
    int len = r.length;
    int i = len;
    while (it.hasNext()) {
        if (i == len) {
            len = ArraysSupport.newLength(len,
                    1,             /* minimum growth */
                    (len >> 1) + 1 /* preferred growth */);
            r = Arrays.copyOf(r, len);
        }
        r[i++] = (T)it.next();
    }
    // trim if overallocated
    return (i == len) ? r : Arrays.copyOf(r, i);
}
```
- 该方法每次迭代都会比较当前数组长度与迭代器长度, 利用Array.copyOf进行扩容
最后返回前再次判断, 确保数组容量与实际数据长度相同

### AbstractList

1. 概述
* extend
  - AbstractList 继承自 AbstractCollection 抽象类，实现了 List 接口 ，
  - 它实现了 List 的一些位置相关操作(比如 get,set,add,remove)，是第一个实现随机访问方法的集合类，但不支持添加和替换。
  - AbstractList 内部已经提供了 Iterator, ListIterator 迭代器的实现类，分别为 Itr, ListItr
  - 实现了SubList类
* super
  - 是ArrayList 和 AbstractSequentiaList 的父类。
  - 提供了一个抽象类
  `public abstract E get(int index);`

#### modCount 与 fail-fast
- modCount作用是记录集合结构被改变的次数(添加, 删除等等), 目的是为了防止迭代过程中,
其他线程, 或者自己对集合结构修改, 并不只是更改元素内容
- fail-fast机制在迭代器中实现, fail-fast机制并不保证在不同步的修改下一定会抛出异常，它只是尽最大努力去抛出，所以这种机制一般仅用于检测bug。

#### Itr类

1. 特征变量
- cursor: 是指集合遍历过程中的即将遍历的元素的索引
- lastRet: 它主要用于记录刚刚遍历过的元素的索引
- expectedModCount: 为集合修改次数(默认为0)
`int expectedModCount = modCount;`

2. 源码
```java
private class Itr implements Iterator<E> {
        /**
         * Index of element to be returned by subsequent call to next.
         */
        int cursor = 0;

        /**
         * Index of element returned by most recent call to next or
         * previous.  Reset to -1 if this element is deleted by a call
         * to remove.
         */
        int lastRet = -1;

        /**
         * The modCount value that the iterator believes that the backing
         * List should have.  If this expectation is violated, the iterator
         * has detected concurrent modification.
         */
        int expectedModCount = modCount;

        public boolean hasNext() {
            return cursor != size();
        }

        public E next() {
            checkForComodification();
            try {
                int i = cursor;
                E next = get(i);
                lastRet = i;
                cursor = i + 1;
                return next;
            } catch (IndexOutOfBoundsException e) {
                checkForComodification();
                throw new NoSuchElementException(e);
            }
        }

        public void remove() {
            if (lastRet < 0)
                throw new IllegalStateException();
            checkForComodification();

            try {
                AbstractList.this.remove(lastRet);
                if (lastRet < cursor)
                    cursor--;
                lastRet = -1;
                expectedModCount = modCount;
            } catch (IndexOutOfBoundsException e) {
                throw new ConcurrentModificationException();
            }
        }

        final void checkForComodification() {
            if (modCount != expectedModCount)
                throw new ConcurrentModificationException();
        }
    }

```

3. 解释
- iterator进行next()和remove()前都需要进行checkForComodification(), 检查迭代过程中集合结构是否放生改变 ? 抛出ConcurrentModificationException() : 正常执行
- 迭代器自身的next, remove不会对modCount进行修改, 集合调用add等方法时会修改

#### 如何避免fail-fast
1. 调用Iterator自身的remove()而不是集合的  
    Itr.remove()并不会修改modCount的值，并且不会对后面的遍历造成影响，因为该方法remove不能指定元素，只能remove当前遍历过的那个元素，所以调用该方法并不会发生fail-fast现象。该方法有局限性。
2. 使用java并发包(java.util.concurrent)中的类来代替 ArrayList 和hashMap。  
示例  
- CopyOnWriterArrayList  
CopyOnWriter是写时复制的容器(COW)，在读写时是线程安全的。该容器在对add和remove等操作时，并不是在原数组上进行修改，而是将原数组拷贝一份，在新数组上进行修改，待完成后，才将指向旧数组的引用指向新数组，所以对于 CopyOnWriterArrayList在迭代过程并不会发生fail-fast现象。但 CopyOnWrite容器只能保证数据的最终一致性，不能保证数据的实时一致性。
- ConcurrentHashMap  
ConcurrentHashMap采用了锁机制，是线程安全的。在迭代方面，ConcurrentHashMap使用了一种不同的迭代方式。在这种迭代方式中，当iterator被创建后集合再发生改变就不再是抛出ConcurrentModificationException，取而代之的是在改变时new新的数据从而不影响原有的数据 ，iterator完成后再将头指针替换为新的数据 ，这样iterator线程可以使用原来老的数据，而写线程也可以并发的完成改变。即迭代不会发生fail-fast，但不保证获取的是最新的数据。


#### ListItr类

1. 概述
- ListItr继承自Itr实现了ListIterator接口
- 添加了previous(返回前一位), add(增加), set(修改)方法
- 与Itr一样, 每次修改前需要检查modCount是否一致, 修改后再次同步modCount

2. 源码
```java
private class ListItr extends Itr implements ListIterator<E> {
        ListItr(int index) {
            cursor = index;
        }

        public boolean hasPrevious() {
            return cursor != 0;
        }

        public E previous() {
            checkForComodification();
            try {
                int i = cursor - 1;
                E previous = get(i);
                lastRet = cursor = i;
                return previous;
            } catch (IndexOutOfBoundsException e) {
                checkForComodification();
                throw new NoSuchElementException(e);
            }
        }

        public int nextIndex() {
            return cursor;
        }

        public int previousIndex() {
            return cursor-1;
        }

        public void set(E e) {
            if (lastRet < 0)
                throw new IllegalStateException();
            checkForComodification();

            try {
                AbstractList.this.set(lastRet, e);
                expectedModCount = modCount;
            } catch (IndexOutOfBoundsException ex) {
                throw new ConcurrentModificationException();
            }
        }

        public void add(E e) {
            checkForComodification();

            try {
                int i = cursor;
                AbstractList.this.add(i, e);
                lastRet = -1;
                cursor = i + 1;
                expectedModCount = modCount;
            } catch (IndexOutOfBoundsException ex) {
                throw new ConcurrentModificationException();
            }
        }
    }
```

#### 


### ArrayList

:::warning 注意
ArrayList不是线程安全的, 如果需要, 可以选择使用Collections.synchronizedList方法“包装”列表。最好在创建时执行此操作，以防止意外不同步地访问列表   - from Josh Bloch, Neal Gafter
:::
#### 概述
1. 创建
```java
public class ArrayList<E> 
    extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```

2. 构造函数: 
- 无参长度默认为10
- 指定长度
- 从另一个Collection拷贝
```java
public ArrayList(Collection<? extends E> c) {
        Object[] a = c.toArray();
        if ((size = a.length) != 0) {
            if (c.getClass() == ArrayList.class) {
                elementData = a;
            } else {
                elementData = Arrays.copyOf(a, size, Object[].class);
            }
        } else {
            // replace with empty array.
            elementData = EMPTY_ELEMENTDATA;
        }
    }
```



#### 其他方法

1. trimToSize(最小化)
- 用来最小化实例存储，将容器大小调整为当前元素所占用的容量大小。
```java
public void trimToSize() {
    modCount++;
    if (size < elementData.length) {
        elementData = (size == 0)
            ? EMPTY_ELEMENTDATA
            : Arrays.copyOf(elementData, size);
    }
}
```
2. ensureCapacity(最大化)
- 利用grow(minCapacity)主动扩容, 当需要扩大的容量很大时, 能有效提高效率
```java
public void ensureCapacity(int minCapacity) {
    if (minCapacity > elementData.length
        && !(elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
                && minCapacity <= DEFAULT_CAPACITY)) {
        modCount++;
        grow(minCapacity);
    }
}
```
3. addAll  
- modCount++
- 拷贝新集合
- 判断是否超出原集合剩余容量
- System.copy()

4. shiftTailOverGap
- 将某段元素进行平移

5. batchRemove  
retainAll , removeAll均通过调用此方法实现
1. 第一次循环, 记录原数组中第一次出现的位置
2. 第二次循环
```java
for (Object e; r < end; r++)
    if (c.contains(e = es[r]) == complement)
        es[w++] = e;
```
- r: 记录遍历到的index
- w: 记录原始数组被覆盖到的index
- 这部分的意思是, w的目的是记录新的内容覆盖掉原有的内容, 覆盖的原则是, 判断elementData[r]是否符合需要, 若符合就把他粘到w处
- 最后finally执行shiftTailOverGap, 目的是把后面的乱七八糟的后缀


#### 核心方法
1. grow
- 不传参
`return grow(size + 1);`
- 传参
```java
private Object[] grow(int minCapacity) {
    int oldCapacity = elementData.length;
    if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        int newCapacity = ArraysSupport.newLength(oldCapacity,
                minCapacity - oldCapacity, /* minimum growth */
                oldCapacity >> 1           /* preferred growth */);
        return elementData = Arrays.copyOf(elementData, newCapacity);
    } else {
        return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
    }
}
```
- 若扩容时没有元素直接阔到max(10, minCapacity)
- 若有元素, 由于右移运算符的存在, 每次扩容并不一定是minCapacity的的大小, 一般为原大小的1.5倍, 具体可以查看System.newLength 和 System.hugeLength

2. clone()  
常规的浅拷贝
3. add(), set(), remove()
    1. new ArrayList()
        - 调用构造函数创建新的空集合集合
        - 通过AbstractList创建modCount=0
    2. add(): 
        - modCount++
        - if elementData.length >= 0 ? 扩容50% :扩容默认10格 
        - elementData[size] = e (size是已经存入的数据个数)
    2. 若集合满了则先调用grow()扩容, 在赋值

6. add(index), remove(index)
- add(index)同理, 扩容采用System.arraycopy在原数组上扩容
- 若index不是最后一个, 则需要先用System.arraycopy从index让后方的数据向后挪一位, 空出新的位置用来插入
```java
System.arraycopy(elementData, index,
                         elementData, index + 1,
                         s - index);
```
- remove(index)调用了fastRemove(), 通过System.arraycopy()最小化容器,在将指定位置设置为null
```java
private void fastRemove(Object[] es, int i) {
    modCount++;
    final int newSize;
    if ((newSize = size - 1) > i)
        System.arraycopy(es, i + 1, es, i, newSize - i);
    es[size = newSize] = null;
}
```


### 待续...

## Set

### Set

#### 概述
```java
public interface Set<E> extends Collection<E> {
```

### AbstractSet

#### 概述
```java
public abstract class AbstractSet<E> extends AbstractCollection<E> implements Set<E> {
```
1. 继承自AbstractCollection, 实现了Set接口
2. 只重写了 equals(), hashcode(), removeAll()方法, 几乎没变

### 待续...

## Map

### 接口Map

### Map

#### 基础方法
```java
public interface Map<K, V> {
    int size();
    boolean isEmpty();
    boolean containsKey(Object key);
    boolean containsValue(Object value);
    V get(Object key);
    V put(K key, V value);
    V remove(Object key);
    void putAll(Map<? extends K, ? extends V> m);
    void clear();

    Set<K> keySet();
    Collection<V> values();
    Set<Map.Entry<K, V>> entrySet();

    static <K, V> Map<K, V> of(K k1, V v1, K k2, V v2) {  // 最大支持10对
        return new ImmutableCollections.MapN<>(k1, v1, k2, v2);
    }
    default boolean remove(Object key, Object value) { // 允许key为null
        Object curValue = get(key);
        if (!Objects.equals(curValue, value) ||
            (curValue == null && !containsKey(key))) {
            return false;
        }
        remove(key);
        return true;
    }
```
#### 内部Entry接口
```java
    interface Entry<K, V> {
        K getKey();
        V getValue();
        V setValue(V value);
        boolean equals(Object o);
        int hashCode();
        public static <K extends Comparable<? super K>, V> Comparator<Map.Entry<K, V>> comparingByKey() {
            return (Comparator<Map.Entry<K, V>> & Serializable) (c1, c2) -> c1.getKey().compareTo(c2.getKey());
        }
        public static <K, V extends Comparable<? super V>> Comparator<Map.Entry<K, V>> comparingByValue() {}
        public static <K, V> Comparator<Map.Entry<K, V>> comparingByKey(Comparator<? super K> cmp) {
            Objects.requireNonNull(cmp);
            return (Comparator<Map.Entry<K, V>> & Serializable) (c1, c2) -> cmp.compare(c1.getKey(), c2.getKey());
        }
        public static <K, V> Comparator<Map.Entry<K, V>> comparingByValue(Comparator<? super V> cmp) {}
    }
```
#### 其他方法
- equal hashcode
- 3个replace 4个ifAbsent 1个merge
```java
    boolean equals(Object o);
    int hashCode();
    default V getOrDefault(Object key, V defaultValue) {  // 没有则返回
        V v;
        return (((v = get(key)) != null) || containsKey(key))
            ? v
            : defaultValue;
    }
    default void forEach(BiConsumer<? super K, ? super V> action) {
        Objects.requireNonNull(action);
        for (Map.Entry<K, V> entry : entrySet()) {
            K k;
            V v;
            try {
                k = entry.getKey();
                v = entry.getValue();
            } catch (IllegalStateException ise) {
                // this usually means the entry is no longer in the map.
                throw new ConcurrentModificationException(ise);
            }
            action.accept(k, v);
        }
    }
    default boolean replace(K key, V oldValue, V newValue) {
        Object curValue = get(key);
        if (!Objects.equals(curValue, oldValue) ||
            (curValue == null && !containsKey(key))) {
            return false;
        }
        put(key, newValue);
        return true;
    }
    default V replace(K key, V value) {}
    default void replaceAll(BiFunction<? super K, ? super V, ? extends V> function) {  // function批量处理
        Objects.requireNonNull(function);
        for (Map.Entry<K, V> entry : entrySet()) {
            K k;
            V v;
            try {
                k = entry.getKey();
                v = entry.getValue();
            } catch (IllegalStateException ise) {
                // this usually means the entry is no longer in the map.
                throw new ConcurrentModificationException(ise);
            }

            // ise thrown from function is not a cme.
            v = function.apply(k, v);

            try {
                entry.setValue(v);
            } catch (IllegalStateException ise) {
                // this usually means the entry is no longer in the map.
                throw new ConcurrentModificationException(ise);
            }
        }
    }
    default V putIfAbsent(K key, V value) {  // 不存在key则添加
        V v = get(key);
        if (v == null) {
            v = put(key, value);
        }
        return v;
    }

    // computeIfPresent 同理
    // compute 用key和value生产新的value
    default V computeIfAbsent(K key,
            Function<? super K, ? extends V> mappingFunction) {  // 不存在就用方法新建
        Objects.requireNonNull(mappingFunction);
        V v;
        if ((v = get(key)) == null) {
            V newValue;
            if ((newValue = mappingFunction.apply(key)) != null) {
                put(key, newValue);
                return newValue;
            }
        }

        return v;
    }
    default V merge(K key, V value,
        BiFunction<? super V, ? super V, ? extends V> remappingFunction) {
        Objects.requireNonNull(remappingFunction);
        Objects.requireNonNull(value);
        V oldValue = get(key);
        V newValue = (oldValue == null) ? value :
                remappingFunction.apply(oldValue, value);
        if (newValue == null) {
            remove(key);
        } else {
            put(key, newValue);
        }
        return newValue;
    }
```

### AbstractMap

#### 概述
1. 实现Map接口, 没有实现Map.Entry()接口
2. 有一个抽象方法
```java
public abstract Set<Entry<K,V>> entrySet();
```
3. 默认不支持修改

#### enttrySet()
```java
public abstract Set<Entry<K,V>> entrySet();
```
1. 当我们要实现一个不可变的 Map 时，只需要继承这个类，然后实现 entrySet() 方法，这个方法返回一个保存所有 key-value 映射的 set。 通常这个 Set 不支持 add(), remove() 方法，Set 对应的迭代器也不支持 remove() 方法。
2. 如果想要实现一个可变的 Map,我们需要在上述操作外，重写 put() 方法，因为 默认不支持 put 操作：
```java
public V put(K key, V value) {
    throw new UnsupportedOperationException();
}
```
而且 entrySet() 返回的 Set 的迭代器，也得实现 remove() 方法，因为 AbstractMap 中的 删除相关操作都需要调用该迭代器的 remove() 方法。

#### 基础方法
1. put()  
默认需要重写, 否则直接抛异常
2. 其他无非都是Iterator遍历

#### 三个视图
1. 获取所有键 `public Set<K> keySet() {`
2. 获取所有值 `public Collection<V> values() {`
3. 获取所有键值对 `public abstract Set<Entry<K,V>> entrySet();`



### SortedMap  
```java
public interface SortedMap<K,V> extends Map<K,V> {
```
内置方法：
```java
    Comparator<? super K> comparator();
    SortedMap<K,V> subMap(K fromKey, K toKey);
    SortedMap<K,V> headMap(K toKey);
    SortedMap<K,V> tailMap(K fromKey);
    K firstKey();
    K lastKey();
    Set<K> keySet();
    Collection<V> values();
    Set<Map.Entry<K, V>> entrySet();
```

### NavigableMap
```java
public interface NavigableMap<K,V> extends SortedMap<K,V> {
```
内置方法：
```java
    Map.Entry<K,V> lowerEntry(K key);  // 比给定的entry小的最大的entry 
    K lowerKey(K key);
    Map.Entry<K,V> floorEntry(K key);
    K floorKey(K key); // <=
    Map.Entry<K,V> ceilingEntry(K key);
    K ceilingKey(K key);
    Map.Entry<K,V> higherEntry(K key);
    K higherKey(K key);
    Map.Entry<K,V> firstEntry();
    Map.Entry<K,V> lastEntry();
    Map.Entry<K,V> pollFirstEntry();
    Map.Entry<K,V> pollLastEntry();
    NavigableMap<K,V> descendingMap();  // reverse order view
    NavigableSet<K> navigableKeySet();
    NavigableSet<K> descendingKeySet();
    NavigableMap<K,V> subMap(K fromKey, boolean fromInclusive, 
                             K toKey,   boolean toInclusive);
    NavigableMap<K,V> headMap(K toKey, boolean inclusive);  // less than toKey
    NavigableMap<K,V> tailMap(K fromKey, boolean inclusive);
    SortedMap<K,V> subMap(K fromKey, K toKey);
    SortedMap<K,V> headMap(K toKey);
    SortedMap<K,V> tailMap(K fromKey);
```

### TreeMap
```java
public class TreeMap<K,V>
    extends AbstractMap<K,V>
    implements NavigableMap<K,V>, Cloneable, java.io.Serializable
{
```
#### 成员变量
```java
    // maintain the order Or keep keys'order natural
    private final Comparator<? super K> comparator;  
    private transient Entry<K,V> root;
    private transient int size = 0;
    private transient int modCount = 0;
static final class Entry<K,V> implements Map.Entry<K,V> {
        K key;
        V value;
        Entry<K,V> left;
        Entry<K,V> right;
        Entry<K,V> parent;
        boolean color = BLACK;
```

#### 构造器
是否自带Comparator  
是否从其他Map复制  
```java
    public TreeMap() {
        comparator = null;
    }
    public TreeMap(Comparator<? super K> comparator) {
        this.comparator = comparator;
    }
    public TreeMap(Map<? extends K, ? extends V> m) {
        comparator = null;
        putAll(m);
    }
    public TreeMap(SortedMap<K, ? extends V> m) {
        comparator = m.comparator();
        try {
            buildFromSorted(m.size(), m.entrySet().iterator(), null, null);
        } catch (java.io.IOException cannotHappen) {
        } catch (ClassNotFoundException cannotHappen) {
        }
    }
```

#### Put
put就是普通的二叉树插入  
若用户指定判断条件，就按照指定的条件判断插入坐枝还是插入右枝  
否则使用默认的比较方法  
重点是插入后调用了fixAfterInsertion(e);
```java
    public V put(K key, V value) {
        Entry<K,V> t = root;
        if (t == null) {
            compare(key, key); // type (and possibly null) check
            root = new Entry<>(key, value, null);
            size = 1;
            modCount++;
            return null;
        }
        int cmp;
        Entry<K,V> parent;
        // split comparator and comparable paths
        Comparator<? super K> cpr = comparator;
        if (cpr != null) {
            do {
                parent = t;
                cmp = cpr.compare(key, t.key);
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else
                    return t.setValue(value);
            } while (t != null);
        }
        else {
            if (key == null)
                throw new NullPointerException();
            @SuppressWarnings("unchecked")
                Comparable<? super K> k = (Comparable<? super K>) key;
            do {
                parent = t;
                cmp = k.compareTo(t.key);
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else
                    return t.setValue(value);
            } while (t != null);
        }
        Entry<K,V> e = new Entry<>(key, value, parent);
        if (cmp < 0)
            parent.left = e;
        else
            parent.right = e;
        fixAfterInsertion(e);
        size++;
        modCount++;
        return null;
    }
```

#### fixAfterInsertion(e);

#### 

### HashMap

```java
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {
```

#### 成员变量
1. `private static final long serialVersionUID = 362498820763181265L;`：序列化ID
2. `static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16`：指定默认初始长度
3. `static final int MAXIMUM_CAPACITY = 1 << 30;`：最大长度
4. `static final float DEFAULT_LOAD_FACTOR = 0.75f;`： 负载因子
5. `static final int TREEIFY_THRESHOLD = 8;`：由链表转为红黑树的临界值1（链表长度>8）
6. `static final int UNTREEIFY_THRESHOLD = 6;`：由红黑树转为链表的临界值
7. `static final int MIN_TREEIFY_CAPACITY = 64;`：：由链表转为红黑树的临界值2（capicity>64）

- loadFactor值为0.75
加载因子的选择与Poisson_distribution有关
链表8号位有值的概率是0.00000006（理想随机情况下），具体可以查看源码注释
更多的是为了防止用户自己实现了不好的哈希算法时导致链表过长，从而导致查询效率低，而此时转为红黑树更多的是一种保底策略，用来保证极端情况下查询的效率。
- 刚开始不使用红黑树的原因

单个 TreeNode 需要占用的空间大约是普通 Node 的两倍，所以只有当包含足够多的 Nodes 时才会转成 TreeNodes，
而当桶中节点数小于6时又会变回普通的链表的形式，以便节省空间，
- 链表转红黑树选择8
红黑树平均查找长度为log(n)
链表平均查找长度为 n/2

#### 构造器
1. HashMap提供了4种构造器，可以自主选择初始长度和负载因子
2. 若传入的初始长度不是二次幂，java会自动将用户传入的initialCapacity转换为比它大的二进制数，目的是方便在求索引时使用位运算更快取模
::: tip 注意
虽然创建了新的table，但是没有将capicity进行赋值仍然是零，只将loadFactor和threshold进行赋值  
这点需要在resize()中用到
:::
```java
public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
    // 不能超过默认最大长度
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    // 负载因子不能小于零
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " + loadFactor);
    this.loadFactor = loadFactor;
    // 这里虽然不是用`capicity * loadfactory`为扩容临界值赋值, 但是还会在put方法里重新修正
    this.threshold = tableSizeFor(initialCapacity);
}
public HashMap(int initialCapacity) {
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
}

public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
    // 此时阈值和容量值大小都为0
}

public HashMap(Map<? extends K, ? extends V> m) {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
    putMapEntries(m, false);
}
```

#### 初始长度修正

这里使用5次右移+或运算  
一下是举例： 
```
0000 0000 0000 1010 0000 0011 1110 1010  n
0000 0000 0000 0101 0000 0001 1111 0101  n >>> 1
---------------------------------------  |
0000 0000 0000 1111 0000 0011 1111 1111  n
0000 0000 0000 0011 1100 0000 1111 1111  n >>> 2
---------------------------------------  |
0000 0000 0000 1111 1100 0011 1111 1111  n
0000 0000 0000 0000 1111 1100 0011 1111  n >>> 4
---------------------------------------  |
0000 0000 0000 1111 1111 1111 1111 1111  n
0000 0000 0000 0000 0000 1111 1111 1111  n >>> 8
剩下的就不用写了全部被转换成1，最后在加上1就是：
>Returns a power of two size for the given target capacity.
```
```java
static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

#### 链表转红黑树  

若链表长度>8，尝试转为红黑树
```java
if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
    treeifyBin(tab, hash);
```

- 若检测到size<64，扩容，不转为红黑树
```java
final void treeifyBin(Node<K,V>[] tab, int hash) {
    int n, index; Node<K,V> e;
    if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
        resize();
```
resize扩容后所有元素的索引值会重新分配，链表长度会发生变化，更加散列

- 若检测到size>=64，转为红黑树
    1. 链表转为LinkedHashMap（节点转为TreeNode，加入向前的指针和左右字节点）
    ```java
    else if ((e = tab[index = (n - 1) & hash]) != null) {
        TreeNode<K,V> hd = null, tl = null;
        do {
            TreeNode<K,V> p = replacementTreeNode(e, null);
            if (tl == null)
                hd = p;
            else {
                p.prev = tl;
                tl.next = p;
            }
            tl = p;
        } while ((e = e.next) != null);
    ```
    2. 把根节点放入桶中，进行平衡

    3. 待续


#### 扩容_resize

1. 确定新容量的大小：  

    - 若oldCap > 0(正常情况下扩容)
        ```java
        //翻倍或者调为MAXIMUM_CAPACITY(本身就超过最大值或者翻倍后会超过最大值)
        if (oldCap > 0) {
            if (oldCap >= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
                return oldTab;
            }
            else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                        oldCap >= DEFAULT_INITIAL_CAPACITY)
                newThr = oldThr << 1; // double threshold
        }
        ```
    - 若oldThr > 0（初始化下需要扩容，手动选择初始容量） 
        ```java
        // 确定初始长度
        else if (oldThr > 0) // initial capacity was placed in threshold
            newCap = oldThr;
        ```
        这里需要说明，在构造器中有如下代码
        ```java
        this.threshold = tableSizeFor(initialCapacity);
        // tableSizeFor返回的就是Capicity，只不过赋值给了threshold(也就是oldThr)，在这里newCap才被确定
        ```
    - 若oldCap == oldThr == 0（初始化下需要扩容，没有手动选择初始容量）
        按照默认值进行初始化
        ```java
        else {               // zero initial threshold signifies using defaults
            newCap = DEFAULT_INITIAL_CAPACITY;
            newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
        }
        ```
2. 确定新的扩容边界
    ```java
    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                    (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;
    ```

3. 开辟新的空间，重新排列原来的元素
    - 开辟
    ```java
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
    ```
    若原数组不为空（不是刚初始化的），循环原tab  
    - 用e代替oldTab
    ```java
    if (oldTab != null) {
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
    ```
    - 若原tab在j处不为空
        1. 清空原table在j处的占用
            ```java
            oldTab[j] = null;
            ```
        2. 重新计算索引
            - 若不是链表或红黑树，直接移动
            ```java
            if (e.next == null)
                newTab[e.hash & (newCap - 1)] = e;
            ```
            - 若是红黑树，待续
            ```java
            else if (e instanceof TreeNode)
                ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
            ```
            - 若是链表  
            这里 e.hash & oldCap 直接与二次幂（不是n-1）做&运算
            二次幂低位全为零，与hash做与运算后能够得到得到新索引的最高位为是0还是1
            (e.hash & oldCap) == 0 => 确定新索引是原索引还是原索引+n  
            ```java
                else { // preserve order
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        // 判断新索引最高为
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                //如果可能会拼接一个新链表
                                loTail.next = e;
                            loTail = e;
                        }
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    // 新链表的头节点装入到新桶中
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
            ```java


#### 扩容后的索引规律  
假如原数组长度n = 16  

1. hash & (n-1)
```
- key1 与 15  
1101 1001 0010 1100 1111 000|0 0101  key1.hashCode()   
0000 0000 0000 0000 0000 000|0 1111  n - 1  
----------------------------------  &    
0000 0000 0000 0000 0000 000|0 0101  5  
- key1 与 31
1101 1001 0010 1100 1111 000|0 0101  key1.hashCode()
0000 0000 0000 0000 0000 000|1 1111  n * 2 - 1
----------------------------------  &
0000 0000 0000 0000 0000 000|0 0101  5
- key2 与 15  
1101 1001 0010 1100 1111 001|1 0101  key2.hashCode()  
0000 0000 0000 0000 0000 000|0 1111  n - 1  
----------------------------------  &  
0000 0000 0000 0000 0000 000|0 0101  5   
- key2 与 31   
1101 1001 0010 1100 1111 001|1 0101  key2.hashCode()  
0000 0000 0000 0000 0000 000|1 1111  n * 2 - 1  
----------------------------------  &
0000 0000 0000 0000 0000 000|1 0101  5 + 16
```
由上图可见，新索引位置只能是原索引或者原索引+n，到底是那种情况只用看新索引高位是0还是1  
- 优点：不用真的重新计算新索引位置，只需要计算高位是0还是1即可确定新索引

2. hash & n
- key2 与 16  
1101 1001 0010 1100 1111 001|1 0101  key2.hashCode()  
0000 0000 0000 0000 0000 000|0 1111  n 
----------------------------------  &  
0000 0000 0000 0000 0000 000|0 0101  5   
- key2 与 32   
1101 1001 0010 1100 1111 001|1 0101  key2.hashCode()  
0000 0000 0000 0000 0000 000|1 0000  n
----------------------------------  &
0000 0000 0000 0000 0000 000|1 0000  得到最高位为1

#### hash计算方法

先调用key.hashCode()，在于自身高位异或
```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```
示例
```
1101 0111 1010 1111 1000 0110 0001 1011  hash
0000 0000 0000 0000 1101 0111 1010 1111  hash >>> 16
---------------------------------------  ^
1101 0111 1010 1111 0101 0001 1011 0100  
```
原因： 
1. 混合高低位信息
2. 确保hash不会向0或1单独靠拢

#### put
- put调用putVal实现
    ```java
    public V put(K key, V value) {
        return putVal(hash(key), key, value, false, true);
    }
    ```
- 方法参数
    1. boolean onlyIfAbsent ：只有不存在才添加（即不修改原数据）
    2. boolean evict ： 如果为false表示为创建状态

- 具体实现

1. 如果table == null，resize新建数组
```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
```
2. 插入/或记录被修改value的节点e
    - 若索引位置为空，直接插入
    ```java
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
    ```
    - 若不为空，且key相同，e就是当前节点
    ```java
        Node<K,V> e; K k;
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
    ```
    - 若不为空，但是为红黑树，按照红黑树插入
    ```java
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
    ```
    - 若不为空但是为链表
        找到相同节点就记录e
        没找到就尾插新结点，并判断是否转为红黑树
    ```java
        else {
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null);
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    break;
                }
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                p = e;
            }
        }
3. 如果上一步没有插入新结点而是准备覆盖value，就在这一步覆盖
```java
        if (e != null) { // existing mapping for key
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
```
4. fastfail检验，扩容检验
```java
    ++modCount;
    if (++size > threshold)
        resize();
    afterNodeInsertion(evict); // 空函数，不知道有啥用
    return null;
}
```

#### remove

1. 判断table是否为空，table是否存有元素，要找的索引位置是否有值
```java
final Node<K,V> removeNode(int hash, Object key, Object value,
                               boolean matchValue, boolean movable) {
        Node<K,V>[] tab; Node<K,V> p; int n, index;
        if ((tab = table) != null && (n = tab.length) > 0 &&
            (p = tab[index = (n - 1) & hash]) != null) {
```
2. 找到待删除节点node记录
    - index处就是所找节点
        ```java
        Node<K,V> node = null, e; K k; V v;
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            node = p;
        ```
    - 是红黑树，按照红黑树的方式查找
        ```java
        else if ((e = p.next) != null) {
            if (p instanceof TreeNode)
                node = ((TreeNode<K,V>)p).getTreeNode(hash, key);
        ```
    - 是链表，按照链表方式查找
        ```java
            else {
                do {
                    if (e.hash == hash &&
                        ((k = e.key) == key ||
                            (key != null && key.equals(k)))) {
                        node = e;
                        break;
                    }
                    p = e;
                } while ((e = e.next) != null);
            }
        }
3. 删除节点，处理后事
```java
        if (node != null && (!matchValue || (v = node.value) == value ||
                                (value != null && value.equals(v)))) {
            if (node instanceof TreeNode)
                ((TreeNode<K,V>)node).removeTreeNode(this, tab, movable);
            else if (node == p)
                tab[index] = node.next;
            else
                p.next = node.next;
            ++modCount;
            --size;
            afterNodeRemoval(node);
            return node;
        }
    }
    return null;
}
```

#### 待续...

### 待续...

## 标记接口

### 序列化

#### Serializable接口

- 序列化就是将对象转换为字节序列的过程，反序列化就是把持久化的字节文件数据恢复为对象的过程。
- 对于JVM来说，要进行持久化的类必须要有一个标记，只有持有这个标记JVM才允许类创建的对象可以通过其IO系统转换为字节数据，从而实现持久化，而这个标记就是Serializable接口。
- 而在反序列化的过程中则需要使用serialVersionUID来确定由那个类来加载这个对象，所以我们在实现Serializable接口的时候，一般还会要去尽量显示地定义serialVersionUID
```java
public class MySerializable {
    public static void main(String[] args) {
        write();
        read();
    }

    public static void write() {
        Student student = new Student(1, "zhangsan");
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream("src/resources/student.txt"));
        objectOutputStream.writeObject(student);
    }

    public static void read() {
        ObjectInputStream objectInputStream = null;
        objectInputStream = new ObjectInputStream(new FileInputStream("src/resources/student.txt"));
        Student student = (Student) objectInputStream.readObject();
    }
}
@Data
@AllArgsConstructor
class Student implements Serializable {
    private int id;
    private String name;
}
```
>如果我们在序列化中没有显示地声明serialVersionUID，则序列化运行时将会根据该类的各个方面计算该类默认的serialVersionUID值。>但是，Java官方强烈建议所有要序列化的类都显示地声明serialVersionUID字段，因为如果高度依赖于JVM默认生成serialVersionUID,可>能会导致其与编译器的实现细节耦合，这样可能会导致在反序列化的过程中发生意外的InvalidClassException异常。因此，为了保证跨不?>同Java编译器实现的serialVersionUID值的一致，实现Serializable接口的必须显示地声明serialVersionUID字段。<br/>

>此外serialVersionUID字段地声明要尽可能使用private关键字修饰，这是因为该字段的声明只适用于声明的类，该字段作为成员变量被子>类继承是没有用处的!有个特殊的地方需要注意的是，数组类是不能显示地声明serialVersionUID的，因为它们始终具有默认计算的值,不过>数组类反序列化过程中也是放弃了匹配serialVersionUID值的要求。

#### transient

- 在实现Serializable接口后可以用该关键字修饰, 让这个属性不序列化
- 但是用static修饰后, 一定不会被序列化
- 若选择实现Externalizable接口, 则属性是否进行序列化需要手动指定, 与是否有transient关键字无关

### RandomAccess

1. 概述
RandomAccess 是一个空的接口，它用来标识某个类是否支持 随机访问（随机访问，相对比“按顺序访问”）。一个支持随机访问的类明显可以使用更加高效的算法。
```java
public interface RandomAccess {
}
```
- List 中支持随机访问最佳的例子就是 ArrayList, 它的数据结构使得 get(), set(), add()等方法的时间复杂度都是 O(1);
- 反例就是 LinkedList, 链表结构使得它不支持随机访问，只能按序访问，因此在一些操作上性能略逊一筹。
2. 例子

- 通常在操作一个 List 对象时，通常会判断是否支持 随机访问，也就是* 是否为 RandomAccess 的实例*，从而使用不同的算法。
比如遍历，实现了 RandomAccess 的集合使用 get():
```java
for (int i=0, n=list.size(); i &lt; n; i++)
          list.get(i);

```
比用迭代器更快：
```java
for (Iterator i=list.iterator(); i.hasNext(); )
    i.next();
```
>实现了 RandomAccess 接口的类有：
>ArrayList, AttributeList, CopyOnWriteArrayList, Vector, Stack 等。



### Cloneable

#### 浅拷贝

1. 概述
实现了Cloneable接口的对象能进行克隆， Object实现了先拷贝
```java
public interface Cloneable {
}
```
clon方法再Object类中定义
```java
protected native Object clone() throws CloneNotSupportedException;
```

2. 引例
- 这里先定义一个学生
```java
@Data
@AllArgsConstructor
class Student implements Cloneable{
    String name;
    Address address;

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```
- student2由student浅拷贝得到
```java
Student student = new Student("a", address1);
Student student2 = (Student) student.clone();
```
- student == student2  => False
- student.address == student2.address  => True
两人的地址不同， 但是“地址”所指向的地址相同

#### 深拷贝

1. 实现Cloneable接口并重写Object类中的clone()方法；

- 在上面的例子中想要实现address也不相同可以在重写clone()加上
`stu.addr = (Address)addr.clone();   //深度复制  `

- 缺点: 如果引用类型里面还包含很多引用类型，或者内层引用类型的类里面又包含引用类型，使用clone方法就会很麻烦。这时我们可以用序列化的方式来实现对象的深克隆。

2. 实现Serializable接口，通过对象的序列化和反序列化实现克隆，可以实现真正的深度克隆。

- 手动写新的clone方法

- 缺点: 需要对象及对象所有的对象属性都实现序列化

- 示例
```java
public class DeepClone {
    public static void main(String[] args) {
        Inner inner = new Inner();
        Outer outer = new Outer(inner);
        Outer outer1 = outer.myClone();
        System.out.println(outer.inner == outer1.inner); // False
    }
}

@AllArgsConstructor
class Outer implements Serializable {
    private static final long serialVersionUID = 369285298572941L;  //最好是显式声明ID
    public Inner inner;
    public Outer myClone() {
        Outer outer = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(this);
        ByteArrayInputStream bais = new ByteArrayInputStream(baos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bais);
        outer = (Outer) ois.readObject();
        return outer;
    }
}

class Inner implements Serializable {
    private static final long serialVersionUID = 872390113109L; //最好是显式声明ID
}
```

::: tip 注意
注意：基于序列化和反序列化实现的克隆不仅仅是深度克隆，更重要的是通过泛型限定，可以检查出要克隆的对象是否支持序列化，这项检查是编译器完成的，不是在运行时抛出异常，这种是方案明显优于使用Object类的clone方法克隆对象。让问题在编译的时候暴露出来总是优于把问题留到运行时。
:::

### 待续...

## 函数式接口

### 概述
`@FunctionalInterface`
1. 特征
- 该注解只能标记在"有且仅有一个抽象方法"的接口上。
- JDK8接口中的静态方法和默认方法，都不算是抽象方法。
- 接口默认继承java.lang.Object，所以如果接口显示声明覆盖了Object中方法，那么也不算抽象方法。
- 该注解不是必须的，如果一个接口符合"函数式接口"定义，那么加不加该注解都没有影响。加上该注解能够更好地让编译器进行检查。如果编写的不是函数式接口，但是加上了@FunctionInterface，那么编译器会报错。

2. 示例
```java
// 正确的函数式接口
@FunctionalInterface
public interface TestInterface {
 
    // 抽象方法
    public void sub();
 
    // java.lang.Object中的方法不是抽象方法
    public boolean equals(Object var1);
 
    // default不是抽象方法
    public default void defaultMethod(){}
 
    // static不是抽象方法
    public static void staticMethod(){}
}
```

### Consumer

#### Consumer
1. 定义
- 它不是生产一个数据，而是消费一个数据，其数据类型由泛型决定
- 泛型指定什么类型，就可以使用accept方法消费什么类型的数据
- 至于具体怎么消费(使用)，需要自定义
```java
@FunctionalInterface
public interface Consumer<T> {

    void accept(T t);
 
    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

#### BiComsumer
与Consumer类似
```java
@FunctionalInterface
public interface BiConsumer<T, U> {
    void accept(T t, U u);
default BiConsumer<T, U> andThen(BiConsumer<? super T, ? super U> after) {
    Objects.requireNonNull(after);
    return (l, r) -> {
        accept(l, r);
        after.accept(l, r);
    };
}
```

2. 示例
Iterable接口,用法和Thread类似
```java
public static void main(String[] args) {
    List<String> list = new ArrayList<>();
    list.add("1");
    list.add("1");
    Consumer consumer = new Consumer() {
        @Override
        public void accept(Object o) {
            System.out.println(o);
        }
    };
    list.forEach(consumer);
}
```


### Predicate

1. 特性
- JDK8 提供的函数式接口
- 提供一个抽象方法test, 接受一个参数, 根据这个参数进行一些判断, 返回判断结果 true / false
- 提供几个默认的default方法, and, or, negate 用于进行组合判断
- 在流中被广泛使用
2. 定义
```java
@FunctionalInterface
public interface MyPredict<T> {
    // jdk 1.8

    boolean test(T t);

    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }
    default Predicate<T> negate() {
        return (t) -> !test(t);
    }
    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }
    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
    // jdk 11
    static <T> Predicate<T> not(Predicate<? super T> target) {
        Objects.requireNonNull(target);
        return (Predicate<T>)target.negate();
    }
}
```
3. 示例
```java
public static void main(String[] args) {
    Predicate predicate = "Yes"::equals;   // lambda表达式
    Predicate predicate2 = o -> !"No".equals(o);
    System.out.println(predicate.test("Yes"));
    System.out.println(predicate.and(predicate2).test("Yes"));;
}
```

### Function

#### Function
1. 特性
Function接口的主要作用是将一个给定的对象进行加工,然后返回加工后的对象,这个加工可以是任何操作.
2. 定义
```java
public interface MyFunction<T, R> {
    R apply(T t);

    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    static <T> Function<T, T> identity() {
        return t -> t;
    }

}

```
3. 示例
```java
public static void main(String[] args) {
    Function<String, Integer> f1 = (t) -> Integer.valueOf(t) * 10;
    System.out.println(f1.apply("3"));
    // 返回自己
    System.out.println(Function.identity().apply("3"));
    // apply后执行
    System.out.println(f1.andThen((r) -> String.valueOf(r) + ".....").apply("4"));
    // apply前执行
    System.out.println(f1.compose((String r) -> r.substring(1)).apply("a5"));
}
```

#### BiFunction
```java
@FunctionalInterface
public interface BiFunction<T, U, R> {
    R apply(T t, U u);
    default <V> BiFunction<T, U, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t, U u) -> after.apply(apply(t, u));
    }
```

### UnaryOperator

1. 定义
```java
@FunctionalInterface
public interface MyUnaryOperator<T> extends Function<T, T> {
    static <T> UnaryOperator<T> identity() {
        return t -> t;
    }
}
`
```
2. 示例
```java
public static void main(String[] args) {
    UnaryOperator<Integer> unaryOperator = x -> x + 1;
    System.out.println(unaryOperator.apply(10)); // 11 
    UnaryOperator<String> unaryOperator1 = x -> x + 1;
    System.out.println(unaryOperator1.apply("aa")); // aa1
}
```


### Compare

#### Comparable
- Comparable 是排序接口。
- 若一个类实现了Comparable接口，就意味着“该类支持排序”。
```java
public interface Comparable<T> {
        public int compareTo(T o);
}
```

#### Comparator

##### 源码
```java
@FunctionalInterface
public interface MyComparator<T> {

    // jdk 1.2
    int compare(T o1, T o2);
    boolean equals(Object obj);

    // jdk 1.8
    //default Comparator<T> reversed() {
    //    return Collections.reverseOrder(this);
    //}

    default Comparator<T> thenComparing(Comparator<? super T> other) {
        Objects.requireNonNull(other);
        return (Comparator<T> & Serializable) (c1, c2) -> {
            int res = compare(c1, c2);
            return (res != 0) ? res : other.compare(c1, c2);
        };
    }
    default <U> Comparator<T> thenComparing(
            Function<? super T, ? extends U> keyExtractor,
            Comparator<? super U> keyComparator)
    {
        return thenComparing(comparing(keyExtractor, keyComparator));
    }
    default <U extends Comparable<? super U>> Comparator<T> thenComparing(
            Function<? super T, ? extends U> keyExtractor)
    {
        return thenComparing(comparing(keyExtractor));
    }

    default Comparator<T> thenComparingInt(ToIntFunction<? super T> keyExtractor) {
        return thenComparing(comparingInt(keyExtractor));
    }
    default Comparator<T> thenComparingLong(ToLongFunction<? super T> keyExtractor) {
        return thenComparing(comparingLong(keyExtractor));
    }
    default Comparator<T> thenComparingDouble(ToDoubleFunction<? super T> keyExtractor) {
        return thenComparing(comparingDouble(keyExtractor));
    }

    public static <T extends Comparable<? super T>> Comparator<T> reverseOrder() {
        return Collections.reverseOrder();
    }
    public static <T extends Comparable<? super T>> Comparator<T> naturalOrder() {
        return (Comparator<T>) Comparators.NaturalOrderComparator.INSTANCE;
    }
    public static <T> Comparator<T> nullsFirst(Comparator<? super T> comparator) {
        return new Comparators.NullComparator<>(true, comparator);
    }
    public static <T> Comparator<T> nullsLast(Comparator<? super T> comparator) {
        return new Comparators.NullComparator<>(false, comparator);
    }
    public static <T, U> Comparator<T> comparing(
            Function<? super T, ? extends U> keyExtractor,
            Comparator<? super U> keyComparator)
    {
        Objects.requireNonNull(keyExtractor);
        Objects.requireNonNull(keyComparator);
        return (Comparator<T> & Serializable)
                (c1, c2) -> keyComparator.compare(keyExtractor.apply(c1),
                        keyExtractor.apply(c2));
    }
    public static <T, U extends Comparable<? super U>> Comparator<T> comparing(
            Function<? super T, ? extends U> keyExtractor)
    {
        Objects.requireNonNull(keyExtractor);
        return (Comparator<T> & Serializable)
                (c1, c2) -> keyExtractor.apply(c1).compareTo(keyExtractor.apply(c2));
    }
    public static <T> Comparator<T> comparingInt(ToIntFunction<? super T> keyExtractor) {
        Objects.requireNonNull(keyExtractor);
        return (Comparator<T> & Serializable)
                (c1, c2) -> Integer.compare(keyExtractor.applyAsInt(c1), keyExtractor.applyAsInt(c2));
    }
    public static <T> Comparator<T> comparingLong(ToLongFunction<? super T> keyExtractor) {
        Objects.requireNonNull(keyExtractor);
        return (Comparator<T> & Serializable)
                (c1, c2) -> Long.compare(keyExtractor.applyAsLong(c1), keyExtractor.applyAsLong(c2));
    }
    public static<T> Comparator<T> comparingDouble(ToDoubleFunction<? super T> keyExtractor) {
        Objects.requireNonNull(keyExtractor);
        return (Comparator<T> & Serializable)
                (c1, c2) -> Double.compare(keyExtractor.applyAsDouble(c1), keyExtractor.applyAsDouble(c2));
    }
}
```

##### 方法解释

1. thenComparing
- &是java8新语法
```java
// (Comparator<T> & Serializable) == (Comparator<T>) (Serializable)
default Comparator<T> thenComparing(Comparator<? super T> other) {
    Objects.requireNonNull(other);
    return (Comparator<T> & Serializable) (c1, c2) -> {
        int res = compare(c1, c2);
        return (res != 0) ? res : other.compare(c1, c2);
    };
}
```
- 示例
```java
public static void main(String[] args) {
    Comparator comparator = new Comparator() {
        @Override
        public int compare(Object o1, Object o2) {
            return (o1 != o2) ? 1 : 0;
        }
    };
    System.out.println(comparator.compare("111", "111"));
    System.out.println(comparator.thenComparing((o1, o2) -> (o1 == o2) ? 1 : 0).compare("111", "111"));
}
```

2. comparing
-  利用Function先处理再比较
```java
public static <T, U> Comparator<T> comparing(   Function<? super T, ? extends U> keyExtractor, 
                                                Comparator<? super U> keyComparator) {
        Objects.requireNonNull(keyExtractor);
        Objects.requireNonNull(keyComparator);
        return (Comparator<T> & Serializable)
                (c1, c2) -> keyComparator.compare(keyExtractor.apply(c1),
                        keyExtractor.apply(c2));
    }
```

3. reverseOrder
- 利用Collections实现
```java
public static <T extends Comparable<? super T>> Comparator<T> reverseOrder() {
    return Collections.reverseOrder();
}
```


### 待续...

## 其他

### Object

1. 概述
- @HotSpotIntrinsicCandidate
- 自JDK 9引入
- 作用: 被@HotSpotIntrinsicCandidate标注的方法，在HotSpot中都有一套高效的实现，该高效实现基于CPU指令，运行时，HotSpot维护的高效实现会替代JDK的源码实现，从而获得更高的效率。


2. 源码
```java
public class MyObject {
    //@HotSpotIntrinsicCandidate
    public Object() {}
    //@HotSpotIntrinsicCandidate
    public final native Class<?> getClass();
    @HotSpotIntrinsicCandidate
    public native int hashCode();
    public boolean equals(Object obj) {
        return (this == obj);
    }
    @HotSpotIntrinsicCandidate
    protected native Object clone() throws CloneNotSupportedException;
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }
    @HotSpotIntrinsicCandidate
    public final native void notify();
    @HotSpotIntrinsicCandidate
    public final native void notifyAll();
    public final void wait() throws InterruptedException {
        wait(0L);
    }
    public final native void wait(long timeoutMillis) throws InterruptedException;
    public final void wait(long timeoutMillis, int nanos) throws InterruptedException {
        if (timeoutMillis < 0) {
            throw new IllegalArgumentException("timeoutMillis value is negative");
        }
        if (nanos < 0 || nanos > 999999) {
            throw new IllegalArgumentException(
                    "nanosecond timeout value out of range");
        }
        if (nanos > 0 && timeoutMillis < Long.MAX_VALUE) {
            timeoutMillis++;
        }
        wait(timeoutMillis);
    }
    @Deprecated(since="9")
    protected void finalize() throws Throwable { }
}
```

## 待续...




