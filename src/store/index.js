import Vue from 'vue'
import  Vuex from 'vuex'

Vue.use(Vuex)

const actions = {

}

const mutations = {

}

const state = {
    privateMessages: [
        {
            id: 1,
            style: {
                left: true
            },
            fromNickname: 'rekord',
            userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
            messageTypeId: 1,
            content: 'hei',
        },
        {
            id: 2,
            style: {
                right: true
            },
            fromNickname: 'rekord',
            userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
            messageTypeId: 1,
            content: '你好',
        },
        {
            id: 3,
            style: {
                left: true
            },
            fromNickname: 'rekord',
            userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
            messageTypeId: 1,
            content: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
        }
    ]
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})