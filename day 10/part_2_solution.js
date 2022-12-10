const path = require('path');
const fs = require('fs');

const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

let register = 1;
let cycle = 0;
const checks = { 20: 0, 60: 0, 100: 0, 140: 0, 180: 0, 220: 0 };
let display = '';

const check = () => {
  if (Object.keys(checks).includes(cycle.toString())) {
    checks[cycle] = cycle * register;
    console.log(cycle, checks[cycle]);
  }

  if (cycle % 40 >= register && cycle % 40 <= register + 2) {
    display += '#';
  } else {
    display += '.';
  }
};

for (let line of inputs) {
  if (line === 'noop') {
    cycle++;
    check();
  } else {
    const toWrite = Number.parseInt(line.split(' ')[1]);
    cycle++;
    check();
    cycle++;
    check();
    register += toWrite;
  }
}

let result = '';
for (let i = 1; i < [...display].length + 1; i++) {
  result += [...display][i - 1];

  if (i % 40 === 0) {
    result += '\n';
  }
}
console.log(result);
