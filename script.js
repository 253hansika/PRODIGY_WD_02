const display = document.getElementById('display');

let timer = null;
let elapsedTime = 0;
let startTime = 0;
let isRunning = false;

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 10);
    isRunning = true;
  }
}

function stop() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(timer);
  timer = null;
  elapsedTime = 0;
  startTime = 0;
  isRunning = false;
  display.textContent = `00:00:00:00`;
}

function lap() {
  const lapTime = formatTime(elapsedTime);
  const lapElement = document.createElement('div');
  lapElement.textContent = lapTime;
  document.getElementById('laps').appendChild(lapElement);
}
function formatTime(time) {
  const milliseconds = Math.floor((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor(time / (1000 * 60 * 60));

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(
    2,
    '0'
  )}`;
}

function update() {
  elapsedTime = Date.now() - startTime;

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let miliseconds = Math.floor((elapsedTime % 1000) / 10);

  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');
  miliseconds = String(miliseconds).padStart(2, '0');

  display.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
}
