const fs = require("fs");
const { parse } = require("path/posix");

let data;

try {
  data = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
  console.log(err);
}

let split = data.split("\r\n");
let digits = [];
for (let i = 0; i < split[0].length; i++) {
  digits.push([0, 0]);
}

split.forEach((code) => {
  for (let i = 0; i < code.length; i++) {
    if (code[i] === "0") {
      digits[i][0]++;
    } else if (code[i] === "1") {
      digits[i][1]++;
    }
  }
});

let gamma, epsilon;
gamma = epsilon = "";
digits.forEach((digit) => {
  if (digit[0] > digit[1]) {
    gamma += "0";
    epsilon += "1";
  } else {
    gamma += "1";
    epsilon += "0";
  }
});

console.log("\n\nPart one:");


console.log("Final result ", parseInt(gamma, 2) * parseInt(epsilon, 2));

console.log("\n\nPart two:");

// PART TWO

let digit = 0;

while (split.length > 1 && digit < split[0].length) {
  let index = 0;
  let commonBit = digits[digit][0] > digits[digit][1] ? "0" : "1";
  // console.log(digits[digit], commonBit);
  while (index < split.length) {
    code = split[index];
    if (code[digit] !== commonBit) {
      split.splice(index, 1);
    } else index++;
  }
  digit++;

  digits[digit] = [0, 0];
  split.forEach((code) => {
    if (code[digit] === "0") {
      digits[digit][0]++;
    } else if (code[digit] === "1") {
      digits[digit][1]++;
    }
  });
}

let oxygen = parseInt(split, 2);
console.log("Oxygen", oxygen);

split = data.split("\r\n");
digit = 0;

while (split.length > 1 && digit < split[0].length) {
  let index = 0;
  // console.log(digits[digit]);
  let leastCommonBit = digits[digit][0] <= digits[digit][1] ? "0" : "1";
  while (index < split.length) {
    code = split[index];
    if (code[digit] !== leastCommonBit) {
      split.splice(index, 1);
      // console.log(`Removed ${code} because the ${digit}nth digit was ${code[digit]} and the least common bit was ${leastCommonBit}`);
    } else index++;
  }
  // console.log(split, digit, leastCommonBit);
  digit++;

  digits[digit] = [0, 0];
  split.forEach((code) => {
    if (code[digit] === "0") {
      digits[digit][0]++;
    } else if (code[digit] === "1") {
      digits[digit][1]++;
    }
  });
}
let scrubber = parseInt(split, 2);
console.log("Scrubber", scrubber);
console.log("\nFinal result ", oxygen * scrubber);
