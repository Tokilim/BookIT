import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '../components/AboutUs.vue'
import HomePage from '../components/HomePage.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutUs
    },
   
  ]
})

export default router