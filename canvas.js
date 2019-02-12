var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var frog = new Image();
frog.src = "frogs.png";
var sx = 0;
var sy = 0;
var swidth = 56;
var sheight = 60;
var x = 30;
var y = 435;
var width = 55;
var height = 50;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var up = true;
var down = true;
var right = true;
var left = true;

var carsImage = new Image();
carsImage.src = "cars.png";

class Car {
    constructor(image, imageSrc, name, sxArray, x, y) {
        this.image = image;
        this.imageSrc = imageSrc;
        this.name = name;
        this.sx = 0;
        this.sxArray = sxArray;
        this.sy = 99;
        this.swidth = 140;
        this.sheight = 60;
        this.x = x
        this.y = y;
        this.width = 75;
        this.height = 30;
        }    
}

carOne = new Car(carsImage, carsImage.src, 'carOne', [0, 150, 300], 200, 400);
carTwo = new Car(carsImage, carsImage.src, 'carTwo', [0, 150, 300], 1800, 400);
carThree = new Car(carsImage, carsImage.src, 'carThree',[0, 150, 300], -200, 352);
carFour = new Car(carsImage, carsImage.src, 'carFour',[0, 150, 300], -600, 270);
carFive = new Car(carsImage, carsImage.src, 'carFive',[0, 150, 300], 400, 310);
carSix = new Car(carsImage, carsImage.src, 'carTwo',[0, 150, 300], 120, 355);

const cars = [carOne, carTwo, carThree, carFour, carFive, carSix]

var logsImage = new Image();
logsImage.src = "logs.png";

class Log {
    constructor(image, imageSrc, name, sxArray, x, y) {
        this.image = image;
        this.imageSrc = imageSrc;
        this.name = name;
        this.sx = 10;
        this.sxArray = sxArray;
        this.sy = 10;
        this.swidth = 200;
        this.sheight = 60;
        this.x = x
        this.y = y;
        this.width = 200;
        this.height = 35;
        }    
}

logOne = new Log(logsImage, logsImage.src, 'logOne', [0, 0, 0], 500, 40);
logTwo = new Log(logsImage, logsImage.src, 'logTwo', [0, 0, 0], 300, 85);
logThree = new Log(logsImage, logsImage.src, 'logThree',[0, 0, 0], 200, 130);
logFour = new Log(logsImage, logsImage.src, 'logFour',[0, 0, 0], 200, 175);

const logs = [logOne, logTwo, logThree, logFour];

function keyDownHandler(e) {
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
function keyUpHandler(e) {
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

function drawBackground() {
    // two strips of grass
    ctx.fillStyle = "lime";
    ctx.fillRect(0, 440, 570, 45);
    ctx.fillRect(0, 220, 570, 45);

    //road lines
    ctx.beginPath();
    ctx.moveTo(0, 395);
    ctx.lineTo(570, 395);
    ctx.strokeStyle = "white";
    ctx.setLineDash([12]);
    ctx.strokeWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 350);
    ctx.lineTo(570, 350);
    ctx.strokeStyle = "white";
    ctx.setLineDash([0]);
    ctx.strokeWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 305);
    ctx.lineTo(570, 305);
    ctx.strokeStyle = "white";
    ctx.setLineDash([12]);
    ctx.strokeWidth = 2;
    ctx.stroke();

    //water
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 570, 220);
}

function drawFrog() {
    ctx.drawImage(frog, sx, sy, swidth, sheight, x, y, width, height);
}

function drawCars() {
    cars.forEach(car => {
        ctx.drawImage(car.image, car.sx, car.sy, car.swidth, car.sheight, car.x, car.y, car.width, car.height);
        if (car.x < canvas.width + 100 ) {
            car.x += 0.5;
        } else { 
            car.x = -100;
            let randomValue = Math.floor(Math.random() * car.sxArray.length);
            car.sx = car.sxArray[randomValue];
            }
    })
}

function drawLogs() {
    let direction = -1;
    logs.forEach(log => {
        ctx.drawImage(log.image, log.sx, log.sy, log.swidth, log.sheight, log.x, log.y, log.width, log.height);
        direction < 0 ? direction = +0.1 : direction = -0.1;
        if (direction < 0) {
            log.x >  - 200 ? log.x += direction : log.x = canvas.width + 100;
        } else {
            log.x < canvas.width + 100 ? log.x += direction : log.x = -100;
        }
        // make the frog float on the logs
        if (log.x <= x + width  &&
                log.x + log.width >= x &&
                log.y + log.height >= y &&
                log.y <= y + height) {
                    x = x + direction;
                }

    })
}



function moveFrog() {
    if (upPressed == true && up == true && y > 20) {
        y = y - 44;
        up = false;
        sx = 0;
        sy = 0;
    }
    if (upPressed == false) {
        up = true;
    }
    if (downPressed == true && down == true && y < canvas.height - 80) {
        y = y + 44;
        down = false;
        sx = 0;
        sy = 0;        
    }
    if (downPressed == false) {
        down = true;
    }
    if (rightPressed == true && right == true && x + width < canvas.width) {
        x = x + 44;
        sx = 20;
        sy = 135;
        right = false;
    }
    if (rightPressed == false) {
        right = true;
    }
    if (leftPressed == true && left == true && x > 0) {
        x = x - 44;
        sx = 80;
        sy = 134;
        left = false;
    }
    if (leftPressed == false) {
        left = true;
    }
}

function runOver() {
    cars.forEach( car => {
        if (car.x <= x + width &&
            car.x + car.width >= x + (width / 1.5) &&
            car.y + car.height >= y + (height/2) &&
            car.y <= y + (height / 1.5) ) {
                y = 435;
            }
        })
} 

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawLogs();
    drawFrog();
    moveFrog();
    drawCars();
 
    runOver();
    requestAnimationFrame(draw);
}

draw();

