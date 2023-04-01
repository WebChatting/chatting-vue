// apiPlugin.js
import { post } from "@/service/request";
import { USER_LOGIN_URL, USER_REGISTER_URL } from "@/config/api";

export default {
    install(Vue) {
        Vue.prototype.$api = {
            loginUser(username, password) {
                return post(USER_LOGIN_URL, {
                    username,
                    password,
                })
            },
            registerUser(username, password) {
                return post(USER_REGISTER_URL, {
                    username,
                    password,
                });
            },
        };
    },
};
