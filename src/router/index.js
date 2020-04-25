import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/About.vue")
    },
    {
        path: "/model",
        name: "model",
        component: () => import("../views/model.vue")
    },
    {
        path: "/hove",
        name: "hove",
        component: () => import("../views/hove.vue")
    },
    {
        path: "/wacth",
        name: "wacth",
        component: () => import("../views/wacth_test")
    },
    {
        path: "/sync",
        name: "sync",
        component: () => import("../views/sync/Father")
    },{
        path: "/time",
        name: "time",
        component: () => import("../views/Time")
    }
];

const router = new VueRouter({
    // mode: "history",
    mode:"hash",
    base: process.env.BASE_URL,
    routes
});

export default router;