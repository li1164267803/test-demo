<template>
    <!-- tui-editor 富文本编辑器   -->
    <mytuieditor v-model="content" ref="myQuillEditor" height="600px"></mytuieditor>
</template>
 
<script>
// tuieditor富文本编辑器
import mytuieditor from "@/components/tuieditor"; //导入tuieditor富文本编辑器组件
export default {
  name: "App",
  components: {
    mytuieditor //注册tuieditor富文本编辑器组件
  },
  data() {
    return {
      content: "tuieditor富文本编辑器初始值"
    };
  }
};
</script>
 
<style scoped>
 
</style>