// @ts-nocheck
import Vue from "vue";
import App from "./components/App.vue";

import vuetify from "../plugins/vuetify";
import router from "./router";

import jquery from "jquery";

Vue.prototype.$ = jquery;
Vue.prototype.$jumpToPage = function(link) {
    console.log("link: " + link);
    this.$router.push(link);
};

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount("#app");
