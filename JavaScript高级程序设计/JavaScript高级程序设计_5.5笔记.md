# JavaScript高级程序设计（第三版）

## 5.5   Function类型

​	ES中，**函数实际上是对象。每个函数都是Function类型的实例。**与其他引用类型一样具有属性和方法。函数名实际上是一个指向函数对象的指针，不会与某个函数绑定。

```javascript
//通常使用函数声明语法定义：
function sum(num1, num2){
    return num1 + num2;
}
//使用函数表达式定义函数,没必要使用函数名，通过变量名引用函数。
var sum = function(num1, num2){
    return num1 + num2;
};//函数末尾有分号，与声明其他变量一样
//使用Function构造函数，可接收任意数量的参数，最后一个参数始终被看作函数体。
var sum = new Function("num1", "num2", "return num1 + num2");//不推荐
```

函数是对象，函数名是指针，所以一个函数可能会有多个名字。

```javascript
function sum(num1, num2){
    return num1 + num2;
}
alert(sum(10, 10));	//20

var anotherSum = sum;//使anotherSum指向sum指向的函数
alert(anotherSum(10,10));	//20

sum = null;
alert(anotherSum(10,10));	//20 
```

**5.5.1 没有重载**

同名函数，后面的覆盖前面的

**5.5.2  函数声明与函数表达式**

​	解析器率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；

对于函数表达式，必须等到解析器执行到它所在的代码行，才会真正被解释执行。

```javascript
alert(sum(10,10));
function sum(num1, num2){
    return num1 + num2;
}
//可正常运行，因为解析器已通过函数声明提升的过程，（JS引擎在第一遍会声明函数并将它放到源代码顶部）
//使用函数表达式报错 unexpected identifier意外标识符
alert(sum(10,10));
var sum = function(num1, num2){
    return num1 + num2;
};//错误原因，初始化语句，变量在执行到函数所在语句之前，不会保存有对函数的引用
```

以上为函数声明与函数表达式的区别，除此外，它们语法等价

同时使用函数声明与函数表达式

```javascript
var sum = function sum(){}
```

**5.5.3 作为值的函数**

​	ES中函数名本身就是变量，所以函数也可作为值来使用。

即可将函数作为另一个函数的结果返回

```javascript
function callSomeFunction(someFunction, someArguement){
    return someFunction(someArguement);
}
//例子
function add10(num){
    return num + 10;
}
var result1 = callSomeFunction(add10, 10);	//调用return add10(10)
alert(result1);	//20    

function getGreeting(name){
    return "Hello, " + name;
}
var result2 = callSomeFunction(getGreeting, "Niklaus");//调用getGreeting("Niklaus") 
alert(result2);	//"Hello, Niklaus"
```

```javascript
//根据对象属性对数组进行排序
function createComparisonFunction(propertyName){
    return function(object1, object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2){
            return -1;
        }else if(value1 > value2){
            return 1;
        }else{
            return 0;
        }
    };
}

var data = [{"name":"Zachary",age :28},{"name": "klaus", age:29}];
data.sort(createComparisonFunction("name"));
alert(data[0].name);	//klaus
data.sort(createComparisonFunction("age"));
alert(data[0].name);	//Zachary
//升序排
```

**5.5.4 函数内部属性**

​	函数内部两个属性：**arguments**和**this**

***arguments* 是一个类数组对象，包含传入函数中的所有参数。**

此对象还有一个名叫callee的属性，该属性是一个指针，指向拥有此arguments对象的函数

```javascript
function factorial(num){
    if(num <= 1){
        return 1;
    }else{
        return num * factorial(num-1); //函数执行与函数名factorial耦合在一起
    }
}
//为解决耦合现象，使用arguments.callee属性，保证递归正常调用
function factorial(num){
    if (num <= 1){
        return 1;
    }else{
        return num * arguments.callee(num-1);
    }
}

var trueFactorial = factorial; //指针问题
factorial = function(){
    return 0;
};
alert(trueFactorial(5));	//120
alert(factorial(5));	//0
```

***this*，引用的是函数据以执行的环境对象。**

当在网页的全局作用域中带哦用函数时，this对象引用window

```javascript
window.color = "red";
var o = {color: "blue"};

function sayColor(){
    alert(this.color);
}

sayColor();	//"red"

o.sayColor = sayColor;
o.sayColor();	//"blue"
```

this可能在代码执行过程中引用不同的对象

ES5的规定了caller属性

***caller* 保存着调用当前函数的函数的引用，若在全局中调用当前函数，它的值为null。**

```javascript
function outer(){
    inner();	//outer(调用inner()
}
function inner(){
    alert(inner.caller);	//所以inner.caller指向outer()
}
//为实现更松散的耦合，可通过arguments.callee.caller来访问相同的信息，严格模式下不行属性为属性为undefined，严格模式下也不能为函数的caller属性赋值
outer();
//以上导致警告框中显示outer()函数的源代码
```

**5.5.5 函数属性和方法**

**length ：接收命名参数的个数**

**prototype：保存实例方法，ES5中，prototype不可枚举，for-in无法发现**

```javascript
function sayName(name){
	alert(name);
}
function sum(num1, num2){
    return num1 + num2;
}
function sayHi(){
    alert("hi");
}
alert(sayName.length);	//1
alert(sum.length);		//2
alert(sayHi.length);	//0
```

方法：

***apply(*)：两个参数，运行函数的作用域，参数数组（可以是Array实例，也可以是arguments对象那）**

***call()***

都在特定的作用域中调用函数，等于设置函数体内this对象的值

作用相同，接收参数方式不同，对于call()而言，传递参数必须逐个列举出来

```javascript
function sum(num1, num2){
    return num1 + num2;
}
function callSum1(num1, num2){
    return sum.apply(this, arguments);	//传入arguments对象，this为window对象
}
function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]);	//传入数组
}
alert(callSum1(10,10));	//20
alert(callsum2(10,10));	//20
//严格模式下，未指定环境调用函数，则this值不会转型为window。除非明确把函数添加到某个对象或调用apply()或call()，否则this值为undefined
```

```javascript
function sum(num1, num2){
    return num1 + num2;
}
function callSum(num1, num2){
    return sum.call(this, num1, num2);
}
alert(callSum(10,10,));	//20
```

call()和apply()选谁取决于参数，无参数则都可。

**它们强大的地方在于扩充函数运行作用域**

好处：对象不需要与方法有任何耦合关系。

```javascript
window.color = "red";
var o = {color: "blue"};
function sayColor(){
    alert(this.color);
}
sayColor();	//red
sayColor.call(this);	//red		
sayColor.call(window);	//red	
sayColor.call(o);		//blue
```

***bind()*：创建函数实例，其this值都会被绑定到传给bind()函数的值**

```javascript
window.color = "red";
var o = {color:"blue"};
function sayColor(){
    alert(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor();	//blue
```

每个函数继承的toLocaleString()，toString()，valueOf()方法始终都返回函数的代码。