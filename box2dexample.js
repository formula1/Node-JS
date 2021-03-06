var b2d = require("box2d");

// Define world
var worldAABB = new b2d.b2AABB();
worldAABB.lowerBound.Set(-100.0, -100.0);
worldAABB.upperBound.Set(100.0, 100.0);

var gravity = new b2d.b2Vec2(0.0, -9.8);
var doSleep = true;

var world = new b2d.b2World(worldAABB, gravity, doSleep);

// Ground Box
var groundBodyDef = new b2d.b2BodyDef();
groundBodyDef.position.Set(0.0, -100.0);

var groundBody = world.CreateBody(groundBodyDef);

var groundShapeDef = new b2d.b2PolygonDef();
groundShapeDef.SetAsBox(50.0, 10.0);

groundBody.CreateShape(groundShapeDef);

// Dynamic Body
var bodyDef = new b2d.b2BodyDef();
bodyDef.position.Set(0.0, 0.0);

var body = world.CreateBody(bodyDef);

var shapeDef = new b2d.b2PolygonDef();
shapeDef.SetAsBox(1.0, 1.0);
shapeDef.density = 1.0;
shapeDef.friction = 0.3;
body.CreateShape(shapeDef);
body.SetMassFromShapes();

// Run Simulation!
var timeStep = 1.0 / 60.0;

var iterations = 10;

//for (var i=0; i < 60; i++) {
var i=0;
function doStep(){
    i++; if(i === 60) process.exit();
    world.Step(timeStep, iterations);
    var position = body.GetPosition();
    var angle = body.GetAngle();
    console.log(i+": <"+position.x+", "+position.y+"> @"+angle);
    setTimeout(doStep, 1000*timeStep);
}

setTimeout(doStep, 1000*timeStep);
