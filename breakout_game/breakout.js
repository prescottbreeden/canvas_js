let ctx = document.getElementById('ctx').getContext('2d');
const WIDTH=500;
const HEIGHT=500;
ctx.font = '2rem Calibri';
let intervalVar;
let fps = 20;

let ball = {
	x: 0,
	y: 0,
	radius: 5,
	color: 'blue'
};

let base = {
	x: 0,
	y: 400,
	height: 20,
	width: 100,
	color: 'red',
	pressingLeft: false,
	pressingRight: false
};

document.onkeydown = (event) => {
	if(event.keyCode === 37) {
		base.pressingLeft = true;	
		base.pressingRight = false;
	}
	if(event.keyCode === 39) {
		base.pressingRight = true;	
		base.pressingLeft = false;
	}
}

document.onkeyup = (event) => {
	if(event.keyCode === 37) {
		base.pressingLeft = false;
	} else if(event.keyCode === 39) {
		base.pressingRight = false;
	}
}

drawBall = () => {
	ctx.save();
	ctx.fillStyle = ball.color;
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
	ctx.fill();
	ctx.restore();
}

drawBase = () => {
	ctx.save();
	ctx.fillStyle = base.color;
	ctx.fillRect(base.x, base.y, base.width, base.height);
	ctx.restore();
}

updateBasePosition = () => {
	if(base.pressingLeft) {
		base.x -= 5;
	}
	if(base.pressingRight) {
		base.x += 5;
	}
	if(base.x < 0) {
		base.x = 0;
	}
	if(base.x > WIDTH-base.width) {
		base.x = WIDTH-base.width;
	}
}

updateAll = () => {
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	updateBasePosition();
	drawBall();
	drawBase();
}

startGame = () => {
	base.x = 150;
	ball.x = base.x + 100;
	ball.y = base.y -100;
	intervalVar = setInterval(updateAll, fps);
}

startGame();
