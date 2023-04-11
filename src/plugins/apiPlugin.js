// apiPlugin.js
import api from "@/service/api/api";

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
