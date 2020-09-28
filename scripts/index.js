import { initGame } from './game-start.js';
import { somethin } from './some.js';

// Initialize the program
function init() {
  console.log('Starting environment');
  const startButton = document.querySelector('.startButton');

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

document.addEventListener('DOMContentLoaded', init);
