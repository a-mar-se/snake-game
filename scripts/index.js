// Initialize the program

let playingBack = true;
const startButton = document.querySelector('.startButton');
const startButtonInf = document.querySelector('.startButtonInfinite');
const startButtonContainer = document.querySelector('.startButtonContainer');
function init() {
  var backSound = document.getElementById('wobble');
  backSound.play();
  const botonP = document.getElementById('wobbleButton');
  botonP.addEventListener('click', pausee);

  function pausee() {
    if (playingBack) {
      console.log(playingBack);
      playingBack = false;
      backSound.pause();
    } else {
      playingBack = true;
      backSound.play();
    }
  }
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
