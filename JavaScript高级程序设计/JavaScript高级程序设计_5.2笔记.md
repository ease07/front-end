# JavaScript高级程序设计（第三版）

## 5.2  Array类型

​	与其他语言相比，都是数据的有序列表。但是ES数组中的每一项可以保存任何类型的数据。

大小可以动态调整（随数据增加自动增长以容纳新增数据）

创建数组的两种方法：

1. **Array()构造函数**

   ```javascript
   var colors = new Array();
   var colors = new Array(20); //可传递数组长度
   var colors = new Array("red", "blue", "green"); //可传递数组包含的项
   ```

   可省略 new 操作符

2. **数组字面量**

   ```javascript
   var colors = ["red", "blue", "green"];//包含3个字符串的数组
   var names = [];//空数组
   //索引超过数组长度则自动增加索引长度，同Python中的字典
   ```

   设置数组的length属性可移除项也可添加项，移除后再访问为undefined

***5.2.1 检测数组***

instanceof操作符 假定单一的全局执行环境。如果网页存在多个框架，则存在两个以上不同的全局执行环境，从而存在两个以上不同版本的Array构造函数。

```javascript
if (value instanceof Array){
    //对数组执行操作
}
```

ES5解决此问题：isArray()操作符，不管在哪个全局执行环境创建数组

```javascript
if (Array.isArray(value)){
    //对数组执行操作
}
```

***5.2.2 转换方法***

**toString()**返回由数组中每个值的字符串形式拼接而成的，以逗号分隔的一个字符串

**valueOf()**返回数组

```javascript
var colors = ["red","blue", "green"];
alert(colors.toString());//返回字符串
alert(colors.valueOf());//返回数组
alert(colors)//返回数组
```

```javascript
var person1 = {
    toLocaleString : function(){
        return "Nikolaos";
    },
    toString : function(){
        return "Nicholas";
    }
};
var person2 = {
    toLocaleString : function(){
        return "Grigorios";
    },
    toString : function(){
        return "Greg";
    }
};
var people = [person1, person2];
alert(people);                 		//Nicholas,Greg
alert(people.toString());		    //Nicholas,Greg
alert(people.toLocaleString());		//Nikolaos,Grigorios
```

以上返回以逗号分隔的字符串

join方法可使用不同的分隔符来构建此字符串

null值或undefined值返回结果以空字符串表示

***5.2.3  栈方法***

LIFO（Last-In-First-Out 后进先出）

**push()**：接收任意数量的参数，逐个添加到数组末尾，并返回修改后数组的长度

**pop()**：从数组末尾移除最后一项，减少length值，返回移除的项

```javascript
var colors = new Array();
var count = colors.push("red", "green");
console.log(count); //2

count = colors.push("black");
console.log(count); //3

var item = colors.pop();
alert(item); //"black"
console.log(colors.length); //2
```

***5.2.4 队列方法***

FIFO 添加返回长度，移除返回项

**shift()**：在数组前端移除项，返回移除项

**push()**：在数组末尾添加项，返回数组长度

**unshift()**：从数组前端添加项

**pop()**：从数组末尾移除项

***5.2.5 重排序方法***

**reverse()**：反转，逆序,

**sort()**:升序；调用每个数组项的toString()方法，比较的是字符串。

两个都返回数组

所以参数可使用函数保证数值正常排序：

```javascript
//升序排，适用于大多数数据类型
function compare(value1,value2){
    if(value1 < value2){   // value1<value2不交换
        return -1;
    }else if(value1 > value2){
        return 1;
    }
    else{
        return 0;
    }
}
var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values);//0,1,5,10,15
//降序交换返回值，同理如上
//只针对数值
function compare(value1, value2){ //降序
    return value2 - value1;
}
```

***5.2.6 操作方法***

**concat()**：基于当前数组的所有项创建一个新数组。

**splice()**：基于当前数组的一或多项创建一个新数组。

即先创建当前数组副本，然后将接受到的参数添加到副本末尾，最后返回新构建的数组。

可接受1或两个参数，即起始与结束，不包含结束

如果slice参数为负数，则结果为参数加上数组长度的结果

结束小于起始则返回空数组

splice()最强大的数组方法，主要功能：插入项，返回数组

- 删除：可删除任意数量的项，slice(0, 2)删除前两项

- 插入：向指定位置插入任意数量的项，三个参数（起始，要删除的项数，要插入的项）

  splice(2, 0, "red", "green");

- 替换：向指定位置插入任意数量的项，同时删除任意数量的项。三个参数（起始位置，要删除的项数，要插入的项数），删除与插入不用相等。

```javascript
var colors = ["red", "green", "blue"];
var colors2 = colors.concat("yellow", ["black", "brown"]);
alert(colors);	//red,green,blue
alert(colors2); //red,green,blue,yellow,black,brown
```

```javascript
var colors = ["red", "green", "blue", "yellow", "black", "brown"];
var colors2 = colors.slice(4);		
var colors3 = colors.slice(1,4);
alert(colors2);	//black,brown
alert(colors3);	//green,blue,yellow
```

**splice()**始终返回一个数组，元素为删除的项，没有则返回空数组。

***5.2.7 位置方法***

**indexOf()**

**lastIndexOf()**

都有两个参数：要查找的项，查找起点位置的索引

返回查找项在数组中首次出现的位置，没找到都返回-1，比较第一个参数使用全等操作符

```javascript
var numbers = [1, 2, 3, 4, 5, 4, 3, 2 ,1];
alert(numbers.indexOf(4));	//3
alert(numbers.lastIndexOf(4));	//5

alert(numbers.indexOf(4, 4));	//5
alert(numbers.lastIndexOf(4, 4));	//3
//****
var person = {name: "Nicholas"};
var people = [{name: "Nicholas"}];
var morePeople = [person];
alert(people.indexOf(person));	//-1
alert(morePeople.indexOf(person));	//0
```

**5.2.8 迭代方法**

5个，都接受两个参数（要在每一项上运行的函数，运行该函数的作用域对象 ——影响this值）

**传入函数接收三个参数**：数组项的值、该项在数组中的位置、数组对象本身

**every()**：对数组的每一项运行给定函数，如果该函数**每一项**都返回true，则返回true

**filter()**：。。。，返回true项 组成的数组

**forEach()**：。。。，无返回值

**map()**：。。。，返回每次函数调用结果组成的数组

**some()**：。。。，若该函数对**任一项**返回true，则返回true；

以上方法都不会修改数组中包含的值

```javascript
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var everyResult = numbers.every(function(item, index, array){
    return (item > 2);
});
alert(everyResult);	//false

var someResult = numbers.some(function(iten, index, array){
    return (item > 2);
});
alert(someResult);	//true

numbers.forEach(function(item, index, array){
    //执行某些操作，无返回值
});
```

**5.2.9 归并方法 **

reduce() ：从前往后

reduceRight()：从后往前

都会迭代数组的所有项，构建一个最终返回的值

**接收两个参数**：在每一项调用的函数，作为归并基础的初始值

**传入函数接收四个参数**：前一个值，当前值，项的索引，数组对象

函数返回的任何值都会作为第一个参数自动传递给下一项。第一次迭代发生在数组的第二项上 

```javascript
var values = [1, 2, 3, 4, 5];
var sum = values.reduce(function(prev, cur, index, array){
    return prev + cur;//前一项1+后一项2，reduceRight则是5,4
});
alert(sum); //15
```

