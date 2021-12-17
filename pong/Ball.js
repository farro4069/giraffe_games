// Ball class functions

function update(delta) {
	return
}

export default class Ball {
	constructor(ballElem) {
		this.ballElem = ballElem;
	}

	get x() {
		return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'));
	};

	set x(value) {
		this.ballElem.style.setProperty('--x', value);
	};

	function ballUpdate(delta) {
		this.x = 5;
	}
};



