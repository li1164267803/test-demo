<template>
  <div class="placholder"></div>
</template>

<script>
import SVGA from "svgaplayerweb";
export default {
  data() {
    return {};
  },
  methods: {
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
      //   parser.load("@/assets/img/byb.svga", videoItem => { // 错误的引入方式，会报错incorrect header check
      //   parser.load("../../assets/img/svga/byb.svga", videoItem => { // 错误的引入方式
      // 使用@ 或者是../的形式都会报错，图片放在static中也是会报错，我的解决办法是放在了public的img文件夹中
      parser.load("svga/img/byb.svga", videoItem => {
        let arr = [];
        let keys = ["first", "second", "third"];
        player.setVideoItem(videoItem);
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
          let p = this.clipImage("svga/img/2.jpeg")
            .then(data => {
              player.setImage(data, `rank_first_icon`); // 裁剪后的图片
            })
            .catch(err => {});
          arr.push(p);
        }
        player.setImage("svga/img/2.jpeg", `rank_second_icon`); // 未裁剪的图片
        Promise.all(arr).then(() => {
          // 所有的图片裁剪完毕，加载后走的逻辑
          player.startAnimation();
        });
      });
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