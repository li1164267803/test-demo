### 前言

项目需求是 ui 动画设计师给出 svga 动画，开发人员去做相应的适配，动态的去替换文字和图片的显示效果
由于 ui 图形是圆形，后台返回的 img 为方形，也涉及到了使用 canvas 剪切图片，在引入图片的时候发生了 incorrect header check 错误问题

### 效果图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628114947660.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDMwOTM3NA==,size_16,color_FFFFFF,t_70)

### 什么是 SVGA

```
SVGA 是一种跨平台的开源动画格式，同时兼容 iOS / Android / Web。SVGA 除了使用简单，性能卓越，同时让动画开发分工明确，各自专注各自的领域，大大减少动画交互的沟通成本，提升开发效率。动画设计师专注动画设计，通过工具输出 svga 动画文件，提供给开发工程师在集成 svga player 之后直接使用。动画开发从未如此简单！
SVGA 除了使用简单，性能卓越，同时让动画开发分工明确，各自专注各自的领域，大大减少动画交互的沟通成本，提升开发效率。
动画设计师专注动画设计，通过工具输出 svga 动画文件，提供给开发工程师在集成 SVGAPlayer 之后直接使用。
```

### 安装依赖

```js
npm install svgaplayerweb --save
```

### 项目使用

**svga.vue**

```js
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
      parser.load("img/byb.svga", videoItem => {
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
          let p = this.clipImage("img/2.jpeg")
            .then(data => {
              player.setImage(data, `rank_first_icon`); // 裁剪后的图片
            })
            .catch(err => {});
          arr.push(p);
        }
        player.setImage("img/2.jpeg", `rank_second_icon`); // 未裁剪的图片
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
```

### 关于引入图片路径错误问题 incorrect header check

在 parser.load("../assets/img/byb.svga")引入本地图片的时候，会出现报错 **incorrect header check**在 assets 和在 static 引入会出现一样的问题

#### 有两种解决办法

1. 还是使用本地图片，不过是把本地的 svga 放在了 public 文件夹下面
   引入方法为 **parser.load("img/byb.svga")**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200628112612549.png)

2. 使用远程链接访问
   把 svga 上传到远程的服务，根据服务的地址去访问
   本地访问的时候可能会出现跨域的问题，这个是因为本地项目地址和服务器的域名地址不一致导致的![跨域](https://img-blog.csdnimg.cn/20200628113043954.png)
   我们可以使用**vue.config.js**的代理去处理（因为我是把文件直接放在 svga 文件夹下的，所以可以通过 /svga 去匹配到这个地址）

```js
 devServer: {
        proxy: {
          '/svga': {  // 处理svga用服务地址图片的跨域问题
            target: 'https://live-test.puxinwangxiao.com/',
            changeOrigin: true, // 是否跨域
        }
    }
 },
```

#### 在页面中使用的时候就要添加 **/svga 为前缀**

```
parser.load("/svga/01.svga", function(videoItem) {
    player.setVideoItem(videoItem);
    player.startAnimation();
});
```

不用担心发布后能不能访问，发布打包后项目会处于同一域名，不会出现跨越问题。

### 最后附带一个 demo 的示例地址，喜欢的可以去 gitHub 上下载点赞哦

[https://github.com/li1164267803/xiwen-svga-demo](https://github.com/li1164267803/xiwen-svga-demo)
