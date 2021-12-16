const fs = require("fs");

let data;

data = fs
  .readFileSync("./input.txt", "utf8")
  .split("\r\n")
  .map((x) => parseInt(x));

let counter = 0;
let windows = [];

data.forEach((element, elementIndex) => {
  for (let i = -2; i <= 0; i++) {
    let windowIndex = elementIndex + i;
    if (windowIndex < 0) continue;
    if (!windows[windowIndex]) {
      windows[windowIndex] = [element];
      break;
    } else windows[elementIndex + i].push(element);
  }
});

let windowSums = [];

windows.forEach((window) => {
  if (window.length !== 3) return;
  windowSums.push(window.reduce((a, b) => a + b, 0));
});

let previous;

windowSums.forEach((sum) => {
  if (previous && sum > previous) counter++;
  previous = sum;
});

console.log(counter);
