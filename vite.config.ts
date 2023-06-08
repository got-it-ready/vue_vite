import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
const resolve = (dir: string) => path.join(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    // lintOnSave: process.env.NODE_ENV !== 'production',
    server: {
        //服务器主机名
        // host: '127.0.0.1',
        //端口号
        port: 3088,
        //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
        strictPort: false
        //自定义代理规则
        // proxy: {
            
        // }
    },
    css: {
        preprocessorOptions: {
            scss: {
                javascriptEnabled: true,
                // 这样就能全局使用 src/styles/variable.scss 定义的 变量
                additionalData: '@import \'@/styles/variable.scss\';'
            }
        }
    }
});
