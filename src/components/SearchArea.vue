<template>
    <el-tabs :stretch="true" type="card">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-custom"></i> 找人</span>
            <Search/>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-comment"></i> 找群</span>
            <Search/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import Search from './Search'
export default {
    name: 'SearchArea',
    components: {
        Search,
    },
}
</script>