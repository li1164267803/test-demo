<template>
  <div>
    <div>
      <input v-model="workerObj.inputVal" name="num" type="text" />
      <button @click="workerCalculate">计算</button>
      <br />
      <div class="red">计算结果{{ workerObj.result }}</div>
      <div class="red">workers 耗时：{{ workerObj.time }}ms</div>
    </div>
    <div>
      <input v-model="obj.inputVal" name="num" type="text" />
      <button @click="singleCalculate">计算</button>
      <br />
      <div class="red">计算结果{{ obj.result }}</div>
      <div class="red">普通计算 耗时：{{ obj.time }}ms</div>
    </div>

    <div>
      <button @click="clearWorker">销毁Worker</button>
    </div>
  </div>
</template>

<script>
import Worker from "worker-loader!./worker333.js";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      worker: null,
      workerObj: {
        inputVal: "",
        result: "",
        time: "",
        data1: 0,
        data2: 0,
      },
      obj: {
        inputVal: "",
        result: "",
        time: "",
      },
    };
  },
  mounted() {
    this.worker = new Worker();
    console.log(saveAs, "saveAs");
  },
  methods: {
    webwork() {
      //   this.worker = new Worker();
      //   this.worker.addEventListener("message", (event)=>{});
      this.worker.onmessage = (event) => {
        let data = event.data;
        this.workerObj.data2 = new Date().getTime();
        this.workerObj.result = data;
        this.workerObj.time = this.workerObj.data2 - this.workerObj.data1;
      };
    },
    workerCalculate() {
      console.log("开始计算");
      this.webwork();
      this.workerObj.data1 = new Date().getTime();
      let val = parseInt(this.workerObj.inputVal, 10);
      this.worker.postMessage(val);
    },
    singleCalculate() {
      let data1 = new Date().getTime();
      let num = this.obj.inputVal;
      let val = parseInt(num, 10);
      let result = 0;
      for (let i = 0; i < num; i++) result += i;
      let data2 = new Date().getTime();
      this.obj.result = result;
      this.obj.time = data2 - data1;
    },
    clearWorker() {
      // console.log(this.worker,'worker');
      this.worker.terminate();
      console.log(this.worker, "worker");
    },
  },
};
</script>

<style lang="less" scoped>
.red {
  color: red;
}
</style>
