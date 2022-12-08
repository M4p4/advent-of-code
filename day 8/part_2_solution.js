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

const getScenicScore = (map, mapSize, x, y) => {
  let scores = { left: 0, right: 0, top: 0, bottom: 0 };
  const position = map[x][y];

  //left
  for (let m = x - 1; m >= 0; m--) {
    if (m < 0) {
      scores.left += 1;
      break;
    }
    scores.left += 1;
    if (map[m][y] >= position) {
      break;
    }
  }
  //right
  for (let m = x + 1; m < mapSize; m++) {
    if (m > mapSize) {
      scores.right += 1;
      break;
    }
    scores.right += 1;
    if (map[m][y] >= position) {
      break;
    }
  }
  //top
  for (let m = y - 1; m >= 0; m--) {
    if (m < 0) {
      scores.top += 1;
      break;
    }
    scores.top += 1;
    if (map[x][m] >= position) {
      break;
    }
  }
  //bottom
  for (let m = y + 1; m < mapSize; m++) {
    if (m > mapSize) {
      scores.bottom += 1;
      break;
    }
    scores.bottom += 1;
    if (map[x][m] >= position) {
      break;
    }
  }
  return scores.left * scores.right * scores.bottom * scores.top;
};

let result = 0;

for (let i = 0; i < mapSize; i++) {
  for (let j = 0; j < mapSize; j++) {
    const score = getScenicScore(map, mapSize, i, j);
    if (score > result) result = score;
  }
}

console.log(result);
