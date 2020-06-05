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
  },
  {
    path: "/model",
    name: "model",
    component: () => import("../views/model.vue"),
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
];

const router = new VueRouter({
  // mode: "history",
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
