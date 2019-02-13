var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lives = 5;

const updateLives = () => {
    lives === 1 ? (alert("GAME OVER!"), lives = 5): lives--;   
}

var frog = new Image();
frog.src = "frogs.png";

var sx = 2;
var sy = 13;
var swidth = 55;
var sheight = 35;
var x = 30;
var y = 445;
var width = 52;
var height = 28;
var lastY = 445;

const setFrogStraight = () => {
    sx = 2;
    sy = 13;
    swidth = 55;
    sheight = 35;
    width = 52;
    height = 28;
}

const setFrogRight = () => {
    sx = 32;
    sy = 143;
    swidth = 35;
    sheight = 55;
    width = 28;
    height = 45;
}

const setFrogLeft = () => {
    sx = 88;
    sy = 140;
    swidth = 35;
    sheight = 53;
    width = 28;
    height = 45;
}


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
    constructor(image, imageSrc, name, x, y) {
        this.image = image;
        this.imageSrc = imageSrc;
        this.name = name;
        this.sxArray = [15, 160, 305];
        this.sx = this.sxArray[Math.floor(Math.random() * this.sxArray.length)]
        this.sy = 99;
        this.swidth = 127;
        this.sheight = 60;
        this.x = x
        this.y = y;
        this.width = 75;
        this.height = 30;
    }
}

carOne = new Car(carsImage, carsImage.src, 'carOne', 200, 400);
carTwo = new Car(carsImage, carsImage.src, 'carTwo', 1800, 400);
carThree = new Car(carsImage, carsImage.src, 'carThree', -200, 352);
carFour = new Car(carsImage, carsImage.src, 'carFour', -600, 270);
carFive = new Car(carsImage, carsImage.src, 'carFive', 400, 310);
carSix = new Car(carsImage, carsImage.src, 'carSix', 120, 355);

const cars = [carOne, carTwo, carThree, carFour, carFive, carSix];

var logsImage = new Image();
logsImage.src = "logs.png";

class Log {
    constructor(image, imageSrc, name, sxArray, x, y) {
        this.image = image;
        this.imageSrc = imageSrc;
        this.name = name;
        this.sx = 10;
        this.sxArray = sxArray;
        this.sy = 15;
        this.swidth = 200;
        this.sheight = 55;
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 30;
        this.direction = 0;
        this.frogFloat = false;
    }
}

logOne = new Log(logsImage, logsImage.src, 'logOne', [0, 0, 0], 500, 55);
logTwo = new Log(logsImage, logsImage.src, 'logTwo', [0, 0, 0], 300, 100);
logThree = new Log(logsImage, logsImage.src, 'logThree', [0, 0, 0], 200, 145);
logFour = new Log(logsImage, logsImage.src, 'logFour', [0, 0, 0], 200, 185);

var floatItems = [];
const logs = [logOne, logTwo, logThree, logFour];
logs.forEach( element => floatItems.push(element));

var turtleImageToLeft = new Image();
turtleImageToLeft.src = "turtlesToLeft.png";
var turtleImageToRight = new Image();
turtleImageToRight.src = "turtles.png";

class Turtle {
    constructor(image, imageSrc, name, sx, swidth, x, y) {
        this.image = image;
        this.imageSrc = imageSrc;
        this.name = name;
        this.sx = sx;
        this.sxArray = [];
        this.sy = 8;
        this.swidth = swidth;
        this.sheight = 100;
        this.x = x;
        this.y = y;
        this.width = 180;
        this.height = 55;
        this.direction = 0;
        this.frogFloat = false;
    }
}

turtleOne = new Turtle(turtleImageToLeft, turtleImageToLeft.src, 'TurtleOne', 230, 220, 200, 48);
turtleTwo = new Turtle(turtleImageToRight, turtleImageToRight.src, 'TurtleTwo', 10, 235, 0, 92);

const turtles = [turtleOne, turtleTwo];
turtles.forEach( element => floatItems.push(element));

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
        if (car.x < canvas.width + 100) {
            car.x += 0.2;
        } else {
            car.x = -100;
            let randomValue = Math.floor(Math.random() * car.sxArray.length);
            car.sx = car.sxArray[randomValue];
        }
    })
}

function drawLogs() {
    let direction = 1;
    logs.forEach(log => {        
        ctx.drawImage(log.image, log.sx, log.sy, log.swidth, log.sheight, log.x, log.y, log.width, log.height);
        direction < 0 ? direction = 0.3 : direction = -0.3;
        log.direction = direction;
        if (direction < 0) {
            log.x > - 200 ? log.x += direction : log.x = canvas.width + 100;
        } else {
            log.x < canvas.width + 100 ? log.x += direction : log.x = -100;
            }      
        }
    )
}

function drawTurtles() {
    let direction = 1;
    turtles.forEach(turtle => {        
        ctx.drawImage(turtle.image, turtle.sx, turtle.sy, turtle.swidth, turtle.sheight, turtle.x, turtle.y, turtle.width, turtle.height);
        direction < 0 ? direction = 0.3 : direction = -0.3;
        turtle.direction = direction;
        if (direction < 0) {
            turtle.x > - 200 ? turtle.x += direction : turtle.x = canvas.width + 100;
        } else {
            turtle.x < canvas.width + 100 ? turtle.x += direction : turtle.x = -100;
            }      
        }
    )
}


function frogFloat() {
    floatItems.forEach(floatItem => {
        if (floatItem.x <= x &&
            floatItem.x + floatItem.width >= x + width &&
            floatItem.y + floatItem.height >= y &&
            floatItem.y <= y + height) {
            x = x + floatItem.direction; 
            return floatItem.frogFloat = true;          
            } else {
                floatItem.frogFloat = false;
            }
})}


function drown() {
    if ( logOne.frogFloat == false && 
        logTwo.frogFloat == false && 
        logThree.frogFloat == false && 
        logFour.frogFloat == false &&
        turtleOne.frogFloat == false &&
        turtleTwo.frogFloat == false &&
         y < 200 && y > 40) {
        y = 435;
        lastY = 435;
        updateLives();
        debugger;
    }
}



function moveFrog() {
    if (upPressed == true && up == true && y > 20) {
        y = lastY - 44;
        lastY = y;
        up = false;
        setFrogStraight();
    }
    if (upPressed == false) {
        up = true;
    }
    if (downPressed == true && down == true && y < canvas.height - 80) {
        y = lastY + 44;
        lastY = y;
        down = false;
        setFrogStraight();
    }
    if (downPressed == false) {
        down = true;
    }
    if (rightPressed == true && right == true && x + width < canvas.width) {
        x = x + 44;
        y = lastY - 2;
        right = false;
        setFrogRight();
    }
    if (rightPressed == false) {
        right = true;
    }
    if (leftPressed == true && left == true && x > 0) {
        x = x - 44;
        y = lastY - 2;
        left = false;
        setFrogLeft();
    }
    if (leftPressed == false) {
        left = true;
    }
}

function runOver() {
    cars.forEach(car => {
        if (car.x <= x + width &&
            car.x + car.width >= x + (width / 1.5) &&
            car.y + car.height >= y + (height / 2) &&
            car.y <= y + (height / 1.5)) {            
            y = 435;
            lastY = 435;
            updateLives();
            debugger;
        }
    })
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawLogs();
    drawTurtles()
    moveFrog();
    drawFrog(); 
    frogFloat();
    drawCars();
    runOver();
    drown();
    requestAnimationFrame(draw);
}

draw();

