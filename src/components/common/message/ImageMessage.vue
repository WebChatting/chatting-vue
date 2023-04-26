<template>
    <el-image
        class="image"
        :src="message.content"
        :preview-src-list="[message.content]"
    >
    </el-image>
</template>

<script>
export default {
    name: "ImageMessage",
    props: {
        message: {},
    },
};
</script>

<style scoped>
.image {
    width: 150px;
    height: 150px;
    border-radius: 8px;
}
</style>
