const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n')
  .map((l) => {
    return {
      num: Number.parseInt(l),
    };
  });

let field = [...input];
for (const n of input) {
  const index = field.indexOf(n);
  field.splice(index, 1);
  field.splice((index + n.num) % field.length, 0, n);
}
const zero = field.findIndex(({ num }) => num === 0);
const res = [1000, 2000, 3000]
  .map((num) => field[(zero + num) % field.length].num)
  .reduce((sum, v) => sum + v, 0);
console.log(res);
