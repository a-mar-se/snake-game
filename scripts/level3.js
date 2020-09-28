import { sunMove } from './sunmove.js';
import { gameOverAnimation } from './game-over-animation.js';

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
let appleScore = 10;
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
const shopPosition = [];

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
  showAppleScore();
  function showAppleScore() {
    const appleScorePanel = document.querySelector('#applesEaten');
    appleScorePanel.innerText = appleScore;
  }
  function addAppleScore() {
    appleScore = appleScore + 1;
    score = score + 100;
  }
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
  function showLifes() {
    let lifesDisp = ``;
    for (let i = 0; i < lifes; i++) {
      lifesDisp = lifesDisp + '❤';
    }
    document.getElementById('lifes').innerText = lifesDisp;
    document.getElementById('lifes').classList.add('flick');

    setTimeout(() => {
      document.getElementById('lifes').classList.remove('flick');
    }, 250);
  }
  function moveObjects() {
    displaySpeed();
    timeCount = timeCount + 1;
    if (timeCount === Math.floor(10 / speed)) {
      moveSnake();
    }

    // attack bar filling

    // function attackFill() {
    //   const attackPanel = document.querySelector('#attackBar > div');
    //   if (attackProgress < 100) {
    //     attackProgress = attackProgress + 1;
    //   } else {
    //     attackPanel.classList.add('full-bar');
    //   }
    //   const attackProgress2 = attackProgress + 1;
    //   const attackProgressValue = `${attackProgress}%`;
    //   const attackProgressValue2 = `${attackProgress2}%`;

    //   attackPanel.style.setProperty('--attackBar', attackProgressValue);
    //   attackPanel.style.setProperty('--attackBar2', attackProgressValue2);
    // }
    // attackFill();

    // Sun in the background moving

    sunMove(deciSeconds, seconds);
  }

  function resetSnakePosition() {
    const cell = display[snakeHead];

    cell.classList.remove('snakeHead');
    for (let ii = 0; ii < snakePositions.length - 1; ii++) {
      const cellr = display[snakePositions[ii]];

      cellr.classList.remove('snakeBody');
      // }
    }
    for (let i = 0; i < lengthSnake; i++) {
      snakePositions.shift();
    }
    for (let i = 0; i < lengthSnake - 1; i++) {
      snakePositions.push(snakeHead);
    }
    x = 1;
    y = parseInt(width / 2);
    snakeHead = x + y * width;

    // for (let i = 0; i < lengthSnake; i++) {

    // showSnake();
  }
  function restartTimer() {
    intervalId = setInterval(renderTimerTime, 10);

    const resetCell = display[snakeHead];
    resetCell.classList.remove('flick');
    document.getElementById('lifes').classList.remove('flick');
  }
  function moveSnake() {
    var snakeSound = document.getElementById('snakeMove');
    snakeSound.play();

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

    function recieveDamage() {
      console.log('- ❤');
      lifes = lifes - 1;

      showLifes();
      document.getElementById('lifes').classList.add('flick');
      // document.getElementById('lifes').classList.remove('flick');

      clearInterval(intervalId);

      // Game over
      if (lifes <= 0) {
        lifes = 0;
        // Añadir boton de reset
        console.log('Game Over');

        document.getElementById('lifes').classList.remove('flick');

        window.removeEventListener('keydown', handleKeyPress);
        // const cell = display[snakeHead];
        var appleSound = document.getElementById('gameOverSound');
        appleSound.play();
        gameOverAnimation();
        setTimeout(() => {
          // window.location.href = './game-over.html';
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
      wallsPositions.forEach(checkWall);
      snakePositions.forEach(checkBody);
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
            // Condition for winning: when the snake occupies 1/3 of all available cells
            if (appleScore >= 15) {
              console.log('You won!');

              window.location.href = './level3-intro.html';
            }
          }

          checkIfWins();

          appearApple();
        }

        eatApple(snakeHead);
        console.log('Appple eaten!');
        var appleSound = document.getElementById('appleSound');
        appleSound.play();
      }
    }
    timeCount = 0;

    snakeHead = y * width + x;

    plotSnake();
    checkIfEats();
    checkCrash();

    function enterShop() {
      const shopLayout = document.createElement('div');

      shopLayout.classList.add('shopLayout');
      function showOffers() {
        // Vida extra
        const vida = document.createElement('button');
        vida.classList.add('vida');
        shopLayout.appendChild(vida);
        document.querySelector('body').appendChild(shopLayout);

        if (appleScore >= 5) {
          vida.addEventListener('click', comprarVida);
        }

        vida.innerHTML = '❤';

        const precio = document.createElement('p');
        precio.innerHTML = '5 🍏';
        vida.appendChild(precio);

        function comprarVida() {
          vida.removeEventListener('click', comprarVida);
          lifes = lifes + 1;
          appleScore = appleScore - 5;
          console.log('You bought an extra life!');
          if (appleScore >= 5) {
            vida.addEventListener('click', comprarVida);
          }

          showAppleScore();

          showLifes();
          // updateScreens();
        }
        // Reduce speed
      }
      clearInterval(intervalId);

      showOffers();

      const goBackButton = document.createElement('button');
      goBackButton.classList.add('goBack');
      goBackButton.innerHTML = 'Go Back';
      shopLayout.appendChild(goBackButton);

      function goBack() {
        console.log('Exit shop!');
        restartTimer();
        // direction = 'down';
        resetSnakePosition();
        snakePositions.push(snakeHead);
        direction = 'right';
        showSnakeReset();

        document.querySelector('body').removeChild(shopLayout);
      }
      goBackButton.addEventListener('click', goBack);
    }

    function checkShop() {
      for (let i = 0; i < shopPosition.length; i++) {
        if (snakeHead == shopPosition[i]) {
          console.log('Enter shop');
          enterShop();
        }
      }
    }
    checkShop();
  }

  function showSnakeReset() {
    const resetCell = display[snakeHead];
    resetCell.classList.add('snakeHead');
    // resetCell.classList.add('flick');
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
    for (let i = 0; i < shopPosition.length; i++) {
      const cell = display[shopPosition[i]];
      cell.innerHTML = 'SHOP';
    }
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
          if (i === 0 && j == Math.floor(width / 2)) {
            shopPosition.push(wallPosition);
          } else {
            wallsPositions.push(wallPosition);
          }
        }
      }

      function showWall(cellNumber) {
        const cell = display[cellNumber];

        cell.classList.add('wall');
      }
      wallsPositions.forEach(showWall);

      showShop();
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
