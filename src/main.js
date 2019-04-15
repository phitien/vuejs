import Vue from "vue";
import { store, data } from "./store";

require("./bootstrap");

Vue.config.productionTip = false;

var app = new Vue({
  store,
  render: (h, c) => (
    <PageHome>
      <CmpOhlc />
    </PageHome>
  )
}).$mount("#app");
