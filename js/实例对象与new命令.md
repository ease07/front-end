## 实例对象与new命令

运行环境：node.js

**1.构造函数**

```javascript
var Vehicle = function(){
    this.price = 1000;
};
```

**构造函数特点：**

- 内部`this`关键字
- 生成对象时`new`关键字

**2.new命令**

作用：执行构造函数，返回一个实例对象

``` javascript
const {log} = console;

var Vehicle = function(){
	this.price = 1000;
};
var v = new Vehicle();
log(v);	//Vehicle { price: 1000 }

//如果不使用new命令 this绑定到window对象 
var ve = Vehicle();
log(ve);	//undefined
log(price);	//1000
```

注：严格模式下`this`不能指向全局对象，默认undefined,JS不能对`undefined`设置对象

**new命令原理**

1. 创建一个空对象
2. 将这个空对象的原型，指向构造函数的`prototype`属性
3. 将这个空对象赋值给函数内部`this`关键字
4. 执行构造函数代码

如果构造函数有`return`语句返回新对象，则返回这个新对象，

`return`非对象则返回`this`对象,

如果普通函数内部无`this`关键字，返回空对象

**`new`命令简化过程**

```javascript
//创建构造函数
function Person(name,age){
	this.name = name;
	this.age = age;
}

//new 命令简化流程
function _new(constructor,params){
	//将arguments对象转成数组
	var args = [].slice.call(arguments);
	//取出构造函数
	var constructor = args.shift();
	//创建一个空对象，继承构造函数的prototype属性
	var context = Object.create(constructor.prototype);
	//执行构造函数
	var result = constructor.apply(context, args);
	//如果返回结果是对象，则直接返回，否则context对象
	return (typeof result === 'object' && result != null)?result:context;
}

var actor = _new(Person,'张三',28);

log(actor);
```

`new.target`

函数内部使用`new.target`指向当前函数，否则为`undefined`

```javascript
function f(){
	log(new.target);
}
f();	//undefined
new f();	//[Function: f]
```

可判断函数调用时是否使用new命令

```javascript
function f(){
	if(!new.target){
		throw new Error('请使用new命令调用！');
	}
	//...
}
f();	//Error: 请使用new命令调用！
```

**`Object.create()`创建实例对象**

> 拿不到构造函数时，使用现有对象生成实例对象

```javascript
var person1 = {
	name:"张三",
	age:38,
	greeting:function(){
		log('Hi,I\'m '+this.name+'.');
	}
};
var person2 = Object.create(person1);
log(person2.name);	//张三
person2.greeting();	//Hi,I'm 张三.
```