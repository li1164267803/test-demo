/**
 *
 * @param {object} options - 外部配置参数对象
 * @param {boolean} isDev - 是否为开发环境 默认false
 * @param {Array object} data - 手动上报传递一个数组格式[{}]  自动上报传递一个{}
 * @param {string} networkTips - 无网络提示文本
 * @param {number} ms - 请求间隔 单位毫秒
 */
class logReporting {
  constructor(options) {
    this.option={
      isDev: false,
      networkTips: "网络连接失败",
      ms: 5000,
    }
    Object.assign(this.option, options);

    this.arr = []
    this.timerId = null

    this.xhr = new XMLHttpRequest();
    this.xhr.timeout = 0; // 设置超时时间,0表示永不超时
  }
  addData(data){ // 设置请求参数，自动上报
    this.arr.push(data)
    if(this.timerId) return
    this.timerFn()
  }
  timerFn(){
    let { ms } = this.option;
    this.timerId = setInterval(() => {
       let arr = JSON.parse(JSON.stringify(this.arr))
       this.arr = []
        // 没有数据后，停止自动上报
       if(arr.length<=0) {
         clearInterval(this.timerId)
         this.timerId = null
         return
       }
       this.xmlhttp(arr)
     }, ms);
  }
  // 可单次手动上报，请求参数为数组
  xmlhttp(data) {
     // 测试域名未定，暂时使用ip + 端口
    let url = "https://logcollectzx.aixuexi.com/collect/log/multi/online?strict=false";
    if (this.option.isDev) url = `https://logcollectzx.aixuexi.com/collect/log/multi/online_test?strict=false`;
    if (!navigator.onLine) return window.alert(this.option.networkTips);
    return new Promise((resolve, reject) => {
      this.xhr.open("post", url, true);
      this.xhr.setRequestHeader("Content-Type", "application/json;");
      this.xhr.onload = e => resolve(JSON.parse(this.xhr.responseText));
      this.xhr.onerror = e => reject(e);
      this.xhr.ontimeout = e => reject(e);
      this.xhr.send(JSON.stringify(data));
    });
  }
}
export default logReporting