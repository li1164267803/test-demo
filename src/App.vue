<template>
  <div id="app">
    <div id="nav">
      <router-link 
        v-for="(item, index) in listData[0].components" 
        :key="index" 
        :to="'/'+item.path" 
        tag="button"
      >
        {{item.name}}
      </router-link>
    </div>
    <div id="content-box">
      <div>--------------------------------------------分割线----------------------------------------------------</div>
      <keep-alive :cache="cache" :includeKey="includeKey" :include="cachedViews()">
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import menu from "./menu.json";

export default {
  data() {
    return {
      listData: menu,
      cache: Object.create(null),
      includeKey: ["/sync"],
    };
  },
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
  methods: {
    cachedViews() {
      return ["index"];
    },
  },
};
</script>
<style lang="less" scoped>
#app {
  padding: 20px;
  height: 100%;
  #nav {
    button {
      margin-right: 5px;
    }
  }
  #content-box {
    position: relative;
  }
}
</style>
