// Initialize the program
init = () => {
  plotPika(snakePositions[0]);
  appearApple();
};

document.addEventListener('DOMContentLoaded', init);

// Create variables for the grid
const width = 2;
const height = width;
const celCount = width * height;
const widthSize = 100 / width + '%'; // Variable CSS
const grido = document.querySelector('.grid');

// Generates a grid with the dimensions provided
for (let i = 0; i < celCount; i++) {
  const cell = document.createElement('div');
  cell.style.setProperty('--heightCSS', widthSize);
  grido.appendChild(cell);
}

// Creating position coordinates
let y = width / 2;
let x = width / 2;
let snakeHead = y * width + x;
let lengthSnake = 1;
const snakePositions = [snakeHead];

// Get the cells of the grid as an argument
const display = Array.from(document.querySelectorAll('.grid > div'));

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
  console.log(array);
  console.log(typeof array);
  array.forEach(showBody);
  function showBody(cellNumber) {
    console.log(cellNumber);
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
      console.log('proper');
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
    const pos = y * width + x;

    if (pos === applePosition) {
      function eatApple(pos) {
        function appleDisappears(pos) {
          const celdilla = display[pos];

          // console.log(celdilla);
          const cell = celdilla.querySelector('p');
          cell.classList.remove('apple');
          celdilla.removeChild(document.querySelector('p'));
          // console.log('apple dissappeared');
        }

        function snakeGrows() {
          lengthSnake = lengthSnake + 1;
          isEating = true;
        }
        snakeGrows();
        appleDisappears(pos);
        appearApple();
      }

      eatApple(pos);
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
        // console.log(x);
      }
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
        // console.log(x);
      }
      break;
    default:
      console.log('Not an arrow');
  }

  function checkCrash() {
    const checkBody = (elem) => {
      if (elem === snakeHead) {
        console.log('crash');
      }
    };

    snakePositions.forEach(checkBody);
  }
  snakeHead = y * width + x;
  checkCrash();
  checkIfEats();

  plotPika();
}
