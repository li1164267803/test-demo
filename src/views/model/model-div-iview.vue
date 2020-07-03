<template>
  <div class="father">
    <h4>iview库的实现方式</h4>
    <el-button @click="handelBtn">父元素的按钮控制子隐藏显示</el-button>
    <div>父级的变量flag: {{flag}}</div>
    <modelCom v-model="flag"></modelCom>
  </div>
</template>

<script>
import modelCom from "./components/index-iview";
export default {
  components: { modelCom },
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