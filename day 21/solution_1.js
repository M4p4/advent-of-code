const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const data = {};

input.map((line) => {
  [a, b] = line.split(': ');
  data[[a]] = b;
});

let solve = data['root'];
while (solve.match(/[a-z]{4}/g)) {
  const found = solve.match(/[a-z]{4}/g);
  found.forEach((element) => {
    solve = solve.replace(element, '(' + data[element] + ')');
  });
}
const res = eval(solve);
console.log(res);
