// *********************************** Declare variables
var lastRenderTime = 0;
const snakeSpeed = 6;
const snakeBody = [
	{x: 11, y:11},
	];
const snakeGrow = 4;
const gameBoard = document.getElementById('game-board');
const gridSize = 21;
var inputDirection = {x: 0, y: 0};
var lastInputDirection = {x: 0, y: 0};
var food = getRandomFoodPosition();
var newSegments = 0;
var newFoodPosition;
var gameOver = false;


// *********************************** Snake functions

function updateSnake() {
	addSegments();
	for (var i = snakeBody.length - 2; i >= 0; i-- ) {
		snakeBody[i+1] = { ...snakeBody[i] }
	}
	const inputDirection = getInputDirection();
	snakeBody[0].x += inputDirection.x;
	snakeBody[0].y += inputDirection.y;
}

function drawSnake(gameBoard) {
	snakeBody.forEach(segment => {
		const snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = segment.y;
		snakeElement.style.gridColumnStart = segment.x;
		snakeElement.classList.add('snake');
		gameBoard.appendChild(snakeElement);
	});
}

function growSnake(amount) {
	newSegments += amount;
}

function onSnake(position, { ignoreHead = false } = {}) {
	return snakeBody.some((segment, index) => {
		if (ignoreHead && index === 0 ) return false;
		return equalPositions(segment, position);
	});
};

function addSegments() {
	for (let i = 0; i < newSegments; i++) {
		snakeBody.push({...snakeBody[snakeBody.length - 1]});
	}
	newSegments = 0;
}

function snakeIntersect() {
	return onSnake(snakeBody[0], {ignoreHead: true });
}


// *********************************** Food functions

function updateFood() {
	if (onSnake(food)) {
		growSnake(snakeGrow);
		food = getRandomFoodPosition();
	}
}

function drawFood(gameBoard) {
	const foodElement = document.createElement('div');
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add('food');
	gameBoard.appendChild(foodElement);
}

function equalPositions(pos1, pos2) {
	return pos1.x === pos2.x && pos1.y === pos2.y
}

function getRandomFoodPosition() {
	while (newFoodPosition == null || onSnake(newFoodPosition)) {
		newFoodPosition = randomGridPosition();
	};
	return newFoodPosition;
};


// *********************************** Inputs

function getInputDirection() {
	lastInputDirection = inputDirection;
	return inputDirection;
}


// *********************************** Main loop *****************************

function main(currentTime) {
	if (gameOver) {
		if (confirm('You lost. Press ok to restart.')) {
			window.location = '#';
		}
		return
	}
	window.requestAnimationFrame(main);
	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
	if (secondsSinceLastRender < 1 / snakeSpeed) return;

	lastRenderTime = currentTime;
	update();
	draw();
}

window.requestAnimationFrame(main);

function update() {
	updateSnake();
	updateFood();
	checkDeath();
};

function draw() {
	gameBoard.innerHTML = "";
	drawSnake(gameBoard);
	drawFood(gameBoard);
};

function checkDeath() {
	gameOver = outsideGrid(snakeBody[0]) || snakeIntersect();
}

// *********************************** Grid functions *************************

function randomGridPosition() {
	return {
		x: Math.floor(Math.random() * gridSize) + 1,
		y: Math.floor(Math.random() * gridSize) + 1
	}
}

function outsideGrid(position) {
	return (
		position.x < 1 || position.x > gridSize ||
		position.y < 1 || position.y > gridSize
		)
};


// *********************************** Event Listeners
window.addEventListener('keydown', e=> {
	switch (e.key) {
		case 'ArrowUp': 
			if (lastInputDirection.y !== 0) break;
			inputDirection = { x: 0, y: -1 };
			break
		case 'ArrowDown': 
			if (lastInputDirection.y !== 0) break;
			inputDirection = { x: 0, y: 1 };
			break;
		case 'ArrowLeft': 
			if (lastInputDirection.x !== 0) break;
			inputDirection = { x: -1, y: 0 };
			break;
		case 'ArrowRight': 
			if (lastInputDirection.x !== 0) break;
			inputDirection = { x: 1, y: 0 };
			break;
	}
})


