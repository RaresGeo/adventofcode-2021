const fs = require("fs");

let data;

data = fs
  .readFileSync("./input.txt", "utf8")
  .split("\r\n")
  .map((x) => {
    let split = x.split(" ");
    return {
      action: split[0],
      value: parseInt(split[1]),
    };
  });

let x, y;
x = y = 0;

data.forEach((element) => {
  switch (element.action) {
    case "forward":
      x += element.value;
      break;
    case "down":
      y += element.value;
      break;
    case "up":
      y -= element.value;
      break;
    default:
      break;
  }
});

console.log(x * y);
