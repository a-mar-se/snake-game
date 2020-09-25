// Initialize the program
init = () => {
  startButton.addEventListener('click', initGame);

  // initGame();
};

initGame = () => {
  startButtonContainer.remove('.startButtonContainer');
  startButton.remove('.startButton');
  showWalls();

  plotSnake();

  appearApple();

  function initScorePanel() {
    scorePanel.innerText = score;
  }
  initScorePanel();

  function intro() {
    function moveInAll() {
      const mainBody = document.querySelector('.panels');
      mainBody.classList.add('moveIn');
      const gridof = document.querySelector('.grid-wrapper');
      gridof.classList.add('moveIn');
    }
    moveInAll();
  }
  intro();

  const startTimer = (event) => {
    const renderTimerTime = () => {
      deciSeconds = deciSeconds + 1;
      // seconds = seconds + 0.1;
      let timeString = ``;
      if (deciSeconds === 10) {
        seconds = seconds + 1;
        deciSeconds = 0;
        if (seconds === 60) {
          seconds = 0;
          minutes = minutes + 1;
          if (minutes === 60) {
            minutes = 0;
            hours = hours + 1;
          }
        }
      }
      if (hours < 10) {
        timeString = timeString.concat(`0${hours} `);
      } else {
        timeString = `${timeString}${hourse} `;
      }

      if (minutes < 10) {
        timeString = `${timeString}:0${minutes} `;
      } else {
        timeString = `${timeString}:${minutes} `;
      }

      if (seconds < 10) {
        timeString = timeString.concat(`:0${seconds} `);
      } else {
        timeString = timeString.concat(`:${seconds} `);
      }

      score = score + 1;
      timer.innerText = timeString;
      scorePanel.innerText = score;
      moveObjects();
    };
    intervalId = setInterval(renderTimerTime, 100);
  };
  setTimeout(startTimer, 1000);
};
document.addEventListener('DOMContentLoaded', init);

const startButton = document.querySelector('.startButton');
const startButtonContainer = document.querySelector('.startButtonContainer');

let playing = true;
let lifes = 3;
let score = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

const scorePanel = document.querySelector('#score');
const timer = document.querySelector('#timer');

// Trying to code a smooth movement
let count = 0;
let intervalId = null;

let deciSeconds = 0;

const directions = ['up', 'left', 'down', 'right'];
let timeCount = 0;
let appleScore = 0;
let attackProgress = 0;
function moveObjects() {
  function checkIfEats() {
    // const pos = y * width + x;

    if (snakeHead === applePosition) {
      function eatApple(pos) {
        function appleDisappears(pos) {
          const cell = display[pos];

          cell.classList.remove('apple');
        }

        function snakeGrows() {
          lengthSnake = lengthSnake + 1;
          isEating = true;
        }

        function addAppleScore() {
          appleScore = appleScore + 1;
          score = score + 100;
          const appleScorePanel = document.querySelector('#applesEaten');
          appleScorePanel.innerText = appleScore;
        }
        // appleScore = appleScore + 1;
        // score = score + 100;
        snakeGrows();
        appleDisappears(pos);
        appearApple();
        addAppleScore();
      }

      eatApple(snakeHead);
      console.log('Appple eaten!');
    }
  }
  function recieveDamage() {
    console.log('You lost 1 life!');
    lifes = lifes - 1;
    if (lifes <= 0) {
      lifes = 0;
      // Añadir boton de reset
      console.log('Game Over');
      clearInterval(intervalId);

      const doby = document.querySelector('body');
      const back = document.createElement('div');
      back.classList.add('startButtonContainer');

      const botonReset = document.createElement('button');
      // botonReset.innerText('Restart');
      botonReset.classList.add('startButton');
      back.appendChild(botonReset);
      doby.appendChild(back);
      return;
    }
    // update lifes
    document.getElementById('lifes').innerText = lifes;
  }

  function changeToSafeDirection() {
    moveSnake(directions[(directions.indexOf(direction) + 2) % 4]);

    direction = directions[(directions.indexOf(direction) + 1) % 4];
  }

  // changeToSafeDirection();
  function checkCrash() {
    const checkWall = (elem) => {
      if (elem == snakeHead) {
        console.log(`crash with the wall ${elem}`);
        recieveDamage();
        changeToSafeDirection();
      }
    };
    const checkBody = (elem) => {
      if (snakePositions.indexOf(elem) !== snakePositions.length - 1) {
        if (elem == snakeHead) {
          console.log(`crash with itself at ${elem}`);
          recieveDamage();
        }
      }
    };
    wallsPositions.forEach(checkWall);
    console.log(snakePositions);
    snakePositions.forEach(checkBody);
  }

  function moveSnake(direction) {
    switch (direction) {
      case 'up':
        if (y > 0) {
          y = y - 1;
        }
        break;

      case 'down':
        if (y < width - 1) {
          y = y + 1;
        }
        break;
      case 'right':
        if (x < width - 1) {
          x = x + 1;
        }
        break;
      case 'left':
        if (x > 0) {
          x = x - 1;
        }
      default:
        break;
    }
  }
  timeCount = timeCount + 0.1;
  if (timeCount === speed) {
    moveSnake(direction);
    timeCount = 0;

    snakeHead = y * width + x;

    plotSnake();
    checkCrash();
    checkIfEats();
  }

  // attack bar filling
  function attackFill() {
    const attackPanel = document.querySelector('#attackBar > div');
    if (attackProgress < 100) {
      attackProgress = attackProgress + 1;
    } else {
      attackPanel.classList.add('full-bar');
    }
    const attackProgress2 = attackProgress + 1;
    const attackProgressValue = `${attackProgress}%`;
    const attackProgressValue2 = `${attackProgress2}%`;

    attackPanel.style.setProperty('--attackBar', attackProgressValue);
    attackPanel.style.setProperty('--attackBar2', attackProgressValue2);
  }
  attackFill();

  // Sun in the background moving
  function sunMove() {
    const sun = document.querySelector('.dodge');
    const sunnyPos =
      100 *
      Math.cos(((((seconds + 0.1 * deciSeconds) * 100) / 60) * Math.PI) / 180);
    const sunnxPos =
      100 *
      Math.sin(((((seconds + 0.1 * deciSeconds) * 100) / 60) * Math.PI) / 180);
    const sunx = `${sunnxPos}%`;
    const shinex = `${
      100 *
        Math.sin(
          ((((seconds + 0.1 * deciSeconds) * 100) / 60) * Math.PI) / 180,
        ) -
      2.25
    }%`;
    const suny = `${sunnyPos}%`;
    const shiney = `${
      100 *
        Math.cos(
          ((((seconds + 0.1 * deciSeconds) * 100) / 60) * Math.PI) / 180,
        ) +
      2.5 * (((seconds + 0.1 * deciSeconds) * 100) / 60)
    }%`;

    const planetx = `${sunnxPos - (sunnxPos / 100) * 30}%`;
    const planety = `${sunnyPos - (sunnyPos / 100) * 30}%`;
    sun.style.setProperty('--sunx', sunx);
    sun.style.setProperty('--suny', suny);
    sun.style.setProperty('--shinex', shinex);
    sun.style.setProperty('--shiney', shiney);
    sun.style.setProperty('--planetx', planetx);
    sun.style.setProperty('--planety', planety);
  }
  sunMove();
}

