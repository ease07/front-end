//1.使用require方法加载fs核心模块
var fs = require('fs');

//2.读取文件
//两个参数
//1>文件路径
//2>回调函数  读取成功：data->数据 error->null
//			  读取失败：data->null error->错误对象

fs.readFile('./node.js.md', function(error, data){
	//数据二进制转了16进制
	console.log(data);
	console.log(data.toString());
});
