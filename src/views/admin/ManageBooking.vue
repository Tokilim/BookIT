<script setup>
import Sidebar from '@/components/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { db, auth } from '@/firebase';
import { collection, query, where, getDocs, getDoc, updateDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'vue-router';

const router = useRouter();
const bookings = ref([]);
const bookCollection = collection(db, "bookings");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    const userRef = collection(db, "users");
    const docRef = await getDoc(doc(userRef, uid));

    if (docRef.exists()) {
      const isAdmin = docRef.data().isAdmin;

      if (!isAdmin) {
        router.push('/');
      }
    } else {
      // Handle the case where the user document doesn't exist
      console.error("User document does not exist");
      // You may want to redirect or handle this case appropriately
    }
  } else {
    // User is signed out
    router.push('/');
    // Handle signed-out state if needed
  }
});

// Fetch all bookings from Firestore
// const fetchBookings = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'bookings'), where('isDeleted', '==', false));
//     bookings.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//   }
// };

const fetchBookings = async () => {
    try {
        const querySnapshot = await getDocs(query(bookCollection, where('isDeleted', '==', false)));
        bookings.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
};

const deleteBooking = async (bookingId) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, { isDeleted: true });
    console.log('Booking deleted successfully.');
    // Fetch bookings again to update the UI
    await fetchBookings();
    // Ensure reactivity by setting bookings.value explicitly
    bookings.value = bookings.value.filter(booking => !booking.isDeleted);
    // Force Vue to re-render the component
    // This can help ensure that the UI reflects the updated bookings immediately
    await new Promise(resolve => setTimeout(resolve, 0));
  } catch (error) {
    console.error('Error deleting booking:', error);
  }
};

// Fetch bookings when the component is mounted
onMounted(fetchBookings);

const formatTimestamp = (timestamp) => {
  const dateObj = new Date(timestamp);
  return dateObj.toLocaleString(); // Customize the format as needed
};
</script>

<template>
 <Sidebar />
    <main>
        <div class="container">
            <h1>Booking Management</h1>
            <!-- <div class="action-section">
                <div class="col-md-6">
                    <div class="input-group mb-3 d-flex flex-row">
                        <div class="col-md-4.2">
                            <select class="form-select" aria-label="Default select example" id="roomSearchOption">
                                <option value="room_number">Room Number</option>
                                <option value="type">Room Type</option>
                            </select>
                        </div>

                        <input type="text" class="form-control" id="roomSearchInput" v-model="searchQuery">
                        <div class="input-group-append">
                            <button class="btn btn-primary" @click="searchRoom">Search</button>
                        </div>
                    </div>
                </div>
            </div> -->
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Guest</th>
                        <th>Room Number</th>
                        <th>Room Type</th>
                        <th>From Date</th>
                        <th>To Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="booking in bookings" :key="booking.id">
                        <td>{{ formatTimestamp(booking.date) }}</td>
                        <td>{{ booking.name }}</td>
                        <td>{{ booking.roomID }}</td>
                        <td>{{ booking.roomtype }}</td>
                        <td>{{ booking.from }}</td>
                        <td>{{ booking.to }}</td>
                        <td>
                            <button @click="() => deleteBooking(booking.id, index)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


       


    </main>
</template>

<style scoped>
main {
    margin-left: 18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: auto;
    padding: 2rem;
}

.action-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0;
}

.action-section input[type="text"] {
    margin-right: 1rem;
}

td button {
    margin: 0 0.3rem;
}
</style>