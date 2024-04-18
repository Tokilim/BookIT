<template>
    <div class="about-us">
      <h2>About Us</h2>
      <p>{{ introduction }}</p>
      <p>{{ belief }}</p>
      <p>{{ platform }}</p>
      <p>{{ satisfaction }}</p>
      <p>{{ gratitude }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'AboutUs',
    setup() {
      const introduction = ref("Welcome to [Your Hotel Reservation Website], your premier destination for booking the perfect hotel stay. We understand that finding the right accommodation can make or break your travel experience, which is why we're dedicated to providing you with a seamless booking process and exceptional service.");
      const belief = ref("At [Your Hotel Reservation Website], we believe that every journey should be unforgettable. Whether you're planning a relaxing beach getaway, an adventurous mountain retreat, or a bustling city escape, we have the perfect accommodations to suit your needs.");
      const platform = ref("Our user-friendly platform makes it easy to search for hotels, compare prices, and book your stay with confidence. With our extensive network of partner hotels and exclusive deals, you'll find the best rates guaranteed.");
      const satisfaction = ref("Customer satisfaction is our top priority, and our team is here to assist you every step of the way. Have a question or need assistance with your booking? Our dedicated support team is available 24/7 to ensure your experience is nothing short of exceptional.");
      const gratitude = ref("Thank you for choosing [Your Hotel Reservation Website] for your travel needs. We look forward to helping you create memories that last a lifetime.");
  
      return {
        introduction,
        belief,
        platform,
        satisfaction,
        gratitude
      };
    }
  }
  </script>
  
  <style scoped>
  .about-us {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  .about-us h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  .about-us p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  </style>
  