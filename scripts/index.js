console.log('Success!');

const width = 4;
const widthSize = 100 / width + '%';
const height = width;

const celCount = width * height;

const grido = document.querySelector('.grid');

for (let i = 0; i < celCount; i++) {
  // console.log(i);
  const cell = document.createElement('div');
  cell.innerText = i;

  cell.style.setProperty('--heightCSS', widthSize);

  grido.appendChild(cell);
}

window.addEventListener('keydown', handleKeyPress);

function keyPressed(event) {
  const keypressed = event.target;
  console.log(keypressed);
}

let y = 0;
let x = 0;

const display = Array.from(document.querySelectorAll('.grid > div'));

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

  plotPika(x, y);
}

function plotPika(posx, posy) {
  const celdilla = display[posy * width + posx];

  celdilla.classList.add('pika');
  console.log(celdilla);
}

function apareceManzana() {
  const randomX = Math.floor(Math.random() * width);
  const randomY = Math.floor(Math.random() * width);

  const celdilla = display[randomY * width + randomX];

  const cell = document.createElement('p');
  cell.classList.add('apple');

  celdilla.appendChild(cell);
  console.log(cell);
}

plotPika(x, y);
apareceManzana();
