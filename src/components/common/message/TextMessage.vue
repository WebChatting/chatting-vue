<template>
    <div v-if="message.contentType == 0" class="text">
        {{ message.content }}
    </div>
</template>

<script>
export default {
    name: "TextMessage",
    props: {
        message: {},
    },
};
</script>

<style scoped>
.text {
    margin: 0px;
    display: inline-block;
    padding: 0 10px;
    background-color: #fafafa;
    border-radius: 8px;
    line-height: 30px;
}
</style>
