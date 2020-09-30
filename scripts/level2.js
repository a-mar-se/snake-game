import { sunMove } from './sunmove.js';
import { gameOverAnimation } from './game-over-animation.js';
import { winAnimation } from './win-animation.js';
// Head and move direction
let direction = 'right';

// Create variables for the grid
const width = 12;
const mapWidth = width - 2;
const height = width;
const celCount = width * height;
const mapCount = mapWidth ** 2;
const widthSize = 100 / width + '%'; // Variable CSS
const grido = document.querySelector('.grid');
const wallsPositions = [0];

const scorePanel = document.querySelector('#score');
const timer = document.querySelector('#timer');

const directions = ['up', 'left', 'down', 'right'];
let lifes = 1;

let lifesDisp = ``;
for (let i = 0; i < lifes; i++) {
  lifesDisp = lifesDisp + '❤';
}
document.getElementById('lifes').innerText = lifesDisp;

let reseting = false;
let score = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

// Trying to code a smooth movement
let count = 0;
let intervalId = null;

let deciSeconds = 0;

let timeCount = 0;
let appleScore = 0;
let attackProgress = 0;

// Creating position coordinates
let y = Math.floor(width / 2);
let x = 1;
let snakeHead = y * width + x;
let speed = 0.25;
let lengthSnake = 4;

const snakePositions = [snakeHead];
for (let i = 0; i < lengthSnake; i++) {
  snakePositions.push(snakeHead);
}
let isEating = false;

let applePosition = 0;
let applePositionx = 0;
let applePositiony = 0;
let keyJustPressed = false;
let shopPosition = 0;

