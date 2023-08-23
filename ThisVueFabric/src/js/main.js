import '../assets/style.css'
import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from '../App.vue';
import Home from '../pages/home.vue';
import Map from '../pages/map.vue';
import Sega from '../pages/segasamy.vue';
import Index from '../Sega/segaPages/index.vue';
import add_machinebox_dialog from '../Sega/segaComponents/add_machinebox_dialog.vue';
import add_text_dialog from '../Sega/segaComponents/add_text_dialog.vue';
import add_multi_machinebox_dialog from '../Sega/segaComponents/add_multi_machinebox_dialog.vue';
import canvasA from '../Sega/segaComponents/canvasA.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/map', component: Map },
  { path: '/segasamy', component: Sega },
  { path: '/index', component: Index },
  { path: '/add_machinebox_dialog', component: add_machinebox_dialog },
  { path: '/add_text_dialog', component: add_text_dialog },
  { path: '/add_multi_machinebox_dialog', component: add_multi_machinebox_dialog },
  { path: '/canvasA', component: add_multi_machinebox_dialog },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');