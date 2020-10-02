// Initialize the program

const startButton = document.querySelector('.startButton');
const startButtonInf = document.querySelector('.startButtonInfinite');
const startButtonContainer = document.querySelector('.startButtonContainer');
function init() {
  var mercaSound = document.getElementById('wobble');
  mercaSound.play();
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
    window.location.href = './infinite.html';
  }
}

document.addEventListener('DOMContentLoaded', init);
