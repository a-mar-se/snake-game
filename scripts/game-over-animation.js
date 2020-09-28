function gameOverAnimation() {
  const panel = document.createElement('div');
  panel.innerHTML = 'Game Over';
  const doby = document.querySelector('body');
  doby.appendChild(panel);
  panel.classList.add('gameOverPanel');
}

// document.addEventListener('DOMContentLoaded', init);

export { gameOverAnimation };
