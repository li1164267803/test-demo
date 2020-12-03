<template>
  <div class="inputer">
    <h2>TODO LIST</h2>
    <input type="text" v-model="todoContent" @keyup.enter="submit">
  </div>
</template>

<script>
export default {
  data () {
    return {
      todoContent: ''
    }
  },
  methods: {
    submit () {
      this.$emit('submit', this.todoContent)
      this.todoContent = ''
    }
  }
}
</script>

<style lang="less" scoped>
.inputer {
  text-align: center;
  h2 {
    text-align: center;
  }
  input {
    border: 2px solid #333;
    width: 90vw;
    padding: 5px 10px;
    font-size: 24px;
  }
}
</style>
