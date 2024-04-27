<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {  getAuth, signOut } from "firebase/auth";
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768; // Change breakpoint as needed
}

onMounted(() => {
  // Check screen size on component mount
  checkScreenSize();
  // Listen for window resize events
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  // Remove event listener on component destroy
  window.removeEventListener('resize', checkScreenSize);
});

const navbarClasses = {
  'navbar': true,
  'navbar-expand-md': true,
  'navbar-light': !isMobile.value,
  'fixed-top': !isMobile.value
};

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
  <nav :class="navbarClasses">
   <div class="container-fluid">
     <a class="navbar-brand">
      <img class="logo" src="../assets/images/logo.png" alt="BookIT" width="70" height="70">
       
     </a>
     
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
         <li class="nav-item">
           <RouterLink to="/" class="nav-link" active-class="active-link">Home</RouterLink>
         </li>
         <li class="nav-item">
           <RouterLink to="/room" class="nav-link" active-class="active-link">Rooms</RouterLink>
         </li>
         <li class="nav-item">
             <RouterLink to="/aboutus" class="nav-link" active-class="active-link">About</RouterLink>
         </li>
         <li class="nav-item">
             <RouterLink to="/contactus" class="nav-link" active-class="active-link">Contact Us</RouterLink>
         </li>
         <li class="nav-item login">
             <RouterLink to="/login" class="nav-link" active-class="active-link">Login</RouterLink>
         </li>
         <li class="nav-item login">
             <RouterLink to="/account" class="nav-link" active-class="active-link">Account</RouterLink>
         </li>
         <!-- <li class="nav-item">
             <RouterLink to="/person/view" class="nav-link" active-class="active-link">Person</RouterLink>
         </li> -->
         <!-- <li class="nav-item dropdown">
           <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Dropdown
           </a>
           <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
             <li><a class="dropdown-item" href="#">Action</a></li>
             <li><a class="dropdown-item" href="#">Another action</a></li>
             <li><hr class="dropdown-divider"></li>
             <li><a class="dropdown-item" href="#">Something else here</a></li>
           </ul>
         </li> -->
       </ul>
     </div>
   </div>
 </nav>
</template>
 
<style scoped>

.active-link {
 font-weight: bold;
 color: rgb(139, 56, 56) !important;
}

.navbar-light .navbar-nav .nav-link {
 color: #fff; /* White color */
 transition: all 0.3s ease;
}

nav {
 padding: 2rem;
}

.navbar-nav {
 margin: auto;
 padding-right: 5rem;
}

.nav-link:hover {
 text-decoration: underline;
 transform: scale(1.1);
}

.logo{
  border-radius: 0.5rem;
}

@media (max-width: 767px) {
  .navbar {
    position: static;
    background-color: #FEFAF6;
  }

  .navbar-light .navbar-nav .nav-link{
    color: #322C2B;
  }
}
</style>
