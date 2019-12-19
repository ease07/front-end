var f= require('fs');

//参数1.文件路径 2.文件内容 3.回调函数 
//成功：文件写入成功 error->null
//失败： 文件写入失败 error->错误对象
f.writeFile('./Nihao.md', 'hello node', function(error){
	if(error){
		console.log('写入失败');
	}else{
		console.log('写入成功');
	}
});