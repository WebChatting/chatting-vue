import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../page/Login'
import Chatting from '../page/Chatting'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/chatting',
        component: Chatting,
    },
]

export default new VueRouter({
    routes
})