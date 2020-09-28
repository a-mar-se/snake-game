import { initLevel2 } from './level2-start.js';

// Initialize the program
function init_level2() {
  const startButton = document.createElement('button');
  const startButtonContainer = document.createElement('div');

  startButtonContainer.classList.add('startButtonContainer');
  startButton.classList.add('startButton');
  startButton.innerHTML = 'Level 2';
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
    initLevel2();
    console.log('Winning: ' + winning);
  }
}
export { init_level2 };

// document.addEventListener('DOMContentLoaded', init_level2);
