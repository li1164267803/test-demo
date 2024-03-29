import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
    mate: {
      keepAlive: true, // 需要缓存
    },
  },
  {
    path: "/model",
    name: "model",
    component: () => import("../views/model/index.vue"),
  },
  {
    path: "/hove",
    name: "hove",
    component: () => import("../views/hove.vue"),
  },
  {
    path: "/wacth",
    name: "wacth",
    component: () => import("../views/wacth_test"),
  },
  {
    path: "/sync",
    name: "sync",
    component: () => import("../views/sync/Father"),
  },
  {
    path: "/time",
    name: "time",
    component: () => import("../views/Time"),
  },
  {
    path: "/table",
    name: "table",
    component: () => import("../views/table/table"),
  },
  {
    path: "/native",
    name: "native",
    component: () => import("../views/native"),
  },
  {
    path: "/dowlondFileZip",
    name: "dowlondFileZip",
    component: () => import("../views/dowlondFileZip"),
  },
  {
    path: "/webwork",
    name: "webwork",
    component: () => import("../views/webwork"),
  },
  {
    path: "/awakenAPP",
    name: "awakenApp",
    component: () => import("../views/awakenAPP"),
  },
  {
    path: "/echarts",
    name: "echarts",
    component: () => import("../views/echarts"),
  },
  {
    path: "/echarts/line",
    name: "echartsLine",
    component: () => import("../views/echarts/line"),
  },
  {
    path: "/springBox",
    name: "springBox",
    component: () => import("../views/springBox"),
  },
  {
    path: "/progress",
    name: "progress",
    component: () => import("../views/progress"),
  },
  {
    path: "/routerQuery/one",
    name: "routerQueryOne",
    component: () => import("../views/routerQuery/one"),
  },
  {
    path: "/routerQuery/two",
    name: "routerQueryTwo",
    component: () => import("../views/routerQuery/two"),
  },
  {
    path: "/SSE",
    name: "SSE",
    component: () => import("../views/SSE"),
  },
  {
    path: "/throttle",
    name: "throttle",
    component: () => import("../views/throttle"),
  },
  {
    path: "/svga",
    name: "svga",
    component: () => import("../views/SVGA"),
  },
  {
    path: "/markdown",
    name: "markdown",
    component: () => import("../views/markdown"),
  },
  {
    path: "/tuieditor",
    name: "tuieditor",
    component: () => import("../views/tuieditor"),
  },
  {
    path: "/hook",
    name: "hook",
    component: () => import("../views/hook"),
  },
  {
    path: "/keyup",
    name: "keyup",
    component: () => import("../views/keyup"),
  },
  {
    path: "/upload",
    name: "upload",
    component: () => import("../views/upload"),
  },
  {
    path: "/drag",
    name: "drag",
    component: () => import("../views/drag_box"),
  },
  {
    path: "/provide",
    name: "provide",
    component: () => import("../views/provide/parent"),
  },
  {
    path: "/barrage",
    name: "barrage",
    component: () => import("../views/barrage"),
  },
  {
    path: "/A-Barrage",
    name: "A-Barrage",
    component: () => import("../views/A-Barrage"),
  },
  {
    path: "/sdk-maidian",
    name: "sdk-maidian",
    component: () => import("../views/sdk/maidian"),
  },
  {
    path: "/npm",
    name: "npm",
    component: () => import("../views/xiwen-npm/xiwen-demo"),
  },
  {
    path: "/navMenu",
    name: "navMenu",
    component: () => import("../views/navMenu"),
  },
  {
    path: "/mixins",
    name: "mixins",
    component: () => import("../views/mixins"),
  },
  {
    path: "/composition-api",
    name: "composition-api",
    component: () => import("../views/composition-api"),
  },
  {
    path: "/jiexi",
    name: "jiexi",
    component: () => import("../views/jiexi"),
  },
  {
    path: "/imageDol",
    name: "imageDol",
    component: () => import("../views/imageDol"),
  },
  {
    path: "/browserLabel",
    name: "browserLabel",
    component: () => import("../views/browserLabel"),
  },
  
];

const props = (route) => {
  const { query, params } = route;
  return {
    query,
    params,
  };
};

routes.forEach((route) => {
  route.props = props;
  (route.children || []).forEach((child) => {
    child.props = props;
  });
});

const router = new VueRouter({
  // mode: "history",
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
