const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();

const directions = [...input];

console.log(directions);

const forms = [
  [['#', '#', '#', '#']],
  [
    [' ', '#', ' '],
    ['#', '#', '#'],
    [' ', '#', ' '],
  ],
  [
    [' ', ' ', '#'],
    [' ', ' ', '#'],
    ['#', '#', '#'],
  ],
  [['#'], ['#'], ['#'], ['#']],
  [
    ['#', '#'],
    ['#', '#'],
  ],
];

const getHeight = (arena) =>
  [...arena]
    .map((coord) => parseInt(coord.split(',')[1]))
    .reduce((max, height) => Math.max(max, height), -1) + 1;

const width = 7;
let count = 0;
let moves = 0;
let arena = new Set();
let current = { x: 0, y: 0, type: -1 };
while (count < 2022) {
  current.type = (current.type + 1) % forms.length;
  let highest = getHeight(arena);
  current = {
    x: 2,
    y: highest + 3 + forms[current.type].length - 1,
    type: current.type,
  };
  while (true) {
    let move = directions[moves] == '>' ? 1 : -1;
    moves = (moves + 1) % directions.length;

    let xCollision = false;
    for (let y = 0; y < forms[current.type].length; y++) {
      for (let x = 0; x < forms[current.type][y].length; x++) {
        if (forms[current.type][y][x] != '#') continue;

        if (
          current.x + x + move < 0 ||
          current.x + x + move >= width ||
          arena.has(`${current.x + x + move},${current.y - y}`)
        )
          xCollision = true;
      }
    }
    if (!xCollision) current.x += move;

    let yCollision = false;
    for (let y = 0; y < forms[current.type].length; y++) {
      for (let x = 0; x < forms[current.type][y].length; x++) {
        if (forms[current.type][y][x] != '#') continue;

        if (
          current.y - y - 1 < 0 ||
          arena.has(`${current.x + x},${current.y - y - 1}`)
        )
          yCollision = true;
      }
    }

    if (yCollision) break;
    else current.y--;
  }

  for (let y = 0; y < forms[current.type].length; y++) {
    for (let x = 0; x < forms[current.type][y].length; x++) {
      if (forms[current.type][y][x] != '#') continue;
      arena.add(`${current.x + x},${current.y - y}`);
    }
  }

  count++;
}

console.log(getHeight(arena));
