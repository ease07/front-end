//构建web服务器
//node中提供了http模块 创建编写服务器

//1.加载http核心模块
var http = require('http')

//2.使用http.createServer()方法创建一个Web服务器 返回一个服务器实例
var server = http.createServer();

//3.服务器提供响应
//提供数据服务 发请求 接受请求 处理请求 给反馈(响应) 注册request事件->执行回调函数
//3.1request请求对象 请求对象用来获取客户端的请求信息 比如请求路径
//3.2response响应对象 给客户端发送响应信息
server.on('request', function(request, response){
	console.log('收到客户端的请求了,请求路径是' + request.url);
	// response.write('hello');
	// response.write(' node.js');
	// response.end();
	//response.end('hello node');

	var url = request.url;
	console.log("本地端口",request.socket.localPort);
	console.log("远程端口",request.socket.remotePort);
	if(url === '/'){
		var products = [
			{name:"金",value:30},
			{name:"水", value:40},
			{name:"水", value:50},
			{name:"火", value:70},
			{name:"土", value:100}
		];
		response.setHeader("Content-type", "application/json");
		response.end(JSON.stringify(products));
	}else if(url === '/login'){
		response.end('login page');
	}else{
		response.end('404 not Found');
	}
	//response.end(url);

})

//response对象中write方法给客户端发送响应数据，可使用多次但必须使用end结束响应， 否则客户端会一直等待


//4.绑定端口号， 启动服务器
server.listen(3000, function(){

	console.log('服务器启动成功,可通过http://127.0.0.1:3000/进行访问');
})

// var os = require('os');
// console.log(os.cpus());
// console.log(os.totalmem(),"bytes");

// var path = require('path');
// console.log(path.extname('C:a/b/c/d/hello.txt'));

// require('./readfile');
// require('./writefile');
// console.log('end');

// var bExports = require('./a');

// console.log(bExports.add(20,50));

// bExports.readfile('./a.js');