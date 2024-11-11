import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router'; // This should match the alias set in vite.config.ts

import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(router).mount('#app');