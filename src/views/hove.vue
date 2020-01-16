<style lang="less" scoped>
.hove {
    .box-antd {
        border: 1px solid red;
        width: 400px;
        margin-bottom: 30px;
    }
    .box-iview {
        border: 1px solid pink;
        width: 400px;
    }
    .item-title {
        height: 44px;
        opacity: 0.85;
        font-size: 14px;
        color: black;
        font-weight: 600;
        line-height: 22px;

        // 控制文字隐藏
        word-break: break-word;
        overflow: hidden; // 必选
        display: -webkit-box; // 必选
        -webkit-line-clamp: 2; // 必选
        text-overflow: ellipsis; // 必选
        -webkit-box-orient: vertical; // 必选
    }
}
</style>

<template>
    <div class="hove">
        <div class="box-antd">
            <!-- antd -->
            <a-button type="danger">antd的按需引入</a-button>
            <showTipsAntd :title="title1" class="item-title"></showTipsAntd>
            <showTipsAntd :title="title" class="item-title"></showTipsAntd>
        </div>

        <!-- iview -->
        <div class="box-iview">
            <Button>iview的</Button>
            <showTipsIview :title="title1" class="item-title"></showTipsIview>
            <showTipsIview :title="title" class="item-title"></showTipsIview>
        </div>
    </div>
</template>

<script>
import showTipsAntd from '@/components/showTips-antd'
import showTipsIview from '@/components/showTips-iview'
import { Button } from 'ant-design-vue';

export default {
    components: { showTipsAntd, showTipsIview, AButton: Button },
    data() {
        return {
            title1: '实打实的方式地方是对冯绍峰',
            title: '一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个一个汉子一个汉子一个汉子一个汉子一个一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子一个汉子'
        }
    },

}
</script>