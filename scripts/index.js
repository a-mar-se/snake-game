import { initGame, playing } from './game-start.js';

// Initialize the program
function init() {
  const startButton = document.createElement('button');
  const startButtonContainer = document.createElement('div');

  startButtonContainer.classList.add('startButtonContainer');
  startButton.classList.add('startButton');
  startButton.innerHTML = 'Press Enter, Spacebar or click here';
  const doby = document.querySelector('body');
  startButtonContainer.appendChild(startButton);
  doby.appendChild(startButtonContainer);
  let winning = false;
  console.log('Starting environment');
  // const startButton = document.querySelector('.startButton');
  // const startButtonContainer = document.querySelector('.startButtonContainer');

  // Click the button or press "Enter" or "SpaceBar" to start
  startButton.addEventListener('click', execGame);
  window.addEventListener('keydown', handleKeyPress);

  function handleKeyPress(event) {
    const key = event.key; //

    if (key == 'Enter' || key == ' ') {
      execGame();
    }
  }
  function execGame() {
    startButton.removeEventListener('click', execGame);
    startButton.removeEventListener('keydown', handleKeyPress);

    startButtonContainer.removeChild(startButton);
    doby.removeChild(startButtonContainer);
    initGame();
    console.log('Winning: ' + winning);
    if (!playing) {
      if (winning) {
        console.log('Wins!');
      } else {
        if (!winning) {
          console.log('looosser!');
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', init);

export { init };
