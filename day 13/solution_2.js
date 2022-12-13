const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim();

const compare = (l, r) => {
  if (typeof l === 'number' && typeof r === 'number') {
    if (l > r) return false;
    else if (l < r) return true;
    return null;
  } else if (Array.isArray(l) && Array.isArray(r)) {
    for (let i = 0; i < Math.min(l.length, r.length); i++) {
      let res = compare(l[i], r[i]);
      if (res !== null) {
        return res;
      }
    }
    if (l.length < r.length) return true;
    else if (l.length > r.length) return false;
    return null;
  } else {
    return compare(
      typeof l === 'number' ? [l] : l,
      typeof r === 'number' ? [r] : r
    );
  }
};

let lines = input
  .split('\n')
  .filter((e) => e.length > 0)
  .map((line) => JSON.parse(line));
lines.push([[2]], [[6]]);
lines.sort((left, right) => {
  let result = compare(left, right);
  if (result != null) return result ? -1 : 1;
  else return 0;
});

const res = lines.reduce((res, line, index) => {
  if (JSON.stringify(line) === '[[2]]' || JSON.stringify(line) === '[[6]]') {
    return (res *= index + 1);
  }
  return res;
}, 1);

console.log(res);
