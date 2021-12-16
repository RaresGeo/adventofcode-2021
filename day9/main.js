const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

data = data.split("\r\n").map((x) => x.split("").map((a) => parseInt(a)));

let safeSpots = [];
let basinSizes = [];

const getSizeOfBasin = (res, i, j, data) => {
  if (i < 0 || i >= data.length || j < 0 || j >= data[i].length || data[i][j] === 9) return;
  if (res.alreadyVisited.includes(`[${i}, ${j}]`)) return;
  res.alreadyVisited.push(`[${i}, ${j}]`);
  res.size++;
  getSizeOfBasin(res, i - 1, j, data);
  getSizeOfBasin(res, i + 1, j, data);
  getSizeOfBasin(res, i, j - 1, data);
  getSizeOfBasin(res, i, j + 1, data);
};

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[0].length; j++) {
    let neighbors = [];

    if (i > 0) {
      neighbors.push(data[i - 1][j]);
    }

    if (i < data.length - 1) {
      neighbors.push(data[i + 1][j]);
    }

    if (j > 0) {
      neighbors.push(data[i][j - 1]);
    }

    if (j < data[i].length - 1) {
      neighbors.push(data[i][j + 1]);
    }

    let safe = true;

    neighbors.forEach((neighbor) => {
      if (neighbor <= data[i][j]) safe = false;
    });

    if (safe) {
      safeSpots.push(1 + data[i][j]);

      let res = {
        size: 0,
        alreadyVisited: [],
      };

      getSizeOfBasin(res, i, j, data);

      if (!basinSizes[basinSizes.length - 1]) {
        basinSizes.push(res.size);
      } else {
        let pushed = false;
        for (let i = 0; i < Math.min(basinSizes.length, 3) && !pushed; i++) {
          if (res.size >= basinSizes[i]) {
            basinSizes.splice(i, 0, res.size);
            pushed = true;
          }
        }

        if (basinSizes.length > 3) basinSizes.pop();
      }
    }
  }
}

console.log(
  "Answer to the first part:",
  safeSpots.reduce((a, b) => a + b, 0)
);
console.log(
  "Answer to the second part:",
  basinSizes.reduce((a, b) => a * b, 1)
);
