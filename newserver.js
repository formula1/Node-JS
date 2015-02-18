var http=require("http");
var my_directory=__dirname; //current directory
var my_server=new http.Server();
my_server.on("request",function(request,response){
console.log(request.url);
response.end("LEARNING NODE JS IS FUN!!!!");

});

my_server.listen(3011);
