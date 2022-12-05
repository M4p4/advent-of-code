const path = require('path');
const fs = require('fs');
// load input
const inputs = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n');

const extractNumbers = (block) => {
  nums = block.split('-');
  let start = Number.parseInt(nums[0]);
  const end = Number.parseInt(nums[1]);
  let res = [];
  for (var i = start; i <= end; i++) {
    res.push(Number.parseInt(i));
  }
  return res;
};

const checkedTasks = inputs.map((pair) => {
  persons = pair.split(',');
  let personOne = extractNumbers(persons[0]);
  let personTwo = extractNumbers(persons[1]);

  const resTwo = personTwo.every((num) => {
    return personOne.includes(num);
  });

  const resOne = personOne.every((num) => {
    return personTwo.includes(num);
  });

  return resTwo || resOne;
});

console.log(checkedTasks.filter((t) => t).length);
