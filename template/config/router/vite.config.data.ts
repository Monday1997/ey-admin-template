
export default function getData(){
  return {
    importers:[`import VueRouter from 'unplugin-vue-router/vite'`],
    plugins:[
      `VueRouter({
        exclude: ['/components/**/*'],
      })`
    ]
  }
}