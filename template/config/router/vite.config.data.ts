
export default function getData(){
    return {
        importers:[
             `import { VueRouterAutoImports } from 'unplugin-vue-router'`,
            `import VueRouter from 'unplugin-vue-router/vite'`,

        ],
        plugins: [
           ` VueRouter()`,
           `AutoImport({
                include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/ // .md
                ],
                imports: [
                'vue',
                VueRouterAutoImports,
                '@vueuse/core',
                VpAutoImports
                ],
                resolvers: isProd ? [] : [ElementPlusResolver()],
                vueTemplate: true
            })`
        ],
    }
}
