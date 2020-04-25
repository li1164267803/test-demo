<template>
  <div>
    处理时间数据，是否为两位数
    {{timerDeta}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      timerDeta: ""
    };
  },
  methods: {
    dTime(t) {
      let strT = t.toString();
      console.log(strT, strT[1]);
      return strT[1] ? strT : "0" + strT;
    },
    timer() {
      let myDate = new Date();
      let y = myDate.getFullYear();
      let month = this.dTime(myDate.getMonth() + 1);
      let d = this.dTime(myDate.getDate());
      let h = this.dTime(myDate.getHours());
      let minutes = this.dTime(myDate.getMinutes());
      console.log(y, month, d, h, minutes);
      this.timerDeta = y + month + d + "_" + h + minutes;
    }
  },
  mounted() {
    console.log("测试时间", this.dTime(3), this.timer());
  }
};
</script>