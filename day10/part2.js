const fs = require("fs");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

data = data.split("\r\n").map((x) => x.split(""));

let points = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

let closingTags = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

let stack = [];
let score = [];

data.forEach((line, lineIndex) => {
  stack = [];
  let isCorrupt = false;
  line.forEach((element) => {
    if (Object.keys(closingTags).includes(element)) {
      stack.push(element);
    } else {
      let expectedClosingTag = closingTags[stack.pop()];
      if (element !== expectedClosingTag) {
        // console.log(`Expected ${expectedClosingTag}, but found ${element} instead.`);
        isCorrupt = true;
        return;
      }
    }
  });
  if (!isCorrupt) {
    let tempScore = 0;
    stack.reverse().forEach((tag) => {
      line.push(closingTags[tag]);
      tempScore *= 5;
      tempScore += points[tag];
    });
    score.push(tempScore);
  }
});
let sorted;
m = score.length - 1;
do {
  sorted = true;
  for (let i = 0; i < m; i++) {
    if (score[i] > score[i + 1]) {
      let temp = score[i];
      score[i] = score[i + 1];
      score[i + 1] = temp;
      sorted = false;
    }
  }
} while (!sorted);

console.log(score[Math.floor(score.length / 2)]);
