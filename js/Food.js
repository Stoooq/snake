class Food {
	constructor(fieldSize, boardSize) {
		this.fieldSize = fieldSize;
		this.boardSize = boardSize;
		this.positionX = Math.round(Math.random() * (boardSize - 1));
		this.positionY = Math.round(Math.random() * (boardSize - 1));
		this.board = document.querySelector("#game-board");
		this.food = document.createElement("div");
		this.food.classList.add("food");
		this.render();
	}

	render = () => {
		this.food.style.width = `${this.fieldSize * 0.5}px`;
		this.food.style.height = `${this.fieldSize * 0.5}px`;
		this.food.style.left = `${(this.positionX * this.fieldSize) + this.fieldSize * 0.25}px`;
		this.food.style.top = `${(this.positionY * this.fieldSize) + this.fieldSize * 0.25}px`;
		this.board.append(this.food);
	};

	newPosition = () => {
		this.positionX = Math.round(Math.random() * (this.boardSize - 1));
		this.positionY = Math.round(Math.random() * (this.boardSize - 1));
		console.log("new: ", this.positionX, this.positionY);
        this.render()
	};

	destroy = () => {
		this.food.remove();
	};
}

export default Food;
