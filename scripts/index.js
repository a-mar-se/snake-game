// Initialize the program

const startButton = document.querySelector('.startButton');
const startButtonInf = document.querySelector('.startButtonInfinite');
const startButtonContainer = document.querySelector('.startButtonContainer');
function init() {
  // Click the button or press "Enter" or "SpaceBar" to start
  startButton.addEventListener('click', execGame);
  startButtonInf.addEventListener('click', initInfinite);
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
  function initInfinite() {
    window.location.href = './level1inf.html';
  }
}

document.addEventListener('DOMContentLoaded', init);
