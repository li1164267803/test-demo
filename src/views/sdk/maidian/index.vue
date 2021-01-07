<template>
  <div>
    <button @click="logReporting3">单次日志上报 看控制台请求</button>
  </div>
</template>

<script>
import logReporting from "@/common/sdk";

export default {
  data() {
    return {
      logReporting:null
    };
  },
  methods: {
    logReporting3() { // 手动上报 需要传递一个数组，可多条数据
      let arr = [{
        equipment: "pc",
        projectname: "1244437890123",
        versionnum: "45435353534535353453534534",
        networkType: "3g",
        timestamp: new Date().getTime(),
        logInfor: "错误信息错误息"
      }];
      this.logReporting.xmlhttp(arr)
    }
  },
  mounted() {
    let opstion = {
      networkTips: "自定义的提示",
      isDev: true
    };
    this.logReporting = new logReporting(opstion)
    
    let data = {
      equipment: "pc",
      projectname: "1244437890123",
      versionnum: "45435353534535353453534534",
      networkType: "3g",
      timestamp: new Date().getTime(),
      logInfor: "错误信息错误息2"
    };

    // addData 为设置上传数据并定时自动上报
    this.logReporting.addData(data)
    // 5s内没有数据后，会停止自动上报
    setTimeout(() => {
      this.logReporting.addData(data)
    }, 15000);
  }
};
</script>
