import Vue from "vue";

export default {
    UNSHIFT_MESSAGES(state, {mk, m}) {
        state.messages[mk].unshift(m)
    },
    SET_MESSAGES(state, {mk, ms}) {
        Vue.set(state.messages, mk, ms)
    },
    SET_CREATE_GROUPS(state, groups) {
        state.createGroups = groups;
    },
    SET_JOIN_GROUPS(state, groups) {
        state.joinGroups = groups;
    },
    SET_FRIENDS(state, friends) {
        state.friends = friends;
    },
};