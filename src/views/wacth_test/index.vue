<template>
    <div>
        <mockComponent v-if="showComponent"></mockComponent>
    </div>
</template>

<script>
//以下代码的输出是什么？ 
import mockComponent from './mockComponent'
export default {
    components: { mockComponent },
    data() {
        return {
            showComponent: false
        };
    },
    beforeCreate() {
        console.log("fu1");
    },
    created() {
        console.log("fu2");
        console.log(this.showComponent);
    },
    beforeMount() {
        console.log("fu3");
    },
    mounted() {
        console.log("fu4");
        this.showComponent = true;
        window.setTimeout(() => {
            this.showComponent = false;
        }, 1000);
    },
    beforeDestroy() {
        console.log("fu5");
    },
    destroyed() {
        console.log("fu6");
    }
}
</script>