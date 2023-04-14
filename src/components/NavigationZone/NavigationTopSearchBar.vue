<template>
    <div id="searchbar">
        <el-input
            class="search"
            type="text"
            size="mini"
            v-model="input"
            :placeholder="$t('navigationZone.search')"
            prefix-icon="el-icon-search"
        ></el-input>
        <el-button class="searchBtn" size="mini" @click="openRightPanel"
            ><i class="el-icon-circle-plus"></i
        ></el-button>
    </div>
</template>

<script>
export default {
    name: "NavigationTopSearchBar",
    data() {
        return {
            input: "",
        };
    },
    methods: {
        openRightPanel() {
            this.$bus.$emit("openRightPanel", false);
        },
    },
};
</script>

<style lang="scss" scoped>
#searchbar {
    padding: 10px;
    margin-bottom: 5px;
    .search {
        width: 150px;
        height: 30px;
        line-height: 30px;
        margin: 0 10px;
        border-radius: 4px;
        outline: none; /*鼠标点击后不会出现蓝色边框*/
        color: #fff;
    }
    .searchBtn {
        background-color: #dbd9d8;
        border-radius: 4px;
    }
}
</style>
