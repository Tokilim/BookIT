<template>
    <Sidebar />
    <main>
        <h1>Summary Report</h1>
      <div class="row">
        <div class="col-md-4" v-if="roomStats">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Most Reserved Room Type</h5>
              <p class="card-text">{{ getMostReservedType() }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4" v-for="(count, type) in roomStats" :key="type">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ type }}</h5>
              <p class="card-text">Available: {{ count.available }}</p>
              <p class="card-text">Booked: {{ count.booked }}</p>
              <p class="card-text">Reserved: {{ count.reserved }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import Sidebar from '@/components/Sidebar.vue';
  import { ref, onMounted } from 'vue';
  import { db, auth  } from '@/firebase';
  import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
  import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
  import { useRouter } from 'vue-router';

  
  // Define reactive variables for room statistics
  const roomStats = ref(null);
  const router = useRouter();
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
  
  // Fetch room statistics data from Firestore
  const fetchRoomStatistics = async () => {
    try {
      const roomsCollection = collection(db, 'rooms');
      const querySnapshot = await getDocs(roomsCollection);
      const roomTypesCount = {};
  
      querySnapshot.forEach(doc => {
        const room = doc.data();
        const roomType = room.type;
  
        if (!roomTypesCount[roomType]) {
          roomTypesCount[roomType] = {
            available: 0,
            booked: 0,
            reserved: 0
          };
        }
  
        if (room.available === 'Available') {
          roomTypesCount[roomType].available++;
        } else if (room.available === 'Booked') {
          roomTypesCount[roomType].booked++;
        } else if (room.available === 'Reserved') {
          roomTypesCount[roomType].reserved++;
        }
      });
  
      roomStats.value = roomTypesCount;
    } catch (error) {
      console.error('Error fetching room statistics:', error);
    }
  };
  
  // Call fetchRoomStatistics when the component is mounted
  onMounted(fetchRoomStatistics);
  
  // Function to get the most reserved room type
  const getMostReservedType = () => {
    if (!roomStats.value) return '';
  
    let mostReservedType = '';
    let maxReservations = 0;
  
    for (const [type, count] of Object.entries(roomStats.value)) {
      if (count.reserved > maxReservations) {
        mostReservedType = type;
        maxReservations = count.reserved;
      }
    }
  
    return mostReservedType;
  };
  </script>

<style scoped>
main{
    margin-left: 18rem;
    padding: 4rem;
}
</style>
  