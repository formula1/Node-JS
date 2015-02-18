var aee = require('async-eventemitter');
var ee = require('events').EventEmitter;
var our_event = new ee();
var our_async_event = new aee();

our_async_event.on("the event!", function(e, next){
	console.log("Async Event has emitted!");
	setImmediate(next);
});
our_async_event.on("the event!", function(e, next){
	console.log("Another Async Event has emitted!");
	setImmediate(next);
});

console.log("we're in the main");
for(var counter=1;counter<4;counter++)
	console.log("counting = "+counter);

var ending = process.hrtime()[0]+2;
while(process.hrtime()[0] < ending)
	if(process.hrtime()[1]%333333333 <15000)console.log("wait for it");

our_function();
console.log("Back in the Main");

our_event.once("the event!", function(){
	console.log("Event has emitted!");
});
our_event.once("the event!", function(){
	console.log("Another Event has emitted!");
});

process.nextTick(function(){
	console.log("this happened the next Tick"); 
	our_event.emit("the event!");
	console.log("Back in the Process");
	our_async_event.emit("the event!");
	console.log("Still in the Process");
});
console.log("still in the main");

function our_function(){
	console.log("we're in the function");
}

