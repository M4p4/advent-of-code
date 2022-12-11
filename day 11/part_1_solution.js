const path = require('path');
const fs = require('fs');

const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const cleanInputs = inputs.map((input) => input.trim());

let monkeys = [];
let index = 0;
for (let line of inputs) {
  if (line.includes('Monkey')) {
    index = Number.parseInt(line.split(' ')[1].replace(':', ''));
    monkeys.push({
      items: [],
      operator: '',
      number: 0,
      test: 0,
      onTrue: 0,
      onFalse: 0,
    });
  }
  if (line.includes('Starting items:')) {
    const items = line
      .split(': ')[1]
      .split(', ')
      .map((num) => Number.parseInt(num));
    monkeys[index].items = items;
  }
  if (line.includes('Operation:')) {
    const d = line.split(' = old ')[1];
    if (d.includes('*')) monkeys[index].operator = '*';
    if (d.includes('+')) monkeys[index].operator = '+';
    monkeys[index].number = d.split(' ')[1];
  }
  if (line.includes('Test: divisible by ')) {
    monkeys[index].test = Number.parseInt(line.split('by ')[1]);
  }
  if (line.includes('If true: ')) {
    monkeys[index].onTrue = Number.parseInt(line.split('monkey ')[1]);
  }
  if (line.includes('If false: ')) {
    monkeys[index].onFalse = Number.parseInt(line.split('monkey ')[1]);
  }
}

const stats = Array.from({ length: monkeys.length }).fill(0);
const ROUNDS = 20;

for (round = 0; round < ROUNDS; round++) {
  for (let i = 0; i < monkeys.length; i++) {
    items = monkeys[i].items.concat();
    for (let item of items) {
      const number =
        monkeys[i].number === 'old' ? item : Number.parseInt(monkeys[i].number);
      const worryLevel =
        monkeys[i].operator === '+' ? item + number : item * number;
      const testResult = Math.floor(worryLevel / 3);
      stats[i]++;
      if (testResult % monkeys[i].test === 0) {
        const itemIndex = monkeys[i].items.indexOf(item);
        monkeys[i].items.splice(itemIndex, 1);
        monkeys[monkeys[i].onTrue].items.push(testResult);
      } else {
        const itemIndex = monkeys[i].items.indexOf(item);
        monkeys[i].items.splice(itemIndex, 1);
        monkeys[monkeys[i].onFalse].items.push(testResult);
      }
    }
  }
}
stats.sort((a, b) => b - a);
console.log(stats[0] * stats[1]);
