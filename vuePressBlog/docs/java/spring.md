
# Spring

## IOC

### 获取实例
```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
// 1. 通过id获取实例
Student student = (Student) applicationContext.getBean("student");
// 2. 通过运行时类获取实例 (缺点: xml中一种数据类型只能有一个实例)
//Student student = (Student) applicationContext.getBean(Student.class);
System.out.println(student);
```

### Bean配置

1. 无参构造
```java
<bean id="student" class="com.southwind.entity.Student" 
    scope="prototype" parent="student" autowire="byType" depends-on="a2">
    <property name="id" value="1"/>
    <property name="name" value="张三"/>
    <property name="age" value="12"/>
    <property name="address" ref="address"/>
</bean>
```
- scope: 默认为singleton, 单例模式, prototype为工厂模式
- panent参数: 不同对象只要属性相同就能继承
- autowire: byName根据id=(address)寻找, 根据class=(Student)寻找
- depend-on: 规定bean创建顺序
2. 有参构造
```java
<bean id="student3" class="com.southwind.entity.Student">
    <constructor-arg name="id" value="3"/>
    <constructor-arg name="name" value="李四"/>
    <!--可以用index代替name, 但是也要按顺序写-->
    <constructor-arg name="age" value="14"/>
    <!--<constructor-arg index="2" value="14"/>-->
    <constructor-arg name="address" ref="address"/>
    <constructor-arg name="addresses">
        <list>
            <ref bean="address"/>
            <ref bean="address2"/>
        </list>
    </constructor-arg>
</bean>
```
::: tip 提示
spring通过反射调用无参构造创建对象, bean必须有无参构造
:::
ClassPathXmlApplicationContext类实现了ApplicationContext接口, 有getBean方法<be/>
下面是一个ClassPathXmlApplicationContext的简单实现
```java
public class ClassPathXmlApplicationContext implements ApplicationContext {

    private Map<String, Object> ioc = new HashMap<>();

    public ClassPathXmlApplicationContext(String path) {
        try {
            // xml文件解析
            SAXReader saxReader = new SAXReader();
            Document document = saxReader.read("./src/main/resources/" + path);
            System.out.println(document);
            Element root = document.getRootElement();
            Iterator<?> iterator = root.elementIterator();
            // 遍历所有节点
            while (iterator.hasNext()) {
                Element element = (Element) iterator.next();
                String id = element.attributeValue("id");
                String className = element.attributeValue("class");
                // 通过反射创建对象
                Class<?> clazz = Class.forName(className);
                // 获取无参构造函数
                Constructor<?> constructor = clazz.getConstructor();
                Object object = constructor.newInstance();
                Iterator<Element> beanIterator = element.elementIterator();
                while (beanIterator.hasNext()) {
                    Element property = beanIterator.next();
                    String name = property.attributeValue("name");
                    String value = property.attributeValue("value");
                    String ref = property.attributeValue("ref");
                    // 获取set方法
                    // 1. 拼接方法名
                    String methodName = "set" + name.substring(0, 1).toUpperCase() + name.substring(1);
                    // 2. 获取形参类型
                    Field field = clazz.getDeclaredField(name);
                    // 3. 获取带参数的方法
                    Method method = clazz.getDeclaredMethod(methodName, field.getType());
                    // 4. 将实参类型String转换为所需的
                    String fieldName = field.getType().getName();
                    if (fieldName == "long") {
                        method.invoke(object, Long.parseLong(value));
                    } else if (fieldName == "int") {
                        method.invoke(object, Integer.parseInt(value));
                    } else {
                        method.invoke(object, value);
                    }
                    if (ref != null) {
                        method.invoke(object, ioc.get(ref));
                        // 这里可能要做个递归
                        // 或者是把bean全找到后再根据ref互相赋值
                        // 这里简单写
                    }
                }
                ioc.put(id, object);
                System.out.println(object);
            }
            System.out.println("XML解析完毕");
        } catch (DocumentException | ClassNotFoundException | NoSuchMethodException | InstantiationException | InvocationTargetException | IllegalArgumentException | IllegalAccessException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        }

    }

    @Override
    public Object getBean(String id) {
        return ioc.get(id);
    }
}
```

