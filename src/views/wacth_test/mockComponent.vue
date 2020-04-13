<template>
    <div>
        子组件
    </div>
</template>

<script>
export default {
    data() {
        return {
            status: ""

        }
    },
    watch: {
        status: {
            handler(newVal) {
                console.log("asdasdasd:" + newVal);
            },
            immediate: true // 会立即执行一次handler方法
        }
    },
    beforeCreate() {
        console.log("zi1");
        this.status = "1";
    },
    created() {
        console.log("zi2");
    },
    beforeMount() {
        console.log("zi3");
    },
    mounted() {
        this.status = "2";
        console.log("zi4");
    },
    beforeDestroy() {
        this.status = "3";
        console.log("zi5");
    },
    destroyed() {
        console.log("zi6");
    }
}
</script>