<script setup lang="ts">
import { key } from '@/constant/index';
import { inject } from 'vue';
const value = inject(key);
console.log(value, 'inject===');
 
// 获取环境变量
console.log(import.meta.env);
</script>

<template>
    <div>
        我是登录页面---{{ value }}
    </div>
</template>
<style scoped lang='scss'>
    
</style>