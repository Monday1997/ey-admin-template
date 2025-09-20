import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path:'/',
      component:()=>import('@/pages/index.vue')
    },
    {
      path:'*',
      component:()=>import('@/pages/[...path].vue')
    }
  ],
})

export default router
