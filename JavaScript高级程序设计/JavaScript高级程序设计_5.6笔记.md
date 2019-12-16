# JavaScript高级程序设计（第三版）

## 5.6  基本包装类型

Boolean，Number，String             

引用类型与基本包装类型的**区别在于**对象的生存期 ：

使用new操作符创建的引用类型实例在执行流离开作用域之前都一直保存在内存中。

自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。（运行时不能为基本类型值添加属性和方法）

```javascript
var s1 = "some text";	//执行完被销毁，无法添加属性和方法
s1.color = "red";	
alert(s1.color);	//undefined 
```

对基本包装类型的实例调用typeof会返回"object"，所有基本包装类型的对象都会被转换为布尔值true

```javascript
var obj = new Object("some text");
alert(obj instanceof String);	//true
```

使用new调用基本包装类型的构造函数，与直接调用同名的转型函数不一样

```javascript
var value = "25";
var number = Number(value);	//转型函数
alert(typeof number);	//"number"

var obj = new Number(value);	//构造函数
alert(typeof obj);	//"object"
```

**5.6.1 Boolean类型**

Boolean类型是与布尔值对应的引用类型。

要创建Boolean对象，可使用构造函数并传入布尔值

```javascript
var booleanObject = new Boolean(true);

var falseObject = new Boolean(false); //布尔对象
var result = falseObject && true;
alert(result);	//true

var falseValue = false;
result = falseValue && true;
alert(result);	//false

alert(typeof falseObject);	//object
alert(typeof falseValue);	//boolean
alert(falseObject instanceof Boolean);	//true
alert(falseValue instanceof Boolean);	//false，falseValue不是Boolean类型的实例
```

**instanceof 测试对象是否某类型的实例**

**5.6.2 Number类型**

与数字值对应的引用类型。

要构建Number对象，可在调用Number构造函数时向其中传递相应的数值。

```javascript
var numberObject = new Number(10);
```

Number类型提供一些用于将数值格式化为字符串的方法。

**toFixed()** 方法会按照指定的小数位返回数值的字符串表示，数值小数位超过规定位数则四舍五入

```javascript
var num = 10.005;
alert(num.toFixed(2));	//"10.01"

var n = 10;
alert(num.toFixed(3));	//"10.000"
```

**toExponential()** 指数表示法，接受一个参数，指定输出结果的小数位数

**toPrecision()** 接收一个参数，表示数值所有数字的位数

类似的，Number对象是Number类型的实例，而基本类型的数值不是

**5.6.3 String类型** 

字符串的对象包装类型

使用String构造函数来创建

```javascript 
var stringObject = new String("hello world");
```

valueOf()，toLocaleString()，toString()都返回对象所表示的基本字符串值

String类型的每个实例都有length属性

- 字符方法

  charAt()，charCodeAt() 访问字符串中特定字符

  接收一个参数，位置基于0，前者返回给定位置的字符，后者返回字符编码

  还可使用方括号加数字索引访问个别字符，比如 a[3]

- 字符串操作方法

  concat()：将1或多个字符串拼接，返回新的字符串，参数不限个数

  slice()，substr()，substring() 

  ```javascript 
  slice(3,7);//[3,7)
  substring(3,7);//[3,7)
  substr(3,7);//[3,共7个字符]
  ```

  处理负值参数：

  slice()方法将负值与字符串长度相加

  substr()将负的第一个参数加上字符串长度，第二个转为0

  substring()将所有负值转为0，小的数在前，大的数在后

- 字符串位置方法

  indexOf()

  lastIndexOf()

  搜索给定子字符串的位置并返回位置

  接收两个参数，第二个参数表示搜索的起始位置，比如从6开始往后、前搜

  ```javascript
  var stringValue = "Lorem ipsum dolor sit amet,consectetur adipisicing elit";
  var positions = new Array();
  var pos = stringValue.indexOf("e");
  
  while(pos > -1){
      positions.push(pos);
      pos = stringValue.indexOf("e",pos + 1); //一直查找e的位置
  }
  alert(positions);	//"3,24,32,35,52"
  ```

- trim方法

  创建字符串副本，删除前置及后缀的所有空格，然后返回结果

- 字符串大小写转换方法

  toLowerCase()

  toUpperCase()

  toLocaleLowerCase()  针对特定地区

  toLowerUpperCase()

- 字符串的模式匹配方法

  match()，同RegExp的exec()方法一样，返回数组。第一项为与整个模式匹配的字符串，之后每一项保存与正则表达式中捕获组匹配的字符串

  search()，返回字符串中第一个匹配项的索引，没有返回-1

  replace()，第一个参数可以是RegExp对象或字符串，如果声明g标志则对所有字符串产生替换，没有则只针对第一项。第二个参数可以是一个字符串或一个函数

  | 字符序列 | 替换文本                                                     |
  | -------- | ------------------------------------------------------------ |
  | $$       | $                                                            |
  | $&       | 匹配整个模式的子字符串。与RegExp.lastMatch的值相同           |
  | $'       | 匹配的子字符串之前的子字符串。与RegExp.leftContext的值相同   |
  | $'       | 匹配的子字符串之后的子字符串。与RegExp.rightContext的值相同  |
  | $n       | 匹配第*n*个捕获组的子字符串，其中*n*等于0～9。例如，$1是匹配第一个捕获组的子字符串，$2是匹配第二个捕获组的子字符串，以此类推。如果正则表达式中没有定义捕获组，则使用空字符串 |
  | $nn      | 匹配第*nn*个捕获组的子字符串，其中*nn*等于01～99。例如，$01是匹配第一个捕获组的子字符串，$02 是匹配第二个捕获组的子字符串，以此类推。如果正则表达式中没有定义捕获组，则使用空字符串 |

```javascript
var text = "cat, bat, sat, fat";
result = text.replace(/(.at)/g,"word($1)");
alert(result);	//word(cat),word(bat),word(sat),word(fat)
```

replace()在只有一个一个匹配项的情况下，会向函数传递3个参数：模式的匹配项，模式匹配项在字符串中的位置和原始字符串。

```javascript
function htmlEscape(text){
    return text.replace(/[<>"&]/g,function(match, pos, origininalText){
        switch(match){
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
        }
    });
}
alert(htmlEscape("<p class=\"greeting\">Hello World!</p>"));
//&lt;p class=&quot;greeting&quot;&gt;Hello world!&lt;/p&gt;
```

split()：基于分隔符分割字符串，将结果存放在数组中。分隔符可以是字符串，RegExp对象

接受第二个参数指定数组大小

http://blog.stevenlevithan.com/archives/cross-browser-split

- localeCompare()比较两个字符串

  字符串与参数比较，字符串小于参数返回-1 ，相等返回0，大于返回1

- fromCharCode()方法

  静态，接收一个或多个字符编码，将其转换为1个字符串

- HTML方法

  | 方法         | 输出结果                            |
  | ------------ | ----------------------------------- |
  | anchor(name) | <a name="name"\>string\</a>         |
  | big()        | <big\>string\</big>                 |
  | bold()       | <b\>string\</b>                     |
  | fixed()      | <tt\>string\<tt>                    |
  | fontcolor()  | <font color="color"\>string\</font> |
  | fontsize()   | <font size="size"\>string\</font>   |
  | italics()    | <i\>string\</i>                     |
  | link(url)    | <a href="url"\>string\</a>          |
  | small()      | <small\>string\</small>             |
  | strike()     | <strike\>string\</strike>           |
  | sub()        | <sub\>string\</sub>                 |
  | sup()        | <sup\>string\</sup>                 |

  

  

  

  

  