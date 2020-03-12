function create() {
    ctx.clearRect(0,0,360,360);
    snake.createSnake();
    food.createFood();
    snakeVsFood();
    snake.createTail();
    snake.headVsarray();
    if (control === 'left') {
        snake.array[0].x -= snake.speed;
    }if (control === 'right'){
        snake.array[0].x += snake.speed;
    }if (control === 'up'){
        snake.array[0].y -= snake.speed;
    }if (control === 'down'){
        snake.array[0].y += snake.speed;
     }if (snake.array[0].x < START
        || snake.array[0].x > END
        || snake.array[0].y < START
        || snake.array[0].y > END
        || gameOver === true){
        dead.play();
         clearInterval(game);
         alert("game over");
    }
    document.getElementById("score").innerHTML = 'Score: ' + score;
}
let game = setInterval(create,100);