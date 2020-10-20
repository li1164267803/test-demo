<template>
  <div class="box">
    <h3>弹幕容器</h3>
    <barrage class="barrage" :arr="arr">
      <div class="barrage-item" slot-scope="{ item }">
        <div class="barrage-item-inner">
          <img
            class="barrage-img"
            src="https://resource.puxinwangxiao.com/7c32e42aa764179b14fec8d5ad477ca4.png"
            alt
          />
          <span>{{ item.content }}</span>
        </div>
      </div>
    </barrage>
  </div>
</template>
<script>
import barrage from "./barrage";
export default {
  components: { barrage },
  data() {
    return {
      arr: [
        {
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
      ],
    };
  },
  mounted() {
    let num = 2;
    setInterval(() => {
      this.arr.push({
        content: `弹幕的内容${num}`,
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
      });
      num++;
    }, 1000);
  },
};
</script>
<style lang="less" scoped>
.box {
  border: 1px solid #000;
  height: 500px;
  position: relative;
  background-color: rgb(192, 255, 220);
  .barrage {
    position: absolute;
    top: 30px;
  }
}
</style>
