import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Toast from './components/common/Toast/toast.js';
import ToastQingke from './components/common/ToastQingke/toastQingke.js';

Vue.use(ElementUI);
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
