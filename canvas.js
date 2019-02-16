
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreHtml = document.getElementById('score');
const livesHtml = document.getElementById('lives');
const levelHtml = document.getElementById('level');

var lives = 5;
var score = 0;
var level = 1;
var floatSpeed = 0.1;
var carSpeed = 1;
var scoreIncrement = 10;
var logs = [];
var pads = [];
var turtles = [];
var floatItems = [];
var cars = [];

livesHtml.innerHTML = lives;
scoreHtml.innerHTML = score;
levelHtml.innerHTML = level;


var frogImage = new Image();
frogImage.src = "frogs.png";
const frog = {
    image: frogImage,
    imageSrc: frogImage.src,
    sx: 2,
    sy: 13,
    swidth: 55,
    sheight: 35,
    x: 30,
    y: 445,
    width: 52,
    height: 28,
    lastY: 445,
    deadX: 30,
    deadY: 445,
    deadReason: undefined
}


//turtles where the frog can jump on
const turtleImageToLeft = new Image();
turtleImageToLeft.src = "turtlesToLeft.png";
const turtleImageToRight = new Image();
turtleImageToRight.src = "turtles.png";

class Turtle {
    constructor(image, imageSrc, name, sx, swidth, x, y, floatLeft) {
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
        this.movement = 0;
        this.frogFloat = false;
        this.type = 'turtle';
        this.floatLeft = floatLeft;
        this.underWater = false;
        this.turtleSink = false;
    }
}

const createTurtles = () => {
    turtleOne = new Turtle(turtleImageToLeft, turtleImageToLeft.src, 'TurtleOne', 230, 220, 200, 52, true);
    turtleTwo = new Turtle(turtleImageToRight, turtleImageToRight.src, 'TurtleTwo', 10, 235, 0, 95, false);
    turtleThree = new Turtle(turtleImageToLeft, turtleImageToLeft.src, 'TurtleThree', 230, 220, -100, 140, true);
    turtleFour = new Turtle(turtleImageToRight, turtleImageToRight.src, 'TurtleFour', 10, 235, -100, 180, false);
    turtles = [turtleOne, turtleTwo, turtleThree, turtleFour];
    turtles.forEach(element => floatItems.push(element));
}

createTurtles();

//the logs in the water
var logsImage = new Image();
logsImage.src = "logs.png";

class Log {
    constructor(image, imageSrc, name, sxArray, x, y, floatLeft) {
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
        this.movement = 0;
        this.floatLeft = floatLeft;
        this.frogFloat = false;
        this.type = 'log';
        this.underWater = false;
    }
}

const createLogs = () => {
    logOne = new Log(logsImage, logsImage.src, 'logOne', [0, 0, 0], 500, 55, true);
    logTwo = new Log(logsImage, logsImage.src, 'logTwo', [0, 0, 0], 300, 100, false);
    logThree = new Log(logsImage, logsImage.src, 'logThree', [0, 0, 0], 200, 142, true);
    logFour = new Log(logsImage, logsImage.src, 'logFour', [0, 0, 0], 200, 183, false);
    logs = [logOne, logTwo, logThree, logFour];
    logs.forEach(element => floatItems.push(element));
}

createLogs();

//the pads where the turtle can jump on
var padImage = new Image();
padImage.src = "frogger-images.png";

class Pad {
    constructor(image, imageSrc, name, sx, swidth, x, y) {
        this.image = image;
        this.imageSrc = imageSrc;
        this.name = name;
        this.sx = sx;
        this.sxArray = [];
        this.sy = 320;
        this.swidth = swidth;
        this.sheight = 90;
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 55;
        this.movement = 0;
        this.frogFloat = false;
        this.type = 'pad';
        this.newFrog = false;
        this.underWater = false;
    }
}

const createPads = () => {
    padOne = new Pad(padImage, padImage.src, 'PadOne', 533, 59, 30, 0);
    padTwo = new Pad(padImage, padImage.src, 'PadTwo', 533, 59, 180, 0);
    padThree = new Pad(padImage, padImage.src, 'PadThree', 533, 59, 335, 0);
    padFour = new Pad(padImage, padImage.src, 'PadFour', 533, 59, 475, 0);
    pads = [padOne, padTwo, padThree, padFour];
    pads.forEach(element => floatItems.push(element));
}

