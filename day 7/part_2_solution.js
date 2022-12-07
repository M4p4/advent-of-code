const path = require('path');
const fs = require('fs');

const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

let currentPath = '/';
let system = {};

for (let input of inputs) {
  if (input.includes('$')) {
    //list
    if (input.includes('$ ls')) {
    }
    // cd
    if (input.includes('$ cd ')) {
      const newPath = input.replace('$ cd ', '').trim();
      if (newPath === '/') currentPath = newPath;
      else currentPath = path.join(currentPath, newPath);
      if (system[currentPath] === undefined) {
        system[currentPath] = [];
      }
    }
  } else {
    //dir
    if (input.includes('dir ')) {
      const dir = input.replace('dir ', '').trim();

      //console.log('dir', dir);
    }
    //file
    else {
      const fileName = input.split(' ')[1];
      const fileSize = Number.parseInt(input.split(' ')[0]);
      if (!system[currentPath].includes(fileSize)) {
        system[currentPath].push(fileSize);
      }
      //console.log('file', fileName, fileSize);
    }
  }
}

let dirsTotalSizes = [];
let result = 0;

for (const [key, value] of Object.entries(system)) {
  let dirSize = system[key].reduce((sum, v) => sum + v, 0);
  for (const [keySub, valueSub] of Object.entries(system)) {
    if (keySub != key && keySub.includes(key) && keySub.indexOf(key) === 0) {
      dirSize += system[keySub].reduce((sum, v) => sum + v, 0);
    }
  }
  dirsTotalSizes.push({ key, dirSize });
  if (dirSize <= 100000) result += dirSize;
}

const spaceNeeded = 30000000 - (70000000 - dirsTotalSizes[0].dirSize);
let res = dirsTotalSizes[0].dirSize;

for (const [key, value] of Object.entries(dirsTotalSizes)) {
  if (value.dirSize >= spaceNeeded && value.dirSize < res) {
    res = value.dirSize;
  }
}

console.log(res);
