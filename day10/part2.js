const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

data = data.split("\r\n").map((x) => x.split(""));

let points = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

let closingTags = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

let stack = [];
let score = 0;

data.forEach((line) => {
  line.forEach((element) => {
    if (Object.keys(closingTags).includes(element)) {
      stack.push(element);
    } else {
      let expectedClosingTag = closingTags[stack.pop()];
      if (element !== expectedClosingTag) {
        console.log(`Expected ${expectedClosingTag}, but found ${element} instead.`);
        score += points[element];
        return;
      }
    }
  });
});

console.log(score);
