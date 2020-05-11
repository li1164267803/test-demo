<template>
  <div>
    <button @click="parentHandel">子组件@click</button>
    <button>子组件@click.native</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "son",
  methods: {
    parentHandel() {
      this.$emit("click");
      //   console.log("子组件触发夫组件的自定义的cliak的方法");
    }
  }
};
</script>

