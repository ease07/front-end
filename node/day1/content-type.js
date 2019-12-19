// var foo = 'foo';

// exports.foo ="hhhhh";

// exports.add = function(a, b){
// 	return a + b;
// };

// exports.readfile = function(path, callback){
// 	console.log('文件路径', path);
// };

var http = require('http');

var server = http.createServer();

server.on('request', function(req, res){
	var url = req.url;
	if(url === '/plain'){
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.end('hello 世界');
	}else if(url === '/html'){
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.end('<strong>hello html<a href="http://www.baidu.com">click</a></strong>');
	}
});

server.listen(5000, function(){
	console.log('Server is running');
});