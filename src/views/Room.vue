<script setup>
import Navigation from '@/components/Navigation.vue'; 
import { ref, onMounted } from 'vue'; // Import necessary Vue Composition API functions
import { db, auth } from '@/firebase'; // Import Firebase Firestore and auth
import { collection, getDocs, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router'; // Import useRouter for navigation

// Define a ref for storing room types data
const roomTypes = ref([]);
const categoriesTitle = 'Room Categories';
const categoriesDescription = 'Explore our various room categories and make a reservation.';
const toast = ref(null); // Reference to the toast element
const router = useRouter(); // Use router for navigation

const fetchRoomTypes = async () => {
  try {
    const roomTypesCollection = collection(db, 'room_type');
    const querySnapshot = await getDocs(roomTypesCollection);

    const roomTypesData = querySnapshot.docs.map(doc => {
      const roomTypeData = doc.data();
      const roomType = {
        id: doc.id,
        name: roomTypeData.name,
        description: roomTypeData.description,
        occupancy: roomTypeData.occupancy,
        bedtype: roomTypeData.bedtype,
        image: `src/assets/images/${roomTypeData.image}` // Assuming image path in Firestore data
      };
      return roomType;
    });

    roomTypes.value = roomTypesData;
  } catch (error) {
    console.error('Error fetching room types:', error);
  }
};

onMounted(fetchRoomTypes);

const reserveRoom = async (category, fromDate, toDate) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error('No user signed in. Redirecting to login page.');
      router.push('/login'); // Redirect to login page if user is not signed in
      return;
    }

    const currentDate = new Date().toISOString();
    const reservationData = {
      date: currentDate,
      name: '', // Placeholder for user's name to be filled later
      roomID: null,
      from: fromDate,
      to: toDate,
      userID: user.uid,
      isDeleted: false,
      roomtype: category.name // Use category name as roomtype
    };

    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      reservationData.name = userData.name || 'Unknown'; // Use user's name or default to 'Unknown'
    } else {
      console.error('User document not found.');
      return;
    }

    const roomsCollection = collection(db, 'rooms');
    const querySnapshot = await getDocs(roomsCollection);

    let reservedRoomID = null; // To track the reserved room ID

    querySnapshot.forEach((doc) => {
      const room = doc.data();
      if (room.type === category.name && room.available) {
        reservationData.roomID = doc.id;
        reservedRoomID = doc.id; // Store the reserved room ID
      }
    });

    if (!reservedRoomID) {
      console.error('No available room found.');
      return;
    }

    const bookingsCollection = collection(db, 'bookings');
    await addDoc(bookingsCollection, reservationData);

    // Update the room document to mark it as Reserved
    const reservedRoomDocRef = doc(db, 'rooms', reservedRoomID);
    await updateDoc(reservedRoomDocRef, {
      available: 'Reserved'
    });
    toast.value.show();
    console.log('Room reserved successfully:', category.name);
  } catch (error) {
    console.error('Error reserving room:', error);
  }
};

// getRoomImage function remains the same
// Initialize the toast element when the component is mounted
onMounted(() => {
  toast.value = new bootstrap.Toast(document.getElementById('reservationToast'));
});

</script>


<template>
  <Navigation />
  <main>
    <div class="room-categories">
      <div class="content-container">
        <div class="container header">
          <h2>{{ categoriesTitle }}</h2>
          <p class="description">{{ categoriesDescription }}</p>
        </div>
        <div class="container categories-list">
          <h3>Room Categories</h3>
          <div v-for="roomType in roomTypes" :key="roomType.id" class="card mb-3" style="width: 100%;">
            <div class="row g-0">
              <div class="col-md-4">
                <img :src="roomType.image" class="img-fluid rounded-start" alt="Room Image">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ roomType.name }}</h5>
                  <p class="card-text">{{ roomType.description }}</p>
                  <p class="card-text"><small class="text-body-secondary">Occupancy: {{ roomType.occupancy }}</small></p>
                  <p class="card-text"><small class="text-body-secondary">Bed Type: {{ roomType.bedtype }}</small></p>
                  <div class="form-group">
                    <label for="fromDate">From Date:</label>
                    <input type="date" id="fromDate" v-model="fromDate" required>
                  </div>
                  <div class="form-group">
                    <label for="toDate">To Date:</label>
                    <input type="date" id="toDate" v-model="toDate" required>
                  </div>
                  <button @click="reserveRoom(roomType, fromDate, toDate)">Reserve</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Toast component -->
  <div aria-live="polite" aria-atomic="true" class="position-fixed top-0 end-0 p-3">
      <div id="reservationToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
        <div class="toast-header">
          <strong class="me-auto">Reservation Success</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          Your reservation has been successful.
        </div>
      </div>
    </div>
  
</template>



<style scoped>
main{
  min-height:100vh;
  width:100%;
  height:auto;
  background: url(../assets/images/background.jpg) no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  overflow:hidden;
  
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  /* height: 100vh; */
  /* padding: 2rem; */
  background: url(../assets/images/bgabout.jpg) no-repeat center center;
  background-color: rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity as needed */
    z-index: 0;
  }
}

.room-categories {
  z-index: 1;
  height: auto;
  width: 80rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}

.content-container {
  width: 90%; /* Adjusted width */
  max-width: 100vw; /* Adjusted max-width */
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.9); /* Adjusted border */
  border-radius: 8px; /* Adjusted border-radius */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Adjusted box-shadow */
  background-color: rgba(255, 255, 255, 1); /* Adjusted background-color */
  /* background-color: red; */
  margin-top:10rem;
  height:auto;
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
/* .categories-list img {
  max-width: 100%;
  max-height:40rem;
  height: 100%;
  width: 100%;
  background-color: green;
  background-size:cover;
} */

#reservationToast{
  margin-top: 8rem;
  z-index: 100000;
}
</style>
