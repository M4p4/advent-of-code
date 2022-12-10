const path = require('path');
const fs = require('fs');

const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

let register = 1;
let cycle = 0;
const checks = { 20: 0, 60: 0, 100: 0, 140: 0, 180: 0, 220: 0 };

const check = () => {
  if (Object.keys(checks).includes(cycle.toString())) {
    checks[cycle] = cycle * register;
    console.log(cycle, checks[cycle]);
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

console.log(Object.values(checks).reduce((sum, v) => sum + v, 0));
