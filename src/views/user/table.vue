<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
const emit = defineEmits(['changePagination', 'changeSelect']);
const props: any = defineProps({
    direction: {
        type: String,
        default: 'left'
    },
    tableData: {
        type: Array,
        default: () => []
    },
    total: {
        type: Number,
        default: 0
    }
    
});
 
const leftTableColumns = [
    {
        dataIndex: 'title',
        title: 'Name'
    },
    {
        dataIndex: 'description',
        title: 'Description'
    }
];
const rightTableColumns = [
    {
        dataIndex: 'title',
        title: 'Name'
    },
    {
        dataIndex: 'updDate',
        title: '日期',
        slots: { customRender: 'updDate' }
    }
];
const page = reactive({
    current: 1,
    pageSize: 10
});
const changePagination = (current) => {
    console.log(current, 'changePagination');
    page.current = current || page.current;
    emit('changePagination', page);
};
const selectedKeys = ref([]);
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        selectedKeys.value = selectedRowKeys;
        emit('changeSelect',{selectedRowKeys, selectedRows});
    },
    selectedRowKeys: selectedKeys
};
defineExpose({
    rowSelection
});
</script>

<template>
    <div>
        <a-table
            :row-selection="rowSelection"
            :columns="direction === 'left' ? leftTableColumns : rightTableColumns"
            :data-source="tableData"
            size="small"
            :pagination="false"
            :scroll="{y: 400}"
        >   
            <template #updDate="{ record }">
                <span>
                    <a-date-picker v-model:value="record.updDate" valueFormat="YYYY-MM-DD"/>
                </span>
            </template>
        </a-table>
        <a-pagination
            v-if="direction === 'left'"
            :total="total"
            :show-total="total => `共${total}条`"
            size="small"
            :show-size-changer="false"
            :defaultPageSize="page.pageSize"
            @change="changePagination"
        />
    </div>
</template>
<style scoped lang='scss'>
    
</style>