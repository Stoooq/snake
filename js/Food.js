class Food {
    constructor () {
        this.board = document.querySelector('#game-board')
        this.food = document.createElement('div')
        this.food.classList.add('food')
        this.food.style.left = `${Math.round(Math.random() * (20 - 1)) * 30}px`
        this.food.style.top = `${Math.round(Math.random() * (20 - 1)) * 30}px`
        this.board.append(this.food)
    }

    remove = () => {
        this.food.remove()
    }

    getPositionX = () => {
        return this.food.offsetLeft
    }

    getPositionY = () => {
        return this.food.offsetTop
    }
}

export default Food