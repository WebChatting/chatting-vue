<template>
    <div class="main">
        <div class="search">
            <el-input class="search-input" type="text" size="medium" placeholder="搜索" prefix-icon="el-icon-search" maxlength="20"
                autocomplete autofocus
                v-model="input" show-word-limit></el-input>
            <el-button class="search-button" size="medium"
                type="primary"
                @click="search">
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
                <el-avatar shape="circle" :size="70" :src="item.avatarPath"></el-avatar>
                <div class="info">
                    <p class="add-name ellipsis">{{item.name}}</p>
                    <el-button type="primary" icon="el-icon-circle-plus" class="add-button"
                        v-if="item.status == -1 || item.status == 2"
                        @click="addRelation(item)">好友</el-button>
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
import { get, post} from '@/service/request'
export default {
    name: 'SearchAreaBody',
    data() {
        return {
            input: '',
            searchResults: [],
        }
    },
    props: {
        isGroup: Boolean,
    },
    methods: {
        closeRightPanel() {
            this.$bus.$emit('closeRightPanel')
        },
        search() {
            get((this.isGroup ? 'group' : 'user') + '/search', {
                    name: this.input,
                }).then(resp => {
                if (resp.data.status == 200) {
                    this.searchResults = resp.data.data.results
                } else {
                    console.log("request error")
                }
            })
        },
        addRelation(rel) {
            post('/relation/add', null, {
                    acceptId: rel.id,
                    type: this.isGroup ? 1 : 0,
                    status: rel.status,
                }).then(res => {
                if (res.data.status == 200) {
                    rel.status = 0;
                } else {
                    console.log('network error')
                }
            })
        },
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
