const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const loadMap = (input) => {
  let startPositions = [];
  let endPos;
  const map = Array.from({ length: input.length }).fill([]);
  for (let i = 0; i < input.length; i++) {
    if ([...input[i]].indexOf('S') !== -1) {
      input[i] = input[i].replace('S', 'a');
    }
    if ([...input[i]].indexOf('E') !== -1) {
      endPos = [i, [...input[i]].indexOf('E')];
      input[i] = input[i].replace('E', 'z');
    }

    map[i] = [...input[i]];
  }

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 'a') {
        startPositions.push([i, j]);
      }
    }
  }

  return [map, startPositions, endPos];
};

const solve = (map, startPositions, endPos) => {
  const visited = [...startPositions.map((p) => `${p[0]} ${p[1]}`)];
  let queue = startPositions.map((p) => [[p[0], p[1]], 0]);
  let result = 0;

  while (queue.length > 0) {
    const [pos, steps] = queue.shift();
    const directions = [
      [pos[0] + 1, pos[1]],
      [pos[0] - 1, pos[1]],
      [pos[0], pos[1] + 1],
      [pos[0], pos[1] - 1],
    ];

    for (let direction of directions) {
      const [x, y] = direction;
      if (
        x < 0 ||
        y < 0 ||
        x >= map.length ||
        y >= map[0].length ||
        visited.includes(`${x} ${y}`) ||
        map[x][y].charCodeAt(0) - map[pos[0]][pos[1]].charCodeAt(0) > 1
      ) {
        continue;
      }

      if (x === endPos[0] && y === endPos[1]) {
        if (result === 0 || result > steps + 1) result = steps + 1;
      }
      queue.push([[x, y], steps + 1]);
      visited.push(`${x} ${y}`);
    }
  }
  return result;
};

const res = solve(...loadMap(input));
console.log(res);
