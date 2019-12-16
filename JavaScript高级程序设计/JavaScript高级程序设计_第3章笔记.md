# JavaScript高级程序设计(第三版)

## 第三章 基本概念

ECMA-262叫做ECMAScript的伪语言，此书按照ES3就ES5变化给出说明。

### 语法

- **区分大小写**：ES中的一切都区分大小写。

- **标识符**：指变量、函数、属性的名字或函数的参数。格式规则如下：

  - 第一个字符不能是数字，其余部分是字母、下划线、美元符号或数字
  - 不能使用关键字
  - 区分大小写
  - 不能使用算数运算符

  命名规范：

  - 有意义
  - 驼峰命名法：第一个字母小写，剩下单词首字母大写（一般变量用_连接，函数名用驼峰命名）
  - 不建议使用"$"作为变量名
  - 不允许使用-，被保留用于减法

- **注释**

  - //    单行注释

  - /*

    **

    */    多行注释

- 严格模式strict mode

  严格模式下，ES3中一些不确定行为得到处理，对某些不安全的操作也会抛出错误。若在整个脚本启用严格模式，在顶部添加以下代码：

  ```javascript
  function doSomething(){
      "use strict"; //实际上是编译指示（pragma），告诉JS引擎切换到严格模式
      //函数体
  }
  ```

  

- 语句以分号结尾，不建议省略，增进代码性能，使解析器不必分析断句

### 关键字&保留字

关键字可用于表示控制语句的开始或结束

| abstract | arguements | boolean    | break     | byte         |
| -------- | ---------- | ---------- | --------- | ------------ |
| case     | catch      | char       | class     | const        |
| continue | debugger   | default    | delete    | do           |
| double   | else       | enum       | eval      | export       |
| extends  | false      | final      | finally   | float        |
| for      | function   | goto       | if        | implements   |
| import   | in         | instanceof | int       | interface    |
| let      | long       | native     | new       | null         |
| package  | private    | protected  | public    | return       |
| short    | static     | super      | switch    | synchronized |
| this     | throw      | throws     | transient | true         |
| try      | typeof     | var        | void      | volatile     |
| while    | with       | yield      |           |              |

 如果使用关键字或保留字作为标识符和属性名，则报错Identifier Expected   

### 变量

​	ES变量是松散类型的，即可用来保存任何类型的数据。换言之，**每个变量只是用于保存值的占位符。**

​	定义变量使用操作符var。

用var定义的变量将成为定义该变量的作用域中的局部变量。

如果在函数中使用var定义一个变量，则变量在函数退出后被销毁。

函数中定义变量省略var则声明为全局变量。但有意的会略var操作符，会由于相应变量不会马上有定义而导致不必要的混乱。

可使用一条语句定义多个变量。用逗号分开即可。

### 数据类型

ES中有5种基本数据类型：Undefined Null Boolean  Number  String

​			1种复杂数据类型：Object。本质上由无序的名值对组成。

ES不支持任何创建自定义类型的机制，所有值最终都将是上述6种类型之一。

- **typeof操作符**：检测给定变量的数据类型。返回类型的字符串

  "undefined"——值未定义

  "boolean"——值是布尔值

  "string"——值是字符串

  "number"——值是数值

  "object"——值是对象或null；null被认为是一个**空对象**

  "function"——值是函数

1. **Undefined类型**

   只有一个值：undefined。 未初始化的值默认取得undefined的值。

   ```javascript
   var message;
   alert(message == undefined); //true
   var txt = undefined; //undefined字面量
   alert(txt == undefined); //true
   ```

   包含undefined值的变量和尚未定义的变量还是不同的。

   但是对未声明和未初始化的变量执行typeof操作符都会返回undefined值.

   对未声明的变量只能执行typeof操作符。

   ```javascript
   var message;
   alert(message);//"undefined"
   alert(age);//产生错误,age未定义
   alert(typeof message);//"undefined"
   alert(typeof age);//"undefined"
   ```

