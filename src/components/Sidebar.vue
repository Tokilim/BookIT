<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {  getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router';

const router = useRouter();

const signout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    router.push('/');
    console.log( "Signed Out" );
    }).catch((error) => {
    // An error happened.
    });
};
</script>

<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar" style="width: 280px; height: 100vh;">
      <a href="dashboard.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4 sidebarlogo"><img src="../assets/images/logo.png" alt="Sidebar Logo" width="100%"></span>
      </a>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link" active-class="active" data-page="Home">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/manageroom" class="nav-link" active-class="active" data-page="homepage">Rooms</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/managebooking" class="nav-link" active-class="active" data-page="homepage">Bookings</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/reports" class="nav-link" active-class="active" data-page="homepage">Reports</router-link>
        </li>
      </ul>
      <hr>
      <button @click="signout" class="nav-link active d-flex align-items-center text-center" aria-current="page">Logout</button>
    </div>
</template>
  


<style scoped>
.sidebar {
    position: fixed;
    width: 280px;
    height: 100%;
    background-color: #333;
    color: #fff;
    overflow-y: auto;
}
</style>
  