
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreHtml = document.getElementById('score');
const livesHtml = document.getElementById('lives');
const levelHtml = document.getElementById('level');

var lives = 5;
var score = 0;
var level = 1;
var floatSpeed = 0.3;
var carSpeed = 1.2;
var scoreIncrement = 10;
var logs = [];
var pads = [];
var turtles = [];
var floatItems = [];
var cars = [];

livesHtml.innerHTML = lives;
scoreHtml.innerHTML = score;
levelHtml.innerHTML = level;

createTurtles();
createLogs();
createPads();
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
    frog.height = 42;
}

const setFrogLeft = () => {
    frog.sx = 88;
    frog.sy = 140;
    frog.swidth = 35;
    frog.sheight = 53;
    frog.width = 28;
    frog.height = 42;
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


//game functionality
//update lives when frog is drown or runover
const updateLives = () => {
    lives--
    livesHtml.innerHTML = lives;
    if (lives === 0) {
        lives = 5;
        level = 1;
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

//check if the frog is on floatitem and make frog float 
const frogFloat = () => {
    floatItems.forEach(floatItem => {
        if (frog.collision(floatItem)) {
            floatItem.underWater ? floatItem.frogFloat = false : floatItem.frogFloat = true;
            frog.x += floatItem.movement;
        }
        else {
            floatItem.type !== 'pad' ? floatItem.frogFloat = false : "";
        }
    })
};

//when frog reaches the pad leave frog on pad and draw new frog
const frogOnPad = () => {
    pads.forEach(pad => {
        if (pad.frogFloat) {
            ctx.drawImage(frogImage, 2, 13, 55, 35, pad.x, pad.y + 10, 52, 28);
            if (pad.newFrog === false) {
                frog.y = 445;
                frog.lastY = 445;
                pad.newFrog = true;
                setTimeout(() => updateScore(), 500)
            }
        }
    })
}

function runOver() {
    cars.forEach(car => {
        if (frog.collision(car)) {
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
    frog.drawDrownFrog();
    frog.drawRunOverFrog();
    drawLogs();
    turtles.forEach(turtle => turtle.drawTurtle());
    turtleSink();
    pads.forEach(pad => pad.drawPad());
    frog.moveFrog();
    frog.drawFrog();
    frogFloat();
    frogOnPad();
    drawCars();
    runOver();
    drown();
    requestAnimationFrame(draw);
}

draw();

