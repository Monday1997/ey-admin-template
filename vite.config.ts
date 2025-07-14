import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        VueI18nPlugin({
            include: [path.resolve(__dirname, './locales/**')],
            compositionOnly: true,
        }),
        tailwindcss(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
                /\.md$/, // .md
            ],
            imports: [
                // presets
                'vue',
                'vue-router',
            ],
        }),
        Components({ resolvers: [AntDesignVueResolver({ importStyle: false })] }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
