// Initialize the program
init = () => {
  showWalls();

  plotSnake();

  appearApple();
};

document.addEventListener('DOMContentLoaded', init);

// Create variables for the grid
const width = 7;
const mapWidth = width - 2;
const height = width;
const celCount = width * height;
const mapCount = mapWidth ** 2;
const widthSize = 100 / width + '%'; // Variable CSS
const grido = document.querySelector('.grid');
const wallsPositions = [0];

// Generates a grid with the dimensions provided
function createGrid() {
  for (let i = 0; i < celCount; i++) {
    const cell = document.createElement('div');

    cell.style.setProperty('--heightCSS', widthSize);

    const insideCell = document.createElement('p');
    insideCell.innerText = i;
    cell.appendChild(insideCell);
    grido.appendChild(cell);
  }
}
createGrid();

// Get the cells of the grid as an argument
const display = Array.from(document.querySelectorAll('.grid > div>p'));
console.log(display);

// Creating position coordinates
let y = Math.floor(width / 2);
let x = Math.floor(width / 2);
let snakeHead = y * width + x;
let lengthSnake = 1;
const snakePositions = [snakeHead];
snakePositions.push(snakeHead);
console.log(snakePositions);
let isEating = false;

let applePosition = 0;
let applePositionx = 0;
let applePositiony = 0;

function showWalls() {
  // Define the walls positions
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      if (i === 0 || i === width - 1 || j === 0 || j === width - 1) {
        const wallPosition = j * width + i;
        if (i !== 0 || j !== 0) {
          wallsPositions.push(wallPosition);
        }
      }
    }
  }
  wallsPositions.forEach(showWalls);
  function showWalls(cellNumber) {
    const cell = display[cellNumber];
    console.log(cell);
    console.log(cellNumber);

    cell.classList.add('wall');
  }
}
// Showing Pikachu on the cell with coordinates (posx, posy)
function plotSnake() {
  console.log(snakePositions[0]);
  const head = snakePositions[snakePositions.length - 1];
  const headCell = display[head];
  headCell.classList.remove('snakeHead');

  if (!isEating) {
    const tail = snakePositions.shift();
    const tailCell = display[tail];
    tailCell.classList.remove('snakeBody');
  }

  isEating = false;
  snakePositions.push(snakeHead);
  showSnake(snakePositions);
}

function showSnake(array) {
  console.log('accessing showsnake');
  console.log(array);
  array.forEach(showBody);
  function showBody(cellNumber) {
    const cell = display[cellNumber];
    if (cellNumber === array[array.length - 1]) {
      console.log(array);
      console.log(cell);
      cell.classList.add('snakeHead');
    } else {
      cell.classList.add('snakeBody');
    }
  }
}

// Function that generates a random position for an apple and shows it on screen
function appearApple() {
  function generateNumber() {
    return Math.floor(Math.random() * mapWidth);
  }
  // Generate random coordinates for the apple
  let wrongPosition = true;

  while (wrongPosition) {
    applePositionx = 1 + generateNumber();

    applePositiony = 1 + generateNumber();
    applePosition = applePositionx + applePositiony * width;
    wrongPosition = snakePositions.includes(applePosition);
  }

  // Find the cell of those coordinates
  const cell = display[applePosition];

  // Create new element to show on top of the field
  cell.classList.add('apple');
  console.log(`Apple created at position ${applePosition}`);
}

// When pressing a key...
window.addEventListener('keydown', handleKeyPress);
function handleKeyPress(event) {
  const key = event.key; //
  // const { key } = event;  // crea una constante llamada
  // key que va a coger una propiedad de event con el mismo nombre

  function checkIfEats() {
    // const pos = y * width + x;

    if (snakeHead === applePosition) {
      function eatApple(pos) {
        function appleDisappears(pos) {
          const cell = display[pos];

          cell.classList.remove('apple');
          // celdilla.removeChild(document.querySelector('p'));
          // celdilla.classList.add('snakeBody');
        }

        function snakeGrows() {
          lengthSnake = lengthSnake + 1;
          isEating = true;
        }
        snakeGrows();
        appleDisappears(pos);
        appearApple();
      }

      eatApple(snakeHead);
      console.log('Appple eaten!');
    }
  }

  switch (key) {
    case 'ArrowUp':
      if (y > 1) {
        y = y - 1;
      }
      break;

    case 'ArrowDown':
      if (y < width - 2) {
        y = y + 1;
      }
      break;
    case 'ArrowRight':
      if (x < width - 2) {
        x = x + 1;
      }
      break;
    case 'ArrowLeft':
      if (x > 1) {
        x = x - 1;
      }

      break;
    case 'w':
      if (y > 1) {
        y = y - 1;
      }
      break;

    case 's':
      if (y < width - 2) {
        y = y + 1;
      }
      break;
    case 'd':
      if (x < width - 2) {
        x = x + 1;
      }
      break;
    case 'a':
      if (x > 1) {
        x = x - 1;
      }
      break;
    default:
      console.log('Not an arrow');
  }
  console.log(`(x,y)=${x},${y}`);

  function checkCrash() {
    const checkBody = (elem) => {
      if (elem === snakeHead) {
        function gameOver() {
          console.log('Game Over');
        }
        console.log(`crash in position ${elem}`);
        gameOver();
      }
    };

    snakePositions.forEach(checkBody);
    wallsPositions.forEach(checkBody);
  }
  snakeHead = y * width + x;

  plotSnake();
  checkCrash();
  checkIfEats();
}
