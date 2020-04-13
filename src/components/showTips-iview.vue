<style lang="less" scoped>
/deep/ .ivu-tooltip {
    .ivu-tooltip-rel {
        div {
            // word-break: break-word;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
        }
    }
}
</style>
<template>
    <div class="show-tips" ref="showTips">
        <Tooltip max-width="300" placement="top" :content="title" v-if="isShowTips" :always="true">
            <div @mouseleave="mouseleave">{{title}}</div>
        </Tooltip>
        <div @mouseenter="mouseenter" @mouseleave="mouseleave" v-else>{{title}}</div>
    </div>
</template>

<script>

export default {
    props: ['title'],
    data() {
        return {
            isShowTips: false
        }
    },
    methods: {
        mouseenter() {
            const { title, $refs: { showTips, showTips: { offsetWidth, offsetHeight } } } = this;
            const textDiv = document.createElement('div')
            const curStyle = window.getComputedStyle(showTips)
            textDiv.style.cssText = `
                word-break: break-word;
                width:${offsetWidth}px;
                font-size: ${curStyle.fontSize || '14px'};
                font-weight: ${curStyle.fontWeight || '100'};
                line-height: ${curStyle.lineHeight || '22px'};
            `
            document.body.appendChild(textDiv)
            textDiv.innerHTML = title
            textDiv.offsetHeight > offsetHeight && (this.isShowTips = true);
            document.body.removeChild(textDiv)
        },
        mouseleave() {
            this.isShowTips = false
        }
    }
}
</script>