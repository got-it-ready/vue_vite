<template>
    <div>
        <a-table :columns="columns" :data-source="data" class="components-table-demo-nested" :row-selection="rowSelection" :pagination="false">
            <template #expandedRowRender="{ record }">
                <a-table :columns="innerColumns" :data-source="record.expanded" :pagination="false">
                </a-table>
            </template>
        </a-table>
    </div>
</template>

<script setup lang="ts">
// import { setup } from 'xe-utils/ctor';

// import { DownOutlined } from '@ant-design/icons-vue';
// import { defineEmits } from 'vue';
const emits = defineEmits(['changeVal']);

const columns = [
    { title: '管板编码', dataIndex: 'name', key: 'name' },
    { title: '物料类', dataIndex: 'platform', key: 'platform' },
    { title: '名称', dataIndex: 'version', key: 'version' },
    { title: 'SN码', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'sop步骤任务', dataIndex: 'creator', key: 'creator' },
    { title: '状态', dataIndex: 'creator', key: 'creator' },
    { title: '库位', dataIndex: 'creator', key: 'creator' },
    { title: '批次任务', dataIndex: 'creator', key: 'creator' },
    { title: '来源', dataIndex: 'creator', key: 'creator' },
    { title: '归还日期', dataIndex: 'createdAt', key: 'createdAt' }
];
interface DataItem {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
  expanded: Array<any>;
  id: Number;
}
const data: DataItem[] = [];

// 子表格
interface innerDataItem {
  key: number;
  date: string;
  name: string;
  status: string;
  upgradeNum: string;
  unit: string;
}


const setInnerData = (outKey) => {
    const innerData: innerDataItem[] = [];
    for (let i = 0; i < 2; ++i) {
        innerData.push({
            key: i,
            date: '2014-77-24 23:12:00',
            name: 'This is production name',
            status: '122',
            upgradeNum: 'Upgraded: 56',
            unit: `吨${outKey}`
        });
    }
    return innerData;
};
for (let i = 0; i < 1; ++i) {
    data.push({
        key: 0,
        name: 'Screem122',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        id: 11,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
        expanded: setInnerData(i + 1)
    });
}
for (let i = 0; i < 1; ++i) {
    data.push({
        key: 1,
        name: 'Screem777',
        platform: 'iOSplus',
        version: '10.3.4.2222',
        upgradeNum: 700,
        id: 22,
        creator: 'Jack',
        createdAt: '2014-03-12 09:55:23',
        expanded: setInnerData(i + 1)
    });
}
// console.log(data, 'data==');

const innerColumns = [
    { title: '样本编码', dataIndex: 'date', key: 'date' },
    { title: '样本名称', dataIndex: 'name', key: 'name' },
    { title: '样本类', dataIndex: 'state', key: 'status' },
    { title: '元件类编码', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    {
        title: '数量',
        dataIndex: 'operation',
        key: 'operation'
    },
    { title: '单位', dataIndex: 'unit', key: 'unit' },
    { title: '孔位', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: '质控结果', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: '质控结果(人工)', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: '有效期', dataIndex: 'upgradeNum', key: 'upgradeNum' }
];
 

const rowSelection = {
    onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        emits('changeVal', selectedRows);
    },
    onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
        console.log(selected, selectedRows, changeRows);
    }
};
</script>
