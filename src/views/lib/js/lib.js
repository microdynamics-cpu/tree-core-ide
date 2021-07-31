// @ts-nocheck
import Vue from "vue";
import vuetify from "../../../plugins/vuetify";
import PageLibMain from "../components/PageLibDetailMain.vue";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(PageLibMain)
}).$mount("#app");
