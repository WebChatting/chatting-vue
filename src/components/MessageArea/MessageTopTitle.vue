<template>
    <div class="chatTitle">
        <span class="titleName ellipsis" :title="chatObject">{{
            chatObject
        }}</span>
        <el-button
            class="moreBtn"
            size="small"
            icon="el-icon-error"
            @click="closeRightPanel"
        ></el-button>
    </div>
</template>

<script>
export default {
    name: "MessageTopTitle",
    methods: {
        closeRightPanel() {
            this.$bus.$emit("closeRightPanel");
        },
    },
    props: ["chatObject"],
};
</script>

<style scoped>
.chatTitle {
    height: 50px;
    width: 100%;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid #c7d2db;
}
.moreBtn {
    background-color: #eee;
    border: 0;
    height: 50px;
}
.titleName {
    margin: 15px 25px;
}
</style>
