<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { key } from '@/constant/index';
import { provide, ref } from 'vue';
const globalVal = ref('全局参数');
provide(key, globalVal.value);
const userStore = useUserStore();
const clickEdit = () => {
    userStore.updateName('隔壁老王');
    userStore.updateCounter();
};
const changeGlobalVal = () => {
    globalVal.value = '全局参数2';
    console.log(globalVal.value);
};
</script>

<template>
     
    <div>
        <a-button type="primary" @click="clickEdit">修改用户</a-button>
        <a-button type="primary" @click="changeGlobalVal">改变全局数据</a-button>
    </div>
    <div>
        <router-link to="/home">home</router-link>
        <router-link to="/login">login</router-link>
    </div>
    <router-view>
    </router-view>
</template>

<style scoped>
.app {
    width: 100% !important;
    height: 100vh;
    background-color: pink;
}
</style>
