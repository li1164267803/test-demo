  import BigNumber from 'bignumber.js'
  
  export const imgReady = (function () {
    var list = [],
      intervalId = null,
      // 用来执行队列
      tick = function () {
        var i = 0;
        for (; i < list.length; i++) {
          list[i].end ? list.splice(i--, 1) : list[i]();
        };
        !list.length && stop();
      },
      // 停止所有定时器队列
      stop = function () {
        clearInterval(intervalId);
        intervalId = null;
      };
    return function (url, ready, load, error) {
      var onready, width, height, newWidth, newHeight,
        img = new Image();
      img.src = url;
      // 如果图片被缓存，则直接返回缓存数据
      if (img.complete) {
        ready.call(img);
        load && load.call(img);
        return;
      };
      width = img.width;
      height = img.height;
      // 加载错误后的事件
      img.onerror = function () {
        error && error.call(img);
        onready.end = true;
        img = img.onload = img.onerror = null;
      };
      // 图片尺寸就绪
      onready = function () {
        newWidth = img.width;
        newHeight = img.height;
        if (newWidth !== width || newHeight !== height || newWidth * newHeight > 1024) {
          // 如果图片已经在其他地方加载可使用面积检测
          ready.call(img);
          onready.end = true;
        };
      };
      onready();
      // 完全加载完毕的事件
      img.onload = function () {
        // onload在定时器时间差范围内可能比onready快
        // 这里进行检查并保证onready优先执行
        !onready.end && onready();
        load && load.call(img);
        // IE gif动画会循环执行onload，置空onload即可
        img = img.onload = img.onerror = null;
      };
      // 加入队列中定期执行
      if (!onready.end) {
        list.push(onready);
        // 无论何时只允许出现一个定时器，减少浏览器性能损耗
        if (intervalId === null) intervalId = setInterval(tick, 40);
      };
    };
  })();
  
  /*
    处理精度丢失问题，保留两位小数加%(处理员工绩效的好用)
  */
  export function bigNumberCalc(number) {
      if(!number) return '--';
      return new BigNumber(number).multipliedBy(100).toFixed(2)+'%'
  }
  
  /*
    秒数转为天小时分秒 timeFormatter
    @remain 为秒数
    @daysRound 天
    @hoursRound 时
    @minutesRound 分
    @seconds 秒
  */ 
  export const timeFormatter = remain => {
      let days = remain / 60 / 60 / 24;
      let daysRound = Math.floor(days);
      let hours = remain / 60 / 60 - (24 * daysRound);
      let hoursRound = Math.floor(hours);
      let minutes = remain / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
      let minutesRound = Math.floor(minutes);
      let seconds = remain - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
      if(daysRound) return daysRound + " 天 " + hoursRound + " 小时 " + minutesRound + " 分钟 " + seconds + " 秒 ";
      if(hoursRound) return hours + " 小时 " + minutesRound + " 分钟 " + seconds + " 秒 ";
      if(minutesRound) return minutesRound + " 分钟 " + seconds + " 秒 ";
      if(seconds) return seconds + " 秒 ";
  }
  
  /*
    毫秒数转为天小时分秒 getDuration
    @my_time 为毫秒数
    @daysRound 天
    @hoursRound 时
    @minutesRound 分
    @seconds 秒
  */ 
  export function getDuration(my_time) {  
    var days    = my_time / 1000 / 60 / 60 / 24;
    var daysRound = Math.floor(days);
    var hours = my_time / 1000 / 60 / 60 - (24 * daysRound);
    var hoursRound = Math.floor(hours);
    var minutes = my_time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
    var minutesRound = Math.floor(minutes);
    var seconds = my_time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    console.log('转换时间:', daysRound + '天', hoursRound + '时', minutesRound + '分', seconds + '秒');
    var time = hoursRound + ':' + minutesRound + ':' + seconds
    return time;
  }

  /**
 * 处理时间截取转化 timeFiltering
 * 使用filters过滤器的时候传值例：
 * {{元数据 | timeFiltering(2)}}
 * 默认第一个参数是元数据，所以不用传递
 * @param date 需要处理的时间
 * @param type 转化的类型
 */
export function timeFiltering(date,type) {
    if(!date) return '--';
    switch (type) {
        case 1: // 返回 2020年05月10日
            return moment(date).format('YYYY年MM月DD日')
        case 2: // 2020-10-20 10:24
            return moment(date).format('YYYY-MM-DD hh:mm')
        case 'yy-mm-dd': // 2020-10-20
            return moment(date).format('YYYY-MM-DD')
        case 'hh-mm-ss': //  11:29:59
            return moment(date).format('hh:mm:ss')
        case 'hh-mm':
            return moment(date).format('hh:mm')
        default:
            break;
    }
}