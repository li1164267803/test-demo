// https://leetcode-cn.com/problems/find-the-town-judge/
var findJudge = function (N, trust) {
    let attack = Array(N).fill(0) // 攻  自己相信了几个
    let accept = Array(N).fill(0) // 受  有几个人相信自己
    for (let [a, b] of trust) {
        attack[a - 1]++
        accept[b - 1]++
        console.log(11, attack, accept);
    }
    console.log(2222, attack, accept);
    for (let i = 0; i < N; i++) {
        if (attack[i] === 0 && accept[i] === N - 1) {
            return i + 1
        }
    }
    return -1
};
var n = 4,
    trust = [
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [4, 3],
    ]
console.log(findJudge(n, trust));