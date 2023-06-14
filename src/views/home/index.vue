<!--
 * @Description: 插槽 + 状态管理模式（store）详解
 * @Author: fjwu
 * @Date: 2023-06-08 17:55:28
 * @LastEditors: fjwu
 * @LastEditTime: 2023-06-12 18:12:50
-->

<script lang="ts" setup>
import { storeToRefs  } from 'pinia';
import { ref, defineAsyncComponent } from 'vue';
const Child = defineAsyncComponent(() => import('./children.vue'));
import { useProjectStore } from '@/store/project';
import { useUserStore } from '@/store/user';
const user = useUserStore();
// store属性变响应式 storeToRefs
const{name, doubleCount, doublePlusOne} = storeToRefs(user);
 
interface myType {
    name: string,
    age: number,
    sex?: string
}
let a = ref('hahahhaah');
const obj: myType = {
    name: '李四',
    age: 18
};
console.log(obj, 'obj==');

// 1. 函数参数非必传
const clickBtn = (_type?: string) => {
    if(a.value === '1') {
        console.log('11111',a.value);
     
    } 
};

interface Params {
    msg: string,
    flag: boolean,
    count?: number
}
const clickBtn2 = (params: Params) => {
    console.log(params, '1111');
};
</script>

<template>
    <div>
        <p>{{ a }}</p>
        <a-button type="primary" @click="clickBtn()">点击按钮</a-button>
        <a-button type="primary" @click="clickBtn2({msg: 'hi', flag: false})">点击接口按钮</a-button>
        <div>
            <span>用户名：</span>
            <span>{{ name }}--{{ doubleCount }}--{{ doublePlusOne }}</span>
        </div>
        <Child msg="父组件传的值" name="隔壁老王哈哈哈">
            <template #title >我是具名插槽slot</template>
            <template #default="slotsProps">我是匿名插槽slot--{{ slotsProps.text }}<span style="color: red;">{{ slotsProps.count }}</span></template>
        </Child>
    </div>
</template>
<style scoped lang='scss'>
    
</style>