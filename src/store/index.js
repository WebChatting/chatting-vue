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
            fromId: 502,
            name: 'rekordrekordrekordrekordrekordrekord',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 1,
            content: 'hei',
        },
        {
            id: 1,
            fromId: 501,
            name: 'hello',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 1,
            content: '你好',
        },
        {
            id: 2,
            fromId: 502,
            name: 'botbotbo',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 2,
            content: 'avatar/default_user_avatar.jpg',
        },
        {
            id: 3,
            fromId: 501,
            name: 'botbotbo',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 2,
            content: 'avatar/default_user_avatar.jpg',
        },
        {
            id: 4,
            fromId: 502,
            name: 'botbotbo',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 1,
            content: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
        },
        {
            id: 5,
            fromId: 502,
            name: 'botbotbo',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 3,
            content: 'vue.js',
            path: 'upload/82a7f2f80e364f17a2ef85e7c7128214.apk',
        },
        {
            id: 6,
            fromId: 501,
            name: 'botbotbo',
            avatarPath: 'avatar/default_user_avatar.jpg',
            contentType: 3,
            content: '这是一个很长名字的文件',
            path: 'upload/9841ab1951c44ea7a6850b552f2b7f18.png',
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