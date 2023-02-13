<template>
    <div id="display"
        ref="display">
        <ul>
            <li v-for="entry in messages" :key="entry.id">
                <p class="time">
                    <span>{{new Date()}}</span>
                </p>
                <div class="main" :class="{left: entry.style.left, right: entry.style.right}">
                    <el-avatar class="avatar" :src="entry.userProfile"
                        @error="false" shape="circle" :size="30" alt="Avatar">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                    </el-avatar>
                    <div class="message">
                        <div><p v-if="!isSingle && entry.style.left" class="username"
                            @click="openInfoDialog(entry.id)">{{entry.fromNickname}}</p></div>
                        <p v-if="entry.messageTypeId == 1" class="text">{{entry.content}}</p>
                        <el-image
                            v-if="entry.messageTypeId == 2"
                            style="width: 150px; height: 150px"
                            :src="entry.content"
                            :preview-src-list="[entry.content]">
                        </el-image>
                        <div class="file"
                            v-if="entry.messageTypeId == 3">
                            <div class="file-icon">
                                <i class="el-icon-folder"></i>
                            </div>
                            <div class="file-info ellipsis">{{entry.content}}</div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <el-dialog
        title="基本信息"
        :visible.sync="dialogVisible"
        width="300px">
            <div class="priview">
                <el-image
                    class="priview-avatar"
                    :src="dialogAvatar"
                ></el-image>
                <div class="priview-username ellipsis">{{dialogNickName}}</div>
            </div>
            <el-button type="primary" round class="priview-button">加好友</el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Display",
        data() {
            return {
                isSingle: false,
                messages: this.$store.state.privateMessages,
                dialogVisible: false,
                dialogUserId: 0,
            }
        },
        computed: {
            dialogAvatar() {
                return this.$store.state.privateMessages[this.dialogUserId].userProfile
            },
            dialogNickName() {
                return this.$store.state.privateMessages[this.dialogUserId].fromNickname
            },
        },
        methods: {
            scrollToBottom() {
                const display = this.$refs.display
                display.scrollTop = display.scrollHeight - display.clientHeight
            },
            openInfoDialog(id) {
                this.dialogVisible = true
                this.dialogUserId = id
            },
        },
        mounted() {
            this.$bus.$on('scrollToBottom', this.scrollToBottom)
        },
        beforeDestroy() {
            // 解绑自定义事件
            this.$bus.$off('scrollToBottom')
        }
    }
</script>

<style lang="scss" scoped>
    #display {
        padding: 15px;
        padding-right: 3px;
        max-height: 438px;
        overflow-y: scroll;
        overflow-x: hidden;
        ul {
            list-style-type: none;
		    padding-left: 0px;
            li {
                margin-bottom: 10px;
            }
        }
        .time {
            text-align: center;
            margin: 3px 0px;
            > span {
                display: inline-block;
                padding: 0 18px;
                font-size: 12px;
                color: #FFF;
                background-color: #dcdcdc;
                border-radius: 3px;
            }
        }
        .main {
            display: -webkit-flex; /* Safari */
            display: flex;
            .avatar {
                margin: 0;
            }
            .message {
                max-width: 80%;
                .username {
                    margin: 0px;
                    padding: 0px;
                    line-height: 15px;
                    font-size: 10px;
                    color: grey;
                    cursor: pointer;
                    display: inline-block;
                }
                .text {
                    margin: 0px;
                    display: inline-block;
                    padding: 0 10px;
                    background-color: #fafafa;
                    border-radius: 8px;
                    line-height: 30px;
                }
                .file {
                    width: 180px;
                    height: 60px;
                    display: flex;
                    line-height: 60px;
                    border: solid #b4b4b4;
                    border-radius: 5px;
                    .file-icon {
                        font-size: 300%;
                        margin: 0px 5px;
                    }
                    .file-info {
                        width: 120px;
                        height: 60px;
                    }
                }
            }

        }
        .left {
            flex-direction: row;
            .avatar {
                margin-right: 10px;
            }
        }
        .right {
            flex-direction: row-reverse;
            .avatar {
                margin-left: 10px;
            }
            .username {
                text-align: right;
            }
        }
        .priview {
            display: flex;
            justify-content: space-around;
            .priview-avatar {
                width: 100px;
                border-radius: 50px;
            }
            .priview-username {
                font-size: 30px;
                height: 100px;
                line-height: 100px;
                width: 140px;
            }
        }
        .priview-button {
            width: 100%;
            margin-top: 12px;
            margin-bottom: -12px;
        }
    }
</style>
