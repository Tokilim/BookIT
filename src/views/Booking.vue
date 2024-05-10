<template>
  <Navigation />
  <main>
    <div class="account">
      <div class="booking-container">
        <h1>My Bookings</h1>
        <!-- Bootstrap Table for Bookings -->
        <div class="mt-4">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Room ID</th>
                <th scope="col">Room Type</th>
                <th scope="col">Date Reserved</th>
                <th scope="col">From Date</th>
                <th scope="col">To Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(booking, index) in bookings" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ booking.roomID }}</td>
                <td>{{ booking.roomtype }}</td>
                <td>{{ formatTimestamp(booking.date) }}</td>
                <td>{{ booking.from }}</td>
                <td>{{ booking.to }}</td>
                <td>
                  <button @click="() => deleteBooking(booking.id, index)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Navigation from '@/components/Navigation.vue';
import { ref, onMounted } from 'vue';
import { db, auth } from '@/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const bookings = ref([]);
const activeBookings = ref([]);

// Define deleteBooking function
const deleteBooking = async (bookingId) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, { isDeleted: true });
    console.log('Booking soft deleted successfully.');
    // Fetch user bookings again to update the local list and active bookings
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      await fetchUserBookings(userId);
    }
  } catch (error) {
    console.error('Error soft deleting booking:', error);
  }
};

onMounted(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid;
      fetchUserBookings(userId);
    } else {
      console.log('No user signed in.');
    }
  });
});

const fetchUserBookings = async (userId) => {
  try {
    const bookingsCollection = collection(db, 'bookings');
    const q = query(bookingsCollection, where('userID', '==', userId), where('isDeleted', '==', false));
    const querySnapshot = await getDocs(q);
    bookings.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    activeBookings.value = [...bookings.value]; // Initialize activeBookings with all bookings initially
  } catch (error) {
    console.error('Error fetching user bookings:', error);
  }
};

// Function to update activeBookings after a soft delete
const updateActiveBookings = () => {
  activeBookings.value = bookings.value.filter(booking => !booking.isDeleted);
};

// const softDeleteBooking = async (bookingId, index) => {
//   try {
//     const bookingRef = doc(db, 'bookings', bookingId);
//     await updateDoc(bookingRef, { isDeleted: true });
//     bookings.value[index].isDeleted = true; // Update local list
//     updateActiveBookings(); // Update activeBookings without reload
//     console.log('Booking soft deleted successfully.');
//   } catch (error) {
//     console.error('Error soft deleting booking:', error);
//   }
// };
const formatTimestamp = (timestamp) => {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleString(); // Customize the format as needed
};
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  padding: 2rem;
  background: url(../assets/images/bgabout.jpg) no-repeat center center;
  background-color: rgba(0, 0, 0, 0.3);
}

.booking-container {
  padding: 2rem;
  width: 80vw;
  margin-top: 8rem;
  height: 80vh;
  background-color: white;
  z-index: 100000;
}
</style>