const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

let crabs = data.split(",").map((element) => parseInt(element));

let maxPos = crabs[0];

crabs.forEach((crab) => {
  maxPos = maxPos < crab ? crab : maxPos;
});

let fuel = 0;

crabs.forEach((crab) => {
  fuel += Math.sqrt(Math.pow(crab - Math.floor(maxPos / 2), 2));
});

console.log(fuel);
