// ENEMY: A for Rock, B for Paper, and C for Scissors
// YOU: X for Rock, Y for Paper, and Z for Scissors
// SCORE:
// shape you selected  - (1 for Rock, 2 for Paper, and 3 for Scissors)
// outcome of the round  - (0 if you lost, 3 if the round was a draw, and 6 if you won)

const path = require('path');
const fs = require('fs');
// load input
let rounds = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const shapePoints = {
  X: 1,
  A: 1,
  Y: 2,
  B: 2,
  Z: 3,
  C: 3,
};

const getWinner = (a, b) => {
  res = shapePoints[a] - shapePoints[b];
  console.log(res);
  if (res === -1 || res === 2) {
    return 6;
  } else if (res === -2 || res === 1) {
    return 0;
  } else {
    return 3;
  }
};

const score = rounds
  .map((round) => {
    const turn = round.split(' ');
    let roundScore = shapePoints[turn[1]];
    roundScore += getWinner(turn[0], turn[1]);
    return roundScore;
  })
  .reduce((sum, v) => sum + v, 0);

console.log(score);
