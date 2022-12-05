const path = require('path');
const fs = require('fs');

const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .split('\n');

const moves = inputs.filter((line) => line.includes('move'));

let stacksCount = 0;
let stacks = {};

for (let line of inputs) {
  if (line.includes('1')) {
    stacksCount = line
      .trim()
      .split(' ')
      .filter((n) => n.length > 0).length;
    break;
  } else {
    split = line.split(' ');
    let index = 1;
    let tmp = 0;
    for (let c of split) {
      if (c.length === 0) {
        if (tmp === 4) {
          tmp = 0;
          index += 1;
        }
        tmp += 1;
      } else {
        if (tmp === 4) {
          tmp = 0;
          index += 1;
        }
        if (stacks[index.toString()] === undefined) {
          stacks[index.toString()] = [];
        }
        stacks[index.toString()].unshift(c.replace('[', '').replace(']', ''));
        index += 1;
        tmp = 0;
      }
    }
  }
}

// moves
moves.map((move) => {
  const line = move.split(' ');
  const amount = line[1];
  const from = line[3];
  const to = line[5];
  if (amount === 1) {
    for (let n = 1; n <= amount; n++) {
      const item = stacks[from.toString()].pop();
      stacks[to.toString()].push(item);
    }
  } else {
    let items = [];
    for (let n = 1; n <= amount; n++) {
      const item = stacks[from.toString()].pop();
      items.unshift(item);
    }
    items.map((item) => {
      stacks[to.toString()].push(item);
    });
  }
});

//result
let res = '';
for (let i = 1; i <= stacksCount; i++) {
  res += stacks[i.toString()].pop();
}
console.log(res);
