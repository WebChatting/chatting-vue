<template>
    <div>
        <video class="video" controls :src="message.url">
            Your browser does not support the video tag.
        </video>
    </div>
</template>

<script>
export default {
    name: "VideoMessage",
    props: {
        message: {},
    },
};
</script>

<style scoped>
.video {
    width: 420px;
    height: 240px;
}
</style>
