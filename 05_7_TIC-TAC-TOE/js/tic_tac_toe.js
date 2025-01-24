"use strict";

// flag が "pen-flag" の時penguinsターン、"bear-flag"の時bearのターン
let flag = "pen-flag";

// ターン数カウンター
let counter = 9;

const squares = document.getElementsByClassName("square");
const squaresArray = Array.from(squares);

const newgamebtn_display = document.getElementById("newgame-btn");  // Correct ID
const newgamebtn = document.getElementById("btn90");  // Correct ID

// Win or Lose JudgeLine
const line1 = JudgeLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgeLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgeLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgeLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgeLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgeLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgeLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgeLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"></p><p class="text">Penguins Attack!</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width="61px" height="61px"></p><p class="text">WhiteBear Attack!</p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text animate_animated animate_lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px"></p><p class="text animate_animated animate_lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text animate_bounceIn">Draw!!</p>';

// sound
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"];
function JudgeLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

window.addEventListener("DOMContentLoaded", function () {
    setMessage("pen-turn");
}, false);

squaresArray.forEach(function (square) {
    square.addEventListener("click", function () { isSelect(square); }, false);
});

function isSelect(selectSquare) {
    if (flag === "pen-flag") {
        // click Sound
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();
        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        if (isWinner("penguins")) {
            setMessage("pen-win");
            gameOver("penguins");
            return;  // Prevent further moves after winning
        }
        setMessage("bear-turn");
        flag = "bear-flag";
    } else {
        // Click Sound
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear");
            return;  // Prevent further moves after winning
        }
        setMessage("pen-turn");
        flag = "pen-flag";
    }
    counter--;

    if (counter === 0) {
        setMessage("Draw");
        gameOver("Draw");
    }
}

function isWinner(symbol) {
    // Check if there's a winning line
    const result = lineArray.some(function (line) {
        return line.every(function (square) {
            if (symbol === "penguins") {
                return square.classList.contains("js-pen-checked");
            }
            if (symbol === "bear") {
                return square.classList.contains("js-bear-checked");
            }
        });
    });

    if (result) {
        // If there's a winner, store the winning line
        winningLine = lineArray.find(function (line) {
            return line.every(function (square) {
                if (symbol === "penguins") {
                    return square.classList.contains("js-pen-checked");
                }
                if (symbol === "bear") {
                    return square.classList.contains("js-bear-checked");
                }
            });
        });
    }

    return result;  // Return whether there's a winner
}

function setMessage(id) {
    const msgElement = document.getElementById("msgtext");

    // Remove any previous animation classes to reset
    msgElement.classList.remove("animate__animated", "animate__slideInLeft", "animate__slideInRight", "animate__slideInDown");

    switch (id) {
        case "pen-turn":
            msgElement.innerHTML = msgtxt1;
            break;
        case "bear-turn":
            msgElement.innerHTML = msgtxt2;
            break;
        case "pen-win":
            msgElement.innerHTML = msgtxt3;
            // Penguins win: slide from left to right
            msgElement.classList.add("animate__animated", "animate__slideInLeft");
            break;
        case "bear-win":
            msgElement.innerHTML = msgtxt4;
            // WhiteBear win: slide from right to left
            msgElement.classList.add("animate__animated", "animate__slideInRight");
            break;
        case "Draw":
            msgElement.innerHTML = msgtxt5;
            // Draw: slide from top
            msgElement.classList.add("animate__animated", "animate__slideInDown");
            break;
        default:
            msgElement.innerHTML = msgtxt1;
    }
}



function gameOver(status) {
    // GameOver sound
    let w_sound
    switch (status) {
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "Draw":
            w_sound = gameSound[4];
            break;
    }
    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();
    // Disable all squares to prevent further interaction
    squaresArray.forEach(function (square) {
        square.classList.add("js-unclickable");
    });
    // display New Game button : display
    newgamebtn_display.classList.remove("js-hidden");
    // Win effect
    if (status === "penguins") {
        // Highlight the winning line
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-pen_highLight");
            });
        }
        // Penguins win - snow effect
        $(document).snowfall({
            flakeColor: "rgb(255,240,245)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    } else if (status === "bear") {
        // Highlight the winning line
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-bear_highLight");
            });
        }
        // Bear win - snow effect
        $(document).snowfall({
            flakeColor: "rgb(172,238,238)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    }
}

// When New Game button is clicked
newgamebtn.addEventListener("click", function () {
    // penguin' turn
    flag = "pen-flag";
    // No. of turn counter
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function (square) {
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
    });
    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");

    //snowfall stop
    $(document).snowfall("clear");
});
