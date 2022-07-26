// https://leetcode-cn.com/problems/find-the-town-judge/
function findJudge(n, trust) {
    let myMap = new Map();
    for (let idx = 1; idx <= n; idx++) {
        myMap.set(idx, 0)
    }
    for (const iterator of trust) {
        myMap.delete(iterator[0]) // 删除信任别人的人
        let accept = iterator[1] // 被信任的
        if (myMap.get(accept) || myMap.get(accept) === 0) {
            // 设置被信任人的票数
            myMap.set(accept, myMap.get(accept) + 1)
        }
    }
    console.log(4, myMap);
    // 看看谁满票
    for (let z of myMap.entries()) {
        if (z[1] === n - 1) return z[0]
    }
    return -1

}

var n = 4,
    trust = [
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [4, 3],
    ]
console.log(findJudge(n, trust));