createPads();

//cars on the road
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

const createCars = () => {
    carOne = new Car(carsImage, carsImage.src, 'carOne', 200, 400);
    carTwo = new Car(carsImage, carsImage.src, 'carTwo', 1800, 400);
    carThree = new Car(carsImage, carsImage.src, 'carThree', -200, 352);
    carFour = new Car(carsImage, carsImage.src, 'carFour', -600, 270);
    carFive = new Car(carsImage, carsImage.src, 'carFive', 400, 310);
    carSix = new Car(carsImage, carsImage.src, 'carSix', 120, 355);
    cars = [carOne, carTwo, carThree, carFour, carFive, carSix];
}

createCars();

const gameControls = {
    leftPressed: false,
    upPressed: false,
    downPressed: false,
    up: true,
    down: true,
    right: true,
    left: true,
    rightPressed: false
}

let upControl = document.getElementById("upcontrol");
let rightControl = document.getElementById("rightcontrol");
let leftControl = document.getElementById("leftcontrol");
let downControl = document.getElementById("downcontrol");


// control by mouseclick
upControl.onclick = () => {
    gameControls.upPressed = true;
    setTimeout(() => gameControls.upPressed = false, 200);
}
rightControl.onclick = () => {
    gameControls.rightPressed = true;
    setTimeout(() => gameControls.rightPressed = false, 200);
}
leftControl.onclick = () => {
    gameControls.leftPressed = true;
    setTimeout(() => gameControls.leftPressed = false, 200);
}   
downControl.onclick = () => {
    gameControls.downPressed = true;
    setTimeout(() => gameControls.downPressed = false, 200)
}

const keyDownHandler = e => {
    switch (e.keyCode) {
        case 39:
            gameControls.rightPressed = true;
            break;
        case 37:
            gameControls.leftPressed = true;
            break;
        case 38:
            gameControls.upPressed = true;
            break;
        case 40:
            gameControls.downPressed = true;
            break;
    }
}

