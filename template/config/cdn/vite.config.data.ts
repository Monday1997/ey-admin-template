export default function getData() {
  return {
    plugins: [
      `cdn({
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
    })`,
    ],
    importers: [
      `import cdn from 'vite-plugin-cdn2'`,
      `import { bootcdn } from 'vite-plugin-cdn2/resolver/bootcdn'`,
    ],
  };
}
