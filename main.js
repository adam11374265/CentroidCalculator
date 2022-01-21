var mainCanvas = document.querySelector('canvas');
var context = mainCanvas.getContext('2d');
var position = [0, 0];
var drawMode = 'Rectangle';
mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;
window.addEventListener('mousemove', (event) => {position = [event.clientX, event.clientY]});
window.addEventListener('keypress', updateDrawMode);

function updateDrawMode(event)
{
	switch(event.code)
	{
		case 'KeyC':
			drawMode = 'Circle';
			break;
		case 'KeyL':
			drawMode = 'Line';
			break;
		case 'KeyR':
			drawMode = 'Rectangle';
			break;
	}
}

function init()
{
	window.requestAnimationFrame(draw);
}

function draw()
{
	context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
	context.font = '16px courier';
	context.fillText('CURSOR POSITION: '+' ('+position[0]+', '+position[1]+')', 20, window.innerHeight-40);
	context.fillText('DRAW MODE: '+drawMode, 20, window.innerHeight-20);
	window.requestAnimationFrame(draw);
}

init();
