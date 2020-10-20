<template>
  <div id="barrage" ref="stage">
    <div v-for="(item, index) in arr" :key="index + 'asda'">
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script>
// import { addElemnt, addBarrageItem } from './barrage'
import barrage from "./barrage.js";
export default {
  name: "Barrage",
  props: {
    arr: {
      type: Array,
      defuat() {
        return [];
      },
    },
  },
  watch: {
    arr(newVal) {
      console.log("arr -> newVal", newVal);
      console.log(this.$refs.stage.children, this.$refs.stage.children.length);
      this.addBarrageItem(
        this.$refs.stage.children[this.$refs.stage.children.length - 1],
        {
          click: function () {
            console.log("一个点击事件");
          },
        }
      );
    },
  },
  methods: {
    addBarrageItem(content = "", events = {}) {
      const barrageContainer = document.querySelector("#barrage");
      const barrageItems = barrageContainer.getElementsByClassName(
        "barrage-item"
      );
      const containerWidth = (this.containerWidth =
        barrageContainer.offsetWidth);
      const containerHeight = barrageContainer.offsetHeight;
      const barrageItem = document.createElement("div");

      barrageItem.classList.add("barrage-item");
      if (content instanceof Element) {
        barrageItem.appendChild(content);
      } else {
        barrageItem.innerHTML = content;
      }
      barrageContainer.appendChild(barrageItem);
      const items = Array.from(barrageItems).filter((item) => {
        return item !== barrageItem;
      });
      const lastItems = this.getLastItems(items);
      const { top, right } = this.getInsertPos(lastItems, barrageItem);
      Object.assign(barrageItem.style, {
        right: right + "px",
        top: top + "px",
      });
      const duration = (containerWidth - right) * 10;
      const animate = barrageItem.animate(
        [
          {
            right: right + "px",
          },
          {
            right: containerWidth + "px",
          },
        ],
        {
          duration,
          fill: "forwards",
        }
      );
      animate.onfinish = () => {
        if (!barrageItem.classList.contains("barrage-pause")) {
          barrageContainer.contains(barrageItem) &&
            barrageContainer.removeChild(barrageItem);
          //   this.arr.splice(0, 1);
        }
      };
      let running = false;
      let startPauseTime = 0;
      barrageItem.addEventListener("mouseenter", function () {
        Object.assign(barrageItem.style, {
          left: barrageItem.offsetLeft + "px",
          width: window.getComputedStyle(barrageItem).width,
        });
        barrageItem.classList.add("barrage-pause");
        startPauseTime = animate.currentTime;
        running = true;
      });
      barrageItem.addEventListener("mouseleave", function () {
        if (running) {
          running = false;
          const translateX =
            ((containerWidth - right) / duration) *
            (animate.currentTime - startPauseTime);
          Object.assign(barrageItem.style, {
            transform: `translateX(${translateX}px)`,
          });
          // eslint-disable-next-line no-unused-expressions
          barrageItem.clientWidth;
          Object.assign(barrageItem.style, {
            transform: `translateX(0px)`,
            transition: "transform 0.2s",
          });
          Object.assign(barrageItem.style, {
            left: "unset",
          });
          barrageItem.classList.remove("barrage-pause");
        }
        if (animate.playState === "finished") {
          barrageContainer.removeChild(barrageItem);
        }
      });
      barrageItem.addEventListener("transitionend", function () {
        Object.assign(barrageItem.style, {
          transform: `unset`,
          transition: "unset",
        });
      });
      // 执行传递过来的事件
      Object.entries(events).forEach(([event, cb]) => {
        barrageItem.addEventListener(event, cb);
      });
    },
    // 每一行的最后一个元素,按照从上往下放入数组
    getLastItems(items) {
      const hash = items.reduce((result, curr) => {
        const top = curr.offsetTop;
        result[top] = curr;
        return result;
      }, {});
      const keys = Object.keys(hash).sort((a, b) => a - b);
      return keys.map((key) => hash[key]);
    },
    // 获取该插入的位置
    getInsertPos(lastItems, barrageItem) {
      if (!lastItems.length) {
        return {
          top: 0,
          right: -barrageItem.offsetWidth,
        };
      }
      for (let i = 0, len = lastItems.length; i < len; i++) {
        const lastItem = lastItems[i];
        const rightLen = this.getRightLen(lastItem);
        if (rightLen >= 0) {
          return {
            top: lastItem.offsetTop,
            right: -barrageItem.offsetWidth,
          };
        }
      }
      const lowestLastItem = lastItems[lastItems.length - 1];
      const lowestBottomLen = this.getBottomLen(lowestLastItem);
      if (lowestBottomLen + barrageItem.offsetHeight <= containerHeight) {
        return {
          top: lowestBottomLen,
          right: -barrageItem.offsetWidth,
        };
      }
      const nearestLastItem = lastItems.sort((a, b) => {
        return this.getRightLen(b) - this.getRightLen(a);
      })[0];
      return {
        top: nearestLastItem.offsetTop,
        right: this.getRightLen(nearestLastItem) - barrageItem.offsetWidth,
      };
    },
    getRightLen(barrageItem) {
      return (
        this.containerWidth - (barrageItem.offsetLeft + barrageItem.offsetWidth)
      );
    },
    getBottomLen(barrageItem) {
      return barrageItem.offsetTop + barrageItem.offsetHeight;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
#barrage {
  width: 100%;
  height: 120px;
  position: absolute;
  user-select: none;
  overflow: hidden;
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
