import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
const resolve = (dir: string) => path.join(__dirname, dir);
import viteCompression from 'vite-plugin-compression'; // 生成.gz文件
export default({mode}) => {
    return defineConfig({
        plugins: [
            vue(),
            {
                ...viteCompression(),
                apply: 'build'  //仅在 'build'时使用
            }
        ],
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        optimizeDeps: {
            exclude: ['pinia']
        },
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
        },
        build: {
            rollupOptions: {  // js和css文件夹分离
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks: {
                        vue: ['vue', 'pinia', 'vue-router']
                    }
                }
            }
        }
    });
};
