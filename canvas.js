const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreHtml = document.getElementById('score');
const livesHtml = document.getElementById('lives');
const levelHtml = document.getElementById('level');
var lives = 5;
var score = 0;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var up = true;
var down = true;
var right = true;
var left = true;
var level = 1;
var floatSpeed = 0.3;
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

//Our main character, the frog
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
var deadReason = undefined;

//The drown frog
var drownX = 30;
var drownY = 445;

//The run over frog
var runOverX = 30;
var runOverY = 445;

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
        this.floatLeft = floatLeft;
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

//check if all pads have a frog on them
const checkPadsFull = () => {
    const isTrue = currentValue => currentValue === true;
    let padsFullArray = [];
    pads.forEach(element => padsFullArray.push(element.frogFloat))
    padsFullArray.every(isTrue) ? newGame() : "";
}

//update score if for reaches a pad
const updateScore = () => {
    score += scoreIncrement * level;
    scoreHtml.innerHTML = score;
    checkPadsFull();
}

//start new game when end of level is reached
const newGame = () => {
    floatItems.forEach(element => {
        element.frogFloat = false;
        if (element.type = 'pad') {
            element.newFrog = false;
        }
    })
    y = 445;
    lastY = 445;
    lives = 5;
    level++;
    livesHtml.innerHTML = lives;
    scoreHtml.innerHTML = score;
    levelHtml.innerHTML = level;
    floatSpeed += 0.1;
    carSpeed += 0.2;
}

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
    ctx.drawImage(frog, sx, sy, swidth, sheight, x, y, width, height);
}

function drawRunOverFrog() {
    if (deadReason === "runOver") {
        ctx.drawImage(drownFrog, 2, 2, 65, 75, runOverX, runOverY, 50, 50);
    }
}

var drownFrog = new Image();
drownFrog.src = "frog-die.png";
function drawDrownFrog() {
    if (deadReason === "drown") {
        ctx.drawImage(drownFrog, 80, 10, 55, 35, drownX, drownY, 52, 30);
    }
}

