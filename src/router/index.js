import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '../views/AboutUs.vue'
import HomePage from '../views/HomePage.vue'
import ContactUs from '../views/ContactUs.vue'
import Room from '../views/Room.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    },
    {
      path: '/contactus',
      name: 'contactus',
      component: ContactUs
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    },
  ]
})

export default router