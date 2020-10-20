<template>
  <div id="barrage">
    <!-- 自定义模板样式  模板样式一定要先display:none-->
    <div class="barrage-item" style="display:none">
      <div class="barrage-item-inner">
        <img
          class="barrage-img"
          src="https://resource.puxinwangxiao.com/7c32e42aa764179b14fec8d5ad477ca4.png"
          alt
        />
        <span>{{item.content}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import barrage from "./barrage.js";
export default {
  name: "Barrage",
  data() {
    return {
      item: {
        content: "弹幕的内容1",
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
      },
    };
  },
  methods: {
    addBarrageItemNode() {
      // 克隆一个模板dom
      let cloneNode = document.querySelector(".barrage-item").cloneNode(true);
      this.barrage.addBarrageItem(cloneNode, {
        click: function () {
          console.log("一个点击事件");
        },
        mouseover: () => {
          console.log("外部传入的划入事件");
        },
      });
    },
  },
  mounted() {
    // 传递一个父容器
    this.barrage = new barrage({
      barrageContainer: document.querySelector("#barrage"), // 必传
      barrageItemBox: "barrage-item", // 必传
    });
    this.item = {
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
    let num = 1;
    //  收到一次消息，克隆一个
    this.timerId = setInterval(() => {
      this.item.content = `弹幕的内容${num}`;
      num++;
      this.addBarrageItemNode(this.item);
    }, 500);
  },
  destroyed() {
    clearInterval(this.timerId);
  },
};
</script>

<style lang="scss">
#barrage {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 100px;
  user-select: none;
  overflow: hidden;
  border: 1px solid #000;
  background-color: pink;
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
    // 滑上时添加的css
    z-index: 1;
    background: linear-gradient(270deg, #fbe1ff 0%, #e1ecff 100%);
    border-radius: 20px;
    span {
      color: transparent;
      background: linear-gradient(270deg, #e147ff 0%, #448bff 100%);
      background-clip: text;
      -webkit-background-clip: text;
    }
  }
}
</style>
