# JavaScript高级程序设计（第三版）

## 第7章 函数表达式

**代码环境 jsshell**

```javascript
//定义函数的方式有两种
//1.函数声明
function functionName(arg0,arg1,arg2){
	//statement;
}
print("6:",functionName.name);
//函数声明提升：在执行代码之前先读取函数声明
sayHi();
function sayHi(){
	print("10:","hello");
}
//2.函数表达式 匿名函数 function后面没有标识符
var functionName = function(arg0,arg1,arg2){
	//statement
};
//函数表达式必须先赋值，再使用
// sayHello();//sayHello()尚未定义
// var sayHello = function(){
// 	print("17:""hello");
// }

//函数表达式的应用
var sayHello;
if(0){
	sayHello = function(){
		print("24:if");
	};
}else{
	sayHello = function(){
		print("28:else")
	}
}
sayHello();

//匿名函数的使用
function createComparisionFunction(propertyName){
	return function(object1,object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];
		if(value1<value2){
			return -1;
		}else if(value1>value2){
			return 1;
		}else{
			return 0;
		}
	};
}
var data = [
{name:"Zack",age:28},
{name:"Jane",age:30}
];
data.sort(createComparisionFunction("name"));
print("54:",data[0].name);
data.sort(createComparisionFunction("age"));
print("56:",data[0].name);

//7.1 递归
//函数通过名字调用自身
// function factorial(num){
// 	if(num<=1){
// 		return 1;
// 	}else{
// 		return num * factorial(num-1);
// 	}
// }
// var anotherFactorial = factorial;
// factorial = null; //factorial已经被置空，不再是函数
// print(anotherFactorial(4));

//修改
function factorial(num){
	if(num<=1){
		return 1;
	}else{
		return num*arguments.callee(num-1);
	}
}
print("79:n!",factorial(4));
//严格模式下使用以下方法访问自身
var fac = (function f(num){
	if (num<= 1){
		return 1;
	}else{
		return num* f(num -1);
	}
});
print("callself:",fac(3));

var fac = (function f(num){
	if(num<=1){
		return 1;
	}else{
		return num*f(num-1);
	}
});
print("89 callself:",fac(4));
var anotherFactorial = fac;
fac = null;
print("100 callself:",anotherFactorial(5));
//7.2 闭包
//闭包指有权访问另一个函数作用域中变量的函数
//当函数被调用时，会创建一个执行环境及相应的作用域链。
//然后使用参数初始化函数的活动对象
//只有当内部函数被销毁，外部函数活动对象才会被销毁
//7.2.1 闭包与变量
//遍历 都是10
function createFunctions(){
	var result = new Array();
	for (var i=0;i<10;i++){
		result[i] = function(){
			return i;
		};
	}
	return result;
}
//0到10
function createFunctions(){
	var result = new Array();
	for(var i=0; i<10; i++){
		result[i] = function(num){
			return function(){ //立即返回i
				return num;
			};
		}(i);
	}
	return result;
}
//print(createFunctions()());
//7.2.2 this對象
//匿名函数执行环境具有全局性，内部函数搜索变量时搜索到其活动对像为止
var name = "the window";
var object = {
	name:"my object",
	getNameFunc:function(){
		return function(){
			return this.name;
		};
	}
};
print("141:",object.getNameFunc()());
//闭包中如何访问作用域内的对象
var name = "the window";
var object = {
	name:"myObject",
	getName:function(){
		var that = this; //
		return function(){
			return that.name;
		};
	}
};
print("153:",object.getName()()); //myObject
print("154:",(object.getName)());	//myobject
print("155:",(object.getName = object.getName)()); //the window

//7.2.3 内存泄漏
//IE中，如果闭包作用域链保存了HTML元素，则该元素无法被销毁，通过设置为null释放内存
function assignHandler(){
	var element = document.getElementById("someElement");
	element.onclick = function(){
		print(element.id);
	};
}
//7.3 模仿块级作用域
function outputNumbers(count){
	for(var i=0; i<count; i++){
		print(i);
	}
	print(i); //c语言中for循环被销毁，js无块级作用域
}
//匿名函数可用来模仿块级作用域，又叫私有作用域
(function(){
	//块级作用域
})();
var someFunction = function(){
	//这里是块级作用域
};
someFunction();
var count=5;
function outputNumbers(count){
	(function(){
		for(var i=0; i<count; i++){
			print(i);
		}
	})(); //私有作用域，使用完立即被销毁。原理：匿名函数中定义的任何变量都会在函数执行完销毁
	print(i); //导致错误
}
//1月1日发送新年祝福
(function(){
	var now = new Date();
	if(now.getMonth() == 0 && now.getDate() == 1){
		print("Happy new year!");
	}else{
		print("now:",now);
	}
})();
//7.4 私有变量
//任何函数中定义的变量都可以被认为是私有变量，因为函数外不可访问
function add(num1,num2){
	var sum = num1 + num2;
	return sum;
}
print("204,sum:",add(1,2));
//通过闭包创造访问私有变量的公有方法，又称特权方法
function MyObject(){
	//私有变量和私有函数
	var privateVariable = 10;

	function privateFunction(){
		return false;
	}
	//特权方法
	this.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	};
}
//利用私有和特权成员，可隐藏不应该直接被修改的数据
function Person(name){
	
	this.getName = function(){
		return name;
	};
	this.setName = function(value){
		name = value;
	};
}
var person = new Person("Nicholas");
print("229:",person.getName()); //"Nicholas"
person.setName("Greg");
print("231:",person.getName());	//"Greg"

//7.4.1 静态私有变量
//私有作用域中定义私有变量和函数
(function(){
	//私有变量和私有函数
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}
	//构造函数
	myObject = function(){
	};
	//公有/特权方法
	myObject.prototype.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	};
})();
print("251:",myObject.prototype.publicMethod());
//作为闭包，保存着包含作用域的引用
(function(){
	var name="";
	Person = function(value){
		name = value;
	};
	Person.prototype.getName = function(){
		return name;
	};
	Person.prototype.setName = function(value){
		name = value;
	};
})();
var person1 = new Person("Nic");
print("266:",person1.getName());
person1.setName("Greg");
print("268:",person1.getName());

var person2 = new Person("Michael");
print("271",person1.getName());
print("272",person2.getName());

//7.4.2 模块模式 
//针对单例创建私有变量和特权方法，单例指只有一个实例的对象
// var singleton = {
// 	name:"value",
// 	method:function(){
// 		//方法代码
// 	}
// };
//例子
var singleton = function(){
	//私有变量和私有函数
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}
	//特权/公有方法,单例的公共接口
	return {
		publicProperty:true,
		publicMethod:function(){
			privateVariable++;
			return privateFunction();
		}
	};
}();
print("298:",singleton.publicMethod());
//对单例 初始化又维护其私有变量
var application = function(){
	//私有变量和函数
	var components = new Array();
	//初始化
	components.push(new BaseComponent);
	//公共
	return {
		getComponentCount:function(){
			return components.length;
		},
		registerComponent:function(component){
			if(typeof component == "object"){
				components.push(component);
				return components[0];
			}
		}
	};
}();
//必须创建一个对象病并以某些数据对其初始化，同时还需要公开一些数据访问私有数据方法时适用
// print("317:",application.getComponentCount());
// print("318:",application.registerComponent(null));
// print("319:",application.getComponentCount());

//7.4.3 增强的模块对象
//在返回对象之前加入对其增强的代码
var single = function(){
	//私有变量和私有函数
	var privateVariable = 10;
	function privateFucntion(){
		return false;
	}
	//创建对象
	var object = new CustomType();
	//添加特权/公有属性和方法
	object.publicProperty = true;

	object.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	};
	//返回对象
	return object;
}();
//
var application = function(){
	//私有变量和函数
	var components = new Array();
	//初始化
	components.push(new BaseComponent());
	//创建application的一个局部对象
	var app = new BaseComponent();//
	//公共接口
	app.getComponentCount = function(){
		return components.length;
	};
	app.registerComponent = function(component){
		if (typeof component == "object"){
			components.push(component)
		}
	};
	//返回副本
	return app; //让application成为BaseComponnet的实例
}();
```

