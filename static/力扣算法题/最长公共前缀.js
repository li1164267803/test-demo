/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.length <= 1) return strs[0]
    let asdanum = strs[0];
    let name = asdanum.substr(0, 1);
    let flag = true
    while (flag) {
        for (let idx = 0; idx < asdanum.length; idx++) {
            // 截取长度，所有的都要满足
            let flag = strs.every((v) => v.substr(0, name.length) == name);
            if (flag) {
                if (name.length + 1 > asdanum.length) {
                    flag = false
                    return name
                }
                name = asdanum.substr(0, name.length + 1)
            } else {
                flag = false
                name = name.substr(0, name.length - 1)
                return name
            }
        }
    }
};


let strs = ["flower", "flow", "flight"]
console.log(111, longestCommonPrefix(strs));



var longestCommonPrefix2 = function (strs) {
    if (strs.length == 0) return ''
    //公共前缀比所有字符串都短，随便选一个先
    let str = strs[0]
    for (let index = 0; index < strs.length; index++) {
        const element = strs[index];
        // https://www.runoob.com/jsref/jsref-startswith.html
        // startsWith() 方法用于检测字符串是否以指定的子字符串开始。
        console.log(111);
        if (!element.startsWith(str)) {
            if (str.length === 0) return ''
            //公共前缀不匹配就让它变短！
            str = str.substring(0, str.length - 1)
        }
    }
    return str
};