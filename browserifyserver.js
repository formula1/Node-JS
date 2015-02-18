var http=require("http");
var browserify = require('browserify');
var url=require("url");

var my_server=new http.Server();
my_server.on("request",function(request,response){
  var parsed_url=url.parse(request.url);
  var path=parsed_url.pathname.split("/");
  if(path[1] !== "nm"){
    response.statusCode = 404;
    return response.end("Not found");
  }

  response.statusCode = 200;
  response.setHeader("Content-Type","application/javascript");
  var b = browserify();
  b.require(path[2], {expose: path[2]});
  var stream = b.bundle();
  stream.pipe(response);
  stream.on("error",function (e) {
    console.log(e.stack);
    response.statusCode= 500;
    response.end(e.message);
  });

});

my_server.listen(3011);
console.log("BROWSERIFY SERVER RUNNING AT http://localhost:3011");
