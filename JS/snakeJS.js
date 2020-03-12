let c = document.getElementById("myCanvas");
let ctx =c.getContext("2d");
let control;
let score = 0;
let gameOver = false;
let eat = new Audio();
let dead = new Audio();
eat.src = "Audio/eat.wav";
dead.src = "Audio/dead.mp3";
let Snake = function () {
    this.speed = 10;
    this.array = [];
    this.radius = 10;
    let x = 8 * 10;
    let y = 8 * 10;
    this.getArray = function () {
        this.array[0] = {
            x,y
        }
    };
    this.createSnake = function () {
        ctx.beginPath();
        ctx.arc(this.array[0].x,this.array[0].y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#43f046";
        ctx.fill();
        ctx.stroke();
    };
    this.createTail = function () {
        for (let i = this.array.length - 1; i > 0; i--) {
            ctx.beginPath();
            this.array[i].x = this.array[i - 1].x;
            this.array[i].y = this.array[i - 1].y;
            ctx.arc(this.array[i].x, this.array[i].y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = "#000000";
            ctx.fill();
        }
    };
    this.headVsarray = function () {
        for (let i = 2; i < this.array.length;i++){
            if (this.array[0].x === this.array[i].x && this.array[0].y === this.array[i].y){
                gameOver = true;
            }
        }
    };
};
const XYFOOD = 303;
let Food = function () {
    this.x = Math.floor(Math.random() * XYFOOD);
    this.y = Math.floor(Math.random() * XYFOOD);
    this.radius = 10;
    this.createFood = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.stroke();
    };
};
let snake =  new Snake();
snake.getArray();
let food = new Food();
document.addEventListener('keydown', logic);
const KEY_LEFT = 37;

const KEY_UP = 38;

const KEY_RIGHT = 39;

const KEY_DOWN = 40;

function logic(event) {
    if (event.keyCode === KEY_LEFT && control !== "right"){
        control = 'left';
    } else if (event.keyCode === KEY_UP && control !== "down"){
        control ='up';
    } else if (event.keyCode === KEY_RIGHT && control !== "left"){
        control = 'right';
    }else if (event.keyCode === KEY_DOWN && control !== "up"){
        control = 'down'
    }
}
function snakeVsFood() {
    function isEat() {
        return Math.abs(snake.array[0].x - food.x) <= 20 && Math.abs(snake.array[0].y - food.y) <= 20;
    }
    if (isEat()) {
        eat.play();
        score++;
        snake.array.push({x: food.x, y: food.y});
        food.x = Math.floor(Math.random() * XYFOOD);
        food.y = Math.floor(Math.random() * XYFOOD);
    }
}

const START = 10;

const END = 360 - 10;

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