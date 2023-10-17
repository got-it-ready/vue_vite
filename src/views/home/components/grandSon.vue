<!--
 * @Description: vite静态资源处理  new URL() 
 * @Author: fjwu
 * @Date: 2023-06-12 11:27:29
 * @LastEditors: fjwu
 * @LastEditTime: 2023-07-11 16:51:38
-->

<script setup lang="ts">
import {  ref, watch } from 'vue';
 
const list = ref(['基本信息', '访问控制', '项目角色与权限项目角色与权限']);
const visible = ref(false);
const popVisible = ref(false);
const clickItem = (value: string) => {
    if (value === '基本信息') {
        visible.value = !visible.value;
    } else {
        visible.value = false;
        modelVisible.value = true;
    }
};
watch(popVisible, () => {
    console.log(popVisible.value);
    if(!popVisible.value) {
        visible.value = false;
    }
});
defineExpose({
    list
});
// 动态图片url的使用
// const getImgUrl = (src: string): string => {
//     // 使用绝对路径
//     return new URL(`/src/assets/${src}`, import.meta.url).href;
// };
const modelVisible = ref(false);
const handleOk = () => {
    console.log('123');
};
 
import imgUrl from '@/assets/1.png';
</script>
<template>
    <div>
        <!-- 我是孙子组件--{{ $attrs.name }} -->
        <div>
            <a-popover trigger="click" placement="bottom"   v-model:visible="popVisible">
                <template #content>
                    <div class="container">
                        <div v-for="item in list" :key="item" class="configItem" @click="clickItem(item)">{{ item }}</div>
                        <div v-show="visible" class="baseInfo">我是基本信息</div>
                    </div>
                </template>
                <a-button>Hover me</a-button>
            </a-popover>

        </div>
        <img :src="imgUrl" alt="">
        <a-modal v-model:visible="modelVisible" :maskClosable="false" zIndex="2000"  title="Basic Modal" @ok="handleOk">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-modal>
    </div>

</template>
<style scoped lang='scss'>
.container {
    position: relative;
}
.configItem {
    line-height: 30px;
    cursor: pointer;
}
.baseInfo {
    position: absolute;
    left: 0px;
    top: -10px;
    transform: translate(calc(-100% - 20px));
    height: 200px;
    width: 500px;
    border: 1px solid red;

}
</style>