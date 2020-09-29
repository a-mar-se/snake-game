// Initialize the program

const startButton = document.querySelector('.intro');
function init() {
  // Click the button or press "Enter" or "SpaceBar" to start
  startButton.addEventListener('click', clicStart);
  window.addEventListener('keydown', handleKeyPress);

  function clicStart(event) {
    startCountDown();
    setTimeout(execGame, 3000);
  }
  function handleKeyPress(event) {
    const key = event.key; //

    if (key == 'Enter' || key == ' ') {
      startCountDown();
      setTimeout(execGame, 3000);
    }
  }
  function execGame() {
    window.location.href = './level2.html';
  }
  function startCountDown() {
    let timeDown = 3;
    startButton.innerText = `${timeDown}`;
    const intervalId = setInterval(countDown, 1000);

    function countDown() {
      timeDown = timeDown - 1;
      startButton.innerText = `${timeDown}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
