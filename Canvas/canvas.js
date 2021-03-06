const canvas = document.querySelector('#panel');
const sketchArea = canvas.height;

const ctx = canvas.getContext('2d'); // convention is to name the context 'ctx'
canvas.width = window.innerWidth;
canvas.height = sketchArea;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
	if(!isDrawing) return;
	e.preventDefault(); 
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];
	hue++;

	if (ctx.lineWidth >= 100 || ctx.lineWidth <= 10) {
		direction = !direction;
	};

	if (direction) {
		ctx.lineWidth++;
	} else {
		ctx.lineWidth--;
	};
};

canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

canvas.addEventListener('pointerdown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', () => isDrawing = false);
canvas.addEventListener('pointerout', () => isDrawing = false);

