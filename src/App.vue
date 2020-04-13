<template>
    <div id="app">
        <div id="nav">
            <router-link to="/model" tag="button">v-model绑定</router-link>
            <router-link to="/hove" tag="button">这个溢出隐藏...，鼠标滑入显示</router-link>
            <router-link to="/wacth" tag="button">测试父子组件生命周期执行顺序</router-link>
        </div>
        <router-view />
    </div>
</template>

<style lang="less" scoped>
#app {
    padding: 20px;
}
</style>
