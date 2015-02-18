var http=require("http");
var fs=require("fs");
var url=require("url");
var my_directory=__dirname; //current directory


var my_server=new http.Server();
my_server.on("request",function(request,response){
	console.log(request.url);
	var parsed_url=url.parse(request.url);
	console.log(parsed_url);
	var path=parsed_url.pathname;
	console.log (path);
	var arrayofstrings=path.split("/");
	console.log (arrayofstrings);
	var firstpath=arrayofstrings[0];
	var secondpath=arrayofstrings[1];
	var readstream=fs.createReadStream(my_directory+"/"+secondpath);

	response.statusCode = 200;
	response.setHeader("Content-Type","application/javascript");
	readstream.pipe(response);
	readstream.on("error",function (e) {
		console.log(e.stack);
		response.statusCode= 500;
		response.end(e.message);

		// body...
	});

});

my_server.listen(3011);
