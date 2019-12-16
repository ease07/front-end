# JavaScript高级程序设计(第三版)

## 第四章 变量、作用域和内存问题

1. **基本类型和引用类型的值**

   JS变量本质：松散类型，决定了其只是在特定时间用于保存特定值的名字而已。

   ES变量可能包含两种不同数据类型的值：

   **基本类型值**：指简单的数据段

   **引用类型值**：指可能由多个值构成的对象，保存在内存中。

   JS中不允许直接访问内存中的位置，即不能直接操作对象的内存空间。操作对象时，实际上是在操作对象的引用。

   - **动态属性**

     引用类型的值可为其添加属性和方法，基本类型不可以

     ```javascript
     var person = new Object();
     person.name = "Nicholas";
     alert(person.name);  //"Nicholas" 引用类型值
     var name = "Paul";
     name.age = 27;
     alert(name.age); //undefined 基本类型值不可添加属性
     ```

   - **复制变量值**

     ​	对于**基本类型值**复制变量值，会在变量上创建一个新值（副本），然后把该值复制到为新变量分配的位置上。原变量值与其复制变量值互不影响。

     ​	对于**引用类型值**的复制，产生的副本实际上是一个指针，与其复制的变量指向同一个对象。改变其中一个变量会影响另一个。

     ```javascript
     //基本类型值
     var num1 =5;
     var num2 = num1;
     //引用类型值
     var obj1 = new Object();
     var obj2 = obj1;
     obj1.name = "Niklaus";
     alert(obj2.name); //"Niklaus"  obj2属性被修改
     ```

   - **传递参数**

     ES中***所有参数都是按值传递的***，基本类型值的传递同基本类型值的复制一样，引用同理。

     ​	向参数传递**基本类型值**时，被传递的值会被复制给一个局部变量（即命名参数，即arguments对象中的一个元素）。

     ​	向参数传递**引用类型值**时，会把这个值在内存中的地址复制给局部变量，局部变量的变化会反应在函数的外部。

     ```javascript
     function addTen(num){
         num += 10;
         return num;
     }
     var count = 20;
     var result = addTen(count);
     alert(count); //20 没有变化
     alert(result);//30
     //另一个例子
     function setName(obj){
         obj.name = "Niklaus";
     }
     var person = new Object();
     setName(person);
     alert(person.name); //"Niklaus"
     //***
     function setName(obj){
         obj.name = "Niklaus";
         obj = new Object(); //函数内部重写obj,变量引用局部对象，函数执行完毕被销毁
         obj.name = "Greg";  
     }
     var person = new Object();
     setNmae(person);
     alert(person.name); //"Niklaus" 函数参数按值传递
     ```

     可把ES函数参数想成局部变量

   - **检测类型**

     检测基本数据类型：typeof

     检测引用类型：instanceof

     语法：*result = variable instanceof constructor*

     如果变量是给定引用类型的实例，则instanceof操作符返回true

     ```javascript
     alert(person instanceof Object);//变量person是Object吗？
     ```

     在检测一个引用类型值和Object的构造函数时，instanceof操作符始终返回true

