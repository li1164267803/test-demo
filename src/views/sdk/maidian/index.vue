<template>
  <div>
    <button @click="logReporting">日志上报</button>
  </div>
</template>

<script>
import { logReporting } from "@/common/sdk";

export default {
  data() {
    return {};
  },
  methods: {
    logReporting() {
      // 5s上报一次日志
      let data = {
        equipment: "pc",
        projectname: "1244437890123",
        versionnum: "45435353534535353453534534",
        networkType: "3g",
        timestamp: new Date().getTime(),
        logInfor: "错误信息错误息"
      };
      let opstion = {
        data: [data],
        networkTips: "自定义的提示",
        isDev: true
      };
      return logReporting(opstion);
    }
  },
  mounted() {
    // 单次返回请求结果
    let data = {
      equipment: "pc",
      projectname: "1244437890123",
      versionnum: "45435353534535353453534534",
      networkType: "3g",
      timestamp: new Date().getTime(),
      logInfor: "错误信息错误息2"
    };
    let opstion = {
      data: [data],
      networkTips: "asdasd",
      isDev: true,
      isResults: true
    };
    logReporting(opstion).then(res => {
      console.log(res);
    });
  }
};
</script>
