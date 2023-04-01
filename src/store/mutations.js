import Vue from "vue";

export default {
    UNSHIFT_MESSAGES(state, {mk, m}) {
        state.messages[mk].unshift(m)
    },
    SET_MESSAGES(state, {mk, ms}) {
        Vue.set(state.messages, mk, ms)
    },
};