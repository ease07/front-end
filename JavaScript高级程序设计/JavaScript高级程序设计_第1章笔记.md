# JavaScript高级程序设计(第三版)

## 第一章  JavaScript实现

**JavaScript组成部分**:专为网页设计而涉及的脚本语言

- 核心(ECMA Script)
- 文档对象模型(DOM)
- 浏览器对象模型(BOM)

**ECMAScript**

宿主环境：提供基本ECMA Script实现，同时提供该语言扩展，以便语言与环境之间对接交互。

ECMA-262标准规定ECMAScript以下组成部分：

- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 对象

ECMAScript是对实现该标准规定的各个方面内容的语言的描述

文档对象模型DOM:针对XML但经过扩展用于HTML的应用程序编程接口(API,Application Programming Interface).

DOM把整个页映射成一个多层节点结构

***W3C(World Wide Web Consortium,万维网联盟)***

**DOM级别**

***DOM1*级**：组成DOM Core & DOM HTML ；目标：映射文档结构

***DOM2级***：扩充鼠标和用户界面事件、范围、遍历等；通过对象接口增加对CSS的支持；

   引入以下新模块：

- **DOM视图 *DOM Views***：定义了跟踪不同文档视图的接口(比如CSS之前和之后的文档)
- **DOM事件 *DOM Events***:定义事件和事件处理的接口
- **DOM样式 *DOM Style***:定义了事件和事件处理的接口
- **DOM的遍历和范围 *DOM Traversal and Range***:定义遍历和操作文档树的接口

***DOM3级***：引入以统一方式加载和保存文档的方法-在DOM Load and Save模块中定义

​				 新增验证文档的方法-在DOM验证(DOM Validation)模块中定义

***其他DOM标准***

- SVG(可伸缩矢量图，Mathematical Vector Graphic)
- MathML(数学标记语言，Mathematical Markup Language)
- SMIL(同步多媒体集成语言，Synchronized Multimedia Integration Language)

**BOM** 无标准遵循

访问&操作浏览器窗口的浏览器对象模型，处理浏览器窗口和框架。

一些扩展：

- 弹出浏览器窗口
- 移动、缩放、关闭浏览器窗口
- 提供浏览器详细信息的navigator对象
- 提供浏览器所加载页面的详细信息的location对象
- 提供用户显示器分辨率详细信息的screen对象
- 对cookies的支持
- 类似XMLHttpRequest和IE的ActiveXObject自定义对象
