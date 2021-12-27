// **********************************  Declare variables

const initialVelocity = 0.1;
const increaseVelocity = 0.001;
const game = document.querySelector('.game');
const paddleSpeed = 0.005;
const scorePlayerElem = document.querySelector('.score__player');
const scoreComputerElem = document.querySelector('.score__computer');
const audio = document.querySelector('audio');
var scorePlayer = 0;
var scoreComputer = 0;

// ********************************* Ball class functions

class Ball {
	constructor(ballElem) {
		this.ballElem = ballElem;
		this.resetBall();
	}

	get x() {
		return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'));
	};

	set x(value) {
		this.ballElem.style.setProperty('--x', value);
	};

	get y() {
		return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'));
	};

	set y(value) {
		this.ballElem.style.setProperty('--y', value);
	};

	rect() {
		return this.ballElem.getBoundingClientRect();
	}

	resetBall() {
		this.x = 50;
		this.y = 50;
		this.direction = { x: 0, y: 0 };
		while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
			const heading = randomNumberBetween(0, 2 * Math.PI);
			this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
		}

		this.velocity = initialVelocity;
	}

	updateBall(delta, paddleRects) {
		this.x += this.direction.x * this.velocity * delta;
		this.y += this.direction.y * this.velocity * delta;
		const rect = this.rect();
		if (rect.bottom >= (game.offsetHeight + game.offsetTop) || rect.top <= game.offsetTop) {
			this.direction.y *= -1;
		};
		if (paddleRects.some(r => isCollision(r, rect))) {
			this.direction.x *= -1;
			audio.currentTime = 0.05;
			audio.play();
			// this.ballElem.style.setProperty('--ball', this.y * 5 );
		}
	}
};

function isCollision(rect1, rect2) {
	return (rect1.left <= rect2.right && 
		rect1.right >= rect2.left && 
		rect1.top <= rect2.bottom && 
		rect1.bottom >= rect2.top
		)
};

// ******************************** Paddle class functions

class Paddle {
	constructor(paddleElem) {
		this.paddleElem = paddleElem;
		this.resetPaddle();
	}

	get position() {
		return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue('--position'));
	}

	set position(value) {
		this.paddleElem.style.setProperty("--position", value);
	}

	rect() {
		return this.paddleElem.getBoundingClientRect();
	}

	resetPaddle() {
		this.position = 50;
	}

	updatePaddle(delta, ballHeight) {
		this.position += paddleSpeed * delta * (ballHeight - this.position);
	}

}




// ******************************** Helper functions


function randomNumberBetween(min, max) {
	return Math.random() * (max - min) + min;
};


// ****************************** Main game running 

const ball = new Ball(document.getElementById('ball'));
const paddlePlayer = new Paddle(document.getElementById('paddle__player'));
const paddleComputer = new Paddle(document.getElementById('paddle__computer'));


let lastTime;

function update(time) {
	if (lastTime != null) {
		const delta = time - lastTime;
		ball.updateBall(delta, [paddlePlayer.rect(), paddleComputer.rect()]);
		paddleComputer.updatePaddle(delta, ball.y);

		if (isLose()) handleLose()
	};

	lastTime = time;
	if (scorePlayer <= 20 && scoreComputer <= 20) {
	window.requestAnimationFrame(update);
	}
}

function startGame() {
	scorePlayer = 0;
	scoreComputer = 0;
	window.requestAnimationFrame(update);
}

function isLose() {
	const rect = ball.rect();
	return rect.right >= (game.offsetWidth + game.offsetLeft) || rect.left <= game.offsetLeft;

}

function handleLose() {
	const rect = ball.rect();
	if(rect.right >= (game.offsetWidth + game.offsetLeft)) {
		scorePlayer += 1;
		scorePlayerElem.textContent = scorePlayer;
	} else scoreComputer += 1;
		scoreComputerElem.textContent = scoreComputer;

	ball.resetBall();
	paddleComputer.resetPaddle();
}


// *********************************  Event listeners

window.addEventListener('mousemove', e => {
	paddlePlayer.position = (((e.y - game.offsetTop)/ game.offsetHeight) * 100);
});

window.addEventListener('pointermove', e => {
	paddlePlayer.position = (((e.y - game.offsetTop)/ game.offsetHeight) * 100);
});
