<template>
    <div class="main">
        <div class="search">
            <el-input
                class="search-input"
                type="text"
                size="medium"
                :placeholder="$t('navigationZone.search')"
                prefix-icon="el-icon-search"
                maxlength="20"
                autocomplete
                autofocus
                v-model="input"
                show-word-limit
            ></el-input>
            <el-button
                class="search-button"
                size="medium"
                type="primary"
                @click="search"
            >
                {{ $t('searchArea.findButton') }}
            </el-button>
            <el-button
                class="search-button"
                size="medium"
                type="danger"
                @click="closeRightPanel"
            >
                {{ $t('searchArea.closeButton') }}
            </el-button>
        </div>
        <el-divider></el-divider>
        <div class="search-result">
            <div
                v-for="item in searchResults"
                :key="item.id"
                class="single-result"
            >
                <el-avatar
                    shape="circle"
                    :size="70"
                    :src="item.avatarPath"
                ></el-avatar>
                <div class="info">
                    <p class="add-name ellipsis" :title="item.name">
                        {{ item.name }}
                    </p>
                    <el-button
                        type="primary"
                        icon="el-icon-circle-plus"
                        class="add-button"
                        v-if="item.status == -1 || item.status == 2"
                        @click="addRelation(item)"
                        >好友</el-button
                    >
                    <div v-else class="add-info">
                        <div v-if="item.status == 0">已发出请求</div>
                        <div v-else>已建立关系</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchAreaBody",
    data() {
        return {
            input: "",
            searchResults: [],
        };
    },
    props: {
        isGroup: Boolean,
    },
    methods: {
        closeRightPanel() {
            this.$bus.$emit("closeRightPanel");
        },
        search() {
            this.$api
                .searchUserOrSearchGroup(this.isGroup, this.input)
                .then((resp) => {
                    if (resp.data.status == 200) {
                        this.searchResults = resp.data.data.results;
                    } else {
                        console.log("request error");
                    }
                });
        },
        addRelation(rel) {
            this.$api.addRelation(rel, this.isGroup ? 1 : 0);
        },
    },
};
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
            margin: 0 30px 15px;
            width: 140px;
            height: 70px;
            display: flex;
            .info {
                display: inline-block;
                padding-left: 5px;
                .add-name {
                    margin: 5px 0;
                    width: 65px;
                }
                .add-button {
                    padding: 8px 10px;
                }
                .add-info {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
