import { defineStore } from 'pinia';
export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            name: '张三',
            counter: 2
        };
    },
    getters: {
        doubleCount(state) {
            return state.counter * 2;
        },
        // 返回类型必须明确设置
        doublePlusOne(): number {
            return this.doubleCount * 2 + 1;
        }
    },
    actions: {
        updateName(name:string) {
            this.name = name;
        },
        updateCounter() {
            this.counter++;
        }
    }
});