export function Cell(x, y, z) {
  if (x + y + z !== 0) throw "wrong coordinates";
  Object.defineProperty(this, 'x', { get: () => x });
  Object.defineProperty(this, 'y', { get: () => y });
  Object.defineProperty(this, 'z', { get: () => z });
  Object.defineProperty(this, 'key', { get: () => `${x} ${y} ${z}` });
}

function makeCells(n) {
  let res = [];
  for (let x = -n; x <= n; x++) {
    for (let y = Math.max(-n, -x - n); y <= Math.min(n, -x + n); y++) {
      let z = -x - y;
      res.push(new Cell(x, y, z));
    }
  }
  return res;
}

export function Grid(radius) {
  let cells = makeCells(radius);
  Object.defineProperty(this, 'radius', { get: () => radius });
  Object.defineProperty(this, 'cells', { get: () => cells });
}
