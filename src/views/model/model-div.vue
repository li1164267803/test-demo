<template>
  <div class="father">
    <el-button @click="handelBtn">父元素的按钮控制子隐藏显示</el-button>
    <div>父级的变量flag: {{flag}}</div>
    <modelComponent v-model="flag"></modelComponent>
  </div>
</template>

<script>
import modelComponent from './components/index-div';
export default {
  components: { modelComponent },
  data() {
    return {
      flag: true
    };
  },
  methods: {
    handelBtn() {
      this.flag = !this.flag;
    }
  }
};
</script>

<style scoped lang="less">
.father {
  border: 1px solid #000;
  padding: 10px;
}
</style>