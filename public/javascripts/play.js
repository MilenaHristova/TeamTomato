/**
 * Created by Milena on 26/04/2017.
 */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var score = 0;
var highestScore = 0;
var isGameOver = false;
var start = false;
var restart = false;
var popedBricks = 0;
var lives = 5;

var x = canvas.width / 2;
var y = canvas.height - 60;

var velx = + 6;
var vely = - 6;

var paddleHeight = 	20;
var paddleWidth = 	150;
var paddleX = (canvas.width - paddleWidth) / 2;
var pressedLeft = false;
var pressedRight = false;

var brickRCount = 3;
var brickCCount = 5;
var brickW = 150;
var brickH = 40;
var brickP = 20;
var brickOffTop = 60;
var brickOffLeft = 60;

var bricksX = [];
var bricksY = [];
var bricksPop = [];

for (c = 0; c < brickCCount; c++)
{
    bricksX[c] = [];
    bricksY[c] = [];
    bricksPop[c] = [];
    for (r = 0; r < brickRCount; r++)
    {
        bricksX[c][r] = 0;
        bricksY[c][r] = 0;
        bricksPop[c][r] = 1;
    }
}

var ballR = 20;

function generateBricks()
{
    popedBricks = 0;
    lives++;
    for (c = 0; c < brickCCount; c++)
    {
        for (r = 0; r < brickRCount; r++)
        {
            var randomNumberGenerator = Math.floor(Math.random() * 2);
            bricksPop[c][r] = randomNumberGenerator;
            if (randomNumberGenerator == 0) popedBricks++;
        }
    }
}

function collisionDetect()
{
    for (c = 0; c < brickCCount; c++)
    {
        for (r = 0; r < brickRCount; r++)
        {
            if (bricksPop[c][r] == 1)
            {
                bX = bricksX[c][r];
                bY = bricksY[c][r];
                if (x > bX)
                {
                    if (x < bX + brickW)
                    {
                        if (y > bY)
                        {
                            if (y < bY + brickH)
                            {
                                vely = -vely;
                                bricksPop[c][r] = 0;
                                popedBricks++;
                                score += lives;
                                if (popedBricks == brickCCount * brickRCount)
                                {
                                    generateBricks();
                                    x = canvas.width / 2;
                                    y = canvas.height - 60;
                                    velx = + 6;
                                    vely = - 6;
                                    paddleX = (canvas.width - paddleWidth) / 2;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function keyDownHandler(event)
{
    if (event.keyCode == 39) pressedRight = true;
    if (event.keyCode == 37) pressedLeft = true;
    if (event.keyCode == 32 && lives <= 0) restart = true;
    if (event.keyCode == 13 && !start) start = true;
}

function keyUpHandler(event)
{
    if (event.keyCode == 39) pressedRight = false;
    if (event.keyCode == 37) pressedLeft = false;
    if (event.keyCode == 32) restart = false;
}

function ball()
{
    ctx.beginPath();
    ctx.arc(x, y, ballR, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function paddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function bricks()
{
    for (c = 0; c < brickCCount; c++)
    {
        for (r = 0; r < brickRCount; r++)
        {
            if (bricksPop[c][r] == 1)
            {
                var brickX = c * (brickW + brickP) + brickOffLeft;
                var brickY = r * (brickH + brickP) + brickOffTop;
                bricksX[c][r] = brickX;
                bricksY[c][r] = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickW, brickH);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function showScore()
{
    ctx.font = "32px Ariel";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 16, 40);
}

function showLives()
{
    ctx.font = "32px Ariel";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 129, 40);
}

function showStartScreen()
{
    ctx.font = "64px Ariel";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Enter to Start", canvas.width / 2 - 161, canvas.height / 2);
}

function showGameOver()
{
    ctx.font = "64px Ariel";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Game Over", canvas.width / 2 - 129, canvas.height / 2);
    ctx.fillText("Space to Restart", canvas.width / 2 - 193, canvas.height / 2 + 64);
}

function draw()
{
    if (!start && !isGameOver)
    {
        showStartScreen();
    }
    else if (!isGameOver)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bricks();
        ball();
        paddle();
        showScore();
        showLives();

        if (y + vely < ballR) vely = -vely;
        else if (y + vely > canvas.height - ballR)
        {
            if (x > paddleX && x < paddleX + paddleWidth)
            {
                vely = -vely;
            }
            else
            {
                lives--;
                if(lives <= 0)
                {
                    isGameOver = true;
                }
                else
                {
                    x = canvas.width / 2;
                    y = canvas.height - 60;
                    velx = + 6;
                    vely = - 6;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }
        if (x + velx < ballR || x + velx > canvas.width - ballR) velx = -velx;

        if (pressedRight && paddleX + paddleWidth < canvas.width) paddleX += 12;
        if (pressedLeft && paddleX > 0) paddleX -= 12;

        x += velx;
        y += vely;
        collisionDetect();
    }
    else
    {
        showGameOver();
        if (score > highestScore) highestScore = score;
        if (restart) {
            document.location.reload();
        }
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);