<script lang="ts">
export default {
    name: 'FileItem',
    inheritAttrs: false
};
</script>
<script setup lang="ts">
const emits = defineEmits(['back', 'set-back']);
defineProps({
    item: {
        type: Object,
        default: () => ({})
    }
});
 
const clickFile = (file) => {
    emits('back', file);
};
const goBack = (file) => {
    emits('set-back', file);
};
</script>

<template>
    <span>
        <span @click="clickFile(item)" class="file">
            {{ item.fileName }}
        </span>
        <span v-if="(item.children && item.children.length>0)" >></span>
        <FileItem v-if="item.children && item.children.length>0" :item="item.children[0]" @back="goBack"/>
        
    </span>
</template>
<style scoped lang='scss'>
.file {
    cursor: pointer;
}
    
</style>