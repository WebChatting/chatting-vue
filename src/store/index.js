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
            id: 0,
            style: {
                left: true
            },
            fromNickname: 'rekordrekordrekordrekordrekordrekord',
            userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
            messageTypeId: 1,
            content: 'hei',
        },
        {
            id: 1,
            style: {
                right: true
            },
            fromNickname: 'hello',
            userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
            messageTypeId: 1,
            content: '你好',
        },
        {
            id: 2,
            style: {
                left: true
            },
            fromNickname: 'botbotbo',
            userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
            messageTypeId: 2,
            content: 'https://cdn.sxrekord.com/blog/logo.jpg',
        },
        {
            id: 3,
            style: {
                right: true
            },
            fromNickname: 'botbotbo',
            userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
            messageTypeId: 2,
            content: 'https://cdn.sxrekord.com/blog/logo.jpg',
        },
        {
            id: 4,
            style: {
                left: true
            },
            fromNickname: 'botbotbo',
            userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
            messageTypeId: 1,
            content: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
        },
        {
            id: 5,
            style: {
                left: true
            },
            fromNickname: 'botbotbo',
            userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
            messageTypeId: 3,
            content: 'vue.js',
        },
        {
            id: 6,
            style: {
                right: true
            },
            fromNickname: 'botbotbo',
            userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
            messageTypeId: 3,
            content: '这是一个很长名字的文件',
        },
    ],
    friendList: [
        {
            id: 0,
            userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
            nickname: "robot",
            userStateId: 1,
        },
        {
            id: 1,
            userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
            nickname: "rekordrekordrekordrekordrekordrekordrekordrekord",
            userStateId: 2,
        },
        {
            id: 2,
            userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
            nickname: "stone",
            userStateId: 1,
        },
    ],
    applicationList: [
        {
            id: 10,
            userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
            nickname: "a-robot",
            userStateId: 1,
            status: 0,
        },
        {
            id: 11,
            userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
            nickname: "applicationRekordrekordrekordrekordrekordrekordrekordrekord",
            userStateId: 2,
            status: 0,
        },
        {
            id: 12,
            userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
            nickname: "a-stone",
            userStateId: 1,
            status: 0,
        },
        {
            id: 13,
            userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
            nickname: "agree",
            userStateId: 1,
            status: 1,
        },
        {
            id: 14,
            userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
            nickname: "refuse",
            userStateId: 1,
            status: 2,
        },
    ]
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})