2. **Null类型**

   只有一个值：null。逻辑角度上来讲，null表示一个空对象指针，所有使用typeof返回"object"。

   ​	如果定义的变量准备在将来用于保存对象，最好将变量初始化为null而不是其他值。

   ​	实际上，undefined值是派生自null值的。所以它们的相等性测试为true。

   ```javascript
   alert(null == undefined); //true
   ```

   undefined没必要设置为显示变量，但是null必须设置为显示变量。

3. **Boolean类型**

   只有两个字面值：true     false

   转布尔型函数：Boolean()

   转为false的值：false 空字符串 0  NaN   null   undefined

   转为true的值：true 任何非空字符串  任何非零数字值（包括无穷大）  任何对象  

   ​						n/a（N/A）即not applicable不适用

   ```javascript
   var message = "Hello world!";
   var messageAsBoolean = Boolean(message);
   ```

4. **Number类型**

   整数 浮点值（双精度值）

   最基本数值字面量格式：十进制整数

   八进制字面值：第一位必须是0，然后是八进制数序列（0-7），如果超出范围，前导0则被忽略，整个数值被当做十进制数处理。

   ```javascript
   var octalNum1 = 070; //八进制的56
   var octalNum2 = 079;//解析为十进制79
   var octalNum3 = 08;//解析为8
   ```

   八进制在严格模式下无效，导致JS引擎抛出错误。

   十六进制字面值前两位必须是0x，后跟任何十六进制（0-9，A-F，a-f）

   进行算数计算时，所有八进制和十六进制最终转换成十进制。

   JS中保存+0 -0 

   - **浮点数值**

     ​	必须包含一个小数点，且小数点后面至少有一位数字（没有则作整数处理）。小数点前面可以没数字但是不推荐。

     ​	**因为保存浮点值需要的内存空间是保存整数值的两倍，所以ES会不失时机地将浮点数值转换成整数。**若浮点数值本身就是一个整数，也会被转换成整数。

     ​	极大或极小数值用科学计数法表示的浮点数值保存。等于e前面的数值乘以10的指数次幂。

     ```javascript
     var floatNum = 3.125e7;//等于31250000,3.125*10^7
     ```

     默认情况下，ES会将小数点后面带有6个零以上的浮点数值使用科学计数法表示。

     浮点数值的最高精度是17位小数，但在进行算术计算时其精度远不如整数。0.1+0.2不等于0.3。无法测定特定的浮点数值。（基于IEEE754数值的浮点计算的通病）

   - **数值范围**

     ES能表示的最小数值存在Number.MIN_VALUE（大多数浏览器中为5e-324）

     最大数值存在Number.MAX_VALUE中

     若计算结果超过了JS数值范围的值，则被转成Infinity值，有正无穷与负无穷

     Infinity 不是能参与计算的数值

     测试一个数值是否有穷（位于最大与最小值之间），使用isFinite()函数，有穷返回true

     Number.NEGATIVE_INFINITY 和 Number.POSITIVE_INFINITY得到负无穷和正无穷的值

   - **NaN**

     即非数值（Not a Number）一个特殊的数值，用于表示一个本来要返回数值的操作数未返回数值的情况。

     ​	ES中，任何数值除以0会返回NaN，所以不会影响其他代码的运行。

     两个特点：

     - 任何涉及NaN的操作都会返回NaN，多步计算中可能导致问题。
     - NaN与任何值都不相等，包括NaN本身。

     针对以上特点，ES定义了isNaN()函数。函数接受一个参数，该参数可以是任何类型。

     不能转成数值的返回true，能转成数值的返回false

     ```javascript
     alert(isNaN(NaN)); //true
     alert(isNaN(10));  //false
     alert(isNaN("10")); //false
     alert(isNaN("blue")); //true
     alert(isNaN(true));  //false，转成数值1
     ```

     实际上只有0除以0才返回NaN，正整数除以0返回Infinity，负数除以0返回-Infinity

     ​	针对对象，先调用valueOf()，判断是否可以转成数值。不能则基于这个返回值再调用toString()，再测试返回值。

     ​	**此过程也是ES中内置函数和操作符的一般执行过程。**

   - 数值转换

     3个函数：Number()    parseInt()	parseFloat()

     **Number()**适用于任何数据类型

     剩下两个针对字符串

     Number()转换规则：

     - Boolean型，true转1，false转0
     - 数字值则简单传入和返回
     - null返回0
     - undefined返回NaN
     - 字符串遵循以下规则：
       - 若字符串只包含数字转成十进制数值
       - 有效的浮点格式转成对应的浮点数值
       - 若字符串中包含有效的十六进制，则转成相同大小的十进制数值
       - 空字符串转成0
       - 上述以外转成NaN
     - 对象，调用valueOf()，依照前面的规则转换返回的值，若转换结果是NaN，则调用对象的toString()方法，再次依照前面规则转换字符串值。

     ```javascript
     var num1 = Number("Hello world!"); //NaN
     var num2 = Number(""); //0
     var num3 = Number("000011"); //11
     var num4 = Number(true); //1
     ```

     一元加操作符的操作同Number()函数相同。

     **parseInt()**处理整数，它忽略字符串前面的空格，直至找到第一个非空字符串。如果第一个字符串不是数字字符或负号，parseInt()返回NaN。所以parseInt()转空字符串返回NaN（Number()对空字符串返回0）。

     若第一个字符是数字，继续解析第二个字符直至完毕或遇到非数字字符。

     比如"1234blue"转成1234，"22.5"转成22，因为小数点不是有效数字字符。

     parseInt()能识别出各种整数格式（十进制，八进制，十六进制）

     ES5中不具有解析八进制的能力，前导0无效，为消除此，

     parseInt()可设置第二个参数：转换时使用的基数（即多少进制）

     ```javascript
     var num1 = parseInt("0xAF", 16); //175
     var num2 = parseInt("AF",16);  //可省略0x
     var num3 = parseInt("10", 2);  //2二进制
     var num4 = parseInt("10", 8);  //8八进制
     var num5 = parseInt("10", 10); //10十进制
     var num6 = parseInt("10", 16); //16十六进制
     ```

     **parseFloat()**同理，

     ​	**区别1**：只有第一个小数点有效，之后的无效且后面字符串被忽略。"22.34.5"转换成22.34。

     ​	**区别2**：始终忽略前导0，十六进制始终转成0，parseFloat()只解析十进制，无第二个参数。

     ​	**区别3**：如果字符串包含数可解析为整数（无小数点或小数点后都是0），则parseFlo

     at()返回整数。

