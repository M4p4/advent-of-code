const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const map = input.reduce((set, line) => {
  const coords = line
    .split(' -> ')
    .map((d) => [+d.split(',')[0], +d.split(',')[1]]);

  for (let i = 1; i < coords.length; i++) {
    const minX = Math.min(coords[i][0], coords[i - 1][0]);
    const minY = Math.min(coords[i][1], coords[i - 1][1]);
    const maxX = Math.max(coords[i][0], coords[i - 1][0]);
    const maxY = Math.max(coords[i][1], coords[i - 1][1]);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        set.add(`${x} ${y}`);
      }
    }
  }
  return set;
}, new Set());

let sand = { x: 500, y: 0 };
let sandsOnMap = 0;
const floor = [...map].reduce(
  (h, v) => Math.max(Number.parseInt(v.split(' ')[1]), h),
  0
);
let done = false;

while (!done) {
  if (map.has(`${sand.x} ${sand.y + 1}`)) {
    if (!map.has(`${sand.x - 1} ${sand.y + 1}`)) {
      sand.x--;
      sand.y++;
    } else if (!map.has(`${sand.x + 1} ${sand.y + 1}`)) {
      sand.x++;
      sand.y++;
    } else {
      map.add(`${sand.x} ${sand.y}`);
      sand = { x: 500, y: 0 };
      sandsOnMap++;
    }
  } else {
    sand.y++;
  }
  if (sand.y > floor) done = true;
}
console.log(sandsOnMap);
