<template>
  <div>
    父组件
    <Son @click="active">@click</Son>
    <Son @click.native="active">@click.native</Son>
  </div>
</template>

<script>
import Son from "./son";
/**
 * 在使用子组件上使用@click 的时候没有效果，表示的是给子组件传递了一个自定义的方法，方法的名字叫做click，需要触发条件是需要在子组件中使用this.$emit('click')触发
 * @click.native 可以触发原生组件上的方法，所以使用@click.native可以直接触发子组件中的方法
 */
export default {
  components: { Son },
  methods: {
    active() {
      console.log("父组件的方法");
    }
  }
};
</script>