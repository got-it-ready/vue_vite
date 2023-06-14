<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
const Home = defineAsyncComponent(() => import('./views/home/index.vue'));
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
const clickEdit = () => {
    userStore.updateName('隔壁老王');
    userStore.updateCounter();
};
</script>

<template>
    <div>
        <a-button type="primary" @click="clickEdit">修改用户1111</a-button>
    </div>
    <HelloWorld msg="Vite + Vue" />
    <Home />
</template>

<style scoped>
</style>
