import Vue from "vue";
import App from "@/App.vue";

import router from "@/router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import store from "@/store";
import "@/styles/common.css";

import apiPlugin from "@/plugins/apiPlugin";
Vue.use(apiPlugin);

import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale:
        localStorage.getItem("locale") ||
        navigator.language ||
        navigator.userLanguage, // 设置默认语言为浏览器首选语言
    fallbackLocale: "zh-CN",
    messages: {
        "zh-CN": require("@/locales/zh-CN").default,
        "en-US": require("@/locales/en-US").default,
    },
});

Vue.config.productionTip = false;

new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
}).$mount("#app");
