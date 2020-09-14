<template>
    <div class="provide">
        父级组件
        <h3>父组件中调用子组件下面的子组件的方法</h3>
        <h2>{{num}}</h2>
        <Button @click="sunziBtn">调用孙子的方法</Button>
        <Button @click="setBusNum">bus调取孙子</Button>
        <son1 @parentFun="parentFun"></son1>
    </div>
</template>
<script>
import son1 from './components/son1';
import bus from '@/common/bus';
export default {
    data() {
        return {
            num:1,
            son2This: null
        }
    },
    // https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5
    provide(){ // 依赖注入 子组件在任何地方，都可以调用父组件的方法和data
        return {
            foo: this.parentFun,
            setSunziShili: this.setSunziShili
        }
    },
    components:{son1},
    methods:{
        parentFun(mes){
            console.log('父组件的方法->',mes);
            this.num++
        },
        setSunziShili(data){ // 获取孙子实例
            this.son2This = data
        },
        sunziBtn(){ // 调用孙子的方法
            console.log(this.son2This, '孙子的实例');
            this.son2This.son2Fun()
            this.son2This.sonNum++
        },
        setBusNum(){
            console.log('通过bus事件总线调用孙子的方法');
            bus.$emit('busFun')
            
        }
    },
    mounted() {
        
    },
}
</script>
<style lang="less" scoped>
.provide {
    height: 500px;
    background: pink;
}

</style>