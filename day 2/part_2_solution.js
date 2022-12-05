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

const planScore = {
  X: 0,
  Y: 3,
  Z: 6,
};

const getShape = (enemy, plan) => {
  posibilites = ['X', 'Y', 'Z'];
  const solutions = posibilites.map((p) => {
    const score = getWinner(enemy, p);
    return { p, score };
  });
  const res = solutions.filter(
    (solution) => solution.score === planScore[plan]
  );
  return res[0].p;
};

const getWinner = (a, b) => {
  res = shapePoints[a] - shapePoints[b];
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
    const myShape = getShape(turn[0], turn[1]);
    let roundScore = shapePoints[myShape];
    roundScore += getWinner(turn[0], myShape);
    return roundScore;
  })
  .reduce((sum, v) => sum + v, 0);

console.log(score);
