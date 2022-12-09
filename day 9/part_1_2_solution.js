const path = require('path');
const fs = require('fs');

const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const directions = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, -1],
  D: [0, 1],
};

const simulate = (knots) => {
  let rope = Array.from({ length: knots }).fill([0, 0]);
  visited = {};
  inputs.map((line) => {
    [direction, moves] = line.split(' ');
    for (let i = 0; i < Number(moves); i++) {
      rope[0] = rope[0].map((v, d) => v + directions[direction][d]);
      for (let i = 1; i < knots; i++)
        if (rope[i - 1].some((v, d) => Math.abs(v - rope[i][d]) > 1))
          rope[i] = rope[i].map((v, d) => v + Math.sign(rope[i - 1][d] - v));
      visited[rope[knots - 1].join(' ')] = 1;
    }
  });
  return Object.keys(visited).length;
};

console.log(simulate(2));
console.log(simulate(10));
