function romanToInt(str) {
  let obj = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let arr = str.split("");
  let num = 0;
  let len = arr.length;
  for (let idx = 0; idx < len; idx++) {
    const cur = arr[idx];
    const next = arr[idx + 1];
    let cutNum = obj[cur];
    let nextNum = obj[next];
    if (cutNum < nextNum) {
      num -= cutNum;
    } else {
      num += cutNum;
    }
  }
  return num;
}
console.log("结果", romanToInt("LVIII"));
