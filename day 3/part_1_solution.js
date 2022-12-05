const path = require('path');
const fs = require('fs');
const { stringify } = require('querystring');
// load input
let inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const doubleItems = inputs.map((rucksack) => {
  const rucksackLeft = rucksack.slice(0, rucksack.length / 2);
  const rucksackRight = rucksack.slice(rucksack.length / 2);
  return [...rucksackLeft].filter((c) => rucksackRight.includes(c))[0];
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
