## 第二章  JavaScript语法

<script>标签最好放在<body>中且置于最末

> 编译器：一种程序，把源代码翻译为直接在计算机上执行的文件。
>
> 解释器：直接读入源代码并逐行执行。
>
> 与解释型语言相比，编译型语言速度更快，可移植性更好

### 一、语句statement

分行or以;隔开写

### 注释comment

// 

 /*...

*/

<!--  /*(单行注释处理，不需要末尾)*/

### 二、变量variable

赋值assignment

JS允许对变量直接赋值，无需事先声明。

```javascript
mood="happy"; //直接赋值
age=33;
var mood; //声明变量
var mood,age; 
var mood="sad",age=33; //声明+赋值
var mood,age; //声明-->赋值
mood="happy";
age=33;
```

变量名不允许含有空格或标点符号($除外)，不以数字开头。

### 三、数据类型data type

**强类型语言**(strongly typed): 必须明确类型声明,比如c

**弱类型语言**(weakly typed): 无需进行类型声明，比如js

1. #### 字符串

   由0或多个字符构成

   if单引号包含单个双引号，需要转义escaping字符\,以正常输出.<!--\并非字符串的一部分-->

   ```javascript
   var mood="don\'t ask"
   ```

2. #### 数值

   整数/浮点数(floating-point number)/负数...

3. #### 布尔值boolean

   true/false

   <!--以上为标量(scalar)-->

4. #### 数组array

   可在声明数组时不给出元素个数

   ```javascript
   var beatles=Array();
   ```

   ```javascript
   //声明+填充(populating)数组
   var beatles=Array(4);
   beatles[0]="John";
   beatles[1]="Paul";
   beatles[2]="George";
   beatles[3]="Ringo";
   //Another way
   var beatles=Array("John","Paul","George","Ringo");
   var beatles=["John","Paul","George","Ringo"];
   //元素可以是变量,其他数组的元素以及其他数组(需要更多方括号，eg:beatles[0][0])
   var name="John";
   beatles[0] = name;
   ```

   **关联数组**(lennon)：把数字index换为属性字符串值，不建议。

5. #### 对象object

   类似数组，使用一个名字表示一组值。值为对象的属性。

   ```javascript
   var lennon=Object();
   lennon.name="John"; //使用点号获取属性
   lennon.year=1940;
   lennon.living=false;
   //创建对象另一种方法-花括号
   var lennon={name:"John",year:1940,living:false};
   //把数组声明为对象,用对象代替传统数组
   var beatles={};
   beatles.vocalist = lennon; //对象属性赋值为对象
   beatles.vocalist.name = "John";
   beatles.vocalist.year = 1940;
   beatles.vocalist.living = false;
   ```

   

6. #### 操作operation

   **算数操作符**( arithmetic operator) +-*/

   拼接(concatenation):连接字符串

   数值拼接字符串->字符串

7. #### 条件语句conditional statement

   ```javascript
   if(condition){  //condition只能为true或false
   	statements; //condition为true执行
   }
   else{
       //condition为false时执行
   }
   //eg:
   if(1>2){
       alert("The world has gone mad!");
   }else{
       alert("All is well with the world.");
   }
   ```

   **比较操作符**  > >= <= < ==  !=

    ==不表示严格相等，eg:==认为false与空字符串含义相同，严格比较使用===(全等操作符，比较值与类型)

   ```javascript
   var a = false;
   var b= "";
   //不严格相等，判断为true
   if(a==b){
   alert(" a equals b");
   }
   //全等，判断为false
   if(a === b){ 
   alert("a equals b");
   }
   ```

   **逻辑操作符**  && || !(取反)

   **if语句无法完成重复性操作**

8. #### 循环语句

   **while循环**

   ```javascript
   //condition可能不成立，不执行语句
   while (condition){
   	alert(count);
   	count++;
   }
   //语句至少执行一次
   do{
       statements;
   }while(condition);
   //eg:
   //执行完语句count变为2
   var count = 1;
   do{
       alert(count);
       count++;
   }while( count < 1);
   ```

   **for循环**

   ```javascript
   for ( initial condition;test condition;alter condition ){
   	statements;
   }
   //eg:
   for (var count = 1; count < 11; count++){
       alert(count);
   }
   ```

9. #### 函数function

   ```javascript
   function name(arguments){
   	statements;
   }
   ```

   驼峰命名法，变量用_  函数使单词首字母大写

   **变量作用域scope**

   全局变量

   局部变量:如果函数内部局部变量与全局变量同名，函数内使用全局变量。可在函数内使用var关键字定义变量处理二义性。

   ```javascript
   //eg:
   function square(num){
       total = num*num; //调用全局变量
       return total;
   }
   var total = 50; //全局变量
   var number = square(20); 
   alert(total); //弹出400
   //eg:
   function square(num){
       var total = num * num; //var消除二义性
       return total; 
   }
   ```

   #### 对象object

   一种数据类型，对象是自包含的数据集合，包含在对象中的数据可通过两种形式访问-属性(property)&方法(method)

   - 属性是隶属于某个特定对象的变量
   - 方法是只有某个特定对象才能调用的函数

