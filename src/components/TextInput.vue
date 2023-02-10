<template>
  <div id="textinput">
    <div class="richtext">
        <el-popover placement="top-start" width="400" trigger="click" class="emoBox">
            <div class="emotionList">
                <a href="javascript:void(0);" @click="getEmo(index)" v-for="(item,index) in faceList" :key="index" class="emotionItem">{{item}}</a>
            </div>
            <el-button id="emojiBtn" class="emotionSelect" slot="reference">
                <i class="el-icon-star-on"></i>
            </el-button>
        </el-popover>
        <el-upload
                class="upload-btn"
                action="/ossFileUpload?module=group-chat"
                :before-upload="beforeAvatarUpload"
                :on-success="imgSuccess"
                :on-error="imgError"
                :show-file-list="false"
                accept=".jpg,.jpeg,.png,.JPG,JPEG,.PNG,.gif,.GIF"
                >
            <el-button id="uploadImgBtn" icon="el-icon-picture-outline-round"></el-button>
        </el-upload>
    </div>
    <textarea id="textarea" placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage">
    </textarea>
    <el-button id="sendBtn" type="primary" size="mini" @click="addMessageByClick" >发送(S)</el-button>
  </div>    
</template>

<script>
    export default {
        name: "TextInput",
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
        }
        > textarea {
            padding: 10px;
            width: 95%;
            height: 30%;
            border: none;
            outline: none;
            resize: none;//禁止拉伸
        }
        #sendBtn{
            float: right;
            margin-right: 10px;
        }
        #uploadImgBtn{
            border: none;
            width: 40px;
            padding-bottom: 0px;
            padding-left: 5px;
        }
        #uploadImgBtn:hover{
            background-color: white;
        }
        #emojiBtn{
            border: none;
            width: 40px;
            padding-bottom: 0px;
            margin-left: -8px;
        }
        #emojiBtn:hover{
            background-color: white;
        }
        .upload-btn{
            display: inline-block;
        }
    }
    .emotionList{
        display: flex;
        flex-wrap: wrap;
        padding:5px;
    }
    .emotionItem{
        width:10%;
        font-size:20px;
        text-align:center;
    }
    /*包含以下四种的链接*/
    .emotionItem {
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