5. **String类型**

   用于表示0或多个16位Unicode字符组成的字符序列 ，即字符串。由双引号或单引号表示。ES中双引号单引号表示意义完全相同。

   - **字符字面量**

     也叫**转义序列**，用于表示非打印字符，或具有其他用途的字符。

     <u>\n 换行  \t 制表	\b 空格	\r 回车	\f 进纸	\\\ 斜杠 	\\' 单引号	\\" 双引号</u>

     <u>\xnn 以十六进制代码nn表示的一个字符(n为0-F)</u>

     <u>\unnnn 以十六进制nnnn表示的一个Unicode字符(n为0-F)</u>

     字符字面量可出现在字符串中任何位置，被作为一个字符来解析。

     通过length访问长度

   - **字符串特点**

     字符串不可变。字符串一旦创建则其值不能改变。

     要改变某个变量保存的字符串，首先要销毁原来的字符穿，再用另一个包含新值的字符串填充该变量。

     ```javascript
     var lang ="Java";
     lang = lang + "Script";
     //先创建一个能容纳10个字符的新字符串，然后在这个字符串中填充"Java"和"Script"，最后销毁原来的字符串"Java"和"Script"
     ```

   - **转换为字符串**

     两种方法：

     - **toString()**：返回相应值的字符串表现，数值，布尔，字符串，对象有此方法，undefined和null型没有。

       数值的toString()传递一个参数，即传递基数。

       ```javascript
       var num = 10;
       alert(num.toString(8)); //"12"，默认十进制
       ```

     - **String()**能转换任何类型

       如果值有toString()方法，调用toString()并返回相应结果。

       null和undefined值返回"null"和"undefined"

