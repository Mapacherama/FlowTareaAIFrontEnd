import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import NewReflection from '../views/NewReflection.vue';
import Register from '../views/Register.vue';
const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/new-reflection', component: NewReflection },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
