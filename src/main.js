import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css'; // Corrected import path
import 'bootstrap/dist/js/bootstrap.min.js'; // Corrected import path
import 'bootstrap';

import router from './router'; // Import the router configuration

createApp(App).use(router).mount('#app');