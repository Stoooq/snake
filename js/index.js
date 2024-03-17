import Snake from './Snake.js'
import Food from './Food.js'

const board = document.querySelector('#game-board')

const snake = new Snake()

const foods = [
    new Food(),
    new Food()
]

const startGame = () => {
    snakeFoodColision()
    snake.update()
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

setInterval(startGame, 150)