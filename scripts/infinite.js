import { sunMove } from './sunmove.js';
import { gameOverAnimation } from './game-over-animation.js';
import { winAnimation } from './win-animation.js';

// Head and move direction
let direction = 'right';

// Create variables for the grid
const width = 20;
const mapWidth = width - 2;
const height = width;
const celCount = width * height;
const mapCount = mapWidth ** 2;
const widthSize = 100 / width + '%'; // Variable CSS
const grido = document.querySelector('.grid');
const wallsPositions = [0];
const speedUnitIncrease = 1;

const scorePanel = document.querySelector('#score');
const timer = document.querySelector('#timer');

const directions = ['up', 'left', 'down', 'right'];
let lifes = 3;

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
let money = 100;
let applesEaten = 0;
let attackProgress = 0;

// Creating position coordinates
let y = Math.floor(width / 2);
let x = 1;
let snakeHead = y * width + x;
let speed = 30;
let lengthSnake = 4;

const resetPos = snakeHead;
let snakePositions = [];
// for (let i = 0; i < lengthSnake; i++) {
// }
snakePositions.push(snakeHead);

// console.log(snakePositions);
let isEating = false;

let applePosition = 0;
let applePositionx = 0;
let applePositiony = 0;
let keyJustPressed = false;
const shopPosition = [];
const mercaPosition = [];
let appleCanBeAfraid = true;

let stillInArea = false;
var appleSound = document.getElementById('appleSound');

let speedReduction = 0.15;
let lifesShop = 1;
let lengthReduction = 3;
let applePrice = 1;
let applesNow = 0;

