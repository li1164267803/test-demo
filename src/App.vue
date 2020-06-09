<template>
  <div id="app">
    <div id="nav">
      <router-link to="/model" tag="button">v-model绑定</router-link>
      <router-link to="/hove" tag="button">这个溢出隐藏...，鼠标滑入显示</router-link>
      <router-link to="/wacth" tag="button">测试父子组件生命周期执行顺序</router-link>
      <router-link to="/sync" tag="button">测试父子组件sync</router-link>
      <router-link to="/time" tag="button">时间小于10加0</router-link>
      <router-link to="/table" tag="button">重写的table</router-link>
      <router-link to="/native" tag="button">父组件中在子组件上使用@click和@click.native的区别</router-link>
      <router-link to="/dowlondFileZip" tag="button">dowlondZip文件</router-link>
      <router-link to="/webwork" tag="button">webwork</router-link>
      <router-link to="/awakenAPP" tag="button">唤醒电脑上APP</router-link>
      <router-link to="/echarts" tag="button">echarts</router-link>
      <router-link to="/springBox" tag="button">使用extend自定义弹框</router-link>
    </div>
    <keep-alive :cache="cache" :includeKey="includeKey" :include="cachedViews()">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cache: Object.create(null),
      includeKey: ["/sync"]
    };
  },
  computed: {
    key() {
      return this.$route.fullPath;
    }
  },
  methods: {
    cachedViews() {
      return ["index"];
    }
  }
};
</script>
<style lang="less" scoped>
#app {
  padding: 20px;
}
</style>
