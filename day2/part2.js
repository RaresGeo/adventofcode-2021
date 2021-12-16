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


