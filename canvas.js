var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var frog = new Image();
frog.src = "frogger-images.png";
var sx = 200;
var sy = 490;
var swidth = 55;
var sheight = 100;
var x = 50;
var y = 440;
var width = 50;
var height = 80;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var up = true;
var down = true;
var right = true;
var left = true;



const keyDownHandler = e => {
    switch (e.keyCode) {
        case 39:
        rightPressed = true;
        break;
        case 37:
        leftPressed = true;
        break;
        case 38:
        upPressed = true;
        break;
        case 40: 
        downPressed = true;
        break;
    }
}

const keyUpHandler = e => {
    switch (e.keyCode) {
        case 39:
        rightPressed = false;
        break;
        case 37:
        leftPressed = false;
        break;
        case 38:
        upPressed = false;
        break;
        case 40: 
        downPressed = false;
        break;
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

const drawBackground = () => {
    // two strips of grass
    ctx.fillStyle = "lime";
    ctx.fillRect(0, 440, 570, 45);
    ctx.fillRect(0, 220, 570, 45);

    //road lines
    ctx.beginPath();
    ctx.moveTo(0,395);
    ctx.lineTo(570, 395);
    ctx.strokeStyle = "white";
    ctx.setLineDash([12]);
    ctx.strokeWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,350);
    ctx.lineTo(570, 350);
    ctx.strokeStyle = "white";
    ctx.setLineDash([0]);
    ctx.strokeWidth = 4;
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(0,305);
    ctx.lineTo(570, 305);
    ctx.strokeStyle = "white";
    ctx.setLineDash([12]);
    ctx.strokeWidth = 2;
    ctx.stroke();

    //water
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0, 570, 220);
}

const drawFrog = () => {
    ctx.drawImage(frog, sx, sy, swidth, sheight, x, y, width, height);
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawFrog();
    if (upPressed == true && up == true) {
        y = y - 44;
        up = false;
    }
    if (upPressed == false ) {
        up = true;
    }

    requestAnimationFrame(draw);
}

draw();

