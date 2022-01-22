var mainCanvas = document.querySelector('canvas');
var context = mainCanvas.getContext('2d');
var position = [0, 0];
var drawMode = 'Rectangle';
var followCursor = false;
var shapes = [];
var anchor0 = [0, 0];
var anchor1 = [0, 0];
mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;
window.addEventListener('mousemove', (event) => {position = [event.clientX, event.clientY]});
window.addEventListener('keypress', updateDrawMode);
window.addEventListener('click', updateAnchors);

function updateAnchors(event)
{
	followCursor=!followCursor;
	if(followCursor)
	{
		anchor0 = position;
	}
	else
	{
		anchor1 = position;
		switch(drawMode)
		{
			case 'Line':
				shapes[shapes.length]=['l',anchor0,anchor1];
				break;
			case 'Rectangle':
				shapes[shapes.length]=['r',anchor0,anchor1];
				break;
			case 'Circle':
				shapes[shapes.length]=['c',anchor0,anchor1];
				break;
		}
	}
}

function updateDrawMode(event)
{
	followCursor = false;
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
	context.fillText('CURSOR POSITION: '+'('+position[0]+', '+position[1]+')', 20, window.innerHeight-40);
	context.fillText('DRAW MODE: '+drawMode, 20, window.innerHeight-20);

	for(let x in shapes)
	{
		switch(shapes[x][0])
		{
			case 'l':
				context.beginPath();
				context.moveTo(...shapes[x][1]);
				context.lineTo(...shapes[x][2]);
				context.stroke();
				break;
			case 'r':
				context.beginPath();
				context.rect(...shapes[x][1], shapes[x][2][0]-shapes[x][1][0], shapes[x][2][1]-shapes[x][1][1]);
				context.stroke();
				break;
			case 'c':
				context.beginPath();
				context.arc(...shapes[x][1], ((shapes[x][2][0]-shapes[x][1][0])**2+(shapes[x][2][1]-shapes[x][1][1])**2)**(1/2), 0, 2*Math.PI)
				context.stroke();
				break;
		}
	}

	if(followCursor)
	{
		switch(drawMode)
		{
			case 'Line':
				context.beginPath();
				context.moveTo(...anchor0);
				context.lineTo(...position);
				context.stroke();
				break;
			case 'Rectangle':
				context.beginPath();
				context.rect(...anchor0, position[0]-anchor0[0], position[1]-anchor0[1]);
				context.stroke();
				break;
			case 'Circle':
				context.beginPath();
				context.arc(...anchor0, ((position[0]-anchor0[0])**2+(position[1]-anchor0[1])**2)**(1/2), 0, 2*Math.PI);
				context.stroke();
				break;
		}
	}

	window.requestAnimationFrame(draw);
}

init();
