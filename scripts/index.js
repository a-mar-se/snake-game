// Initialize the program
init = () => {
  plotPika(snakePositions[0]);
  appearApple();
};

document.addEventListener('DOMContentLoaded', init);

// Create variables for the grid
const width = 5;
const height = width;
const celCount = width * height;
const widthSize = 100 / width + '%'; // Variable CSS
const grido = document.querySelector('.grid');

const wallsPositions = [];

// Define the walls positions
for (let i = 0; i < width; i++) {
  for (let j = 0; j < width; j++) {
    wallsPositions.push(j * width + i);
  }
}
console.log(wallsPositions);

// Generates a grid with the dimensions provided
for (let i = 0; i < celCount; i++) {
  const cell = document.createElement('div');
  cell.style.setProperty('--heightCSS', widthSize);
  grido.appendChild(cell);
}

// Get the cells of the grid as an argument
const display = Array.from(document.querySelectorAll('.grid > div'));
console.log(display);

wallsPositions.forEach(showWalls);
function showWalls(cellNumber) {
  const wally = document.createElement('p');
  wally.classList.add('wall');
  console.log(cellNumber);
  console.log(display[cellNumber]);
  const cell = display[cellNumber];
  cell.appendChild(wally);
}

// Creating position coordinates
let y = Math.floor(width / 2);
let x = Math.floor(width / 2);
let snakeHead = y * width + x;
let lengthSnake = 1;
const snakePositions = [snakeHead];

let isEating = false;

let applePosition = 0;

// Showing Pikachu on the cell with coordinates (posx, posy)
function plotPika() {
  if (!isEating) {
    const tail = snakePositions.shift();
    const tailCell = display[tail];
    tailCell.classList.remove('pika');
  }
  isEating = false;
  snakePositions.push(snakeHead);
  console.log(snakePositions);
  showSnake(snakePositions);
}

function showSnake(array) {
  array.forEach(showBody);
  function showBody(cellNumber) {
    const cell = display[cellNumber];
    cell.classList.add('pika');
  }
}
function appearApple() {
  function generateNumber() {
    return Math.floor(Math.random() * celCount);
  }
  // Generate random coordinates for the apple
  applePosition = generateNumber();
  snakePositions.forEach((elem) => {
    if (applePosition === elem) {
      applePosition = generateNumber();
    }
  });
  // Find the cell of those coordinates
  const celdilla = display[applePosition];

  // Create new element to show on top of the field
  const cell = document.createElement('p');
  cell.classList.add('apple');
  celdilla.appendChild(cell);

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
          const celdilla = display[pos];

          const cell = celdilla.querySelector('p');
          cell.classList.remove('apple');
          celdilla.removeChild(document.querySelector('p'));
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
      if (y > 0) {
        y = y - 1;
      }
      break;

    case 'ArrowDown':
      if (y < width - 1) {
        y = y + 1;
      }
      break;
    case 'ArrowRight':
      if (x < width - 1) {
        x = x + 1;
      }
      break;
    case 'ArrowLeft':
      if (x > 0) {
        x = x - 1;
      }

      break;
    case 'w':
      if (y > 0) {
        y = y - 1;
      }
      break;

    case 's':
      if (y < width - 1) {
        y = y + 1;
      }
      break;
    case 'd':
      if (x < width - 1) {
        x = x + 1;
      }
      break;
    case 'a':
      if (x > 0) {
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
        console.log(`crash in position ${elem}`);
        gameOver();
      }
    };

    snakePositions.forEach(checkBody);
    wallsPositions.forEach(checkBody);
  }
  snakeHead = y * width + x;
  checkCrash();
  checkIfEats();

  plotPika();
}
