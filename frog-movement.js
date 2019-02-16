// const gameControls = {
//     leftPressed: false,
//     upPressed: false,
//     downPressed: false,
//     up: true,
//     down: true,
//     right: true,
//     left: true,
//     rightPressed: false
// }


// const keyDownHandler = e => {
//     switch (e.keyCode) {
//         case 39:
//             gameControls.rightPressed = true;
//             break;
//         case 37:
//             gameControls.leftPressed = true;
//             break;
//         case 38:
//             gameControls.upPressed = true;
//             break;
//         case 40:
//             gameControls.downPressed = true;
//             break;
//     }
// }

// const keyUpHandler = e => {
//     switch (e.keyCode) {
//         case 39:
//             gameControls.rightPressed = false;
//             break;
//         case 37:
//             gameControls.leftPressed = false;
//             break;
//         case 38:
//             gameControls.upPressed = false;
//             break;
//         case 40:
//             gameControls.downPressed = false;
//             break;
//     }
// }

// document.addEventListener("keydown", keyDownHandler);
// document.addEventListener("keyup", keyUpHandler);


// // frog movement
// //set the frog position back
// const setFrogStraight = () => {
//     frog.sx = 2;
//     frog.sy = 13;
//     frog.swidth = 55;
//     frog.sheight = 35;
//     frog.width = 45;
//     frog.height = 28;
// }

// const setFrogRight = () => {
//     frog.sx = 32;
//     frog.sy = 143;
//     frog.swidth = 35;
//     frog.sheight = 55;
//     frog.width = 28;
//     frog.height = 45;
// }

// const setFrogLeft = () => {
//     frog.sx = 88;
//     frog.sy = 140;
//     frog.swidth = 35;
//     frog.sheight = 53;
//     frog.width = 28;
//     frog.height = 45;
// }

// //frog jump movement
// const frogJumpUpDown = () => {
//     frog.sy = 13;
//     frog.sx = 58;
//     frog.sheight = 55;
//     frog.swidth = 55;
//     frog.height = 50;
//     frog.width = 40;
// }

// const frogJumpRight = () => {
//     frog.sx = 20;
//     frog.sy = 196;
//     frog.swidth = 55;
//     frog.sheight = 55;
//     frog.width = 48;
//     frog.height = 40;
// }

// const frogJumpLeft = () => {
//     frog.sx = 88;
//     frog.sy = 196;
//     frog.swidth = 55;
//     frog.sheight = 55;
//     frog.width = 48;
//     frog.height = 40;
// }



