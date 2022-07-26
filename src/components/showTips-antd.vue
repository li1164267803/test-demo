<template>
    <div class="show-tips" ref="showTips">
        <Tooltip placement="top" :title="title" v-if="isShowTips" :defaultVisible="true">
            <div @mouseleave="mouseleave">{{title}}</div>
        </Tooltip>
        <div @mouseenter="mouseenter" @mouseleave="mouseleave" v-else>{{title}}</div>
    </div>
</template>

<script>
import { Tooltip } from 'ant-design-vue';

export default {
    components: { Tooltip },
    props: ['title'],
    data() {
        return {
            isShowTips: false
        }
    },
    methods: {
        async mouseenter() {
            const { title, $refs: { showTips, showTips: { offsetWidth, offsetHeight } } } = this;
            const textDiv = document.createElement('div')
            const curStyle = window.getComputedStyle(showTips)
            console.log(222222,curStyle,showTips);
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