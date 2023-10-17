import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// ui component
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import vGanttChart from 'v-gantt-chart';
// store
import store from './store';

// router
import router from '@/router';

createApp(App).use(store).use(router).use(Antd).use(vGanttChart).mount('#app');
