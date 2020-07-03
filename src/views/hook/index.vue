<template>
  <div>
    <!-- 通过@hook:updated生命钩子函数 -->
    <!-- 组件的所有生命周期钩子都可以通过@hook:钩子函数名 来监听触发 -->
    <!-- @hook:updated 可以用来监听第三方的组件 -->
    <custom-select @hook:updated="handleResizeChart"></custom-select>
  </div>
</template>

<script>
import customSelect from "./components/custom-select";
export default {
  components: { customSelect },
  data() {
    return {};
  },
  mounted() {
    this.jiangting();
  },
  methods: {
    jiangting() {
      // hook 的边界处理  https://cn.vuejs.org/v2/guide/components-edge-cases.html 程序化的事件侦听器
      this.$once("hook:beforeDestroy", () => {
        // 监听的是父组件的销毁事件 只执行一次
        // $once 监听执行一次 $on 监听一个事件
        // 使用hook监听销毁得生命周期
        console.log("父组件销毁");
        window.removeEventListener("resize", this.handleResizeChart); // 需要执行的事件
      });
    },
    handleResizeChart() {
      console.log("我是一个父组件监听后的方法", "子组件的dom触发了更新");
    }
  }
};
</script>
