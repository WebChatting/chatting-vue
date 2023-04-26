<template>
    <div class="file" @click="downloadFile(message.url)">
        <div class="file-icon">
            <i class="el-icon-folder"></i>
        </div>
        <div class="file-info ellipsis" :title="message.content">
            {{ message.content }}
        </div>
    </div>
</template>

<script>
export default {
    name: "FileMessage",
    props: {
        message: {},
    },
    methods: {
        downloadFile(path) {
            window.open(path);
        },
    },
};
</script>

<style scoped lang="scss">
.file {
    width: 180px;
    height: 60px;
    display: flex;
    line-height: 60px;
    border: solid #b4b4b4;
    border-radius: 5px;
    cursor: pointer;
    .file-icon {
        font-size: 300%;
        margin: 0px 5px;
    }
    .file-info {
        width: 120px;
        height: 60px;
    }
}
</style>
