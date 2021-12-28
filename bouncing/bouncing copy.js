// *********************************** Declare variables
const gameBoard = document.getElementById('game-board');
const leftWall = gameBoard.offsetLeft;
const ballElement = document.querySelector('.ball');
let ball = [];
const howManyBalls = 5;
const gravity = 0.98;
let downUp = 1; 
// console.log(gameBoard);


// *********************************** Ball functions ***********************
function Ball( x ,y, size ) {
	this.x = x;
	this.y = y;
	this.size = size;
}

Ball.prototype = {
	fallBall: function() { return "falling" },
	bounce: function() { return "bounce" },
	hit: function() { return 'Hit the wall' }
};

function newBalls() {
	for (i=0; i < howManyBalls; i++) {
		let newBall = new Ball(200 + 10*i, 200 + 20, 200);
		ball.push(newBall);
	}
	// console.log(ball);
}

	// get x() {
	// 	return parseFloat(getComputedStyle(this.ball).getPropertyValue('--x'));
	// };

	// set x(value) {
	// 	this.ball.style.setProperty('--x', value);
	// };


function addBall() {
	gameBoard.appendChild(ballElement);
}

function fallBall(delta, ) {
	//once each interval
	console.log('fallBall');
	velocity *= gravity * delta;
	return acrossRate = Math.random() * 5; 
}

function bounceBall() {
	velocity *= -1;
	return console.log('who called this?')
}

// *********************************** Inputs *******************************



// *********************************** Main loop *****************************

newBalls();
addBall();

let lastTime;
function update(time) {
	if (lastTime != null) {
		const delta = time - lastTime;
		ball.fallBall(delta);
	};
	lastTime = time;
}

window.requestAnimationFrame(update);



// *********************************** Event Listeners ***********************
