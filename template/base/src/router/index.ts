import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        name: 'test-auto-com',
        component: () => import('@/pages/test-auto-com.vue'),
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/pages/test-i18n.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/pages/[...path].vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
