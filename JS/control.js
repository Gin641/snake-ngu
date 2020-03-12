document.addEventListener('keydown', logic);
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