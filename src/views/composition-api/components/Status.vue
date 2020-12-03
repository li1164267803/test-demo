<template>
  <div class="status">
    <label for="all">
      All
      <input type="radio" name="status" id="all" value="all" v-model="status">
    </label>
    <label for="completed">
      Completed
      <input type="radio" name="status" id="completed" value="completed" v-model="status">
    </label>
    <label for="uncompleted">
      Uncompleted
      <input type="radio" name="status" id="uncompleted" value="uncompleted" v-model="status">
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: 'all'
    }
  },
  watch: {
    status (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="less" scoped>
.status {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}
</style>