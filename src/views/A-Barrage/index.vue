<template>
  <div class="barrage-box">
    barrage弹幕
    <div id="container">
      <div id="danmu"></div>
      <!-- <video /> -->
    </div>
    <!-- <barrage></barrage> -->
  </div>
</template>

<script>
import barrage from "a-barrage";
export default {
  components: { barrage },
  mounted() {
    let config = {
      engine: "css3", // 渲染引擎 canvas 或 css3 可选
      zoom: 1, // 文字缩放比
      proxyObject: null, // 事件代理触发对象
      usePointerEvents: true, // 屏蔽弹幕画布的点击事件
      maxTrack: 4, // 最大轨道数
      fontSize: 20, // 文字大小，单位为px
      fontColor: "#fff", // 文字颜色
      duration: 10000, // 弹幕留存时间
      trackHeight: 20 * 1.5, // 轨道高度，默认为默认文字的1.5倍
      wrapper: document.querySelector("#container"), // wrapper 用于弹幕交互的事件代理，如果需要交互，则必须传入
    };
    new barrage("#danmu", config);
  },
};
</script>

<style lang="less" scoped>
.barrage-box {
  height: 500px;
  position: absolute;
  top: 100px;
  border: 1px solid #000;
}
</style>
