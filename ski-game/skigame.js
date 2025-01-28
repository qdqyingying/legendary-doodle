const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images and sounds
const playerImage = new Image();
playerImage.src = "skier.png"; // Replace with your skier image
const obstacleImage = new Image();
obstacleImage.src = "tree.png"; // Replace with your tree image
const backgroundImage = new Image();
backgroundImage.src = "background.jpg"; // Replace with your background image

const skiSound = new Audio("ski.mp3"); // Replace with your ski sound
const crashSound = new Audio("crash.mp3"); // Replace with your crash sound

const player = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  width: 70,
  height: 70,
  speed: 30, // Increased player speed
};

const obstacles = [];
let score = 0;
let gameOver = false;

function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    ctx.drawImage(
      obstacleImage,
      obstacle.x,
      obstacle.y,
      obstacle.width,
      obstacle.height
    );
  });
}

function updateObstacles() {
  if (Math.random() < 0.05) {
    const width = 50;
    const height = 50;
    const x = Math.random() * (canvas.width - width);
    obstacles.push({ x: x, y: -height, width: width, height: height });
  }
  console.log;

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].y += 6; // Adjusted obstacle speed
    if (obstacles[i].y > canvas.height) {
      obstacles.splice(i, 1);
      console.log;
      score++;
    }

    // Collision detection
    if (
      player.x < obstacles[i].x + obstacles[i].width &&
      player.x + player.width > obstacles[i].x &&
      player.y < obstacles[i].y + obstacles[i].height &&
      player.y + player.height > obstacles[i].y
    ) {
      gameOver = true;
      skiSound.pause();
      crashSound.play();
    }
  }
}

function drawScore() {
  ctx.fillStyle = "#000000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "#000000";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawPlayer();
  drawObstacles();
  updateObstacles();
  drawScore();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
  }
  if (e.key === "ArrowRight" && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
});

// Start ski sound
skiSound.loop = true;
skiSound.play();

gameLoop();
