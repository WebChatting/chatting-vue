import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/pages/LoginPage";
import Chatting from "@/pages/ChattingPage";

import { socket } from "@/utils/socket"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/chatting",
        name: "chatting",
        component: Chatting,
        beforeEnter: (to, from, next) => {
            let user = window.sessionStorage.getItem("user")
            if (user == null) {
                next({
                    path: "/",
                });
            } else {
                // 连接ws
                socket.offline()
                socket.online(window.location.hostname, JSON.parse(user).id)
                next();
            }
        },
    },
];

export default new VueRouter({
    routes,
});
