<template>
  <div>
    父组件
    <Son @click="active">@click</Son>
    <p>--------------</p>
    <Son @click.native="active">@click.native</Son>
  </div>
</template>

<script>
import Son from "./son";
/**
 * 在子组件上使用 @click 的时候没有效果，表示的是给子组件传递了一个自定义的方法，方法的名字叫做click，需要触发父组件的方法条件是需要在子组件中使用this.$emit('click')触发
 * @click.native 可以给原生的子组件绑定一个父组件的方法，这样就不需要子组件$emit触发，所以使用@click.native可以直接触发父组件中的方法
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