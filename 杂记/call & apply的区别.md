## call & apply的区别

//总结，apply和call都用来更改this执行环境
//括号内调用括号外的环境
//1.call逐个传值
//2.apply以数组传值

```javascript
function add(a,b){
	console.log(a+b);
}

function sub(a,b){
	console.log(a-b);
}

add.call(sub,5,3);	//8，sub调用add方法
sub.call(add,5,3);	//2，add调用sub方法

add.apply(sub,[5,3]);	//8,sub调用add方法
sub.apply(add,[5,3]);	//2，add调用sub方法
```

