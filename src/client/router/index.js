// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

import PageHome from "@client/components/home/PageHome";
import PageLib from "@client/components/lib/PageLib";
import PageLibBrief from "@client/components/lib/PageLibBrief";
import PageLibDetail from "@client/components/lib/PageLibDetail";
import PageLibManage from "@client/components/lib/PageLibManage";

Vue.use(VueRouter);

// 关闭连续点击路由的错误提示
// Turn off the error prompt of continuous click routing
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}

export default new VueRouter({
    mode: "history",
    routes: [{
        path: "/",
        redirect: "/home"
    }, {
        path: "/home",
        name: "home",
        component: PageHome
    }, {
        path: "/lib",
        component: PageLib,
        children: [{
            path: "",
            redirect: "brief"
        }, {
            path: "brief",
            name: "libBrief",
            component: PageLibBrief
        }, {
            path: "detail",
            name: "libDetail",
            component: PageLibDetail
        }, {
            path: "manage",
            name: "libManage",
            component: PageLibManage
        }]
    }]
});
