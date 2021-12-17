const keys = document.querySelectorAll('.key');



function playSound(e) {
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	if(!audio) return;
	audio.currentTime = 0;
	audio.play();
	key.classList.add('playing');
};

function removeTransition(e) {
	if(e.propertyName !== 'transform') return;
	this.classList.remove('playing');
}

function noise(e) {
	const key = document.querySelector(`.key[data-key="${e.target.dataset.key}"]`);
	const audio = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`);
	if(!audio) return;
	audio.currentTime = 0;
	audio.play();
	key.classList.add('playing');
};


window.addEventListener('keydown', playSound);

keys.forEach(key => key.addEventListener('transitionend', removeTransition));
keys.forEach(pad => pad.addEventListener('click', noise, { capture: true }));
