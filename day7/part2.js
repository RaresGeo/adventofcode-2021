const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

let crabs = data.split(",").map((element) => parseInt(element));
console.log(crabs.length);

let fuel = 0;
let minFuel;

const calculateCost = (steps) => {
  return (steps * steps + steps) / 2;
};

let maxPos = crabs[0];

crabs.forEach((crab) => {
  maxPos = maxPos < crab ? crab : maxPos;
});

for (let i = 0; i < maxPos; i++) {
  crabs.forEach((crab) => {
    let steps = Math.sqrt(Math.pow(crab - i, 2));
    fuel += calculateCost(steps);
  });

  if (!minFuel) minFuel = fuel;
  else minFuel = minFuel > fuel ? fuel : minFuel;
  fuel = 0;
}

console.log(minFuel);
