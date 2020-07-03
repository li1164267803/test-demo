<template>
  <div>
    一个子组件
    <hr />
    <span>{{num}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      timer: null
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.num += 1;
      console.log("mounted -> this.num ", this.num);
    }, 1000);
  },
  updated() {
    // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    console.log("数据更新了", this.num);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
