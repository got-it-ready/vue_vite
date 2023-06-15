<!--
 * @Description:  ts初体验
 * @Author: fjwu
 * @Date: 2023-06-12 11:07:53
 * @LastEditors: fjwu
 * @LastEditTime: 2023-06-14 15:29:14
-->
<script setup lang="ts">
import { ref, withDefaults, defineProps, defineAsyncComponent, onMounted } from 'vue';
const GrandSon = defineAsyncComponent(() => import('./grandSon.vue'));
interface Props {
    msg: string
}
const props = withDefaults(defineProps<Props>(), {
    msg: '默认值'
});

const count = ref(1);
const changeValue = () => {
    count.value++;
};
// ts
// 使用ref获取实例 InstanceType
const grandSon = ref <InstanceType<typeof GrandSon>| null>(null);
const getComValues = () => {
    const arr: Array<any> = grandSon.value?.list || [];
    console.log(arr);
};
onMounted(() => {
    console.log(grandSon.value);
});
</script>

<template>
    <div>
        <span></span>

        <a-button type="primary" @click="changeValue">改变作用域的值--haha</a-button>
    </div>
    <div>
        <span>我是子组件---{{ props.msg }}</span>
    </div>
    <slot text="hello-作用域值" :count="count"></slot>
    <slot name="title"></slot>
    <a-divider>孙子组件 ---  ref获取元素</a-divider>
    <GrandSon v-bind="$attrs" ref="grandSon" />
    <a-button type="primary" @click="getComValues">获取组件的值</a-button>
</template>
<style scoped lang='scss'>
    
</style>