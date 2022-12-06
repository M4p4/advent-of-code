const path = require('path');
const fs = require('fs');

const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .split('\n');

let pos = 0;
let stream = '';

for (c of [...inputs[0]]) {
  if (pos >= 3) {
    if (new Set(stream.slice(stream.length - 4)).size === 4) {
      break;
    }
  }
  pos++;
  stream += c;
}

console.log(stream.length);
