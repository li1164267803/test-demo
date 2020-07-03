<template>
  <div>
    <div class="custom-switch">{{visible}}</div>
    <button @click="close">关闭按钮{{visible}}</button>
    <div>通过父级给子绑定v-model</div>
    <div class="diong" v-show="visible">一个模态框</div>
  </div>
</template>

<script>
export default {
  name: "CustomSwitch",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.value
    };
  },
  methods: {
    close() {
      console.log("触发点击事件");
      this.visible = false;
      this.$emit("input", false); // 通过model默认绑定的是input的事件修改值
    }
  },
  watch: {
    value(val) {
      this.visible = val;
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
