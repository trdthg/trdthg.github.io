# PgSQL

## 

## 基本使用

### version()

```sql
SELECT version();
```

### current_date

```sql
SELECT CURRENT_DATE;
```

### CRUD
```sql
SELECT 2 + 2;

DROP TABLE IF EXISTS weather;

DROP TABLE IF EXISTS cities;

-- internal commands, starts with '\'
-- create table
-- smallint, real, double precision, char(N), varchar(N), date, time, timestamp, and interval, as well as other types of general utility and a rich set of geometric types.
CREATE TABLE weather (
  city varchar(80),
  temp_lo int, -- low temperature
  temp_hi int, -- high temperature
  prcp real, -- precipitation
  date date
);

CREATE TABLE cities (
  name varchar(80),
  location point
);

INSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');

INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');

INSERT INTO weather (city, temp_lo, temp_hi, prcp, date) VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');

INSERT INTO weather (date, city, temp_hi, temp_lo) VALUES ('1994-11-29', 'Hayward', 54, 37);

SELECT * FROM weather;

SELECT
  city,
  temp_lo,
  temp_hi,
  prcp,
  date
FROM
  weather;
```

### `/`

```sql
SELECT
  city,
  (temp_hi + temp_lo) / 2 AS temp_avg,
  date
FROM
  weather;

```

### `>`
```sql
SELECT
  *
FROM
  weather
WHERE
  city = 'San Francisco'
  AND prcp > 0.0;
```

### ORDER BY

```sql
SELECT
  *
FROM
  weather
ORDER BY
  city;

SELECT
  *
FROM
  weather
ORDER BY
  city,
  temp_lo;
```

### DISTINCT

```sql
SELECT DISTINCT
  city
FROM
  weather;

SELECT DISTINCT
  city
FROM
  weather
ORDER BY
  city;
```

### WHERE
```sql
SELECT
  *
FROM
  weather,
  cities
WHERE
  city = name;
```

### JOIN

```sql
SELECT
  *
FROM
  weather
  JOIN cities ON city = name;
```

```sql
SELECT
  weather.city,
  weather.temp_lo,
  weather.temp_hi,
  weather.prcp,
  weather.date,
  cities.location
FROM
  weather
  JOIN cities ON weather.city = cities.name;
```

### JOIN ON
```sql
SELECT
  *
FROM
  weather
  LEFT OUTER JOIN cities ON weather.city = cities.name;
```

```sql
SELECT
  w1.city,
  w1.temp_lo AS low,
  w1.temp_hi AS high,
  w2.city,
  w2.temp_lo AS low,
  w2.temp_hi AS high
FROM
  weather w1
  JOIN weather w2 ON w1.temp_lo < w2.temp_lo
    AND w1.temp_hi > w2.temp_hi;
```

```sql
SELECT
  *
FROM
  weather w
  JOIN cities c ON w.city = c.name;
```

### MAX

ERROR:

```sql
SELECT city FROM weather WHERE temp_lo = max(temp_lo);     WRONG
```

```sql
SELECT
  max(temp_lo)
FROM
  weather;
```

```sql
SELECT
  city
FROM
  weather
WHERE
  temp_lo = (
    SELECT
      max(temp_lo)
    FROM
      weather);
```

```sql
SELECT
  city,
  max(temp_lo),
  count(*) FILTER (WHERE temp_lo < 30)
FROM
  weather
WHERE
  city LIKE 'S%' -- (1)
GROUP BY
  city
HAVING
  max(temp_lo) < 40;
```

### UPDATE
```sql
-- update
UPDATE
  weather
SET
  temp_hi = temp_hi - 2,
  temp_lo = temp_lo - 2
WHERE
  date > '1994-11-28';
```

### DELETE
```sql
DELETE FROM weather
WHERE city = 'Hayward';
```

## 高级功能

### VIEW

大量使用视图是良好的 SQL 数据库设计的一个关键方面。视图允许将表的结构细节封装在一致的接口后面，这些细节可能会随着应用程序的发展而改变。

视图几乎可以用在任何可以使用真实表的地方。在其他视图上建立视图的情况并不少见。

```sql
CREATE VIEW myview AS
SELECT
  name,
  temp_lo,
  temp_hi,
  prcp,
  date,
  location
FROM
  weather,
  cities
WHERE
  city = name;
```

```sql
SELECT
  *
FROM
  myview;
```

### COPY

```sql
COPY weather
FROM
  '/home/user/weather.txt';
```

### FOREIGN KEY

外键的行为可以根据你的应用进行细微的调整。

```sql
CREATE TABLE cities (
        name     varchar(80) primary key,
        location point
);

CREATE TABLE weather (
        city      varchar(80) references cities(name),
        temp_lo   int,
        temp_hi   int,
        prcp      real,
        date      date
);
```

running
```sql
INSERT INTO weather VALUES ('Berkeley', 45, 53, 0.0, '1994-11-28');
```
should be

```txt
ERROR:  insert or update on table "weather" violates foreign key constraint "weather_city_fkey"
DETAIL:  Key (city)=(Berkeley) is not present in table "cities".

```

### Transactions

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100.00 WHERE name = 'Alice';
SAVEPOINT my_savepoint;
UPDATE accounts SET balance = balance + 100.00 WHERE name = 'Bob';
-- oops ... forget that and use Wally's account
ROLLBACK TO my_savepoint;
UPDATE accounts SET balance = balance + 100.00 WHERE name = 'Wally';
COMMIT;
```

### Window Functions

#### 快速开始

求所在部门的平均工资

```sql
SELECT
  depname, empno, salary, avg(salary)