// Head and move direction
let direction = 'up';

// Create variables for the grid
const width = 6;
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
    // insideCell.innerText = i;
    cell.appendChild(insideCell);
    grido.appendChild(cell);
  }
}
createGrid();

// Get the cells of the grid as an argument
const display = Array.from(document.querySelectorAll('.grid > div>p'));

// Creating position coordinates
let y = Math.floor(width / 2);
let x = Math.floor(width / 2);
let snakeHead = y * width + x;
let speed = 0.5;
let lengthSnake = 1;
const snakePositions = [snakeHead];
snakePositions.push(snakeHead);
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

    cell.classList.add('wall');
  }
}
// Showing Pikachu on the cell with coordinates (posx, posy)
function plotSnake() {
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
  const snakeHeadVisual = document.querySelector('.snakeHead');
  let directionRadialBorder = ` `;
  const dircs = [
    '4vw 4vw 1vw 1vw',
    '4vw 1vw 1vw 4vw',
    '1vw 1vw 4vw 4vw',
    '1vw 4vw 4vw 1vw',
  ];
  switch (direction) {
    case 'up': {
      directionRadialBorder = dircs[0];
      break;
    }
    case 'left': {
      directionRadialBorder = dircs[1];
      break;
    }
    case 'down': {
      directionRadialBorder = dircs[2];
      break;
    }
    case 'right': {
      directionRadialBorder = dircs[3];
      break;
    }
  }
  console.log(directionRadialBorder);
  snakeHeadVisual.style.setProperty('--directionSnake', directionRadialBorder);
}

function showSnake(array) {
  array.forEach(showBody);
  function showBody(cellNumber) {
    const cell = display[cellNumber];
    if (cellNumber === array[array.length - 1]) {
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

//
// When pressing a key...

window.addEventListener('keydown', handleKeyPress);
function handleKeyPress(event) {
  const key = event.key; //
  // const { key } = event;  // crea una constante llamada
  // key que va a coger una propiedad de event con el mismo nombre

  switch (key) {
    case 'ArrowUp':
      direction = 'up';

      break;

    case 'ArrowDown':
      direction = 'down';

      break;
    case 'ArrowRight':
      direction = 'right';

      break;
    case 'ArrowLeft':
      direction = 'left';

      break;
    case 'w':
      direction = 'up';

      break;

    case 's':
      direction = 'down';

      break;
    case 'd':
      direction = 'right';

      break;
    case 'a':
      direction = 'left';

      break;
    default:
      break;
  }
}
