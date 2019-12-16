# JavaScript高级程序设计（第三版）

## 5.4  RegExp类型

ES中通过RegExp类型支持正则表达式

var expression =  / pattern / flags ;

pattern可以是任何正则表达式 ，包含字符类，限定符，分组，向前查找及反向引用。

每个正则表达式可带有一或多个标志（flags）,以标明正则表达式的行为。

匹配模式支持以下三个标志：

- g：表示全局模式，即模式将被应用于所有字符串，在发现第一个匹配项时立即停止
- i：不区分大小写（case-insensitive）模式，匹配时忽略模式与字符串的大小写
- m：多行(multiline)模式，即在到达一行文本末尾时继续查找下一行中是否存在与模式匹配的项

1.字面量形式创建正则表达式

```javascript
var pattern1 = /at/g; 		//匹配所有"at"实例
var pattern2 = /[bc]at/i; 	//匹配第一个bat或cat，不区分大小写
var pattern3 = /.at/gi;		//匹配以at结尾的3个字符的组合，不区分大小写
```

模式中的所有元字符必须转义，正则表达式中包括( [ { \ ^ $ | )  ? * + .]  }

2.RegExp构造函数

参数为字符串，某些情况需要进行双重转义，\\\转\\\\\\\

```javascript
var pattern1 = new RegExp("[bc]at", "i");
```

```javascript
var re = null, i;
for (i = 0; i < 10; i++){
    re = /cat/g;
    re.test("catastrophe"); //ES3中失败，第二次调用从匹配末尾找，找不到
}
for (i = 0; i < 10; i++){
    re = new RegExp("cat", "g"); //每次都返回true，每次迭代创建一个新RegExp实例
    re.test("catastrophe");
}
```

**5.4.1 RegExp实例属性**

每个RegExp都具有以下属性：

- global：布尔值，表示是否设置了g标志
- ignoreCase：布尔值，。。。i 标志
- lastIndex：整数，表示开始搜索下一个匹配项的字符位置，从0算起
- multiline：布尔值，。。。m标志
- source：正则表达式的字符串表示，按照字面量形式而非传入构造函数的字符串模式

**5.4.2 RegExp实例方法**

**exec()**：接收一个参数，即要应用模式的字符串，返回包含第一个匹配项信息的数组；

没有匹配项的情况下返回null；返回的数组实例包含两个额外属性：index和input

index：匹配项在字符串中的位置

input：应用正则表达式的字符串

数组中，第一项是与整个模式匹配的字符串，其他项为与模式中**捕获组**匹配的字符串

```javascript
var text = "mom and dad and baby";
var pattern = /mom(and dad(and baby)?)?/gi; //最内部捕获组为"and baby"
var matches = pattern.exec(text);
alert(matches.index);	//0
alert(matches.input);	//"mom and dad and baby"
alert(matches[0]);		//"mom and dad and baby"
alert(matches[1]);		//" and dad and baby"
alert(matches[2]);		//"and baby"
```

对于exec()方法而言，

在不设置全局标志的情况下，在同一字符串上多次调用exec()将始终返回第一个匹配项的信息。

在设置全局标志的情况下，每次调用exec()则都会在字符串中继续查找匹配项

```javascript
var text = "cat, bat, sat, fat";
var pattern1 = /.at/;

var matches = pattern1.exec(text);
alert(matches.index);	//0
alert(matches[0]);	//cat
alert(pattern1.lastIndex);	//0

var pattern2 = /.at/g;

var matches =  pattern2.exec(text);
alert(matches.index);	//0
alert(matches[0]);		//cat
alert(pattern2.lastIndex);	//0

matches = pattern2.exec(text);
alert(matches.index);	//5
alert(pattern2.lastIndex);	//8
```

**test()**：接收一个字符串参数。在模式与该参数匹配的情况下返回true，否则返回false

```javascript
var text = "000-00-0000";
var pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)){	//如果文本与模式匹配，则显示一条消息。
    alert("The pattern was matched.");
}
```

**5.4.3 RegExp构造函数属性**

适用于作用域中的所有正则表达式，且基于所执行的最近一次正则表达式操作而变化。

| 长属性名     | 短属性名 | 说明                                 |
| ------------ | -------- | ------------------------------------ |
| input        | $_       | 最近一次要匹配的字符串               |
| lastMatch    | $&       | 最近一次与整个正则表达式匹配的字符串 |
| lastParen    | $+       | 最近一次匹配的捕获组                 |
| leftContext  | $`       | input字符串中lastMatch之前的文本     |
| rightContext | $'       | Input字符串中lastMatch之后的文本     |
| multiline    | $*       | 表示是否所有表达式都使用多行模式     |

  除以上，还有9个用于存储捕获组的构造函数属性。

访问方法：

RegExp.$1,RegExp.$2...依次类推，分别用于存储第一第二...个匹配的捕获组

调用exec()与test()时，这些属性被自动填充

```javascript
var text = "this has been a short summer";
var pattern = /(.)hort/g;
if (pattern.test(text)){
    alert(RegExp.input);		//this has been a short summer(最近一次匹配的字符串 )
    alert(RegExp.lastMatch);	//short (最近一次匹配项)
    alert(RegExp.leftContext);	//this has been a	(short之前的文本)
    alert(RegExp.rightContext);	//summer  (short之后的文本)
    alert(RegExp.lastParen);	//s (最近一次匹配的捕获组)
    alert(RegExp.multiline);	//false (是否使用多行)
}
//短属性名表示，不是有效的ES标识符，使用方括号语法访问
if(pattern.test(text)){
    alert(RegExp.$_);
    alert(RegExp["S&"]);
    alert(RegExp["$`"]);
    alert(RegExp["$'"]);
    alert(RegExp["$+"]);
    alert(RegExp["$*"]);
}//顺序对应上面
```

```javascript
var test = "this has been a short summer";
var pattern = /(..)or(.)/g;	//包含两个捕获组
if(pattern.test(text)){
    alert(RegExp.$1);	//sh
    alert(RegExp.$2);	//t
}
```

**5.4.4 模式的局限性**

ES正则表达式不支持的特性如下，(正则表达式详述： www.regular-expressions.info)

- 匹配字符串开始和结尾的\A和\Z锚，但支持^和$
- 向后查找lookbehind，但支持向前查找lookahead
- 并集和交集类
- 原子组(atomic grouping)
- Unicode支持(单个字符除外，如\uFFFF)
- 命名的捕获组，但支持编号的捕获组
- s(single,单行)和x(free-spacing，无间隔)匹配模式
- 条件匹配
- 正则表达式注释

