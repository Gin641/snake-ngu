let c = document.getElementById("myCanvas");
let ctx =c.getContext("2d");
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