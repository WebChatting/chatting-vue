<template>
    <div class="help-button" @click="showHelp">
        <i class="el-icon-question"></i>
    </div>
</template>

<script>
export default {
    name: "HelpWidget",
    methods: {
        showHelp() {
            // 显示帮助内容
            alert("这是帮助信息");
        },
    },
};
</script>
<style>
.help-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
}
.help-button i {
    color: #000;
    font-size: 36px;
    position: absolute; /* 添加绝对定位 */
    top: 50%; /* 上下居中 */
    left: 50%; /* 左右居中 */
    transform: translate(-50%, -50%); /* 左右、上下均居中 */
}
</style>
