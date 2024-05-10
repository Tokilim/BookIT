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
        const querySnapshot = await getDocs(query(roomsCollection, where('isDeleted', '==', false)));
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


const newRoom = ref({
    room_number: '',
    type: '',
    available: 'Available',
    price: ''
});

const resetNewRoom = () => {
    newRoom.value = {
        room_number: '',
        type: '',
        available: true,
        price: ''
    };
};


// Function to show the modal
const showModal = () => {
    const modalElement = document.getElementById('addRoomModal');
    modalInstance.value = new bootstrap.Modal(modalElement);
    modalInstance.value.show();
};


// Function to hide the modal
const hideModal = () => {
    if (modalInstance.value) {
        modalInstance.value.hide();
    }
};

// Function to add a new room
const editRoom = (room) => {
    // Set newRoom to the data of the room being edited
    newRoom.value = {
        id: room.id,
        room_number: room.room_number,
        type: room.type,
        available: room.available,
        price: room.price
    };

    // Show the modal for editing
    showModal();
};

// Updated addRoom method to handle both adding and editing
const addRoom = async () => {
    try {
        if (newRoom.value.id) {
            // Room ID exists, perform an update
            const roomId = newRoom.value.id;
            await updateDoc(doc(db, 'rooms', roomId), newRoom.value);
        } else {
            // Room ID does not exist, add a new room
            const roomId = newRoom.value.room_number.toLowerCase().replace(/\s+/g, '_');
            newRoom.value.id = roomId;
            newRoom.value.isDeleted = false;
            await setDoc(doc(db, 'rooms', roomId), newRoom.value);
        }

        // Fetch updated rooms data after adding/editing room
        fetchRooms();

        // Hide modal after adding/editing room
        hideModal();

        // Reset form fields after submission
        resetNewRoom();
    } catch (error) {
        console.error('Error adding/editing room:', error);
    }
};
// const addRoom = async () => {
//     try {
//         // Add code to save the new room data to Firestore
//         await addDoc(roomsCollection, newRoom.value);
//         // Clear the new room data and close the modal
//         newRoom.value = {
//             room_number: '',
//             type: '',
//             available: true,
//             price: ''
//             // Reset other properties as needed
//         };
//         const modalElement = document.getElementById('addRoomModal');
//         const modal = new bootstrap.Modal(modalElement);
//         modal.hide();
//     } catch (error) {
//         console.error('Error adding room:', error);
//     }
// };

// Function to edit a room


// Function to delete a room
const deleteRoom = async (roomId) => {
    try {
        // Show confirmation modal
        const confirmDelete = confirm('Are you sure you want to delete this room?');
        if (!confirmDelete) {
            return; // Do nothing if user cancels deletion
        }

        // Update isDeleted to true for the specified room
        await updateDoc(doc(db, 'rooms', roomId), { isDeleted: true });

        // Fetch updated rooms data after deleting room
        fetchRooms();
    } catch (error) {
        console.error('Error deleting room:', error);
    }
};



const searchQuery = ref('');

const searchRoom = () => {
    const searchOption = document.getElementById('roomSearchOption').value;
    const searchValue = searchQuery.value.trim().toLowerCase();

    if (searchValue === '') {
        // Reset rooms to display all rooms if search query is empty
        fetchRooms();
    } else {
        // Filter rooms based on search query
        rooms.value = rooms.value.filter(room => {
            if (searchOption === 'room_number') {
                return room.room_number.toLowerCase().includes(searchValue);
            } else if (searchOption === 'type') {
                // Search by room type
                return room.type.toLowerCase().includes(searchValue);
            } else if (searchOption === 'type') {
                return room.type.toLowerCase().includes(searchValue);
            } else if (searchOption === 'availability') {
                // Check for available rooms
                const isAvailable = searchValue === 'available';
                return room.type.toLowerCase().includes(searchValue);
            }
            return false;
        });
    }
};

const modalInstance = ref(null);

// Watch for modal events to reset the newRoom data
const watchModalEvents = () => {
    const modalElement = document.getElementById('addRoomModal');
    modalElement.addEventListener('hidden.bs.modal', resetNewRoom);

    const closeBtn = modalElement.querySelector('.btn-close');
    closeBtn.addEventListener('click', resetNewRoom);
};

// Call the watchModalEvents function when the component is mounted
onMounted(watchModalEvents);
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
                            <select class="form-select" aria-label="Default select example" id="roomSearchOption">
                                <option value="room_number">Room Number</option>
                                <option value="type">Room Type</option>
                                <option value="availability">Available</option>
                            </select>
                        </div>

                        <input type="text" class="form-control" id="roomSearchInput" v-model="searchQuery">
                        <div class="input-group-append">
                            <button class="btn btn-primary" @click="searchRoom">Search</button>
                        </div>
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
                        <td>{{ room.available }}</td>
                        <td>{{ 'P' + room.price }}</td>
                        <td>
                            <button @click="editRoom(room)" class="btn btn-primary btn-sm">Edit</button>
                            <button @click="deleteRoom(room.id)" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <!-- Add Room Modal -->
        <div class="modal fade" id="addRoomModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Room</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="addRoom">
                            <div class="mb-3">
                                <label for="roomNumber" class="form-label">Room Number</label>
                                <input type="text" class="form-control" id="roomNumber" v-model="newRoom.room_number" required>
                            </div>
                            <div class="mb-3">
                                <label for="roomType" class="form-label">Room Type</label>
                                <select class="form-select" id="roomType" v-model="newRoom.type" required>
                                    <option value="Standard">Standard</option>
                                    <option value="Deluxe">Deluxe</option>
                                    <option value="Suite">Suite</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="roomAvailability" class="form-label">Availability</label>
                                <select class="form-select" id="roomAvailability" v-model="newRoom.available" required>
                                    <option value="Available">Available</option>
                                    <option value="Booked">Booked</option>
                                    <option value="Reserved">Reserved</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="roomPrice" class="form-label">Room Price</label>
                                <input type="text" class="form-control" id="roomPrice" v-model="newRoom.price" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Add Room</button>
                        </form>
                    </div>
                </div>
            </div>
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
