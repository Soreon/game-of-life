function getNeighborSum(grid, t, r) {
  let sum = 0;
  sum += grid[t - r - 1] > 0;
  sum += grid[t - r] > 0;
  sum += grid[(t - r) + 1] > 0;
  sum += grid[t - 1] > 0;
  sum += grid[t + 1] > 0;
  sum += grid[(t + r) - 1] > 0;
  sum += grid[t + r] > 0;
  sum += grid[t + r + 1] > 0;

  return sum;
}

function computeNextGrid(grid, r) {
  const grid2 = [];
  for (let t = 0; t < r * r; t += 1) {
    const ns = getNeighborSum(grid, t, r);
    if (ns === 3) {
      grid2[t] = 9;
    } else if (ns < 2 || ns > 3) {
      grid2[t] = 0;
    } else if (ns === 2) {
      grid2[t] = grid[t] - 1;
    }
  }
  return grid2;
}

onmessage = (e) => {
  setTimeout(() => postMessage(computeNextGrid(e.data[0], e.data[1])), 0);
};
