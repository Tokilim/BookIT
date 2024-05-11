<template>
  <Navigation /> 
  <main>
    <div class="about-us">
    <!-- <div class="container header">
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
    </div> -->
    <div class="container mt-5">
    <h1>BookIT Hotel</h1>
    <p class="lead">Learn more about our luxurious hotel.</p>
    
    <div class="row mt-4">
      <div class="col-md-6">
        <img src="https://media.istockphoto.com/id/488120139/photo/modern-real-estate.jpg?s=612x612&w=0&k=20&c=88jk1VLSoYboMmLUx173sHs_XrZ9pH21as8lC7WINQs=" alt="Hotel Exterior" class="img-fluid rounded">
      </div>
      <div class="col-md-6">
        <h2>Our Story</h2>
        <p>Embark on a journey through time and elegance as we unveil the story of BookIT Hotel. Nestled in the heart of
          the city, our hotel stands as a beacon of luxury and refinement.</p>
        
        <h2>Our Mission</h2>
        <p>At BookIT Hotel, our mission is rooted in the belief that every guest deserves a truly exceptional
          experience. We strive to exceed expectations by offering unparalleled service, luxurious accommodations, and a
          warm, welcoming atmosphere.</p>
      </div>
    </div>
  </div>



  </div>
  </main>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue'; 
// import { ref } from 'vue';

// const hotelAbout = ref('About Us');
// const hotelDescription = ref('Welcome to BookIT Hotel Reservation, your premier destination for seamless and memorable travel experiences.');
// const missionStatement = ref('Our mission is to exceed guest expectations by providing unparalleled service, exceptional amenities, and memorable experiences.');

// const team = ref([
//   { name: 'Kyel', position: 'General Manager' },
//   { name: 'Jade', position: 'Customer Relations Manager' },
//   { name: 'Allyson', position: 'Front Desk Supervisor' },
//   { name: 'Yuan', position: 'Head Chef' },
// ]);

// const getAvatar = (name) => {
//   // You can implement logic here to fetch or generate avatars based on the member's name
//   return `https://via.placeholder.com/100x100?text=${name}`;
// };
</script>

<style scoped>
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

/* Global Styling */
main{
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
  overflow: hidden;

  &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity as needed */
      
    }
}
.about-us {
  background-color: white;
  width: 90%;
  z-index: 0;
  padding: 2rem;
  margin-top: 6rem;
  padding-bottom: 5rem;
  border-radius: 1rem;
  height: 80%;
}

.about-us .container {
  position: relative;
  z-index: 1; /* Ensure the contents are above the background overlay */
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

.about {
  text-align: center;
}

.about h1 {
  color: #ffd700; /* Golden yellow color */
}

.about p {
  font-size: 1.1rem;
}

.about img {
  max-width: 100%;
  height: auto;
}

.about h2 {
  color: #ffd700; /* Golden yellow color */
  margin-top: 20px;
}
@media (max-width: 767px) {
  .about-us {
    background-color: white;
    width: 90%;
    z-index: 0;
    padding: 2rem;
    margin-top: 6rem;
    padding-bottom: 5rem;
    border-radius: 1rem;
    height: auto;

  }
}
</style>