OVER (PARTITION BY depname)
FROM empsalary;
```
```txt
  depname  | empno | salary |          avg
-----------+-------+--------+-----------------------
 develop   |    11 |   5200 | 5020.0000000000000000
 develop   |     7 |   4200 | 5020.0000000000000000
 develop   |     9 |   4500 | 5020.0000000000000000
 develop   |     8 |   6000 | 5020.0000000000000000
 develop   |    10 |   5200 | 5020.0000000000000000
 personnel |     5 |   3500 | 3700.0000000000000000
 personnel |     2 |   3900 | 3700.0000000000000000
 sales     |     3 |   4800 | 4866.6666666666666667
 sales     |     1 |   5000 | 4866.6666666666666667
 sales     |     4 |   4800 | 4866.6666666666666667
(10 rows)
```

每个部门的工资排名：

```sql
SELECT depname, empno, salary,
       rank() OVER (PARTITION BY depname ORDER BY salary DESC)
FROM empsalary;
```

rank 函数为当前行的分区中每个不同的 ORDER BY 值产生一个数字等级，使用 ORDER BY 子句定义的顺序。rank 不需要明确的参数，因为其行为完全由 OVER 子句决定。

```txt
  depname  | empno | salary | rank
-----------+-------+--------+------
 develop   |     8 |   6000 |    1
 develop   |    10 |   5200 |    2
 develop   |    11 |   5200 |    2
 develop   |     9 |   4500 |    4
 develop   |     7 |   4200 |    5
 personnel |     2 |   3900 |    1
 personnel |     5 |   3500 |    2
 sales     |     1 |   5000 |    1
 sales     |     4 |   4800 |    2
 sales     |     3 |   4800 |    2
(10 rows)
```

#### ORDER BY

ORDER BY

```sql
SELECT salary, sum(salary) OVER () FROM empsalary;
```

```txt
 salary |  sum
--------+-------
   5200 | 47100
   5000 | 47100
   3500 | 47100
   4800 | 47100
   3900 | 47100
   4200 | 47100
   4500 | 47100
   4800 | 47100
   6000 | 47100
   5200 | 47100
(10 rows)
```

```sql
SELECT salary, sum(salary) OVER (ORDER BY salary) FROM empsalary;
```
```txt
 salary |  sum
--------+-------
   3500 |  3500
   3900 |  7400
   4200 | 11600
   4500 | 16100
   4800 | 25700
   4800 | 25700
   5000 | 30700
   5200 | 41100
   5200 | 41100
   6000 | 47100
(10 rows)
```

#### 不能使用的情况

窗口函数只允许在查询的 SELECT 和 ORDER BY 子句中使用。其他地方例如 GROUP BY、HAVING 和 WHERE 子句中是禁止的。

这是因为它们在逻辑上是在这些子句的处理之后执行的。

另外，窗口函数在非窗口聚合函数之后执行。这意味着在一个窗口函数的参数中包含一个聚合函数的调用是有效的，但反之则无效。

如果需要在窗口计算执行后对行进行过滤或分组，你可以使用一个子选择。例如。

```sql
SELECT depname, empno, salary, enroll_date
FROM
  (SELECT depname, empno, salary, enroll_date,
          rank() OVER (PARTITION BY depname ORDER BY salary DESC, empno) AS pos
     FROM empsalary
  ) AS ss
WHERE pos < 3;
```

#### 多个窗口函数

上述查询只显示内部查询中排名小于 3 的记录。

当一个查询涉及到多个窗口函数时，可以用一个单独的 OVER 子句来写出每一个窗口函数。

但是如果几个函数需要相同的窗口行为，这样做是重复和容易出错的。

相反，可以在 WINDOW 子句中命名每个窗口行为，然后在 OVER 中引用。比如说。

```sql
SELECT sum(salary) OVER w, avg(salary) OVER w
  FROM empsalary
  WINDOW w AS (PARTITION BY depname ORDER BY salary DESC);
```

### Inheritance 继承

创建两个表。一张城市表和一张首都表。当然，首都也是城市，

我们希望在列出所有城市时，能以隐含的方式显示首都。下面是一些备选方案。

使用视图实现：
```sql
CREATE TABLE capitals (
  name       text,
  population real,
  elevation  int,    -- (in ft)
  state      char(2)
);

CREATE TABLE non_capitals (
  name       text,
  population real,
  elevation  int     -- (in ft)
);

CREATE VIEW cities AS
  SELECT name, population, elevation FROM capitals
    UNION
  SELECT name, population, elevation FROM non_capitals;
```

使用继承实现：

在 PostgreSQL 中，一个表可以从零个或多个其他表继承。

```sql
CREATE TABLE cities (
  name       text,
  population real,
  elevation  int     -- (in ft)
);

CREATE TABLE capitals (
  state      char(2) UNIQUE NOT NULL
) INHERITS (cities);
```

capitals 继承了城市的所有列（名称、人口和海拔）。capitals 表有一个额外的列，state。

> name 列的类型是 text，这是 PostgreSQL 的原生类型，用于可变长度的字符串。

继承会自动从子表中查询

```sql
SELECT name, elevation
  FROM cities
  WHERE elevation > 500;
```

你可以使用 ONLY 避免自动查询

```sql
SELECT name, elevation
    FROM ONLY cities
    WHERE elevation > 500;
```

## SQL 语言

### 常量

- 字符串，用单引号

两个仅由至少一个换行的空白处隔开的字符串常量被连接起来，并有效地处理，就像字符串被写成一个常量一样。比如说

```sql
SELECT 'foo'
'bar';
```

和

```sql
SELECT 'foobar';
```
相等

但是
```sql
SELECT 'foo'      'bar';
```
是不合法的

g