// Задание 1
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 1");
string = "";
for (let i of Array(7).keys()) {
  string += "#";
  console.log(string);
}

// Задание 2
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 2");
array = Array.from(Array(101).keys());
array.shift();

for (let i of array) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}

// Задание 3
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 3");
boardRow = "";
for (let row of Array.from(Array(8).keys())) {
  boardCol = "";
  for (let col of Array.from(Array(8).keys())) {
    row % 2
      ? col % 2
        ? (boardCol += "#")
        : (boardCol += " ")
      : col % 2
      ? (boardCol += " ")
      : (boardCol += "#");
  }
  console.log(boardCol);
}

// Задание 4
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 4");
const min = (first, second) => (first <= second ? first : second);
console.log(min(13, 17));

// Задание 5
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 5");
function countChar(string, char) {
  amount = 0;
  for (let letter of string) {
    amount += 1 && letter === char;
  }
  return amount;
}
console.log(countChar("asjfbaihfbjadsfbdsaiufiasbda", "s"));

// Задание 6
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 6");
const range = (start, stop, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

const sum = (arr) => arr.reduce((a, b) => a + b);
console.log(range(3, 10, 2));
console.log(sum(range(3, 10, 2)));

// Задание 7
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 7");
function reverseArray(arr) {
  let revArr = [];
  arr.forEach((i) => revArr.unshift(i));
  return revArr;
}

function reverseArrayInPlace(arr) {
  arr = reverseArray(arr);
  return arr;
}
console.log(reverseArray(range(0, 10)));
console.log(reverseArrayInPlace(range(0, 10)));

// Задание 8
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 8");
function arrayToList(arr, list = {}) {
  for (let i of arr) {
    list["value"] = i;
    arr.shift();
    list["rest"] = Object.assign({}, arrayToList(arr, list["rest"]));
  }
  return list;
}
function listToArray(list, arr = []) {
  arr.push(list[Object.keys(list)[0]]);
  if (Object.keys(list["rest"]).length !== 0) {
    arr.concat(listToArray(list["rest"], arr));
  }
  return arr;
}
function nth(list, index) {
  return index === 0
    ? list[Object.keys(list)[0]]
    : nth(list["rest"], index - 1);
}
console.log(nth(arrayToList(range(1, 10)), 5));
console.log(arrayToList(range(0, 2)));
console.log(listToArray(arrayToList(range(0, 2))));
console.log(nth(arrayToList(range(0, 4)), 2));

// Задание 9
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 9");
function deepEqual(a, b) {
  if (
    (typeof a != "object" && typeof b != "object") ||
    a == null ||
    b == null
  ) {
    return a == b;
  } else if (a["value"] == b["value"] && deepEqual(a["rest"], b["rest"])) {
    return true;
  } else {
    return false;
  }
}
console.log(deepEqual(arrayToList(range(1, 8)), arrayToList(range(1, 8))));

// Задание 10
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 10");
const reducer = (a, b) => a.concat(b);
console.log(
  [
    [1, 2, 3],
    [2, 3, 4],
    [5, 6, 7, 8],
  ].reduce(reducer)
);

// Задание 13
console.log("\x1b[36m%s\x1b[0m", "\n\nЗадание 13");
function every(arr, func) {
  for (let i of arr) {
    if (!func(i)) {
      return false;
    }
  }
  return true;
}
function some(arr, func) {
  for (let i of arr) {
    if (func(i)) {
      return true;
    }
  }
  return false;
}
console.log(every([1, 2, 3, 4], (i) => i > 0));
console.log(some([1, 2, 3, 4], (i) => i < 0));
