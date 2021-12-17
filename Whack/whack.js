const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('.btn');
let lastHole;
let lastE;
let timeUp = false;
let score = 0;


function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
	const idx = Math.floor(Math.random() * holes.length);
	const hole= holes[idx];
	if (hole === lastHole) {
		randomHole(holes);
	}

	lastHole = hole;
	return hole;
}

function peep() {
	const time = randomTime(500, 1000);
	const hole = randomHole(holes);
	hole.classList.add('up');
	setTimeout(() => {
		hole.classList.remove('up');
		if (!timeUp) peep();
		}, time);
	if(timeUp) startBtn.textContent = 'Start';
}

function startGame() {
	score = 0;
	scoreBoard.textContent = 0;
	timeUp = false;
	startBtn.textContent = 'Whack';
	setTimeout(() => timeUp = true, 20000);
	peep();
}

function bonk(e) {
	this.classList.remove('up');
	score++;
	scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));

