// @ts-nocheck
import Vue from "vue";
import vuetify from "../plugins/vuetify";
import PageHomeMain from "./components/PageHomeMain.vue";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(PageHomeMain)
}).$mount("#app");
