/**
 * API常量定义
 *
 * 该文件包含了应用程序中使用的所有API常量。
 * 这些常量提供了API路径的易于理解的名称，
 * 并且符合RESTful API的设计规范和命名约定。
 */

// 基本API路径
export const API_BASE_URL = "/chatting";

// 文件上传API路径
export const FILE_UPLOAD_API_URL = "/upload"

// 用户相关API
const USER_API_URL = "/user";
export const USER_LOGIN_URL = `${USER_API_URL}/login`;
export const USER_REGISTER_URL = `${USER_API_URL}/register`;
export const USER_UPDATE_URL = `${USER_API_URL}/update`;
export const USER_SEARCH_URL = `${USER_API_URL}/search`;
export const USER_LOGOUT_URL = `${USER_API_URL}/logout`;

// 消息相关API
const MESSAGE_API_URL = "/message";
export const MESSAGE_LOAD_URL = `${MESSAGE_API_URL}/load`;

// 好友关系相关API
const RELATION_API_URL = "/relation";
export const RELATION_LIST_URL = `${RELATION_API_URL}/list`;
export const RELATION_UPDATE_URL = `${RELATION_API_URL}/update`;
export const RELATION_ADD_URL = `${RELATION_API_URL}/add`;

// 群组相关API
const GROUP_API_URL = "/group";
export const GROUP_ADD_URL = `${GROUP_API_URL}/add`;
export const GROUP_LIST_URL = `${GROUP_API_URL}/list`;
export const GROUP_SEARCH_URL = `${GROUP_API_URL}/search`;
