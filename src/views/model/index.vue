<template>
  <div class="box">
    <h3>v-model给子组件绑定显示弹框案例</h3>
    <hr />
    <div class="box-model">
      <div>
        model绑定input
        <moduleInput></moduleInput>
      </div>
      <div>
        model绑定弹框div
        <a
          href="https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model"
          target="_blank"
        >自定义的v-model</a>
        <moduleDiv></moduleDiv>
      </div>
      <div>
        model绑定弹框iview实现方式
        <moduleIview></moduleIview>
      </div>
      <div>
        model绑定弹框element实现方式
        <modelElement></modelElement>
      </div>
    </div>
  </div>
</template>

<script>
import moduleInput from "./model-input";
import moduleDiv from "./model-div";
import moduleIview from "./model-div-iview";
import modelElement from "./model-div-element";
export default {
  components: { moduleInput, moduleDiv, moduleIview, modelElement }
};
</script>

<style lang="less" scoped>
.box {
  .box-model {
    display: flex;
    justify-content: space-around;
  }
}
</style>
