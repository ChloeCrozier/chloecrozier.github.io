// Global variables
const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "grey",
  "chocolate",
  "black"
];
const shapes = ["square", "circle", "triangle-up", "triangle-down"];
let round = 1;
let objectiveElement;
let time = 5;
let score = 0;
let interval;

// Control flow function execution:
startGame();
addEventListeners();

// Utility functions
function startRound(status) {
  const gameElement = document.querySelector(".game-space");
  const delay = round > 1 ? 2000 : 0;

  stopTimer();

  if (status) {
    gameElement.innerHTML = `<p class="status correct">Correct! +3 seconds</p>`;
  } else {
    gameElement.innerHTML = `<p class="status incorrect">Incorrect! -1 second</p>`;
  }
  setTimeout(() => {
    addRandomShapesToGame(18);
    addShapeEventListeners();
    determineObjectiveElement();
    startTimer();
  }, delay);

  round++;
}

function startGame() {
  round = 1;
  objectiveElement = null;
  time = 5;
  score = 0;
  interval = null;
  document.body.classList.remove("end-game");
  updateScore(score);
  updateTime(time);
  startRound();
}

function endGame() {
  const gameElement = document.querySelector(".game-space");
  stopTimer();
  document.body.classList.add("end-game");
  gameElement.innerHTML = `<p class="game-over ${
    score > 0 ? "positive" : "negative"
  }">Game Over! Score: ${score} pts</p>
  <button type="button" class="restart-button">
    Start Over?
  </button>`;
}

function startTimer() {
  interval = setInterval(function() {
    updateTime(--time);

    if (time <= 0) {
      endGame();
    }
  }, 1 * 1000);
}

function stopTimer() {
  window.clearInterval(interval);
}

function getShapeStyleProperty(type) {
  switch (type) {
    case "triangle-up":
      return "border-bottom-color";
    case "triangle-down":
      return "border-top-color";
    default:
      return "background-color";
  }
}

function getRandomShapeHtml() {
  const randomShapeType = shapes[Math.floor(Math.random() * shapes.length)];
  const shapeStyleProperty = getShapeStyleProperty(randomShapeType);
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return `<div
    class="shape"
    data-shape="${randomShapeType}"
    data-color="${randomColor}"
    style="${shapeStyleProperty}: ${randomColor}">
  </div>`;
}

function addRandomShapesToGame(count) {
  const gameElement = document.querySelector(".game-space");
  gameElement.innerHTML = "";

  for (let i = 0; i < count; i++) {
    gameElement.innerHTML += getRandomShapeHtml();
  }
}

function addShapeEventListeners() {
  const shapeElements = document.querySelectorAll(".shape");
  Array.from(shapeElements).forEach(shapeElement => {
    shapeElement.addEventListener("click", event => {
      const { shape, color } = event.target.dataset;
      const {
        shape: objectiveShape,
        color: objectiveColor
      } = objectiveElement.dataset;

      if (color === objectiveColor && shape === objectiveShape) {
        time += 3;
        updateScore(++score);
        updateTime(time);
        startRound(true);
      } else {
        time -= 1;
        updateScore(--score);
        updateTime(time);
        startRound(false);
      }
    });
  });
}

function addEventListeners() {
  document.addEventListener("click", event => {
    if (event.target && event.target.classList.contains("restart-button")) {
      startGame();
    }
  });
}

function determineObjectiveElement() {
  const descriptionElement = document.querySelector(".description");
  const shapeElements = document.querySelectorAll(".shape");
  const randomIndex = Math.floor(Math.random() * shapeElements.length);
  objectiveElement = shapeElements[randomIndex];
  const { shape, color } = objectiveElement.dataset;
  descriptionElement.innerHTML = `Click on a <strong style="color: ${color};">${color} ${shape}</strong>`;
}

function updateScore(score) {
  document.querySelector(".score").textContent = score;
}

function updateTime(time) {
  document.querySelector(".time").textContent = time;
}
