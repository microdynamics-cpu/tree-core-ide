// @ts-nocheck
import Vue from "vue";
import Vuex from "vuex";

import actions from "./store/actions";
import mutations from "./store/mutations";
import state from "./store/state";

import jquery from "jquery";
import router from "./router/index";
import vuetify from "./plugins/vuetify";

import App from "./components/App";

Vue.use(Vuex);
const store = new Vuex.Store({
    state,
    mutations,
    actions
});

Vue.prototype.$ = jquery;
Vue.prototype.$jumpToPageByIndex = function(index) {
    console.log("router index: " + index);
    this.$router.go(index);
}
Vue.prototype.$jumpToPageByLink = function(type, link) {
    console.log("router link: " + link);
    if (type === "history") {
        this.$router.push(link);
    }
    else if (type === "replace") {
        this.$router.replace(link);
    }
};
Vue.prototype.$jumpToPageByLinkQuery = function(type, link, query) {
    console.log("router link: " + link);
    if (type === "history") {
        this.$router.push({
            path: link,
            query: query
        });
    }
    else if (type === "replace") {
        this.$router.replace({
            path: link,
            query: query
        });
    }
};
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
