/**
 * @param {string[]} strs
 * @return {string}
 */
var isValid = function (strs) {
    while (strs.includes('()') || strs.includes('{}') || strs.includes('[]')) {
        strs = strs.replace('{}', '')
        strs = strs.replace('()', '')
        strs = strs.replace('[]', '')
    }
    if (strs == '') {
        return true
    } else {
        return false
    }
};

let strs = "()[]{}([{}]{)"
console.log(111, isValid(strs));