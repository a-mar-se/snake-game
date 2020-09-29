let miliseconds = 0;
const loopTime = 10;

var xInput = document.getElementById('xinput').value;
var yInput = document.getElementById('yinput').value;
var freqInput = document.getElementById('freqInput').value;

function sunMove() {
  const sun = document.querySelector('.dodge');
  const sunnyPos =
    47 +
    40 * Math.cos((((0.01 * miliseconds * 100) / loopTime) * Math.PI) / 10);
  const sunnxPos =
    60 +
    30 * Math.sin((((0.01 * miliseconds * 100) / loopTime) * Math.PI) / 10);
  const sunx = `${sunnxPos}%`;
  const shinex = `${
    100 * Math.sin((((0.01 * miliseconds * 100) / loopTime) * Math.PI) / 180) -
    2.25
  }%`;
  const suny = `${sunnyPos}%`;
  const shiney = `${
    100 * Math.cos((((0.01 * miliseconds * 100) / loopTime) * Math.PI) / 10) +
    2.5 * ((0.01 * miliseconds * 100) / 60)
  }%`;

  const planetx = `${sunnxPos - (sunnxPos / 100) * 30}%`;
  const planety = `${sunnyPos - (sunnyPos / 100) * 30}%`;
  sun.style.setProperty('--sunx', sunx);
  sun.style.setProperty('--suny', suny);
  sun.style.setProperty('--shinex', shinex);
  sun.style.setProperty('--shiney', shiney);
  sun.style.setProperty('--planetx', planetx);
  sun.style.setProperty('--planety', planety);
}

const renderTimerTime = () => {
  miliseconds = miliseconds + 0.1;

  sunMove();
};

setInterval(renderTimerTime, 1);
