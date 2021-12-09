const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

let fishes = data.split(",").map((element) => parseInt(element));

const DAYS = 256;

let meta = {
  maxDays: DAYS,
  res: fishes.length,
};

const getNumberOfBirths = (day, age, meta) => {
  if (day >= meta.maxDays) {
    return;
  } else {
    if (age === 0) {
      meta.res++;
      getNumberOfBirths(day, 9, meta);
      getNumberOfBirths(day, 7, meta);
    } else {
      getNumberOfBirths(day + age, 0, meta);
    }
  }
};

console.time("Recursion");
fishes.forEach((fish) => {
  getNumberOfBirths(0, fish, meta);
});
console.timeEnd("Recursion");
console.log(meta);
