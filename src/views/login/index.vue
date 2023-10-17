<script setup lang="ts">
import { key } from '@/constant/index';
import { inject, ref, defineAsyncComponent,unref } from 'vue';
import './index';

// const startDate = ref<any>('');
// watch(() => props.satrtTime, (val) => {
//     startDate.value = val;
// }, {immediate: true}); 
const value = inject(key);
console.log(value, 'inject===');
const Gantte = defineAsyncComponent(() => import('@/components/Gantte.vue'));
const Modal = defineAsyncComponent(() => import('./modalCom.vue'));
// const FileItem = defineAsyncComponent(() => import('./fileItem.vue'));
const File =  defineAsyncComponent(() => import('./file.vue'));
// 获取环境变量
console.log(import.meta.env);

const data = ref([1]);
const modalRef = ref<HTMLElement | null>(null);
const startDate = ref('');
const showModal2 = (time) => {
    startDate.value = time;
    unref(modalRef)?.showModal();
};
const arr = [
    [1,2,3, 4,5,6,7,8,9],
    [1,2, '', '', '', '', '', '', '']
];
const cellRow = ref('600px');
const cellRow1 = ref('0px');

</script>

<template>
    <div>
        我是登录页面---{{ value }}-11111
    </div>
    <Gantte />
    <a-button type="primary" @click="showModal2('2023-08-15 10:42:33')">Open Modal of 1000px width</a-button>
    <a-button type="primary" @click="showModal2('2023-08-12 10:42:33')">Open Modal of 1000px width</a-button>
    <Modal ref="modalRef" :startDate="startDate"/>
    <div class="flexBox">
        <File />
    </div>
</template>
<style scoped lang='scss'>
.tableContainer {
    width: 100%;
}
.flexBox {
    min-width: 100%;
    overflow: auto;
    // background-color: goldenrod;
}
.table {
//   display: flex;
//   border: 1px solid red;
}

.row {
//   flex: 1;
  display: flex;
}

// .row:first-of-type {
//   flex-flow: wrap;
// }

 

.row div {
  border: solid;
//   padding: 1em;
  flex: 1;
  flex-shrink: 0;
  flex-basis: 200px;
  box-sizing: border-box;
}
// .row .rowspan2 {
//   flex: 1 1 100%;
// }
 
</style>