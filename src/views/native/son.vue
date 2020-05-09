<template>
  <div>
    <button>子组件</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "son",
  methods: {
    active() {
      console.log("son的方法");
    }
  },
  mounted() {
    this.$emit("click");
  }
};
</script>