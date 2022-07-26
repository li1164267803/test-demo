<template>
  <div>
    <el-button @click="btn">sassdsdff</el-button>
    <el-input
      id="dfffff"
      type="textarea"
      :rows="20"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: 23434,
    };
  },
  methods: {
    btn() {
      let id = document.querySelector("#dfffff");
      console.dir(1111, id);
      console.log(222, id.value);
      console.log(333, this.textarea);
    },
  },
};
</script>
