<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
const list  = [1,2,3];
</script>

<template>
    <h1>{{ msg }}</h1>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
  .a {
    color: $color;
  }
}
</style>
