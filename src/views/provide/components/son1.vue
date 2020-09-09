<template>
    <div class="son1">
        <Button @click="asdad">子组件1</Button>
        <son2></son2>
    </div>
</template>
<script>
import son2 from './son2';

export default {
    components:{son2},
    methods:{
        asdad(){
            console.log('子组件1调用父组件方法');
            this.$emit('parentFun','子传递的数据')
        }
    }
}
</script>
<style lang="less" scoped>
.son1 {
    background-color: burlywood;
    height: 400px;
}
</style>