/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let r = nums.length - 1;
    let l = 0;
    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] == target) return mid;
        if (nums[mid] > target) {
            // 在左区间
            r = mid - 1;
        } else if (nums[mid] < target) {
            // 在右区间
            l = mid + 1;
        }
    }
    return -1;
};
let arr = [-1, 0, 3, 5, 9, 12];
console.log(search(arr, 9));