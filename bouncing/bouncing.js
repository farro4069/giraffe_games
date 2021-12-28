const canvas = document.getElementById('game-board');
const moreBalls = document.querySelector('.more');
const sameBalls = document.querySelector('.steady');

let c = canvas.getContext("2d");
let tx = window.innerWidth;
let ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;
const gravity = 0.99;
const tooManyBalls = 4;
let moreNMore = 1;

let mousex = 0;
let mousey = 0;

addEventListener('mousemove', function () {
	mousex = event.clientX;
	mousey = event.clientY;
});



c.strokeWidth = 5;

function randomColor() {
	return('hsla(') + 
	Math.round(Math.random() * 360) +
	', 70%, 50%, 0.9)';
};

function Ball() {
	this.color = randomColor();
	this.radius = Math.random() * 20 + 14;
	this.startradius = this.radius;
	this.x = Math.random() * (tx - this.radius);
	this.y = Math.random() * (ty - this.radius);
	this.dy = Math.random() * 2;
	this.dx = Math.round((Math.random() - 0.5) * 10);
	this.vel = Math.random() /5;
	this.update = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.fillStyle = this.color;
		c.fill();
	};
}

let bal = [];
for (let i = 0; i < tooManyBalls; i++) {
	bal.push(new Ball());
}

function animate() {
	if (tx != window.innerWidth || ty != window.innerHeight) {
		tx = window.innerWidth;
		ty = window.innerHeight;
		canvas.width = tx;
		canvas.height = ty;
	}
	requestAnimationFrame(animate);
	c.clearRect(0, 0, tx, ty);
	for (i = 0; i < bal.length; i++) {
		bal[i].update();
		bal[i].y += bal[i].dy;
		bal[i].x += bal[i].dx;
		if (bal[i].y + bal[i].radius >= ty) {
			bal[i].dy = -bal[i].dy * gravity;
		} else {
			bal[i].dy += bal[i].vel;
		}
		if (bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0) {
			bal[i].dx = -bal[i].dx;
		}
		if (mousex > bal[i].x - 20 &&
			mousex < bal[i].x + 20 && 
			mousey > bal[i].y - 50 &&
			mousey < bal[i].y + 50 &&
			bal[i].radius < 70) {
			bal[i].radius += 5;
		} else {
			if (bal[i].radius > bal[i].startradius) {
				bal[i].radius += -5;
			}
		}
	}
}

animate();

setInterval(function(){
	bal.push(new Ball());
	bal.splice(0, moreNMore);
}, 400);

function population() {
	if(moreNMore >= 1 ) { 
		moreNMore = 0;
		moreBalls.innerText = "fewer";
	} else {
		moreNMore = 2;
		moreBalls.innerText = "more";
	}
}

moreBalls.addEventListener('click', population);
sameBalls.addEventListener('click', function() { moreNMore = 1 });
