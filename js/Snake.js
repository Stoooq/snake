const fieldSize = 30
let direction = 'Right'

class Snake {
    constructor () {
        this.elements = []
        this.board = document.querySelector('#game-board')
        this.snakeElement = document.createElement('div')
        this.snakeElement.classList.add('snake-element')
        this.board.append(this.snakeElement)
        window.addEventListener('keydown', this.handleKeys)
    }

    update = () => {
        this.moveElements()
        this.move(direction, this.snakeElement)
    }

    handleKeys = (e) => {
        switch (e.code) {
            case 'ArrowLeft': 
                if (direction !== 'Right')
                    direction = 'Left'
                break
            case 'ArrowRight': 
                if (direction !== 'Left')
                    direction = 'Right'
                break
            case 'ArrowUp':
                if (direction !== 'Down')
                    direction = 'Up'
                break
            case 'ArrowDown':
                if (direction !== 'Up')
                    direction = 'Down'
                break
        }
    }

    move = (direction, element) => {
        switch (direction) {
            case 'Left':
                element.style.left = `${element.offsetLeft - fieldSize}px`
            break
            case 'Right':
                element.style.left = `${element.offsetLeft + fieldSize}px`
            break
            case 'Up':
                element.style.top = `${element.offsetTop - fieldSize}px`
            break
            case 'Down':
                element.style.top = `${element.offsetTop + fieldSize}px`
            break
        }

        this.checkColision()
    }

    moveElements = () => {
        const lastElement = this.elements.pop()
        if (lastElement) {
            lastElement.style.left = `${this.snakeElement.offsetLeft}px`
            lastElement.style.top = `${this.snakeElement.offsetTop}px`
            this.elements.unshift(lastElement)
        }
    }

    checkColision = () => {
        if (this.snakeElement.offsetLeft < 0 ||
            (this.snakeElement.offsetLeft + this.snakeElement.offsetWidth) > this.board.offsetWidth ||
            this.snakeElement.offsetTop < 0 ||
            (this.snakeElement.offsetTop + this.snakeElement.offsetHeight) > this.board.offsetHeight) {
                direction = ''
        }
        this.elements.forEach(element => {
            if (element.offsetLeft === this.snakeElement.offsetLeft &&
                element.offsetTop === this.snakeElement.offsetTop) {
                    direction = ''
            }
        })
    }

    eat = () => {
        const newElement = document.createElement('div')
        newElement.classList.add('snake-element')
        newElement.style.left = `${this.snakeElement.offsetLeft}px`
        newElement.style.top = `${this.snakeElement.offsetTop}px`
        this.board.append(newElement)
        this.elements.push(newElement)
    }

    getPositionX = () => {
        return this.snakeElement.offsetLeft
    }

    getPositionY = () => {
        return this.snakeElement.offsetTop
    }
}

export default Snake