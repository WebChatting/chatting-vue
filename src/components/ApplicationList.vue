<template>
    <ul class="infinite-list" v-infinite-scroll="load">
        <li v-for="(item, index) in applications" :key="item.id">
            <el-card class="box-card" body-style="padding: 4px 8px;">
                <div class="card">
                    <div>
                        <el-image
                            class="avatar"
                            :preview-src-list="[item.avatarPath]"
                            :src="item.avatarPath"
                            :alt="item.name"
                        >
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                        <p class="name ellipsis">{{ item.name }}</p>
                    </div>
                    <el-button-group v-if="!isRequest && item.status == 0">
                        <el-button size="mini" class="button"
                            @click="agreeApplication(index)">同意</el-button>
                        <el-button size="mini" class="button"
                            @click="refuseApplication(index)">拒绝</el-button>
                    </el-button-group>
                    <div class="result" v-else>{{item.status == 0 ? '等待回应' : (item.status == 1 ?'已同意' : '已拒绝')}}</div>
                </div>
                <p class="time">
                    <span>2023 22:58:43</span>
                </p>
            </el-card>
        </li>
    </ul>
</template>

<script>
export default {
    name: "ApplicationList",
    props: {
        'isGroup': {
            type: Boolean,
            required: true,
        },
        'isRequest': {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        applications: function() {
            if (this.isGroup) {
                if (this.isRequest) {
                    return this.$store.state.requestGroupApplications;
                } else {
                    return this.$store.state.acceptGroupApplications;
                }
            } else {
                if (this.isRequest) {
                    return this.$store.state.requestFriendApplications;
                } else {
                    return this.$store.state.acceptFriendApplications;
                }
            }
        }
    },
    methods: {
        load() {

        },
        agreeApplication(id) {
            this.applications[id].status = 1
            // 同意群组验证不加入好友列表
            if (!this.isGroup) {
                this.$store.state.friends.push(this.applications[id])
            }
        },
        refuseApplication(id) {
            this.applications[id].status = 2
        },
    }
}
</script>

<style scoped lang="scss">
    ul {
        padding: 0px;
        margin: 0px;
        li {
            list-style: none;
            .card {
                display: flex;
                justify-content: space-between;
                .avatar {
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                    border-radius: 15px;
                }
                .name {
                    display: inline-block;
                    margin: 0px 0px 0px 8px;
                    width: 80px;
                }
                .result {
                    margin: auto 0;
                }
                .button {
                    padding: 0px;
                    width: 42px;
                    height: 30px;
                }
            }
            .time {
                margin: 0;
                > span {
                    display: inline-block;
                    padding: 0 10px;
                    font-size: 12px;
                    color: #FFF;
                    background-color: #9c9c9c;
                    border-radius: 3px;
                }
            }
        }
    }
</style>
