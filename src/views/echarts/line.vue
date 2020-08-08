<style lang="less" scoped>
.ces {
  background-color: pink;
  width: 200px;
  height: 80px;
  .content {
    background-color: blue;
    text-align: left;
    line-height: 30px;
    height: 30px;
    i {
      border: 4px solid red;
      border-radius: 50%;
      display: inline-block;
    }
    span {
      //   border: 1px solid yellow;
    }
  }
}
</style>
<template>
  <div>
    <div class="ces" style="back">
      <p>2020-05-12 12:30</p>
      <div class="content">
        <i></i>
        <span style="color:red"> 使用率:76%</span>
      </div>
    </div>
    <el-row>
      <el-col :span="12">
        <div id="chartLine" class="line-wrap"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartPie" class="pie-wrap"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chartPie: null,
      // 折线图
      chartLine: null,
    };
  },
  mounted() {
    this.chartLine = echarts.init(document.getElementById("chartLine"));
    this.chartPie = echarts.init(document.getElementById("chartPie"));
    this.$nextTick(() => {
      this.drawLineChart();
      this.drawPieChart();
    });
  },
  methods: {
    drawPieChart() {
      let mytextStyle = {
        color: "#333",
        fontSize: 18,
      };
      let mylabel = {
        show: true,
        position: "right",
        offset: [30, 40],
        formatter: "{b} : {c} ({d}%)",
        textStyle: mytextStyle,
      };
      // this.chartPie = echarts.init(document.getElementById('chartPie'), 'macarons')
      this.chartPie.setOption({
        title: {
          text: "Pie Chart",
          subtext: "纯属虚构",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
          left: "center",
          top: "bottom",
          orient: "horizontal",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600,
            label: {
              emphasis: mylabel,
            },
          },
        ],
      });
    },
    // 折线图
    drawLineChart() {
      let data = [
        ["2000-06-05", 116],
        ["2000-06-06", 129],
        ["2000-06-07", 135],
        ["2000-06-08", 86],
        ["2000-06-09", 73],
        ["2000-06-10", 85],
        ["2000-06-11", 73],
        ["2000-06-12", 68],
        ["2000-06-13", 92],
      ];
      let option = {
        tooltip: {
          trigger: "axis",
          formatter(params) {
            let text = "";
            text = `
                <div style="
                        background-color: pink;
                        width: 200px;
                        margin: -20px;
                        height: 80px;">
                    <p>${params[0].name}</p>
                    <div >
                        <i style="
                            border: 4px solid red;
                            border-radius: 50%;
                            display: inline-block;">
                        </i>
                        <span style="color:red">使用率: ${params[0].value}%</span>
                    </div>
                </div>
            `;
            return text;
          },
          //    formatter: '{a} <br/>{b} : {c}%'
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisTick: {
              show: false,
            },
            // https://echarts.apache.org/examples/zh/editor.html?c=line-aqi
            // https://echarts.apache.org/examples/zh/editor.html?c=line-gradient
            data: data.map(function(item) {
              // 需要显示的时间
              return item[0];
            }),
            // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: 100,
            splitNumber: 5, // 等分5份
            axisLine: {
              // y轴显示
              show: false,
            },
            axisTick: {
              //y轴刻度线
              show: false,
            },
            splitLine: {
              // y轴网格线变为虚线
              show: true,
              lineStyle: {
                type: "dashed",
              },
            },
            name: "CPU利用率",
          },
        ],
        series: [
          {
            name: "2020-05-12",
            type: "line",
            stack: "总量",
            data: [20, 32, 11, 34, 90, 30, 10],
            // https://www.cnblogs.com/colorful-paopao1/p/10439890.html   修改折线的方法
            symbol: "circle", // 折点设定为实心点
            symbolSize: 5, // 设定实心点的大小
            itemStyle: {
              normal: {
                color: "#fc8a0f", //折点颜色
                lineStyle: {
                  color: "#ff9c35", //折线颜色
                },
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表
      this.chartLine.setOption(option);
    },
  },
};
</script>

<style lang="less" scope>
.div {
  .i {
    border: 1px solid red;
    border-radius: 50%;
    display: inline-block;
    width: 1px;
    height: 1px;
  }
}
.pie-wrap {
  width: 100%;
  height: 400px;
  float: left;
}
.line-wrap {
  width: 100%;
  height: 400px;
  float: left;
}
.echarts {
  width: 100%;
  height: 400px;
}
</style>
