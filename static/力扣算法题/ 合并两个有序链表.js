var mergeTwoLists = function(l1, l2) {
        let arr = l1.concat(l2)
        return arr.sort((a,b)=>a-b)
};
let l1 = [1,4,64,3]
let l2 = [2,4,64,3]
console.log(333,mergeTwoLists(l1,l2));