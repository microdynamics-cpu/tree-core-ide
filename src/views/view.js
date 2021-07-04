// @ts-nocheck
import Vue from "vue";
import vuetify from "../plugins/vuetify";
import PageLibsMain from "./components/PageLibsMain.vue";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(PageLibsMain)
}).$mount("#app");
