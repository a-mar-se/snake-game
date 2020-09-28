import { initGame } from './game-start.js';
import { somethin } from './some.js';

// Initialize the program
function init() {
  console.log('Starting environment');
  const startButton = document.querySelector('.startButton');

  startButton.addEventListener('click', execGame);
  function execGame() {
    startButton.removeEventListener('click', initGame);
    const winning = initGame();

    console.log(winning);

    if (winning) {
      console.log('Wins!');
    } else {
      if (!winning) {
        console.log('looosser!');
      }
    }
  }
}

// init();
document.addEventListener('DOMContentLoaded', init);

// const startButton = document.createElement('button');
// const startButtonContainer = document.createElement('div');
// startButton.classList.add('startButton');
// startButtonContainer.appendChild(startButton);
// const doby = document.querySelector('body');
// doby.appendChild(startButtonContainer);
