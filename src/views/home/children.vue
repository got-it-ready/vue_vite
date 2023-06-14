<script setup lang="ts">
import { ref, withDefaults, defineProps, defineAsyncComponent } from 'vue';
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
    <a-divider>孙子组件</a-divider>
    <GrandSon v-bind="$attrs" />
</template>
<style scoped lang='scss'>
    
</style>