var mainCanvas = document.querySelector('canvas');
var context = mainCanvas.getContext('2d');
mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;

context.font = '16px courier';
context.fillText('DRAW MODE: ', 20, window.innerHeight-20);
