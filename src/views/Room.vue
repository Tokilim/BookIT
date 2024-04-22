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
            <img :src="category.image" alt="Room Image" style="max-width: 100%; height: auto;">
            <p>{{ category.description }}</p>
            <p>Price: {{ category.price }}</p>
            <button @click="reserveRoom(category)">Reserve</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="contact-label">
      <h2>Contact Us</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoriesTitle: 'Room Categories',
      categoriesDescription: 'Explore our various room categories and make a reservation.',
      categories: [
        { id: 1, name: 'Standard Room', description: 'Cozy room with essential amenities.', price: '$100/night', image: '../assets/images/standard-room.jpg' },
        { id: 2, name: 'Deluxe Room', description: 'Spacious room with extra amenities.', price: '$150/night', image: '../assets/images/deluxe-room.jpg' },
        { id: 3, name: 'Suite', description: 'Luxurious suite with premium amenities.', price: '$200/night', image: '../assets/images/suite.jpg' }
      ]
    };
  },
  methods: {
    reserveRoom(category) {
      // Implement reservation logic here
      console.log('Room reserved:', category.name);
    }
  }
}
</script>

<style scoped>
/* Global Styling */
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
  width: 80%;
  max-width: 600px;
  padding: 20px;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255);
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

/* Room Categories Styling */
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
</style>