对象是是由一些属性和方法组合构成的数据实体。

如何访问数据？用点

object.property

object.method()

```javascript
//实例instance:对象的具体个体
//为给定对象创建新实例使用new关键字
var jeremy = new Person;
```

- 用户定义对象(user-defined object)

- 内建对象(native object)

  预先定义好的对象，比如Array对象，Date对象

  ```javascript
  var current_date = new Date(); //创建实例，进行初始化
  var today = current_date.getDay(); 
  ```

- 宿主对象host object

  由浏览器提供的预定义对象，包括Form,Image,Element，document等

## 第三章  DOM 文档对象模型

### 1.DOM

- **D** document，处理网页内容，DOM把编写的网页文档转换为文档对象。

- **O** js中对象分为三类

  1. 用户定义对象user-defined object

  2. 内建对象native object：内建在JavaScript中的对象，比如Array,Math,Date等

  3. 宿主对象host object：浏览器提供的对象

     宿主对象中最基础的对象是window对象

     window对象对应着浏览器窗口，其属性和方法统称为**BOM（浏览器对象模型）**

- **M** 模型model,代表“map”,含义为某种事物的表现形式

  **DOM**代表加载到当前浏览器窗口的当前网页

### 2.节点node

表示网络中的一个连接点；一个网络是由一些连接点构成的集合。

1. 元素节点element node
2. 文本节点text node，XHTML文档里，包含在元素节点内部，非所有元素节点都包含文本节点。
3. 属性节点attribute node，对元素做出更具体的描述。

```html
<p title="a gentle reminder">Don't forget to buy the stuff.</p>
```

以上p为元素节点，title为属性节点，Don't...为文本节点

### 3.获取元素

文档中每一个元素都是一个对象

1. getElementById(id)

   返回具有规定id属性的元素节点对应的对象。

2. getElementsByTagName(tag)

    返回一个对象数组，每个对象对应着具有给定标签的一个元素。

   参数允许使用通配符，意味着文档中每个元素都将在这个函数所返回的数组里

3. getElementsByClassName(class)

   同上，返回一个具有相同类名的元素的对象数组

   类名的实际顺序不重要，比如类名"sale important"与参数名"important sale"会匹配。

### 4.获取设置属性

- getAttribute(attribute)

- setAttribute(attribute,value)

  setAttribute设置属性后，页面内容进行刷新而浏览器源代码不变。

### 5.事件处理函数

作用：在特定事件发生时调用特定的js代码。

鼠标悬停：onmouseover

鼠标指针离开：onmouseout

鼠标点击：onclick

this关键字，代表这个对象，具体到当前例子。

### 6.一些属性

- childNodes：获取任一元素的所有子元素，返回一个包含这些所有子元素的数组。

- nodeType：用不同数值代表分别每一种节点

  - 元素节点的nodeType:1
  - 属性节点的nodeType:2
  - 文本节点 的nodeType:3

- nodeValue：获取文本节点的值

  ```javascript
  alert(description.childNodes[0].nodeValue);//比如获取p标签中的文本，其中的文本为p标签的第一个子节点
  ```

- firstChild

  ```javascript
  alert(description.firstChild.nodeValue);//等价于上面
  ```

- lastChild

## 第五章 实践

**平稳退化 graceful degradation**：即使某些功能无法使用，但最基本的操作仍能顺利完成。

js使用window对象的open()方法来创建新的浏览器窗口。

```javascript
with.open(url,name,features);									
```

url-想在新窗口打开的网页地址，省略则弹出空白的浏览器窗口。

name-新窗口名字

features-以逗号分隔的字符串，内容为新窗口的各种属性。

​		包括新窗口的尺寸(宽高)，被禁用或启用的浏览功能(工具条，初始显示位置等)

```javascript
function popUp(winURL){
window.open(winURL,"popup","width=320,height=480");
}
```

如何调用popUp()函数？--使用伪协议(pseudo-protocol)

### "javascript:"伪协议