2. **执行环境和作用域**

   ​	**执行环境(execution context)**定义了变量或函数有权访问的其他数据，决定了它们各自的行为。

   ​	两种：全局 局部

   ​	在Web浏览器中，**全局执行环境**被认为是window对象，因此所有全局变量和函数都是作为window对象的属性和方法创建的。某个执行环境中在其所有代码执行完毕被销毁。

   ​	每个函数都有自己的执行环境，当执行流进入到一个函数时，函数环境就被推入到一个**环境栈**中。而在函数执行之后，栈将其环境弹出，把控制权交给之前的执行环境。

   ​	代码在环境中执行时会创建变量对象的一个作用域链（scope chain）

   **作用域链的作用**：保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终是当前执行代码所在环境的变量对象。

   ​	**如果环境是函数**，则将其活动对象（Active object）作为变量对象。活动对象最开始只包含一个变量，即arguements对象（此对象在全局环境中不存在）。

   作用域链中的下一个变量对象来自外部环境，依次类推，一直延续到全局环境，全局执行环境变量对象始终是作用域链中的最后一个对象。

   ​	**标识符解析**是沿着作用域链一级一级地搜索标识符的过程。

   ```javascript
   var color = "blue";
   function changeColor(){
       if(color === "blue"){
           color = "red";
       }else{
           color = "blue";
       }
   }
   changeColor();
   alert("Color is now " + color); //...red
   //以上包含了函数自己的变量对象以及全局环境的变量对象，可在函数内部访问color是因为可在作用域链找到它
   ```

   ```javascript
   //此外，在局部作用域中定义的变量可在局部环境中与全局变量互换使用
   var color = "blue";
   function changeColor(){
       var anotherColor = "red";
       function swapColors(){
           var tempColor = anotherColor;
           anotherColor = color;
           color = tempColor;
           //这里可访问color anotherColor tempColor
       }
       //这里可访问color anotherColor 不可访问tempColor swapColors()
   }
   //这里只能访问color
   changeColor();
   //以上涉及3个执行环境：全局环境、changeColor()局部环境 swapColors()环境，表明内部环境可通过作用域链访问所有的外部环境，但外部环境不能访问内部环境中任何变量及函数。
   ```

   - **延长作用域链**

     ​	有些语句可在作用域链前端临时增加一个变量对象。该变量对象在代码执行完毕后被移除。

     ​	两个方法：

     - try-catch语句的catch块：创建一个新变量对象，(其中包含的是被抛弃的错误对象的声明)

     - with语句:将指定对象添加到作用域链中

       ```javascript
       function buildUrl(){
           var qs = "?debug=true";
           with(location){
               var url = href + qs; //实际上是location.href
           }//location对象被添加到作用域的前端
           return url; //此时可访问url
       }		
       ```

   - **没有块级作用域**

     不同于C、C++、Java，JS中，块级作用域语言中创建的变量不会在语句结束后被销毁，依然存在于循环外部的执行环境。

     ```javascript
     if(true){
         var color = "blue";
     }
     alert(color); //"blue",for循环创建的变量i也一样
     ```

     - **声明变量**

       使用var声明的变量会自动被添加到最接近的环境中。

       ​	在函数内部，最接近的环境就是函数局部环境

       ​	with语句中，最接近的环境是函数环境。

       如果初始化变量时没有使用var，则变量被自动添加到全局环境。

       ```javascript
       function add(num1, num2){
           var sum = num1 + num2;//局部变量
           return sum;
       }
       var result = add(10, 20); //30
       alert(sum); //sum不是有效变量，出错
       
       function add(num1, num2){
           sum = num1 + num2; //没有var，sum为全局变量，函数外可使用
           return sum;
       }
       var result = add(10, 20); //30
       alert(sum); //30
       ```

       ***严格模式下，初始化未经声明的变量会导致错误。***

     - **查询标识符**

       ​	当在某个环境中为了读取或写入而引用一个标识符时，必须通过搜索来确定该标识符实际代表。搜索过程从作用域前端开始，向上逐级查询与给定名字匹配的标识符。一直追溯到全局环境的变量对象。如果在全局环境中也没找到这个标识符，则说明该变量未声明。

       ```javascript
       var color = "blue";
       function getColor(){
           return color;
       }
       alert(getColor()); //"blue" 搜索纸全局变量
       
       var color = 'blue';
       function getColor(){
           var color = "red";
           return color;
       }
       alert(getColor()); //"red" 在局部变量中找到标识符，停止了向上搜索
       ```

3. **垃圾收集**

   自动垃圾收集机制，执行环境会负责管理代码执行过程中使用的过程。C类语言开发人员需要手工跟踪内存

   垃圾收集器跟踪变量是否有用，对不再有用的变量打上标记，以备将来收回其占用的内存。

   垃圾收集方式：标记清除（mark-and-sweep）引用计数（reference counting）

   - **标记清除 mark-and-sweep**

     当变量进入到环境（比如声明变量）时，将此变量标记为“进入环境”，离开时标记为“离开环境”。

     垃圾收集器在运行时会给存储在内存中的所有变量加上标记。然后去掉环境中的变量以及被环境中的变量引用的变量的标记。而在此之后再被加上标记的变量被视为准备删除的变量。

   - **引用计数（reference counting）**

     跟踪记录每个值被引用的次数。

     ​	声明一个变量并将一个引用类型值赋给该变量时，这个值的引用次数为1，如果同一个值又被赋给另一个变量则该值引用次数加1.相反，如果包含对这个值的引用的变量又取得了另一个值，则引用减1.档引用次数变为0，则不能再访问这个值便收回其占用的内存空间。

     ​	循环引用现象会导致问题。

   - **性能问题**

     IE垃圾收集器是根据内存分配量运行的，256个变量，4096个对象（或数组）字面量和数组元素(slot)或者64kb的字符串，达到以上任何一个临界值，垃圾收集器就会运行。IE中，调用window.CollectGarbage()会立即执行垃圾收集。

   - **管理内存**

     ​	JS中，分配给Web浏览器的可用内存数量通常比分给桌面应用程序的少。以防止JS网页耗尽全部内存而导致系统崩溃。

     ​	一旦数据不再有用，最好将其值设为null来释放其引用。——**解除引用dereferencing**。适用于大多数全局变量和全局属性。

     ```javascript
     function createPerson(name){
         var localPerson = new Object();
         localPerson.name = name;
         return localPerson;
     }
     var globalPerson = createPerson("Niklaus");
     globalPerson = null;//手动解除globalPerson的引用
     ```

     解除引用的真正作用是让值脱离执行环境，以便垃圾收集器运行时将其回收。有助于消除循环引用现象