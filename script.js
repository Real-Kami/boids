// preparing canvas

let canvas = document.getElementById("displayer");
let c = canvas.getContext("2d");

// declarations

let speed = 1;
let size = 5;
let mouseX = 0;
let mouseY = 0;
let listBoids = [];
for (a = 0;a < 200;a++) {
	let newObject = {};
	newObject.x = Math.floor(Math.random()*canvas.width);
	newObject.y = Math.floor(Math.random()*canvas.height);
	newObject.dir = Math.floor(Math.random()*360);
	newObject.r = Math.random()*255;
	newObject.g = Math.random()*255;
	newObject.b = Math.random()*255;
	newObject.speed = Math.random()*size+0.5;
	listBoids.push(newObject);
}
let pi = Math.PI;
let dissidence = 0;

// functions

document.addEventListener("mousedown",clickHandler);
document.addEventListener("keyup",keyHandler);
document.addEventListener("mousemove",mousemoveHandler)

function mousemoveHandler() {
	mouseX = event.pageX
	mouseY = event.pageY
}

function keyHandler() {
	listBoids.splice(0,20);
}

function clickHandler() {
	for (a = 0;a < 20;a++) {
	let newObject = {};
	newObject.x = event.pageX;
	newObject.y = event.pageY;
	newObject.dir = Math.floor(Math.random()*360);
	newObject.r = Math.random()*255;
	newObject.g = Math.random()*255;
	newObject.b = Math.random()*255;
	newObject.speed = Math.random()*size+0.5;
	listBoids.push(newObject)
	}
}

function render() {
	dissidence = dissidence + 0.000001;
	for (a = 0;a < listBoids.length;a++) {
		c.fillStyle = "rgb("+ listBoids[a].r +","+ listBoids[a].g +","+ listBoids[a].b +")"
		c.fillRect(listBoids[a].x,listBoids[a].y,size,size)
	}
	for (a = 0;a < listBoids.length;a++) {
		listBoids[a].x += Math.cos(listBoids[a].dir)*listBoids[a].speed;
		listBoids[a].y += Math.sin(listBoids[a].dir)*listBoids[a].speed;
	}
	for (a = 0;a < listBoids.length;a++) {
		if (listBoids[a].x > canvas.width) {
			listBoids[a].x = 0;
		}
		if (listBoids[a].x < 0) {
			listBoids[a].x = canvas.width;
		}
		if (listBoids[a].y > canvas.height) {
			listBoids[a].y = 0;
		}
		if (listBoids[a].y < 0) {
			listBoids[a].y = canvas.height;
		}
		if (listBoids[a].speed > size) {
			listBoids[a].speed = size;
		}
	}
	for (a = 0;a < 75;a++) {
		listBoids[Math.floor(Math.random()*listBoids.length)].dir = (listBoids[a].dir + listBoids[Math.floor(Math.random()*listBoids.length)].dir) / 2;
		listBoids[Math.floor(Math.random()*listBoids.length)].speed += Math.random() - Math.random();
	}
	for (a = 0;a < 100;a++) {
		listBoids[Math.floor(Math.random()*listBoids.length)].r = listBoids[Math.floor(Math.random()*listBoids.length)].r;
		listBoids[Math.floor(Math.random()*listBoids.length)].g = listBoids[Math.floor(Math.random()*listBoids.length)].g;
		listBoids[Math.floor(Math.random()*listBoids.length)].b = listBoids[Math.floor(Math.random()*listBoids.length)].b;
	}
	for (a = 0;a < listBoids.length;a++) {
		listBoids[a].dir += (Math.random() + (-1 * Math.random())) * dissidence + 0.001;
	}
	c.fillStyle = "RGBA(0,0,0,0.1)"
	c.fillRect(0,0,9999,9999);
	c.fillStyle = "white";
	c.font = "30px Arial"
	c.fillText(Math.floor(dissidence*10000),50,50)
}

// game engine

window.onresize = resizeHandler;
function resizeHandler() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
resizeHandler();
c.fillStyle = "black"
c.fillRect(0,0,9999,9999)
const gameEngine = setInterval(render,1);