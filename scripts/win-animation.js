function winAnimation() {
  const panel = document.createElement('div');
  panel.innerHTML = 'You won!';
  const doby = document.querySelector('body');
  doby.appendChild(panel);
  panel.classList.add('gameOverPanel');
}

// document.addEventListener('DOMContentLoaded', init);

export { winAnimation };
