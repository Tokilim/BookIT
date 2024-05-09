import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '../views/AboutUs.vue'
import HomePage from '../views/HomePage.vue'
import ContactUs from '../views/ContactUs.vue'
import Room from '../views/Room.vue'
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import ManageRoom from '../views/admin/ManageRoom.vue'


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
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/account',
      name: 'acoount',
      component: Account
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/manageroom',
      name: 'manageroom',
      component: ManageRoom
    },
  ]
})

export default router