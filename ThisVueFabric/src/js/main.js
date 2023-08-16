import '../assets/style.css'
import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from '../App.vue';
import Home from '../pages/home.vue';
import Map from '../pages/map.vue';
import Sega from '../pages/segasamy.vue';

const routes = [
    { path: '/', component: Home }, 
    { path: '/map', component: Map },
    { path: '/segasamy', component: Sega },
  ];
  
  const router = createRouter({ 
    history: createWebHistory(),
    routes
  });
  
  const app = createApp(App);
  app.use(router);
  app.mount('#app');