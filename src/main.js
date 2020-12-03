import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

// 使用vue3中的composition-api
// https://github.com/vuejs/composition-api/blob/HEAD/README.zh-CN.md
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import Toast from './components/common/Toast/toast.js';
import ToastQingke from './components/common/ToastQingke/toastQingke.js';

import '@/assets/styles/index.less' // 全局 css


// Vue.use(ElementUI);
import './icons' // icon

Vue.use(Toast);
Vue.use(ToastQingke);
Vue.use(ViewUI);
import KeepAlive from './keep-alive'
Vue.component(KeepAlive.name, KeepAlive)
require('@/el-components')

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
