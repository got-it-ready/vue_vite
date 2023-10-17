<script setup lang="ts">
import { ref, watch } from 'vue';
const visible = ref<boolean>(false);
console.log('a-modal=======');
const props = defineProps({
    startDate: {
        type: String,
        default: ''
    }
});
const startDate1 = ref('');
watch(() => props.startDate, (val) => {
    console.log(val, 'val');
    startDate1.value = val;
    
}, {immediate: true});
const showModal = () => {
    visible.value = true;
};

const handleOk = () => {
    visible.value = false;
    startDate1.value =  props.startDate;
};
const handleCancle = () => {
    visible.value = false;
    startDate1.value =  props.startDate;
};
const changeDate = (val) => {
    console.log(val, 'val');
    
};
defineExpose({
    showModal
}); 
</script>

<template>
    <div>
        <a-modal v-model:open="visible" width="1000px" title="Basic Modal" :destroyOnClose="true" @ok="handleOk" @cancel="handleCancle">
            <a-date-picker v-model:value="startDate1" format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" @change="changeDate" />
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-modal>
    </div>
</template>
<style scoped lang='scss'>
    
</style>