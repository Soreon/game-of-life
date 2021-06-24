/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */

let canvas = null;
let context = null;
let r = null;
let grid = [];
const colorGradient = [
  '#000000',
  '#401000',
  '#862100',
  '#ad2b00',
  '#FF0000',
  '#FF5500',
  '#FF8000',
  '#FFB300',
  '#FFDD00',
  '#FFFFFF',
];

function setupCanvas() {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF';
  ctx.imageSmoothingEnabled = false;
  return ctx;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function rectangle(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function drawGrid() {
  for (let t = 0; t < r * r; t += 1) {
    if (grid[t] > 0) rectangle((t % r), ~~(t / r), 1, 1, colorGradient[grid[t]]);
  }
}

function animate() {
  clearCanvas();
  drawGrid(grid);
  requestAnimationFrame(animate);
}

onmessage = (e) => {
  if (e.data.type === 'init') {
    ({ canvas, r } = e.data);
    context = setupCanvas();
    animate();
  } else if (e.data.type === 'mess') {
    ({ grid } = e.data);
  }
};
