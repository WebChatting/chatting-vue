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
            fromId: 502,
            name: 'rekordrekordrekordrekordrekordrekord',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 1,
            content: 'hei',
        },
        {
            id: 1,
            style: {
                right: true
            },
            fromId: 501,
            name: 'hello',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 1,
            content: '你好',
        },
        {
            id: 2,
            style: {
                left: true
            },
            fromId: 502,
            name: 'botbotbo',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 2,
            content: 'avatar/default_user_avatar.jpg',
        },
        {
            id: 3,
            style: {
                right: true
            },
            fromId: 501,
            name: 'botbotbo',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 2,
            content: 'avatar/default_user_avatar.jpg',
        },
        {
            id: 4,
            style: {
                left: true
            },
            fromId: 502,
            name: 'botbotbo',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 1,
            content: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
        },
        {
            id: 5,
            style: {
                left: true
            },
            fromId: 502,
            name: 'botbotbo',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 3,
            content: 'vue.js',
        },
        {
            id: 6,
            style: {
                right: true
            },
            fromId: 501,
            name: 'botbotbo',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 3,
            content: '这是一个很长名字的文件',
        },
    ],
    relations: [
        {
            id: 13,
            type: 0,
            name: "agree",
            avatarPath: "avatar/default_user_avatar.jpg",
            status: 1,
            online: true,
        },
        {
            id: 14,
            type: 1,
            name: "refuse",
            avatarPath: "avatar/default_group_avatar.jpg",
            status: 2,
            online: false,
        },
    ],
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})