import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login'
import Chatting from '../pages/Chatting'

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