<script setup lang="ts">
import dayjs from 'dayjs'; // 导入日期js
import isBetween from 'dayjs/plugin/isBetween';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(quarterOfYear); // 获取季度依赖
dayjs.extend(isBetween);
// import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted, computed,watch } from 'vue';
const sliderValue = ref<number>(50);
const tableData = ref([]);
const flatData = (workspace, arr) => {
    const list:any = [];
    arr.forEach(item => {
        item.codelist.forEach(v => {
            const obj = {
                workspace,
                sopTask: {
                    ...item
                },
                taskCode: {
                    ...v
                }
            };
            list.push(obj);
        });
    });
    console.log(list, 'list');
    return list;
};
const dateList = ref<any>([]);
// 排期结束时间
const taskEndDate = ref('2023-08-07 00:00:00');
const ganttTitleDate = () => {
    // 分解开始和结束日期
    const start_date = dayjs().subtract(7, 'day')
        .format('YYYY-MM-DD');
    const end_date = getEndDay(start_date);
    dateList.value = [...mouthAndDayTitleDate(
        start_date,
        end_date
    )];
    return dateList.value;  
};
const getEndDay = (start_date) => {
    const unit = 'day';
    const end_date = dayjs().format('YYYY-MM-DD');
    const curDate = dayjs(taskEndDate.value).format('YYYY-MM-DD');
    // 返回日期为空时,返回当前日期
    if(!curDate) {
        return end_date;
    }
    const betweenDay = dayjs(curDate).isBetween(start_date, end_date, unit);
    const sameStartDay = dayjs(start_date).isSame(curDate, unit);
    const sameEndDay = dayjs(end_date).isSame(curDate, unit);
    if(betweenDay || sameStartDay || sameEndDay) {
        return end_date;
    } else {
        return dayjs(curDate).add(1, 'day');
    }
     
};
const mouthAndDayTitleDate = (start_date, end_date) => {
    const dateRange = dayjs(end_date).diff(
        start_date,
        'day'
    );
    const date:any = [];
    for (let i = 0; i < dateRange; i++) {
        const obj = {
            full_date: dayjs(start_date).add(i, 'day').format('YYYY-MM-DD'),
            children: getDayTime(),
            // id: uuidv4(),
            dataIndex: dayjs(start_date).add(i, 'day').format('YYYY-MM-DD')
        };
        date.push(obj);
    }
    console.log(date, 'date');
    return date;
};
const getDayTime = () => {
    const children:any = [];
    for (let i = 1; i <= 24; i++) {
        const time = String(i).length > 1 ? String(i) : `0${i}`;
        const obj = {
            time: time,
            dataIndex: time,
            key: time,
            width: sliderValue.value
        };
        children.push(obj);
    }
    return children;
};
const columns = computed(() => {
    return ganttTitleDate();
});
console.log(columns.value, 'columns');

