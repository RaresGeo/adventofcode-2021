const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

let display = data.split("\r\n").map((line) => {
  let split = line.split(" | ");

  return {
    uniquePatterns: split[0].split(" "),
    outputValues: split[1].split(" "),
  };
});

let counter = 0;

display.forEach((line) => {
  line.outputValues.forEach((outputValue) => {
    counter += [2, 4, 3, 7].includes(outputValue.length);
  });
});

console.log(counter);
