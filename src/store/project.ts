import {defineStore} from 'pinia';
export const useProjectStore = defineStore({
    id: 'project',
    state: () => {
        return {
            reportName: 'Y1'
        };
    },
    getters: {
        
    }
});