“真”协议用在因特网上的计算机之间传输数据包，比如HTTP协议(http://),FTP协议(ftp://)等

伪协议是一种非标准化协议。"javascript:"伪协议通过一个链接来调用js函数

```html
//通过"javacript:"伪协议调用popUp()函数
<a href="javascript:popUp('http://www.example.com/');">Example</a>
```

### 内嵌的事件处理函数

```html
<a href="#" onclick="popUp('http://www.example.com/');return false;">Example</a>
<!-- 为javascript预留出退路，不支持js时,添加真实存在的href -->
<a href="http://www.example.com/" onclick="popUp(this.href);return false;">Example</a>
<!--this.href等价于this.getAttribute('href') -->
```

### 分离JavaScript

具体步骤：

1. 把文档里的所有链接全放入一个数组里

2. 遍历数组

3. 如果某个链接的class属性等于popup，就表示此链接被点击时应调用popUp()函数

   A.把此链接的href属性值传递给popUp()函数

   B.取消此链接的默认行为，不让这个链接把访问者带离当前窗口

```javascript
window.onload = prepareLinks; //使html文档加载完才执行js代码
function prepareLinks(){
    var links = document.getElementsByTagName("a");
    for (var i=0;i<links.length;i++){
        if(links[i].getAttribute("class") == "popup"){
            links[i].onclick = function(){
                popUp(this.getAttribute("href"));
                return false;
            }
        }
    }
}
function popUp(winURL){
	window.open(winURL,"popup","width=320,height=480");
}
```

**对象检测object detection**

```javascript
if(method){
	statements;
}

function myFunction(){
	if(document.getElementById){
	statements using getElementById;
	}
}

if(!document.getElementById || !document.getElementsByTagName) return false;
```

**浏览器嗅探技术browser sniffing**

通过提取浏览器供应商提供的信息来解决 向后兼容问题

### 向后兼容

### 性能考虑

1. 尽量少访问DOM和尽量减少标记
2. 合并与放置文本：使用外部文件，多个js文件合并成一个
3. 压缩脚本：把脚本文件中不必要的字节，如空格和注释，删除。减少整体文件大小

``` javascript
//第六章涉及代码 控制图片显示排版
//代码工作
//检查当前浏览器是否理解getElementsByTagName
//检查...getElementById
//检查当前网页是否存在id为imagegallery的元素
//遍历imagegallery元素中的所有链接
//设置oonclick事件，完成以下操作
  //把链接作为参数传递给showPic函数
  //取消链接被点击时的默认行为，不让浏览器打开这个链接
function showPic(whichpic){
    if(!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("palceholder");
    placeholder.setAttribute("src",source);
    if(!document.getElementById("description")) return false;
    if(whichpic.getAttribute("title")){ //获取链接图片的title属性
        var text = whichpic.getAttribute("title");
    }else{
        text="";
    }
    var description = document.getElementById("description");//修改文本节点
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false; //使图片不在新窗口弹出,取消点击链接的默认操作
}
function prepareGallery(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery"); //获取ul标签给gallery
    var links = gallery.getElementsByTagName("a"); //返回由ul中的所有a标签对象数组
    for(var i = 0; i < links.length; i++){
        links[i].onclick = function(){ //为onclick指定匿名函数
            return showPic(this); //this即links[i]
        }
        links[i].onkeypress = links[i].onclick;
    }
}
//addLoadEvent函数工作
//把现有的window.onload事件处理函数值存入变量oldonload
//如果处理函数还没有绑定任何函数，给他添加新函数
//如果处理函数已绑定一些函数，把新函数func追加到现有指令的末尾
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
addLoadEvent(prepareGallery);
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>图片放置</title>
    <script src="../js/img_pos.js" type="text/javascript"></script>
    <link rel="stylesheet" href="../css/img_pos.css" type="text/css">
</head>
<body>
    <h1>Snapshots</h1>
    <ul id="imagegallery">
        <li>
            <a href="../img/fireworks.jpg" title="A fireworks display">
                <img src="../img/thumbnail_fireworks.jpg" alt="Fireworks">
            </a>
        </li>
        <li>
            <a href="../img/coffee.jpg" title="A cup of black coffee">
                <img src="../img/thumbnail_coffee.jpg" alt="Coffee">
            </a>
        </li>
        <li>
            <a href="../img/rose.jpg" title="A red,red rose">
                <img src="../img/thumbnail_rose.jpg" alt="Rose">
            </a>
        </li>
        <li>
            <a href="../img/bigben.jpg" title="The famous clock">
                <img src="../img/thumbnail_bigben.jpg" alt="Big Ben">
            </a>
        </li>
    </ul>
    <img src="../img/placeholder.gif" alt="my image gallery" id="placeholder">
    <p id="description">Choose an image.</p>
</body>
</html>
```

```css
body{
    font-family:"Helvetica","Arial",serif;
    color:#333;
    background-color:#ccc;
    margin:1em 10%;
}
h1{
    color:#333;
    background-color:transparent;
}
a{
    color:#c60;
    background-color:transparent;
    font-weight:bold;
    text-decoration:none;
}
ul{
    padding:0;
}
li{
    float:left;
    padding:1em;
    list-style:none;
}
#imagegallery{
    list-style:none;
}
#imagegallery{
    display:inline;
}
#imagegallery li a img{
    border:0;
}
```

## 第七章 动态创建标记

### 传统方法

**document.write**

**innerHTML**

```html
<div id="testdiv">
    <p>This is <em>my</em> content.</p>
</div>
<script>
	document.write("<p>This is inserted.</p>");
    insertPagraph("this is inserted");
</script>
```

```javascript
function insertPagraph(text){
    var str = "<p>";
    str += text;
    str += "</p>";
    document.write(str);  //
}
window.onload = function(){
    var testdiv = document.getElementById("testdiv");
    alert(testdiv.innerHTML); //用innerHTML获取#testdiv内容
    testdiv.innerHTML = "<p>I inserted <em>this</em> content.</p>"; //用innerHTML修改文本
}
```

### DOM方法

在DOM看来，一个文档就是一棵节点树。

如果要在节点树上添加内容，就必须插入新节点。

如果要添加标记，就必须插入元素节点。

- **createElement ** 创建元素节点

  document.createElement(nodeName)

  ```javascript
  document.createElement("p");//创建一个p元素
  ```

  ```javascript
  window.onload = function(){
      var para = document.createElement("p");
      var info = "nodeName: ";
      info += para.nodeName;
      info += " nodeType: ";
      info += para.nodeType;
      alert(info);
  }
  ```

- **appendChild** 追加子节点

  parent.appendChild(child)

  把新创建的节点插入到某个某个文档的节点树最简单的办法：让他成为这个文档某个现有节点的一个子节点。

  ```javascript
  var testdiv = document.getElementById("testdiv");
  var para = document.createElement("p");
  testdiv.appendChild(para);
  ```

- **createTextNode** 创建文本节点

  document.createTextNode(text)

  ```javascript
  var txt = document.createTextNode("Hello world");
  ```

  ```javascript
  window.onload = function(){
      var para = document.createElement("p");
      var testdiv = document.getElementById("testdiv");
      testdiv.appendChild(para);
      var txt = document.createTextNode("Hello World!");
      para.appendChild(txt);
  }
  ```

  ```javascript
  //根据文档树,用createTextNode/createElement/appendChild创建html内容
  window.onload = function(){
      var para = document.createElement("p");
      var txt1 = document.createTextNode("This is");
      var emphasis = document.createElement("em");
      var txt2 = document.createTextNode("my");
      var txt3 = document.createTextNode(" content.");
      para.appendChild(txt1);
      emphasis.appendChild(txt2);
      para.appendChild(emphasis);
      para.appendChild(txt3);
      var testdiv = document.getElementById("testdiv");
      testdiv.appendChild(para);
  }
  ```

### insertBefore()在已有元素前插入一个新元素

- 新元素newElement
- 目标元素targetElement
- 父元素parentElement：目标元素的父元素

parentElement.insertBefore(***newElement***,***targetElement***)

```javascript
var gallery = document.getElementById("imagegallery");//获取<ul>标签,<ul>父元素为body
gallery.parentNode.insertBefore(placeholder,gallery);//在body的#placeholder<img>前插入ul
gallery.parentNode.insertBefore(description,gallery);//在<p>标签前面插入ul
```

### 在现有元素后面插入一个新元素

**没有insertAfter()方法**

如何编写insertAfter()函数？

```javascript
function insertAfter(newElement,targetElement){ //新元素 目标元素
    var parent = targetElement.parentNode; //获取目标元素的父节点
    if (parent.lastChild == target.Element){ //检查目标元素是否其父元素的lastChild
        parent.appendChild(newElement); //是则追加到parent尾
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);//否则在目标元素的下一兄弟元素之前插入
    }
}
```

```javascript
function preparePlaceholder(){
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getelementById) return false;
    if(!document.getElementById("imagegallery")) return false; //如果不支持
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","../img/placeholder.gif");
    placeholder.setAttribute("alt","my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("Choose an image");
    description.append(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder,gallery); //把gallery(更换图片的img)插入到图片列表之后
    insertAfter(description,placeholder); //把<p>标签插入到gallery之后
}
```

```javascript
//完整的showPic.js
function addLoadEvent(func){
    var oldonload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
//添加<p id="description">标签以及<img id="placeholder" src="" alt="">
function preparePlaceholder(){
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("src","../img/placeholder.gif");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("alt","my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);
}
function prepareGallery(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++ ){
        links[i].onclick = function(){
            return showPic(this);
        }
        links[i].onkeypress = links[i].onclick;
    }
}
function showPic(whichpic){
    if(!document.getElementById("placeholder")) return true;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src",source);
    if(!document.getElementById("description")) return false;
    if(whichpic.getAttribute("title")){
        var text = whichpic.getAttribute("title");
    }else{
        var text = "";
    }
    var description = document.getElementById("description");
    if(description.firstChild.nodeType == 3){
        description.firstChild.nodeValue = text;
    }
    return false;
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
```