function initGame() {
  const renderTimerTime = () => {
    deciSeconds = deciSeconds + 1;
    let timeString = ``;
    if (deciSeconds === 100) {
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

    if (deciSeconds % 10 === 0) {
      score = score + 1;
      timer.innerText = timeString;
      scorePanel.innerText = score;
    }
    moveObjects();
  };

  function removingElements() {
    const cellr = display[snakeHead];

    cellr.classList.remove('snakeHead');
    for (let ii = 0; ii < snakePositions.length - 1; ii++) {
      const cellr = display[snakePositions[ii]];

      cellr.classList.remove('snakeBody');
      snakePositions.splice();
      // }
    }
    // snakePositions = [];
    const cellApp = display[applePosition];

    cellApp.classList.remove('apple');

    for (let i = 0; i < celCount; i++) {
      const cell = document.querySelector('.grid div');
      grido.removeChild(cell);
    }
  }
  function moveObjects() {
    displaySpeed();
    timeCount = timeCount + 1;
    if (timeCount === Math.floor(10 / speed)) {
      moveSnake();
    }

    // Sun in the background moving

    sunMove(deciSeconds, seconds);
  }

  function moveSnake() {
    var snakeSound = document.getElementById('snakeMove');
    snakeSound.play();

    switch (direction) {
      case 'up':
        if (y > 0) {
          y = y - 1;
        } else {
          y = width - 1;
        }
        break;

      case 'down':
        if (y < width - 1) {
          y = y + 1;
        } else {
          y = 0;
        }
        break;
      case 'right':
        if (x < width - 1) {
          x = x + 1;
        } else {
          x = 0;
        }
        break;
      case 'left':
        if (x > 0) {
          x = x - 1;
        } else {
          x = width - 1;
        }
      default:
        break;
    }

    function recieveDamage() {
      console.log('- ❤');
      lifes = lifes - 1;
      let lifesDisp = ``;
      for (let i = 0; i < lifes; i++) {
        lifesDisp = lifesDisp + '❤';
      }
      document.getElementById('lifes').innerText = lifesDisp;
      document.getElementById('lifes').classList.add('flick');
      // document.getElementById('lifes').classList.remove('flick');

      clearInterval(intervalId);

      function resetSnakePosition() {
        const cell = display[snakeHead];

        cell.classList.remove('snakeHead');
        for (let ii = 0; ii < snakePositions.length; ii++) {
          const cellr = display[snakePositions[ii]];

          cellr.classList.remove('snakeBody');
          // }
        }
        for (let i = 0; i < lengthSnake; i++) {
          snakePositions.shift();
        }

        x = 1;
        y = parseInt(width / 2);
        snakeHead = x + y * width;

        // for (let i = 0; i < lengthSnake; i++) {

        // showSnake();
      }
      function showSnakeReset() {
        const resetCell = display[snakeHead];
        resetCell.classList.add('snakeHead');
        resetCell.classList.add('flick');
      }
      function restartTimer() {
        intervalId = setInterval(renderTimerTime, 10);

        const resetCell = display[snakeHead];
        resetCell.classList.remove('flick');
        document.getElementById('lifes').classList.remove('flick');
      }
      // Game over
      if (lifes <= 0) {
        lifes = 0;
        // Añadir boton de reset
        console.log('Game Over');

        document.getElementById('lifes').classList.remove('flick');
        // resetSnakePosition();
        // removingElements();
        // direction = 'right';
        // showSnakeReset();

        window.removeEventListener('keydown', handleKeyPress);
        // const cell = display[snakeHead];
        var appleSound = document.getElementById('gameOverSound');
        appleSound.play();
        gameOverAnimation();
        setTimeout(() => {
          window.location.href = './index.html';
        }, 3000);
        // return playing;
      }
      // Loose one life
      else {
        setTimeout(restartTimer, 1000);

        resetSnakePosition();
        snakePositions.push(snakeHead);
        direction = 'right';
        showSnakeReset();
      }
    }

    function checkCrash() {
      const checkWall = (elem) => {
        if (elem == snakeHead) {
          console.log(`crash with the wall ${elem}`);
          var appleSound = document.getElementById('wallSound');
          setTimeout(() => {
            appleSound.play();
          }, 1);
          recieveDamage();
          // changeToSafeDirection();
        }
      };
      const checkBody = (elem) => {
        if (snakePositions.indexOf(elem) !== snakePositions.length - 1) {
          if (elem == snakeHead) {
            console.log(`crash with itself at ${elem}`);
            var appleSound = document.getElementById('snakeSound');
            setTimeout(() => {
              appleSound.play();
            }, 1);
            recieveDamage();
          }
        }
      };
      snakePositions.forEach(checkBody);

      wallsPositions.forEach(checkWall);
    }

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

          function increaseSpeed() {
            speed = speed + 0.05;

            displaySpeed();
          }
          // appleScore = appleScore + 1;
          // score = score + 100;
          snakeGrows();
          appleDisappears(pos);
          addAppleScore();
          increaseSpeed();
          function checkIfWins() {
            // winAnimation();
            // Condition for winning: when the snake occupies 1/3 of all available cells
            if (appleScore >= 5) {
              console.log('You won!');
              var winSound = document.getElementById('winSound');
              setTimeout(winSound.play(), 1);
              winAnimation();

              clearInterval(intervalId);

              window.removeEventListener('keydown', handleKeyPress);

              setTimeout(() => {
                window.location.href = './level3-intro.html';
              }, 3000);
            }
          }

          checkIfWins();

          appearApple();
        }

        eatApple(snakeHead);
        console.log('Appple eaten!');
        var appleSound = document.getElementById('appleSound');
        appleSound.volume = 0.2;
        appleSound.play();
      }
    }
    timeCount = 0;

    snakeHead = y * width + x;

    plotSnake();
    checkIfEats();
    checkCrash();
  }

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

  function showShop() {
    const cell = display[shopPosition];
    cell.innerHTML = 'SHOP NOT AVAILABLE';
  }
  const speedPanel = document.getElementById('speed');
  function displaySpeed() {
    speedPanel.innerHTML = `${Math.round(speed * 10) / 10} cells / s`;
  }
  function showWalls() {
    // Define the walls positions
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        if (i === 0 || i === width - 1 || j === 0 || j === width - 1) {
          const wallPosition = j * width + i;
          // if (j === 0 && i === Math.floor(width / 2)) {
          //   // shopPosition = wallPosition;
          // } else {
          wallsPositions.push(wallPosition);
        }
      }
    }

    function showWall(cellNumber) {
      const cell = display[cellNumber];

      cell.classList.add('wall');
    }
    wallsPositions.forEach(showWall);
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
    snakeHeadVisual.style.setProperty(
      '--directionSnake',
      directionRadialBorder,
    );
  }

  function showSnake(array) {
    array.forEach(showBody);
    function showBody(cellNumber) {
      const celly = display[cellNumber];
      if (cellNumber === array[array.length - 1]) {
        celly.classList.add('snakeHead');
      } else {
        celly.classList.add('snakeBody');
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
    cell.classList.add('flick');

    setTimeout(() => cell.classList.remove('flick'), 1000);

    console.log(`Apple created at position ${applePosition}`);
  }

  //
  // When pressing a key...

  window.addEventListener('keydown', handleKeyPress);
  function handleKeyPress(event) {
    const key = event.key; //
    // const { key } = event;  // crea una constante llamada
    // key que va a coger una propiedad de event con el mismo nombre
    if (!keyJustPressed) {
      switch (key) {
        case 'ArrowUp':
          if (direction !== 'down') {
            direction = 'up';
            moveSnake();
          }

          break;

        case 'ArrowDown':
          if (direction !== 'up') {
            direction = 'down';

            moveSnake();
          }
          break;
        case 'ArrowRight':
          if (direction !== 'left') {
            direction = 'right';

            moveSnake();
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'right') {
            direction = 'left';

            moveSnake();
          }
          break;
        case 'w':
          if (direction !== 'down') {
            direction = 'up';

            moveSnake();
          }
          break;

        case 's':
          if (direction !== 'up') {
            direction = 'down';

            moveSnake();
          }
          break;
        case 'd':
          if (direction !== 'left') {
            direction = 'right';

            moveSnake();
          }
          break;
        case 'a':
          if (direction !== 'right') {
            direction = 'left';

            moveSnake();
          }
          break;
        default:
          break;
      }
      // keyJustPressed = true;
    }
  }

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
    intervalId = setInterval(renderTimerTime, 10);
  };
  const gameRunning = setTimeout(startTimer, 1000);
}

document.addEventListener('DOMContentLoaded', initGame);
