function parseInt2(string, radix) {
    return console.log(string, radix)
}

const res = ['1', '2', '3'].map(parseInt2)
console.log('🚀 ~ file: 测试map方法参数简写.js ~ line 6 ~ res', res)

// https://blog.csdn.net/freshlover/article/details/19034079
const res2 = ['1', '2', '3'].map(parseInt)
console.log('🚀 ~ file: 测试map方法参数简写.js ~ line 6 ~ res', res2)
