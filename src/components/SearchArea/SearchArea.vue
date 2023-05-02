<template>
    <el-tabs :stretch="true" type="card">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-custom"></i> {{ $t('searchArea.findPerson') }}</span>
            <SearchAreaBody :isGroup="false" />
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="el-icon-s-comment"></i> {{ $t('searchArea.findGroup') }}</span>
            <SearchAreaBody :isGroup="true" />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import SearchAreaBody from "./SearchAreaBody";
export default {
    name: "SearchArea",
    components: {
        SearchAreaBody,
    },
};
</script>
