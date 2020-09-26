import { initGame } from './game-start.js';
import { somethin } from './some.js';

// Initialize the program
function init() {
  console.log('Starting environment');
  const startButton = document.querySelector('.startButton');

  startButton.addEventListener('click', initGame);
}

document.addEventListener('DOMContentLoaded', init);
