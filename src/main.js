import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; 
import router from './router';
import { firebaseApp } from './firebase';

const app = createApp(App);
app.use(router);
app.provide('firebaseApp', firebaseApp);
app.mount('#app');