6. **Object类型**

   数据和功能的集合。对象通过new操作符跟要创建的对象类型的名称来创建。

   创建Object类型的实例并为其添加属性和方法，即可创建自定义对象。

   ```javascript
   var o = new Object();
   ```

   Object类型是所有它的实例的基础。

   Object的每个实例都具有下列属性和方法：

   - **constructor**：保存用于创建当前对象的函数
   - **hasOwnProperty(*propertyName*)**：用于检查给定属性是否存在于当前对象实例中。属性名以字符串形式输入。
   - **isPrototypeOf(*object*)**：检查传入对象是否是传入对象的原型
   - **propertyIsEnumerable(*propertyName*)**：检查给定属性是否可以使用for-in语句枚举
   - **toLocaleString()**：返回对象的字符串表示，该字符串与执行环境的地区对应。
   - **toString()**：返回对象的字符串表示。
   - **valueOf()**：返回对象的字符串，数值或布尔值表示。通常与toString()方法的返回值相同。

### 操作符

用于操作数据值，包括算数操作符，位操作符，关系操作符和相等操作符。

相应的操作符通常都会调用对象的valueOf()或toString()方法以获得可以操作的值。

1. **一元操作符**：只能操作一个值的操作符。++ --适用于整数，字符串，布尔值，浮点数值和对象。

   遵循规则：

   - 应用于有效数字字符的字符串时，先将其转成数字值，再加减1。字符串变量变数值变量
   - 不包含有效数字的字符串时，将变量值设为NaN。字符串变量变数值变量。
   - 浮点数值，加减1
   - false转成0，true转成1
   - 对象，先调用valueOf()取得可供操作的值。再应用以上规则，如果结果为NaN，则再调用toString()方法后，再应用以上规则。对象变量转数值变量。

   ```javascript
   var s1 = "2";
   var s2 = "z";
   var b = false;
   var f = 1.1;
   var o ={
       valueOf:function(){
           return -1;
       }
   };
   s1++; //3
   s2++; //NaN
   b++;  //1
   f--;  //0.10000000000000009
   o--;  //-2
   ```

   **一元加操作符**：正号以及同上操作

   **一元减操作符**：负号

2. **位操作符**

   ​	ES中所有数值以64位存储，但位操作符不直接操作64位的值。而是先将64位转成32位整数再执行操作，最后再转换回64位值。

   ​	对于有符号整数，（末位往前数）32位中前31位用于表示整数的值，最后一位（符号位）表示符号：0代表正数，1代表负数。

   **正数**以纯二进制格式存储，末位往前依次称为位0，位1....

   **负数**则以**二进制补码**格式存储，求法步骤：先对绝对值求二进制码---->转二进制反码,(0变1,1变0)---->二进制反码末位加1，(1+1=0,0+1=1)

   ​	ES中，64位数值转32位再转64位在后台进行。负效应：NaN和Infinity被当做0处理

   - ***按位非NOT***

     操作符 ~：取反码

   - ***按位与AND***

     操作符 &

   - ***按位或OR***

     操作符 |

   - ***按位异或XOR***

     操作符 ^ ：两个数值按位异或互不相同时才为1，其余为0

   - ***左移***：操作符<<，数值左移几位，则右用几位0补齐。

     ```javascript
     var oldValue = 2; //等于二进制的10
     var newValue = oldValue << 5; //等于二进制的1000000，十进制的64，-2左移则得到-64
     ```

   - ***有符号右移***：操作符>>，数值向右移动，但保留符号位，与左移相反

     ```javascript
     var oldValue = 64;//二进制的1000000
     var newValue = oldValue >> 5;//二进制的10，十进制的2
     ```

   - ***无符号右移***：操作符>>>

     正数与有符号右移相同，负数则先写出其二进制码，无符号右移会把二进制码当作正数的二进制码右移，空位补0

     ```javascript
     var oldValue = -64;//二进制1111111111111111000000
     var newValue = oldValue >>> 5; //等于十进制的134217726
     //右移结果0000011111111111111110；
     ```

