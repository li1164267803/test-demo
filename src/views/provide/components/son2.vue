<template>
    <div class="son2">
        <Button @click="asdad2">子组件1>子组件2</Button>
        <h2>孙子的num：{{sonNum}}</h2>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sonNum:1
        }
    },
    inject:['foo','setSunziShili'],
     methods:{
        asdad2(){
            console.log('子组件1>子组件2->调用父组件方法');
            // this.$emit('parentFun','子传递的数据')
            this.foo('通过provide->inject传递参数')
        },
        son2Fun(){
            console.log('父组件拿到了孙子的方法');
        }
    },
    mounted() {
        this.setSunziShili(this)
    },
}
</script>
<style lang="less" scoped>
.son2 {
    background-color: paleturquoise;
    height: 300px;
}
</style>