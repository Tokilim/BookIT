<script setup>
import Navigation from '@/components/Navigation.vue'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

console.log(auth);
</script>


<template>
  <Navigation /> 
  <main>
    <div class="container-fluid landing">
      <div class="landing-intro-top underline">Welcome to</div>
      <h2 class="landing-intro">BookIT Hotel</h2>
      <p></p>
    </div>

    <section class="showcase">
      <div class="container mt-5">
      <h1>Rooms and Facilities</h1>
      <p class="lead">Experience luxury and comfort at our golden-themed hotel.</p>
  
      <div class="row mt-5">
      <div class="col-md-4 mb-4">
          <div class="card">
            <img class="card-img-top" src="https://i.pinimg.com/originals/a5/25/86/a52586ab1561ad8e9a9f6f7b7b159002.jpg" alt="Card image">
            <div class="card-body">
              <h5 class="card-title">Standard</h5>
              <p class="card-text">Perfect for a solo traveler, this cozy suite offers comfort and privacy with stunning beachfront views.</p>
              <router-link :to="{ name: 'room' }" class="btn btn-primary">Reserve</router-link>
            </div>
          </div>
      </div>
      
      <div class="col-md-4 mb-4">
          <div class="card">
            <img class="card-img-top" src="https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="Card image">
            <div class="card-body">
              <h5 class="card-title">Deluxe</h5>
              <p class="card-text">Spacious and comfortable, this family room is perfect for a relaxing vacation with your loved ones. Enjoy modern amenities and ample space for everyone.</p>
              <router-link :to="{ name: 'room' }" class="btn btn-primary">Reserve</router-link>
            </div>
          </div>
      </div>

      <div class="col-md-4 mb-4">
          <div class="card">
            <img class="card-img-top" src="https://hoteldesigns.net/wp-content/uploads/2021/05/119949786.jpg" alt="Card image">
            <div class="card-body">
              <h5 class="card-title">Suite</h5>
              <p class="card-text">Indulge in luxury with our spacious suite, featuring elegant decor, breathtaking views, and exclusive amenities for a truly unforgettable experience.</p>
              <router-link :to="{ name: 'room' }" class="btn btn-primary">Reserve</router-link>
            </div>
          </div>
      </div>
      </div>
    </div>
    </section>
  </main>

  <footer>

  </footer>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .landing {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh; /* Ensure at least full viewport height */
    background: url(../assets/images/background.jpg) no-repeat center center;
    background-size: cover;
    flex-direction: column;
    overflow: hidden; /* Hide overflow to prevent slanted part from showing outside */

    /* Overlay with semi-transparent layer */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity as needed */
    }
  }

  .landing::after {
    content: '';
    position: absolute;
    bottom: -50px; /* Adjust the height of the slanted cut */
    left: 0;
    width: 100%;
    height: 150px; /* Adjust the height of the slanted cut */
    background: linear-gradient(to right bottom, transparent 50%, rgba(0, 0, 0, 0.3) 50%); /* Create gradient for slanted cut */
    transform: skewY(-3deg); /* Skew the slanted cut */
    z-index: 2; /* Ensure the slanted cut is above the background */
  }

  .landing-intro-top,
  .landing-intro {
    text-align: center;
    color: white;
    font-size: 3rem;
    z-index: 1;
  }

  .underline {
    text-decoration-line: underline;
    text-decoration-color: white;
    text-decoration-thickness: 0.1rem;
  }

  .landing-intro-top {
    margin-bottom: 1rem;
    width: 100%;
    font-size: 2rem;
  }

  .landing-intro {
    width: 100%;
    margin: 0;
  }

  /* Customize styles as needed */
.showcase{
  height: 70vh;
}
.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  height: 200px; /* Set a fixed height for the images */
  width: 100%; /* Ensure the width is always 100% of the container */
  object-fit: cover; /* Maintain aspect ratio while covering the container */
}

.router-link {
  text-decoration: none;
}
</style>
