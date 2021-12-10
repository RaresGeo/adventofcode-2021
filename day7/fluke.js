const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

let crabs = data.split(",").map((element) => parseInt(element));

let sorted;
let m = crabs.length - 1;
do {
  sorted = true;
  for (let i = 0; i < m; i++) {
    if (crabs[i] > crabs[i + 1]) {
      let temp = crabs[i];
      crabs[i] = crabs[i + 1];
      crabs[i + 1] = temp;
      sorted = false;
    }
  }
  m--;
} while (!sorted);

let fuel = 0;

// This worked for me but it looks like it might have been a fluke. I did not consider that you will also be allowed to move to positions where no crabs currently are.
// I think this solution is somewhat elegant and so I will not replace it with the bruteforced method of part2
crabs.forEach((crab) => {
  fuel += Math.sqrt(Math.pow(crab - crabs[Math.floor(crabs.length / 2)], 2));
});

console.log(fuel);