const loadData = () => {
    setTimeout(() => {
        const tableList = [
            {
                name: 'xxx0001',
                id: '001',
                list: [
                    {
                        name: 'sop01',
                        sopid: 1,
                        codelist: [
                            {
                                name: 'T1001',
                                pid: 1,
                                StartTime: '2023-08-06 01:00:00',
                                EndTime: '2023-08-07 03:00:00'
                            },
                            {
                                name: 'T1002',
                                pid: 2,
                                StartTime: '2023-08-02 12:00:00',
                                EndTime: '2023-08-02 15:00:00'
                            },
                            { name: 'T1003',
                                pid: 3,
                                StartTime: '2023-08-02 20:00:00',
                                EndTime: '2023-08-02 22:00:00'
                            }
                        ]
                    },
                    {
                        name: 'sop03',
                        sopid: 3,
                        codelist: [
                            {
                                name: 'T1005',
                                pid: 5,
                                StartTime: '2023-08-02 16:00:00',
                                EndTime: '2023-08-02 19:00:00'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'xxx0002',
                id: '002',
                list: [
                    {
                        name: 'sop02',
                        sopid: 12,
                        codelist: [
                            {
                                name: 'T1001',
                                pid: 121,
                                StartTime: '2023-05-02 01:00:00',
                                EndTime: '2023-05-02 06:00:00'
                            }
                        ]
                    }
                ]
            }
        ];
        let arr:any = [];
        tableList.forEach(item => {
            const workspace = {
                name: item.name,
                id: item.id
            };
            if (item.list.length > 0) {
                arr = [...arr, ...flatData(workspace, item.list)];
            }
        });
        // console.log(arr, 'arr');
        tableData.value = arr;
    }, 50);
};
const getX = () => {
    return 500 + (dateList.value.length * sliderValue.value * 24);
};
onMounted(() => {
    loadData();
});

const dayGanttType = (row, date, time, unit) => {
    const { taskCode } = row;
    const start_date = taskCode.StartTime;
    const end_date = taskCode.EndTime;
    // 若没有时间则不显示
    if (!start_date || !end_date) {
        return;
    }
    const curDate = `${date} ${time}:00:00`;
    // console.log(curDate, 'curDate');
    const between = dayjs(curDate).isBetween(start_date, end_date, unit);
    const start = dayjs(start_date).isSame(curDate, unit);
    const end = dayjs(end_date).isSame(curDate, unit);
    if (between || start || end) {
        if (between) {
            return 'wl-item-on';
        }
        if (start && end) {
            return 'wl-item-on wl-item-full';
        }
        if (start) {
            return 'wl-item-on wl-item-start';
        }
        if (end) {
            return 'wl-item-on wl-item-end';
        }
    }
};
const renderContent = (row,  rowIndex, key) => {
    return setCellMerge(row, key, rowIndex);
    
};
const setCellMerge = (row, key, rowIndex) => {
    const list = tableData.value;
    const len = list.filter((item) => row[key].name === item[key]['name']).length;

    let firstIndex = -1;
    for (let i = 0; i <  list.length; i++) {
        const element = list[i];
        if (row[key].name === element[key]['name']) {
            firstIndex = i;
            break;
        }
    }
    if (rowIndex === firstIndex) {
        return {
            rowspan: len,
            colspan: 1
        };
    }
    if (rowIndex > firstIndex && rowIndex < firstIndex + len) {
        return {
            rowspan: 0,
            colspan: 0
        };
    }
};

const goDetail = (row) => {
    console.log(row, 'goDetail');
    
};
</script>

<template>

    <div class="tableContainer">
        <div class="right">
            <a-space>
                <i class="iconfont icon-setting"></i>
						
                <i class="iconfont icon-minus-circle"></i>
                <div class="slider_box">
                    <a-slider v-model:value="sliderValue" :min="20" :max="200" :step="20" />
                </div>
                <i class="iconfont icon-add-circle"></i>
                <i class="iconfont icon-fullsreen"></i>
            </a-space>
        </div>
        <div class="hotelApply wl-gantt">
            <a-table :data-source="tableData" :pagination="false" bordered :scroll="{ x: getX(), y: 500 }">
                <a-table-column key="workspace" title="workspace" data-index="workspace" width="100" fixed="left" :customCell="(record, rowIndex) => renderContent(record, rowIndex, 'workspace' )">
                    <template #default="{ text }">
                        <span>
                            {{ text.name }}
                        </span>
                    </template>
                </a-table-column>
                <a-table-column key="sopTask" title="SOP步骤任务" data-index="sopTask" width="100" fixed="left" :customCell="(record, rowIndex) => renderContent(record, rowIndex, 'sopTask' )">
                    <template #default="{ text }">
                        <span>
                            {{ text.name }}
                        </span>
                    </template>
                </a-table-column>
                <a-table-column key="taskCode" title="批次任务编码" data-index="taskCode" width="100" fixed="left">
                    <template #default="{ text }">
                        <span>
                            {{ text.name }}
                        </span>
                    </template>
                </a-table-column>
                <a-table-column-group v-for="(item) in columns" :key="item.id">
                    <template #title><span>{{ item.full_date }}</span></template>
                    <a-table-column v-for="child in item.children" :key="child.dataIndex" :data-index="child.dataIndex" :width="sliderValue" rowClassName="wl-gantt-item">
                        <template #title><span >{{ child.time }}</span></template>
                        <template #default="{ record  }">
                            <div :class="dayGanttType(record, item.full_date,child.time, 'hour')" @click="goDetail(record)"></div>
                        </template>
                    </a-table-column>
                </a-table-column-group>
            </a-table>
        </div>
         
    </div>
</template>
<style lang='scss' scoped>
// :deep(.wl-gantt .ant-table-wrapper .ant-table-tbody >tr >td.ant-table-cell-row-hover) {
//     background-color: transparent !important;
// }
.right{
    float: right;
    .slider_box{
        width: 120px;
    }
}
 
$gantt_item: 18px;
$gantt_item_half: 4px;

.wl-gantt {
    
    // 计划时间gantt开始
    .wl-item-on {
        position: absolute;
        top: 40%;
        left: 0;
        right: -1px;
        margin-top: -$gantt_item_half;
        height: $gantt_item;
        background: #e5eefd;
        transition: all 0.4s;
        cursor: pointer;
    }

    .wl-item-start {
        left: 10%;
        &:after {
            position: absolute;
            top: 0;
            left: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #e5eefd;
        }
    }

    .wl-item-end {
        right: 10%;
        &:after {
            position: absolute;
            top: 0;
            right: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #e5eefd;
        }
    }

    .wl-item-full {
        left: 5px;
        right: 5px;
        &:before {
            position: absolute;
            top: 0;
            left: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #e5eefd;
        }
        &:after {
            position: absolute;
            top: 0;
            right: -5px;
            z-index: 1;
            content: "";
            width: 8px;
            height: 18px;
            border-radius: 50%;
            background: #e5eefd;
        }
    }
}
</style>