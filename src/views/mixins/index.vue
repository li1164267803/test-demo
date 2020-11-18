<template >
  <div>
    <el-button @click="mixinsFn">测试 mixins重名问题</el-button>
    <hr>
    <span>结论：mixins定义的变量重名后会被当前组件的变量覆盖。</span>
  </div>
</template>

<script>
import {mixins} from './mixins';
export default {
  mixins:[mixins],
  data() {
    return {
      mixinsData:'组件的data'
    }
  },
  methods: {
    mixinsFn(){
      console.log('组件的方法',this.mixinsData);
    }
  },
}
</script>