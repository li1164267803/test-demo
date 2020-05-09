<template>
  <custom-table
    class="aaaaa"
    ref="dom"
    v-bind="{...$props,...$attrs}"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
    v-on="$listeners"
  >
    <slot />
  </custom-table>
</template>

<script>
/**
     * 最简单的重构也需要使用vue中提供的三个内置属性，分别是:
        1. $attrs 从父组件中传入的所有属性的集合(不包含class和style,ref)
        2. $props 当前组件中定义的props属性
        3. $listeners 从父组件中传入的所有的事件监听(不包含.native的事件)
        4. <slot/> 这个不是为了重构提供的属性,但是我们调用某个组件若是需要插槽的话,还是需要继续以插槽的形式向下探
    */
import { Table as CustomTable } from "element-ui";
export default {
  components: {
    CustomTable
  },
  inheritAttrs: false, // 如果为false的时候，父传递过来的值，在子组件的props中没有接收的时候，就会显示在子组件的根节点的标签上
  props: {
    stripe: {
      type: Boolean,
      default() {
        return true;
      }
    },
    border: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  mounted() {
    console.log(this.$attrs, this.$listeners, this.$options);

    this.$emit("forward-ref", this.$refs.dom);
  }
};
</script>
