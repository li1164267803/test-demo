<template>
  <div>
    <div class="custom-switch">{{visible}}</div>
    <button @click="close">子关闭按钮{{visible}}</button>
    <div>通过父级给子绑定v-model</div>
    <div class="diong" v-show="visible">一个模态框</div>
  </div>
</template>

<script>
export default {
  name: "CustomSwitch",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      console.log("触发点击事件");
      this.$emit("update:visible", false); // 通过sync直接修改了父组件的值
    }
  }
};
</script>

<style scoped lang="less">
.custom-switch  {
  background: yellow;
}
.diong {
  width: 80px;
  height: 80px;
  background-color: pink;
}
</style>
