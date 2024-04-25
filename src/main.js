import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; 
import router from './router';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH3SMPE9yhgDAGsgy09U8gPhDjQioyI2o",
  authDomain: "bookit-8861d.firebaseapp.com",
  projectId: "bookit-8861d",
  storageBucket: "bookit-8861d.appspot.com",
  messagingSenderId: "565906414431",
  appId: "1:565906414431:web:4de352252dd4204334b4ea"
};

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.mount('#app');
