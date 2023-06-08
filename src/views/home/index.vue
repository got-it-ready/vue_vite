<script lang="ts" setup>
import { ref } from 'vue';
interface myType {
    name: string,
    age: number,
    sex?: string
}
let a = ref(1);
const obj: myType = {
    name: '张三',
    age: 18
};
console.log(obj, 'obj==');

// const clickBtn = () => {
//     if(a.value == 1) {
//         console.log('11111',a.value);
        
//     }
// };
</script>

<template>
    <div>
       <p>{{a}}</p>
    </div>
</template>
<style scoped lang='scss'>
    
</style>