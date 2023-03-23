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
    isGroup: false,
}

const getters = {
    getApplications: (state) => (isGroup, isRequest) => {
        if (isGroup) {
            if (isRequest) {
                return state.requestGroupApplications;
            } else {
                return state.acceptGroupApplications;
            }
        } else {
            if (isRequest) {
                return state.requestFriendApplications;
            } else {
                return state.acceptFriendApplications;
            }
        }
    },
    getRelations: (state) => (isGroup, isCreate) => {
        if (!isGroup) {
            return state.friends;
        } else {
            if (isCreate) {
                return state.createGroups;
            } else {
                return state.joinGroups;
            }
        }
    }
}
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
})