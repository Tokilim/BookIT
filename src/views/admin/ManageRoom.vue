<script setup>
import Sidebar from '@/components/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import {
    getFirestore,
    addDoc,
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    getDoc,
    increment,
    orderBy,
    limit,
    startAfter,
    arrayUnion,
    arrayRemove,
    documentId,
    deleteDoc,
    deleteField,
} from "firebase/firestore";
// Define a ref to hold the rooms data
const rooms = ref([]);

// Reference to the rooms collection in Firestore
const roomsCollection = collection(db, "rooms");

// Fetch rooms data from Firestore
const fetchRooms = async () => {
    try {
        const querySnapshot = await getDocs(roomsCollection);
        rooms.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
};



// Call fetchRooms function when the component is mounted
onMounted(fetchRooms);

const formatAvailability = (available) => available ? 'Available' : 'Booked';

// Function to edit a room
const editRoom = (room) => {

};

// Function to delete a room
const deleteRoom = async (roomId) => {

};

const searchQuery = ref('');

const searchRoom = () => {
    // Implement search functionality
    console.log('Search query:', searchQuery.value);
    // You can filter the rooms array based on the search query here
};
</script>




<template>
    <Sidebar />
    <main>
        <div class="container">
            <h1>Room Management</h1>
            <div class="action-section">
                <div class="col-md-6">
                    <div class="input-group mb-3 d-flex flex-row">
                        <div class="col-md-4.2">
                            <select class="form-select" aria-label="Default select example" id="exerciseSearchOption">
                                <option value="name">Room Number</option>
                                <option value="category">Room Type</option>
                                <option value="intensity">Available</option>
                                <option value="tags">Tags</option>
                            </select>
                        </div>

                        <input type="text" class="form-control" id="exerciseTextField">
                        <div class="input-group-append"><button class="btn btn-primary"
                                id="exerciseSearchButton">Search</button></div>
                    </div>
                </div>
                <button @click="showModal" class="btn btn-primary">Add Room</button>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Room Type</th>
                        <th>Room Availability</th>
                        <th>Room Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="room in rooms" :key="room.id">
                        <td>{{ room.room_number }}</td>
                        <td>{{ room.type }}</td>
                        <td>{{ formatAvailability(room.available) }}</td>
                        <td>{{ room.price }}</td>
                        <td>
                            <button @click="editRoom(room)" class="btn btn-primary btn-sm">Edit</button>
                            <button @click="deleteRoom(room.id)" class="btn btn-danger btn-sm">Delete</button>
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
