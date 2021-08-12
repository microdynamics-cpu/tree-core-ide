// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

import PageHome from "@client/components/home/PageHome.vue";
import PageLib from "@client/components/lib/PageLib.vue";
import PageLibBrief from "@client/components/lib/PageLibBrief.vue";
import PageLibDetail from "@client/components/lib/PageLibDetail.vue";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [{
        path: "/",
        redirect: "/home"
    }, {
        path: "/home",
        name: "Home",
        component: PageHome
    }, {
        path: "/lib",
        name: "Lib",
        component: PageLib,
        children: [{
            path: "",
            redirect: "brief"
        }, {
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
