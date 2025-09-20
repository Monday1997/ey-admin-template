import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
// import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

<%- importers.join('\n') %>

export default defineConfig({
  plugins: [
     <%- plugins?plugins.join(',\n')+',' : '' %>
    // 注意 这个必须放在最前面
    // VueRouter({
    //   exclude: ['/components/**/*'],
    // }),
    vue(),
    vueJsx(),
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
  server: {
    port: 8080,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
