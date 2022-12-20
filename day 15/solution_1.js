const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const SB = [];

input.forEach((l) => {
  SB.push(l.match(/-?\d+/g).map(Number));
});

const space = new Set();

const checkY = 2000000;

for (let d of SB) {
  const sensor = { x: d[0], y: d[1] };
  const beacon = { x: d[2], y: d[3] };
  const radius = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
  const distance = Math.abs(sensor.y - checkY);
  if (distance <= radius) {
    for (
      let i = sensor.x - (radius - distance);
      i <= sensor.x + (radius - distance);
      i++
    ) {
      space.add(`${i},${checkY}`);
    }
  }
}

let res = 0;

for (let dot of space) {
  [x, y] = dot.split(',');
  const found = SB.filter(
    (v) =>
      (v[0] === Number.parseInt(x) && v[1] === Number.parseInt(y)) ||
      (v[2] === Number.parseInt(x) && v[3] === Number.parseInt(y))
  );
  if (found.length === 0 && checkY == Number.parseInt(y)) res++;
}
console.log(res);
