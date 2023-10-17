<script setup lang="ts">
import { ref, reactive, defineAsyncComponent, onMounted } from 'vue';
const TableCom = defineAsyncComponent(() => import('./table.vue'));
import { useRoute } from 'vue-router';
const route = useRoute();
interface MockData {
  key: string;
  title: string;
  description: string;
  updDate: string,
  isSelected: boolean;

}
const obj:any = ref({});
console.log(obj.value);

const mockData = ref<MockData[]>([]);
const originData: MockData[] = [];
const rightTableData = ref<MockData[]>([]) ;
const leftTable = ref(null);
const rightTable = ref(null);
for (let i = 0; i < 50; i++) {
    originData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        updDate: '',
        isSelected: false
    });
}
onMounted(() => {
    getTableData({
        current: 1,
        pageSize: 10
    });
});
const total = ref(0);
const getTableData = ({current, pageSize}) => {
    total.value = originData.length;
    setTimeout(() => {
        const currentPage = (current - 1) *  pageSize;
        mockData.value = originData.slice(currentPage,  currentPage +  pageSize);
        setMockData();
    }, 1000);
};
const setMockData = () => {
    const selectKeys = rightTableData.value.map(v => v.key);
    mockData.value.forEach(item => {
        item.isSelected = selectKeys.includes(item.key);
    });
};
const leftSelectData: any = ref([]);
const changePagination = (page) => {
    // 保存当前页数据
    saveSlectData();
    getTableData(page);
};
const saveSlectData = () => {
    leftSelectData.value = [...leftSelectData.value, ...selectedLeftInfo.selectedRows];
    leftSelectData.value = leftSelectData.value.reduce((preVal,curVal) => {
        const obj = preVal.find(v => v.key === curVal.key);
        if(obj === undefined) {
            preVal.push(curVal);
        }
        return preVal;
    },[]);
    console.log(leftSelectData.value, 'leftSelectData.value');
    
};
const selectedLeftInfo = reactive({
    selectedRowKeys: <string[]>[],
    selectedRows: []
});
const changeLeftSelect = ({selectedRowKeys, selectedRows}) => {
    selectedLeftInfo.selectedRowKeys = selectedRowKeys;
    selectedLeftInfo.selectedRows = selectedRows;
};
const selectedRightInfo = reactive({
    selectedRowKeys: <string[]>[],
    selectedRows: []
});
const changeRightSelect = ({selectedRowKeys, selectedRows}) => {
    selectedRightInfo.selectedRowKeys = selectedRowKeys;
    selectedRightInfo.selectedRows = selectedRows;
};
const moveToRight = () => {
    mockData.value.forEach(item => {
        if(!item.isSelected) {
            item.isSelected = selectedLeftInfo.selectedRowKeys.includes(item.key);
        }
    });
    rightTableData.value = rightTableData.value.concat(selectedLeftInfo.selectedRows).concat(leftSelectData.value);
    // 重置日期
    rightTableData.value.forEach(v => {
        v.updDate = '';
    });
    // 清空选中
    leftSelectData.value = [];
    clearSelected(leftTable);
};
const moveToLeft = () => {
    mockData.value.forEach(item => {
        if(item.isSelected) {
            item.isSelected =  !selectedRightInfo.selectedRowKeys.includes(item.key);
        }
    });
    rightTableData.value = rightTableData.value.filter(v => !selectedRightInfo.selectedRowKeys.includes(v.key));

    // 清空选中
    clearSelected(rightTable);
};
const clearSelected = (el) => {
    el.value.rowSelection.onChange([], []); 
};

const clickSubmit = () => {
    console.log('clickSubmit', rightTableData.value);
};
</script>

<template>
    <div class="transfer_container">
        <div>
            {{ obj.name }}
        </div>
        <TableCom ref="leftTable" :tableData="mockData.filter(v=>!v.isSelected)" direction="left" :total="total" @changePagination="changePagination" @changeSelect="changeLeftSelect" />
        <div class="button">
            <a-button type="primary" size="small" @click="moveToRight">加入</a-button>
            <a-button size="small" @click="moveToLeft">移出</a-button>
        </div>
        <TableCom ref="rightTable" direction="right" :tableData="rightTableData" @changeSelect="changeRightSelect" />

        <a-button type="primary" size="small" @click="clickSubmit">加入</a-button>
    </div>
</template>
<style scoped lang='scss'>
    .transfer_container {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        // height: 0;
        // .button {
        //     width: ;
        // }
    }
</style>