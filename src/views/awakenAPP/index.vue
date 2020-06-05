<template>
  <div>
    <button @click="openApp">唤醒app</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    callapp_PC({ url, callback }) {
      var t = setTimeout(callback, 1000);
      var inp = document.createElement("input");
      inp.style.position = "absolute";
      inp.style.clip = "rect(0, 0, 0, 0)";
      function blur() {
        window.clearTimeout(t);
      }
      inp.addEventListener("blur", blur);
      document.body.appendChild(inp);
      inp.focus(); // 获取焦点
      setTimeout(function() { // 删除无用的标签
        inp.removeEventListener("blur", blur);
        document.body.removeChild(inp);
      }, 1000);
    //有客户端 如果有本地exe应用，就会弹框，input失去焦点，然后执行blur()事件 清空t定时器 - 删除无用的标签定时器
    //无客户端 不会弹框，input也不会失去焦点 触发t定时器- 执行callback - 删除无用的标签定时器
      location.href = url;
    },
    openApp() {
      //   document.getElementById("openApp").onclick = function(e) {
      //     callapp_PC({
      //       url: "baijiacloud://urlpath=https%3A%2F%2Fb41568785.at.baijiayun.com",
      //       callback: function() {
      //         console.log("唤醒失败了,做一些唤醒失败后的操作吧");
      //       }
      //     });
      //   };
      this.callapp_PC({
        // url: "baijiacloud://urlpath=https%3A%2F%2Fb41568785.at.baijiayun.com",
        url: "baijiacloud://urlpath=https%3A%2F%2Fb41568785.at.baijiayun.com",
        callback: function() {
          console.log("唤醒失败了,做一些唤醒失败后的操作吧");
        }
      });
    }
  }
};
</script>