3. **布尔操作符**

   - *逻辑非!*：false，空字符串，数值0，null，NaN，undefined返回true，其余false

   - *逻辑与*：&&，逻辑与操作不一定返回布尔值，遵循以下规则

     1. 若第一个操作数是对象，则返回第二个操作数
     2. 若第二个操作数是对象，则仅在第一个操作数求值结果为true的情况下才返回该对象
     3. 若两个操作数都是对象，则返回第二个操作数
     4. 若操作数为null，则返回null
     5. 若操作数为NaN，则返回NaN
     6. 若操作数为undefined，则返回undefined

     属于**短路操作**，如果第一个操作能决定结果就不再对第二个操作数求值

   - ***逻辑或 ||***：规则：

     1. 若第一个操作数是对象，则返回第一个操作数
     2. 若第一个操作数求职结果为false，则返回第二个操作数
     3. 若两个操作数都是对象，则返回第一个操作数
     4. 剩下同逻辑与

     也是短路操作符

4. **乘性操作符**

   - ***乘法*  \***

     1. 常规同数学，超出ES范围返回Infinity或-Infinity
     2. 如果有一个操作数为NaN，结果为NaN
     3. Infinity  * 0 = NaN;
     4. Infinity * 非0，结果为Infinity或-Infinity
     5. Infinity * Infinity = Infinity
     6. 如果有一个操作数不是数值，则在后台调用Number()先转换再使用以上规则。

   - ***除法*  /**

     规则1，2，6同乘法，

     Infinity / Infinity = NaN;

     0 / 0 = NaN;

     0 / 非0有限数，结果为Inifinity 或 -Infinity

   - ***求模（取余） %***

     有限大 ％ 无穷大，则结果是NaN

     0  % 有限大，则结果是NaN

     Infinity % Infinity,结果为NaN

     无穷大 % 有限大，结果为有限大

     值 % 0，结果为0

     如果有一个操作符不是数值，后台调用Number()转换后再使用以上规则

5. **加性操作符**

   - ***加法 +***，规则如下：

     1. 如果有一个操作数为NaN，则结果是NaN
     2. Infinity + Infinity = Infinity
     3. -Infinity + -Infinity = -Infinity
     4. Infinity + -Infinity = NaN
     5. +0 + +0 = +0
     6. -0 + -0 = -0
     7. +0 + -0 =+0

     如果有一个操作数是字符串，应用以下规则：

     - 如果两个都是字符串则直接拼接
     - 如果其中一个不是则将其转换成字符串（后台完成），再进行拼接

     如果有一个操作数是对象、数值或布尔值，调用toString()获得相应字符串，再应用字符串规则。

     undefined与null调用String()成字符串"undefined"，"null"

   - ***减法 -***，规则如下：

     1. 若一个操作数是NaN，则结果是NaN
     2. Infinity - Infinity = NaN
     3. -Infinity -  -Infinity = NaN
     4. Infinity - -Infinity = Infinity
     5. -Infinity - Infinity = -Infinity
     6. +0 - +0 = +0
     7. +0 - -0 = -0
     8. -0 - -0 = +0
     9. 如果有一个操作数是字符串、布尔值、null或者undefined，则后台调用Number(),再进行操作
     10. 如果有操作数是对象 ，则调用对象的valueOf()方法取得表示该对象的数值，如果对象没有valueOf()调用toString()

     ```javascript
     var result1 = 5 - true; //4
     var result2 = NaN - 1;  //NaN
     var result3 = 5 - 3;    //2
     var result4 = 5 - "";   //5
     var result5 = 5 - "2";  //3
     var result6 = 5 - null; //5
     ```

6. 关系操作符

   < > <= >=

   规则：

   - 若两个操作数都是数值，则执行数值比较

   - 若两个操作数都是字符串，则比较对应字符编码值

   - 若一个操作数是数值，则将另一个转换成数值再比较

   - 若一个操作数是对象 ，则调用valueOf()（没有则使用toString()）再比较

   - 若一个操作数是布尔值先转换成数值再比较

   - 任何操作数与NaN进行关系比较结果都是false

     ```javascript
     var result = "23" < "3"; //true,"2"的字符编码为50，"3"的字符编码为51
     var result = "23" < 3;  //false，"23"转换成23
     var result = "a" < 3; //NaN,"a"转换成NaN
     ```

7. 相等操作符

   相等和不相等== !=  ——先转换再比较

   规则：

   - null undefined相等
   - 比较相等性之前，不能将null undefined转换成其他值
   - 如果有一个操作数是NaN（包括两个都是NaN），则相等操作符返回false，不相等操作符返回true
   - 如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个都指向同一个对象返回true，否则返回false

   全等和不全等=== !== —— 仅比较不转换  数值和类型都进行比较

8. 条件操作符

   variable = (condition) ? value1 : value2;

9. 赋值操作符

   = *= /= %= += -= <<=  >>=（有符号右移）  >>>=（无符号右移）

10. 逗号操作符：使再一条语句中执行多个操作，还可用于赋值，返回表达式最后一项。

    ```javascript
    var num = (5, 1, 4, 8, 0); //num值为0
    ```

### 语句

1. if语句

   ```javascript
   if (condition1){
       statement1;
   }else if(condition2){
       statement2;
   }else{
       statement3;
   }
   ```

2. do-while语句

   ```javascript
   do{
       statement; //循环体至少执行一次
   }while(expression);
   ```

3. while语句

   ```javascript
   while(expression){
       statement;
   }
   ```

4. for语句

   ```javascript
   for (initialization; expression; post-loop-expression){
       statement;
   }
   ```

5. for-in语句

   迭代语句，用来枚举对象的属性。

   ```javascript
   for (property in expression){
       statement;
   }
   ```

6. label语句

   用以在代码中添加标签

   ```javascript
   label:statement;
   //举例
   start: for(var i = 0; i < count; i++){
       alert(i);  //将来由break或continue引用
   }
   ```

7. break和continue语句

   break跳出循环体，continue跳出当前循环

   ```javascript
   //结合label
   var num = 0;
   outermost:
   for (var i = 0; i < 10; i++)
       for(var j = 0; j < 10; j++){
           if(i == 5 && j ==5){
               break outermost; //跳出两个for循环，改成continue则只跳出内层循环
           }
           num++;
       }
   alert(num);//55（内层完整循环5（j索引为01234）次为50，加上外层循环5次） 
   //continue则95,j=5时缺少i=5控制的一次完整循环（减少了5次）
   ```

8. with语句

   作用：将代码的作用域设置到一个特定的对象中。

   目的：简化多次编写同一个对象的工作。

   ```javascript
   with (expression) statement;
   //举例
   var qs = location.search.substring(1);
   var hostName = location.hostname;
   var url = location.href;
   //使用with语句
   with(location){
       var qs = search.substring(1);  //location.省略
       var hostName = hostname;
       var url = href;
   }
   ```

   严格模式下不能使用with语句

9. switch语句

   ES中自己的特色：switch语句可以使用任何数据类型，比较值使用全等操作符。

   ```javascript
   switch (expression){
       case value: statement; break;
       case value: statement; break;
       default: statement;
   }
   //合并两种情形不要忘了注释
   switch (i){
       case 25://合并
       case 35:
           alert("25 or 35");break;
       case 45:
           alert("45");break;
       default:
           alert("Other");
   }
   ```

### 函数

```javascript
function functionName(arg0, arg1, arg2...){
    statements;
}
```

不需要指定返回值，但任何函数都可以通过return实现返回值，位于return后的语句不会执行。

不带返回语句的return在函数停止后返回undefined; 

- 理解参数

  ES与其他语言的不同：ES不介意传递参数的个数（可为0或多个）以及类型，arguments对象与数组类似但非数组的实例；可使用下标索引参数，比如arguements[0]，用length访问参数个数

- 没有重载

  ES中如果定义了同名函数，则名字属于后一个函数。