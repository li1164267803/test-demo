<template>
    <div class="progress">
        <div class="title">完成率</div>
        <div class="progress-box">
            <div class="one progress-conent">
                <el-progress type="circle" :percentage="num" :show-text="false" :stroke-width="30" :width="290"></el-progress>
            </div>
            <div class="two progress-conent">
                <el-progress type="circle" :percentage="num"  color="#FFBC46" :stroke-width="30" :width="226">
                    <div class="format-box">
                        <span>{{num}}%</span>
                        <p>完成率</p>
                    </div>
                </el-progress>
            </div>
        </div>
        <div class="line-box">
            <div class="lan">
                <div class="common">
                    <i></i>
                    <p>完成人数：<span>375/500</span></p>
                    <svg-icon icon-class="dianzan" className="dianzan"/>
                </div>
            </div>
            <div class="huang">
                <div class="common">
                    <i></i>
                    <p>全对人数：<span>173/500</span></p>
                    <svg-icon icon-class="dianzan" className="dianzan jinyong"/>
                </div>
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
    }
}
</script>

<style lang="less" scoped>
/deep/ .format-box{ 
    span {
        font-size:52px;
        font-family:DINCondensedC;
        color:rgba(255,255,255,1);
    }
    p {
        font-size:22px;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-top: 5px;
    }
}

.progress {
    font-family:PingFangSC-Semibold,PingFang SC;
    width:673px;
    height:394px;
    background:rgba(36,41,61,1);
    border-radius:12px;
    padding: 23px 41px 0 30px;
    position: relative;
    .title {
        font-size:16px;
        font-weight:600;
        color:rgba(255,255,255,1);
        margin-bottom: 30px;
    }
    .line-box {
        .common {
            display: flex;
            justify-content: center;
            align-items: center;
            p {
                font-size:20px;
                font-weight:400;
                color: #979AA3;
                margin-left: 12px;
                margin-right: 18px;
            }
            span {
                font-size:20px;
                font-weight:500;
                color:rgba(255,255,255,1);
            }
            .dianzan {
                color: #FFFFFF;
                width: 28px;
                height: 28px;
                transition:all 0.5s ease-out;
                cursor: pointer;
                transform: translateY(-4px);
                &:hover {
                    color: #FFBC46;
                }
                &:active {
                    transform:scale(1.3);
                }
            }
            .jinyong {
                color: #FFBC46;
            }
        }
        .lan {
            position: absolute;
            width: 307px;
            height: 34px;
            background: url("~@/assets/lan.png") no-repeat;
            background-size: 100% 100%;
            top: 134px;
            right: 41px;
            div {
                position: absolute;
                top: -36px;
                right: 4px;
                i {
                    width:14px;
                    height:14px;
                    display: inline-block;
                    border-radius: 50%;
                    border:2px solid rgba(68,139,255,1);
                    transform: translateY(2px);
                }
            }
        }
        .huang {
            position: absolute;
            width: 332px;
            height: 49px;
            background: url("~@/assets/huang.png") no-repeat;
            background-size: 100% 100%;
            top: 249px;
            right: 40px;
            div {
                position: absolute;
                top: 7px;
                right: 4px;
                i {
                    width:14px;
                    height:14px;
                    display: inline-block;
                    border-radius: 50%;
                    border:2px solid rgba(255,188,70,1);
                    transform: translateY(2px);
                }
            }
        }
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
    margin-left: 25px;
    .el-progress {
            display: flex;
            justify-content: center;
            align-items: center;
    }
    .progress-conent {
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
            
        }
    }
    .one {
        /deep/ path:first-child { // 修改内层元素的背景色
            stroke: #BCBEC4;
        }
    }
    .two {
        /deep/ path:first-child { // 修改内层元素的背景色
            stroke: #24293D;
        }
    }
}
</style>