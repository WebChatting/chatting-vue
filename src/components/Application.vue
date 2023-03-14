<template>
    <div id="application">
        <div class="top">
            <el-collapse class="collapse-item">
                <el-collapse-item>
                    <template slot="title">
                        <div class="title">我发起的</div>
                    </template>
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
                                    <el-button-group v-if="item.status == 0">
                                        <el-button size="mini" class="button"
                                            @click="agreeApplication(index)">同意</el-button>
                                        <el-button size="mini" class="button"
                                            @click="refuseApplication(index)">拒绝</el-button>
                                    </el-button-group>
                                    <div class="result" v-else>{{item.status == 1 ? '已同意' : '已拒绝'}}</div>
                                </div>
                                <p class="time">
                                    <span>2023 22:58:43</span>
                                </p>
                            </el-card>
                        </li>
                    </ul>
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <div class="title">我收到的</div>
                    </template>
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
                                    <el-button-group v-if="item.status == 0">
                                        <el-button size="mini" class="button"
                                            @click="agreeApplication(index)">同意</el-button>
                                        <el-button size="mini" class="button"
                                            @click="refuseApplication(index)">拒绝</el-button>
                                    </el-button-group>
                                    <div class="result" v-else>{{item.status == 1 ? '已同意' : '已拒绝'}}</div>
                                </div>
                                <p class="time">
                                    <span>2023 22:58:43</span>
                                </p>
                            </el-card>
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </div>

        <div class="bottom-bar">
            <div @click="clearProcessed"><i class="el-icon-delete"></i></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Application",
    data() {
        return {
            applications: this.$store.state.relations,
        };
    },
    methods: {
        load() {

        },
        agreeApplication(id) {
            this.$store.state.friendList.push(this.users[id])
            this.users[id].status = 1
        },
        refuseApplication(id) {
            this.users[id].status = 2
        },
        clearProcessed() {
            this.$confirm('此操作将清理所有已处理的好友或群组申请记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 移除已处理的申请记录
                this.users = this.users.filter(item => item.status == 0)
                this.$message({
                    type: 'success',
                    message: '清理成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消清理'
                });
            });
        },
    },
}
</script>

<style lang="scss" scoped>
#application {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 540px;
    .top {
        overflow-y: auto;
        max-height: 520px;
    }
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
    .bottom-bar {
        text-align: right;
        padding-right: 20px;
        border-top: 1px solid #a09f9f;
        div {
            display: inline;
            cursor: pointer;
        }
        div:hover {
            color: #f78989
        }
    }
    .collapse-item {
        overflow-y: hidden;
        .title {
            padding-left: 5px;
        }
        ul {
            margin-bottom: 0px;
        }
    }
}
</style>