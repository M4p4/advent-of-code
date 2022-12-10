const path = require('path');
const fs = require('fs');

const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

let register = 1;
let cycle = 0;
let display = [];

const draw = () => {
  if (cycle % 40 >= register && cycle % 40 <= register + 2) {
    display.push('#');
  } else {
    display.push('.');
  }

  if (cycle % 40 === 0) {
    display.push('\n');
  }
};

for (let line of inputs) {
  cycle++;
  draw();
  if (line !== 'noop') {
    const toWrite = Number.parseInt(line.split(' ')[1]);
    cycle++;
    draw();
    register += toWrite;
  }
}

console.log(display.join(''));