const keyUpHandler = e => {
    switch (e.keyCode) {
        case 39:
            gameControls.rightPressed = false;
            break;
        case 37:
            gameControls.leftPressed = false;
            break;
        case 38:
            gameControls.upPressed = false;
            break;
        case 40:
            gameControls.downPressed = false;
            break;
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);


// frog movement
//set the frog position back
const setFrogStraight = () => {
    frog.sx = 2;
    frog.sy = 13;
    frog.swidth = 55;
    frog.sheight = 35;
    frog.width = 45;
    frog.height = 28;
}

const setFrogRight = () => {
    frog.sx = 32;
    frog.sy = 143;
    frog.swidth = 35;
    frog.sheight = 55;
    frog.width = 28;
    frog.height = 45;
}

const setFrogLeft = () => {
    frog.sx = 88;
    frog.sy = 140;
    frog.swidth = 35;
    frog.sheight = 53;
    frog.width = 28;
    frog.height = 45;
}

//frog jump movement
const frogJumpUpDown = () => {
    frog.sy = 13;
    frog.sx = 58;
    frog.sheight = 55;
    frog.swidth = 55;
    frog.height = 50;
    frog.width = 40;
}

const frogJumpRight = () => {
    frog.sx = 20;
    frog.sy = 196;
    frog.swidth = 55;
    frog.sheight = 55;
    frog.width = 48;
    frog.height = 40;
}

const frogJumpLeft = () => {
    frog.sx = 88;
    frog.sy = 196;
    frog.swidth = 55;
    frog.sheight = 55;
    frog.width = 48;
    frog.height = 40;
}

//on the keys up and down make the frog move
const moveFrog = () => {
    if (gameControls.upPressed && gameControls.up && frog.y > 20) {
        frogJumpUpDown();
        setTimeout(() => setFrogStraight(), 100);
        frog.y = frog.lastY - 44;
        frog.lastY = frog.y;
        gameControls.up = false;
    } gameControls.upPressed == false ? gameControls.up = true : gameControls.up = false;
    if (gameControls.downPressed && gameControls.down && frog.y < canvas.height - 80) {
        frogJumpUpDown();
        setTimeout(() => setFrogStraight(), 100);
        frog.y = frog.lastY + 44;
        frog.lastY = frog.y;
        gameControls.down = false;
    } gameControls.downPressed == false ? gameControls.down = true : gameControls.down = false;
    if (gameControls.rightPressed && gameControls.right && frog.x + frog.width < canvas.width) {
        frogJumpRight();
        setTimeout(() => setFrogRight(), 100)
        frog.x += 44;
        frog.y = frog.lastY - 2;
        gameControls.right = false;
    } gameControls.rightPressed == false ? gameControls.right = true : gameControls.right = false;
    if (gameControls.leftPressed && gameControls.left && frog.x > 20) {
        frogJumpLeft()
        setTimeout(() => setFrogLeft(), 100)
        frog.x -= 44;
        frog.y = frog.lastY - 2;
        gameControls.left = false;
    } gameControls.leftPressed == false ? gameControls.left = true : false;
}


//game functionality
//update lives when frog is drown or runover
const updateLives = () => {
    lives--
    livesHtml.innerHTML = lives;
    if (lives === 0) {
        lives = 5;
        level = 0;
        livesHtml.innerHTML = lives;
        scoreHtml.innerHTML = score;
        alert("GAME OVER!");
    }
}


//update score if for reaches a pad
const updateScore = () => {
    score += scoreIncrement * level;
    scoreHtml.innerHTML = score;
    checkPadsFull();
}

//check if all pads have a frog on them
const checkPadsFull = () => {
    const isTrue = currentValue => currentValue === true;
    let padsFullArray = [];
    pads.forEach(element => padsFullArray.push(element.frogFloat))
    padsFullArray.every(isTrue) ? newGame() : "";
}

//start new game when end of level is reached
const newGame = () => {
    floatItems.forEach(element => {
        element.frogFloat = false;
        if (element.type === 'pad') {
            element.newFrog = false;
        }
    })
    frog.y = 445;
    frog.lastY = 445;
    lives = 5;
    level++;
    livesHtml.innerHTML = lives;
    scoreHtml.innerHTML = score;
    levelHtml.innerHTML = level;
    floatSpeed += 0.1;
    carSpeed += 0.2;
}

//draw background and all of the items
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
    ctx.drawImage(frogImage, frog.sx, frog.sy, frog.swidth, frog.sheight, frog.x, frog.y, frog.width, frog.height);
}

function drawRunOverFrog() {
    if (frog.deadReason === "runOver") {
        ctx.drawImage(deadFrogImage, 2, 2, 65, 75, frog.deadX, frog.deadY, 50, 50);
    }
}

var deadFrogImage = new Image();
deadFrogImage.src = "frog-die.png";

function drawDrownFrog() {
    if (frog.deadReason === "drown") {
        ctx.drawImage(deadFrogImage, 80, 10, 55, 35, frog.deadX, frog.deadY, 52, 30);
    }
}

function drawCars() {
    cars.forEach(car => {
        ctx.drawImage(car.image, car.sx, car.sy, car.swidth, car.sheight, car.x, car.y, car.width, car.height);
        if (car.x < canvas.width + 100) {
            car.x += carSpeed;
        } else {
            car.x = -100;
            let randomValue = Math.floor(Math.random() * car.sxArray.length);
            car.sx = car.sxArray[randomValue];
        }
    })
}

function drawLogs() {
    let movement = 0;
    logs.forEach(log => {
        ctx.drawImage(log.image, log.sx, log.sy, log.swidth, log.sheight, log.x, log.y, log.width, log.height);
        log.floatLeft === true ? movement = -floatSpeed : movement = floatSpeed;
        log.movement = movement;
        if (log.floatLeft === true) {
            log.x > - 200 ? log.x += movement : log.x = canvas.width + 100;
        } else {
            log.x < canvas.width + 100 ? log.x += movement : log.x = -100;
        }
    }
    )
}


