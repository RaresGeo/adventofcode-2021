const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

let split = data.replaceAll(" ->", "").split("\r\n");
split = split.map((element) => {
  let coords = element.split(" ");
  return [
    [coords[0].split(",")[0], coords[0].split(",")[1]],
    [coords[1].split(",")[0], coords[1].split(",")[1]],
  ];
});

let field = {};

split.forEach((line) => {
  // Check if horizontal
  if (line[0][0] === line[1][0]) {
    let min = Math.min(line[0][1], line[1][1]);
    let max = Math.max(line[0][1], line[1][1]);
    for (let i = min; i <= max; i++) {
      let key = `${line[0][0]}-${i}`;
      if (field[key]) field[key]++;
      else field[key] = 1;
    }
  } else if (line[0][1] === line[1][1]) {
    // It's vertical
    let min = Math.min(line[0][0], line[1][0]);
    let max = Math.max(line[0][0], line[1][0]);
    for (let i = min; i <= max; i++) {
      let key = `${i}-${line[0][1]}`;
      if (field[key]) field[key]++;
      else field[key] = 1;
    }
  } else {
    let minX = Math.min(line[0][0], line[1][0]);
    let maxX = Math.max(line[0][0], line[1][0]);
    xIndex = parseInt(line[0][0]);
    xDirection = xIndex === minX ? 1 : -1;

    let minY = Math.min(line[0][1], line[1][1]);
    let maxY = Math.max(line[0][1], line[1][1]);
    yIndex = parseInt(line[0][1]);
    yDirection = yIndex === minY ? 1 : -1;

    if (maxX - minX !== maxY - minY) {
      console.log(line);
      console.log(`minX = ${minX}, maxX = ${maxX}, minY = ${minY}, maxY = ${maxY}, differenceX = ${maxX - minX}, differenceY = ${maxY - minY}, `);
    }

    do {
      let key = `${xIndex}-${yIndex}`;
      if (field[key]) field[key]++;
      else field[key] = 1;
      xIndex += xDirection;
      yIndex += yDirection;
    } while (xIndex <= maxX && xIndex >= minX);
  }
});

let score = 0;
Object.keys(field).forEach((key) => {
  if (field[key] > 1) {
    score++;
  }
});
console.log(score);
