const { table } = require("console");
const fs = require("fs");
const { parse } = require("path/posix");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

let tables = [];
let temp;

let split = data.split("\r\n");
split.splice(0, 1);

split.forEach((element, index) => {
  if (element === "") {
    if (temp) tables.push(temp);
    temp = [];
    return;
  }
  let row = element.split(" ").filter((string) => string !== "");
  // I decided to choose a differnet way of marking numbers, just because it was easier to look at when console logging the entire board
  // row = row.map((element) => [element, false]);

  temp.push(row);
});

tables.push(temp);

let numbers = data.split("\r\n")[0].split(",");

let bingo = false;
let _table;

const calculateScore = (_table, winningNumber) => {
  let score = 0;
  _table.forEach((row) => {
    row.forEach((element) => {
      if (!element.includes("+")) score += parseInt(element);
    });
  });

  return score * parseInt(winningNumber);
};

// This is not terribly efficient, just keep doing it and the last result is the answer to the puzzle.
for (let numberIndex = 0; numberIndex < numbers.length; numberIndex++) {
  for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
    _table = tables[tableIndex];
    for (let rowIndex = 0; rowIndex < _table.length; rowIndex++) {
      let row = _table[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        if (_table[rowIndex][colIndex].includes("+")) continue;
        if (parseInt(_table[rowIndex][colIndex]) === parseInt(numbers[numberIndex])) {
          //console.log(`Found matching numbers[${numberIndex}] = ${numbers[numberIndex]} at tables[${tableIndex}][${rowIndex}][${colIndex}]`);
          _table[rowIndex][colIndex] += "+";
          bingo = true;
          // Check if row is complete
          row.forEach((_element) => {
            if (!_element.includes("+")) {
              bingo = false;
              return;
            }
          });

          // Check column if the row wasn't complete
          if (!bingo) {
            bingo = true;
            for (let i = 0; i < _table.length; i++) {
              if (!_table[i][colIndex].includes("+")) {
                bingo = false;
                break;
              }
            }
          }

          if (bingo) {
            tables.splice(tableIndex, 1);
            tableIndex--;
            console.log(calculateScore(_table, _table[rowIndex][colIndex]));
          }
        }
      }
    }
  }
}
