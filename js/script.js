/* eslint-disable no-bitwise, no-param-reassign */

const computerWorker = new Worker('js/computerWorker.js');
const painterWorker = new Worker('js/painterWorker.js');

const canvas = document.getElementById('main-canvas');
const clearButton = document.getElementById('clear');
const startStopButton = document.getElementById('start-stop');
const stepButton = document.getElementById('step');
const r = 100;
canvas.height = r;
canvas.width = r;
const offscreen = canvas.transferControlToOffscreen();

let started = false;
let grid1 = new Uint8Array(r ** 2);

function initGrid(grid) {
  for (let t = 0; t < r ** 2; t += 1) {
    grid[t] = Math.random() * 3 > 2 ? 9 : 0;
  }
}

clearButton.addEventListener('click', () => {
  computerWorker.postMessage({ type: 'clear' });
})

startStopButton.addEventListener('click', () => {
  if (started) {
    startStopButton.innerText = 'Start';
    computerWorker.postMessage({ type: 'stop-animation' });
  } else {
    startStopButton.innerText = 'Stop';
    computerWorker.postMessage({ type: 'start-animation' });
  }
  started = !started;
})

stepButton.addEventListener('click', () => {
  computerWorker.postMessage({ type: 'step' });
})

computerWorker.onmessage = (e) => {
  painterWorker.postMessage({ type: 'mess', grid: e.data });
};

canvas.addEventListener('click', (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top; 
  const px = Math.floor((x * r) / rect.width);
  const py = Math.floor((y * r) / rect.height);
  computerWorker.postMessage({ type: 'put-cell', x: px, y: py });
});

initGrid(grid1);

// Start painting
painterWorker.postMessage({ type: 'init', canvas: offscreen, r }, [offscreen]);

// Init computer
computerWorker.postMessage({ type: 'init', grid: grid1, r });