const path = require('path');
const fs = require('fs');
const { stringify } = require('querystring');
// load input
let inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

function* createChunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

const groups = [...createChunks(inputs, 3)];

const doubleItems = groups.map((group) => {
  return [...group[0]].filter(
    (c) => group[1].includes(c) && group[2].includes(c)
  );
});

const mapValue = (c) => {
  if (c === c.toUpperCase()) {
    return c.charCodeAt(0) - 38;
  } else {
    return c.charCodeAt(0) - 96;
  }
};

const result = doubleItems
  .map((item) => mapValue(item[0]))
  .reduce((sum, a) => sum + a, 0);

console.log(result);
