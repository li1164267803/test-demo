<template>
  <div class="box">
    <div class="div">
      asdasd
    </div>
    <input type="text" @keyup.enter="asdasd" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created: function() {
    var _this = this;
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      if (key == 13) {
        _this.asdasd();
      }
    };
  },
  methods: {
    asdasd() {
      console.log("按下得");
    },
  },
};
</script>

<style lang="less" scoped>
.div {
  width: 100%;
  height: 500px;
  background: red;
}
</style>
