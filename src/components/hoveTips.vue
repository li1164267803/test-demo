<template>
    <div class="tooltip" ref="tooltip">
        <a-tooltip placement="top" :title="title">
            <div v-if="isShowTips" class="tooltip-title" :style="{'-webkit-line-clamp': line}" :class="{'one-line': !isManyRows,'many-line': isManyRows}">{{ title }}</div>
        </a-tooltip>
        <div v-if="!isShowTips" @mouseenter="mouseenter" :style="{'-webkit-line-clamp': line}" :class="{'one-line': !isManyRows,'many-line': isManyRows}">{{ title }}</div>
    </div>
</template>

<script>
import Types from "src/util/types";
export default {
    name: "Tooltip",
    data() {
        return {
            isShowTips: false
        };
    },
    props: {
        line: Types.string.def("1"),
        title: Types.string.def(""),
        isManyRows: Types.bool.def(false)
    },
    methods: {
        async mouseenter() {
            const {
                title,
                $refs: {
                    tooltip,
                    tooltip: { offsetWidth, offsetHeight }
                }
            } = this;
            const textDiv = document.createElement("div");
            const curStyle = window.getComputedStyle(tooltip);
            textDiv.style.cssText = `
        word-break: break-all;
        width:${offsetWidth}px;
        font-size: ${curStyle.fontSize || "14px"};
        font-weight: ${curStyle.fontWeight || "100"};
        line-height: ${curStyle.lineHeight || "22px"};
      `;
            document.body.appendChild(textDiv);
            textDiv.innerHTML = title;
            textDiv.offsetHeight > offsetHeight && (this.isShowTips = true);
            document.body.removeChild(textDiv);
        }
    }
};
</script>
<style lang="less" scoped>
.tooltip {
    .one-line {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .many-line {
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
    }
}
</style>