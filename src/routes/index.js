import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import AboutPage from '@/views/AboutPage.vue';
import CategoryPage from '@/views/CategoryPage.vue';
import CartPage from '@/views/CartPage.vue';
import OrderPage from '@/views/OrderPage.vue';
import Registration from '@/views/RegistrationPage.vue';
import LoginPage from '@/views/LoginPage.vue'; // Assuming you have a LoginPage component

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/category',name: 'Category', component: CategoryPage },
  { path: '/cart',name: 'Cart', component: CartPage },
  { path: '/order',name: 'Order', component: OrderPage },
  { path: '/register',name: 'Register', component: Registration },
  { path: '/login',name: 'Login', component: LoginPage }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
