const DEFAULT_COLOR = "#202124";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
	currentColor = newColor;
}

function setCurrentMode(newMode) {
	activateButton(newMode);
	currentMode = newMode;
}

function setCurrentSize(newSize) {
	currentSize = newSize;
}

const grid = document.querySelector(".grid");
const colorPicker = document.getElementById("color-picker");
const range = document.getElementById("range");
const rangeValue = document.querySelector(".range-value");
const colorBtn = document.querySelector(".color");
const rainbowBtn = document.querySelector(".rainbow");
const eraserBtn = document.querySelector(".eraser");
const clearBtn = document.querySelector(".clear");

colorPicker.addEventListener("change", e => setCurrentColor(e.target.value));
colorBtn.addEventListener("click", () => setCurrentMode("color"));
rainbowBtn.addEventListener("click", () => setCurrentMode("rainbow"));
eraserBtn.addEventListener("click", () => setCurrentMode("eraser"));
clearBtn.addEventListener("click", reloadGrid);
range.addEventListener("input", e => updateRange(e.target, e.target.value));
range.addEventListener("change", e => changeSize(e.target.value));

let isMouseDown = false;
document.body.addEventListener("mousedown", () => (isMouseDown = true));
document.body.addEventListener("mouseup", () => (isMouseDown = false));

function changeSize(value) {
	setCurrentSize(value);
	reloadGrid();
}

function updateRange(range, value) {
	updateRangeValue(value);
	updateRangeBackground(range);
}

function updateRangeValue(value) {
	rangeValue.textContent = `${value} x ${value}`;
}

function updateRangeBackground(range) {
	const percentage =
		((range.value - range.min) / (range.max - range.min)) * 100;
	range.style.background = `linear-gradient(90deg, #202124 ${percentage}%, #fff ${percentage}%)`;
}

function reloadGrid() {
	clearGrid();
	setupGrid(currentSize);
}

function clearGrid() {
	grid.textContent = "";
}

function setupGrid(gridSize) {
	grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

	for (let i = 0; i < gridSize * gridSize; i++) {
		const gridElement = document.createElement("div");
		gridElement.classList.add("grid-element");
		gridElement.addEventListener("mouseover", e => changeColor(e));
		gridElement.addEventListener("mousedown", e => changeColor(e));
		grid.appendChild(gridElement);
	}
}

function generateRGB() {
	return Math.floor(Math.random() * 256);
}

function changeColor(event) {
	if (event.type === "mouseover" && !isMouseDown) return;
	if (currentMode === "rainbow") {
		event.target.style.backgroundColor = `rgb(${generateRGB()}, ${generateRGB()}, ${generateRGB()})`;
	} else if (currentMode === "color") {
		event.target.style.backgroundColor = currentColor;
	} else if (currentMode === "eraser") {
		event.target.style.backgroundColor = "white";
	}
}

function activateButton(newMode) {
	if (currentMode === "rainbow") {
		rainbowBtn.classList.remove("active");
	} else if (currentMode === "color") {
		colorBtn.classList.remove("active");
	} else if (currentMode === "eraser") {
		eraserBtn.classList.remove("active");
	}

	if (newMode === "rainbow") {
		rainbowBtn.classList.add("active");
	} else if (newMode === "color") {
		colorBtn.classList.add("active");
	} else if (newMode === "eraser") {
		eraserBtn.classList.add("active");
	}
}

window.onload = () => {
	setupGrid(currentSize);
	activateButton(DEFAULT_MODE);
};
