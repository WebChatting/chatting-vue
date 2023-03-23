import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/LoginPage'
import Chatting from '../pages/ChattingPage'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/chatting',
        name: 'chatting',
        component: Chatting,
        beforeEnter: (to, from, next) => {
            if (window.sessionStorage.getItem("user") == null) {
                next({
                    path: '/',
                })
            } else {
                next()
            }
        },
    },
]

export default new VueRouter({
    routes
})