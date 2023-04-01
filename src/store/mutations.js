export default {
    UNSHIFT_MESSAGES(state, mk, m) {
        state.messages[mk].unshift(m)
    },
};