import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import About from '../views/about.vue';
import Upload from '@/views/upload.vue';
import Layout from '../components/Layout.vue';
const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    children: [
      {
        path: 'upload', // Nested path (no leading slash)
        name: 'upload',
        component: Upload,
      },
      {
        path: 'download',
        name: 'about',
        component: About,
      },
    ],
  },
 

  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;