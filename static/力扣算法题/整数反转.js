function reverse(x) {
    let rev = 0;
    while (x !== 0) {
        const digit = x % 10;
        // ~~ js取反运算符 比 Math.floor()更快的方法 ~~1.9 => 1
        // https://www.jianshu.com/p/90c089411da2
        x = ~~(x / 10);
        rev = rev * 10 + digit;
        // 处理32位数的越界问题
        if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
            return 0;
        }
    }
    return rev;
}

console.log(reverse(22424545));