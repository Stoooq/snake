import Snake from "./Snake.js";
import Food from "./Food.js";

const board = document.querySelector("#game-board");
const resetBtn = document.querySelector(".reset-btn");
const gameOver = document.querySelector(".game-over");
const scoreBox = document.querySelector(".score");

let score = 0;
let running = true;
const boardSize = 15;
const fieldSize = board.offsetWidth / boardSize

const snake = new Snake(fieldSize, boardSize);
let foods = [new Food(fieldSize, boardSize), new Food(fieldSize, boardSize)];

const startGame = () => {
	if (running) {
		snakeFoodColision();
		snake.update();
		if (snake.checkColision()) {
			endGame();
			running = false;
		}
	}
};

const snakeFoodColision = () => {
	foods.forEach((food) => {
		if (
			food.positionX === snake.position[0].x &&
			food.positionY === snake.position[0].y
		) {
			score += 1;
			scoreBox.textContent = score;
			snake.eat();
			food.destroy();
			const foodIndex = foods.indexOf(food);
			foods.splice(foodIndex, 1);
			createNewFood();
		}
	});
};

const createNewFood = () => {
	const newFood = new Food(fieldSize, boardSize);
	let colision = true;
	let i = 0;
	while (colision) {
		i++;
		console.log(i);
		colision = snake.position.find((segment) => {
			return newFood.positionX === segment.x && newFood.positionY === segment.y;
		});

		if (colision) {
			console.log("oooooo");
			console.log(i);
			newFood.newPosition();
		}
	}
	foods.push(newFood);
};

const endGame = () => {
	resetBtn.classList.remove("hide-btn");
	gameOver.classList.remove("hide-end");
	snake.destroy();
	foods.forEach((food) => {
		food.destroy();
	});
	foods = [];
};

const resetGame = () => {
	resetBtn.classList.add("hide-btn");
	gameOver.classList.add("hide-end");
	const newFood1 = new Food(fieldSize, boardSize);
	const newFood2 = new Food(fieldSize, boardSize);
	foods.push(newFood1);
	foods.push(newFood2);
	snake.position = [];
	const newSegment1 = {
		x: 0,
		y: 0,
		element: document.createElement("div"),
	};
	const newSegment2 = {
		x: 0,
		y: 0,
		element: document.createElement("div"),
	};
	const newSegment3 = {
		x: 0,
		y: 0,
		element: document.createElement("div"),
	};
	snake.position.unshift(newSegment1);
	snake.position.unshift(newSegment2);
	snake.position.unshift(newSegment3);
	snake.direction = "Right";
	score = 0;
	scoreBox.textContent = 0;
	running = true;
};

setInterval(startGame, 125);

resetBtn.addEventListener('click', resetGame)