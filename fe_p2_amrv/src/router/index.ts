import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/eventos-culturales',
      name: 'eventos-culturales',
      component: () => import('../views/EventosCulturalesView.vue'),
    },
    {
      path: '/recintos',
      name: 'recintos',
      component: () => import('../views/RecintosView.vue'),
    },
  ],
})

export default router
