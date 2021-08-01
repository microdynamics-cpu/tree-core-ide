// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

import PageHome from "./components/home/PageHome.vue";
import PageLib from "./components/lib/PageLib.vue";
import PageLibBrief from "./components/lib/PageLibBrief.vue";
import PageLibDetail from "./components/lib/PageLibDetail.vue";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [{
        path: "/home",
        name: "Home",
        component: PageHome
    }, {
        path: "/lib",
        name: "Lib",
        component: PageLib,
        children: [{
            path: "brief",
            name: "Lib Brief",
            component: PageLibBrief
        }, {
            path: "detail",
            name: "Lib Detail",
            component: PageLibDetail
        }]
    }]
});
