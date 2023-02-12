<template>
    <div id="list">
        <div class="infinite-list-wrapper user-list" style="overflow: auto">
            <ul>
                <li v-for="item in users" :key="item.id" @dblclick="openRightPanel">
                    <div style="display: flex; justify-content: space-between">
                        <div>
                            <el-badge :is-dot="true" :value="2">
                                <el-image :class="{grayscale: item.userStateId != 1}"
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
                            <p class="name ellipsis">{{ item.nickname }}</p>
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
        name: "Contact",
        data() {
            return {
                users: this.$store.state.friendList,
            };
        },
        methods: {
            openRightPanel() {
                this.$bus.$emit("openRightPanel")
            },
        }
    };
</script>

<style lang="scss" scoped>
    #list {
        .user-list {
            max-height: 570px;
        }
        ul {
            padding: 0px;
            margin: 0 2px 16px 4px;
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
            width: 100px;
        }
    }
</style>
