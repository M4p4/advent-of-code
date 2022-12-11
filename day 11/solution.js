const fs = require('fs');
const path = require('path');

const solve = (isPartB) => {
  const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .trim();
  const monkeys = [];

  for (let section of input.split('\n\n')) {
    const lines = section.split('\n');
    const items = lines[1].match(/\d+/g).map(Number);
    const op = (old) => eval(lines[2].split('= ')[1]);
    const divisibleBy = +lines[3].match(/\d+/)[0];
    const toMonkey = [4, 5].map((i) => +lines[i].match(/\d+/g)[0]);
    const monkey = { items, op, divisibleBy, toMonkey, moves: 0 };
    monkeys.push(monkey);
  }

  for (let round = 0; round < (isPartB ? 10000 : 20); round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const { items, op, divisibleBy, toMonkey } = monkeys[i];
      let leftItem = items.shift();
      while (leftItem) {
        const newVal = isPartB
          ? op(leftItem) %
            monkeys
              .map((monkey) => monkey.divisibleBy)
              .reduce((sum, v) => sum * v, 1)
          : Math.floor(op(leftItem) / 3);
        newVal % divisibleBy === 0
          ? monkeys[toMonkey[0]].items.push(newVal)
          : monkeys[toMonkey[1]].items.push(newVal);
        monkeys[i].moves++;
        items.length === 0 ? (leftItem = null) : (leftItem = items.shift());
      }
    }
  }

  console.log(
    monkeys
      .map((monkey) => monkey.moves)
      .sort((a, b) => b - a)
      .slice(0, 2)
      .reduce((sum, v) => sum * v, 1)
  );
};

solve(false);
solve(true);
