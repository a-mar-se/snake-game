let miliseconds = 0;

let xInput = document.getElementById('xinput').value;
let yInput = document.getElementById('yinput').value;
let freqInput = document.getElementById('freqInput').value;

let xInputp = document.getElementById('xinputp').value;
let yInputp = document.getElementById('yinputp').value;
let freqInputp = document.getElementById('freqInputp').value;

function sunMove() {
  const sun = document.querySelector('.dodge');
  const sunnyPos = 50 + yInput * Math.cos((miliseconds * Math.PI) / freqInput);
  const sunnxPos = 50 + xInput * Math.sin((miliseconds * Math.PI) / freqInput);
  const planyPos =
    sunnyPos + yInputp * Math.cos((miliseconds * Math.PI) / freqInputp);
  const planxPos =
    sunnxPos + xInputp * Math.sin((miliseconds * Math.PI) / freqInputp);

  const planetxx = sunnxPos - (sunnxPos / 100) * 30;
  const planetyy = sunnyPos - (sunnyPos / 100) * 30;

  const alcancer =
    7 + 7 * Math.cos((miliseconds * Math.PI) / freqInput + Math.PI / 2);

  const intVal = ((sunnxPos + 48) / 100) * alcancer;
  const brillo2 = alcancer * 0.1;

  const sunx = `${sunnxPos}%`;
  const suny = `${sunnyPos}%`;
  const shinex = `${planxPos}%`;
  const shiney = `${planyPos}%`;

  const planetx = `${planetxx}%`;
  const planety = `${planetyy}%`;
  const intensity = `${intVal}`;
  const alcancee = `${alcancer}%`;
  const brillo = `${brillo2}%`;
  sun.style.setProperty('--sunx', sunx);
  sun.style.setProperty('--suny', suny);
  sun.style.setProperty('--shinex', shinex);
  sun.style.setProperty('--shiney', shiney);
  sun.style.setProperty('--planetx', planetx);
  sun.style.setProperty('--planety', planety);
  sun.style.setProperty('--intensity', intensity);
  sun.style.setProperty('--alcance', alcancee);
  sun.style.setProperty('--brillo2', brillo);
}

const renderTimerTime = () => {
  miliseconds = miliseconds + 1;

  xInput = document.getElementById('xinput').value;
  yInput = document.getElementById('yinput').value;
  freqInput = document.getElementById('freqInput').value;
  xInputp = document.getElementById('xinputp').value;
  yInputp = document.getElementById('yinputp').value;
  freqInputp = document.getElementById('freqInputp').value;

  sunMove();
};

setInterval(renderTimerTime, 1);
