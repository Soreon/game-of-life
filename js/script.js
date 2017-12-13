/* eslint-disable no-bitwise, no-param-reassign */

const canvas = document.getElementById('main-canvas');
const context = canvas.getContext('2d');
const r = 200;
const cellW = canvas.clientWidth / r;
const cellH = canvas.clientHeight / r;
let grid1 = [];
let grid2 = [];

function initGrid(grid) {
  for (let t = 0; t < r * r; t += 1) {
    grid[t] = ~~(Math.random() * 2);
  }
}

function initGame() {
  initGrid(grid1);
}

function rectangle(x, y, width, height, color) {
  context.beginPath();
  context.rect(x, y, width, height);
  context.fillStyle = color;
  context.fill();
  context.closePath();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGrid(grid) {
  for (let t = 0; t < r * r; t += 1) {
    if (grid[t] === 1) rectangle((t % r) * cellW, ~~(t / r) * cellH, cellW, cellH, '#FFFFFF');
  }
}

function getNeighborSum(grid, t) {
  let sum = 0;
  sum += grid[t - r - 1] || 0;
  sum += grid[t - r] || 0;
  sum += grid[(t - r) + 1] || 0;
  sum += grid[t - 1] || 0;
  sum += grid[t + 1] || 0;
  sum += grid[(t + r) - 1] || 0;
  sum += grid[t + r] || 0;
  sum += grid[t + r + 1] || 0;

  return sum;
}

function computeNextGrid(grid) {
  grid2 = [];
  for (let t = 0; t < r * r; t += 1) {
    const ns = getNeighborSum(grid, t, r);
    if (ns === 3) {
      grid2[t] = 1;
    } else if (ns < 2 || ns > 3) {
      grid2[t] = 0;
    } else if (ns === 2) {
      grid2[t] = grid[t];
    }
  }
  return grid2;
}

function draw() {
  clearCanvas();
  drawGrid(grid1);
}

function animate() {
  draw();
  grid1 = computeNextGrid(grid1);
  requestAnimationFrame(animate);
}

initGame();
animate();
