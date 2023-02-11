<template>
    <div id="display">
        <ul >
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
                        <p v-if="!isSingle && entry.style.left" class="username">{{entry.fromNickname}}</p>
                        <p v-if="entry.messageTypeId == 1" class="text">{{entry.content}}</p>
                        <img v-if="entry.messageTypeId == 2" :src="entry.content" class="img">
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Display",
        data() {
            return {
                isSingle: false,
                messages: [
                    {
                        id: 1,
                        style: {
                            left: 'left'
                        },
                        fromNickname: 'rekord',
                        userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
                        messageTypeId: 1,
                        content: 'hei',
                    },
                    {
                        id: 2,
                        style: {
                            right: 'right'
                        },
                        fromNickname: 'rekord',
                        userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
                        messageTypeId: 1,
                        content: '你好',
                    },
                    {
                        id: 3,
                        style: {
                            left: 'left'
                        },
                        fromNickname: 'rekord',
                        userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
                        messageTypeId: 1,
                        content: '长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
                    }
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
    #display {
        padding: 15px;
        padding-right: 3px;
        height: 80%;
        max-height: 80%;
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
                }
                .text {
                    margin: 0px;
                    display: inline-block;
                    padding: 0 10px;
                    background-color: #fafafa;
                    border-radius: 8px;
                    line-height: 30px;
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
    }
</style>