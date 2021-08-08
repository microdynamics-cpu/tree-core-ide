// @ts-nocheck
import Vue from "vue";
import Vuex from "vuex";

import jquery from "jquery";
import router from "./router/index.js";
import vuetify from "./plugins/vuetify";

import App from "./components/App.vue";

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
Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        add(state) {
            state.count++;
        }
    }
});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
