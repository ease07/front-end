# JavaScript高级程序设计（第三版）

## 第5章 引用类型

​	引用类型的值（对象）是引用类型的一个实例。

​	ES中，引用类型是一种**数据结构**，用于将数据和功能组织在一起。常被称为类。

​	ES从技术上讲是一门面向对象的语言，但它不具备传统的面向对象语言所支持的类和接口等基本结构。

​	引用类型有时也被称为**对象定义**，因其描述了一类对象具有的属性和方法。

**5.1 Object类型**

​		大多数引用类型值都是Object类型的实例；

​	创建Object实例的方式——两种：

1. new操作符跟Object构造函数

   ```javascript
   var person = new Object();
   person.name = "Niklaus";
   person.age = 29;
   ```

2. 对象字面量

```javascript
var person = {
    name : "Niklaus",
    age : 29
};
//空花括号则定义只包含默认属性和方法的对象
var person = {}; //同 new Object()
//对象字面量定义对象时不调用Object构造函数
```

对象字面量优点：代码量少，给人封装数据的感觉，可向函数传递大量可选参数

```javascript
//对象字面量是向函数传递大量可选参数的首选方式
function displayInfo(args){
    var output = "";
    if (typeof args.name == "string"){
        output += "Name: " + args.name + "\n";
    }
    if (typeof args.age == "number"){
        output += "Age: " += args.age + "\n";
    }
    alert(output);
}
displayInfo({
    name : "Nicholas",
    age : 29
});
displayInfo({
    name : "Greg"
});
```

***对必须值使用命名参数，而使用对象字面量来封装多个可选参数。***

访问对象属性的两种方法

1. 点表示法 person.name
2. 方括号法（括号内为字符串形式）person["name"]