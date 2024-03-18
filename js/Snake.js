const fieldSize = 30

class Snake {
    constructor () {
        this.elements = []
        this.board = document.querySelector('#game-board')
        this.snakeElement = document.createElement('div')
        this.snakeElement.classList.add('snake-element')
        this.board.append(this.snakeElement)
        this.direction = 'Right'
        window.addEventListener('keydown', this.handleKeys)
    }

    update = () => {
        this.moveElements()
        this.move(this.direction, this.snakeElement)
    }

    handleKeys = (e) => {
        switch (e.code) {
            case 'ArrowLeft': 
                if (this.direction !== 'Right')
                    this.direction = 'Left'
                break
            case 'ArrowRight': 
                if (this.direction !== 'Left')
                    this.direction = 'Right'
                break
            case 'ArrowUp':
                if (this.direction !== 'Down')
                    this.direction = 'Up'
                break
            case 'ArrowDown':
                if (this.direction !== 'Up')
                    this.direction = 'Down'
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
                this.direction = ''
        }
        this.elements.forEach(element => {
            if (element.offsetLeft === this.snakeElement.offsetLeft &&
                element.offsetTop === this.snakeElement.offsetTop) {
                    this.direction = ''
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

    setPositionX = () => {
        this.snakeElement.style.left = `${0}px`
    }

    setPositionY = () => {
        this.snakeElement.style.top = `${0}px`
    }

    getPositionX = () => {
        return this.snakeElement.offsetLeft
    }

    getPositionY = () => {
        return this.snakeElement.offsetTop
    }
}

export default Snake