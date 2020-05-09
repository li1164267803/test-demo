<template>
  <div>
    父组件
    <!-- <childen :data="num" @update:data="updateData"></childen> -->
    <childen :data.sync="num" :dataObj.sync="obj"></childen>
    <span>--------------------------------</span>
    <div>
      <childen :data.sync="num" :dataObj.sync="obj.bbbb"></childen>
      父级的obj：{{obj}}
    </div>
  </div>
</template>

<script>
import Childen from "./Childen";
export default {
  components: { Childen },
  name: "syncc",
  data() {
    return {
      num: 123,
      obj: {
        aaaa: 1231,
        bbbb: 222222
      }
    };
  },
  methods: {
    updateData(data) {
      console.log(data, "触发data");
      this.num = data;
    }
  },
  activated() {
    console.log("缓存的父子sync");
  }
};
</script>