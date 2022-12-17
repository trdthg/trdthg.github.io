"use strict";(self.webpackChunktrdthg_github_io=self.webpackChunktrdthg_github_io||[]).push([[397],{3905:(e,n,a)=>{a.d(n,{Zo:()=>c,kt:()=>E});var t=a(7294);function l(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function r(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,t)}return a}function p(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?r(Object(a),!0).forEach((function(n){l(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function i(e,n){if(null==e)return{};var a,t,l=function(e,n){if(null==e)return{};var a,t,l={},r=Object.keys(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||(l[a]=e[a]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)a=r[t],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(l[a]=e[a])}return l}var o=t.createContext({}),s=function(e){var n=t.useContext(o),a=n;return e&&(a="function"==typeof e?e(n):p(p({},n),e)),a},c=function(e){var n=s(e.components);return t.createElement(o.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},u=t.forwardRef((function(e,n){var a=e.components,l=e.mdxType,r=e.originalType,o=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),u=s(a),E=l,d=u["".concat(o,".").concat(E)]||u[E]||m[E]||r;return a?t.createElement(d,p(p({ref:n},c),{},{components:a})):t.createElement(d,p({ref:n},c))}));function E(e,n){var a=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=a.length,p=new Array(r);p[0]=u;var i={};for(var o in n)hasOwnProperty.call(n,o)&&(i[o]=n[o]);i.originalType=e,i.mdxType="string"==typeof e?e:l,p[1]=i;for(var s=2;s<r;s++)p[s]=a[s];return t.createElement.apply(null,p)}return t.createElement.apply(null,a)}u.displayName="MDXCreateElement"},9183:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>o,contentTitle:()=>p,default:()=>m,frontMatter:()=>r,metadata:()=>i,toc:()=>s});var t=a(7462),l=(a(7294),a(3905));const r={},p="PgSQL",i={unversionedId:"common/pgsql",id:"common/pgsql",title:"PgSQL",description:"\u57fa\u672c\u4f7f\u7528",source:"@site/docs/common/pgsql.md",sourceDirName:"common",slug:"/common/pgsql",permalink:"/docs/common/pgsql",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"OCI \u89c4\u8303",permalink:"/docs/common/oci"},next:{title:"Python",permalink:"/docs/common/python"}},o={},s=[{value:"\u57fa\u672c\u4f7f\u7528",id:"\u57fa\u672c\u4f7f\u7528",level:2},{value:"version()",id:"version",level:3},{value:"current_date",id:"current_date",level:3},{value:"CRUD",id:"crud",level:3},{value:"<code>/</code>",id:"-1",level:3},{value:"<code>&gt;</code>",id:"-2",level:3},{value:"ORDER BY",id:"order-by",level:3},{value:"DISTINCT",id:"distinct",level:3},{value:"WHERE",id:"where",level:3},{value:"JOIN",id:"join",level:3},{value:"JOIN ON",id:"join-on",level:3},{value:"MAX",id:"max",level:3},{value:"UPDATE",id:"update",level:3},{value:"DELETE",id:"delete",level:3},{value:"\u9ad8\u7ea7\u529f\u80fd",id:"\u9ad8\u7ea7\u529f\u80fd",level:2},{value:"VIEW",id:"view",level:3},{value:"COPY",id:"copy",level:3},{value:"FOREIGN KEY",id:"foreign-key",level:3},{value:"Transactions",id:"transactions",level:3},{value:"Window Functions",id:"window-functions",level:3},{value:"\u5feb\u901f\u5f00\u59cb",id:"\u5feb\u901f\u5f00\u59cb",level:4},{value:"ORDER BY",id:"order-by-1",level:4},{value:"\u4e0d\u80fd\u4f7f\u7528\u7684\u60c5\u51b5",id:"\u4e0d\u80fd\u4f7f\u7528\u7684\u60c5\u51b5",level:4},{value:"\u591a\u4e2a\u7a97\u53e3\u51fd\u6570",id:"\u591a\u4e2a\u7a97\u53e3\u51fd\u6570",level:4},{value:"Inheritance \u7ee7\u627f",id:"inheritance-\u7ee7\u627f",level:3},{value:"SQL \u8bed\u8a00",id:"sql-\u8bed\u8a00",level:2},{value:"\u5e38\u91cf",id:"\u5e38\u91cf",level:3}],c={toc:s};function m(e){let{components:n,...a}=e;return(0,l.kt)("wrapper",(0,t.Z)({},c,a,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"pgsql"},"PgSQL"),(0,l.kt)("h2",{id:""}),(0,l.kt)("h2",{id:"\u57fa\u672c\u4f7f\u7528"},"\u57fa\u672c\u4f7f\u7528"),(0,l.kt)("h3",{id:"version"},"version()"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT version();\n")),(0,l.kt)("h3",{id:"current_date"},"current_date"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT CURRENT_DATE;\n")),(0,l.kt)("h3",{id:"crud"},"CRUD"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT 2 + 2;\n\nDROP TABLE IF EXISTS weather;\n\nDROP TABLE IF EXISTS cities;\n\n-- internal commands, starts with '\\'\n-- create table\n-- smallint, real, double precision, char(N), varchar(N), date, time, timestamp, and interval, as well as other types of general utility and a rich set of geometric types.\nCREATE TABLE weather (\n  city varchar(80),\n  temp_lo int, -- low temperature\n  temp_hi int, -- high temperature\n  prcp real, -- precipitation\n  date date\n);\n\nCREATE TABLE cities (\n  name varchar(80),\n  location point\n);\n\nINSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');\n\nINSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');\n\nINSERT INTO weather (city, temp_lo, temp_hi, prcp, date) VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');\n\nINSERT INTO weather (date, city, temp_hi, temp_lo) VALUES ('1994-11-29', 'Hayward', 54, 37);\n\nSELECT * FROM weather;\n\nSELECT\n  city,\n  temp_lo,\n  temp_hi,\n  prcp,\n  date\nFROM\n  weather;\n")),(0,l.kt)("h3",{id:"-1"},(0,l.kt)("inlineCode",{parentName:"h3"},"/")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  city,\n  (temp_hi + temp_lo) / 2 AS temp_avg,\n  date\nFROM\n  weather;\n\n")),(0,l.kt)("h3",{id:"-2"},(0,l.kt)("inlineCode",{parentName:"h3"},">")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  *\nFROM\n  weather\nWHERE\n  city = 'San Francisco'\n  AND prcp > 0.0;\n")),(0,l.kt)("h3",{id:"order-by"},"ORDER BY"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  *\nFROM\n  weather\nORDER BY\n  city;\n\nSELECT\n  *\nFROM\n  weather\nORDER BY\n  city,\n  temp_lo;\n")),(0,l.kt)("h3",{id:"distinct"},"DISTINCT"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT DISTINCT\n  city\nFROM\n  weather;\n\nSELECT DISTINCT\n  city\nFROM\n  weather\nORDER BY\n  city;\n")),(0,l.kt)("h3",{id:"where"},"WHERE"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  *\nFROM\n  weather,\n  cities\nWHERE\n  city = name;\n")),(0,l.kt)("h3",{id:"join"},"JOIN"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  *\nFROM\n  weather\n  JOIN cities ON city = name;\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  weather.city,\n  weather.temp_lo,\n  weather.temp_hi,\n  weather.prcp,\n  weather.date,\n  cities.location\nFROM\n  weather\n  JOIN cities ON weather.city = cities.name;\n")),(0,l.kt)("h3",{id:"join-on"},"JOIN ON"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  *\nFROM\n  weather\n  LEFT OUTER JOIN cities ON weather.city = cities.name;\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  w1.city,\n  w1.temp_lo AS low,\n  w1.temp_hi AS high,\n  w2.city,\n  w2.temp_lo AS low,\n  w2.temp_hi AS high\nFROM\n  weather w1\n  JOIN weather w2 ON w1.temp_lo < w2.temp_lo\n    AND w1.temp_hi > w2.temp_hi;\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  *\nFROM\n  weather w\n  JOIN cities c ON w.city = c.name;\n")),(0,l.kt)("h3",{id:"max"},"MAX"),(0,l.kt)("p",null,"ERROR:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT city FROM weather WHERE temp_lo = max(temp_lo);     WRONG\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  max(temp_lo)\nFROM\n  weather;\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  city\nFROM\n  weather\nWHERE\n  temp_lo = (\n    SELECT\n      max(temp_lo)\n    FROM\n      weather);\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  city,\n  max(temp_lo),\n  count(*) FILTER (WHERE temp_lo < 30)\nFROM\n  weather\nWHERE\n  city LIKE 'S%' -- (1)\nGROUP BY\n  city\nHAVING\n  max(temp_lo) < 40;\n")),(0,l.kt)("h3",{id:"update"},"UPDATE"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"-- update\nUPDATE\n  weather\nSET\n  temp_hi = temp_hi - 2,\n  temp_lo = temp_lo - 2\nWHERE\n  date > '1994-11-28';\n")),(0,l.kt)("h3",{id:"delete"},"DELETE"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"DELETE FROM weather\nWHERE city = 'Hayward';\n")),(0,l.kt)("h2",{id:"\u9ad8\u7ea7\u529f\u80fd"},"\u9ad8\u7ea7\u529f\u80fd"),(0,l.kt)("h3",{id:"view"},"VIEW"),(0,l.kt)("p",null,"\u5927\u91cf\u4f7f\u7528\u89c6\u56fe\u662f\u826f\u597d\u7684 SQL \u6570\u636e\u5e93\u8bbe\u8ba1\u7684\u4e00\u4e2a\u5173\u952e\u65b9\u9762\u3002\u89c6\u56fe\u5141\u8bb8\u5c06\u8868\u7684\u7ed3\u6784\u7ec6\u8282\u5c01\u88c5\u5728\u4e00\u81f4\u7684\u63a5\u53e3\u540e\u9762\uff0c\u8fd9\u4e9b\u7ec6\u8282\u53ef\u80fd\u4f1a\u968f\u7740\u5e94\u7528\u7a0b\u5e8f\u7684\u53d1\u5c55\u800c\u6539\u53d8\u3002"),(0,l.kt)("p",null,"\u89c6\u56fe\u51e0\u4e4e\u53ef\u4ee5\u7528\u5728\u4efb\u4f55\u53ef\u4ee5\u4f7f\u7528\u771f\u5b9e\u8868\u7684\u5730\u65b9\u3002\u5728\u5176\u4ed6\u89c6\u56fe\u4e0a\u5efa\u7acb\u89c6\u56fe\u7684\u60c5\u51b5\u5e76\u4e0d\u5c11\u89c1\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE VIEW myview AS\nSELECT\n  name,\n  temp_lo,\n  temp_hi,\n  prcp,\n  date,\n  location\nFROM\n  weather,\n  cities\nWHERE\n  city = name;\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  *\nFROM\n  myview;\n")),(0,l.kt)("h3",{id:"copy"},"COPY"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"COPY weather\nFROM\n  '/home/user/weather.txt';\n")),(0,l.kt)("h3",{id:"foreign-key"},"FOREIGN KEY"),(0,l.kt)("p",null,"\u5916\u952e\u7684\u884c\u4e3a\u53ef\u4ee5\u6839\u636e\u4f60\u7684\u5e94\u7528\u8fdb\u884c\u7ec6\u5fae\u7684\u8c03\u6574\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE TABLE cities (\n        name     varchar(80) primary key,\n        location point\n);\n\nCREATE TABLE weather (\n        city      varchar(80) references cities(name),\n        temp_lo   int,\n        temp_hi   int,\n        prcp      real,\n        date      date\n);\n")),(0,l.kt)("p",null,"running"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"INSERT INTO weather VALUES ('Berkeley', 45, 53, 0.0, '1994-11-28');\n")),(0,l.kt)("p",null,"should be"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-txt"},'ERROR:  insert or update on table "weather" violates foreign key constraint "weather_city_fkey"\nDETAIL:  Key (city)=(Berkeley) is not present in table "cities".\n\n')),(0,l.kt)("h3",{id:"transactions"},"Transactions"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"BEGIN;\nUPDATE accounts SET balance = balance - 100.00 WHERE name = 'Alice';\nSAVEPOINT my_savepoint;\nUPDATE accounts SET balance = balance + 100.00 WHERE name = 'Bob';\n-- oops ... forget that and use Wally's account\nROLLBACK TO my_savepoint;\nUPDATE accounts SET balance = balance + 100.00 WHERE name = 'Wally';\nCOMMIT;\n")),(0,l.kt)("h3",{id:"window-functions"},"Window Functions"),(0,l.kt)("h4",{id:"\u5feb\u901f\u5f00\u59cb"},"\u5feb\u901f\u5f00\u59cb"),(0,l.kt)("p",null,"\u6c42\u6240\u5728\u90e8\u95e8\u7684\u5e73\u5747\u5de5\u8d44"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT\n  depname, empno, salary, avg(salary)\nOVER (PARTITION BY depname)\nFROM empsalary;\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-txt"},"  depname  | empno | salary |          avg\n-----------+-------+--------+-----------------------\n develop   |    11 |   5200 | 5020.0000000000000000\n develop   |     7 |   4200 | 5020.0000000000000000\n develop   |     9 |   4500 | 5020.0000000000000000\n develop   |     8 |   6000 | 5020.0000000000000000\n develop   |    10 |   5200 | 5020.0000000000000000\n personnel |     5 |   3500 | 3700.0000000000000000\n personnel |     2 |   3900 | 3700.0000000000000000\n sales     |     3 |   4800 | 4866.6666666666666667\n sales     |     1 |   5000 | 4866.6666666666666667\n sales     |     4 |   4800 | 4866.6666666666666667\n(10 rows)\n")),(0,l.kt)("p",null,"\u6bcf\u4e2a\u90e8\u95e8\u7684\u5de5\u8d44\u6392\u540d\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT depname, empno, salary,\n       rank() OVER (PARTITION BY depname ORDER BY salary DESC)\nFROM empsalary;\n")),(0,l.kt)("p",null,"rank \u51fd\u6570\u4e3a\u5f53\u524d\u884c\u7684\u5206\u533a\u4e2d\u6bcf\u4e2a\u4e0d\u540c\u7684 ORDER BY \u503c\u4ea7\u751f\u4e00\u4e2a\u6570\u5b57\u7b49\u7ea7\uff0c\u4f7f\u7528 ORDER BY \u5b50\u53e5\u5b9a\u4e49\u7684\u987a\u5e8f\u3002rank \u4e0d\u9700\u8981\u660e\u786e\u7684\u53c2\u6570\uff0c\u56e0\u4e3a\u5176\u884c\u4e3a\u5b8c\u5168\u7531 OVER \u5b50\u53e5\u51b3\u5b9a\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-txt"},"  depname  | empno | salary | rank\n-----------+-------+--------+------\n develop   |     8 |   6000 |    1\n develop   |    10 |   5200 |    2\n develop   |    11 |   5200 |    2\n develop   |     9 |   4500 |    4\n develop   |     7 |   4200 |    5\n personnel |     2 |   3900 |    1\n personnel |     5 |   3500 |    2\n sales     |     1 |   5000 |    1\n sales     |     4 |   4800 |    2\n sales     |     3 |   4800 |    2\n(10 rows)\n")),(0,l.kt)("h4",{id:"order-by-1"},"ORDER BY"),(0,l.kt)("p",null,"ORDER BY"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT salary, sum(salary) OVER () FROM empsalary;\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-txt"}," salary |  sum\n--------+-------\n   5200 | 47100\n   5000 | 47100\n   3500 | 47100\n   4800 | 47100\n   3900 | 47100\n   4200 | 47100\n   4500 | 47100\n   4800 | 47100\n   6000 | 47100\n   5200 | 47100\n(10 rows)\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT salary, sum(salary) OVER (ORDER BY salary) FROM empsalary;\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-txt"}," salary |  sum\n--------+-------\n   3500 |  3500\n   3900 |  7400\n   4200 | 11600\n   4500 | 16100\n   4800 | 25700\n   4800 | 25700\n   5000 | 30700\n   5200 | 41100\n   5200 | 41100\n   6000 | 47100\n(10 rows)\n")),(0,l.kt)("h4",{id:"\u4e0d\u80fd\u4f7f\u7528\u7684\u60c5\u51b5"},"\u4e0d\u80fd\u4f7f\u7528\u7684\u60c5\u51b5"),(0,l.kt)("p",null,"\u7a97\u53e3\u51fd\u6570\u53ea\u5141\u8bb8\u5728\u67e5\u8be2\u7684 SELECT \u548c ORDER BY \u5b50\u53e5\u4e2d\u4f7f\u7528\u3002\u5176\u4ed6\u5730\u65b9\u4f8b\u5982 GROUP BY\u3001HAVING \u548c WHERE \u5b50\u53e5\u4e2d\u662f\u7981\u6b62\u7684\u3002"),(0,l.kt)("p",null,"\u8fd9\u662f\u56e0\u4e3a\u5b83\u4eec\u5728\u903b\u8f91\u4e0a\u662f\u5728\u8fd9\u4e9b\u5b50\u53e5\u7684\u5904\u7406\u4e4b\u540e\u6267\u884c\u7684\u3002"),(0,l.kt)("p",null,"\u53e6\u5916\uff0c\u7a97\u53e3\u51fd\u6570\u5728\u975e\u7a97\u53e3\u805a\u5408\u51fd\u6570\u4e4b\u540e\u6267\u884c\u3002\u8fd9\u610f\u5473\u7740\u5728\u4e00\u4e2a\u7a97\u53e3\u51fd\u6570\u7684\u53c2\u6570\u4e2d\u5305\u542b\u4e00\u4e2a\u805a\u5408\u51fd\u6570\u7684\u8c03\u7528\u662f\u6709\u6548\u7684\uff0c\u4f46\u53cd\u4e4b\u5219\u65e0\u6548\u3002"),(0,l.kt)("p",null,"\u5982\u679c\u9700\u8981\u5728\u7a97\u53e3\u8ba1\u7b97\u6267\u884c\u540e\u5bf9\u884c\u8fdb\u884c\u8fc7\u6ee4\u6216\u5206\u7ec4\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528\u4e00\u4e2a\u5b50\u9009\u62e9\u3002\u4f8b\u5982\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT depname, empno, salary, enroll_date\nFROM\n  (SELECT depname, empno, salary, enroll_date,\n          rank() OVER (PARTITION BY depname ORDER BY salary DESC, empno) AS pos\n     FROM empsalary\n  ) AS ss\nWHERE pos < 3;\n")),(0,l.kt)("h4",{id:"\u591a\u4e2a\u7a97\u53e3\u51fd\u6570"},"\u591a\u4e2a\u7a97\u53e3\u51fd\u6570"),(0,l.kt)("p",null,"\u4e0a\u8ff0\u67e5\u8be2\u53ea\u663e\u793a\u5185\u90e8\u67e5\u8be2\u4e2d\u6392\u540d\u5c0f\u4e8e 3 \u7684\u8bb0\u5f55\u3002"),(0,l.kt)("p",null,"\u5f53\u4e00\u4e2a\u67e5\u8be2\u6d89\u53ca\u5230\u591a\u4e2a\u7a97\u53e3\u51fd\u6570\u65f6\uff0c\u53ef\u4ee5\u7528\u4e00\u4e2a\u5355\u72ec\u7684 OVER \u5b50\u53e5\u6765\u5199\u51fa\u6bcf\u4e00\u4e2a\u7a97\u53e3\u51fd\u6570\u3002"),(0,l.kt)("p",null,"\u4f46\u662f\u5982\u679c\u51e0\u4e2a\u51fd\u6570\u9700\u8981\u76f8\u540c\u7684\u7a97\u53e3\u884c\u4e3a\uff0c\u8fd9\u6837\u505a\u662f\u91cd\u590d\u548c\u5bb9\u6613\u51fa\u9519\u7684\u3002"),(0,l.kt)("p",null,"\u76f8\u53cd\uff0c\u53ef\u4ee5\u5728 WINDOW \u5b50\u53e5\u4e2d\u547d\u540d\u6bcf\u4e2a\u7a97\u53e3\u884c\u4e3a\uff0c\u7136\u540e\u5728 OVER \u4e2d\u5f15\u7528\u3002\u6bd4\u5982\u8bf4\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT sum(salary) OVER w, avg(salary) OVER w\n  FROM empsalary\n  WINDOW w AS (PARTITION BY depname ORDER BY salary DESC);\n")),(0,l.kt)("h3",{id:"inheritance-\u7ee7\u627f"},"Inheritance \u7ee7\u627f"),(0,l.kt)("p",null,"\u521b\u5efa\u4e24\u4e2a\u8868\u3002\u4e00\u5f20\u57ce\u5e02\u8868\u548c\u4e00\u5f20\u9996\u90fd\u8868\u3002\u5f53\u7136\uff0c\u9996\u90fd\u4e5f\u662f\u57ce\u5e02\uff0c"),(0,l.kt)("p",null,"\u6211\u4eec\u5e0c\u671b\u5728\u5217\u51fa\u6240\u6709\u57ce\u5e02\u65f6\uff0c\u80fd\u4ee5\u9690\u542b\u7684\u65b9\u5f0f\u663e\u793a\u9996\u90fd\u3002\u4e0b\u9762\u662f\u4e00\u4e9b\u5907\u9009\u65b9\u6848\u3002"),(0,l.kt)("p",null,"\u4f7f\u7528\u89c6\u56fe\u5b9e\u73b0\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE TABLE capitals (\n  name       text,\n  population real,\n  elevation  int,    -- (in ft)\n  state      char(2)\n);\n\nCREATE TABLE non_capitals (\n  name       text,\n  population real,\n  elevation  int     -- (in ft)\n);\n\nCREATE VIEW cities AS\n  SELECT name, population, elevation FROM capitals\n    UNION\n  SELECT name, population, elevation FROM non_capitals;\n")),(0,l.kt)("p",null,"\u4f7f\u7528\u7ee7\u627f\u5b9e\u73b0\uff1a"),(0,l.kt)("p",null,"\u5728 PostgreSQL \u4e2d\uff0c\u4e00\u4e2a\u8868\u53ef\u4ee5\u4ece\u96f6\u4e2a\u6216\u591a\u4e2a\u5176\u4ed6\u8868\u7ee7\u627f\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE TABLE cities (\n  name       text,\n  population real,\n  elevation  int     -- (in ft)\n);\n\nCREATE TABLE capitals (\n  state      char(2) UNIQUE NOT NULL\n) INHERITS (cities);\n")),(0,l.kt)("p",null,"capitals \u7ee7\u627f\u4e86\u57ce\u5e02\u7684\u6240\u6709\u5217\uff08\u540d\u79f0\u3001\u4eba\u53e3\u548c\u6d77\u62d4\uff09\u3002capitals \u8868\u6709\u4e00\u4e2a\u989d\u5916\u7684\u5217\uff0cstate\u3002"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"name \u5217\u7684\u7c7b\u578b\u662f text\uff0c\u8fd9\u662f PostgreSQL \u7684\u539f\u751f\u7c7b\u578b\uff0c\u7528\u4e8e\u53ef\u53d8\u957f\u5ea6\u7684\u5b57\u7b26\u4e32\u3002")),(0,l.kt)("p",null,"\u7ee7\u627f\u4f1a\u81ea\u52a8\u4ece\u5b50\u8868\u4e2d\u67e5\u8be2"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT name, elevation\n  FROM cities\n  WHERE elevation > 500;\n")),(0,l.kt)("p",null,"\u4f60\u53ef\u4ee5\u4f7f\u7528 ONLY \u907f\u514d\u81ea\u52a8\u67e5\u8be2"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT name, elevation\n    FROM ONLY cities\n    WHERE elevation > 500;\n")),(0,l.kt)("h2",{id:"sql-\u8bed\u8a00"},"SQL \u8bed\u8a00"),(0,l.kt)("h3",{id:"\u5e38\u91cf"},"\u5e38\u91cf"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5b57\u7b26\u4e32\uff0c\u7528\u5355\u5f15\u53f7")),(0,l.kt)("p",null,"\u4e24\u4e2a\u4ec5\u7531\u81f3\u5c11\u4e00\u4e2a\u6362\u884c\u7684\u7a7a\u767d\u5904\u9694\u5f00\u7684\u5b57\u7b26\u4e32\u5e38\u91cf\u88ab\u8fde\u63a5\u8d77\u6765\uff0c\u5e76\u6709\u6548\u5730\u5904\u7406\uff0c\u5c31\u50cf\u5b57\u7b26\u4e32\u88ab\u5199\u6210\u4e00\u4e2a\u5e38\u91cf\u4e00\u6837\u3002\u6bd4\u5982\u8bf4"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT 'foo'\n'bar';\n")),(0,l.kt)("p",null,"\u548c"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT 'foobar';\n")),(0,l.kt)("p",null,"\u76f8\u7b49"),(0,l.kt)("p",null,"\u4f46\u662f"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"SELECT 'foo'      'bar';\n")),(0,l.kt)("p",null,"\u662f\u4e0d\u5408\u6cd5\u7684"),(0,l.kt)("p",null,"g"))}m.isMDXComponent=!0}}]);