import { socket } from '@/utils/socket'
import Vue from 'vue'
import  Vuex from 'vuex'

Vue.use(Vuex)

const actions = {

}

const mutations = {

}

const state = {
    messages: {},
    friends: [],
    createGroups: [],
    joinGroups: [],
    requestFriendApplications: [],
    acceptFriendApplications: [],
    requestGroupApplications: [],
    acceptGroupApplications: [],
    socket: socket,
    toId: -1,
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
})