function drawCars() {
    cars.forEach(car => {
        ctx.drawImage(car.image, car.sx, car.sy, car.swidth, car.sheight, car.x, car.y, car.width, car.height);
        if (car.x < canvas.width + 100) {
            car.x += 1;
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
        log.floatLeft === true  ? movement = -floatSpeed : movement = floatSpeed;
        log.movement = movement;
        if (log.floatLeft === true) {
            log.x > - 200 ? log.x += movement : log.x = canvas.width + 100;
        } else {
            log.x < canvas.width + 100 ? log.x += movement : log.x = -100;
        }
    }
    )
}

const drawTurtles = () => {
    let movement = 0;
    turtles.forEach(turtle => {
        if (turtle.turtleSink === false) {
            ctx.drawImage(turtle.image, turtle.sx, turtle.sy, turtle.swidth, turtle.sheight, turtle.x, turtle.y, turtle.width, turtle.height);
            turtle.floatLeft === false ? movement = floatSpeed : movement = -floatSpeed;
            turtle.movement = movement;
            if (turtle.floatLeft === true) {
                turtle.x > - 200 ? turtle.x += movement : turtle.x = canvas.width + 100;
            } else {
                turtle.x < canvas.width + 100 ? turtle.x += movement : turtle.x = -100;
            }    
            if (turtle.frogFloat === true && turtle.image === turtleImageToLeft ){
                setTimeout(() => {
                    turtle.sx = 7; 
                 }, 1500)
                setTimeout(() => {
                    turtle.turtleSink = true;                      
                }, 3500)
                setTimeout(() => {
                    turtle.turtleSink = false;
                    turtle.sx = 7;                      
                }, 5000)
                setTimeout(() => {
                    turtle.sx = 230;                      
                }, 8000)

            } else if (turtle.frogFloat === true && turtle.image === turtleImageToRight){
                setTimeout(() => {
                    turtle.sx = 550; 
                 }, 1500)
                setTimeout(() => {
                    turtle.turtleSink = true;                      
                }, 3500)
                setTimeout(() => {
                    turtle.turtleSink = false;
                    turtle.sx = 550;                       
                }, 5000)
                setTimeout(() => {
                    turtle.sx = 10;                      
                }, 8000)                               
            }
        }
    }
    )
}

const drawPads = () => {
    pads.forEach(pad => {
        ctx.drawImage(pad.image, pad.sx, pad.sy, pad.swidth, pad.sheight, pad.x, pad.y, pad.width, pad.height);
    }
    )
}

//check if the frog is on floatitem and make frog float 
const frogFloat = () => {
    floatItems.forEach(floatItem => {
        if (x > -10 && x < canvas.width - 10 &&
            floatItem.x <= x + (width / 2) &&
            floatItem.x + floatItem.width >= x + (width / 2) &&
            floatItem.y + (floatItem.height / 2) >= y &&
            floatItem.y <= y + height) {        
            if (floatItem.turtleSink) {
                floatItem.turtleSink === true ? floatItem.frogFloat = false : (floatItem.frogFloat = true, x = x + floatItem.movement);
                x = x + floatItem.movement;
            } else {
                floatItem.frogFloat = true
                x = x + floatItem.movement; 
                frogOnPad();
            }           
        } else {
            floatItem.type !== 'pad' ? floatItem.frogFloat = false : "";
            frogOnPad();
        }
    })
}

//when frog reaches the pad leave frog on pad and draw new frog
const frogOnPad = () => {
    pads.forEach(pad => {
        if (pad.frogFloat === true) {
            ctx.drawImage(frog, 2, 13, 55, 35, pad.x, pad.y + 10, 52, 28);
            if (pad.newFrog === false) {
                y = 445;
                lastY = 445;
                pad.newFrog = true;
                setTimeout(() => {
                    updateScore();
                })
            }
        }
    })
}


//check if frog is drown 
// when frog is not on a floatitem, but in the water area
function drown() {
    if (logOne.frogFloat == false &&
        logTwo.frogFloat == false &&
        logThree.frogFloat == false &&
        logFour.frogFloat == false &&
        turtleOne.frogFloat == false &&
        turtleTwo.frogFloat == false &&
        turtleThree.frogFloat == false &&
        turtleFour.frogFloat == false &&
        y < 200) {
        deadReason = "drown";
        drownX = x;
        drownY = y;
        y = 445;
        lastY = 445;
        x = 30;
        updateLives();
        setTimeout(() => deadReason = undefined, 1500)
    }
}

// frog movement
//set the frog position back
const setFrogStraight = () => {
    sx = 2;
    sy = 13;
    swidth = 55;
    sheight = 35;
    width = 45;
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

//frog jump movement
const frogJumpUpDown = () => {
    sy = 13;
    sx = 58;
    sheight = 55;
    swidth = 55;
    height = 50;
    width = 40;
}

const frogJumpRight = () => {
    sx = 20;
    sy = 196;
    swidth = 55;
    sheight = 55;
    width = 48;
    height = 40;
}

const frogJumpLeft = () => {
    sx = 88;
    sy = 196;
    swidth = 55;
    sheight = 55;
    width = 48;
    height = 40;
}

//on the keys up and down make the frog move
function moveFrog() {
    if (upPressed == true && up == true && y > 20) {
        frogJumpUpDown();
        setTimeout(() => {
            setFrogStraight();
        }, 100);
        y = lastY - 44;
        lastY = y;
        up = false;
    } upPressed == false ? up = true : up = false;
    if (downPressed == true && down == true && y < canvas.height - 80) {
        frogJumpUpDown();
        setTimeout(() => {
            setFrogStraight();
        }, 100);
        y = lastY + 44;
        lastY = y;
        down = false;
    } downPressed == false ? down = true : down = false;
    if (rightPressed == true && right == true && x + width < canvas.width) {
        frogJumpRight();
        setTimeout(() => {
            setFrogRight();
        }, 100)
        x = x + 44;
        y = lastY - 2;
        right = false;
    } rightPressed == false ? right = true : right = false;
    if (leftPressed == true && left == true && x > 20) {
        frogJumpLeft()
        setTimeout(() => {
            setFrogLeft();
        }, 100)
        x = x - 44;
        y = lastY - 2;
        left = false;
    } leftPressed == false ? left = true : false;
}

function runOver() {
    cars.forEach(car => {
        if (car.x <= x + width &&
            car.x + car.width >= x + (width / 1.5) &&
            car.y + car.height >= y + (height / 2) &&
            car.y <= y + (height / 1.5)) {
            deadReason = "runOver";
            runOverX = x;
            runOverY = y;
            y = 445;
            lastY = 445;
            updateLives();
            setTimeout(() => deadReason = undefined, 1700)
        }

    })
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawDrownFrog();
    drawRunOverFrog();
    drawLogs();
    drawTurtles();
    drawPads();
    moveFrog();
    drawFrog();
    frogFloat();
    drawCars();
    runOver();
    drown();
    requestAnimationFrame(draw);
}

draw();

