<template>
  <div>
    <div class="custom-switch">{{active}}</div>
    <button @click="handleClick">子按钮{{active}}</button>
    <div>通过父级给子绑定v-model</div>
    <div class="diong" v-show="active">一个模态框</div>
  </div>
</template>

<script>
export default {
  name: "CustomSwitch",
  // 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件
  // https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
  model: {
    event: "change",
    prop: "active"
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      console.log("触发点击事件");
      this.$emit("change", !this.active); // 子也可以通过点击自己隐藏
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
