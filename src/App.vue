
<template>
  <main>
    <div id="app">
    <Navigation /> <!-- Include the Navigation component here -->
    <nav>
      <RouterView />
  </nav>

  
    <!-- Other content of your app -->
  </div>
  </main>
</template>

<script setup>
// import { defineComponent } from 'vue'; // Import defineComponent from Vue
// import DeluxeRoom from '@/components/DeluxeRoom.vue'; // Import the DeluxeRoom component

// // Define your component using defineComponent and setup function
// defineComponent({
//   name: 'App', // Name of the component (optional)
//   components: {
//     DeluxeRoom, // Register the DeluxeRoom component
//   },
// });


  import { ref, onMounted } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import Navigation from './components/Navigation.vue'; // Adjust the path as per your directory structure
</script>

<style>
/* Add your styles here */
</style>
