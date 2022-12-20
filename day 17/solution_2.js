const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();

const directions = [...input];

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
let previousStates = {};
let addedHeight = 0;
let amountOfRocks = 1000000000000;
while (count < amountOfRocks) {
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

  let state = `${moves},${current.type},`;
  for (let y = highest; y >= highest - 10; y--) {
    let rownum = '';
    for (let x = 0; x < width; x++) rownum += arena.has(`${x},${y}`) ? 1 : 0;
    state += parseInt(rownum, 2) + ',';
  }

  if (previousStates[state] != null) {
    let pieceCountChange = count - previousStates[state].count;
    let heightChange = getHeight(arena) - previousStates[state].height;

    let cycleAmount =
      Math.floor(
        (amountOfRocks - previousStates[state].count) / pieceCountChange
      ) - 1;
    addedHeight += cycleAmount * heightChange;
    count += cycleAmount * pieceCountChange;
  } else previousStates[state] = { height: getHeight(arena), count };
  count++;
}

console.log(addedHeight + getHeight(arena));
