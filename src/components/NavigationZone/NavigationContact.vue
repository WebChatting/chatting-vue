<template>
    <div id="list">
        <div class="infinite-list-wrapper user-list">
            <div v-if="!isGroup">
                <RelationList :isGroup="false" />
            </div>
            <el-collapse v-else class="collapse-item">
                <el-collapse-item>
                    <template slot="title">
                        <div class="title">{{ $t('navigationZone.createdGroup') }}</div>
                    </template>
                    <RelationList :isCreated="true" />
                </el-collapse-item>
                <el-collapse-item>
                    <template slot="title">
                        <div class="title">{{ $t('navigationZone.joinedGroup') }}</div>
                    </template>
                    <RelationList />
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
    name: "NavigationContact",
    props: {
        isGroup: Boolean,
    },
    components: {
        RelationList,
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
