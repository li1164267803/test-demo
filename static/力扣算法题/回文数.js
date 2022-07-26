function isPalindrome(x) {
    // 反正数组 在转 字符串， 前后对比是否相等 => 数值太大，反转后有溢出的问题
    if (x < 0) return false
    let str = JSON.stringify(x)
    str = str.split('').reverse().join('')
    console.log(1111, x, str);
    if (JSON.stringify(x) === str) {
        return true
    } else {
        return false
    }
}
// console.log(isPalindrome(121));

function isPalindrome2(x) {
    // https://leetcode-cn.com/problems/palindrome-number/solution/hui-wen-shu-by-leetcode-solution/
    // 特殊情况：
    // 如上所述，当 x < 0 时，x 不是回文数。
    // 同样地，如果数字的最后一位是 0，为了使该数字为回文，
    // 则其第一位数字也应该是 0
    // 只有 0 满足这一属性
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false
    }
    let revertedNumber = 0;
    while (x > revertedNumber) {
        let endNum = x % 10
        revertedNumber = revertedNumber * 10 + endNum
        x = ~~(x / 10) // 同 Math.floor()
    }
    // 当数字长度为奇数时，我们可以通过 revertedNumber/10 去除处于中位的数字。
    // 例如，当输入为 12321 时，在 while 循环的末尾我们可以得到 x = 12，revertedNumber = 123，
    // 由于处于中位的数字不影响回文（它总是与自己相等），所以我们可以简单地将其去除。
    return x === revertedNumber || x === Math.floor(revertedNumber / 10)
}
console.log(isPalindrome2(121));


