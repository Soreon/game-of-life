let grid = [];
let r = null;
let interval = null;

function getNeighborSum(_grid, _t, _r) {
  let sum = 0;
  sum += _grid[_t - _r - 1] === 9;
  sum += _grid[_t - _r] === 9;
  sum += _grid[(_t - _r) + 1] === 9;
  sum += _grid[_t - 1] === 9;
  sum += _grid[_t + 1] === 9;
  sum += _grid[(_t + _r) - 1] === 9;
  sum += _grid[_t + _r] === 9;
  sum += _grid[_t + _r + 1] === 9;

  return sum;
}

function computeNextGrid(_grid, _r) {
  const grid2 = [];
  for (let t = 0; t < _r * _r; t += 1) {
    const ns = getNeighborSum(_grid, t, _r);
    if (ns === 3) {
      grid2[t] = 9;
    } else if (ns === 2) {
      grid2[t] = _grid[t] === 9 ? 9 : _grid[t] - 1;
    } else if (ns < 2 || ns > 3) {
      grid2[t] = _grid[t] - 1;
    }
  }
  return grid2;
}

function step() {
  grid = computeNextGrid(grid, r);
  postMessage(computeNextGrid(grid, r));
}

function startAnimation() {
  interval = setInterval(step, 10);
}

function stopAnimation() {
  clearInterval(interval);
}

onmessage = (e) => {
  if (e.data.type === 'init') {
    ({ grid, r } = e.data);
    postMessage(grid);
  } else if (e.data.type === 'start-animation') {
    startAnimation();
  } else if (e.data.type === 'stop-animation') {
    stopAnimation();
  } else if (e.data.type === 'step') {
    step();
  } else if (e.data.type === 'clear') {
    grid = grid.fill(0);
    postMessage(grid);
  } else if (e.data.type === 'put-cell') {
    const { x, y } = e.data;
    if(grid[(r * y) + x] === 0) {
      grid[(r * y) + x] = 9;
    } else {
      grid[(r * y) + x] = 0;
    }
    postMessage(grid);
  }
};
