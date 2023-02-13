<template>
  <div id="textinput">
    <div class="richtext">
        <el-popover placement="top-start" width="400" trigger="click">
            <div class="emotionList">
                <a href="javascript:void(0);" class="emotionItem"
                    v-for="(item, index) in emojiList" :key="index"
                    @click="addToMessage(item)">
                    {{item}}
                </a>
            </div>
            <el-button class="extend-button" slot="reference">
                <i class="el-icon-star-on"></i>
            </el-button>
        </el-popover>
        <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-upload="beforeAvatarUpload"
                :on-success="uploadImageSuccess"
                :on-error="uploadImageError"
                :show-file-list="false"
                accept=".jpg,.jpeg,.png,.JPG,JPEG,.PNG,.gif,.GIF"
                >
            <el-button class="extend-button" icon="el-icon-picture-outline-round"></el-button>
        </el-upload>
        <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-upload="beforeFileUpload"
                :on-success="uploadFileSuccess"
                :on-error="uploadFileError"
                :show-file-list="false"
                :multiple="false"
                >
            <el-button class="extend-button" icon="el-icon-upload"></el-button>
        </el-upload>
        <el-button class="extend-button" icon="el-icon-more"></el-button>
    </div>
    <textarea id="textarea" placeholder="按 Ctrl + Enter 发送"
        v-model="content" @keyup.ctrl.enter="sendMessage(1)">
    </textarea>
    <el-button id="sendBtn" type="primary" size="mini"
        @click="sendMessage(1)">发送(S)</el-button>
  </div>
</template>

<script>
    const emojiData = require('../assets/emoji.json')
    export default {
        name: "TextInput",
        data() {
            return {
                content: '',
                emojiList: [],
                emojiCounter: 40,
            }
        },
        methods: {
            addToMessage(item) {
                this.content += item
            },
            sendMessage(type, url) {
                if (type == 1 && this.content.trim().length <= 0) {
                    this.$message.error('发送信息不能为空')
                    return
                }

                // 更新消息
                this.$store.state.privateMessages.push({
                    id: this.$store.state.privateMessages.length,
                    style: {
                        right: true
                    },
                    fromNickname: 'rekord',
                    userProfile: 'https://cdn.sxrekord.com/blog/logo.jpg',
                    messageTypeId: type,
                    content: type == 1 ? this.content : url,
                })

                // 清空输入框
                if (type == 1) {
                    this.content = ''
                }
                // 将滚动条滑动至底部
                this.$nextTick(() => {
                    this.$bus.$emit('scrollToBottom')
                })
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
            },
            uploadImageSuccess(res, file) {
                this.$message.success('上传图片成功!')
                this.sendMessage(2, 'https://cdn.sxrekord.com/blog/logo.jpg')
                console.log('success', res, file)
            },
            uploadImageError(res, file) {
                this.$message.error('上传图片失败!')
            },
            beforeFileUpload(file) {

            },
            uploadFileSuccess(res, file) {
                this.$message.success('上传文件成功!')
                this.sendMessage(3, 'vue.min.js')
                console.log('success', res, file)
            },
            uploadFileError(res, file) {
                this.$message.error('上传文件失败!')
            },
        },
        mounted() {
            // 加载指定数量的emoji
            for (let i in emojiData) {
                if (i == this.emojiCounter) {
                    break;
                }
                this.emojiList.push(emojiData[i].char)
            }
        },
    }
</script>

<style lang="scss" scoped>
    #textinput {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 20%;
        border: solid 1px #DDD;
        background-color: white;
        .richtext {
            display: -webkit-flex; /* Safari */
            display: flex;
            .extend-button {
                padding: 8px 10px 0;
                border: none;
                background-color: white;
            }
        }
        > textarea {
            padding: 10px;
            width: 95%;
            height: 30%;
            border: none;
            outline: none;
            resize: none; // 禁止拉伸
        }
        #sendBtn {
            float: right;
            margin-right: 10px;
        }
    }
    .emotionList {
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
    }
    .emotionItem {
        width: 10%;
        font-size: 20px;
        text-align: center;
        text-decoration: none;
    }
    /*正常的未被访问过的链接*/
    .emotionItem:link {
        text-decoration: none;
    }
    /*已经访问过的链接*/
    .emotionItem:visited {
        text-decoration: none;
    }
    /*鼠标划过(停留)的链接*/
    .emotionItem:hover {
        text-decoration: none;
    }
    /* 正在点击的链接*/
    .emotionItem:active {
        text-decoration: none;
    }
</style>