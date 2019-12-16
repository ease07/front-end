# this

提前声明`const {log} = console`

1.**this是属性或方法当前所在的对象**

```javascript
var A = {
	name:"张三",
	describe:function(){
		return '姓名:'+this.name;
	}
};
var B = {name:'李四'};
B.describe = A.describe;
log(B.describe());	//姓名:李四

function f(){
	log('姓名:'+this.name);
}

var A = {
	name:"zhangsan",
	describe:f
};

var B = {
	name:"lisi",
	describe:f
};
A.describe();	//姓名:zhangsan
B.describe();	//姓名:lisi
```

```html
<!--this指向传入的文本框-->
<input type="text" name="age" size=3 onChange="validate(this,18,99);"/>
<script type="text/javascript">
    function validate(obj, lowval, hival){
        if((obj.value<lowval)||(obj.value>hival)){
            console.log('Invalid Value!');
        }
    }
</script>
```

js中一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，`this`就是函数运行时所在的对象（环境）

**实质**

现在内存中生成{foo:5}`对象，再把这个对象的内存地址赋值给变量`obj`,obj是一个地址

```javascript
var obj = {foo:5};
//相当于
{
    foo:{
        [[value]]:5
        [[writable]]:true
        [[enumerable]]:true
        [[configurable]]:true
    }
}
```

```javascript
var f = function(){
	log(this.x);
}
var x = 1;
var obj = {
	f:f,
	x:2
};
f();	//1
obj.f();	//2
```

## 使用场合

- **全局环境**

  `this`指向顶层对象`window`

  ```javascript
  log(this === window);	//true
  function f(){
  	log(this===window);
  }
  f();	//true
  //说明只要在函数全局环境运行this就指向window
  ```

- **构造函数中指向实例对象**

  ```javascript
  var obj = function(p){
      this.p = p;
  };
  ```

- **对象的方法**

  `this`指向方法运行时所在的对象，如果方法赋值给另一个对象，则改变`this`指向

  ```javascript
  var obj = {
  	foo:function(){
  		log(this);
  	}
  };
  obj.foo();	//{ foo: [Function: foo] }	//obj自身
  //下面3种直接取出obj.foo进行调用，运行环境是全局对象
  //1.
  (obj.foo = obj.foo)()	//window
  //2.
  (false||obj.foo)()	//window
  //3.
  (1,obj.foo)()	//window
  
  //1.
  (obj.foo = function(){
  	log(this);
  })();
  //等价于
  (function(){
  	log(this);
  })();
  //2.
  (false||function(){
  	log(this);
  })();
  //3.
  (1,function(){
  	log(this);
  })();
  
  ```

  如果`this`所在的方法不在对象的的第一层，`this`只指向当前一层的对象

  ```javascript
  //第一层a 第二层a.p, a.b 第三层a.b.m
  var a = {
  	p:'hello',
  	b:{
  		m:function(){
  			log(this.p);//指向a.b
  		}
  	}
  }
  a.b.m();	//undefined
  //相当于
  var b = {
      m:function(){
         log(this.p);
      }
  };
  var a = {
      p:'hello',
      b:b
  };
  (a.b).m();	//等同于b.m()
  
  //如何达到预期？
  var a = {
      b:{
          m:function(){
              log(this.p);
          },
          p:'hello'	//这是a.b对象具有p属性
      }
  };
  ```

  如果将嵌套对象内部方法赋值给一个变量，this依然会指向全局对象

  ```javascript
  var a = {
      b:{
          m:function(){
              log(this.p);
          },
          p:'hello'
      }
  };
  var hello = a.b.m;	//调用时指向a.b.m
  hello();	//undefined
  
  //如何使指向不变？
  var hello = a.b;	//调用时指向a.b
  hello.m();	//hello
  ```

  ## 使用注意点

  **1.避免使用多层this**

  ```javascript
  var o = {
  	f1:function(){
  		log(this);
  		var f2 = function(){
  			log(this);
  		}();
  	}
  }
  o.f1();	//o window
  //等价于
  var temp = function(){
  	log(this);
  };
  var o = {
  	f1:function(){
  		log(this);
  		var f2 = temp();
  	}
  }
  o.f1();	//o window
  //解决 改用一个指向外层this的变量
  var o = {
  	f1:function(){
  		log(this);
  		var that = this;
  		var f2 = function(){
  			console.log(that);
  		}();
  	}
  }
  o.f1();//o o
  ```

  注：严格模式中`this`指向顶层对象则报错

  **2.避免数组处理方法中的this**

  `map`和`forEach`，函数参数内部不使用`this`

  ```javascript
  var o = {
  	v:'hello',
  	p:['a1','a2'],
  	f:function f(){
  		this.p.forEach(function(item){
  			log(this.v+' '+item);	//this指向顶层对象
  		});
  	}
  };
  o.f();
  //undefined a1
  //undefined a2
  
  //解决？1.固定this
  var o = {
      v:'hello',
      p:['a1','a2'],
      f:function f(){
          var that = this;
          this.p.forEach(function(item){
              log(that.v+' '+item);
          });
      }
  };
  o.f();
  //hello a1
  //hello a2
  
  //解决？2.将this当作forEach的第二个参数，固定它的运行环境
  var o = {
      v:'hello',
      p:['a1','a2'],
      f:function f(){
          this.p.forEach(function(item){
              log(this.v+' '+item);
          },this);
      }
  }
  o.f()
  // hello a1
  // hello a2
  ```

  **3.避免回调函数中的this**

  ```javascript
  var o = new Object();
  o.f = function(){
      log(this===o);
  }
  $('button').on('click',o.f);
  //控制台输出false this不再指向o对象，而是指向dom对象
  ```

  ## 绑定this的方法

  **1.`Function.prototype.call()`**

  可指定函数内部的`this`指向，即函数执行时的作用域，然后在指定的作用域调用该函数

  ```javascript
  var obj = {};
  var f = function(){
  	return this;
  };
  log(f()===global);	//true
  log(f.call(obj)===obj);	//true
  ```

  **`call`方法的参数应该是一个对象，如果参数为 `空`，`null`,`undefined`,则默认传入全局对象**

  ```javascript
  var n = 123;
  var obj = {n:456};
  function a(){
  	log(this.n);
  }
  a();	//123
  a.call();	//123
  a.call(null);	//123
  a.call(undefined);	//123
  a.call(obj);	//456
  ```

  **如果`call`方法的参数是一个原始值，原始值自动转成对应的包装对象，然后传入`call`方法**

  ```javascript
  var f = function(){
  	return this;
  };
  log(f.call(5));	//[Number: 5]
  ```

  `call`接收多个参数`func.call(thisObj, arg1, arg2, ...)`

  **`call`方法可调用对象的原生方法**

  `call`可以保留继承原生对象的属性,忽略覆盖

  ```javascript
  var obj = {};
  log(obj.hasOwnProperty('toString'));	//false
  obj.hasOwnProperty = function(){
  	return true;
  };	
  log(obj.hasOwnProperty('toString'));	//true
  
  log(Object.prototype.hasOwnProperty.call(obj,'toString'));	//false
  ```

  **2.`Function.prototype.apply()`**

  `apply`同`call`类似，不过参数传入数组,使函数可接收数组

  `func.apply(thisObj,[arg1,arg2,...])`

  ```javascript
  function f(x,y){
  	log(x+y);
  }
  f.call(null,1,1);	//2
  f.apply(null,[1,4]);	//5
  ```

  ```javascript
  //应用
  //1.找出数组的最大值
  var a = [10,2,4,15,9];
  log(Math.max.apply('',a));	//15
  
  //2.将数组的空元素变为`undefined`
  log(Array.apply(null,['a',,'c']));	//[ 'a', undefined, 'c' ]
  
  //空元素与undefined差别在于，数组的forEach会跳过空元素，不会跳过undefined
  var a = ['a', ,'c'];
  function print(i){
  	log(i);
  }
  a.forEach(print);	//a c
  Array.apply(null,a).forEach(print);	//a undefined c
  
  //3.转换类似数组的对象
  log(Array.prototype.slice.apply({0:1,length:1}));
  log(Array.prototype.slice.apply({0:1}));
  log(Array.prototype.slice.apply({0:1,length:2}));
  log(Array.prototype.slice.apply({length:3}));
  // [ 1 ]
  // []
  // [ 1, <1 empty item> ]
  // [ <3 empty items> ]
  
  //4.绑定回调函数的对象
  var o = new Object();
  o.f = function(){
      log(this===o);
  };
  var f = function(){
      o.f.apply(o);
      //o.f.call(o);
  };
  $('button').on('click',f);
  ```

  **`call`和`apply`不仅绑定函数运行时所在的对象，还会立即执行函数，因此绑定语句写在函数体内**

  **3.`Function.prototype.bind()`**

  `bind`用于将函数体内的this绑定到某个对象，然后返回一个新函数

  ```javascript
  var print = d.getTime.bind(d);	//将getTime内部的this绑定到d对象
  log(print());	//1573565732503
  
  
  var counter = {
  	count:0,
  	inc:function(){
  		this.count++;
  	}
  };
  var func = counter.inc.bind(counter);
  func();
  log(counter.count);	//1
  
  var add = function(x,y){
  	return x*this.m + y*this.n;
  };
  var obj = {
  	m:2,
  	n:3
  };
  var newAdd = add.bind(obj,5);	//将this绑定到obj并给x传参5
  log(newAdd(6));	//28	//给y传参6
  ```

  **`bind`使用注意点**

  1.每一次返回一个新函数

  ```javascript
  ele.addEventListener('click',o.m.bind(o));	//无法取消解绑
  
  //正确做法
  var listener = o.m.bind(o);
  ele.addEventListener('click', listener);
  //...
  ele.removeEventListener('click',listener);
  ```

  2.结合回调函数

  ```javascript
  var counter = {
  	count:0,
  	inc:function(){
  		'use strict';
  		this.count++;
  	}
  };
  function callIt(callback){
  	callback();
  }
  callIt(counter.inc.bind(counter));
  log(counter.count);	//1
  
  var obj = {
  	name:'张三',
  	times:[1,2,3],
  	print:function(){
  		this.times.forEach(function(n){
  			log(this.name);	//内部this指向global
  			log(this===global);
  		});
  	}
  };
  obj.print();	
  //undefined true
  //undefined true
  //undefined true
  
  //解决？ 绑定到this
  obj.print = function(){
  	this.times.forEach(function(n){
  		log(this.name);
  	}.bind(this));
  };
  obj.print();	//张三 张三 张三
  ```

  3.结合`call`

  ```javascript
  [1,2,3].slice(0,1);
  Array.prototype.slice.call([1,2,3],0,1);
  
  //改成bind
  var slice = Function.prototype.call.bind(Array.prototype.slice);
  log(slice([1,2,3],0,2));	//[ 1, 2 ]
  
  var push = Function.prototype.call.bind(Array.prototype.push);
  var pop = Function.prototype.call.bind(Array.prototype.pop);
  
  var a = [1,2,3,4];
  push(a,5);
  log(a);	//[ 1, 2, 3, 4, 5 ]
  pop(a);
  log(a);	//[ 1, 2, 3, 4 ]
  
  function f(){
  	log(this.v);
  }
  var o = {v:123};
  //将bind方法返回函数给bind
  var bind = Function.prototype.call.bind(Function.prototype.bind);
  bind(f,o)();	//123	//将f绑定到o,返回一个新函数
  ```

  