class Snake {
    constructor (fieldSize, boardSize) {
        this.fieldSize = fieldSize
        this.boardSize = boardSize
        this.position = [
            { x:0, y:0, element: document.createElement('div') },
            { x:0, y:0, element: document.createElement('div') },
            { x:0, y:0, element: document.createElement('div') },
        ]
        this.direction = 'Right'
        this.board = document.querySelector('#game-board')
        window.addEventListener('keydown', this.handleKeys)
    }

    update = () => {
        this.move()
        this.render()
        if (this.checkColision()) {
            this.direction = ''
        }
    }

    render = () => {
        this.position.forEach(segment => {
            segment.element.classList.add('snake-element')
            segment.element.style.left = `${segment.x * this.fieldSize}px`
            segment.element.style.top = `${segment.y * this.fieldSize}px`
            segment.element.style.width = `${this.fieldSize}px`
            segment.element.style.height = `${this.fieldSize}px`
            this.board.append(segment.element)
        })
    }

    move = () => {
        const newSegment = {
            x: this.position[0].x,
            y: this.position[0].y,
            element: document.createElement('div'),
        }

        switch (this.direction) {
            case 'Left': newSegment.x = newSegment.x - 1; break;
            case 'Right': newSegment.x = newSegment.x + 1; break;
            case 'Up': newSegment.y = newSegment.y - 1; break;
            case 'Down': newSegment.y = newSegment.y + 1; break;
        }

        this.position.unshift(newSegment)

        const lastSegment = this.position[this.position.length - 1]
        lastSegment.element.remove()
        this.position.pop()
    }

    handleKeys = (e) => {
        switch (e.code) {
            case 'ArrowLeft': 
                if (this.direction !== 'Right')
                    this.direction = 'Left'
                break;
            case 'ArrowRight': 
                if (this.direction !== 'Left')
                    this.direction = 'Right'
                break;
            case 'ArrowUp':
                if (this.direction !== 'Down')
                    this.direction = 'Up'
                break;
            case 'ArrowDown':
                if (this.direction !== 'Up')
                    this.direction = 'Down'
                break;
        }
    }

    checkColision = () => {
        let colision = null
        const firstSegment = this.position[0]
        this.position.forEach(segment => {
            if (firstSegment.x === segment.x && firstSegment.y === segment.y && firstSegment != segment) {
                colision = true
            }
        })
        if (firstSegment.x < 0 || firstSegment.x >= this.boardSize || firstSegment.y < 0 || firstSegment.y >= this.boardSize) {
            colision = true
        }
        return colision
    }

    eat = () => {
        const newElement = {
            x: this.position[this.position - 1],
            y: this.position[this.position - 1],
            element: document.createElement('div')
        }
        newElement.element.classList.add('snake-element')
        this.position.push(newElement)
    }

    destroy = () => {
        this.position.forEach(segment => {
            segment.element.remove()
        })
    }
}

export default Snake