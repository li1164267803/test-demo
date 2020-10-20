# 功能 背景

> 背景，用于教育直播场景，主讲人可以在白板上操作解决题目，可以看到滚动的弹幕，鼠标划上停止，离开时，回复到正常动画的位置，并且不能影响主讲人在白板上的操作，误点击弹幕。 弹幕一行中不能覆盖之前的弹幕，自动补全到弹幕最少的一行，如当前行已经到达最宽距离，另起一行展示
> 实现鼠标划上，停止弹幕。

## 使用说明

### 定义一个模板文件

```html
<div id="barrage">
  <!-- 自定义模板样式  模板样式一定要先display:none-->
  <div class="moban-barrage">
    <div class="barrage-item-inner">
      <img
        class="barrage-img"
        src="https://resource.puxinwangxiao.com/7c32e42aa764179b14fec8d5ad477ca4.png"
      />
      <span>{{item.content}}</span>
    </div>
  </div>
</div>
```

### 在 script 中定义一个属于模板数据的{}

```
// index.vue
<script>
import barrage from "./barrage.js"; // 引入js代码
export default {
  data() {
    return {
      item: {
        content: "弹幕的内容1",
        from: {
          avatar:"https://resource.puxinwangxiao.com/7c32e42aa764179b14fec8d5ad477ca4.png",
        },
      },
    };
  },
}
</script>
```

### 在 mouted 中挂载

```js
// mouted
// 传递一个父容器
this.barrage = new barrage({
  barrageContainer: document.querySelector("#barrage"),
});

// 模拟收到一条弹幕消息
let num = 1;
this.timerId = setInterval(() => {
  this.item.content = `弹幕的内容${num}`;
  num++;
  this.addBarrageItemNode(this.item);
}, 1000);

// methods
addBarrageItemNode() {
  // 克隆一个模板dom
  let cloneNode = document.querySelector(".moban-barrage").cloneNode(true);
  this.barrage.addBarrageItem(cloneNode, {
    click: function () {
      console.log("一个点击事件");
    },
    mouseover: () => {
      console.log("外部传入的划入事件");
    },
  });
},
```

### barrage.js

在 barrage.js 中
为实现不影响主讲正常操作白板，加了如下代码

```js
document.documentElement.addEventListener("mousemove", function(event) {
  const { x, y } = event;
  let currentBarrageItem = Array.from(barrageItems).find((barrageItem) => {
    const { top, left, width, height } = barrageItem.getBoundingClientRect();
    return x >= left && x <= left + width && y >= top && y <= top + height;
  });
  if (currentItem !== currentBarrageItem) {
    currentItem = currentBarrageItem;
    clearTimeout(mouseEnterTimeT);
    Object.assign(barrageContainer.style, {
      "pointer-events": "none",
    });
    if (currentBarrageItem && !isMousedown) {
      // 滑上会有300毫秒的延迟
      mouseEnterTimeT = setTimeout(() => {
        Object.assign(barrageContainer.style, {
          "pointer-events": "unset",
        });
      }, 300);
    }
  }
});
```
