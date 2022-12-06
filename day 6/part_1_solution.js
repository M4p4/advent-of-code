const path = require('path');
const fs = require('fs');

const inputs = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const PACKET_LEN = 4;
let pos = 0;
let stream = '';

for (c of [...inputs]) {
  if (pos >= PACKET_LEN - 1) {
    if (new Set(stream.slice(stream.length - PACKET_LEN)).size === PACKET_LEN) {
      break;
    }
  }
  pos++;
  stream += c;
}

console.log(stream.length);
