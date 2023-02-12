<template>
    <el-tabs :stretch="true" type="card"
        v-model="activeName" @tab-click="handleClick">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-custom"></i> 好友</span>
            <List/>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-comment"></i> 群聊</span>
            <List/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import List from './List'
    export default {
        name: "Contact",
        components: {
            List,
        },
        data() {
            return {
                activeName: '',
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
    };
</script>
