<template>
    <div class="box">
        防抖，节流
    </div>
</template>

<script>
import {throttle} from '@/utils';
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        // this.asdasd()
        function showTop  () {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        　　console.log('滚动条位置：' + scrollTop);
        }
        window.onscroll = this.asdasd()
    },
    methods: {
        asdasd(){
            return throttle(()=>{
                console.log('节流');
            },3000)
        }
    },
}
</script>

<style lang="less" scoped>
.box {
    height: 2000px;
    background-color: pink;
}
</style>