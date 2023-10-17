<script lang="ts" setup >
import {ref, defineAsyncComponent, onMounted, reactive } from 'vue';
const FileItem = defineAsyncComponent(() => import('./fileItem.vue'));
// 顶部目录
const list: any = ref([
    {
        fileName: '文件库',
        id: 0
    }
]);
const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        slots: { customRender: 'name' },
        fixed: 'left',
        width: 600
    },
    {
        title: 'age',
        dataIndex: 'age',
        fixed: 'left',
        width: 400
    },
    {
        title: 'address',
        dataIndex: 'address',
        width: 400
    },
    {
        title: 'operation',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
        width: 100
    }
];
const data1 = [
    {
        id: 1,
        name: '公共文件',
        age: 32,
        address: 'London, Park Lane no. 0'
    }
];
const data2 = [
    {
        id: 2,
        name: '操作手册',
        age: 32,
        address: 'London, Park Lane no. 0'
    }
];
const data3 = [];
const dataMap = {
    '文件库': data1,
    '公共文件': data2,
    '操作手册': data3
};
const curFile = ref('文件库');
let backFile:any = reactive({});
const dataSource = ref([]);
 
const loadData = () => {
    setTimeout(() => {
        dataSource.value = dataMap[curFile.value];
        console.log(dataSource.value, '====res==');
        
    }, 100);
};
onMounted(() => {
    loadData();

});
const goFile = (row, fileName) => {
    const {id} = row;
    curFile.value = fileName;
    const obj = {
        id,
        fileName
    };
    list.value = setFileNav(list.value, 'add', [obj]);
    // 加载数据
    loadData();
    console.log(list.value, 'list.value===');
    
};
const setFileNav = (arr, type, list) => {
    if(type === 'add') {
        arr.forEach(item => {
            if(!item.children) {
                item.children = list;
            } else {
                setFileNav(item.children, type, list);
            }
        });
        return arr;
    }
    if(type === 'goback') {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if(item.id === backFile.id) {
                delete item.children;
                return arr;
            } else {
                if(item.children && item.children.length > 0) {
                    setFileNav(item.children, 'goback', []);
                }
            }
            
        }
        return arr;
    }
    
};
 
const setBack = (file) => {
    backFile = file;
    const {fileName} = file;
    curFile.value = fileName;
    list.value = setFileNav(list.value, 'goback', []);
    loadData();
};
</script>

<template>
    <div class="tableHeader">
        <FileItem v-for="item in list" :key="item.id" :item="item" @set-back="setBack" @back="setBack"/>
    </div>
    <a-table :dataSource="dataSource" :columns="columns" :scroll="{x: 500}">
        <template #name="{ record ,text }">
            <span @dblclick="goFile(record, text)" class="fileName">{{ text }}</span>
        </template>
    </a-table>
    
   
</template>
<style scoped lang='scss'>
.tableHeader {
    height: 30px;
    background-color: pink;
    text-align: left;
    line-height: 30px;
}
    .fileName {
        cursor: pointer;
    }
</style>