<template>
    <div class="main">
        <div class="search">
            <el-input class="search-input" type="text" size="medium" placeholder="搜索" prefix-icon="el-icon-search" maxlength="20"
                autocomplete autofocus
                v-model="input" show-word-limit></el-input>
            <el-button class="search-button" size="medium"
                type="primary">
                查找
            </el-button>
            <el-button class="search-button" size="medium"
                type="danger" @click="closeRightPanel">
                关闭
            </el-button>
        </div>
        <el-divider></el-divider>
        <div class="search-result">
            <div v-for="item in searchResults" :key="item.id" class="single-result">
                <el-avatar shape="circle" :size="70" :src="item.userProfile"></el-avatar>
                <div class="info">
                    <p class="add-name">{{ item.nickname }}</p>
                    <el-button type="primary" icon="el-icon-circle-plus" class="add-button">好友</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            input: '',
            searchResults: this.$store.state.friendList,
        }
    },
    methods: {
        closeRightPanel() {
            this.$bus.$emit('closeRightPanel')
        }
    },
}
</script>

<style lang="scss" scoped>
.main {
    .search {
        .search-input {
            margin-left: 30px;
            width: 380px;
        }
        .search-button {
            margin-left: 20px;
        }
    }
    .search-result {
        width: 600px;
        max-height: 510px;
        overflow: hidden auto;
        display: flex;
        flex-flow: wrap;
        .single-result {
            margin: 0 15px 15px;
            width: 140px;
            height: 70px;
            display: flex;
            .info {
                display: inline-block;
                padding-left: 5px;
                .add-name {
                    margin: 5px auto;
                    padding-bottom: 5px;
                }
                .add-button {
                    padding: 8px 10px;
                }
            }
        }
    }
}
</style>
