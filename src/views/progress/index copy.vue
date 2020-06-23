<template>
    <div class="progress">
        <!-- <div width="500" height="500">
            <svg-icon icon-class="dianzan" className="asdasda"/>
        </div> -->
        <div class="title">完成率</div>
        <div class="progress-box">
            <div class="one">
                <el-progress type="circle" :percentage="num" :show-text="false" :stroke-width="30" :width="262"></el-progress>
                <div class="line-box">
                    <div class="lan">

                    </div>
                    <div class="huang"></div>
                </div>
            </div>
            <div class="two">
                <el-progress type="circle" :percentage="num" :format="format" color="#FFBC46" :stroke-width="30" :width="205"></el-progress>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 0
        }
    },
    mounted() {
       let time= setInterval(() => {
            this.num++;
            if(this.num>=100) clearInterval(time)
        }, 600);
    },
    methods: {
      format(percentage) {
          return (
              `<div class="format-box">
                    <span>${percentage}%</span>
                    <p>完成看</p>
                </div>`
          )
      }
    }
}
</script>

<style lang="less" scoped>
 .asdasda {
     color: red;
     transition:all 0.5s ease-out;
    //  &:hover {
    //      color: yellow;
    //      transform:scale(2);
    //  }
     &:active {
         color: black;
         transform:scale(1.5);
     }
 }
 .progress {
    font-family:PingFangSC-Semibold,PingFang SC;
    width:673px;
    height:394px;
    background:rgba(36,41,61,1);
    border-radius:12px;
    padding: 23px 41px 0 30px;
    .title {
        font-size:16px;
        font-weight:600;
        color:rgba(255,255,255,1);
        margin-bottom: 30px;
    }
 }
.progress-box {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #24293D;
    width: 280px;
    height: 280px;
    .el-progress {
            display: flex;
            justify-content: center;
            align-items: center;
            /deep/ path:first-child { // 修改外层元素的背景色
            stroke: #BCBEC4;
        }
    }
    .one {
        .line-box {
            position: absolute;
            border: 1px solid yellow;
            .lan {
                position: absolute;
                width: 307.18px;
                height: 34.15px;
                background: url("~@/assets/lan.png") no-repeat;
                background-size: 100% 100%;
                top: 134px;
                left: 50px;
            }
            .huang {
            position: absolute;



            }
        }
    }
    .two, .one {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-content: center;
        /deep/ .el-progress {
            display: flex;
            justify-content: center;
            align-items: center;
            /deep/ path:first-child { // 修改内层元素的背景色
                stroke: #24293D;
            }
        }
    }
}
</style>