const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

let fishes = data.split(",").map((element) => parseInt(element));

let days = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
fishes.forEach((fish) => {
  days[fish] += 1;
});

console.log(days);

const DAYS = 256;

console.time("Calculating");
for (let i = 0; i < DAYS; i++) {
  for (let i = 0; i < days.length; i++) {
    if (i === 0) {
      days[9] += days[i];
      days[7] += days[i];
      days[i] = 0;
    } else {
      days[i - 1] = days[i];
      days[i] = 0;
    }
  }
}
console.timeEnd("Calculating");

console.log(days.reduce((a, b) => a + b, 0));

return;

let meta = {
  days: days,
  maxDays: DAYS,
  res: fishes.length,
};

const getNumberOfBirths = (day, age, numFishes, meta) => {
  if (day >= meta.maxDays) {
    return;
  } else {
    if (age === 0) {
      meta.res += numFishes;
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
