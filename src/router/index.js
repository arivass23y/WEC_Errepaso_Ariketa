import AboutView from '@/views/AboutView.vue';
import DetailView from '@/views/DetailView.vue';
import HomeView from '@/views/HomeView.vue';
import ReceiptView from '@/views/ReceiptView.vue';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/", component: HomeView },
  { path: "/list", component: ReceiptView },
  { path: "/details", component: DetailView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
