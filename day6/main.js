const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

let fishes = data.split(",").map((element) => parseInt(element));

const DAYS = 160;

for (let dayIndex = 0; dayIndex < DAYS; dayIndex++) {
  for (let i = 0; i < fishes.length; i++) {
    if (fishes[i] === 0) {
      fishes.push(9);
      fishes[i] = 7;
    }
    fishes[i]--;
  }
}

console.log(fishes.length);
