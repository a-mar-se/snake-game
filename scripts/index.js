// Initialize the program
init = () => {
  plotPika(x, y);
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
let y = 0;
let x = 0;

// Get the cells of the grid as an argument
const display = Array.from(document.querySelectorAll('.grid > div'));

// Showing Pikachu on the cell with coordinates (posx, posy)
function plotPika(posx, posy) {
  const celdilla = display[posy * width + posx];
  celdilla.classList.add('pika');
  // console.log('Pika Pika!');
}

let manzy = 0;
let manzx = 0;
function appearApple() {
  function generateNumber() {
    return Math.floor(Math.random() * width);
  }
  // Generate random coordinates for the apple
  manzy = generateNumber();
  manzx = generateNumber();
  while (manzx === x && manzy === y) {
    manzy = generateNumber();
    manzx = generateNumber();
  }
  // Find the cell of those coordinates
  const celdilla = display[manzy * width + manzx];

  // Create new element to show on top of the field
  const cell = document.createElement('p');
  cell.classList.add('apple');
  celdilla.appendChild(cell);

  console.log(`Apple created at position ${manzx},${manzy}`);
}

function eatApple(x, y) {
  // snakeGrows(tailCell);
  appleDisappears(x, y);
  appearApple();
}

function appleDisappears(posx, posy) {
  const celdilla = display[posy * width + posx];

  console.log(celdilla);
  const cell = celdilla.querySelector('p');
  cell.classList.remove('apple');
  celdilla.removeChild(document.querySelector('p'));
  console.log('apple dissappeared');
  // plotPika();
}

function snakeGrows() {}

// When pressing a key...
window.addEventListener('keydown', handleKeyPress);
function handleKeyPress(event) {
  const key = event.key; //
  // const { key } = event;  // crea una constante llamada
  // key que va a coger una propiedad de event con el mismo nombre

  console.log(key);

  const lastCell = display[y * width + x];
  lastCell.classList.remove('pika');

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
    default:
      console.log('Not an arrow');
  }
  checkIfEats(x, y);
  console.log(x, y);
  console.log(manzx, manzy);
  plotPika(x, y);
}

function checkIfEats(x, y) {
  if (x === manzx && y === manzy) {
    eatApple(x, y);
    console.log('Appple eaten!');
  }
}
