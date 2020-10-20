<template>
  <div id="barrage"></div>
</template>

<script>
import barrage from "./barrage.js";
export default {
  name: "Barrage",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    const { addBarrageItem } = barrage({
      barrageContainer: document.querySelector("#barrage"),
    });
    window.BarrageMagess = function(data) {
      const barrageItem = document.createElement("div");
      barrageItem.classList.add("barrage-item-inner");
      const barrageItemContent = document.createElement("span");
      barrageItemContent.textContent = data.from.name + " : " + data.content;
      const barrageItemImg = document.createElement("img");
      barrageItemImg.classList.add("barrage-img");
      barrageItemImg.setAttribute("src", data.from.avatar);
      barrageItem.prepend(barrageItemImg);
      barrageItem.appendChild(barrageItemContent);
      addBarrageItem(barrageItem, {
        click: function() {
          console.log("一个点击事件");
        },
      });
    };
    let data = {
      content: "弹幕的内容",
      from: {
        avatar:
          "https://resource.puxinwangxiao.com/7c32e42aa764179b14fec8d5ad477ca4.png",
        endType: 0,
        id: "24547850",
        name: "高菊红",
        number: "203890006393397248",
        status: 0,
        type: 1,
        webrtcSupport: 1,
      },
    };
    setInterval(() => {
      BarrageMagess(data);
    }, 200);
  },
};
</script>

<style lang="scss">
#barrage {
  width: 100%;
  height: 120px;
  position: absolute;
  top: 100px;
  user-select: none;
  overflow: hidden;
  border: 1px solid #000;

  // pointer-events: none;
  .barrage-item {
    position: absolute;
    cursor: pointer;
    font-size: 14px;
    .barrage-item-inner {
      white-space: nowrap;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      color: transparent;
      background: linear-gradient(270deg, #e147ff 0%, #448bff 100%);
      background-clip: text;
      -webkit-background-clip: text;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
  .barrage-pause {
    z-index: 1;
    background: linear-gradient(270deg, #fbe1ff 0%, #e1ecff 100%);
    border-radius: 20px;
    span {
      color: transparent;
      background: linear-gradient(270deg, #e147ff 0%, #448bff 100%);
      -webkit-background-clip: text;
    }
  }
}
</style>
