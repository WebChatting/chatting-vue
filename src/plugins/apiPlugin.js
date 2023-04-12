// apiPlugin.js
import api from "@/services/api/api";

export default {
    install(Vue) {
        Vue.prototype.$api = {
            loginUser: api.loginUser,
            registerUser: api.registerUser,
            updateRelation: api.updateRelation,
            addRelation: api.addRelation,
            updateUserOrAddGroup: api.updateUserOrAddGroup,
            searchUserOrSearchGroup: api.searchUserOrSearchGroup,
            generateResponse: api.generateResponse,
        };
    },
};
