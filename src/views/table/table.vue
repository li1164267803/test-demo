<template>
  <div>
    <!-- <el-table @forward-ref="ref=>tableRef=ref" :data="tableData" style="width: 100%"> -->
    <el-table ref="reference" height="250" :data="tableData" style="width: 100%" :header-cell-style="{background:'#303548'}" row-class-name="warning-row">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        :render-header="(h)=>renderHeader(h,'完课率','（出勤/未出勤且看回放/应出勤）')"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }        ,
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
        ,
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    // table表格头标题换行
    renderHeader(h, a, b) {
      //   return [h("p", { color: "red" }, [a]), h("p", {}, [b])];
      return (
        <div>
          <span class="left">{a}</span>
          <span class="right">{b}</span>
        </div>
      );
    }
  },
  mounted() {
    console.log(this.$refs.reference, 4444);
    console.log(this.$refs.reference.$children[0], 5555);
    // console.log(this.tableRef, 6666);
  }
};
</script>
<style lang="less" scoped>
.el-table /deep/ .warning-row {
    background: #24293D;
  }
/deep/ .has-gutter {
  height: 30px;
  color: red;
  th {
    padding: 15px 0;
  }
}
/deep/ th {
  font-family: PingFangSC-Semibold, PingFang SC;
  .left {
    font-size: 14px;
    font-weight: 600;
    color: rgba(144, 147, 154, 1);
    line-height: 14px;
  }
  .right {
    font-size: 12px;
    font-weight: 600;
    color: rgba(144, 147, 154, 1);
    color: red;
    line-height: 12px;
  }
}
</style>