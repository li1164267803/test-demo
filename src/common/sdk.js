/**
 *
 * @param {object} options - 参数对象
 * @param {boolean} isDev - 是否为开发环境 默认true
 * @param {Array} data - 请求传递的参数
 * @param {string} networkTips - 无网络提示文本
 * @param {boolean} isResults - 是否需要返回请求结果 自定义逻辑处理 返回结果不执行持续请求 默认false
 * @param {number} ms - 请求间隔 单位毫秒
 */
export function logReporting(options) {
  let obj = {
    isDev: true,
    data: [],
    networkTips: "网络连接失败",
    isResults: false,
    ms: 5000
  };
  Object.assign(obj, options);
  let { data, isDev, isResults, networkTips, ms } = obj;
  let xhr = null;
  // 测试域名未定，暂时使用ip + 端口
  let url = `http://log-collect.aixuexi.com/collect/log/multi/online?strict=false`;
  if (isDev) url = `http://47.94.194.201:14072/collect/log/multi/online_test?strict=false`;
  function xmlhttp() {
    if (!navigator.onLine) return window.alert(networkTips);
    if (!xhr) {
      xhr = new XMLHttpRequest();
      xhr.timeout = 0; // 设置超时时间,0表示永不超时
    }
    return new Promise((resolve, reject) => {
      xhr.open("post", url, true);
      xhr.setRequestHeader("Content-Type", "application/json;");
      xhr.onload = e => resolve(JSON.parse(xhr.responseText));
      xhr.onerror = e => reject(e);
      xhr.ontimeout = e => reject(e);
      xhr.send(JSON.stringify(data));
    });
  }
  if (isResults) return xmlhttp();
  setInterval(() => xmlhttp(), ms);
}
