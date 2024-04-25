<template>
  <div class="contact-us">
    <!-- Container for the content -->
    <div class="content-container">
      <div class="container header">
        <h2>{{ contactTitle }}</h2>
        <p class="description">{{ contactDescription }}</p>
      </div>
      <div class="container contact-info">
        <h3>Contact Information</h3>
        <ul>
          <li>
            <span class="info-label">Address:</span>
            <span class="info-text">{{ address }}</span>
          </li>
          <li>
            <span class="info-label">Phone:</span>
            <span class="info-text">{{ phone }}</span>
          </li>
          <li>
            <span class="info-label">Email:</span>
            <span class="info-text">{{ email }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- Container for "Contact Us" outside the border -->
    <div class="contact-label">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const contactTitle = ref('Contact Us');
const contactDescription = ref('Have questions or need assistance? Feel free to reach out to us.');
const address = ref('University of Santo Tomas');
const phone = ref('+1234567890');
const email = ref('BookIT@gmail.com');
</script>

<style scoped>
/* Global Styling */
.contact-us {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  background: url(../assets/images/background.jpg) no-repeat center center;
  background-size: cover;
  font-family: 'Roboto', sans-serif;

  &::before {
      content: '';
      position: absolute;
      
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity as needed */
      
    }
}

.content-container {
  height: 30rem; /* Set a fixed height */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  background-color: rgba(255, 255, 255  );
  margin-top: 15rem; /* Push container to the middle */
  margin-bottom: auto; /* Push container to the middle */
  padding: 2rem;
  z-index: 1;
}

/* Container for "Contact Us" */
.contact-label {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.contact-label h2 {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
}

/* Header Styling */
.header {
  margin-bottom: 20px;
  text-align: center;
}

.header h2 {
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
}

.description {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 30px;
}

/* Contact Info Styling */
.contact-info {
  color: #333;
}

.contact-info h3 {
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: bold;
  text-align: center;
  
}

.contact-info ul {
  padding: 0;
  list-style-type: none;
}

.info-label {
  font-weight: bold;
}

.info-text {
  margin-left: 10px;
}
</style>
