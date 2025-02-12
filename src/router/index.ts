import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import NewReflection from '../views/NewReflection.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/new-reflection', component: NewReflection },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
