import Snake from './Snake.js'
import Food from './Food.js'

const board = document.querySelector('#game-board')
const resetBtn = document.querySelector('button')

const snake = new Snake()

const foods = [
    new Food(),
    new Food()
]

let running = true

const startGame = () => {
    if (running) {
        console.log("cos");
        snakeFoodColision()
        snake.update()
    }
}

const snakeFoodColision = () => {
    foods.forEach(food => {
        if (food.getPositionX() === snake.getPositionX() && food.getPositionY() === snake.getPositionY()) {
            snake.eat()
            food.remove()
            const newFood = new Food()
            foods.push(newFood)
        }
    })
}

const resetGame = () => {
    snake.elements = []
    console.log(snake.elements);
    snake.setPositionX()
    snake.setPositionY()
    snake.direction = 'Right'
    foods.forEach(food => {
        food.remove()
        const newFood = new Food()
        foods.push(newFood)
    })
}

setInterval(startGame, 150)

resetBtn.addEventListener('click', resetGame)