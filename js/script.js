/* eslint-disable no-bitwise, no-param-reassign */

const computerWorker = new Worker('js/computerWorker.js');
const painterWorker = new Worker('js/painterWorker.js');

const canvas = document.getElementById('main-canvas');
const r = 200;
canvas.height = r;
canvas.width = r;
const offscreen = canvas.transferControlToOffscreen();


let grid1 = new Uint8Array(r ** 2);

function initGrid(grid) {
  for (let t = 0; t < r ** 2; t += 1) {
    grid[t] = Math.random() * 3 > 2 ? 9 : 0;
  }
}

computerWorker.onmessage = (e) => {
  grid1 = e.data;
  painterWorker.postMessage({ type: 'mess', grid: grid1 });
  computerWorker.postMessage([grid1, r]);
};

initGrid(grid1);
painterWorker.postMessage({ type: 'init', canvas: offscreen, r }, [offscreen]);
computerWorker.postMessage([grid1, r]);
