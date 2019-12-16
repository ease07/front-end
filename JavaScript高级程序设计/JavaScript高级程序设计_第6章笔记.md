# JavaScript高级程序设计（第三版）

## 第6章  面向对象程序设计

这一章笔记比较特别，边看书边敲的代码，也直接敲出了笔记。看了两遍书。继承方式和C++还是不太一样。

核心就在于 **构造函数，原型和实例的关系:**
	每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针

![](G:\笔记\JavaScript高级程序设计\6.1.png)

![6.2](G:\笔记\JavaScript高级程序设计\6.2.png)

![6.3](G:\笔记\JavaScript高级程序设计\6.3.png)

![6.4](G:\笔记\JavaScript高级程序设计\6.4.png)

![6.5](G:\笔记\JavaScript高级程序设计\6.5.png)

![6.6](G:\笔记\JavaScript高级程序设计\6.6.png)

![6.7](G:\笔记\JavaScript高级程序设计\6.7.png)

![6.8](G:\笔记\JavaScript高级程序设计\6.8.png)

![6.9](G:\笔记\JavaScript高级程序设计\6.9.png)

```javascript
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>面向对象</title>
</head>
<body>
	<script type="text/javascript">
		//创建Object实例,添加属性方法
		var person = new Object();
		person.name = "Nicholas";
		person.age = 29;
		person.job = "Software Engineer";
		person.sayName = function(){
			console.log(this.name);
		};
		console.log("1.Object实例创建对象 ");
		person.sayName();
		
		//字面量方法创建属性
		var person={
			name:"Nicholas",
			age:29,
			job:"Software Engineer",
			sayJob: function(){
				console.log(this.job);
			}
		};
		console.log("2.对象字面量创建对象");
		person.sayJob();
		console.log(person);

		//访问四个特性configurable,writable,enumerable,value
		//修改属性的特性值：Object.defineProperty(object,property,{设置四个特性})
		console.log("\n6.1.2 属性类型\n数值属性与访问器属性，attribute与property");
		var person = {};
		Object.defineProperty(person,"name",{
			configurable:false,
			writable:true,
			value:"Nicholas"
		});
		console.log("修改数值属性默认特性Object.defineProperty(object,property,descriptor)\n" + person.name + '\n');//Nicholas
		person.name = "Greg";
		console.log(person);
		console.log("writable=true，name被修改 " + person.name);
		//configurable设置为false后，不可再配置true
		Object.defineProperty(person,"name",{
			//configurable:true, 不可设置会出错
			writable:false,
			value: "Nicholas"
		});

		//访问器属性configurable,enumerable,get,set
		//get,set默认为undefined
		var book={
			_year:2004,
			edition:1
		};
		console.log("属性名以下划线开头表明只能通过对象方法访问其值");
		//console.log("访问器属性不能直接定义，通过Object.defineProperty()");
		Object.defineProperty(book,"year",{
			get:function(){
				return this._year;
			},
			set:function(newValue){
				if (newValue>2004){
					this._year = newValue;
					this.edition += newValue - 2004;
				}
			}
		});
		book.year = 2005;
		console.log("书的版本：" + book.year);
		
		console.log("//ES5前使用__defineGetter__()与__defineSetter__()创建访问器属性")
		/*book.__defineGetter__("year",function(){
			return this.year;
		});
		book.__defineSetter__("year",function(newValue){
			if(newValue > 2004){
				this._year = newValue;
				this.edition += newValue - 2004;
			}
		});
		book.year = 2006;
		console.log("书版本：" + book.edition);*/
		
		//定义多个属性
		var book={};
		Object.defineProperties(book,{
			_year:{value:2004},
			edition:{value:1},
			year:{
				get:function(){
					return this._year;
				},
				set:function(newValue){
					if(newValue>2004){
						this._year = newValue;
						this.edition += newValue -2004;
					}
				}
			}
		});
		console.log("Object.defineProperties()添加多个属性："+book.year)
		console.log("\n6.1.3 读取属性特性\nObject.getOwnPropertyDescriptor(object,property)\nobject.descriptor");
		var descriptor = Object.getOwnPropertyDescriptor(book,"_year");
		console.log("访问value: " + descriptor.value);
		console.log("访问configurable: " + descriptor.configurable);
		console.log("访问get: " + (typeof descriptor.get));
		console.log(person,book);

		console.log("\n6.2 创建对象");
		console.log("6.2.1 工厂模式");
		console.log("Object构造函数，对象字面量会使用同一接口创建多个对象，会产生大量重复代码");
		console.log("用函数封装用特定接口创建对象的细节");
		
		function createPerson(name, age, job){
			var o = new Object();
			o.name = name;
			o.age = age;
			o.job = job;
			o.sayName = function(){
				alert(this.name);
			};
			return o;
		}
		var person1 = createPerson("Nicholas", 29, "Software Engineer");
		var person2 = createPerson("Greg", 27, "Doctor");
		console.log(person1,person2);

		console.log("\n6.2.2 构造函数模式");
		/*自定义构造函数*/
		function Person(name, age, job){
			this.name = name;
			this.age = age;
			this.job =job;
			this.sayName = function(){
				console.log(this.name);
			}
		}
		var person1 = new Person("Nicholas", 29, "Software Engineer");
		var person2 = new Person("Niklaus", 1000, "Hybrid");
		console.log("工厂模式&自定义构造函数模式的区别："); 
		
		console.log("自定义构造函数：\n1.没有显式的创建对象，即Object构造函数\n2.直接将属性和方法赋给this对象\n3.没有return语句\n4.是全局对象");
		
		console.log("\n自定义构造函数经历4个步骤：\n1.创建一个新对象\n2.将函数作用域赋给新对象\n3.执行构造函数中的代码，即为对象添加属性\n4.返回新对象")
		
		console.log("自定义构造函数实例constructor指向其构造函数名,同时也是Object实例，因为所有对象均继承自Object");
		
		console.log("\n1.将构造函数当作函数\n任何函数，只要通过new操作符调用，就可作为构造函数\n不使用new则函数属性方法添加给window对象\n也可使用call()和apply()在某个特殊对象的作用域中调用此函数");
		var o = new Object();
		Person.call(o, "Caroline", 18, "Vampire");
		//console.log("call()方法"); o.sayName();
		console.log("构造函数缺点：\n1.每个方法都要在每个实例上重新创建一遍\n2.每定义一个函数就是实例化了一个对象，每个实例都包含一个不同的Function实例");
		console.log(person1.name == person2.name); //false
		
		/*自定义构造函数等价以下方法创建方式*/
		function Persons(name, age, job){
			this.name = name;
			this.age = age;
			this.job = job;
			this.sayAge = new Function("console.log(this.age)");
		}
		var person3 = new Persons("Bob", 21, "painter");
		person3.sayAge();

		console.log("\n解决，完成同样功能的Function实例可将函数定义放到函数外部，内部只需要引用函数名");
		function Person(name, age, job){
			this.name = name;
			this.age = age;
			this.job = job;
			this.sayJob = sayJob;
		}
		function sayJob(){
			alert(this.name);
		}//缺失了封装性，需要多个方法则需要多个全局函数
		
		console.log("6.2.3 原型模式\n每个函数都有一个prototype属性，此属性是一个指针，指向一个对象。\n此对象包含了可由特定类型的所有实例共享的属性和方法，\n即prototyoe是通过构造函数方式而创建的对象实例的原型对象\n让所有对象实例共享其属性及方法，\n换言之，构造函数方式到原型模式，即构造函数为空函数，通过为其原型添加属性和方法而使得通过此构造函数创建的对象都继承其原型的属性方法");
		function Person(){
		}
		Person.prototype.name = "Nicholas";
		Person.prototype.age = 20;
		Person.prototype.job = "Software Engineer";
		Person.prototype.sayName = function(){
			console.log(this.name);
		}
		var person1 = new Person();
		var person2 = new Person();
		person1.sayName();
		person2.sayName();
		console.log(person1.sayName == person2.sayName);//true构造函数模式下为false
		console.log("\n1.理解原型对象\n只要创建了新函数，就会为其创建一个prototype属性，该属性指向函数的原型对象。\n默认情况下，所有原型对象都获得constructor属性，此属性包含指向函数原型所在函数de指针\n创建自定义构造函数后，原型对象取自constructor，其他取自Object");
		console.log(person1,person2);
		console.log("连接存在于实例与构造函数的原型对象之间，而非实例与构造函数");
		console.log("无法访问[[prototype]]，但是可通过isPrototypeOf()测试原型");
		console.log(Person.prototype.isPrototypeOf(person1));//true
		console.log("Object.getPrototypeOf()返回[[prototype值]]");
		console.log(Object.getPrototypeOf(person2) == Person.prototype);//true
		//获取原型对象属性值
		console.log(Object.getPrototypeOf(person2).name);
		//不能通过修改实例修改原型的属性值，根据搜索理解，可用delete删除实例属性
		person1.name = "Greg";
		console.log(person1.name);//Greg
		console.log(person2.name)//Nicholas
		console.log("hasOwnProperty()检测一个属性是否存在于对象实例中");
		console.log(person1.hasOwnProperty("name"));//true
		console.log(person2.hasOwnProperty("name"));//false
		console.log("2.原型与in操作符\n测试对象是否能访问给定属性，结合hasOwnProperty可判断属性在实例还是原型中");
		console.log("name" in person2);//true
		function hasPrototypeProperty(object, name){
			return !object.hasOwnProperty(name) && (name in object);//对象没有自己的属性 以及 可访问指定属性
		}//是原型属性返回true不是返回false
		console.log(hasPrototypeProperty(person1,"name"));//false
		console.log("默认不可枚举属性及方法：\nhasOwnProperty(),propertyIsEnumerable(),toLocaleString(),toString(),valueOf(),constructor,prototype\nES5中可通过Object.keys()获得对象中所有可枚举的属性(不包含继承的原型属性)，接收对象作为参数，返回一个字符串数组");
		console.log("要获取所有属性通过Object.getOwnPropertyNames()");
		console.log("3.更简单的原型语法\n将Person.prototype通过对象字面量创建，此时constructor属性指向Object构造函数");
		function Person(){
		}
		Person.prototype = {
			name : "Nicholas",
			age :29,
			job:"Software Engineer",
			sayName:function(){
				console.log(this.name);
			}
		};
		var person = new Person();
		console.log(person);
		console.log("4.原型的动态性\n在原型中做的所有修改都会在实例中反映出来，即使先创建实例再修改原型\n实例中的指针仅指向原型不指向构造函数");
		console.log("5.原生对象的原型\n可通过原生对象的原型为原生对象添加方法属性但不推荐");
		console.log("6.原型对象的问题\n省略了为构造函数传递初始化参数步骤\n为原型对象属性添加了引用类型值时，修改实例会导致所有实例被改变");
		console.log("6.2.4 组合使用构造函数模式和原型模式\n自定义对象最常用方法");
		function Person(name, age, job){

			this.name = name;
			this.age = age;
			this.job = job;
			this.friends = ["Shellby","Court"];
		}
		Person.prototype = {
			constructor : Person,
			sayName : function(){
				console.log(this.name);
			}
		}
		var person1 = new Person("Nicholas", 29, "Software Engineer");
		var person2 = new Person("Greg", 27, "Doctor");
		//person1.friends.push("Van");//不影响person2
		console.log(person1,person2);
		console.log("6.2.5 动态原型模式\n把所有信息封装在构造函数中\n通过检查某个应该存在的方法是否有效来决定是否需要初始化原型方法");
		function Person(name, age, job){
			this.name = name;
			this.age = age;
			this.job = job;
			//方法
			if (typeof this.sayAge != "function"){
				Person.prototype.sayAge = function(){
					console.log(this.age);
				}
			};
		}
		var friend = new Person("Nicholas", 29, "Software Engineer");
		//friend.sayAge();
		console.log("6.2.6 寄生构造函数模式\n创建一个函数封装对象的代码，并返回此对象");
		function Person(name, age, job){
			var o = new Object();
			o.name = name;
			o.age = age;
			o.job = job;
			o.sayName = function(){
				console.log(this.name);
			};
			return o;
		}
		var friend = new Person("Nicholas", 29, "Software Enigineer");
		friend.sayName();
		function SpecialArray(){
			var values = new Array();
			values.push.apply(values, arguments);
			values.toPipedString = function(){
				return this.join("|");
			};
			return values;
		}
		var colors = new SpecialArray("red", "blue", "green");
		console.log(colors.toPipedString());
		console.log("6.2.7 稳妥构造函数模式\n稳妥对象，没有公共属性，安全环境中使用（安全环境禁用new和this）类似寄生构造函数模式，但是有两点不同\n1.创建实例方法不引用this\n2.不使用new操作符调用构造函数");
		function Person(name, age, job){
			//创建要返回的对象
			var o = new Object();
			o.sayName = function(){
				console.log(name);
			} ;
			return o;
		}
		//只能通过sayName()访问name属性
		var friend = Person("Nicholas", 29, "Software Engineer");
		friend.sayName();
		
		console.log("6.3 继承\n6.3.1 原型链");
		console.log("OO继承有接口继承与实现继承,ES中只支持实现继承，主要方法：原型链，基本思想：利用原型让一个引用类型继承另一个引用类型的属性方法。");
		console.log("构造函数，原型和实例的关系:\n每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针");
		//基本模式代码
		function SuperType(){
			this.property = true;
		}
		SuperType.prototype.getSuperValue = function(){
			return this.property;
		};
		function SubType(){
			this.subproperty = false;
		}
		SubType.prototype = new SuperType();
		SubType.prototype.getSubValue = function(){
			return this.subproperty;
		};
		var instance = new SubType();
		console.log(instance.getSuperValue());//true
		
		console.log("默认原型是Object.prototype\n确定原型和实例的关系方法：\n 1.instanceof\n 2.obj.prototype.isPrototypeOf(insatnce)\n 谨慎的定义方法：给原型添加代码要放在替换原型的语句之后");
		console.log("通过原型链继承时,不能使用对象字面量创建原型，会重写原型链。\n原型链的问题：1.包含引用类型值的原型属性会被所有实例共享。所以在构造函数中定义属性，通过原型链继承时，原型成为另一个原型的实例，所以原先的实例属性变成现在的原型属性.");
		function SuperType(){
			this.colors = ["red", "blue", "green"];
		}
		function SubType(){
		}
		SubType.prototype = new SuperType();
		//SubType.prototype就变成了SuperType的实例，所以也有了colors属性
		var instance1 = new SubType();
		//instance1.colors.push("black");
		console.log(instance1.colors);
		var instance2 = new SubType();
		console.log(instance2.colors);
		
		console.log("6.3.2 借用构造函数(伪造对象/经典继承)\n在子类型构造函数内部调用超类型构造函数call()/apply()\n解决引用类型值属性带来的问题");
		function SuperType(){
			this.colors = ["red","blue","green"];
		}
		function SubType(){
			//继承SuperType
			SuperType.call(this);//把继承原型放到构造函数中，而不是在全局作用域中写原型继承，不会导致一改全改
		}
		var instance1 = new SubType();
		//instance1.colors.push("black");
		console.log(instance1.colors);//追加了black
		var instance2 = new SubType();
		console.log(instance2.colors);//只继承原型中的属性
		console.log("借用构造函数方式子类型构造函数可向原型构造函数传递参数");
		function SuperType(name){
			this.name = name;
		}
		function SubType(){
			SuperType.call(this,"Nicholas");
			this.age = 29;//传递了参数
		}
		var instance = new SubType();
		console.log(instance);
		console.log("构造函数的问题：\n1.方法都在构造函数中定义，就不可说函数复用了\n2.超类型原型中定义的方法对于子类型不可见，结果所有类型都只能使用构造函数模式");
		
		console.log("6.3.3 组合继承（伪经典继承）组合原型链以及构造函数，思想：\n使用原型链实现原型属性和方法继承，借用构造函数实现实例属性的继承，在原型上实现了函数复用又保证了每个实例都有自己的属性");
		function SuperType(name){
			this.name = name;
			this.colors = ["red", "blue", "green"];
		}
		SuperType.prototype.sayName = function(){
			console.log(this.name);
		}
		function SubType(name,age){
			SuperType.call(this,name);
			this.age = age;
		}
		SubType.prototype = new SuperType();
		SubType.prototype.constructor = SubType;
		SubType.prototype.sayAge = function(){
			console.log(this.age);
		};

		var instance1 = new SubType("Nicholas",29);
		var insatnce2 = new SubType("Greg",27);
		instance1.colors.push("black");
		console.log(instance1,insatnce2);
		
		console.log("6.3.4 原型式继承 借助原型可以基于已有对象创建新对象\n");
		function object(o){
			function F(){}
			F.prototype = o;//将传入的对象作为这个构造函数的原型
			return new F();//返回新实例
		}
		console.log("必须有一个对象作为另一个对象的基础")
		//例子
		var person ={
			name:"Nicholas",
			friends : ["Shelby", "Court", "Van"] 
		};//传入对象
		var anotherPerson = object(person);
		anotherPerson.name = "Greg";
		anotherPerson.friends.push("Rob");

		var yetAnotherPerson = object(person);
		yetAnotherPerson.name = "Linda";
		yetAnotherPerson.friends.push("Barbie");
		console.log(person.friends);// ["Shelby", "Court", "Van", "Rob", "Barbie"]
		console.log(anotherPerson,yetAnotherPerson);
		console.log("ES5使用Object.create()规范化了原型式继承。两个参数：一个用作新对象原型的对象和可选的为新对象定义额外属性的对象");
		var person = {
			name:"Nicholas",
			friends:["Shelby", "Court", "Van"]
		};
		var anotherPerson = Object.create(person);
		anotherPerson.name = "Greg";
		anotherPerson.friends.push("Bob");

		var yetAnotherPerson = Object.create(person);
		yetAnotherPerson.friends.push("Barbie");
		console.log(person.friends);

		console.log("以这种方式创建的属性会覆盖原型对象上的同名属性");
		var person = {
			name: "Nicholas",
			friends: ["Shelby","Court", "Van"]
		};
		var anotherPerson = Object.create(person,{
			name:{
				value:"Greg"
			}
		});
		console.log(anotherPerson.name);

		console.log("6.3.5 寄生式继承\n创建一个仅用于封装继承过程的函数，函数内部以某种方式来增强对象，返回对象");
		function createAnother(original){
			var clone = object(original);//通过调用函数创建一个对象
			clone.sayHi = function(){
				console.log("hi");
			}//以某种方式增强这个对象
			return clone;
		}
		var person = {
			name:"Nicholas",
			friends:["Shelby", "Court", "Van"]
		};
		var anotherPerson = createAnother(person);
		anotherPerson.sayHi();
		
		console.log("6.3.6 寄生组合式继承\n最大问题：任何情况下，都会调用两次超类型构造函数，一次是创建子类型原型的时候，另一次是在子类型构造函数内部。\n子类型最终会包含超类型对象的全部实例属性，但调用子类型构造函数时需重写这些属性");
		function SuperType(name){
			this.name = name;
			this.colors = ["red", "blue", "green"];
		}
		SuperType.prototype.sayName = function(){
			console.log(this.name);
		}
		function SubType(name, age){
			SuperType.call(this,name);//第二次调用SuperType()
			this.age = age;
		}
		SubType.prototype = new SuperType();//第一次调用SuperType()
		SubType.prototype.constructor = SubType;
		SubType.prototype.sayAge = function(){
			console.log(this.age);
		}
		var sub = new SubType("Nik",30);
		console.log(sub);
		sub.sayName();
		console.log("寄生组合式继承：借用构造函数来继承属性，通过原型链的混成形式来继承方法,本质上使用寄生式继承继承超类型的原型，在将结果指定给子类型的原型。\n寄生组合式继承基本模式如下：");
		function inheritPrototype(subType, superType){
			var prototype = object(superType.prototype);//创建对象
			prototype.constructor = subType;//增强对象
			subType.prototype = prototype;//指定对象
		}
		//例子
		function SuperType(name){
			this.name = name;
			this.colors = ["red", "blue", "green"];
		}
		SuperType.prototype.sayName = function(){
			console.log(this.name);
		};
		function SubType(name, age){
			SuperType.call(this,name);
			this.age = age;
		}
		inheritPrototype(SubType,SuperType);//调用寄生组合式模式函数
		
		SubType.prototype.sayAge = function(){
			console.log(this.age);
		};

		var sub = new SubType("Caro",17);
		console.log(sub);
		console.log("高效性体现在只调用了一次SuperType()构造函数,引用类型最理想的继承方式");
	</script>
</body>
</html>
```

