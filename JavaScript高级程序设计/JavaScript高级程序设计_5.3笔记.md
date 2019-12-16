# JavaScript高级程序设计（第三版）

## 5.3  Date类型

UTC（Coordinated Universal Time）国际协调时间

精确到1970年1月1日之前或之后的285 616年

创建日期对象使用new操作符和Date()构造函数

```javascript
var now = new Date();
```

无参数，新建对象自动获得当前日期及时间

​	Date.parse()：接收表示日期的字符串参数，根据字符串返回相应日期的毫秒数，实现因地区而异

​	Date.UTC()：同上，但是月份基于0开始（一月是0，小时0到23）

​	参数分别为年月日 时分秒 年约为必须。天数默认1，其余默认0

将地区设置成美国的浏览器接受以下日期格式

- 6/13/2019
- January 12,2019
- Tue May 25 2019 00:00:00 GMT-0700
- ISO 8601扩展格式：2019-09-06T09:54:00

```javascript
var someDate = new Date(Date.parse("May 25 ,2019"));
var someDate = new Date("May 25,2019"); //等价,Date()模仿Date.parse()
```

若传入参数不能表示日期，则返回NaN

```javascript
var y2k = new Date(Date.UTC(2000, 0));//2000年1月1日0点0分0秒
var allFives = new Date(Date.UTC(2019, 9, 6, 11, 49, 23));
```

​	Date()也可以模仿Date.UTC()，日期基于系统设置的本地时区创建非GMT，接收参数同Date.UTC()

​	ES5添加了Date.now()方法，返回调用此方法时的日期

```javascript
var start = Date.now();
doSomething();
var stop = Date.now;
result = stop - start;//取得函数执行时间
```

**5.3.1 继承的方法**

Date类型也重写了toLocaleString()，toString(),valueOf()方法返回值与其他类型不同

toLocaleString()遵循浏览器设置的地区包含AM，PM

toString()返回带有时区信息的日期和时间，小时范围0到23

都输出PST（Pacific Standard Time）太平洋标准时间

valueOf()，不返回字符串，返回日期的毫秒表示。方便使用比较操作符

```javascript
var date1 = new Date(2007, 0, 1);	//"January 1, 2007"
var date2 = new Date(2007,1,1);		//"February 1, 2007"
alert(date1 < date2);	//true
```

**5.3.2 日期格式化方法**

- toDateString()——星期月日年
- toTimeString()——时分秒时区
- toLocaleDateString()——星期月日年
- toLocaleTimeString()——时分秒
- toUTCString()——UTC日期
- toGMTString()——GMT日期

**5.3.3 日期/时间组件方法**

| 方法                    | 说明                                  |
| ----------------------- | ------------------------------------- |
| getTime()               | 返回日期的毫秒数，与valueOf()返回值同 |
| setTime(毫秒)           | 以毫秒设置日期，会改变整个日期        |
| getFullYear()           | 取得4位数的年份                       |
| getUTCFullYear()        | 返回UTC日期的4位数年份                |
| setFullYear(年)         | 输入必须为四位数                      |
| setUTCFullYear(年)      | 同上                                  |
| getMonth()              | 返回日期中的月份，0表示1月            |
| getUTCMonth()           | 同上                                  |
| setMonth(月)            | >0，>11增加年份                       |
| setUTCMonth(月)         | 同上                                  |
| getDate()               | 返回日期月份中的天数（1到31）         |
| getUTCDate()            | 同上                                  |
| setDate(日)             | 超过应有天数增加月份                  |
| setUTCDate(日)          | 同上                                  |
| getDay()                | 返回星期，0到6代表周天到周六          |
| getUTCDay()             | 同上                                  |
| getHours()              | 返回日期中的小时数，0到23             |
| getUTCHours()           | 同上                                  |
| setHours(时)            | 超过增加天数                          |
| setUTCHours(时)         | 同上                                  |
| getMinutes()            | 返回分钟数，0到59                     |
| getUTCMinutes()         | 同上                                  |
| setMinutes(分)          | 超过增加小时数                        |
| setUTCMinutes(分)       | 同上                                  |
| getSeconds()            | 返回秒数，0到59                       |
| getUTCSeconds()         | 同上                                  |
| setSeconds(秒)          | 超过增加分数                          |
| setUTCSeconds(秒)       | 同上                                  |
| getMillseconds()        | 返回毫秒数                            |
| getUTCMillseconds()     | 同上                                  |
| setMillseconds(毫秒)    | 设置毫秒数                            |
| setUTCMillseconds(毫秒) | 同上                                  |
| getTimezoneOffset()     | 返回本地时间与UTC时间相差的分钟数     |

