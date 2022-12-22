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

data['humn'] = 'CHECK';
let solve = data['root'].split(' + ')[1];
while (solve.match(/[a-z]{4}/g)) {
  const found = solve.match(/[a-z]{4}/g);
  found.forEach((element) => {
    solve = solve.replace(element, '(' + data[element] + ')');
  });
}
const n2 = eval(solve);

solve = data['root'].split(' + ')[0];
while (solve.match(/[a-z]{4}/g)) {
  const found = solve.match(/[a-z]{4}/g);
  found.forEach((element) => {
    solve = solve.replace(element, '(' + data[element] + ')');
  });
}
let res = 1;
while (eval(solve.replace('CHECK', res)) !== n2) {
  res++;
}
console.log(res);
