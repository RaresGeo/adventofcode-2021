const fs = require("fs");

let data;

data = fs.readFileSync("./input.txt", "utf8").split("\r\n");

let counter = 0;
let previous = data[0];

for (let i = 1; i < data.length; i++) {
  counter += data[i] > previous;
  previous = data[i];
}

console.log(counter);