const turtleSink = () => {
    turtles.forEach(turtle => {
        if (turtle.frogFloat === true && turtle.turtleSink === false) {
            turtle.turtleSink = true;
            setTimeout(() => {
                turtle.floatLeft ? turtle.sx = 7 : turtle.sx = 550;
            }, 1500)
            setTimeout(() => {
                turtle.underWater = true;
            }, 3000)
            setTimeout(() => {
                turtle.underWater = false;
                turtle.floatLeft ? turtle.sx = 7 : turtle.sx = 550;
            }, 4000)
            setTimeout(() => {
                turtle.floatLeft ? turtle.sx = 230 : turtle.sx = 10;
                turtle.turtleSink = false;
            }, 5500)
        }
    })
}


const drawTurtles = () => {
    let movement = 0;
    turtles.forEach(turtle => {
        if (turtle.underWater === false) {
            ctx.drawImage(turtle.image, turtle.sx, turtle.sy, turtle.swidth, turtle.sheight, turtle.x, turtle.y, turtle.width, turtle.height)
        };
        if (turtle.floatLeft === true) {
            movement = -floatSpeed;
            turtle.x > - 200 ? turtle.x += movement : turtle.x = canvas.width + 100;
        } else {
            movement = floatSpeed;
            turtle.x < canvas.width + 100 ? turtle.x += movement : turtle.x = -100;
        }
        turtle.movement = movement;
    })
}

const drawPads = () => {
    pads.forEach(pad => {
        ctx.drawImage(pad.image, pad.sx, pad.sy, pad.swidth, pad.sheight, pad.x, pad.y, pad.width, pad.height);
    }
    )
}

const collision = item => {
    if (frog.x > -10 && frog.x < canvas.width - 10 &&
        item.x <= frog.x + (frog.width / 2) &&
        item.x + item.width >= frog.x + (frog.width / 2) &&
        item.y + (item.height / 2) >= frog.y &&
        item.y <= frog.y + frog.height) {
        return true;
    }
}

//check if the frog is on floatitem and make frog float 
const frogFloat = () => {
    floatItems.forEach(floatItem => {
        if (collision(floatItem)) {
            floatItem.underWater ? floatItem.frogFloat = false : floatItem.frogFloat = true;
            frog.x += floatItem.movement;
        }
        else {
            floatItem.type !== 'pad' ? floatItem.frogFloat = false : "";
        }
    })
}

//when frog reaches the pad leave frog on pad and draw new frog
const frogOnPad = () => {
    pads.forEach(pad => {
        if (pad.frogFloat === true) {
            ctx.drawImage(frogImage, 2, 13, 55, 35, pad.x, pad.y + 10, 52, 28);
            if (pad.newFrog === false) {
                frog.y = 445;
                frog.lastY = 445;
                pad.newFrog = true;
                setTimeout(() => {
                    updateScore();
                }, 1000)

            }
        }
    })
}

function runOver() {
    cars.forEach(car => {
        if (collision(car)) {
            frog.deadReason = "runOver";
            frog.deadX = frog.x;
            frog.deadY = frog.y;
            frog.y = 445;
            frog.lastY = 445;
            updateLives();
            setTimeout(() => frog.deadReason = undefined, 1700)
        }
    })
}


//check if frog is drown 
// when frog is not on a floatitem or pad, but in the water area
function drown() {
    let anyFrogFloat = false
    floatItems.forEach(floatItem => {
        floatItem.type !== 'pad' && floatItem.frogFloat === true ? anyFrogFloat = true : ""
    })
    if (anyFrogFloat === false &&
        frog.y < 200) {
        frog.deadReason = "drown";
        frog.deadX = frog.x;
        frog.deadY = frog.y;
        frog.y = 445;
        frog.lastY = 445;
        frog.x = 30;
        updateLives();
        setTimeout(() => frog.deadReason = undefined, 1700)
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawDrownFrog();
    drawRunOverFrog();
    drawLogs();
    drawTurtles();
    turtleSink();
    drawPads();
    moveFrog();
    drawFrog();
    frogFloat();
    frogOnPad();
    drawCars();
    runOver();
    drown();
    requestAnimationFrame(draw);
}

draw();

