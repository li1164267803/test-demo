<template>
  <div>
    <Button style="margin-bottom:5px" type="primary" @click="handelBtn">{{show?'隐藏':'显示'}} SVGA动画</Button>
    <transition name="fade">
      <div class="praise-modal" v-show="show">
        <div class="praise-modal-mask"></div>
        <div id="praise">
          <div v-show="showClose" class="close-tip" @click="close">
            <span class="tip-num">{{ times }}s</span>
            <span>后将自动关闭</span>
            <img class="close-btn" src="/img/guanbi.png" />
          </div>
          <div class="placholder"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SVGA from "svgaplayerweb";

export default {
  data() {
    return {
      show: true,
      showClose: false,
      times: 10,
      timer :null
    };
  },
  methods: {
    handelBtn() {
      this.show = !this.show;
      //   this.times = 10;
      //   this.showClose = true;
    },
    // 裁剪圆形图片
    clipImage(src) {
      console.log("clipImage -> src", src);
      let size = 124; // 截取宽度可根据svga对应字段得宽度设置
      let canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      let ctx = canvas.getContext("2d");
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false); // 截取圆形图
      ctx.clip();
      return this.loadImage(src).then(img => {
        ctx.drawImage(img, 0, 0, size, size);
        return canvas.toDataURL();
      });
    },
    // promise加载图片
    loadImage(src) {
      return new Promise((resolve, reject) => {
        let img = new Image(); // 等价于 document.createElement("img");
        img.setAttribute("crossOrigin", "anonymous"); // 设置可以请求跨域图片
        img.onload = () => resolve(img); // 事件在图片加载完成后立即执行。
        img.onerror = () => reject(new Error("图片加载失败"));
        img.src = src;
      });
    },
    render() {
      var player = new SVGA.Player(".placholder");
      var parser = new SVGA.Parser(".placholder"); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
      parser.load("img/byb.svga", videoItem => {
          let arr = [];
          let keys = ["first", "second", "third"];
        player.setVideoItem(videoItem)
        for (let index = 0; index < 3; index++) {
          let nameObj = {
            text: "啊实打实的",
            color: "red",
            family: "microsoft yahei", // 不传 family 属性 size属性也会失效
            size: "22px"
          };
          let timeObj = {
            text: `用时20`,
            color: "#fff",
            family: "microsoft yahei",
            size: "20px"
          };
          let rightObj = {
            text: `对 5 题`,
            color: "#fff",
            family: "microsoft yahei",
            size: "20px"
          };
          player.setText(nameObj, `rank_${keys[index]}_name`);
          player.setText(timeObj, `rank_${keys[index]}_time`);
          player.setText(rightObj, `rank_${keys[index]}_right`);

          let p = this.clipImage("img/2.jpeg")
            .then(data => {
              player.setImage(data, `rank_first_icon`);
            })
            .catch(err => {});
          arr.push(p);
        }

        player.setImage("img/2.jpeg", `rank_second_icon`);

        Promise.all(arr).then(() => {
          player.startAnimation();
          // 倒计时
          this.showClose = true;
          this.timer = setInterval(() => {
            this.times--;
            console.log(111);
            if (this.times < 0) {
              this.close();
            }
          }, 1000);
        });
        // 触发关闭按钮后释放内存占用
        this.$on("close", () => {
          console.log("监听");
          player.clear();
          clearInterval(this.timer);
        });
      });
    },
    close() {
      this.$emit("close");
      this.show = false;
      this.showClose = false;
      this.times = 10;
    }
  },
  mounted() {
    this.render();
  }
};
</script>

<style lang="less" scoped>
.placholder {
  width: 800px;
  height: 800px;
  border: 1px solid #000;
  background: red;
}
</style>