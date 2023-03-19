<template>
    <div id="list">
        <div class="infinite-list-wrapper user-list">
            <div v-if="!isGroup">
                <RelationList :isGroup="false"/>
            </div>
            <el-collapse v-else class="collapse-item">
                <el-collapse-item>
                    <template slot="title">
                        <div class="title">我创建的群聊</div>
                    </template>
                    <RelationList :isCreated="true"/>

                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <div class="title">我加入的群聊</div>
                    </template>
                    <RelationList/>
                </el-collapse-item>
            </el-collapse>
            <p v-if="false">加载中...</p>
            <p v-if="false">没有更多了</p>
        </div>
    </div>
</template>

<script>
    import RelationList from "./RelationList";
    export default {
        name: "Contact",
        props: {
            'isGroup': Boolean,
        },
        components: {
            RelationList
        },
    };
</script>

<style lang="scss" scoped>
    #list {
        .collapse-item {
            .title {
                padding-left: 5px;
            }
        }
    }
</style>
