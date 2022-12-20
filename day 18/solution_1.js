const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

let directions = [
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
];

const cubes = input.map((cube) => cube.split(',').map(Number));

const res = cubes.reduce((area, cube) => {
  directions.forEach((direction) => {
    if (
      !input.includes(
        `${cube[0] + direction.x},${cube[1] + direction.y},${
          cube[2] + direction.z
        }`
      )
    ) {
      area += 1;
    }
  });

  return area;
}, 0);

console.log(res);
