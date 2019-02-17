var frogImage = new Image();
frogImage.src = "frogs.png";
var deadFrogImage = new Image();
deadFrogImage.src = "frog-die.png";

const frog = {
    image: frogImage,
    imageSrc: frogImage.src,
    deadFrogImage: deadFrogImage,
    deadFrogImageSrc: deadFrogImage.src,
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
    deadReason: undefined,
    drawFrog() {
        ctx.drawImage(frogImage, frog.sx, frog.sy, frog.swidth, frog.sheight, frog.x, frog.y, frog.width, frog.height)
    },
    drawRunOverFrog() {
        if (frog.deadReason === "runOver") {
            ctx.drawImage(this.deadFrogImage, 2, 2, 65, 75, this.deadX, this.deadY, 50, 50);
        }
    },
    drawDrownFrog() {
        if (frog.deadReason === "drown") {
            ctx.drawImage(deadFrogImage, 80, 10, 55, 35, frog.deadX, frog.deadY, 52, 30);
        }
    },
    collision(item) {
        if (frog.x > -10 && frog.x < canvas.width - 10 &&
            item.x <= frog.x + (frog.width / 2) &&
            item.x + item.width >= frog.x + (frog.width / 2) &&
            item.y + (item.height / 2) >= frog.y &&
            item.y <= frog.y + frog.height) {
            return true;
        }
    },
    moveFrog() {
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
    drawTurtle() {
        let movement = 0;
        if (this.floatLeft) {
            movement = -floatSpeed;
            this.x > - 200 ? this.x += movement : this.x = canvas.width + 100;
        } else {
            movement = floatSpeed;
            this.x < canvas.width + 100 ? this.x += movement : this.x = -100;
        }
        this.movement = movement;
        this.underWater ? "" : ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
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
    drawPad() {
        ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, this.x, this.y, this.width, this.height);
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
        this.width = 70;
        this.height = 28;
    }
}

const createCars = () => {
    carOne = new Car(carsImage, carsImage.src, 'carOne', 200, 406);
    carTwo = new Car(carsImage, carsImage.src, 'carTwo', 1800, 406);
    carThree = new Car(carsImage, carsImage.src, 'carThree', -200, 360);
    carFour = new Car(carsImage, carsImage.src, 'carFour', -600, 270);
    carFive = new Car(carsImage, carsImage.src, 'carFive', 400, 314);
    carSix = new Car(carsImage, carsImage.src, 'carSix', 120, 360);
    cars = [carOne, carTwo, carThree, carFour, carFive, carSix];
}


