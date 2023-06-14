import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// ui component
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';

// store
import store from './store';

createApp(App).use(store).use(Antd).mount('#app');
