// Initialize the program

const startButton = document.querySelector('.startButton');
const startButtonContainer = document.querySelector('.startButtonContainer');
function init() {
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
    window.location.href = './level1-intro.html';
  }
}

document.addEventListener('DOMContentLoaded', init);
