<template>
    <div class="waicheng">
        <div class="drag" drag-box drag-handler=".hengtiao">
            <div class="hengtiao">
                可移动
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.waicheng {
    height: 100%;
}
.drag {
    width: 300px;
    height: 300px;
    background-color: pink;
    position: fixed;
}
.hengtiao {
    width: 100%;
    background: yellow;
    height: 30px;
    cursor: move;
}
</style>