<template>
    <div id="list">
        <p class="title" style="">用户列表</p>
        <div class="infinite-list-wrapper user-list" style="overflow: auto">
            <ul>
                <li v-for="item in users" :key="item.id">
                    <div style="display: flex; justify-content: space-between">
                        <div>
                            <el-badge :is-dot="true">
                                <el-image
                                    class="avatar"
                                    :preview-src-list="[item.userProfile]"
                                    :src="item.userProfile"
                                    :alt="item.nickname"
                                >
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                            </el-badge>
                            <p class="name">{{ item.nickname }}</p>
                        </div>
                        <div>
                            <el-badge
                                :value="item.userStateId == 1 ? '在线' : '离线'"
                                :type="
                                    item.userStateId == 1 ? 'danger' : 'info'
                                "
                            >
                            </el-badge>
                        </div>
                    </div>
                </li>
            </ul>
            <p v-if="false">加载中...</p>
            <p v-if="false">没有更多了</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                users: [
                    {
                        id: 0,
                        userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
                        nickname: "rekord",
                        userStateId: 1,
                    },
                    {
                        id: 1,
                        userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
                        nickname: "rekord",
                        userStateId: 2,
                    },
                    {
                        id: 2,
                        userProfile: "https://cdn.sxrekord.com/blog/logo.jpg",
                        nickname: "rekord",
                        userStateId: 1,
                    },
                ],
            };
        },
    };
</script>

<style lang="scss" scoped>
    #list {
        .title {
            margin: 0px;
            padding: 2px 4px;
            height: 20px;
            text-align: center;
        }
        .user-list {
            max-height: 570px;
        }
        ul {
            padding: 0px;
            margin-left: 4px;
        }
        li {
            padding: 12px 0px;
            list-style: none;
            cursor: pointer;
            &:hover {
                background-color: #d8d6d6;
            }
        }
        li.active {
            background-color: #c8c6c6;
        }
        .avatar {
            width: 30px;
            height: 30px;
            vertical-align: middle;
            border-radius: 15px;
        }
        .name {
            display: inline-block;
            margin: 0px 0px 0px 12px;
        }
    }
</style>
