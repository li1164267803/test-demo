/**
 * 节流函数，控制在一定的周期内执行某个动作仅一次
 */
export const throttle = (fn, wait = 100) => {
    let lastTime = null
    return function () {
        let curTime = new Date()
        // 距离下次触发fn还需等待的时间(如果没有lastTime说明是第一次，可以表示执行，即等待时间为0
        let remainTime = lastTime ? wait - (curTime - lastTime) : 0
        if (remainTime <= 0 || remainTime > wait) {
            lastTime = curTime
            return fn.apply(this, arguments)
        }
    }
}
/**
 * 防抖函数
 */
export const debounce = (fn, time = 200) => {
    let timeout = null
    return function () {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            return fn.apply(this, arguments)
        }, time)
    }
}