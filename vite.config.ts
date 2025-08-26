import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
// import tailwindcss from '@tailwindcss/vite'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import cdn from 'vite-plugin-cdn2'
import { bootcdn } from 'vite-plugin-cdn2/resolver/bootcdn'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    VueRouter(),
    vue(),
    vueJsx(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './locales/**')],
      compositionOnly: true,
    }),
    // tailwindcss(),
    UnoCSS(),
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
    cdn({
      modules: [
        { name: 'vue', global: 'Vue', relativeModule: '/vue/3.5.17/vue.global.prod.min.js' },
        {
          name: 'pinia',
          global: 'Pinia',
          relativeModule: '/pinia/3.0.3/pinia.iife.prod.js',
        },
      ],
      // 只在 build 阶段生效
      apply: 'build',
      resolve: bootcdn(),
    }),
    VitePWA({
      workbox: {
        runtimeCaching: [
          {
            // 匹配 bootcdn、unpkg、jsdelivr 等 CDN
            urlPattern: /^https:\/\/(cdn\.bootcdn\.net|unpkg\.com|cdn\.jsdelivr\.net)\/.*\.(js|css)/,
            handler: 'CacheFirst',
            // handler: 'StaleWhileRevalidate', // 改为 StaleWhileRevalidate
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxEntries: 50, // 最多缓存 50 个文件
                maxAgeSeconds: 60 * 60 * 24 * 30, // 缓存 30 天
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
