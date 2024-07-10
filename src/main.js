import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
