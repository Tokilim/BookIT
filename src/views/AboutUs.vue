<template>
  <div class="about-us">
    <div class="container header">
      <h2>{{ hotelAbout }}</h2>
      <p class="description">{{ hotelDescription }}</p>
    </div>
    <div class="container mission">
      <h3>Our Mission</h3>
      <p>{{ missionStatement }}</p>
    </div>
    <div class="container team">
      <h3>Meet Our Team</h3>
      <ul>
        <li v-for="(member, index) in team" :key="index" class="team-member">
          <div class="avatar">
            <img :src="getAvatar(member.name)" alt="Avatar">
          </div>
          <div class="info">
            <span class="name">{{ member.name }}</span>
            <span class="position">{{ member.position }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const hotelAbout = ref('About Us');
const hotelDescription = ref('Welcome to BookIT Hotel Reservation, your premier destination for seamless and memorable travel experiences.');
const missionStatement = ref('Our mission is to exceed guest expectations by providing unparalleled service, exceptional amenities, and memorable experiences.');

const team = ref([
  { name: 'Kyel', position: 'General Manager' },
  { name: 'Jade', position: 'Customer Relations Manager' },
  { name: 'Allyson', position: 'Front Desk Supervisor' },
  { name: 'Yuan', position: 'Head Chef' },
]);

const getAvatar = (name) => {
  // You can implement logic here to fetch or generate avatars based on the member's name
  return `https://via.placeholder.com/100x100?text=${name}`;
};
</script>

<style scoped>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

/* Global Styling */
.about-us {
  width: 100vw;
  height: 100vh;
  margin: 40 auto;
  padding: 1rem;
  padding-top: 7.5rem;
  margin: auto;
  background: url(../assets/images/bgabout.jpg) no-repeat center center;
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif; /* Apply Roboto font */
}

.about-us .container {
  position: relative;
  z-index: 1; /* Ensure the contents are above the background overlay */
}

.about-us::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity as needed */
  z-index: 0;
}

/* Header Styling */
.header {
  margin-bottom: 40px; /* Add margin to move content lower */
}

.header h2 {
  font-size: 36px;
  margin-bottom: 40px; /* Adjusted spacing */
  font-weight: bold; /* Increased font weight */
  color: #fff; /* Set font color to white */
}

.description {
  font-size: 18px;
  line-height: 1.6; /* Adjusted line height for better readability */
  color: #fff; /* Set font color to white */
}

/* Mission Styling */
.mission h3,
.team h3 {
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: bold; /* Increased font weight */
  color: #fff; /* Set font color to white */
}

.mission p{
  color: #fff;
}

/* Team Styling */
.team ul {
  list-style-type: none;
  padding: 0;
}

.team-member {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 20px;
  font-weight: bold;
  color: #fff; /* Set font color to white */
}

.position {
  font-size: 16px;
  color: #fff; /* Set font color to white */
}
</style>
