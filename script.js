var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

let score = document.getElementById("score");
let scoreCount = 0;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var snakeBody = [];

//food
var foodX;
var foodY;

//velocity
var velocityX = 0;
var velocityY = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFoodAtRandomLocation();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 800 / 10);
}

function update() {
    //draw board
    context.fillStyle = "grey";
    context.fillRect(0, 0, board.width, board.height);

    //draw food
    context.fillStyle = "#D22B2B";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //draw snake
    context.fillStyle = "green";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //if snake is colliding with the food => replace food at random location a
    // and increase snake size by 1.
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFoodAtRandomLocation();
        increaseScore();
    }
    snakeBodyKeepsUpWithTheHead();

    for (let i = snakeBody.length - 1; i > 0; i--) {
        if (snakeBody[i][0] == snakeX && snakeBody[i][1] == snakeY) {
            die();
            deleteScore();
        }
    }

    //reposition on the opposite side of the board
    snakeOutOfBoard();
}

function placeFoodAtRandomLocation() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function snakeBodyKeepsUpWithTheHead() {
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function die() {
    snakeBody.length = 0;
    window.alert("You Died!");
}

function increaseScore() {
    scoreCount++;
    score.textContent = "Score " + scoreCount;
}

function deleteScore() {
    scoreCount = 0;
    score.textContent = "Score " + scoreCount;
}

function snakeOutOfBoard() {
    if (snakeX > cols*blockSize)
        snakeX = -blockSize;
    else if(snakeX < 0)
        snakeX = cols * blockSize;
    else if (snakeY < 0)
        snakeY = rows * blockSize;
    else if (snakeY > rows * blockSize)
        snakeY = -blockSize;
}