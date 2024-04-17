<template>
  <div>
    <DeluxeRoom />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'; // Import defineComponent from Vue
import DeluxeRoom from '@/components/DeluxeRoom.vue'; // Import the DeluxeRoom component

// Define your component using defineComponent and setup function
defineComponent({
  name: 'App', // Name of the component (optional)
  components: {
    DeluxeRoom, // Register the DeluxeRoom component
  },
});
</script>

<style>
/* Add your styles here */
</style>
