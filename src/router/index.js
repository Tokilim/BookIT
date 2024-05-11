import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from '../views/AboutUs.vue'
import HomePage from '../views/HomePage.vue'
import ContactUs from '../views/ContactUs.vue'
import Room from '../views/Room.vue'
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'
import Booking from '../views/Booking.vue'
import Dashboard from '../views/admin/Dashboard.vue'
import ManageRoom from '../views/admin/ManageRoom.vue'
import ManageBooking from '../views/admin/ManageBooking.vue'

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
      path: '/booking',
      name: 'booking',
      component: Booking
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
    {
      path: '/managebooking',
      name: 'managebooking',
      component: ManageBooking
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/admin/ReportView.vue')
    },
    {
      path: '/solo',
      name: 'solo',
      component: () => import('../views/SoloSuite.vue')
    },
    {
      path: '/family',
      name: 'family',
      component: () => import('../views/FamilyRoom.vue')
    },
    {
      path: '/luxury',
      name: 'luxury',
      component: () => import('../views/LuxurySuite.vue')
    },
  ]
})

export default router