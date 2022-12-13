const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const loadMap = (input) => {
  let startPos;
  let endPos;
  const map = Array.from({ length: input.length }).fill([]);
  for (let i = 0; i < input.length; i++) {
    if ([...input[i]].indexOf('S') !== -1) {
      startPos = [i, [...input[i]].indexOf('S')];
      input[i] = input[i].replace('S', 'a');
    }
    if ([...input[i]].indexOf('E') !== -1) {
      endPos = [i, [...input[i]].indexOf('E')];
      input[i] = input[i].replace('E', 'z');
    }
    map[i] = [...input[i]];
  }
  return [map, startPos, endPos];
};

const solve = (map, startPos, endPos) => {
  const visited = [`${startPos[0]} ${startPos[1]}`];
  let queue = [[startPos, 0]];
  let result;

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

      if (x === endPos[0] && y === endPos[1]) result = steps + 1;
      queue.push([[x, y], steps + 1]);
      visited.push(`${x} ${y}`);
    }
  }
  return result;
};

const res = solve(...loadMap(input));
console.log(res);
