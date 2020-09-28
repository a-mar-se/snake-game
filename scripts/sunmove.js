function sunMove(deciSeconds, seconds) {
  const sun = document.querySelector('.dodge');
  const sunnyPos =
    100 *
    Math.cos(((((seconds + 0.01 * deciSeconds) * 100) / 60) * Math.PI) / 10);
  const sunnxPos =
    100 *
    Math.sin(((((seconds + 0.01 * deciSeconds) * 100) / 60) * Math.PI) / 10);
  const sunx = `${sunnxPos}%`;
  const shinex = `${
    100 *
      Math.sin(
        ((((seconds + 0.01 * deciSeconds) * 100) / 60) * Math.PI) / 180,
      ) -
    2.25
  }%`;
  const suny = `${sunnyPos}%`;
  const shiney = `${
    100 *
      Math.cos(((((seconds + 0.01 * deciSeconds) * 100) / 60) * Math.PI) / 10) +
    2.5 * (((seconds + 0.01 * deciSeconds) * 100) / 60)
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

export { sunMove };
