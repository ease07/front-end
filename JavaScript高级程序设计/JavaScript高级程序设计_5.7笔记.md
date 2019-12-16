JavaScript高级程序设计（第三版）

## 5.7  单体内置对象

​	ECMA-262对内置对象的定义：由ES实现提供的，不依赖宿主环境的对象，这些对象在ES程序执行之前已经存在。

Object，Array，String

**5.7.1 Global对象**

不属于任何其他对象的属性和方法最终都是他的属性和方法。

事实上，没有全局变量或全局函数，所有在全局作用域中定义的属性和函数，都是Global对象的属性。

包含的其他一些方法：

1. URI编码方法（Uniform Resource Identifiers，通用资源标识符）

   encodeURI()：作用于整个URI，不会对本身属于URI中的特殊字符进行编码，比如冒号，正斜杠，问号，井号

   encodeURIComponent()：作用于URI中的某一段，对其发现的任何非标准字符进行编码

   可对URI进行编码以发送给浏览器

   对应的解码方法：

   decodeURI()

   decodeURIComponent()

   **URI方法可编码 所有Unicode字符**

2. eval()方法

   将传入的参数当作实际的ES语句来解析，然后把结果插入到原位置。

   通过eval()执行的代码被认为是包含该次调用的执行环境的一部分，因此被执行的代码具有与该执行环境相同的作用域链。

   **严格模式下，访问不到eval()创建的任何变量或函数，且不能赋值**

3. Global对象属性

   特殊值：undefined，NaN，Infinity

   构造函数：Object，Array，Function，Boolean，String，Number，Date，RegExp，Error，EvalError，RangeError,

   ​					ReferenceError，SyntaxError，TypeError，URIError

4. window对象

   全局作用域中声明的所有变量和函数，都成为了window对象的属性

   另一种取得Global对象的方法

   ```javascript
   var global = function(){
       return this;
   }();
   ```

**5.7.2 Math对象**

1. 属性

| 属性         | 说明                        |
| ------------ | --------------------------- |
| Math.E       | 自然对数的底数，即常量e的值 |
| Math.LN10    | 10的自然对数                |
| Math.LN2     | 2的自然对数                 |
| Math.LOG2E   | 以2为底e的对数              |
| Math.LOG10E  | 以10为底e的对数             |
| Math.PI      | π                           |
| Math.SQRT1_2 | 2的平方根的倒数             |
| Math.SQRT2   | 2的平方根                   |

2. min()，max()方法

   确定一组数值中的最大值与最小值，可接受任意多个数值参数。

   ```javascript
   var values = [1,2,3,4,5,6,7,8,9,10];
   var max = Math.max.apply(Math, values);
   //找到数组中的最大或最小值使用apply()，在特定作用域设置this值
   ```

3. 舍入方法

   将小数值舍入为整数

   - Math.ceil()：向上舍入
   - Math.floor()：向下舍入
   - Math.round()：标准舍入

4. random()方法

   Math.random()返回一个介于(0,1)之间的随机数

   值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)

   ```javascript
   //1到10 要10个数
   var num = Math.floor(Math.random() * 10 + 1);
   //2到10 要9个数
   var num = Math.floor(Math.random() * 9 + 2);
   ```

   多数情况下，可通过一个函数来计算可能值的总数和第一个可能的值

   ```javascript
   function selectFrom(lowerValue, upperValue){
       var choices = upperValue - lowerValue +1;
       return Math.floor(Math.random() * choices + lowerValue);
   }
   var num = selectFrom(2, 10);
   alert(num);	//介于2到10之间的一个数值
   ```

5. 其他方法

   都有返回值

| 方法                | 说明            |
| ------------------- | --------------- |
| Math.abs(num)       | 绝对值          |
| Math.exp(num)       | Math.E的num次幂 |
| Math.log(numj)      | num的自然对数   |
| Math.pow(num,power) | num的power次幂  |
| Math.aqrt(num)      | num的平方根     |
| Math.acos(x)        | x的反余弦值     |
| Math.asin(x)        | x的反正弦值     |
| Math.atan(x)        | x的反正切值     |
| Math.atan2(y,x)     | y/x的反正切值   |
| Math.cos(x)         | x的余弦值       |
| Math.sin(x)         | x的正弦值       |
| Math.tan(x)         | x的正切值       |

