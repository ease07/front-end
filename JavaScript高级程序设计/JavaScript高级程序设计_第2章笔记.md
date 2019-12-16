# JavaScript高级程序设计(第三版)

## 第二章  在HTML中使用JavaScript

### **\<script>元素**

\<script>元素 使用方法有两种：

1. 嵌入文件内部

   ```html
   <script>
       function sayHi(){
       alert("Hi!");
   }
   </script>    
   ```

2. 指向外部文件

   ```html
   <script type="text/javascript" src="example.js"></script>
   ```

**标签位置**：</body>之前

**延迟脚本**：HTML 4.01 定义了defer属性

​				表明脚本在执行时不会影响页面构造，即<u>*脚本会被延迟到等整个页面解析完毕后再运行*</u>。

```html
<!--设置defer属性即告诉浏览器立即下载，但延迟执行。-->
<script type="text/javascript" defer="defer" src="example.js"></script>
```

​		第一个延迟脚本先于第二个延迟脚本执行，但两个脚本都先于DOMContentLoaded事件执行($13).

现实生活中，延迟脚本不一定按顺序执行(理论上是)，因此最好只包含一个延迟脚本。放在页面底部是最佳选择。

**异步脚本**：HTML5定义了async属性

​				 类似defer属性，不同于：async不保证按照指定的先后顺序执行

```html
<script type="text/javascript" async src="example.js"></script>
```

目的：不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。so,建议异步脚本不要在加载期间修改DOM.

​		异步脚本一定在load事件前执行，但可能会在DOMContentLoaded事件触发之前或之后执行

**在XHTML中的用法**

XHTML可扩展超文本标记语言(Extensible HyperText Markup Language)

使用HTML实体/CData标记处理 特殊字符，eg:<，>等

### 使用外部文件优点：

1. 可维护性：遍及不同HTML页面的JavaScript会造成维护问题。把所有JS文件放在一个文件夹则使开发人员能在不触及HTML标记的情况下集中精力遍及代码。

2. 可缓存：浏览器能根据具体的设置，缓存link的所有外部JS文件。

   ​			 即若有两个页面使用同一个文件，那么这个文件只需要下载一次。所以最终能加快页面加载的速度。

3. 适应未来：通过外部文件来包含JS无需考虑XHTML或注释hack。

### 文档模式

- 混杂模式quirks mode
- 标准模式standards mode
- 准标准模式almost standards mode

### \<noscript>元素

在以下情况显示：

- 浏览器不支持脚本
- 浏览器支持脚本，但脚本被禁用

在启用脚本的浏览器下永不显示