function initGame() {
  var backSound = document.getElementById('endless');
  backSound.volume = 0.3;
  backSound.play();

  const renderTimerTime = () => {
    deciSeconds = deciSeconds + 1;
    let timeString = ``;
    if (deciSeconds === 1000) {
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
    appleScorePanel.innerText = applesEaten;
    const appleinStock = document.querySelector('#applesInStock');
    appleinStock.innerText = applesNow;
    const coinsScorePanel = document.querySelector('#coins');
    coinsScorePanel.innerText = `€ ${Math.floor(money, 1)}`;
  }
  function addAppleScore() {
    applesNow = applesNow + 1;
    applesEaten = applesEaten + 1;
    score = score + 100;
    showAppleScore();
  }

  function showLifes() {
    let lifesDisp = ``;
    for (let i = 0; i < Math.floor(lifes); i++) {
      lifesDisp = lifesDisp + '❤';
    }
    if (lifes % 1 != 0) {
      lifesDisp = lifesDisp + '💔';
    }
    document.getElementById('lifes').innerText = lifesDisp;
  }
  function moveObjects() {
    displaySpeed();
    timeCount = timeCount + 1;
    if (timeCount === Math.floor(1000 / speed)) {
      moveSnake();
    }

    // Sun in the background moving

    sunMove(deciSeconds, seconds);
  }

  function resetSnakePosition() {
    direction = 'right';
    const cell = display[snakeHead];

    cell.classList.remove('snakeHead');
    cell.classList.remove('snakeBody');
    for (let ii = 0; ii < snakePositions.length; ii++) {
      const cellr = display[snakePositions[ii]];
      cellr.classList.remove('snakeBody');
      cellr.classList.remove('snakeHead');
    }
    snakePositions = [];
    x = 1;
    y = parseInt(width / 2);
    snakeHead = x + y * width;
    snakePositions.push(snakeHead);

    window.removeEventListener('keydown', handleKeyPress);
    setTimeout(() => {
      window.addEventListener('keydown', handleKeyPress);
    }, 1000);
  }

  function restartTimer() {
    intervalId = setInterval(renderTimerTime, 1);

    const resetCell = display[snakeHead];
    resetCell.classList.remove('flick');
  }

  function moveSnake() {
    // console.log(snakePositions);
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

    function scaredApple() {
      //  scary Area
      // appleCanBeAfraid = false;
      //  let      exitArea = false;
      stillInArea = false;
      for (let i = -3; i < 4; i++) {
        for (let j = -3; j < 4; j++) {
          if (applePosition == snakeHead + i + width * j) {
            stillInArea = true;
          }
        }
      }
      const celdaManzana = display[applePosition];
      if (stillInArea) {
        if (appleCanBeAfraid) {
          var appleSound = document.getElementById('scaredSound');
          appleSound.play();
          appleCanBeAfraid = false;
        }
        celdaManzana.classList.add('scared');
        celdaManzana.classList.remove('apple');
      } else {
        appleCanBeAfraid = true;
        celdaManzana.classList.add('apple');
        celdaManzana.classList.remove('scared');
      }
    }
    function checkIfAfraid() {
      const celdaManzana = display[applePosition];
    }

    function recieveDamage() {
      console.log('- ❤');
      lifes = lifes - 1;

      showLifes();

      clearInterval(intervalId);

      // Game over
      if (lifes <= 0) {
        debugger;
        lifes = 0;
        console.log('Game Over');

        window.removeEventListener('keydown', handleKeyPress);
        // const cell = display[snakeHead];
        var overSound = document.getElementById('gameOverSound');
        overSound.play();
        gameOverAnimation();
        setTimeout(() => {
          window.location.href = './index.html';
        }, 3000);
        // return playing;
      }
      // Loose one life
      else {
        resetSnakePosition();
        showSnakeReset();
        direction = 'right';

        const resetCell = display[snakeHead];
        setTimeout(flicky, 500);
        // flicky();
        function flicky() {
          resetCell.classList.remove('flick');
        }

        setTimeout(restartTimer, 1000);
      }
    }

    function checkCrash() {
      const checkWall = (elem) => {
        if (elem == snakeHead) {
          console.log(`crash with the wall ${elem}`);
          var wallSound = document.getElementById('wallSound');
          wallSound.volume = 0.5;
          setTimeout(() => {
            wallSound.play();
          }, 1);
          recieveDamage();
        }
      };
      const checkBody = (elem) => {
        if (snakePositions.indexOf(elem) !== snakePositions.length - 1) {
          if (elem == snakeHead) {
            console.log(`crash with itself at ${elem}`);
            var snakeSound = document.getElementById('snakeSound');
            setTimeout(() => {
              snakeSound.play();
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
            cell.classList.remove('scared');
          }

          function snakeGrows() {
            lengthSnake = lengthSnake + 1;
            isEating = true;
          }

          function increaseSpeed() {
            speed = speed + speedUnitIncrease;

            displaySpeed();
          }
          snakeGrows();
          const cell = display[applePosition];

          cell.classList.remove('flick');
          appleDisappears(pos);
          addAppleScore();
          increaseSpeed();

          appearApple();
          function checkIfWins() {
            // Condition for winning: when the snake occupies 1/3 of all available cells
            if (applesEaten >= 100) {
              console.log('You won!');
              var winSound = document.getElementById('winSound');
              setTimeout(winSound.play(), 1);
              winAnimation();

              clearInterval(intervalId);

              window.removeEventListener('keydown', handleKeyPress);

              setTimeout(() => {
                window.location.href = './index.html';
              }, 3000);
            }
          }

          checkIfWins();
        }

        eatApple(snakeHead);
        console.log('Appple eaten!');
        appleSound.volume = 0.1;
        setTimeout(() => {
          const cell = display[applePosition];

          cell.classList.remove('flick');
          appleSound.pause();
          appleSound.play();
        }, 1);
      }
    }
    timeCount = 0;

    snakeHead = y * width + x;
    // snakePositions.push(snakeHead);
    console.log(snakePositions);
    console.log(snakePositions);
    scaredApple();

    plotSnake();

    checkIfEats();
    checkCrash();

    const vida = document.createElement('button');
    const speedProduct = document.createElement('button');
    const reduceSnake = document.createElement('button');
    const shopItem = document.createElement('button');

    function removeShopOptions() {
      vida.removeEventListener('click', comprarVida);
      speedProduct.removeEventListener('click', comprarSpeed);
      speedProduct.classList.remove('available');
      vida.classList.remove('available');
      reduceSnake.removeEventListener('click', comprarLength);
      reduceSnake.classList.remove('available');
      shopItem.removeEventListener('click', comprarItem);
      shopItem.classList.remove('available');
    }

    function showShopOptions() {
      if (money >= 5) {
        speedProduct.addEventListener('click', comprarSpeed);
        speedProduct.classList.add('available');
        vida.addEventListener('click', comprarVida);
        vida.classList.add('available');
        reduceSnake.addEventListener('click', comprarLength);
        reduceSnake.classList.add('available');
      }

      if (money >= 8) {
        shopItem.addEventListener('click', comprarItem);
        shopItem.classList.add('available');
      }
    }

    function purchase() {
      const purchaseSound = document.getElementById('purchase');
      setTimeout(() => {
        purchaseSound.pause();
        purchaseSound.currentTime = 0;
        purchaseSound.play();
      }, 1);
    }
    function updatePurchase() {
      showShopOptions();
      showAppleScore();
      displaySpeed();
      purchase();
    }
    function comprarVida() {
      removeShopOptions();
      lifes = lifes + lifesShop;
      money = money - 5;
      console.log('You bought an extra life!');
      updatePurchase();
      showLifes();
    }

    function getItem(ittem) {
      switch (ittem) {
        case 'xspeed':
          speedReduction = speedReduction * 1.5;
          break;
        case 'xlifes':
          lifesShop = lifesShop * 1.5;
          break;
        case 'xreduce':
          lengthReduction = lengthReduction * 1.5;
          break;
        case 'xapples':
          applePrice = applePrice * 1.2;
          break;
      }
    }

    const items = ['x1.5 💤', 'x1.5 ❤', 'x1.5 🛠', 'x1.2 €/🍏'];
    function comprarItem(niceItem) {
      removeShopOptions();

      getItem(niceItem);
      money = money - 8;
      console.log('You bought an item!');
      updatePurchase();
    }

    function comprarSpeed() {
      removeShopOptions();
      speed = speed - speedReduction;
      money = money - 5;
      console.log('You bought a reduction in speed!');
      updatePurchase();
    }

    function comprarLength() {
      removeShopOptions();

      // Reduce length and update money
      for (let i = 0; i < lengthReduction; i++) {
        if (lengthSnake > 1) {
          lengthSnake = lengthSnake - 1;
          const tail = snakePositions.shift();
          const tailCell = display[tail];
          tailCell.classList.remove('snakeBody');
          tailCell.classList.remove('snakeHead');
        }
      }
      money = money - 5;
      console.log('You bought a reduction in speed!');
      updatePurchase();
    }

    function enterMerca() {
      money = money + applesNow * applePrice;
      applesNow = 0;
      console.log('Exit Mercadillo!');
      resetSnakePosition();
      showAppleScore();
    }
    function enterShop() {
      window.removeEventListener('keydown', handleKeyPress);
      const shopItemObject = items[Math.floor(Math.random() * 4)];

      window.removeEventListener('keydown', handleKeyPress);

      window.addEventListener('keydown', buysome);
      const shopLayout = document.createElement('div');

      shopLayout.classList.add('shopLayout');
      function showOffers() {
        // Vida extra

        function optionVida() {
          vida.classList.add('vida');
          shopLayout.appendChild(vida);
          document.querySelector('body').appendChild(shopLayout);
          if (money >= 5) {
            vida.addEventListener('click', comprarVida);
            vida.classList.add('available');
          }
          vida.innerHTML = '❤';
          const precio = document.createElement('p');
          precio.innerHTML = '€5 (Press "l")';
          vida.appendChild(precio);
        }

        function optionSpeed() {
          speedProduct.classList.add('vida');
          shopLayout.appendChild(speedProduct);
          document.querySelector('body').appendChild(shopLayout);

          if (money >= 5) {
            window.addEventListener('keydown', buysome);
            speedProduct.addEventListener('click', comprarSpeed);
            speedProduct.classList.add('available');
          }

          speedProduct.innerHTML = '💤';

          const precio = document.createElement('p');
          precio.innerHTML = '5 € (Press "s")';
          speedProduct.appendChild(precio);

          // Reduce speed
        }

        function optionLength() {
          reduceSnake.classList.add('vida');
          shopLayout.appendChild(reduceSnake);
          document.querySelector('body').appendChild(shopLayout);

          if (money >= 5) {
            window.addEventListener('keydown', buysome);
            reduceSnake.addEventListener('click', comprarLength);
            reduceSnake.classList.add('available');
          }

          reduceSnake.innerHTML = '🛠';

          const precio = document.createElement('p');
          precio.innerHTML = '€5 (Press "r")';
          reduceSnake.appendChild(precio);
        }
        function optionItem(itt) {
          shopItem.classList.add('vida');
          shopLayout.appendChild(shopItem);
          document.querySelector('body').appendChild(shopLayout);
          if (money >= 8) {
            shopItem.addEventListener('click', comprarItem);
            shopItem.classList.add('available');
          }
          shopItem.innerHTML = itt;
          const precio = document.createElement('p');
          precio.innerHTML = '€8 (Press "i")';
          shopItem.appendChild(precio);
        }
        optionItem(shopItemObject);
        optionLength();
        optionVida();
        optionSpeed();
      }

      function buysome(event) {
        const key = event.key;
        switch (key) {
          case 's': {
            if (money >= 5) {
              comprarSpeed();
            }
            break;
          }
          case 'r': {
            if (money >= 5) {
              comprarLength();
            }
            break;
          }

          case 'l': {
            if (money >= 5) {
              comprarVida();
            }
            break;
          }
          case 'i': {
            if (money >= 8) {
              comprarItem(shopItemObject);
            }
            break;
          }

          case ' ': {
            goBack();
            break;
          }
          case 'Enter': {
            goBack();
            break;
          }
        }
      }

      clearInterval(intervalId);
      showOffers();

      const goBackButton = document.createElement('button');
      goBackButton.classList.add('goBack');
      goBackButton.innerHTML = 'Go Back (Press Spacebar or Enter)';
      shopLayout.appendChild(goBackButton);

      function goBack() {
        console.log('Exit shop!');
        restartTimer();
        resetSnakePosition();

        window.removeEventListener('keydown', buysome);
        document.querySelector('body').removeChild(shopLayout);
        window.addEventListener('keydown', handleKeyPress);
        debugger;
      }
      window.addEventListener('keydown', buysome);
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
    function checkMerca() {
      for (let i = 0; i < mercaPosition.length; i++) {
        if (snakeHead == mercaPosition[i]) {
          console.log('Enter mercadillo');
          enterMerca();
        }
      }
    }

    checkMerca();
    checkShop();
  }

  function showSnakeReset() {
    const resetCell = display[snakeHead];
    resetCell.classList.add('snakeHead');
    resetCell.classList.add('flick');
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
  function showMerca() {
    for (let i = 0; i < mercaPosition.length; i++) {
      const cell = display[mercaPosition[i]];
      cell.innerHTML = 'Merca';
    }
  }
  const speedPanel = document.getElementById('speed');
  function displaySpeed() {
    speedPanel.innerHTML = `${Math.round(speed * 100) / 100} cells/s`;
  }
  function showWalls() {
    // Define the walls positions
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        if (i === 0 || i === width - 1 || j === 0 || j === width - 1) {
          const wallPosition = j * width + i;
          if (i == 0 && j == Math.floor(width / 2)) {
            shopPosition.push(wallPosition);
          } else {
            if (i == width - 1 && j == Math.floor(width / 2)) {
              mercaPosition.push(wallPosition);
            } else {
              wallsPositions.push(wallPosition);
            }
          }
        }
      }

      function showWall(cellNumber) {
        const cell = display[cellNumber];

        cell.classList.add('wall');
      }
      wallsPositions.forEach(showWall);
      showMerca();
      showShop();
    }
  }
  // Showing Pikachu on the cell with coordinates (posx, posy)
  function plotSnake() {
    snakePositions.push(snakeHead);
    const head = snakePositions[snakePositions.length - 1];
    const headCell = display[head];
    headCell.classList.add('snakeHead');

    const tail = snakePositions.shift();
    snakePositions.unshift(tail);
    if (!isEating) {
      snakePositions.shift();
      const tailCell = display[tail];
      tailCell.classList.remove('snakeBody');

      // tailCell.classList.remove('snakeHead');
    }
    if (lengthSnake > snakePositions.length) {
      console.log(lengthSnake);
      snakePositions.unshift(tail);
    }
    for (let i = 0; i < snakePositions.length; i++) {
      const cell = display[snakePositions[i]];
      cell.classList.remove('snakeHead');
      cell.classList.add('snakeBody');
    }

    isEating = false;
    showSnake(snakePositions);

    const snakeHeadVisual = document.querySelector('.snakeHead');
    // console.log(snakePositions);
    // console.log(snakeHeadVisual);
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
    // console.log(snakePositions);
    array.forEach(showBody);
    function showBody(cellNumber) {
      const celly = display[cellNumber];
      if (cellNumber === array[array.length - 1]) {
        celly.classList.add('snakeHead');
      } else {
        celly.classList.add('snakeBody');
        celly.classList.remove('snakeHead');
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
    intervalId = setInterval(renderTimerTime, 1);
  };
  setTimeout(startTimer, 1000);
}

document.addEventListener('DOMContentLoaded', initGame);
