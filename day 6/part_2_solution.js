const path = require('path');
const fs = require('fs');

const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .split('\n');

let pos = 0;
let stream = '';

for (c of [...inputs[0]]) {
  if (pos >= 13) {
    if (new Set(stream.slice(stream.length - 14)).size === 14) {
      break;
    }
  }
  pos++;
  stream += c;
}

console.log(stream.length);
