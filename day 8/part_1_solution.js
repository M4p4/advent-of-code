const path = require('path');
const fs = require('fs');

const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const mapSize = inputs.length;
let map = Array.from(Array(mapSize), () => new Array(mapSize));
for (let i = 0; i < mapSize; i++) {
  for (let j = 0; j < mapSize; j++) {
    map[i][j] = Number.parseInt(inputs[i].charAt(j));
  }
}

const isVisable = (map, mapSize, x, y) => {
  if (mapSize - 1 === x || mapSize - 1 === y || x === 0 || y === 0) {
    return true;
  }

  //left to right
  let lr = 0;
  for (let m = 0; m < mapSize; m++) {
    if (m === x) {
      if (lr < map[m][y]) {
        return true;
      }
      break;
    }
    if (lr < map[m][y]) {
      lr = map[m][y];
    }
  }

  //right to left
  let rl = 0;
  for (let m = mapSize - 1; m > 0; m--) {
    if (m === x) {
      if (rl < map[m][y]) {
        return true;
      }
      break;
    }
    if (rl < map[m][y]) {
      rl = map[m][y];
    }
  }

  //bottom to top
  let bt = 0;
  for (let m = mapSize - 1; m > 0; m--) {
    if (m === y) {
      if (bt < map[x][m]) {
        return true;
      }
      break;
    }
    if (bt < map[x][m]) {
      bt = map[x][m];
    }
  }

  //top to bottom
  let tb = 0;
  for (let m = 0; m < mapSize; m++) {
    if (m === y) {
      if (tb < map[x][m]) {
        return true;
      }
      break;
    }
    if (tb < map[x][m]) {
      tb = map[x][m];
    }
  }

  return false;
};

let result = 0;

for (let i = 0; i < mapSize; i++) {
  for (let j = 0; j < mapSize; j++) {
    if (isVisable(map, mapSize, i, j)) result += 1;
  }
}

console.log(result);
