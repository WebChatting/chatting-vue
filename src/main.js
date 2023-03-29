import Vue from "vue";
import App from "./App.vue";

import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import store from "./store";
import "@/styles/common.css";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
}).$mount("#app");
