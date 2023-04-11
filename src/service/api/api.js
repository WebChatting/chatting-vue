import { post, get, asyncPost } from "@/service/request";
import {
    USER_LOGIN_URL,
    USER_REGISTER_URL,
    USER_UPDATE_URL,
    USER_SEARCH_URL,
    RELATION_UPDATE_URL,
    RELATION_ADD_URL,
    GROUP_ADD_URL,
    GROUP_SEARCH_URL,
} from "@/config/api";

export default {
    loginUser: function(username, password) {
        return post(USER_LOGIN_URL, {
            username,
            password,
        });
    }
}