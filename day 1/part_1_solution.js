const path = require('path');
const fs = require('fs');
// load input
const elves = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n\n');

const sorted_elves = elves
  .map((elf) => {
    return elf
      .split('\n')
      .map((item) => Number.parseInt(item))
      .reduce((sum, val) => sum + val, 0);
  })
  .sort((a, b) => b - a);

console.log(sorted_elves[0]);
