<template>
  <div>
    {{arr}}
    {{arr.length}}
    {{obj}}
    <input v-bind:value="arr[1]" @input="shijian" />
    <input v-model="something" />
    <Button @click="onButton">按钮</Button>
    <hr />
    <div>
      自定义实现v-model获取数据
      <modelComponent v-model="inputVal"></modelComponent>
      <div>输出的内容：{{inputVal}} typeof: {{typeof inputVal}}</div>
    </div>
    <hr />
  </div>
</template>

<script>
import modelComponent from "./components/index-input";
export default {
  components: { modelComponent },
  data() {
    return {
      something: "",
      arr: [0, 3, 123, 435, 3],
      obj: {
        aaaa: "1"
      },
      inputVal: ""
    };
  },
  activated() {
    console.log("缓存的model");
  },
  methods: {
    shijian(event) {
      console.log(event);
      this.arr[1] = event.target.value;
      console.log(this.arr);
    },
    onButton() {
      console.log("onButton", this.arr.length);
      this.arr[1] = 200;
      // this.obj[0] = '4545454'
      // this.obj.aaaa = '4545454'
      // this.arr.length = 3;
      // this.$set(this.arr, 1, 200)
      console.log(this.arr, this.obj);
    }
  }
};
</script>