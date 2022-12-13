const fs = require('fs');
const path = require('path');

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n\n');

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

const res = input.reduce((sum, block, index) => {
  const [l, r] = block.split('\n').map((n) => JSON.parse(n));
  if (compare(l, r)) {
    sum += index + 1;
  }
  return sum;
}, 0);

console.log(res);
