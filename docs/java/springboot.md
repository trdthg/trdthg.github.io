# SprintBoot

## 统一参数校验

### 增加对枚举的校验规则

[springboot validator 枚举值校验功能实现](https://www.zhangshengrong.com/p/zAaOQQOrXd/)

### 全局处理校验失败

[全局处理响应数据](https://bbs.huaweicloud.com/blogs/188118)

## MybatisPlus

### 1. 配置引入

1.1 pom.xml

```xml
<!--基础依赖-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.2</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<!--生成器依赖-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.3.2</version>
</dependency>
<dependency>  <!--生成器模板 Velocity(默认) FreeMarker Beetl-->
    <groupId>org.apache.velocity</groupId>
    <artifactId>velocity</artifactId>
    <version>1.7</version>
</dependency>
```

1.2 yml

```yml
mybatis-plus:
  # 打印 sql 语句
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  # @EnumValue 配置
  type-enums-package: com.southwind.mybatis_plus.enums
  # @TableLogic
  global-config:
    db-config:
      logic-not-delete-value: 0
      logic-delete-value: 1
```

### 2. 源码

META-INF/spring.factories

```java
@ConfigurationProperties(
    prefix = "spring.datasource"
)
public class DataSourceProperties implements BeanClassLoaderAware, InitializingBean {
    private ClassLoader classLoader;
    private String name;
    private boolean generateUniqueName = true;
    private Class<? extends DataSource> type;
    private String driverClassName;
    private String url;
    ...
// mybatis_plus 舍弃了 xml 文档的配置方式，采用配置类读取 yml
```

### 3. 注解

- 基本注解
  ```java
  @TableName(value = "mybatis_plus_user") //tablename=value
  @TableId(value = "id", type = IdType.NONE)  // 默认雪花 id, entity 要 Long， 数据库要 bigint 类型才能存进去
  @TableField(value = "age", select = false, exist = false) // 是否查询，是否存在
  ```

- 自动填充
  ```java
  // (create_time, update_time 等),需要配置 MetaObjectHandler
  @TableField(fill = FieldFill.INSERT_UPDATE)
  private Date createTime;

      @Component
      public class MyMetaObjectHandler implements MetaObjectHandler {
          @Override
          public void insertFill(MetaObject metaObject) {
              this.setFieldValByName("createTime", new Date(), metaObject);
              this.setFieldValByName("updateTime", new Date(), metaObject);
          }
          @Override
          public void updateFill(MetaObject metaObject) {
              this.setFieldValByName("updateTime", new Date(), metaObject);
          }
      }
  ```

- 乐观锁
  ```java
  //  where version = 1..., 配置 OptimisticLockerConfig，增加 version 字段
  @Version  // 每次 update 后，version 都会自增 1,
  private int version;

      @Configuration
      public class MybatisPlusConfig {
          @Bean
          public MybatisPlusInterceptor optimisticLocerInceptor() {
              MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
              mybatisPlusInterceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
              return mybatisPlusInterceptor;
          }
      }
  ```

- 枚举映射
  ```java
  @EnumValue
  private StatusEnum statusEnum;
  public enum StatusEnum {
      // 1. 实体类加注解，yml 需配置
      WORK(1, "上班"),
      REST(0, "休息");
      StatusEnum(Integer code, String msg) {
          this.code = code;
          this.msg = msg;
      }
      @EnumValue
      private Integer code;  // 状态
      private String msg;    // 描述
  }
  /* mybatis-plus:
  *   type-enums-package: com.southwind.mybatis_plus.enums
  */
  public enum StatusEnum2 implements IEnum {
      // 2. 实体类实现接口，yml 无需配置
      WORK(1, "上班"),
      REST(0, "休息");
      StatusEnum2(Integer code, String msg) {
          this.code = code;
          this.msg = msg;
      }
      // 不用加 @EnumValue 注解
      private Integer code;  // 状态
      private String msg;    // 描述
      // 需要重写方法
      @Override
      public Serializable getValue() {
          return this.code;
      }
  }

  // 5. 逻辑删除 where deleted=0
  @TableLogic // 增加 deleted 字段
  private Integer deleted;
  ```

### 4. CRUD

- 条件查询
  ```java
  mapper.selectList(null);  // 查询全部
  QueryWrapper wrapper = new QueryWrapper();

  wrapper.eq("name", "张三"); // ==
  wrapper.lt("age", 3); // <
  wrapper.gt("age", 3); // >
  wrapper.ge("age", 3); // >=
  wrapper.ne("age", 3); // <>

  Map<String, Object> map = new HashMap<>();
  map.put("name", "张三");
  map.put("age", 13);
  wrapper.allEq(map);
  ```

- 模糊查询
  ```java
  wrapper.like("name", "红"); // 模糊查询 (name like 红)
  wrapper.likeLeft("name", "红"); // 模糊查询 (name like %红) 以红开头
  wrapper.likeRight("name", "红"); // 模糊查询 (name like 红%) 以红结尾

  wrapper.inSql("age", "sql 语句"); // (where age in ResultSet)
  wrapper.orderByAsc("age"); //升序

  wrapper.orderByDesc("age"); //升序
  wrapper.having("age > 8"); // 两句可以叠加
  mapper.selectList(wrapper);

  mapper.selectMaps(wrapper); // 结果以 Map 形式返回
  ```

- 分页查询 (配置拦截器)
  ```java
  Page<Mybatis_plus_user> page = new Page<>(1, 3); // 每一页取两条记录
  Page<Mybatis_plus_user> result = mapper.selectPage(page, null);
  result.getRecords().forEach(System.out::println);

  @Bean
  public PaginationInnerInterceptor paginationInnerInterceptor() {
      return new PaginationInnerInterceptor();
  }
  ```

### 5. 自定义 SQL

    ```java
    @Select("Select p.*, u.id userId, u.name userName from mybatis_plus_product p, mybatis_plus_user u where p.id=#{id}")
    List<UserVO> findVOsById(Integer id);
    // 适用于 VO 且 u.id, u.name 没有被封装为一个对象，用 UserName 代替 user 与实体类对应
    ```

### 6. Generator

    ```java
    public class MybatisPlusGenerator {
        public static void main(String[] args) {
            AutoGenerator autoGenerator = new AutoGenerator();
            // 数据源
            autoGenerator.setDataSource(new DataSourceConfig()
                    .setDbType(DbType.MYSQL)
                    .setUrl("jdbc:mysql://localhost:3306/library?serverTimezone=GMT")
                    .setUsername("root")
                    .setPassword("123")
                    .setDriverName("com.mysql.cj.jdbc.Driver")
            );
            // 全局配置
            autoGenerator.setGlobalConfig(new GlobalConfig()
                    .setOutputDir( "src/main/java")
                    .setOpen(false)
                    .setAuthor("trdthg")
                    .setServiceName("%sService")  // 设定 service 类名不带 I
            );
            // 包信息
            autoGenerator.setPackageInfo(new PackageConfig()
                    .setParent("com.southwind.mybatis_plus")
                    .setModuleName("generator")
                    .setController("controller")
                    .setEntity("entity")
                    .setMapper("mapper")
                    .setService("service")
                    .setServiceImpl("service.impl")
            );
            // 策略配置
            autoGenerator.setStrategy(new StrategyConfig()
                    .setEntityLombokModel(true)
                    .setColumnNaming(NamingStrategy.underline_to_camel) //数据库下划线自动转 entity 驼峰
                    .setNaming(NamingStrategy.underline_to_camel)
            );
            autoGenerator.execute();
        }
    }

    ```

## Redis

- pom.xml

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>2.4.4</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

- yml

```yml
sprint:
  redis:
    database: 0
    host: localhost
    port: 6379
```

- controller

```java
@RestController
public class RedisController {

    @Autowired
    private RedisTemplate redisTemplate;

    @PostMapping("/set")
    public void set(@RequestBody Student student) {
        redisTemplate.opsForValue().set("student", student);
        System.out.println("设置完成");
    }

    @GetMapping("/get/{key}")
    public Student get(@PathVariable("key") String key) {
        return (Student) redisTemplate.opsForValue().get(key);
    }

    @DeleteMapping("/delete/{key}")
    public boolean delete(@PathVariable("key") String key) {
        return !redisTemplate.delete(key);
    }

    @GetMapping("/string")
    public String string() {
        redisTemplate.opsForValue().set("string", "hello world");
        return (String) redisTemplate.opsForValue().get("string");
    }

    @GetMapping("/list")
    public List<String> list() {
        ListOperations<String, String> listOperations = redisTemplate.opsForList();
        listOperations.leftPush("list", "aaa");
        listOperations.leftPush("list", "bbb");
        listOperations.leftPush("list", "ccc");
        return listOperations.range("list", 0, 1);
    }

    @GetMapping("/set")
    public Set<String> set() {
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        setOperations.add("set", "集合 1");
        setOperations.add("set", "集合 4");
        return setOperations.members("set");
    }

    @GetMapping("/zset")
    public Set<String> zset() {
        ZSetOperations<String, String> zSetOperations = redisTemplate.opsForZSet();
        //zSetOperations.add("zset", "hello", 1);
        zSetOperations.add("zset", "hello", 2);
        zSetOperations.add("zset", "world", 1);
        zSetOperations.add("zset", "hello", 3);
        return zSetOperations.range("zset", 0, 2);
    }

    @GetMapping("/hash")
    public String hash() {
        HashOperations hashOperations = redisTemplate.opsForHash();
        hashOperations.put("hash", "id", "1");
        hashOperations.put("hash", "name", "张三");
        hashOperations.put("hash", "score", "1.345");
        return (String) hashOperations.get("hash", "name");
    }

}
```

## Shiro

### 核心组件

1. UsernamePasswordToken: 封装用户登录信息，根据信息创建令牌 token
2. SecurityManager：核心部分，负责安全认证和授权
3. Subject：抽象概念，包含了用户信息
4. Realm：开发者自定义模块，登录授权的逻辑具体实现
5. Authenticationinfo：用户角色信息，认证时使用
6. Authorization：角色权限信息，授权时使用
7. DefaultWebSecurityManager：开发者将 Realm 注入其中才能生效
8. ShiroFilterFactoryBean：过滤器对象，shiro 通过创建 filter 对象执行开发者定义的过滤规则 ::: tip
   用户与权限没有直接关联 用户 - 角色 - 权限 三者之间为多对多关系 :::

### 依赖

```xml
<dependency>
    <groupId>org.apache.shiro</groupId>
    <artifactId>shiro-spring</artifactId>
    <version>1.7.1</version>
</dependency>
```

### 过滤器的实现

```java
public class ShiroUserRealm extends AuthorizingRealm {

    @Autowired
    ShiroUserService shiroUserService;
    // 授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return null;
    }
    // 验证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;
        ShiroUser shiroUser = shiroUserService.findByUsername(usernamePasswordToken.getUsername());
        if (shiroUser != null) {
            // 密码是否正确不用手动验证，丢进去就行
            // 不正确会抛出密码错误异常
            return new SimpleAuthenticationInfo(shiroUser, shiroUser.getPassword(), getName());
        }
        // 会自动抛出账户不存在的异常
        return null;
    }
}
```

### 配置类

1. Realm Manager Factory 三层注入
2. @Qualifier("defaultWebSecurityManager") 按照名字查询 Bean

```java
@Configuration
public class ShiroConfig {

    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(@Qualifier("defaultWebSecurityManager") DefaultWebSecurityManager defaultWebSecurityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(defaultWebSecurityManager);
        return shiroFilterFactoryBean;
    }

    @Bean
    public DefaultWebSecurityManager defaultWebSecurityManager(@Qualifier("shiroUserRealm") ShiroUserRealm shiroUserRealm) {
        DefaultWebSecurityManager defaultWebSecurityManager = new DefaultWebSecurityManager();
        defaultWebSecurityManager.setRealm(shiroUserRealm);
        return defaultWebSecurityManager;
    }

    @Bean
    public ShiroUserRealm shiroUserRealm() {
        return new ShiroUserRealm();
    }

}
```

### 授权认证规则

1. 认证过滤器
   - anon：无需认证
   - authc：必须认证
   - authcBasic：需要通过 HttpBasic 认证
   - user：不一定需要认证，只需要被记录就不需要再次认证
2. 授权过滤器
   - perms：必须拥有某个权限
   - role：必须拥有某个角色
   - port：请求端口必须是指定值
   - rest：请求必须基于 Restful，GET、POST、PUT、DELETE
   - ssl：必须是安全的 URL 请求，协议是 HTTPS

```java
@Bean
public ShiroFilterFactoryBean shiroFilterFactoryBean(@Qualifier("defaultWebSecurityManager") DefaultWebSecurityManager defaultWebSecurityManager) {
    ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
    shiroFilterFactoryBean.setSecurityManager(defaultWebSecurityManager);
    // 权限设置
    Map<String, String> map = new Hashtable<>();
    map.put("/index", "anon");
    map.put("/userspace", "authc");
    map.put("/manage", "perms[manager]");
    map.put("/root", "roles[vip]");
    map.put("/special", "authc, roles[vip]");
    shiroFilterFactoryBean.setFilterChainDefinitionMap(map);
    shiroFilterFactoryBean.setLoginUrl("shiroUser/login");
    return shiroFilterFactoryBean;
}
```

## Spring-Cloud-Alibaba

### 服务治理 Nacos

[官网教程](https://nacos.io/zh-cn/docs/quick-start.html) Nacos 网页使用
nacos 默认需要配置 nginx 才能通过网页访问，执行`sh startup.sh -m standalone`可以直接访问

1. 服务注册
   - 在 SpringBoot 下新建`Provider`子模块，继承`SCAlbaba`父项目，
   ```xml
   <parent>
       <!--<groupId>org.springframework.boot</groupId>-->
       <!--<artifactId>spring-boot-starter-parent</artifactId>-->
       <!--<version>2.4.5</version>-->
       <!--<relativePath/> &lt;!&ndash; lookup parent from repository &ndash;&gt;-->
       <groupId>com.example</groupId>
       <artifactId>southwind_springcloudalibaba</artifactId>
       <version>0.0.1-SNAPSHOT</version>
   </parent>
   ```
   - 加上 web 依赖，加上 nacos-discovery 依赖
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
   </dependency>
   <dependency>
       <groupId>com.alibaba.cloud</groupId>
       <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
       <version>2021.1</version>
   </dependency>
   ```
   - 配置 yml
   ```yml
   spring:
   cloud:
       nacos:
       discovery:
           server-addr: localhost:8848
   application:
       name: provider
   server:
   port: 8082
   ```

::: tip 提示 Idea 通过编辑配置可以多开应用 ::: 2. 服务发现 -
在 SpringBoot 下新建`Consumer`子模块，继承`SCAlbaba`父项目， - 继承和依赖同上 - yml 只用配端口
`yml server: port: 8082` - controller ```java @RestController public class
ConsumerController {

            @Autowired
            private DiscoveryClient discoveryClient;

            @GetMapping("/getInstance")
            public List<ServiceInstance> getInstance() {
                return this.discoveryClient.getInstances("provider");
            }

        }
    ```

### 负载均衡

1. 服务调用 Privider 中提供了 getPort 方法，多个 Provider 实例由 Consumer 调用 Provider

```java
@RestController
public class ProviderController {

    @Value("${server.port}")   // el 表达式，读取 yml 文件中的内容
    private String port;

    @GetMapping("/getPort")
    public String getPort() {
        return port;
    }

}
```

Consumer

```java
@RestController
@Slf4j // 日志打印
public class ConsumerController {

    @Autowired
    private DiscoveryClient discoveryClient;
    @Autowired
    private RestTemplate restTemplate;  // 需要手动装载

    @GetMapping("/port")
    public String getPort() {
        // 1. 获取随机一个 provider 实例
        List<ServiceInstance> providers = discoveryClient.getInstances("provider");
        int randomIndex = ThreadLocalRandom.current().nextInt(providers.size());
        ServiceInstance provider = providers.get(randomIndex);
        String uri = provider.getUri().toString();  // uri： ip + port
        String url = uri + "/getPort";
        // 2. 接口调用
        log.info("调用的端口是" + provider.getHost());
        String port = restTemplate.getForObject(url, String.class);
        return "调用 Consumer，调用了端口为" + port + "的 Provider 的 getPort";
    }
}
```

::: warning restTemplte 无法自动注入，需要手动注入 :::

```java
@Configuration
public class ConsumerConfiguration {

    // 放到 Main 下也可
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

2. Ribbon 负载均衡

   - config 配置
   ```java
   @Bean
   @LoadBalanced
   public RestTemplate restTemplate() {
       return new RestTemplate();
   }
   ```
   - controller
   ```java
   // Ribbon 负载均衡
   @GetMapping("/getPort2")
   public String getPort2() {
       // 默认轮询算法
       String port = restTemplate.getForObject("http://provider/getPort", String.class);
       return "调用 Consumer，调用了端口为" + port + "的 Provider 的 getPort";
   }
   ```
   - 负载均衡算法（可自定义）
   ```java
   @Bean
   public IRule myRule(){
   	return new RandomRule();
   }
   ```
   1. RoundRobinRule：	轮询
   2. RandomRule：	随机
   3. AvaliabilityFilteringRule：	会先过滤由于多次访问故障而处于断路器跳闸的状态的服务和并发的连接数量超过阈值的服务，然后对剩余的服务列表按照轮询策略
   4. WeightedResponseTimeRule：	根据平均响应时间计算所有服务的权重，响应时间越快服务权重越大
   5. RetryRule：	先按照 RoundRobinRule 策略获取服务，如果获取服务失败会在指定时间内重试
   6. BestAvailableRule：	会先过滤掉由于多次访问故障二处于断路器跳闸状态的服务，然后选择一个并发量最小的服务
   7. ZoneAvoidanceRule：	默认规则，复合判断 server 所在的区域的性能和 server 的可用性选择服务器

### 待续...

## 待续...
