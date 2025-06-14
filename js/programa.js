 const player = document.getElementById("player");
    const game = document.getElementById("game");
    const scoreDisplay = document.getElementById("score");
    let jumping = false;
    let score = 0;

    function jump() {
      if (jumping) return;
      jumping = true;
      player.classList.add("jump");
      setTimeout(() => {
        player.classList.remove("jump");
        jumping = false;
      }, 400);
    }

    function createObstacle() {
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      obstacle.style.animationDuration = `${Math.max(1.5, 3 - score / 50)}s`;
      game.appendChild(obstacle);

      const interval = setInterval(() => {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
          obstacleRect.left < playerRect.right &&
          obstacleRect.right > playerRect.left &&
          obstacleRect.top < playerRect.bottom &&
          obstacleRect.bottom > playerRect.top
        ) {
          alert("¡Perdiste! Puntuación: " + score);
          location.reload();
        }
      }, 10);

      obstacle.addEventListener("animationend", () => {
        obstacle.remove();
        clearInterval(interval);
        score++;
        scoreDisplay.textContent = "Score: " + score;
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") jump();
    });

    game.addEventListener("click", jump);

    setInterval(createObstacle, 2000);