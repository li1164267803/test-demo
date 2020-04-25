<template>
  <div>
    子组件
    <div>
      {{data}}
      <div>
        <button @click="handleChange(33333333)">按钮</button>
      </div>
    </div>
    <div>
      {{dataObj}}
      <div>
        <button @click="handleChangeObj(33333333)">按钮对象</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Number,
      default() {
        return;
      }
    },
    dataObj: {
      default: ""
    }
  },
  methods: {
    handleChange(data) {
      console.log("handleChange");
      this.$emit("update:data", data);
    },
    handleChangeObj(data) {
      this.$emit("update:dataObj", { aaaa: 2222, bbbb: 99999 });
    }
  }
};
</script>