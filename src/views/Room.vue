<template>
  <div class="room-categories">
    <div class="content-container">
      <div class="container header">
        <h2>{{ categoriesTitle }}</h2>
        <p class="description">{{ categoriesDescription }}</p>
      </div>
      <div class="container categories-list">
        <h3>Room Categories</h3>
        <ul>
          <li v-for="category in categories" :key="category.id">
            <h4>{{ category.name }}</h4>
            <img :src="getRoomImage(category.name)" alt="Room Image">
            <p>{{ category.description }}</p>
            <p>Price: {{ category.price }}</p>
            <button @click="reserveRoom(category)">Reserve</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import room1Image from '../assets/images/room1.jpg';
import room2Image from '../assets/images/room2.jpg';
import room3Image from '../assets/images/room3.jpg';

const categoriesTitle = 'Room Categories';
const categoriesDescription = 'Explore our various room categories and make a reservation.';
const categories = [
  { id: 1, name: 'Standard Room', description: 'Cozy room with essential amenities.', price: '$100/night' },
  { id: 2, name: 'Deluxe Room', description: 'Spacious room with extra amenities.', price: '$150/night' },
  { id: 3, name: 'Suite', description: 'Luxurious suite with premium amenities.', price: '$200/night' }
];

const reserveRoom = (category) => {
  // Implement reservation logic here
  console.log('Room reserved:', category.name);
};

const getRoomImage = (categoryName) => {
  switch (categoryName) {
    case 'Standard Room':
      return room1Image;
    case 'Deluxe Room':
      return room2Image;
    case 'Suite':
      return room3Image;
    default:
      return '';
  }
};
</script>

<style scoped>
.room-categories {
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
}

.content-container {
  width: 90%; /* Adjusted width */
  max-width: 800px; /* Adjusted max-width */
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.9); /* Adjusted border */
  border-radius: 8px; /* Adjusted border-radius */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Adjusted box-shadow */
  background-color: rgba(255, 255, 255, 0.9); /* Adjusted background-color */
}

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

.categories-list {
  color: #333;
}

.categories-list h3 {
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 15px;
  font-weight: bold;
  text-align: center;
}

.categories-list ul {
  padding: 0;
  list-style-type: none;
}

.categories-list li {
  margin-bottom: 30px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Adjusted image size */
.categories-list img {
  max-width: 100%;
  height: auto;
}
</style>
