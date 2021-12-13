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
    // uniquePatterns: split[0].split(" ").map((x) => x.split("").sort().join("")),
    // outputValues: split[1].split(" ").map((x) => x.split("").sort().join("")),
  };
});

const ZERO = "abcefg";
const ONE = "cf";
const TWO = "acdeg";
const THREE = "acdfg";
const FOUR = "bcdf";
const FIVE = "abdfg";
const SIX = "abdefg";
const SEVEN = "acf";
const EIGHT = "abcdefg";
const NINE = "abcdfg";

const getDigit = (string) => {
  let sortedString = string.split("").sort().join("");
  let res;
  switch (sortedString) {
    case ZERO:
      res = 0;
      break;
    case ONE:
      res = 1;
      break;
    case TWO:
      res = 2;
      break;
    case THREE:
      res = 3;
      break;
    case FOUR:
      res = 4;
      break;
    case FIVE:
      res = 5;
      break;
    case SIX:
      res = 6;
      break;
    case SEVEN:
      res = 7;
      break;
    case EIGHT:
      res = 8;
      break;
    case NINE:
      res = 9;
      break;
    default:
      res = false;
      break;
  }

  return res;
};

let answer = 0;

display.forEach((line) => {
  let uniqueNumbers = {};
  let digits = {
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null,
    g: null,
  };

  line.uniquePatterns.forEach((pattern, patternIndex) => {
    switch (pattern.length) {
      case 2:
        uniqueNumbers[1] = pattern;
        break;
      case 4:
        uniqueNumbers[4] = pattern;
        break;
      case 3:
        uniqueNumbers[7] = pattern;
        break;
      case 7:
        uniqueNumbers[8] = pattern;
        break;
    }
  });

  uniqueNumbers[9] = line.uniquePatterns.filter((string) => {
    // Is of length 6
    let lengthCheck = string.length === 6;
    if (!lengthCheck) return false;
    // Exactly one digit from 8 is not included in this one
    let missingDigit = uniqueNumbers[8].split("").filter((digit) => {
      return !string.split("").includes(digit);
    })[0];
    // Check that that same digit is also not included in 4, otherwise the string is a 0 or a 6.
    if (!uniqueNumbers[4].split("").includes(missingDigit)) {
      digits.e = missingDigit;
      return true;
    } else {
      // 0 or 6
      // If the missing digit is included in 1, then it's 0
      if (!uniqueNumbers[1].split("").includes(missingDigit)) {
        digits.d = missingDigit;
        uniqueNumbers[0] = string;
      } else {
        digits.c = missingDigit;
        uniqueNumbers[6] = string;
      }
    }
  })[0];

  uniqueNumbers[5] = line.uniquePatterns.filter((string) => {
    // Is of length 5
    let lengthCheck = string.length === 5;
    if (!lengthCheck) return false;
    if (string.split("").includes(uniqueNumbers[1].split("")[0]) && string.split("").includes(uniqueNumbers[1].split("")[1])) {
      // If string includes both segments from 1, it's 3
      uniqueNumbers[3] = string;
    } else if (string.split("").includes(digits.e)) {
      // If string includes e, it's two
      uniqueNumbers[2] = string;
    } else {
      // If string is of length 5, it doesn't include both segments from 1, and it doesn't include e, then it's 5
      return true;
    }
  })[0];

  // Basically 7 - 1
  digits.a = uniqueNumbers[7].split("").filter((digit) => {
    return !uniqueNumbers[1].split("").includes(digit);
  })[0];

  // Basically 8 - 3 - e
  digits.b = uniqueNumbers[8].split("").filter((digit) => {
    if (digit === digits.e) return false;
    return !uniqueNumbers[3].split("").includes(digit);
  })[0];

  // 1 - c
  digits.f = uniqueNumbers[1].split("").filter((digit) => {
    return digit !== digits.c;
  })[0];

  // Basically 3 - 7 - g
  digits.g = uniqueNumbers[3].split("").filter((digit) => {
    if (digit === digits.d) return false;
    return !uniqueNumbers[7].split("").includes(digit);
  })[0];

  let res = 0;

  line.outputValues.forEach((outputValue) => {
    let keys = Object.keys(digits);
    keys.forEach((key) => {
      outputValue = outputValue.replace(digits[key], key.toUpperCase());
    });

    res *= 10;
    res += getDigit(outputValue.toLowerCase());
  });

  answer += res;
});

console.log(answer);