3. 静态工厂
- factory
```java
public class StaticCarFactory {
    private static Map<Long, Car> carMap;
    static {
        carMap = new HashMap<>();
        carMap.put(1L, new Car(1L, "宝马"));
        carMap.put(2L, new Car(2L, "奔驰"));
    }
    public static Car getCar(long id) {
        return carMap.get(id);
    }
}
```
- spring.xml
```xml
<!--配置静态工厂-->
<bean id="car" class="com.southwind.factory.StaticCarFactory"               factory-method="getCar">
    <constructor-arg value="2"/>
</bean>
```
4. 实例工厂
- factory
```java
public class InstanceCarFactory {
    private Map<Long, Car> carMap;
    public InstanceCarFactory() {
        carMap = new HashMap<>();
        carMap.put(1L, new Car(1L, "宝马"));
        carMap.put(2L, new Car(2L, "奔驰"));
    }
    public Car getCar(long id) {
        return carMap.get(id);
    }
}
```
- xml
```java
<!--配置实例工厂-->
<bean id="carFactory" class="com.southwind.factory.InstanceCarFactory"/>
<bean id="car2" factory-bean="carFactory" factory-method="getCar">
    <constructor-arg value="2"/>
</bean>
```

## AOP

### 手动反射实现
- handler
```java
public class CalInvocationHandler implements InvocationHandler {
    // 接受委托对象
    private Object object = null;

    // 返回代理对象
    public Object bind(Object object) {
        this.object = object;
        // 获取运行时类
        Class<?> clazz = object.getClass();
        // 获取类加载器
        ClassLoader classLoader = clazz.getClassLoader();
        // 获取类的所有接口
        Class<?>[] interfaces = clazz.getInterfaces();
        //创建能实现委托对象所有功能的代理对象
        return Proxy.newProxyInstance(classLoader, interfaces, this);
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println(method.getName() + "的参数是" + Arrays.toString(args));
        Object result = method.invoke(this.object, args);
        System.out.println(method.getName() + "的结果是" + result);

        return result;
    }
}
```
- Test
```java
public class Test {
    public static void main(String[] args) {
        Cal cal = new CalImpl();
        CalInvocationHandler calInvocationHandler = new CalInvocationHandler();
        cal = (Cal) calInvocationHandler.bind(cal);
        cal.add(1, 2);
    }
}
```

### @Aspect实现

- loggerAspect
```java
@Aspect  // 让普通对象成为切面对象
@Component  // 交给ioc管理bean  同时委托对象也要被ioc管理
public class loggerAspect {

    // 方法名用*代替  参数用..代替
    //@Before("execution(public int com.southwind.utils.impl.CalImpl.add(int, int))")
    @Before("execution(int com.southwind.utils.impl.CalImpl.*(..))")
    public void before(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String args = Arrays.toString(joinPoint.getArgs());
        System.out.println(methodName + "的参数是" + args);
    }

    @After("execution(int com.southwind.utils.impl.CalImpl.*(..))")
    public void after(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println(methodName + "执行完毕");
    }

    @AfterReturning(
            value = "execution(int com.southwind.utils.impl.CalImpl.*(..))",
            returning = "result")
    public void afterReturning(JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println(methodName + "的结果是" + result);
    }

    @AfterThrowing(
            value = "execution(int com.southwind.utils.impl.CalImpl.*(..))",
            throwing = "e")
    public void afterThrowing(JoinPoint joinPoint, Exception e) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println(methodName + "抛出异常" + e);
    }
}
```

- spring.xml
```xml
<!--自动扫描base-package下的对象, 将添加了@component注解的对象加入ioc容器-->
<context:component-scan base-package="com.southwind"/>

<!--自动扫描, 为添加了@aspect注解的对象自动生成代理对象-->
<aop:aspectj-autoproxy/>
```

- Test2
```java
// 加载配置文件
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
// 自动生成的代理对象被自动加入ioc,
// @component("id") 如果不加参数bean的id为委托对象首字母小写
Cal proxy = (Cal) applicationContext.getBean("calImpl");
proxy.add(1, 2);
```

## spring-mvc

## Mybatis
- pom.xml
```java
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.6</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.23</version>
</dependency>
```
- config.xml
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
<!--    配置mybits运行环境-->
    <environments default="development">
        <environment id="development">
<!--            JDBC事务管理-->
            <transactionManager type="JDBC"></transactionManager>
<!--            POOLED配置数据库连接池-->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/library?useUnicode=true&amp;characterEncoding=UTF-8"/>
                <property name="username" value="root"/>
                <property name="password" value=""/>
            </dataSource>
        </environment>
    </environments>
    <!--注册xml文件-->
    <mappers>
        <mapper resource="com/southwind/mapper/AccountMapper.xml"></mapper>
        <mapper resource="com/southwind/mapper/StudentMapper.xml"></mapper>
        <mapper resource="com/southwind/mapper/ClassesMapper.xml"></mapper>
    </mappers>
</configuration>
```

## 待续
