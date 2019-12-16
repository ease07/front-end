# ES5 与 ES6 中 set&get的用法

```javascript
//ES5
Object.defineProperty(obj,"name",{
	get:function(){
		console.log("正在访问name");
		return this._name;
	},
	set:function(val){
		console.log("正在修改name");
		this._name = val;
	}
});

obj.name  = 10;
// console.log(obj);
// console.log(obj.name);
```

```javascript
//es6中get & set
class Person{
	constructor(){
		this._name = '';
	}
	get name(){
		console.log("正在访问name");
		return `我的名字是${this._name}`;
	}
	set name(val){
		console.log("正在修改name");
		this._name = val;
	}
}

const person = new Person();
person.name = "歌王";
console.log(person.name); //先访问set 再访问get
```

_是一种常用记号，表明该属性只能通过对象方法访问。